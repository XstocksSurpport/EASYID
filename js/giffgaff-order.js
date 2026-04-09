(function () {
  const ORDERS_KEY = "easyid_orders";
  const STATUS_PENDING = "pending_shipment";
  const MAX_ORDERS = 80;
  const MAX_DATA_URL_CHARS = 4 * 1024 * 1024;
  const LIMIT = {
    name: 80,
    email: 254,
    contact: 200,
    phone: 40,
    address: 2000,
    planLabel: 400,
    planId: 80,
    id: 120,
    txStored: 200,
  };

  const PAYMENT = {
    evm: {
      address: "0x6A3B50B88d7b77bb57b47041821E0dA13b5D3f52",
      networks: "Arbitrum · Ethereum · BNB Chain",
    },
    trc20: {
      address: "TJJpdxWKdMBeVLUGamtKFdyNmrSsTupZsD",
      networks: "TRC20 (Tron)",
    },
  };

  function truncateText(s, max) {
    const t = String(s ?? "");
    return t.length <= max ? t : t.slice(0, max);
  }

  function clampUsdc(n) {
    const x = Number(n);
    if (!Number.isFinite(x) || x < 0) return 0;
    return Math.min(Math.round(x * 100) / 100, 1e7);
  }

  function sanitizePlanId(id) {
    const s = String(id ?? "").trim();
    if (!s || s.length > LIMIT.planId) return "";
    if (!/^[a-zA-Z0-9_.-]+$/.test(s)) return "";
    return s;
  }

  function safeFiniteNum(n) {
    const x = Number(n);
    if (!Number.isFinite(x)) return 0;
    return Math.min(Math.max(x, 0), 1e7);
  }

  function isValidStoredTxHash(tx) {
    if (typeof tx !== "string") return false;
    const t = tx.trim();
    if (t.length < 8 || t.length > LIMIT.txStored) return false;
    if (/[\r\n<>"']/.test(t)) return false;
    return true;
  }

  /** Strict validation on submit (EVM + TRC20 USDC transfers use 32-byte hashes). */
  function isValidSubmittedTxHash(tx) {
    const t = String(tx || "").trim();
    return /^(0x)?[a-fA-F0-9]{64}$/.test(t);
  }

  function isValidEmail(s) {
    if (typeof s !== "string" || s.length > LIMIT.email) return false;
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
  }

  function normalizeStoredOrder(o) {
    if (!o || typeof o !== "object") return null;
    const id = truncateText(o.id, LIMIT.id);
    if (!id || /[<>]/.test(id)) return null;
    const planId = sanitizePlanId(o.planId);
    if (!planId) return null;
    const cardType = o.cardType === "physical" ? "physical" : o.cardType === "esim" ? "esim" : null;
    if (!cardType) return null;
    const paymentMethod = o.paymentMethod === "trc20" ? "trc20" : o.paymentMethod === "evm" ? "evm" : null;
    if (!paymentMethod) return null;
    const shot = typeof o.screenshotData === "string" ? o.screenshotData : "";
    if (shot && (!shot.startsWith("data:image/") || shot.length > MAX_DATA_URL_CHARS)) return null;
    const createdAt = truncateText(o.createdAt, 48);
    if (!createdAt) return null;
    const txHash = truncateText(o.txHash, LIMIT.txStored);
    if (!isValidStoredTxHash(txHash)) return null;

    return {
      id,
      createdAt,
      type: o.type === "bundle" ? "bundle" : "giffgaff",
      planId,
      planLabel: truncateText(o.planLabel, LIMIT.planLabel),
      cardType,
      baseUsdc: safeFiniteNum(o.baseUsdc),
      shippingUsdc: safeFiniteNum(o.shippingUsdc),
      totalUsdc: safeFiniteNum(o.totalUsdc),
      paymentMethod,
      lastName: truncateText(o.lastName, LIMIT.name),
      firstName: truncateText(o.firstName, LIMIT.name),
      email: truncateText(o.email, LIMIT.email),
      contact: truncateText(o.contact, LIMIT.contact),
      recipientName: truncateText(o.recipientName, 120),
      recipientPhone: truncateText(o.recipientPhone, LIMIT.phone),
      address: truncateText(o.address, LIMIT.address),
      txHash: txHash.trim(),
      screenshotData: shot,
      status: STATUS_PENDING,
    };
  }

  function getOrders() {
    let arr;
    try {
      const raw = localStorage.getItem(ORDERS_KEY);
      arr = raw ? JSON.parse(raw) : [];
    } catch (_) {
      try {
        localStorage.removeItem(ORDERS_KEY);
      } catch (__) {}
      return [];
    }
    if (!Array.isArray(arr)) {
      try {
        localStorage.removeItem(ORDERS_KEY);
      } catch (_) {}
      return [];
    }

    let dirty = arr.length > MAX_ORDERS;
    const cleaned = [];
    for (const item of arr) {
      const n = normalizeStoredOrder(item);
      if (n) cleaned.push(n);
      else dirty = true;
    }
    const limited = cleaned.slice(0, MAX_ORDERS);
    if (limited.length < cleaned.length) dirty = true;
    if (dirty) saveOrders(limited);
    return limited;
  }

  function saveOrders(orders) {
    try {
      localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
    } catch (_) {}
  }

  function formatUsdc(n) {
    return (Math.round(n * 100) / 100).toFixed(2);
  }

  function readFileAsDataURL(file, maxBytes) {
    return new Promise((resolve, reject) => {
      if (!file || !file.size) {
        reject(new Error("no_file"));
        return;
      }
      if (file.size > maxBytes) {
        reject(new Error("too_large"));
        return;
      }
      const r = new FileReader();
      r.onload = () => {
        const data = r.result;
        if (typeof data !== "string" || !data.startsWith("data:image/") || data.length > MAX_DATA_URL_CHARS) {
          reject(new Error("bad_image"));
          return;
        }
        resolve(data);
      };
      r.onerror = () => reject(new Error("read_fail"));
      r.readAsDataURL(file);
    });
  }

  const modal = document.getElementById("order-modal");
  const form = document.getElementById("order-form");
  const successEl = document.getElementById("order-success");
  const payEvmBox = document.getElementById("pay-evm-detail");
  const payTrcBox = document.getElementById("pay-trc-detail");
  const ordersListEl = document.getElementById("orders-list");
  const ordersEmptyEl = document.getElementById("orders-empty");

  let currentBaseUsdc = 0;
  let currentPlanId = "";
  let currentPlanLabel = "";

  function setPaymentDetails(method) {
    if (!payEvmBox || !payTrcBox) return;
    payEvmBox.hidden = method !== "evm";
    payTrcBox.hidden = method !== "trc20";
  }

  function updateTotals() {
    const physical = form && form.querySelector('input[name="cardType"]:checked')?.value === "physical";
    const ship = physical ? currentBaseUsdc * 0.1 : 0;
    const total = currentBaseUsdc + ship;
    const shipEl = document.getElementById("order-shipping-line");
    const totalEl = document.getElementById("order-total-line");
    const baseEl = document.getElementById("order-base-line");
    if (baseEl) baseEl.textContent = formatUsdc(currentBaseUsdc);
    if (shipEl) {
      shipEl.textContent = physical ? formatUsdc(ship) : "0.00";
      shipEl.closest(".order-line")?.classList.toggle("is-muted", !physical);
    }
    if (totalEl) totalEl.textContent = formatUsdc(total);
    return { physical, ship, total };
  }

  function modalTitleText(planId) {
    const lang = window.EASYID_I18N?.getLang?.() || "zh";
    const dict = window.EASYID_I18N?.STRINGS?.[lang] || {};
    return String(planId).startsWith("bundle-")
      ? dict["order.modalBundle"] || "Bundle order"
      : dict["order.modalTitle"] || "Order";
  }

  function openModal(planId, baseUsdc, planLabel) {
    if (!modal || !form || !successEl) return;
    const safeId = sanitizePlanId(planId);
    if (!safeId) return;
    currentPlanId = safeId;
    currentBaseUsdc = clampUsdc(baseUsdc);
    currentPlanLabel = truncateText(planLabel, LIMIT.planLabel);
    form.reset();
    successEl.hidden = true;
    form.hidden = false;
    const titleEl = document.getElementById("order-modal-title");
    if (titleEl) titleEl.textContent = modalTitleText(currentPlanId);
    const planNameEl = document.getElementById("order-plan-name");
    if (planNameEl) planNameEl.textContent = currentPlanLabel || "\u2014";
    const bundle = String(currentPlanId).startsWith("bundle-");
    const phy = form.querySelector('input[name="cardType"][value="physical"]');
    const esim = form.querySelector('input[name="cardType"][value="esim"]');
    if (bundle && phy) phy.checked = true;
    else if (esim) esim.checked = true;
    const payEvm = form.querySelector('input[name="paymentMethod"][value="evm"]');
    if (payEvm) payEvm.checked = true;
    setPaymentDetails("evm");
    updateTotals();
    modal.hidden = false;
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    const first = form.querySelector("input, select, textarea, button");
    first?.focus();
  }

  function closeModal() {
    if (!modal) return;
    modal.hidden = true;
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
  }

  function renderOrders() {
    if (!ordersListEl || !ordersEmptyEl) return;
    const orders = getOrders().sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
    ordersEmptyEl.hidden = orders.length > 0;
    ordersListEl.replaceChildren();
    const lang = window.EASYID_I18N?.getLang?.() || "zh";
    const statusLabel = lang === "zh" ? "待发货" : "Pending shipment";

    orders.forEach((o) => {
      const row = document.createElement("article");
      row.className = "order-row";
      const head = document.createElement("div");
      head.className = "order-row-head";
      const idEl = document.createElement("span");
      idEl.className = "order-id";
      const sid = String(o.id || "");
      idEl.textContent = sid.length > 8 ? `${sid.slice(0, 8)}…` : sid;
      const stEl = document.createElement("span");
      stEl.className = "order-status";
      stEl.textContent = statusLabel;
      head.append(idEl, stEl);
      const planP = document.createElement("p");
      planP.className = "order-row-plan";
      const cardWord = o.cardType === "physical" ? (lang === "zh" ? "实体" : "Physical") : "eSIM";
      planP.textContent = `${o.planLabel || ""} · ${cardWord}`;
      const metaP = document.createElement("p");
      metaP.className = "order-row-meta";
      metaP.textContent = `${o.createdAt || ""} · ${formatUsdc(o.totalUsdc)} USDC`;
      row.append(head, planP, metaP);
      ordersListEl.appendChild(row);
    });
  }

  function planLabelFromCard(btn) {
    const card = btn.closest(".gg-card");
    if (!card) return btn.getAttribute("data-plan") || "";
    return card.querySelector(".gg-data-amount")?.textContent?.trim() || "";
  }

  function bundlePlanLabel(btn) {
    const card = btn.closest(".price-card");
    if (!card) return "";
    const badge = card.querySelector(".price-badge")?.textContent?.trim() || "";
    const amt = card.querySelector(".price-amount")?.textContent?.trim() || "";
    return amt ? `${badge}（${amt}）` : badge;
  }

  document.querySelectorAll(".gg-order-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const planId = btn.getAttribute("data-plan") || "";
      const usdc = btn.getAttribute("data-usdc") || "0";
      openModal(planId, usdc, planLabelFromCard(btn));
    });
  });

  document.querySelectorAll(".price-bundle-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const planId = btn.getAttribute("data-plan-id") || "";
      const usdc = btn.getAttribute("data-usdc") || "0";
      openModal(planId, usdc, bundlePlanLabel(btn));
    });
  });

  form?.querySelectorAll('input[name="cardType"]').forEach((r) => {
    r.addEventListener("change", updateTotals);
  });

  form?.querySelectorAll('input[name="paymentMethod"]').forEach((r) => {
    r.addEventListener("change", () => {
      setPaymentDetails(r.value);
    });
  });

  document.getElementById("order-modal-close")?.addEventListener("click", closeModal);
  document.getElementById("order-modal-backdrop")?.addEventListener("click", closeModal);

  modal?.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });

  form?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn?.disabled) return;

    const fd = new FormData(form);
    let lastName = truncateText(String(fd.get("lastName") || "").trim(), LIMIT.name);
    let firstName = truncateText(String(fd.get("firstName") || "").trim(), LIMIT.name);
    let email = String(fd.get("email") || "").trim();
    let contact = truncateText(String(fd.get("contact") || "").trim(), LIMIT.contact);
    let recipientName = truncateText(String(fd.get("recipientName") || "").trim(), 120);
    let recipientPhone = truncateText(String(fd.get("recipientPhone") || "").trim(), LIMIT.phone);
    let address = truncateText(String(fd.get("address") || "").trim(), LIMIT.address);
    const paymentMethodRaw = String(fd.get("paymentMethod") || "evm");
    const paymentMethod = paymentMethodRaw === "trc20" ? "trc20" : "evm";
    let txHash = String(fd.get("txHash") || "").trim();
    const file = form.querySelector('input[name="txScreenshot"]')?.files?.[0];

    const lang = window.EASYID_I18N?.getLang?.() || "zh";
    const err = (key) => {
      const dict = window.EASYID_I18N?.STRINGS?.[lang] || {};
      alert(dict[key] || dict["order.error.generic"] || "Please check the form.");
    };

    if (!sanitizePlanId(currentPlanId)) {
      err("order.error.generic");
      return;
    }
    if (!lastName || !firstName || !email || !contact || !recipientName || !recipientPhone || !address) {
      err("order.error.required");
      return;
    }
    if (!isValidEmail(email)) {
      err("order.error.email");
      return;
    }
    if (!txHash) {
      err("order.error.tx");
      return;
    }
    if (!isValidSubmittedTxHash(txHash)) {
      err("order.error.txinvalid");
      return;
    }
    if (!file) {
      err("order.error.screenshot");
      return;
    }

    if (submitBtn) submitBtn.disabled = true;
    let screenshotData = "";
    try {
      screenshotData = await readFileAsDataURL(file, 2.5 * 1024 * 1024);
    } catch (ex) {
      const msg = ex && ex.message;
      if (msg === "too_large") err("order.error.filesize");
      else if (msg === "bad_image") err("order.error.badimage");
      else err("order.error.screenshot");
      if (submitBtn) submitBtn.disabled = false;
      return;
    }

    const { physical, ship, total } = updateTotals();
    const cardType = physical ? "physical" : "esim";
    txHash = truncateText(txHash, LIMIT.txStored);

    const order = {
      id:
        typeof crypto !== "undefined" && crypto.randomUUID
          ? crypto.randomUUID()
          : `ord_${Date.now()}_${Math.random().toString(16).slice(2)}`,
      createdAt: new Date().toISOString(),
      type: String(currentPlanId).startsWith("bundle-") ? "bundle" : "giffgaff",
      planId: currentPlanId,
      planLabel: truncateText(currentPlanLabel, LIMIT.planLabel),
      cardType,
      baseUsdc: currentBaseUsdc,
      shippingUsdc: ship,
      totalUsdc: total,
      paymentMethod,
      lastName,
      firstName,
      email,
      contact,
      recipientName,
      recipientPhone,
      address,
      txHash,
      screenshotData,
      status: STATUS_PENDING,
    };

    const orders = getOrders();
    orders.unshift(order);
    saveOrders(orders.slice(0, MAX_ORDERS));

    form.hidden = true;
    successEl.hidden = false;
    renderOrders();
    if (submitBtn) submitBtn.disabled = false;
  });

  document.getElementById("order-success-done")?.addEventListener("click", () => {
    closeModal();
  });

  if (document.getElementById("pay-evm-addr")) {
    document.getElementById("pay-evm-addr").textContent = PAYMENT.evm.address;
    document.getElementById("pay-evm-net").textContent = PAYMENT.evm.networks;
  }
  if (document.getElementById("pay-trc-addr")) {
    document.getElementById("pay-trc-addr").textContent = PAYMENT.trc20.address;
    document.getElementById("pay-trc-net").textContent = PAYMENT.trc20.networks;
  }

  document.addEventListener("easyid-lang-applied", () => {
    renderOrders();
    if (modal && !modal.hidden && currentPlanId) {
      const titleEl = document.getElementById("order-modal-title");
      if (titleEl) titleEl.textContent = modalTitleText(currentPlanId);
    }
  });
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", renderOrders);
  } else {
    renderOrders();
  }
})();
