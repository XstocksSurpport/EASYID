(function () {
  const STRINGS = {
    en: {
      skip: "Skip to content",
      "nav.solution": "Solution",
      "nav.pricing": "Pricing",
      "nav.scenarios": "Use cases",
      "nav.cta": "Get started",
      "nav.giffgaff": "giffgaff SIM",
      "nav.agent": "Become an agent",
      "nav.orders": "My orders",
      "nav.contact": "Contact",
      slogan: "Global Identity Infrastructure Provider",
      "hero.tagline": "One-stop overseas identity solutions",
      "hero.title": "Easy overseas identity infrastructure — all in one flow",
      "hero.b1": "No travel required",
      "hero.b2": "No messy workflows",
      "hero.b3": "One path to a usable overseas identity",
      "pain.title": "Sound familiar?",
      "pain.p1": "Signing up for overseas platforms is painful",
      "pain.p2": "No reliable foreign phone number",
      "pain.p3": "Stuck at KYC or address verification",
      "solution.title": "What we deliver",
      "solution.lead": "One integrated stack — not loose tools",
      "solution.s1": "Communication",
      "solution.s2": "Address",
      "solution.s3": "Network",
      "solution.s4": "One-stop support",
      "solution.sell": "We sell success rate — a complete, working overseas identity environment.",
      "modules.gg.tag": "1 · giffgaff UK SIM",
      "modules.gg.title": "The most stable overseas physical SIM — communicate globally",
      "modules.gg.desc":
        "giffgaff is £0 monthly line rental. After our one-time setup fee there’s no recurring fixed charge. Outbound SMS is €0.10 per message. Send at least one SMS every six months to keep the number active.",
      "modules.m1.tag": "2 · Communication",
      "modules.m1.title": "Reachability that platforms trust",
      "modules.m1.desc":
        "eSIM and SMS-receiving APIs for automation; pair with the giffgaff module for a UK mobile footprint — stable numbers with clear ownership paths.",
      "modules.m1.l1": "eSIM",
      "modules.m1.l2": "SMS receiving API",
      "modules.m1.l3": "UK giffgaff path (see module 1)",
      "modules.m2.tag": "3 · Address",
      "modules.m2.title": "Proof-of-address where it matters",
      "modules.m2.desc":
        "Real mailing addresses in HK/Macao/Taiwan, EU/US/JP/KR for letters and registrations; optional forwarding hubs so you never miss bank or platform mail.",
      "modules.m2.l1": "Overseas address (mail / registration)",
      "modules.m2.l2": "Forwarding address",
      "modules.m3.tag": "4 · Network",
      "modules.m3.title": "Environment that looks like a real user",
      "modules.m3.desc":
        "Residential IPs aligned with your target region plus isolated browser profiles — fewer false positives from datacenter traffic or shared fingerprints.",
      "modules.m3.l1": "Residential IP",
      "modules.m3.l2": "Anti-detect browser profiles",
      "modules.m4.tag": "5 · Account support",
      "modules.m4.title": "Guidance — within the rules",
      "modules.m4.desc":
        "Step-by-step registration playbooks and KYC document prep. We explain requirements and formats; we never forge documents or bypass lawful checks.",
      "modules.m4.l1": "Registration guidance",
      "modules.m4.l2": "KYC assistance (compliance-first)",
      "modules.agent.tag": "6 · Agent program",
      "modules.agent.subtitle": "Open channels - partners welcome",
      "giffgaff.plansTitle": "One-time purchase (USDC)",
      "giffgaff.title": "giffgaff UK SIM — one-time purchase",
      "giffgaff.sub":
        "All giffgaff lines are £0 monthly line rental — one-time purchase, no recurring fees. Listed USDC is a one-time EASYID card fee. CNY amounts are estimated at 1 USDC ≈ CN¥6.88 for reference only. Physical SIM adds 10% of the listed price for shipping.",
      "giffgaff.data": "Data",
      "giffgaff.usdc": "USDC",
      "giffgaff.once": "One-time",
      "giffgaff.boost": "Data Boost",
      "gg.order": "Order",
      "orders.title": "My orders",
      "orders.empty": "No orders yet",
      "agent.p1":
        "Agents pay a franchise fee (including API technical service) of 200 USDC. The platform takes a 10% commission - the rest is yours.",
      "agent.p2": "We provide the platform and supply channels. If you have the skills, you are welcome to join.",
      "agent.cta": "Join as agent",
      "contact.title": "Contact us",
      "contact.sub":
        "For partnerships, custom stacks, or support — reach out; we typically respond within two hours.",
      "contact.inquiry": "Inquiries & feedback",
      "contact.telegram": "Telegram",
      "contact.telegramHandle": "@EASYID_TG",
      "order.modalTitle": "giffgaff order",
      "order.modalBundle": "Bundle order",
      "order.plan": "Selected plan",
      "order.lastName": "Last name",
      "order.firstName": "First name",
      "order.email": "Email",
      "order.contact": "Contact (IM / other)",
      "order.recipientName": "Recipient name",
      "order.recipientPhone": "Recipient phone",
      "order.address": "Shipping address",
      "order.cardType": "SIM type",
      "order.esim": "eSIM (no physical ship)",
      "order.physical": "Physical SIM (+10% shipping on listed price)",
      "order.pricing": "Pricing",
      "order.base": "Purchase price (USDC)",
      "order.shipping": "Shipping (USDC)",
      "order.total": "Pay (USDC)",
      "order.payment": "Payment",
      "order.payEvm": "USDC — EVM (Arbitrum / Ethereum / BNB Chain)",
      "order.payTrc": "USDC — TRC20 (Tron)",
      "order.payNote":
        "Manual transfer only. Use the address below, then upload your transfer screenshot and transaction hash — both are required to submit.",
      "order.txScreenshot": "Transfer screenshot",
      "order.txHash": "Tx hash",
      "order.submit": "Submit order",
      "order.success": "Submitted successfully",
      "order.successHint": "Recorded under My orders. Status: Pending shipment.",
      "order.close": "Close",
      "order.ph": "Required",
      "order.phOptional": "Optional notes",
      "order.error.required": "Please fill in all required fields.",
      "order.error.tx": "Please enter the transaction hash.",
      "order.error.screenshot": "Please upload a transfer screenshot.",
      "order.error.filesize": "Screenshot must be under 2.5 MB.",
      "order.error.generic": "Something went wrong. Please try again.",
      "order.error.email": "Please enter a valid email address.",
      "order.error.txinvalid": "Enter a valid 64-character transaction hash (with or without 0x).",
      "order.error.badimage": "Upload a valid image file (PNG or JPEG).",
      "gg.p1.gb": "75 GB",
      "gg.p1.gbOld": "25 GB",
      "gg.p1.usdc": "16.51",
      "gg.p1.cny": "≈ CN¥114",
      "gg.p1.promo": "+ 50 GB extra",
      "gg.p2.gb": "150 GB",
      "gg.p2.gbOld": "50 GB",
      "gg.p2.usdc": "19.81",
      "gg.p2.cny": "≈ CN¥136",
      "gg.p2.promo": "+ 100 GB extra",
      "gg.p3.gb": "300 GB",
      "gg.p3.gbOld": "100 GB",
      "gg.p3.usdc": "24.77",
      "gg.p3.cny": "≈ CN¥170",
      "gg.p3.promo": "+ 200 GB extra",
      "gg.p4.gb": "500 GB",
      "gg.p4.usdc": "33.02",
      "gg.p4.cny": "≈ CN¥227",
      "gg.p4.smsBadge": "SMS",
      "gg.p4.sms": "500 free SMS per year",
      "gg.p5.gb": "Unlimited",
      "gg.p5.usdc": "46.66",
      "gg.p5.cny": "≈ CN¥321",
      "gg.p5.smsBadge": "SMS",
      "gg.p5.sms": "2,000 free SMS per year",
      "pricing.title": "Composable identity solutions",
      "pricing.ribbon": "Most chosen",
      "pricing.order": "Order now",
      "pricing.p1.badge": "SMS-first stack",
      "pricing.p1.f1":
        "giffgaff UK SIM + 75GB fixed monthly data + SMS receiving + HK/Macao/Taiwan & overseas address",
      "pricing.p1.f2": "8-hour support window",
      "pricing.p1.f3": "Low-cost proof: validate the workflow before you scale spend",
      "pricing.p1.f4": "Support playbook: activation guidance + common troubleshooting checklist",
      "pricing.p2.badge": "Phone + address stack",
      "pricing.p2.f1":
        "giffgaff UK SIM + 150GB fixed monthly data + choose your number + overseas address + 24h support + SMS + registration walkthrough (what to enter, what to prepare)",
      "pricing.p2.f2": "Fewer KYC / address round-trips by aligning formats the first time (compliance-first)",
      "pricing.p2.f3": "Ideal for Wise, bank letters, and exchange upgrades that demand both proofs",
      "pricing.p3.badge": "Full environment",
      "pricing.p3.f1":
        "giffgaff UK SIM + unlimited monthly data + premium 8888-style vanity number + overseas address (region of your choice) + SMS + fingerprint + IP environment setup + 24h technical assistance",
      "pricing.p3.f2": "Mobile + address + residential-grade IP / clean egress that platforms trust more",
      "pricing.p3.f3": "Anti-detect browser isolation so one device doesn’t torch a whole cluster",
      "pricing.p3.f4": "End-to-end environment review: we surface risk before you get surprise bans",
      "pricing.p3.f5": "1:1 technical follow-up: priority responses, retros, and playbook tweaks",
      "pricing.p3.f6": "Built for high-value accounts and operators who want long-term stability",
      "scenarios.title": "Where teams use EASYID",
      "scenarios.c1.t": "Crypto exchanges",
      "scenarios.c1.p": "Phone, proof-of-address, and clean IP for onboarding that sticks.",
      "scenarios.c2.t": "Cross-border payments",
      "scenarios.c2.p": "Stable identity signals for Wise, PayPal, Stripe, and local wallets.",
      "scenarios.c3.t": "Airdrops & campaigns",
      "scenarios.c3.p": "Repeatable, region-correct setups without burning accounts.",
      "scenarios.c4.t": "SaaS & APIs",
      "scenarios.c4.p": "Sign up for US/EU-only tools with a compliant documentation flow.",
      "scenarios.c5.t": "OTP & messaging",
      "scenarios.c5.p":
        "Stable overseas eSIM and physical SIM for reliable OTP and day-to-day comms — more connectivity options, mix and match as you need.",
      "footer.note": "© EASYID. Identity infrastructure for global operators.",
      feedback: "Feedback",
    },
    zh: {
      skip: "跳到正文",
      "nav.solution": "方案",
      "nav.pricing": "套餐",
      "nav.scenarios": "场景",
      "nav.cta": "立即开始",
      "nav.giffgaff": "giffgaff 卡",
      "nav.agent": "成为代理",
      "nav.orders": "个人订单",
      "nav.contact": "联系我们",
      slogan: "全球身份基础设施服务商",
      "hero.tagline": "一站式海外身份解决方案",
      "hero.title": "轻松获得海外身份基础设施解决方案",
      "hero.b1": "无需出国",
      "hero.b2": "无需复杂流程",
      "hero.b3": "一键获取可用的海外身份环境",
      "pain.title": "这些痛点，你遇到过吗？",
      "pain.p1": "注册海外平台步骤多、门槛高",
      "pain.p2": "没有稳定可用的境外手机号",
      "pain.p3": "KYC 或地址验证反复卡住",
      "solution.title": "我们提供",
      "solution.lead": "一体化栈，而不是零散资源的堆砌",
      "solution.s1": "通信",
      "solution.s2": "地址",
      "solution.s3": "网络",
      "solution.s4": "一站式支持",
      "solution.sell": "我们卖的是成功率——一套完整、可落地的海外身份环境。",
      "modules.gg.tag": "1 · giffgaff 英国手机卡",
      "modules.gg.title": "最稳定的海外实体卡，畅享全球通信",
      "modules.gg.desc":
        "giffgaff 卡为 0 月租；一次性付费后无固定月费等后续费用。发送短信价格为 0.1 欧元/条。建议每半年发送一条任意短信以保号。",
      "modules.m1.tag": "2 · 通信模块",
      "modules.m1.title": "平台认可的可达性",
      "modules.m1.desc":
        "eSIM 与收码 API 支持自动化；英国实体号路径请使用上方 giffgaff 模块下单——号码稳定、归属清晰。",
      "modules.m1.l1": "eSIM",
      "modules.m1.l2": "收码 API",
      "modules.m1.l3": "英国 giffgaff（见模块 1）",
      "modules.m2.tag": "3 · 地址模块",
      "modules.m2.title": "在关键场景可用的地址证明",
      "modules.m2.desc":
        "覆盖港澳台、欧美日韩等地区的收信/注册地址；可选转运地址，集中处理银行与平台信函，降低漏件风险。",
      "modules.m2.l1": "海外地址（收信 / 注册）",
      "modules.m2.l2": "转运地址",
      "modules.m3.tag": "4 · 网络模块",
      "modules.m3.title": "贴近真实用户的环境",
      "modules.m3.desc":
        "与目标地区匹配的住宅 IP，配合独立指纹浏览器环境，减少机房流量与同指纹带来的风控误杀。",
      "modules.m3.l1": "住宅 IP",
      "modules.m3.l2": "指纹浏览器环境",
      "modules.m4.tag": "5 · 账户辅助模块",
      "modules.m4.title": "在合规前提下的陪跑",
      "modules.m4.desc":
        "注册流程拆解与材料清单；KYC 字段说明与格式建议。我们只做合规指导，不提供造假或绕过审核的服务。",
      "modules.m4.l1": "注册指导",
      "modules.m4.l2": "KYC 辅助（合规优先）",
      "modules.agent.tag": "6 · 成为代理",
      "modules.agent.subtitle": "开放渠道 · 欢迎加盟",
      "giffgaff.plansTitle": "一次性购卡（USDC）",
      "giffgaff.title": "giffgaff 英国手机卡 · 一次性购卡",
      "giffgaff.sub":
        "所有 giffgaff 均为 0 月租，一次性购卡无需后续付费。下列 USDC 为 EASYID 一次性购卡费用。人民币价格按 1 USDC ≈ ¥6.88 估算，仅供参考。实体 SIM 另加收本标价 10% 运费。",
      "giffgaff.data": "流量",
      "giffgaff.usdc": "USDC",
      "giffgaff.once": "一次性购卡",
      "giffgaff.boost": "Data Boost",
      "gg.order": "立即下单",
      "orders.title": "个人订单",
      "orders.empty": "暂无订单",
      "agent.p1": "代理需缴纳加盟费（含API技术服务费）200 USDC。平台抽佣 10%，剩下归你自己拿。",
      "agent.p2": "我们提供平台与稳定进货渠道，欢迎有能力的人加入！",
      "agent.cta": "加入代理",
      "contact.title": "联系我们",
      "contact.sub": "商务合作、定制方案或售后问题，欢迎联系，我们会在两小时内回复。",
      "contact.inquiry": "咨询反馈",
      "contact.telegram": "Telegram",
      "contact.telegramHandle": "@EASYID_TG",
      "order.modalTitle": "giffgaff 下单",
      "order.modalBundle": "组合套餐下单",
      "order.plan": "所选套餐",
      "order.lastName": "姓",
      "order.firstName": "名",
      "order.email": "邮箱",
      "order.contact": "联系方式（微信 / Telegram 等）",
      "order.recipientName": "收件人",
      "order.recipientPhone": "手机号码",
      "order.address": "收件地址",
      "order.cardType": "卡类型",
      "order.esim": "eSIM（无实体寄送）",
      "order.physical": "实体卡（加收购卡标价 10% 运费）",
      "order.pricing": "费用明细",
      "order.base": "购卡标价（USDC）",
      "order.shipping": "运费（USDC）",
      "order.total": "应付（USDC）",
      "order.payment": "支付方式",
      "order.payEvm": "USDC — EVM（Arbitrum / 以太坊 / BNB 链）",
      "order.payTrc": "USDC — TRC20（波场）",
      "order.payNote":
        "手动链上转账。请向下列地址付款后，上传转账截图并填写交易哈希——两项均必填方可提交。",
      "order.txScreenshot": "转账截图",
      "order.txHash": "交易哈希（Tx Hash）",
      "order.submit": "提交订单",
      "order.success": "提交成功",
      "order.successHint": "已记入个人订单，状态：待发货。",
      "order.close": "关闭",
      "order.ph": "必填",
      "order.phOptional": "选填备注",
      "order.error.required": "请填写所有必填项。",
      "order.error.tx": "请填写交易哈希。",
      "order.error.screenshot": "请上传转账截图。",
      "order.error.filesize": "截图需小于 2.5 MB。",
      "order.error.generic": "提交失败，请重试。",
      "order.error.email": "请填写有效的邮箱地址。",
      "order.error.txinvalid": "请填写有效的交易哈希（64 位十六进制，可带或不带 0x）。",
      "order.error.badimage": "请上传有效的图片文件（PNG 或 JPEG）。",
      "gg.p1.gb": "75 GB",
      "gg.p1.gbOld": "25 GB",
      "gg.p1.usdc": "16.51",
      "gg.p1.cny": "约合 ¥114",
      "gg.p1.promo": "额外赠送 50GB",
      "gg.p2.gb": "150 GB",
      "gg.p2.gbOld": "50 GB",
      "gg.p2.usdc": "19.81",
      "gg.p2.cny": "约合 ¥136",
      "gg.p2.promo": "额外赠送 100GB",
      "gg.p3.gb": "300 GB",
      "gg.p3.gbOld": "100 GB",
      "gg.p3.usdc": "24.77",
      "gg.p3.cny": "约合 ¥170",
      "gg.p3.promo": "额外赠送 200GB",
      "gg.p4.gb": "500 GB",
      "gg.p4.usdc": "33.02",
      "gg.p4.cny": "约合 ¥227",
      "gg.p4.smsBadge": "短信",
      "gg.p4.sms": "年度 500 条免费短信",
      "gg.p5.gb": "无限流量",
      "gg.p5.usdc": "46.66",
      "gg.p5.cny": "约合 ¥321",
      "gg.p5.smsBadge": "短信",
      "gg.p5.sms": "年度 2000 条免费短信",
      "pricing.title": "组合式身份解决方案",
      "pricing.ribbon": "最多人选",
      "pricing.order": "立即下单",
      "pricing.p1.badge": "验讯先行版",
      "pricing.p1.f1": "giffgaff 实体号 + 每月 75G 固定流量 + 收码通信 + 港澳台海外地址",
      "pricing.p1.f2": "8 小时客服支持",
      "pricing.p1.f3": "低成本试错：先验证业务跑通，再决定是否加码",
      "pricing.p1.f4": "客服响应：开通指引 + 常见问题排查清单",
      "pricing.p2.badge": "双证开号版",
      "pricing.p2.f1":
        "giffgaff 实体号 + 每月 150G 固定流量 + 自选手机号码 + 海外地址 + 24 小时客服支持 + 收码通信 + 注册全流程拆解（字段怎么填、材料怎么备）",
      "pricing.p2.f2": "显著降低 KYC / 地址核验被打回的概率（合规前提下对齐口径）",
      "pricing.p2.f3": "适合 Wise、银行信函、交易所进阶认证等「双证」场景",
      "pricing.p3.badge": "全环境旗舰版",
      "pricing.p3.f1":
        "giffgaff 实体号 + 每月无限流量 + 8888 豹子精品靓号 + 海外地址（自选地区）+ 收码通信 + 网络指纹 + IP 环境搭建 + 24 小时技术协助支持",
      "pricing.p3.f2": "手机 + 地址 + 住宅级 IP / 干净网络出口，风控视角更顺眼",
      "pricing.p3.f3": "指纹浏览器环境隔离方案，避免同设备多账号连坐",
      "pricing.p3.f4": "从注册到环境验收：关键风险点前置排查，少踩「莫名其妙封号」",
      "pricing.p3.f5": "1v1 技术跟单：优先响应、可复盘、可迭代你的 SOP",
      "pricing.p3.f6": "面向高价值账号与追求长期稳定客户，省心一把梭",
      "scenarios.title": "使用场景",
      "scenarios.c1.t": "注册交易所",
      "scenarios.c1.p": "手机、地址证明与干净 IP，让开户资料一次对齐平台要求。",
      "scenarios.c2.t": "海外支付",
      "scenarios.c2.p": "Wise、PayPal、Stripe 及本地钱包所需的稳定身份信号。",
      "scenarios.c3.t": "空投撸毛",
      "scenarios.c3.p": "可复用的地区正确环境，降低批量注册带来的封号率。",
      "scenarios.c4.t": "SaaS 工具",
      "scenarios.c4.p": "注册仅限美欧等地的 SaaS 与 API，在合规材料流中完成开通。",
      "scenarios.c5.t": "接码通信",
      "scenarios.c5.p": "稳定海外 eSIM 与实体手机卡，收码与日常通信更可靠；覆盖更多海外通信路径，按需组合方案。",
      "footer.note": "© EASYID · 面向全球业务运营者的身份基础设施。",
      feedback: "反馈",
    },
  };

  const STORAGE_KEY = "easyid-lang";
  const DEFAULT_LANG = "zh";

  function getStoredLang() {
    try {
      const v = localStorage.getItem(STORAGE_KEY);
      if (v === "en" || v === "zh") return v;
    } catch (_) {}
    return null;
  }

  function setStoredLang(lang) {
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (_) {}
  }

  function applyLang(lang) {
    const dict = STRINGS[lang] || STRINGS[DEFAULT_LANG];
    document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
    document.body.classList.toggle("lang-zh", lang === "zh");
    document.body.classList.toggle("lang-en", lang === "en");

    document.title =
      lang === "zh"
        ? "EASYID — 全球身份基础设施服务商"
        : "EASYID — Global Identity Infrastructure Provider";

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (key && dict[key] != null) {
        el.textContent = dict[key];
      }
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
      const key = el.getAttribute("data-i18n-placeholder");
      if (key && dict[key] != null) {
        el.setAttribute("placeholder", dict[key]);
      }
    });

    document.querySelectorAll(".lang-btn").forEach((btn) => {
      const isActive = btn.getAttribute("data-lang") === lang;
      btn.classList.toggle("active", isActive);
      btn.setAttribute("aria-pressed", isActive ? "true" : "false");
    });

    setStoredLang(lang);
    document.dispatchEvent(new CustomEvent("easyid-lang-applied", { detail: { lang } }));
  }

  window.EASYID_I18N = {
    STRINGS,
    applyLang,
    getLang() {
      return getStoredLang() || DEFAULT_LANG;
    },
    init() {
      const stored = getStoredLang();
      const initial = stored || DEFAULT_LANG;
      applyLang(initial);

      document.querySelectorAll(".lang-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
          const lang = btn.getAttribute("data-lang");
          if (lang === "en" || lang === "zh") applyLang(lang);
        });
      });
    },
  };
})();
