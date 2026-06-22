import React, { useState, useMemo, useEffect, useRef } from "react";
import {
  AreaChart, Area, BarChart, Bar, ResponsiveContainer, Tooltip, XAxis, YAxis,
  PieChart, Pie, Cell,
} from "recharts";
import {
  LayoutDashboard, Users, Building2, Target, KanbanSquare, CheckSquare, BarChart3,
  KeyRound, Phone, Plus, X, Search, MapPin, Home, Banknote, ChevronLeft, ChevronRight,
  Flame, Snowflake, Thermometer, Mail, MessageCircle, Calendar, FileText, UserPlus,
  StickyNote, GitBranch, CheckCircle2, Clock, AlertCircle, Bell, ArrowLeft, Sparkles,
  CircleDot, Wand2, Zap, ArrowUpRight, ArrowDownRight, Percent, Moon, Sun,
  ArrowUpDown, LayoutGrid, List, Car, ArrowUpFromLine, Trees, Shield, Maximize2,
  Image as ImageIcon, Download, Eye, Handshake, Award, Timer, Activity, Lightbulb,
  Inbox, Check, TrendingUp, Rocket, ChevronDown,
  Briefcase, Landmark, Scale, Ruler, HardHat, FileSignature, Share2, Send,
  Calculator, Megaphone, Copy, Star, FileCheck, PenLine, ClipboardList,
  Settings, Facebook, UserCog, MessageSquare, Files, LogOut, MoreHorizontal, Menu,
} from "lucide-react";

/* ╔══════════════════════════ BEGIN PURE LOGIC ══════════════════════════╗ */
function rng(seed) {
  return function () {
    seed |= 0; seed = (seed + 0x6D2B79F5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const R = rng(20260622);
const pick = (a) => a[Math.floor(R() * a.length)];
const int = (a, b) => a + Math.floor(R() * (b - a + 1));
const chance = (p) => R() < p;
const sample = (a, k) => { const c = [...a]; const o = []; while (o.length < k && c.length) o.push(c.splice(Math.floor(R() * c.length), 1)[0]); return o; };

const NM_M = ["יוסי", "אבי", "משה", "דוד", "עומר", "איתי", "רון", "גיא", "ניר", "עידו", "אורי", "עמית", "יובל", "שחר", "ליאור", "אלון", "דניאל", "נדב", "אסף", "רועי", "עידן", "מתן", "שי", "איתמר", "תומר"];
const NM_F = ["דנה", "מיכל", "שירה", "רונית", "נועה", "יעל", "תמר", "הדר", "ליאת", "מאיה", "אורית", "עינת", "גלית", "קרן", "סיון", "רותם", "אפרת", "ענת", "שני", "מור", "דפנה", "חן", "ספיר", "אביגיל", "טל"];
const LAST = ["כהן", "לוי", "מזרחי", "פרץ", "ביטון", "אברהם", "דהן", "אזולאי", "גולן", "נחום", "פרידמן", "בר", "שרון", "חדד", "אוחיון", "גבאי", "מלכה", "עמר", "בן דוד", "שמש", "רוזן", "קליין", "שפירא", "ברק", "נוי", "הררי", "סבן", "יוסף", "טל", "אדרי"];
const CITIES = {
  "תל אביב": ["לב העיר", "פלורנטין", "הצפון הישן", "הצפון החדש", "נווה צדק", "רמת אביב", "יד אליהו"],
  "רמת גן": ["מרכז", "שכונת הוותיקים", "רמת חן", "תל בנימין", "מרום נווה"],
  "גבעתיים": ["בורוכוב", "שינקין", "גבעת רמב\"ם", "שכונת התקווה"],
  "פתח תקווה": ["מרכז", "כפר גנים", "אם המושבות", "הדר גנים", "נווה עוז"],
  "בני ברק": ["מרכז", "פרדס כץ", "שיכון ה'", "זכרון מאיר"],
  "הרצליה": ["מרכז", "הרצליה פיתוח", "נווה עמל", "יד התשעה"],
  "רעננה": ["מרכז", "קרית שרת", "נווה זמר"],
  "חולון": ["מרכז", "נאות יהודה", "קרית שרת", "ח-300"],
  "ראשון לציון": ["מרכז", "נווה ים", "רמת אליהו", "קרית גנים"],
  "גבעת שמואל": ["מרכז", "רמת אילן"],
};
const CITY_LIST = Object.keys(CITIES);
const PPSM = { "תל אביב": 44000, "הרצליה": 39000, "גבעתיים": 31000, "רעננה": 31000, "רמת גן": 29000, "גבעת שמואל": 27000, "ראשון לציון": 25000, "חולון": 25000, "פתח תקווה": 23000, "בני ברק": 22000 };
const STREETS = ["הרצל", "ביאליק", "ז'בוטינסקי", "רוטשילד", "ויצמן", "בן גוריון", "סוקולוב", "אחד העם", "דיזנגוף", "אבן גבירול", "קק\"ל", "המעפילים", "הנביאים", "בלפור", "ארלוזורוב", "טשרניחובסקי", "אלנבי", "החשמונאים", "ירושלים", "המלך ג'ורג'"];
const PTYPES = ["דירה", "דירה", "דירה", "דירת גן", "פנטהאוז", "דופלקס", "מיני פנטהאוז", "בית פרטי"];
const CONDS = ["חדש מקבלן", "משופץ", "שמור", "דרוש שיפוץ"];
const SOURCES = ["יד2", "פייסבוק", "המלצה", "אתר", "שלט", "אינסטגרם", "גוגל"];
const LEAD_STATUS = ["חדש", "נוצר קשר", "בטיפול", "הבשלה", "סגור"];
const AGENTS = [
  { id: 1, name: "רועי לוי" }, { id: 2, name: "מאיה כהן" }, { id: 3, name: "אבי דהן" },
  { id: 4, name: "שירה גולן" }, { id: 5, name: "עידן בר" },
];
const DEAL_STAGES = [
  { key: "ליד", label: "ליד", color: "blue", prob: 10 },
  { key: "פגישה", label: "פגישה", color: "indigo", prob: 25 },
  { key: "צפייה", label: "צפייה בנכס", color: "cyan", prob: 45 },
  { key: "מו\"מ", label: "משא ומתן", color: "amber", prob: 65 },
  { key: "חוזה", label: "חוזה", color: "orange", prob: 85 },
  { key: "נסגר", label: "נסגר", color: "green", prob: 100 },
];
const stageObj = (k) => DEAL_STAGES.find((s) => s.key === k) || DEAL_STAGES[0];

function genContacts() {
  const out = [];
  for (let i = 1; i <= 50; i++) {
    const g = chance(0.5) ? "m" : "f";
    const name = pick(g === "m" ? NM_M : NM_F) + " " + pick(LAST);
    const areas = sample(CITY_LIST, int(1, 2));
    const minRooms = pick([2, 3, 3, 4, 4, 5]);
    out.push({
      id: i, name, kind: "קונה", gender: g,
      phone: "05" + pick(["0", "2", "3", "4"]) + "-" + int(2000000, 9999999),
      email: "lead" + i + "@mail.com", source: pick(SOURCES), agentId: pick(AGENTS).id,
      createdAgo: int(1, 130), lastContactAgo: int(0, 28), status: pick(LEAD_STATUS),
      budget: int(13, 42) * 100000, minRooms, minSize: minRooms * 18 + int(-6, 12), areas,
      needElevator: chance(0.6), needParking: chance(0.7), needBalcony: chance(0.55), needMamad: chance(0.45),
    });
  }
  for (let i = 51; i <= 74; i++) {
    const g = chance(0.5) ? "m" : "f";
    out.push({
      id: i, name: pick(g === "m" ? NM_M : NM_F) + " " + pick(LAST), kind: "מוכר", gender: g,
      phone: "05" + pick(["0", "2", "3", "4"]) + "-" + int(2000000, 9999999),
      email: "owner" + i + "@mail.com", source: pick(SOURCES), agentId: pick(AGENTS).id,
      createdAgo: int(10, 200), lastContactAgo: int(0, 40), status: "בטיפול",
    });
  }
  return out;
}

function genProperties(contacts) {
  const owners = contacts.filter((c) => c.kind === "מוכר");
  const out = [];
  for (let i = 1; i <= 42; i++) {
    const city = pick(CITY_LIST);
    const nbh = pick(CITIES[city]);
    const type = pick(PTYPES);
    const rooms = type === "פנטהאוז" || type === "בית פרטי" ? int(4, 6) : int(2, 5);
    const size = Math.round(rooms * int(20, 26) + int(-5, 12));
    const floors = int(2, 18);
    const floor = type === "דירת גן" || type === "בית פרטי" ? 0 : type.includes("פנטהאוז") ? floors : int(1, floors);
    const cond = pick(CONDS);
    const condF = { "חדש מקבלן": 1.12, "משופץ": 1.04, "שמור": 1.0, "דרוש שיפוץ": 0.88 }[cond];
    const typeF = type.includes("פנטהאוז") ? 1.25 : type === "בית פרטי" ? 1.3 : type === "דופלקס" ? 1.1 : type === "דירת גן" ? 1.08 : 1;
    const price = Math.round((size * PPSM[city] * condF * typeF) / 10000) * 10000;
    const owner = pick(owners);
    out.push({
      id: i, addr: pick(STREETS) + " " + int(1, 140), city, nbh, type, rooms, size,
      floor, floors, elevator: floor <= 1 ? chance(0.5) : chance(0.78), parking: chance(0.72),
      balcony: chance(0.7), mamad: chance(0.55), yearBuilt: int(1962, 2025), cond, price,
      status: "זמין", ownerId: owner.id, agentId: owner.agentId,
      listedAgo: int(3, 160), views: int(18, 420), photoSeed: 100 + i,
      exclusive: false, exclEndDays: null,
    });
  }
  return out;
}

function genDeals(contacts, props) {
  const buyers = contacts.filter((c) => c.kind === "קונה");
  const out = [];
  const usedProps = new Set();
  for (let i = 1; i <= 22; i++) {
    const buyer = pick(buyers);
    let prop = pick(props);
    let guard = 0;
    while (usedProps.has(prop.id) && guard++ < 20) prop = pick(props);
    usedProps.add(prop.id);
    const stage = pick(["ליד", "פגישה", "פגישה", "צפייה", "צפייה", "מו\"מ", "מו\"מ", "חוזה", "נסגר", "נסגר"]);
    const asking = prop.price;
    const commPct = pick([1.5, 2, 2, 2]);
    const offers = [];
    if (["מו\"מ", "חוזה", "נסגר"].includes(stage)) {
      let base = Math.round(asking * (0.9 + R() * 0.05) / 1000) * 1000;
      offers.push({ amount: base, by: "buyer", daysAgo: int(8, 20) });
      offers.push({ amount: Math.round(asking * (0.95 + R() * 0.03) / 1000) * 1000, by: "seller", daysAgo: int(3, 7) });
    }
    const close = stage === "נסגר" ? Math.round(asking * (0.93 + R() * 0.05) / 1000) * 1000 : null;
    out.push({
      id: i, buyerId: buyer.id, propId: prop.id, agentId: prop.agentId, stage,
      asking, offer: offers.length ? offers[offers.length - 1].amount : null, close, commPct,
      createdAgo: int(5, 90), closeInDays: stage === "נסגר" ? null : int(3, 45),
      closedAgo: stage === "נסגר" ? int(1, 75) : null, offers,
    });
  }
  return out;
}

function reconcile(props, deals) {
  deals.forEach((d) => {
    const p = props.find((x) => x.id === d.propId);
    if (!p) return;
    if (d.stage === "נסגר") p.status = "נמכר";
    else if (p.status !== "נמכר") p.status = "בעסקה";
  });
  props.forEach((p) => {
    if (p.status === "זמין" && chance(0.4)) { p.status = "בלעדיות"; p.exclusive = true; p.exclEndDays = int(-4, 75); }
    else if (p.status === "בעסקה" && chance(0.5)) { p.exclusive = true; p.exclEndDays = int(5, 90); }
  });
  return props;
}

function genActivities(contacts, deals) {
  const out = [];
  let id = 1;
  const TX = {
    ליד: ["ליד חדש נכנס למערכת", "פנייה ראשונית התקבלה"],
    שיחה: ["שיחת היכרות וברור צרכים", "שיחת מעקב — עדכון סטטוס", "תיאום ציפיות ותקציב"],
    וואטסאפ: ["שלח/ה הודעת וואטסאפ", "שיחת וואטסאפ — תיאום המשך"],
    פגישה: ["פגישה במשרד", "פגישת ייעוץ ראשונית"],
    צפייה: ["הצגת נכס בשטח", "סיור בנכס — תגובה חיובית", "צפייה חוזרת בנכס"],
    אימייל: ["נשלח מייל עם פרטי נכס", "נשלחה הצעת מחיר רשמית"],
    שלב: ["העסקה קודמה לשלב הבא", "עדכון שלב בעסקה"],
    הערה: ["מתעניין/ת מאוד — לחזור השבוע", "ממתינים לאישור משכנתא", "צריך/ה למכור נכס קיים קודם"],
  };
  deals.forEach((d) => {
    const stages = ["ליד", "שיחה", "פגישה", "צפייה", "אימייל", "שלב", "הערה", "וואטסאפ"];
    const n = int(4, 8);
    let day = int(20, 70);
    for (let k = 0; k < n; k++) {
      const type = stages[Math.min(k, stages.length - 1)];
      day = Math.max(0, day - int(2, 9));
      out.push({ id: id++, contactId: d.buyerId, dealId: d.id, propId: d.propId, type, text: pick(TX[type] || TX.הערה), daysAgo: day });
    }
  });
  contacts.filter((c) => c.kind === "קונה").forEach((c) => {
    if (!deals.some((d) => d.buyerId === c.id) && chance(0.6)) {
      out.push({ id: id++, contactId: c.id, dealId: null, propId: null, type: "ליד", text: pick(TX.ליד), daysAgo: c.createdAgo });
      if (chance(0.5)) out.push({ id: id++, contactId: c.id, dealId: null, propId: null, type: "שיחה", text: pick(TX.שיחה), daysAgo: c.lastContactAgo });
    }
  });
  return out;
}

function genTasks(contacts, deals, props) {
  const out = [];
  let id = 1;
  const buyers = contacts.filter((c) => c.kind === "קונה");
  buyers.filter((c) => c.lastContactAgo >= 5 && c.status !== "סגור").slice(0, 14).forEach((c) => {
    out.push({ id: id++, title: "ליצור קשר — אין מענה " + c.lastContactAgo + " ימים", type: "שיחה", priority: c.lastContactAgo >= 12 ? "גבוהה" : "בינונית", dueIn: c.lastContactAgo >= 12 ? -1 : 0, contactId: c.id, dealId: null, auto: true, done: false });
  });
  deals.forEach((d) => {
    if (d.stage === "חוזה") out.push({ id: id++, title: "הכנת חוזה מכר לחתימה", type: "מסמך", priority: "גבוהה", dueIn: int(0, 2), contactId: d.buyerId, dealId: d.id, auto: true, done: false });
    if (d.stage === "צפייה" && chance(0.6)) out.push({ id: id++, title: "תיאום צפייה חוזרת בנכס", type: "פגישה", priority: "בינונית", dueIn: int(1, 4), contactId: d.buyerId, dealId: d.id, auto: false, done: false });
    if (d.stage === "מו\"מ" && chance(0.7)) out.push({ id: id++, title: "מעקב משא ומתן — לחזור עם תשובה", type: "מעקב", priority: "גבוהה", dueIn: int(-2, 1), contactId: d.buyerId, dealId: d.id, auto: true, done: false });
    if (d.stage === "ליד") out.push({ id: id++, title: "שיחת חימום לליד חדש", type: "שיחה", priority: "בינונית", dueIn: int(0, 2), contactId: d.buyerId, dealId: d.id, auto: true, done: false });
  });
  props.filter((p) => p.exclusive && p.exclEndDays != null && p.exclEndDays <= 14).forEach((p) => {
    out.push({ id: id++, title: "חידוש בלעדיות — " + p.addr, type: "מסמך", priority: p.exclEndDays < 0 ? "גבוהה" : "בינונית", dueIn: Math.max(-2, p.exclEndDays), contactId: p.ownerId, dealId: null, propId: p.id, auto: true, done: false });
  });
  return out;
}

function genViewings(props, contacts) {
  const buyers = contacts.filter((c) => c.kind === "קונה");
  const FB = ["אהבו מאוד", "מתלבטים", "יקר מדי עבורם", "ביקשו צפייה חוזרת", "לא התאים — חדרים", "תגובה פושרת"];
  const map = {};
  props.forEach((p) => {
    const n = Math.min(buyers.length, int(0, 5) + (p.views > 200 ? 2 : 0));
    map[p.id] = sample(buyers, n).map((b) => ({ name: b.name, daysAgo: int(1, 40), feedback: pick(FB) })).sort((a, b) => a.daysAgo - b.daysAgo);
  });
  return map;
}

// ── professionals directory (mortgage advisors / appraisers / lawyers / advisors / architects / contractors) ──
const PRO_TYPES = ["יועץ משכנתאות", "שמאי", "עו\"ד", "יועץ נדל\"ן", "אדריכל", "קבלן שיפוצים"];
const PRO_ORG = { "יועץ משכנתאות": ["משכנתא פלוס", "אמון פיננסים", "ביתא הלוואות"], "שמאי": ["שמאות צפון", "אורן שמאים", "מדד נכסים"], "עו\"ד": ["משרד כהן ושות׳", "לוי-בר עו\"ד", "אדרת משפט"], "יועץ נדל\"ן": ["נדל\"ן חכם", "פרו ייעוץ"], "אדריכל": ["סטודיו קו", "אדריכלות מודרנית"], "קבלן שיפוצים": ["בנה ביתך", "שיפוצי פרימיום"] };
function genPros() {
  const out = []; let id = 1;
  PRO_TYPES.forEach((type) => {
    const n = type === "יועץ משכנתאות" || type === "עו\"ד" ? 3 : type === "שמאי" ? 3 : 2;
    for (let k = 0; k < n; k++) {
      const g = chance(0.5) ? "m" : "f";
      out.push({ id: id++, name: pick(g === "m" ? NM_M : NM_F) + " " + pick(LAST), type, org: pick(PRO_ORG[type]),
        phone: "05" + pick(["0", "2", "3", "4"]) + "-" + int(2000000, 9999999), email: "pro" + id + "@mail.com",
        rating: (4 + R() * 1).toFixed(1), deals: 0 });
    }
  });
  return out;
}
const BANKS = ["לאומי", "הפועלים", "מזרחי טפחות", "דיסקונט", "הבינלאומי"];
const DOC_BY_STAGE = {
  "צפייה": [["טופס גילוי נאות", "טופס"]],
  "מו\"מ": [["טופס גילוי נאות", "טופס"], ["הצעת מחיר רשמית", "הצעה"]],
  "חוזה": [["טופס גילוי נאות", "טופס"], ["הצעת מחיר רשמית", "הצעה"], ["זכרון דברים", "משפטי"], ["חוזה מכר — טיוטה", "חוזה"]],
  "נסגר": [["הצעת מחיר רשמית", "הצעה"], ["זכרון דברים", "משפטי"], ["חוזה מכר", "חוזה"], ["נסח טאבו מעודכן", "טופס"]],
};
function enrichDeals(deals, pros) {
  const advisors = pros.filter((p) => p.type === "יועץ משכנתאות");
  const appraisers = pros.filter((p) => p.type === "שמאי");
  const lawyers = pros.filter((p) => p.type === "עו\"ד");
  const order = ["ליד", "פגישה", "צפייה", "מו\"מ", "חוזה", "נסגר"];
  deals.forEach((d) => {
    const si = order.indexOf(d.stage);
    // mortgage
    const mStatus = si <= 1 ? "לא התחיל" : si === 2 ? "בתהליך" : si === 3 ? "אישור עקרוני" : "אושר סופית";
    const ltv = pick([60, 65, 70, 75]);
    const loan = Math.round(dealValue(d) * ltv / 100 / 1000) * 1000;
    const mOffers = si >= 2 ? sample(BANKS, int(2, 3)).map((b) => ({ bank: b, rate: (3.5 + R() * 1.6).toFixed(2), amount: loan })) : [];
    const missing = si <= 2 ? sample(["תלושי שכר", "דפי חשבון 3 חוד׳", "אישור הון עצמי", "תעודת זהות"], int(1, 3)) : [];
    const advisorId = si >= 2 ? pick(advisors).id : null;
    // appraisal
    const aStatus = si <= 2 ? "לא הוזמן" : si === 3 ? "הוזמן" : "בוצע";
    const aVal = aStatus === "בוצע" ? Math.round(dealValue(d) * (0.96 + R() * 0.07) / 1000) * 1000 : null;
    const appraiserId = si >= 3 ? pick(appraisers).id : null;
    // legal
    const cStatus = si <= 2 ? "טיוטה" : si === 3 ? "בבדיקה" : si === 4 ? "מוכן לחתימה" : "נחתם";
    const buyerLawyerId = si >= 3 ? pick(lawyers).id : null;
    const sellerLawyerId = si >= 3 ? pick(lawyers).id : null;
    // docs
    const tmpl = DOC_BY_STAGE[d.stage] || [];
    const docs = tmpl.map((t, i) => {
      let st = "טיוטה";
      if (d.stage === "נסגר") st = "נחתם";
      else if (d.stage === "חוזה") st = t[1] === "חוזה" ? "נשלח" : i === 0 ? "נחתם" : "נפתח";
      else if (d.stage === "מו\"מ") st = i === 0 ? "נחתם" : "נשלח";
      return { id: d.id * 100 + i, name: t[0], type: t[1], status: st, updatedAgo: int(0, 14) };
    });
    const proIds = [advisorId, appraiserId, buyerLawyerId].filter(Boolean);
    proIds.forEach((pid) => { const pr = pros.find((x) => x.id === pid); if (pr) pr.deals++; });
    d.tx = {
      mortgage: { status: mStatus, ltv, loan, bank: mOffers[0] ? mOffers[0].bank : null, offers: mOffers, missing, advisorId },
      appraisal: { status: aStatus, value: aVal, appraiserId },
      legal: { contractStatus: cStatus, buyerLawyerId, sellerLawyerId },
    };
    d.docs = docs;
    d.proIds = proIds;
  });
}

function matchScore(buyer, p) {
  if (!buyer.budget || p.status === "נמכר") return null;
  const reasons = [];
  let s = 0;
  const add = (pts, t, b, d) => { s += pts; reasons.push({ t, b, d, pts }); };
  if (buyer.areas.includes(p.city)) add(22, "pos", "אזור מועדף", p.city + " ברשימת הלקוח");
  else add(6, "mid", "אזור חלופי", p.city + " מחוץ לאזורים");
  const r = p.price / buyer.budget;
  if (r <= 0.95) add(24, "pos", "מתחת לתקציב", "נמוך ב-" + Math.round((1 - r) * 100) + "%");
  else if (r <= 1.0) add(21, "pos", "בתוך התקציב", "תואם תקציב");
  else if (r <= 1.08) add(11, "mid", "מעט מעל התקציב", "חריגה " + Math.round((r - 1) * 100) + "%");
  else add(0, "neg", "מעל התקציב", "חריגה " + Math.round((r - 1) * 100) + "%");
  if (p.rooms === buyer.minRooms) add(16, "pos", "חדרים מדויק", p.rooms + " חד׳");
  else if (p.rooms > buyer.minRooms) add(13, "pos", "חדרים מעל הדרישה", p.rooms + " חד׳");
  else if (p.rooms >= buyer.minRooms - 1) add(6, "mid", "חדר אחד פחות", p.rooms + "/" + buyer.minRooms);
  else add(0, "neg", "חסרים חדרים", p.rooms + "/" + buyer.minRooms);
  if (p.size >= buyer.minSize) add(12, "pos", "שטח מתאים", p.size + " מ״ר");
  else if (p.size >= buyer.minSize * 0.9) add(7, "mid", "שטח גבולי", p.size + " מ״ר");
  else add(0, "neg", "שטח קטן", p.size + " מ״ר");
  if (buyer.needElevator) { if (p.elevator) add(8, "pos", "מעלית ✓", "כנדרש"); else add(0, "neg", "אין מעלית", "נדרש"); } else s += 8;
  if (buyer.needParking) { if (p.parking) add(8, "pos", "חניה ✓", "כנדרש"); else add(0, "neg", "אין חניה", "נדרש"); } else s += 8;
  if (buyer.needBalcony) { if (p.balcony) add(5, "pos", "מרפסת ✓", "כנדרש"); else add(0, "neg", "אין מרפסת", "נדרש"); } else s += 5;
  if (buyer.needMamad) { if (p.mamad) add(5, "pos", "ממ״ד ✓", "כנדרש"); else add(0, "neg", "אין ממ״ד", "נדרש"); } else s += 5;
  return { score: Math.max(0, Math.min(100, Math.round(s))), reasons };
}

function leadScore(c, acts, deals) {
  if (c.kind !== "קונה") return { score: 0, tier: "—" };
  let s = 0;
  const last = c.lastContactAgo;
  s += last <= 2 ? 30 : last <= 6 ? 20 : last <= 13 ? 10 : 2;
  const ac = acts.filter((a) => a.contactId === c.id).length;
  s += Math.min(ac * 5, 25);
  const d = deals.find((x) => x.buyerId === c.id);
  if (d) s += Math.round(stageObj(d.stage).prob * 0.3);
  if (c.budget) s += 8;
  if (c.status === "הבשלה") s += 6;
  s = Math.max(0, Math.min(100, s));
  return { score: s, tier: s >= 66 ? "חם" : s >= 40 ? "בינוני" : "קר" };
}

const dealValue = (d) => d.close || d.offer || d.asking;
const commission = (d) => Math.round(dealValue(d) * d.commPct / 100);
const isActive = (d) => d.stage !== "נסגר";
const money = (n) => "₪" + Math.round(n).toLocaleString("he-IL");
const short = (n) => n >= 1e6 ? "₪" + (n / 1e6).toFixed(n % 1e6 === 0 ? 0 : 1) + "M" : n >= 1e3 ? "₪" + Math.round(n / 1e3) + "K" : "₪" + Math.round(n);
const agoLbl = (d) => d <= 0 ? "היום" : d === 1 ? "אתמול" : "לפני " + d + " ימים";
const dueLbl = (d) => d < 0 ? "באיחור " + -d + " ימים" : d === 0 ? "היום" : d === 1 ? "מחר" : "בעוד " + d + " ימים";

const _contacts = genContacts();
const _props = reconcile(genProperties(_contacts), []);
const DB_DEALS = genDeals(_contacts, _props);
reconcile(_props, DB_DEALS);
const DB_CONTACTS = _contacts;
const DB_PROPS = _props;
const DB_ACTS = genActivities(_contacts, DB_DEALS);
const DB_TASKS = genTasks(_contacts, DB_DEALS, _props);
const DB_VIEWINGS = genViewings(_props, _contacts);
const DB_PROS = genPros();
enrichDeals(DB_DEALS, DB_PROS);
const MONTHLY_GOAL = 280000;
const USER_TYPES = ["מתווך", "מנהל משרד", "יועץ משכנתאות", "שמאי", "עו\"ד", "בעל נכס", "לקוח"];
const DB_USERS = AGENTS.map((a, i) => ({ id: a.id, name: a.name, type: i === 0 ? "מנהל משרד" : "מתווך", phone: "05" + pick(["0", "2", "3"]) + "-" + int(2000000, 9999999), email: "user" + a.id + "@nadlanpro.co.il", status: "פעיל" }));
/* ╚══════════════════════════ END PURE LOGIC ══════════════════════════╝ */

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700;800&family=Heebo:wght@300;400;500;600;700;800;900&display=swap');
.nx{
  --bg:#F8FAFC; --surface:#FFFFFF; --surface2:#F1F5F9; --ink:#0F172A; --soft:#64748B; --faint:#94A3B8;
  --line:#E7EBF0; --line2:#EEF2F7; --hover:#F4F7FA;
  --brand:#2563EB; --brand-d:#1D4ED8; --brand-soft:rgba(37,99,235,.10); --brand-ink:#1E40AF;
  --blue:#2563EB; --indigo:#6366F1; --cyan:#0891B2; --amber:#D97706; --orange:#EA580C;
  --green:#16A34A; --red:#DC2626; --purple:#9333EA; --pink:#DB2777;
  --blue-soft:rgba(37,99,235,.11); --indigo-soft:rgba(99,102,241,.12); --cyan-soft:rgba(8,145,178,.12);
  --amber-soft:rgba(217,119,6,.13); --orange-soft:rgba(234,88,12,.12); --green-soft:rgba(22,163,74,.12);
  --red-soft:rgba(220,38,38,.11); --purple-soft:rgba(147,51,234,.12); --pink-soft:rgba(219,39,119,.12);
  --sh:0 1px 2px rgba(15,23,42,.04),0 1px 3px rgba(15,23,42,.06);
  --sh2:0 12px 32px -10px rgba(15,23,42,.20);
  --rad:18px;
  direction:rtl;background:var(--bg);color:var(--ink);font-family:'Heebo',sans-serif;min-height:100vh;min-height:100dvh;
  -webkit-font-smoothing:antialiased;font-size:14px;transition:background .35s,color .35s;
}
.nx[data-theme="dark"]{
  --bg:#0F172A; --surface:#1E293B; --surface2:#243244; --ink:#F8FAFC; --soft:#94A3B8; --faint:#64748B;
  --line:#334155; --line2:#27364B; --hover:#243244;
  --brand:#38BDF8; --brand-d:#0EA5E9; --brand-soft:rgba(56,189,248,.16); --brand-ink:#7DD3FC;
  --blue:#60A5FA; --indigo:#818CF8; --cyan:#22D3EE; --amber:#FBBF24; --orange:#FB923C;
  --green:#34D399; --red:#F87171; --purple:#C084FC; --pink:#F472B6;
  --sh:0 1px 2px rgba(0,0,0,.4); --sh2:0 14px 36px -10px rgba(0,0,0,.55);
}
.nx *{box-sizing:border-box;}
.nx ::-webkit-scrollbar{width:9px;height:9px;}.nx ::-webkit-scrollbar-thumb{background:var(--line);border-radius:8px;}
.nx ::-webkit-scrollbar-thumb:hover{background:var(--faint);}
.shell{display:flex;min-height:100vh;min-height:100dvh;}
.side{width:252px;flex-shrink:0;background:var(--surface);border-inline-start:1px solid var(--line);position:sticky;top:0;height:100vh;display:flex;flex-direction:column;padding:22px 15px;z-index:30;}
.logo{font-family:'Plus Jakarta Sans','Heebo',sans-serif;font-weight:800;font-size:21px;letter-spacing:-.4px;display:flex;align-items:center;gap:11px;padding:0 6px;}
.logo .mk{width:38px;height:38px;border-radius:12px;background:linear-gradient(135deg,var(--brand),#60A5FA);color:#fff;display:grid;place-items:center;box-shadow:0 6px 16px var(--brand-soft);}
.logo small{display:block;font-family:'Heebo';font-weight:600;font-size:9.5px;color:var(--faint);letter-spacing:2.6px;}
.nav{margin-top:22px;display:flex;flex-direction:column;gap:2px;overflow-y:auto;}
.navlbl{font-size:10px;font-weight:700;color:var(--faint);letter-spacing:1.4px;padding:13px 12px 6px;}
.navit{display:flex;align-items:center;gap:12px;padding:10px 12px;border-radius:12px;font-size:14px;font-weight:500;color:var(--soft);cursor:pointer;border:none;background:none;width:100%;text-align:right;transition:.18s cubic-bezier(.2,.8,.2,1);font-family:inherit;position:relative;}
.navit:hover{background:var(--hover);color:var(--ink);}
.navit.on{background:var(--brand-soft);color:var(--brand-ink);font-weight:700;}
.navit.on svg{color:var(--brand);}
.navit.on::before{content:'';position:absolute;inset-inline-end:-15px;top:9px;bottom:9px;width:3px;border-radius:4px;background:var(--brand);}
.navit .cnt{margin-inline-start:auto;font-size:10.5px;font-weight:700;background:var(--line2);color:var(--soft);padding:1px 8px;border-radius:20px;}
.navit.on .cnt{background:var(--surface);color:var(--brand);}
.sfoot{margin-top:auto;padding-top:13px;border-top:1px solid var(--line);display:flex;align-items:center;gap:10px;}
.ava{border-radius:50%;display:grid;place-items:center;font-weight:700;color:#fff;flex-shrink:0;}
.main{flex:1;min-width:0;display:flex;flex-direction:column;min-height:0;}
.top{display:flex;align-items:center;gap:13px;padding:15px 30px;background:color-mix(in srgb,var(--surface) 82%,transparent);backdrop-filter:blur(14px);border-bottom:1px solid var(--line);position:sticky;top:0;z-index:25;}
.top h1{font-family:'Plus Jakarta Sans','Heebo',sans-serif;font-weight:700;font-size:22px;margin:0;flex:1;letter-spacing:-.3px;}
.top h1 small{font-family:'Heebo';font-weight:500;font-size:12.5px;color:var(--soft);display:block;letter-spacing:0;}
.srch{display:flex;align-items:center;gap:8px;background:var(--surface2);border:1px solid var(--line);border-radius:12px;padding:9px 13px;width:248px;color:var(--faint);transition:.18s;}
.srch:focus-within{border-color:var(--brand);box-shadow:0 0 0 3px var(--brand-soft);}
.srch input{border:none;background:none;outline:none;font-family:inherit;font-size:13px;width:100%;color:var(--ink);}
.ib{width:40px;height:40px;border-radius:12px;border:1px solid var(--line);background:var(--surface);display:grid;place-items:center;color:var(--soft);cursor:pointer;position:relative;flex-shrink:0;transition:.18s;}
.ib:hover{color:var(--ink);border-color:var(--soft);transform:translateY(-1px);}
.ib:active{transform:scale(.94);}
.ib .pip{position:absolute;top:8px;inset-inline-start:9px;width:8px;height:8px;border-radius:50%;background:var(--red);border:2px solid var(--surface);}
.btn{display:inline-flex;align-items:center;gap:7px;background:var(--brand);color:#fff;border:none;padding:10px 16px;border-radius:12px;font-family:inherit;font-size:13px;font-weight:600;cursor:pointer;transition:.18s cubic-bezier(.2,.8,.2,1);box-shadow:0 4px 12px var(--brand-soft);white-space:nowrap;}
.btn:hover{background:var(--brand-d);transform:translateY(-1px);box-shadow:0 6px 18px var(--brand-soft);}
.btn:active{transform:scale(.97);}
.btn:disabled{opacity:.4;cursor:not-allowed;transform:none;box-shadow:none;}
.btn.gh{background:var(--surface2);color:var(--ink);box-shadow:none;border:1px solid var(--line);}.btn.gh:hover{background:var(--hover);}
.btn.sm{padding:7px 12px;font-size:12px;border-radius:10px;}
.body{padding:24px 30px 60px;animation:rise .4s cubic-bezier(.2,.8,.2,1);}
@keyframes rise{from{opacity:0;transform:translateY(10px);}to{opacity:1;transform:none;}}
.kpis{display:grid;grid-template-columns:repeat(5,1fr);gap:15px;margin-bottom:22px;}
.kpi{background:var(--surface);border:1px solid var(--line);border-radius:var(--rad);padding:18px;position:relative;overflow:hidden;box-shadow:var(--sh);transition:.2s cubic-bezier(.2,.8,.2,1);}
.kpi:hover{transform:translateY(-3px);box-shadow:var(--sh2);}
.kpi .kc{width:36px;height:36px;border-radius:11px;display:grid;place-items:center;margin-bottom:12px;}
.kpi .lbl{font-size:12.5px;color:var(--soft);font-weight:500;}
.kpi .val{font-size:25px;font-weight:800;letter-spacing:-.8px;margin-top:5px;font-family:'Plus Jakarta Sans','Heebo';}
.kpi .dl{font-size:11.5px;font-weight:700;margin-top:7px;display:inline-flex;align-items:center;gap:3px;padding:2px 7px;border-radius:20px;}
.kpi .spark{position:absolute;inset-inline-start:16px;bottom:16px;opacity:.85;}
.card{background:var(--surface);border:1px solid var(--line);border-radius:var(--rad);padding:20px;box-shadow:var(--sh);}
.card h3{margin:0;font-size:15.5px;font-weight:700;display:flex;align-items:center;gap:9px;letter-spacing:-.2px;}
.card .sub{font-size:12px;color:var(--soft);margin-top:3px;margin-bottom:15px;}
.row2{display:grid;grid-template-columns:1.5fr 1fr;gap:18px;margin-bottom:18px;}
.row2c{display:grid;grid-template-columns:1.6fr 1fr;gap:18px;margin-bottom:18px;}
.row3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:18px;margin-bottom:18px;}
.bdg{display:inline-flex;align-items:center;gap:5px;font-size:11px;font-weight:700;padding:3px 10px;border-radius:20px;white-space:nowrap;}
.b-blue{background:var(--blue-soft);color:var(--blue);}.b-indigo{background:var(--indigo-soft);color:var(--indigo);}
.b-cyan{background:var(--cyan-soft);color:var(--cyan);}.b-amber{background:var(--amber-soft);color:var(--amber);}
.b-orange{background:var(--orange-soft);color:var(--orange);}.b-green{background:var(--green-soft);color:var(--green);}
.b-red{background:var(--red-soft);color:var(--red);}.b-gray{background:var(--line2);color:var(--soft);}
.b-brand{background:var(--brand-soft);color:var(--brand-ink);}.b-purple{background:var(--purple-soft);color:var(--purple);}
.fbar{margin-bottom:13px;}.fbar .hd{display:flex;justify-content:space-between;font-size:12.5px;font-weight:600;margin-bottom:6px;}
.fbar .tr{height:10px;background:var(--line2);border-radius:6px;overflow:hidden;}.fbar .fl{height:100%;border-radius:6px;transition:width .8s cubic-bezier(.2,.8,.2,1);}
.alert{display:flex;align-items:center;gap:11px;padding:12px;border-radius:13px;margin-bottom:9px;background:var(--surface2);border:1px solid var(--line);cursor:pointer;transition:.18s;}
.alert:hover{box-shadow:var(--sh);transform:translateX(-3px);border-color:var(--brand-soft);}
.alert .ai{width:36px;height:36px;border-radius:11px;display:grid;place-items:center;flex-shrink:0;}
.insight{display:flex;gap:11px;padding:13px;border-radius:13px;margin-bottom:9px;background:var(--surface2);border:1px solid var(--line);transition:.18s;}
.insight:hover{box-shadow:var(--sh);border-color:var(--brand-soft);}
.insight .ai{width:36px;height:36px;border-radius:11px;display:grid;place-items:center;flex-shrink:0;}
.tbl{width:100%;border-collapse:collapse;}
.tbl th{text-align:right;font-size:11px;font-weight:700;color:var(--soft);letter-spacing:.3px;padding:11px 14px;border-bottom:1px solid var(--line);user-select:none;}
.tbl td{padding:13px 14px;border-bottom:1px solid var(--line2);font-size:13px;vertical-align:middle;}
.tbl tr:last-child td{border-bottom:none;}.tbl tbody tr{transition:.12s;cursor:pointer;}.tbl tbody tr:hover{background:var(--hover);}
.qa{display:flex;gap:5px;opacity:0;transition:.15s;}.tbl tbody tr:hover .qa{opacity:1;}
.qa button{width:30px;height:30px;border-radius:9px;border:1px solid var(--line);background:var(--surface);display:grid;place-items:center;cursor:pointer;color:var(--soft);transition:.15s;}
.qa button:hover{color:var(--brand);border-color:var(--brand);transform:translateY(-1px);}
.mini{width:34px;height:34px;border-radius:50%;display:grid;place-items:center;font-weight:700;font-size:12px;color:#fff;flex-shrink:0;}
.chips{display:flex;gap:9px;flex-wrap:wrap;margin-bottom:18px;align-items:center;}
.chip{padding:8px 14px;border-radius:11px;border:1px solid var(--line);background:var(--surface);cursor:pointer;font-family:inherit;font-size:13px;font-weight:600;transition:.18s;display:flex;align-items:center;gap:8px;color:var(--ink);}
.chip:hover{border-color:var(--brand);transform:translateY(-1px);}.chip.on{background:var(--brand);color:#fff;border-color:var(--brand);box-shadow:0 4px 12px var(--brand-soft);}
.chip .cr{font-size:11px;color:var(--soft);font-weight:500;}.chip.on .cr{color:rgba(255,255,255,.78);}
.seg{display:flex;background:var(--line2);border-radius:11px;padding:3px;gap:2px;}
.seg button{border:none;background:none;padding:7px 13px;border-radius:9px;font-family:inherit;font-size:12.5px;font-weight:600;color:var(--soft);cursor:pointer;display:flex;align-items:center;gap:6px;transition:.15s;}
.seg button.on{background:var(--surface);color:var(--brand);box-shadow:var(--sh);}
.dd{position:relative;}
.ddm{position:absolute;top:calc(100% + 6px);inset-inline-end:0;background:var(--surface);border:1px solid var(--line);border-radius:13px;box-shadow:var(--sh2);padding:5px;z-index:40;min-width:170px;animation:pop .15s ease;}
@keyframes pop{from{opacity:0;transform:translateY(-6px);}to{opacity:1;}}
.ddm button{display:flex;align-items:center;gap:8px;width:100%;text-align:right;border:none;background:none;font-family:inherit;font-size:13px;padding:9px 11px;border-radius:9px;cursor:pointer;color:var(--ink);}
.ddm button:hover{background:var(--hover);}.ddm button.on{color:var(--brand);font-weight:600;}
.pipe{display:flex;gap:13px;align-items:flex-start;overflow-x:auto;padding-bottom:10px;}
.col{background:var(--surface2);border-radius:15px;padding:10px;min-width:220px;flex:1;min-height:170px;transition:.18s;border:1px solid transparent;}
.col.over{background:var(--brand-soft);border-color:var(--brand);}
.col .ch{display:flex;align-items:center;justify-content:space-between;padding:6px 8px 11px;}
.col .ch .nm{font-weight:700;font-size:13px;display:flex;align-items:center;gap:7px;}.col .ch .nm .ic{width:9px;height:9px;border-radius:50%;}
.col .ch .vl{font-size:10.5px;color:var(--soft);font-weight:600;}
.dcard{background:var(--surface);border:1px solid var(--line);border-radius:13px;padding:12px;margin-bottom:9px;cursor:grab;transition:.18s cubic-bezier(.2,.8,.2,1);box-shadow:var(--sh);}
.dcard:hover{box-shadow:var(--sh2);transform:translateY(-2px);}.dcard:active{cursor:grabbing;}
.dcard .pa{font-weight:700;font-size:13px;display:flex;align-items:center;gap:5px;}
.dcard .by{font-size:11.5px;color:var(--soft);margin-top:4px;display:flex;align-items:center;gap:5px;}
.dcard .vl{font-size:15px;font-weight:800;margin-top:9px;letter-spacing:-.4px;}
.dcard .ft{display:flex;align-items:center;justify-content:space-between;margin-top:9px;padding-top:9px;border-top:1px solid var(--line2);}
.prob{height:5px;background:var(--line2);border-radius:4px;overflow:hidden;width:54px;}.prob i{display:block;height:100%;border-radius:4px;}
.props{display:grid;grid-template-columns:repeat(3,1fr);gap:17px;}
.prop{background:var(--surface);border:1px solid var(--line);border-radius:var(--rad);overflow:hidden;transition:.22s cubic-bezier(.2,.8,.2,1);box-shadow:var(--sh);cursor:pointer;}
.prop:hover{transform:translateY(-4px);box-shadow:var(--sh2);}
.photo{height:150px;position:relative;background:linear-gradient(135deg,var(--brand-soft),var(--line2));display:grid;place-items:center;overflow:hidden;}
.photo img{width:100%;height:100%;object-fit:cover;transition:.4s;}
.prop:hover .photo img{transform:scale(1.06);}
.photo .st{position:absolute;top:11px;inset-inline-start:11px;z-index:2;}
.photo .cnt{position:absolute;bottom:10px;inset-inline-end:11px;z-index:2;background:rgba(15,23,42,.6);backdrop-filter:blur(4px);color:#fff;font-size:11px;font-weight:600;padding:3px 9px;border-radius:20px;display:flex;align-items:center;gap:4px;}
.photo .pr{position:absolute;bottom:10px;inset-inline-start:11px;z-index:2;background:rgba(15,23,42,.62);backdrop-filter:blur(4px);color:#fff;font-size:14px;font-weight:800;padding:4px 11px;border-radius:11px;}
.prop .bd{padding:15px;}.prop .ad{font-weight:700;font-size:14.5px;}
.prop .ct{font-size:11.5px;color:var(--soft);display:flex;align-items:center;gap:4px;margin-top:3px;}
.prop .sp{display:flex;gap:12px;margin:12px 0;font-size:11.5px;color:var(--soft);flex-wrap:wrap;}.prop .sp b{color:var(--ink);}
.prop .mt{margin-top:11px;padding-top:11px;border-top:1px solid var(--line2);font-size:11.5px;font-weight:600;color:var(--brand);display:flex;align-items:center;gap:5px;}
.mhero{background:linear-gradient(120deg,var(--brand),#60A5FA);border:none;color:#fff;border-radius:var(--rad);padding:22px;margin-bottom:20px;box-shadow:var(--sh2);position:relative;overflow:hidden;}
.mhero::after{content:'';position:absolute;inset-inline-start:-40px;top:-40px;width:160px;height:160px;border-radius:50%;background:rgba(255,255,255,.12);}
.mrow{display:flex;align-items:center;gap:17px;padding:16px;border:1px solid var(--line);border-radius:15px;background:var(--surface);margin-bottom:12px;box-shadow:var(--sh);flex-wrap:wrap;transition:.18s;}
.mrow:hover{box-shadow:var(--sh2);}
.ring{position:relative;flex-shrink:0;}.ring svg{transform:rotate(-90deg);}.ring .pc{position:absolute;inset:0;display:grid;place-items:center;font-weight:800;font-family:'Plus Jakarta Sans','Heebo';}
.reasons{display:grid;grid-template-columns:1fr 1fr;gap:4px 16px;flex:1;min-width:250px;}
.reason{display:flex;align-items:center;gap:7px;font-size:12px;}
.reason .ri{width:18px;height:18px;border-radius:50%;display:grid;place-items:center;flex-shrink:0;}
.reason b{font-weight:600;}.reason .dt{color:var(--soft);font-size:11px;}
.autobar{background:linear-gradient(110deg,var(--brand-soft),transparent);border:1px solid var(--brand-soft);border-radius:15px;padding:14px 18px;display:flex;align-items:center;gap:13px;margin-bottom:20px;}
.autobar .ic{width:40px;height:40px;border-radius:12px;background:var(--brand);color:#fff;display:grid;place-items:center;flex-shrink:0;}
.tgrp{margin-bottom:22px;}.tgrp .gh{font-size:12.5px;font-weight:700;color:var(--soft);margin-bottom:10px;display:flex;align-items:center;gap:7px;}
.task{display:flex;align-items:center;gap:13px;background:var(--surface);border:1px solid var(--line);border-radius:14px;padding:13px 16px;margin-bottom:8px;transition:.18s;box-shadow:var(--sh);}
.task:hover{box-shadow:var(--sh2);transform:translateX(-2px);}.task.done{opacity:.5;}
.cbx{width:21px;height:21px;border-radius:7px;border:2px solid var(--line);cursor:pointer;flex-shrink:0;display:grid;place-items:center;transition:.15s;}
.cbx:hover{border-color:var(--brand);}.cbx.ck{background:var(--brand);border-color:var(--brand);}
.task .ti{width:34px;height:34px;border-radius:10px;display:grid;place-items:center;flex-shrink:0;}
.task .tt{font-weight:600;font-size:13px;}.task.done .tt{text-decoration:line-through;}.task .tm{font-size:11.5px;color:var(--soft);margin-top:1px;}
.tl{position:relative;padding-inline-start:7px;}.tl::before{content:'';position:absolute;inset-inline-start:23px;top:6px;bottom:6px;width:2px;background:var(--line);}
.tlrow{display:flex;gap:14px;margin-bottom:17px;position:relative;}
.tlrow .dot{width:34px;height:34px;border-radius:50%;display:grid;place-items:center;flex-shrink:0;z-index:1;border:3px solid var(--surface);}
.tlrow .ti{font-weight:600;font-size:13px;}.tlrow .tx{font-size:12px;color:var(--soft);margin-top:1px;}.tlrow .tm{font-size:11px;color:var(--faint);margin-top:2px;}
.ov{position:fixed;inset:0;background:rgba(15,23,42,.5);backdrop-filter:blur(4px);z-index:60;animation:rise .2s;}
.slide{position:fixed;top:0;inset-inline-start:0;height:100vh;width:560px;max-width:95vw;background:var(--bg);z-index:61;box-shadow:8px 0 50px rgba(0,0,0,.3);animation:slin .32s cubic-bezier(.2,.8,.2,1);overflow-y:auto;}
@keyframes slin{from{transform:translateX(-36px);opacity:.4;}to{transform:none;opacity:1;}}
.slhd{padding:22px 24px;background:var(--surface);border-bottom:1px solid var(--line);position:sticky;top:0;z-index:2;}
.slbd{padding:20px 24px;}
.kv{display:flex;justify-content:space-between;padding:9px 0;border-bottom:1px solid var(--line2);font-size:13px;}.kv:last-child{border:none;}.kv .k{color:var(--soft);}.kv .v{font-weight:600;}
.stagebar{display:flex;gap:3px;margin:14px 0;}.stagebar .s{flex:1;height:7px;border-radius:5px;background:var(--line);transition:.4s;}
.modal{background:var(--surface);border-radius:22px;width:490px;max-width:93vw;padding:24px;box-shadow:0 36px 80px rgba(0,0,0,.4);position:fixed;top:50%;inset-inline-start:50%;transform:translate(50%,-50%);z-index:62;max-height:90vh;overflow-y:auto;animation:mpop .25s cubic-bezier(.2,.8,.2,1);}
@keyframes mpop{from{opacity:0;transform:translate(50%,-46%) scale(.96);}to{opacity:1;transform:translate(50%,-50%) scale(1);}}
.modal h2{font-family:'Plus Jakarta Sans','Heebo';font-weight:700;font-size:19px;margin:0 0 16px;display:flex;justify-content:space-between;align-items:center;}
.modal h2 button{background:none;border:none;cursor:pointer;color:var(--soft);}
.fld{margin-bottom:13px;}.fld label{display:block;font-size:12px;font-weight:600;margin-bottom:6px;}
.fld input,.fld select{width:100%;padding:10px 12px;border:1px solid var(--line);border-radius:11px;font-family:inherit;font-size:13px;outline:none;background:var(--surface2);color:var(--ink);transition:.15s;}
.fld input:focus,.fld select:focus{border-color:var(--brand);box-shadow:0 0 0 3px var(--brand-soft);background:var(--surface);}
.f2{display:grid;grid-template-columns:1fr 1fr;gap:11px;}.f3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:9px;}
.lk{color:var(--brand);font-weight:600;cursor:pointer;}.lk:hover{text-decoration:underline;}
.attr{display:flex;align-items:center;gap:8px;padding:10px 12px;background:var(--surface2);border:1px solid var(--line);border-radius:11px;font-size:12.5px;}
.attr svg{color:var(--brand);}.attr.no{opacity:.42;}.attr.no svg{color:var(--faint);}
.doc{display:flex;align-items:center;gap:10px;padding:11px 12px;border:1px solid var(--line);border-radius:11px;margin-bottom:8px;font-size:13px;transition:.15s;}
.doc:hover{border-color:var(--brand-soft);background:var(--hover);}
.doc .di{width:33px;height:33px;border-radius:9px;background:var(--brand-soft);color:var(--brand);display:grid;place-items:center;}
.gallery{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-top:10px;}
.gallery .g{height:60px;border-radius:10px;overflow:hidden;background:var(--line2);cursor:pointer;border:2px solid transparent;transition:.15s;}
.gallery .g.sel{border-color:var(--brand);}.gallery .g:hover{transform:translateY(-2px);}.gallery .g img{width:100%;height:100%;object-fit:cover;}
.goalw{display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;}
/* Geo mini card on dashboard */
.geo-mini{display:flex;flex-direction:column;gap:9px;padding-top:6px;}
.geo-mini-row{display:flex;align-items:center;gap:12px;font-size:12.5px;}
.geo-mini-name{width:90px;font-weight:600;flex-shrink:0;}
.geo-mini-name small{display:block;font-weight:500;font-size:10.5px;color:var(--soft);margin-top:1px;}
.geo-mini-bars{flex:1;display:flex;flex-direction:column;gap:3px;}
.geo-mini-bar{height:6px;background:var(--line2);border-radius:3px;overflow:hidden;}
.geo-mini-bar div{height:100%;border-radius:3px;transition:width .8s cubic-bezier(.2,.8,.2,1);}

/* Geo full screen */
.geo{display:grid;grid-template-columns:1fr 320px;gap:14px;height:calc(100vh - 170px);min-height:560px;}
.geo-map-wrap{position:relative;background:var(--surface);border:1px solid var(--line);border-radius:var(--rad);overflow:hidden;box-shadow:var(--sh);}
.geo-toolbar{position:absolute;top:14px;inset-inline-end:14px;display:flex;flex-direction:column;gap:6px;z-index:5;}
.geo-tool-btn{width:36px;height:36px;border-radius:10px;background:var(--surface);border:1px solid var(--line);color:var(--ink);display:grid;place-items:center;cursor:pointer;box-shadow:var(--sh);transition:.15s;}
.geo-tool-btn:hover{background:var(--hover);transform:translateY(-1px);}
.geo-search-bar{position:absolute;top:14px;inset-inline-start:14px;z-index:5;display:flex;align-items:center;gap:8px;background:var(--surface);border:1px solid var(--line);border-radius:12px;padding:9px 13px;width:260px;box-shadow:var(--sh);}
.geo-search-bar input{border:none;background:none;outline:none;font-family:inherit;font-size:13px;width:100%;color:var(--ink);}
.geo-legend{position:absolute;bottom:14px;inset-inline-start:14px;z-index:5;background:var(--surface);border:1px solid var(--line);border-radius:12px;padding:10px 14px;font-size:11px;display:flex;gap:14px;align-items:center;box-shadow:var(--sh);}
.geo-legend i{display:inline-block;width:9px;height:9px;border-radius:50%;margin-inline-end:5px;vertical-align:middle;}
.geo-mode{position:absolute;bottom:14px;inset-inline-end:14px;z-index:5;background:var(--surface);border:1px solid var(--line);border-radius:12px;padding:3px;display:flex;gap:2px;box-shadow:var(--sh);}
.geo-mode button{border:none;background:none;padding:6px 11px;border-radius:9px;font-family:inherit;font-size:12px;font-weight:600;color:var(--soft);cursor:pointer;}
.geo-mode button.on{background:var(--brand);color:#fff;}
.geo-svg{width:100%;height:100%;display:block;cursor:grab;background:linear-gradient(180deg, color-mix(in srgb,var(--brand-soft) 50%,var(--surface)), var(--surface));}
.geo-svg:active{cursor:grabbing;}
.geo-side{display:flex;flex-direction:column;gap:12px;overflow-y:auto;padding-inline-end:2px;}
.geo-side .card{margin-bottom:0;}
.geo-pin-card{position:absolute;background:var(--surface);border:1px solid var(--line);border-radius:14px;padding:14px;width:280px;box-shadow:var(--sh2);z-index:10;animation:rise .15s;}
.geo-pin-card .gp-img{width:100%;height:120px;border-radius:10px;background:var(--line2);margin-bottom:10px;object-fit:cover;}
.geo-pin-card .gp-addr{font-weight:700;font-size:13.5px;}
.geo-pin-card .gp-meta{font-size:11.5px;color:var(--soft);margin-top:2px;}
.geo-pin-card .gp-price{font-size:18px;font-weight:800;color:var(--brand);font-family:'Plus Jakarta Sans','Heebo';margin:8px 0;}
.geo-pin-card .gp-row{display:flex;gap:6px;font-size:11px;color:var(--soft);margin-bottom:10px;}
.geo-pin-card .gp-actions{display:grid;grid-template-columns:1fr 1fr;gap:6px;}
.geo-insight{display:flex;gap:10px;padding:11px;border-radius:11px;background:var(--surface2);margin-bottom:7px;font-size:12px;line-height:1.5;}
.geo-insight .gi-ic{width:30px;height:30px;border-radius:9px;display:grid;place-items:center;flex-shrink:0;}
.geo-insight strong{display:block;font-size:12.5px;font-weight:700;margin-bottom:2px;}
.geo-filters{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:12px;}
.geo-chip{display:inline-flex;align-items:center;gap:5px;padding:5px 11px;border-radius:20px;background:var(--surface2);border:1px solid var(--line);font-size:11.5px;font-weight:600;color:var(--soft);cursor:pointer;transition:.15s;font-family:inherit;}
.geo-chip:hover{color:var(--ink);}
.geo-chip.on{background:var(--brand-soft);color:var(--brand-ink);border-color:transparent;}
.skel{background:linear-gradient(90deg,var(--line2) 25%,var(--hover) 37%,var(--line2) 63%);background-size:400% 100%;animation:shim 1.4s ease infinite;border-radius:10px;}
@keyframes shim{0%{background-position:100% 0;}100%{background-position:-100% 0;}}
.empty{text-align:center;padding:48px 20px;color:var(--soft);}
.empty .ei{width:64px;height:64px;border-radius:18px;background:var(--surface2);display:grid;place-items:center;margin:0 auto 16px;color:var(--faint);}
.empty h4{font-size:16px;font-weight:700;color:var(--ink);margin:0 0 5px;}
.toasts{position:fixed;bottom:22px;inset-inline-start:22px;z-index:80;display:flex;flex-direction:column;gap:10px;}
.toast2{display:flex;align-items:center;gap:11px;background:var(--surface);border:1px solid var(--line);border-radius:14px;padding:13px 16px;box-shadow:var(--sh2);min-width:240px;animation:tin .3s cubic-bezier(.2,.8,.2,1);font-size:13px;font-weight:600;}
@keyframes tin{from{opacity:0;transform:translateX(-30px);}to{opacity:1;transform:none;}}
.toast2 .tk{width:30px;height:30px;border-radius:9px;display:grid;place-items:center;flex-shrink:0;}
.fab{position:fixed;bottom:26px;inset-inline-end:26px;width:56px;height:56px;border-radius:18px;background:var(--brand);color:#fff;border:none;display:grid;place-items:center;cursor:pointer;box-shadow:0 10px 26px var(--brand-soft);z-index:50;transition:.2s cubic-bezier(.2,.8,.2,1);}
.fab:hover{transform:translateY(-3px) rotate(90deg);box-shadow:0 14px 32px var(--brand-soft);}
.tabs{display:flex;gap:4px;background:var(--line2);border-radius:12px;padding:4px;margin-bottom:14px;overflow-x:auto;}
.tabs button{flex:1;border:none;background:none;padding:8px 10px;border-radius:9px;font-family:inherit;font-size:12.5px;font-weight:600;color:var(--soft);cursor:pointer;display:flex;align-items:center;justify-content:center;gap:6px;white-space:nowrap;transition:.15s;}
.tabs button.on{background:var(--surface);color:var(--brand);box-shadow:var(--sh);}
.stepper{display:flex;align-items:flex-start;gap:0;margin:6px 0 4px;}
.stepper .stp{flex:1;display:flex;flex-direction:column;align-items:center;gap:7px;position:relative;text-align:center;}
.stepper .stp::before{content:'';position:absolute;top:15px;inset-inline-start:50%;width:100%;height:2px;background:var(--line);z-index:0;}
.stepper .stp:last-child::before{display:none;}
.stepper .stp.done::before,.stepper .stp.active::before{background:var(--brand);}
.stepper .sd{width:32px;height:32px;border-radius:50%;display:grid;place-items:center;background:var(--surface2);border:2px solid var(--line);z-index:1;color:var(--faint);}
.stepper .stp.done .sd{background:var(--green);border-color:var(--green);color:#fff;}
.stepper .stp.active .sd{background:var(--brand);border-color:var(--brand);color:#fff;box-shadow:0 0 0 4px var(--brand-soft);}
.stepper .sl{font-size:10.5px;font-weight:600;color:var(--soft);}
.stepper .stp.active .sl,.stepper .stp.done .sl{color:var(--ink);}
.txhd{display:flex;align-items:center;justify-content:space-between;margin-bottom:9px;}
.txhd .tn{display:flex;align-items:center;gap:8px;font-weight:700;font-size:13.5px;}
.txhd .ti2{width:30px;height:30px;border-radius:9px;display:grid;place-items:center;}
.proc{background:var(--surface);border:1px solid var(--line);border-radius:15px;padding:16px;box-shadow:var(--sh);cursor:pointer;transition:.18s cubic-bezier(.2,.8,.2,1);}
.proc:hover{transform:translateY(-3px);box-shadow:var(--sh2);}
.pro-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:15px;}
.star{display:inline-flex;align-items:center;gap:3px;font-size:12px;font-weight:700;color:var(--amber);}
.copybox{background:var(--surface2);border:1px solid var(--line);border-radius:12px;padding:13px 14px;font-size:13px;line-height:1.7;white-space:pre-wrap;color:var(--ink);max-height:230px;overflow-y:auto;}
.calcrow{display:flex;justify-content:space-between;align-items:center;padding:11px 0;border-bottom:1px solid var(--line2);}
.calcrow:last-child{border:none;}.calcrow .cl{color:var(--soft);font-size:13px;}.calcrow .cv{font-weight:800;font-size:16px;font-family:'Plus Jakarta Sans,Heebo';}
.docrow{display:flex;align-items:center;gap:11px;padding:11px 12px;border:1px solid var(--line);border-radius:12px;margin-bottom:8px;transition:.15s;}
.docrow:hover{border-color:var(--brand-soft);}
.docrow .di{width:34px;height:34px;border-radius:10px;display:grid;place-items:center;flex-shrink:0;}
.fabwrap{position:fixed;bottom:26px;inset-inline-end:26px;z-index:55;display:flex;flex-direction:column;align-items:flex-end;gap:11px;}
.fabmenu{display:flex;flex-direction:column;gap:8px;align-items:flex-end;}
.fabitem{display:flex;align-items:center;gap:9px;background:var(--surface);border:1px solid var(--line);border-radius:13px;padding:9px 14px;font-family:inherit;font-size:13px;font-weight:600;color:var(--ink);cursor:pointer;box-shadow:var(--sh2);white-space:nowrap;animation:fabin .22s cubic-bezier(.2,.8,.2,1) backwards;}
.fabitem:hover{border-color:var(--brand);color:var(--brand);transform:translateX(-3px);}
.fabitem .fi{width:28px;height:28px;border-radius:8px;display:grid;place-items:center;background:var(--brand-soft);color:var(--brand);}
@keyframes fabin{from{opacity:0;transform:translateY(10px) scale(.96);}to{opacity:1;}}
.fbpost{border:1px solid var(--line);border-radius:14px;overflow:hidden;background:var(--surface);}
.fbpost .fh{display:flex;align-items:center;gap:10px;padding:12px 14px;}
.fbpost .fa{width:40px;height:40px;border-radius:50%;background:#1877F2;color:#fff;display:grid;place-items:center;font-weight:800;}
.fbpost .ft2{font-size:11px;color:var(--soft);}
.fbpost .fbody{padding:0 14px 12px;font-size:13px;line-height:1.7;white-space:pre-wrap;}
.fbpost .fimg{height:170px;background:var(--line2);}.fbpost .fimg img{width:100%;height:100%;object-fit:cover;}
.setrow{display:flex;align-items:center;justify-content:space-between;padding:14px 0;border-bottom:1px solid var(--line2);}
.setrow:last-child{border:none;}
.tgl{width:42px;height:24px;border-radius:20px;background:var(--line);position:relative;cursor:pointer;transition:.2s;flex-shrink:0;border:none;}
.tgl.on{background:var(--brand);}
.tgl i{position:absolute;top:3px;inset-inline-start:3px;width:18px;height:18px;border-radius:50%;background:#fff;transition:.2s;}
.tgl.on i{inset-inline-start:21px;}
.fbbtn{position:absolute;top:10px;inset-inline-end:10px;z-index:3;width:30px;height:30px;border-radius:9px;background:rgba(15,23,42,.55);backdrop-filter:blur(4px);border:none;color:#fff;display:grid;place-items:center;cursor:pointer;transition:.15s;}
.fbbtn:hover{background:#1877F2;transform:scale(1.08);}
.commrow{display:flex;gap:12px;padding:13px 2px;border-bottom:1px solid var(--line2);}
.commrow:last-child{border:none;}
/* command bar (⌘K) */
.cmdk{position:fixed;top:12vh;inset-inline-start:50%;transform:translateX(50%);width:600px;max-width:94vw;background:var(--surface);border:1px solid var(--line);border-radius:18px;box-shadow:0 40px 90px rgba(0,0,0,.45);z-index:81;overflow:hidden;animation:mpop .22s cubic-bezier(.2,.8,.2,1);}
.cmdhead{display:flex;align-items:center;gap:11px;padding:16px 18px;border-bottom:1px solid var(--line);}
.cmdhead input{flex:1;border:none;background:none;outline:none;font-family:inherit;font-size:15.5px;color:var(--ink);}
.cmdbody{max-height:54vh;overflow-y:auto;padding:8px;}
.cmdgrp{margin-bottom:4px;}
.cmdgl{font-size:10.5px;font-weight:700;color:var(--faint);letter-spacing:1px;padding:9px 12px 5px;}
.cmdrow{display:flex;align-items:center;gap:12px;width:100%;padding:9px 12px;border:none;background:none;border-radius:11px;cursor:pointer;text-align:right;font-family:inherit;color:var(--ink);transition:.1s;}
.cmdrow.sel{background:var(--brand-soft);}
.cmdrow .cmdic{width:32px;height:32px;border-radius:9px;display:grid;place-items:center;flex-shrink:0;overflow:hidden;}
.cmdrow .cmdlbl{flex:1;font-size:14px;font-weight:600;display:flex;flex-direction:column;gap:1px;min-width:0;}
.cmdrow .cmdlbl small{font-weight:500;font-size:11.5px;color:var(--soft);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
.cmdrow .cmdgo{color:var(--faint);opacity:0;flex-shrink:0;}
.cmdrow.sel .cmdgo{opacity:1;color:var(--brand);}
.cmdempty{padding:34px;text-align:center;color:var(--soft);font-size:13.5px;}
.cmdfoot{display:flex;gap:16px;padding:11px 18px;border-top:1px solid var(--line);font-size:11.5px;color:var(--soft);}
.cmdfoot span{display:flex;align-items:center;gap:5px;}
kbd{font-family:inherit;font-size:10.5px;font-weight:700;background:var(--surface2);border:1px solid var(--line);border-bottom-width:2px;border-radius:6px;padding:1px 6px;color:var(--soft);min-width:18px;text-align:center;line-height:1.5;}
.srchbtn{cursor:pointer;justify-content:space-between;color:var(--soft);font-family:inherit;font-size:13px;}
.srchbtn span{flex:1;text-align:right;}
.srchbtn:hover{border-color:var(--soft);}
.side-cta{display:flex;align-items:center;justify-content:center;gap:8px;width:100%;margin:2px 0 10px;padding:11px;border:none;border-radius:12px;background:linear-gradient(135deg,var(--brand),#60A5FA);color:#fff;font-family:inherit;font-size:13.5px;font-weight:700;cursor:pointer;box-shadow:0 6px 16px var(--brand-soft);transition:.18s cubic-bezier(.2,.8,.2,1);}
.side-cta:hover{transform:translateY(-1px);box-shadow:0 8px 22px var(--brand-soft);}
.side-cta:active{transform:scale(.98);}

/* ═══ RESPONSIVE BREAKPOINTS — Mobile First architecture ═══
   Mobile: ≤768px  · Tablet: 769–1024px · Desktop: ≥1025px
   Touch targets on mobile/tablet ≥44px (Apple HIG, Google Material).
   ─────────────────────────────────────────────────────────── */
@media(max-width:1024px){
  /* Tablet — sidebar collapses to icons only */
  .side{width:64px;padding:18px 8px;}
  .side .logo span:not(.mk){display:none;}
  .side-cta{padding:11px 0;}
  .side-cta span:not(.mk){display:none;}
  .nav button{padding:11px 0;justify-content:center;}
  .nav button span:not(.mk):not(.cnt){display:none;}
  .nav button .cnt{position:absolute;top:4px;inset-inline-end:4px;font-size:9.5px;padding:0 4px;min-width:14px;}
  .sfoot{justify-content:center;}
  .sfoot div{display:none;}
  /* Grid downsteps */
  .kpis{grid-template-columns:repeat(3,1fr);}
  .props{grid-template-columns:repeat(2,1fr);}
  .row3{grid-template-columns:1fr;}
  .pro-grid{grid-template-columns:repeat(2,1fr);}
  .row2,.row2c{grid-template-columns:1fr;}
  /* Search button compaction */
  .srchbtn{display:flex !important;width:42px;padding:0 11px;justify-content:center;}
  .srchbtn span,.srchbtn kbd{display:none;}
  /* Geo full-width */
  .geo{grid-template-columns:1fr;height:auto;}
  .geo-map-wrap{height:60vh;min-height:400px;}
  .geo-search-bar{width:calc(100% - 80px);}
  /* Calendar narrower */
  .cal-week{grid-template-columns:repeat(4,1fr);}
}

@media(max-width:768px){
  /* Mobile — sidebar hidden entirely; replaced by bottom nav */
  .side{display:none;}
  .props,.kpis{grid-template-columns:1fr;}
  .kpis{grid-template-columns:repeat(2,1fr);}
  .reasons{grid-template-columns:1fr;}
  /* Padding for bottom nav */
  .top{padding:12px 14px;gap:6px;}
  .body{padding:14px;padding-bottom:88px;}
  .srch{display:none;}
  /* Hide desktop-only header items, show hamburger */
  .hd-desktop{display:none !important;}
  .hd-menu-btn{display:grid !important;}
  /* Touch targets — buttons and icon-buttons ≥44px on mobile */
  .ib{width:44px;height:44px;border-radius:11px;}
  .btn,.btn.sm{min-height:44px;padding:10px 14px;font-size:14px;}
  .btn.sm{min-height:38px;padding:8px 12px;font-size:13px;}
  /* Modals fullscreen — explicitly override all desktop positioning */
  .modal{
    position:fixed !important;
    inset:0 !important;
    top:0 !important;
    inset-inline-start:0 !important;
    transform:none !important;
    width:100vw !important;
    height:100vh !important;
    height:100dvh !important;
    max-width:100vw !important;
    max-height:100vh !important;
    max-height:100dvh !important;
    border-radius:0 !important;
    padding:18px !important;
    overflow-y:auto !important;
    animation:slide-up-mobile .3s cubic-bezier(.2,.8,.2,1) !important;
  }
  @keyframes slide-up-mobile{from{transform:translateY(100%) !important;opacity:0;}to{transform:none !important;opacity:1;}}
  /* Forms — force single column */
  .f2,.f3{grid-template-columns:1fr !important;}
  /* Calendar — 1 col mobile */
  .cal-week{grid-template-columns:1fr;}
  .cal-day{min-height:auto;}
  /* Header tighter — only logo + AI + menu visible */
  .top h1{font-size:15px;}
  .top .sub{font-size:11.5px;}
  /* Tabs: scroll horizontally if needed */
  .tabs{overflow-x:auto;flex-wrap:nowrap;padding-bottom:4px;-webkit-overflow-scrolling:touch;}
  .tabs button{white-space:nowrap;flex-shrink:0;min-height:38px;}

  /* TABLE → CARDS on mobile — transforms <table class="tbl"> into stacked card rows */
  .tbl,.tbl tbody,.tbl tr,.tbl td{display:block;width:100%;}
  .tbl thead{display:none;}
  .tbl tr{background:var(--surface);border:1px solid var(--line);border-radius:12px;margin-bottom:10px;padding:14px;}
  .tbl tr:hover{background:var(--surface) !important;}
  .tbl td{border:none !important;padding:5px 0 !important;font-size:13.5px;}
  .tbl td:first-child{padding-top:0 !important;border-bottom:1px solid var(--line2) !important;padding-bottom:10px !important;margin-bottom:6px;font-weight:700;font-size:14.5px;}
  .tbl td:last-child{padding-bottom:0 !important;padding-top:10px !important;}
  /* Action cells expand fully */
  .qa{opacity:1 !important;justify-content:flex-end;width:100%;display:flex;}
  /* Admin tables */
  .ac-tbl,.ac-tbl tbody,.ac-tbl tr,.ac-tbl td{display:block;width:100%;}
  .ac-tbl thead{display:none;}
  .ac-tbl tr{background:var(--surface);border:1px solid var(--line);border-radius:12px;margin-bottom:10px;padding:14px;}
  .ac-tbl tr:hover{background:var(--surface) !important;}
  .ac-tbl td{border:none !important;padding:5px 0 !important;font-size:13px;}
  .ac-tbl td:first-child{padding-top:0 !important;border-bottom:1px solid var(--line2) !important;padding-bottom:10px !important;margin-bottom:6px;}
}

  /* Filter chips — scrollable horizontal carousel instead of wrapped */
  .chips{flex-wrap:nowrap;overflow-x:auto;-webkit-overflow-scrolling:touch;padding-bottom:6px;margin-inline:-14px;padding-inline:14px;mask-image:linear-gradient(90deg,transparent 0,#000 12px,#000 calc(100% - 12px),transparent 100%);}
  .chips::-webkit-scrollbar{display:none;}
  .chip{flex-shrink:0;min-height:38px;}
  /* Segmented controls — also horizontal */
  .seg{overflow-x:auto;flex-shrink:0;}
  /* Modal close buttons - bigger on mobile */
  .modal h2 button{width:38px;height:38px;border-radius:10px;}

  /* KPIs swipeable on mobile */
  .kpis{display:flex !important;grid-template-columns:none !important;overflow-x:auto;-webkit-overflow-scrolling:touch;scroll-snap-type:x mandatory;gap:10px;margin-inline:-14px;padding-inline:14px;}
  .kpis::-webkit-scrollbar{display:none;}
  .kpi{flex:0 0 78%;min-width:240px;scroll-snap-align:start;}

  /* ─── FIX 1: iOS input zoom prevention — inputs must be ≥16px or iOS auto-zooms the page ─── */
  input,textarea,select{font-size:16px !important;}

  /* ─── FIX 2: Stronger touch targets across all interactive elements ─── */
  button,a[role="button"]{min-height:44px;touch-action:manipulation;}
  /* Exception for small badges/chips that aren't primary actions */
  .bdg,.chip{min-height:32px;}
  .ac-btn-sm{min-height:36px;}

  /* ─── FIX 3: Smooth momentum scroll everywhere ─── */
  .body,.modal,.ai-panel .ai-body,.bnav-more,.geo-side{-webkit-overflow-scrolling:touch;overscroll-behavior:contain;}

  /* ─── FIX 4: Bottom-nav clearance ─── */
  /* Generic body padding already handled. Also: any fixed bottom UI gets safe-area. */
  .modal{padding-bottom:max(20px,env(safe-area-inset-bottom)) !important;}

  /* ─── FIX 5: AI panel takes priority on mobile, stacks above bottom-nav ─── */
  .ai-panel{z-index:95;}
  .ai-fab{z-index:50;bottom:88px !important;inset-inline-start:16px !important;width:54px !important;height:54px !important;border-radius:17px !important;}
  /* Smaller FAB tooltip on mobile */
  .ai-fab-tip{display:none;}
  /* When admin/AI overlay open, hide bnav so they don't overlap */
  .ai-panel ~ .bnav,.modal ~ .bnav{display:none;}

  /* ─── FIX 6: Active feedback on tap (replaces missing hover) ─── */
  .btn:active,.ib:active,.bnav-item:active,.bnav-more-item:active,.hd-menu-item:active,.chip:active,.ac-btn-sm:active,.ai-quick button:active,.geo-chip:active{transform:scale(.96);transition:transform .08s;}
  .card[onclick]:active,.alert:active,.ai-insight:active,.ai-card:active{background:var(--hover);}

  /* ─── FIX 7: Force tables→cards labeling consistency ─── */
  /* All tbl/ac-tbl cells get proper spacing in card mode */
  .tbl td .qa{justify-content:flex-end;display:flex;gap:6px;width:100%;}
  .tbl td .qa button{min-height:36px;flex:1;justify-content:center;}
  /* Prevent overflow from long city/address text */
  .tbl td,.ac-tbl td{overflow-wrap:break-word;word-break:break-word;min-width:0;}

  /* ─── FIX 8: Modal stacking & body-scroll lock ─── */
  /* When modal/overlay open, prevent double-scroll on body */
  .ov,.modal{overscroll-behavior:contain;}
  /* Modal scroll independently */
  .modal{overflow-y:auto !important;}
  /* Modal title sticky */
  .modal h2{position:sticky;top:-18px;background:var(--surface);margin-inline:-18px;padding:18px;border-bottom:1px solid var(--line2);z-index:1;}

  /* ─── FIX 9: Top header overflow protection ─── */
  .top{position:sticky;top:0;background:var(--surface);z-index:30;border-bottom:1px solid var(--line);padding-top:max(12px,env(safe-area-inset-top)) !important;}
  .top h1{flex:1;min-width:0;overflow:hidden;}
  .top h1 small{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}

  /* ─── FIX 10: Sidebar foot avatar that doesn't exist on mobile shouldn't waste space ─── */
  /* Already hidden via .side{display:none} */

  /* ─── FIX 11: Kanban scroll fix — horizontal swipe ─── */
  .kanban{overflow-x:auto;-webkit-overflow-scrolling:touch;scroll-snap-type:x proximity;padding-bottom:8px;}
  .kcol{flex:0 0 78%;min-width:260px;scroll-snap-align:start;}

  /* ─── FIX 12: Property grid one column with proper card sizing ─── */
  .props{grid-template-columns:1fr;gap:12px;}
  .prop{padding:0;overflow:hidden;}

  /* ─── FIX 13: Map controls bigger and reachable ─── */
  .geo-tool-btn{width:44px;height:44px;}
  .geo-search-bar{width:calc(100% - 70px);padding:11px 13px;}
  .geo-search-bar input{font-size:16px !important;}

  /* ─── FIX 14: AI input field iOS keyboard handling ─── */
  .ai-input{padding:13px 14px;}
  .ai-input button{width:36px;height:36px;}

  /* ─── FIX 15: FAB doesn't conflict with AI button ─── */
  .fab{inset-inline-end:16px !important;bottom:88px !important;}

  /* ─── FIX 16: Card headings smaller on mobile ─── */
  .card h3{font-size:14px;}
  .card .sub{font-size:11.5px;}

  /* ─── FIX 17: GeoMap height optimization on mobile ─── */
  .geo-map-wrap{height:55vh;min-height:380px;}
  .geo-side{max-height:none;padding-bottom:8px;}

  /* ─── FIX 18: Bottom nav active indicator more visible ─── */
  .bnav-item.on{background:var(--brand-soft);}

  /* ─── FIX 19: Stepper compaction ─── */
  .stepper{overflow-x:auto;-webkit-overflow-scrolling:touch;padding-bottom:6px;}
  .stp{flex-shrink:0;min-width:80px;}

  /* ─── FIX 20: Forms field labels readable ─── */
  .fld label,.fld>label{font-size:12.5px;}
  .fld input,.fld textarea,.fld select{font-size:16px !important;padding:12px 14px;}
}

/* Header overflow menu — hidden by default, shown on mobile only */
.hd-desktop{display:flex;align-items:center;gap:8px;}
.hd-menu-btn{display:none;}
.hd-menu-ov{position:fixed;inset:0;background:rgba(15,23,42,.4);z-index:80;display:flex;align-items:flex-start;justify-content:flex-end;padding:14px;animation:fade-in .15s;}
@keyframes fade-in{from{opacity:0;}to{opacity:1;}}
.hd-menu{background:var(--surface);border:1px solid var(--line);border-radius:16px;min-width:260px;max-width:320px;padding:12px;box-shadow:0 12px 40px rgba(15,23,42,.18);animation:menu-pop .2s cubic-bezier(.2,.8,.2,1);}
@keyframes menu-pop{from{transform:translateY(-8px);opacity:0;}to{transform:none;opacity:1;}}
.hd-menu-h{display:flex;align-items:center;gap:10px;padding:6px 8px 12px;border-bottom:1px solid var(--line2);margin-bottom:8px;}
.hd-menu-item{display:flex;align-items:center;gap:11px;width:100%;padding:11px 12px;border:none;background:none;border-radius:10px;font-family:inherit;font-size:13.5px;font-weight:600;color:var(--ink);cursor:pointer;text-align:start;transition:.15s;}
.hd-menu-item:hover{background:var(--hover);}
.hd-menu-item:active{background:var(--brand-soft);}

/* Calendar */
.cal-week{display:grid;grid-template-columns:repeat(7,1fr);gap:6px;}
.cal-day{background:var(--surface);border:1px solid var(--line);border-radius:12px;padding:10px 8px;min-height:140px;}
.cal-day.on{border-color:var(--brand);box-shadow:0 0 0 2px var(--brand-soft);}
.cal-day-h{display:flex;flex-direction:column;align-items:center;font-size:11px;color:var(--soft);padding-bottom:8px;border-bottom:1px solid var(--line2);margin-bottom:8px;}
.cal-day-h strong{color:var(--ink);font-size:13px;font-weight:700;}
.cal-day-events{display:flex;flex-direction:column;gap:4px;}
.cal-ev{font-size:10.5px;padding:5px 7px;border-radius:6px;font-weight:600;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
.cal-empty{font-size:11px;color:var(--faint);text-align:center;padding:8px 0;}
.cal-month-h{font-size:16px;font-weight:700;text-align:center;margin-bottom:12px;}
.cal-month{display:grid;grid-template-columns:repeat(7,1fr);gap:4px;}
.cal-mh{font-size:10.5px;color:var(--soft);font-weight:700;text-align:center;padding:5px 0;}
.cal-mc{background:var(--surface);border:1px solid var(--line2);border-radius:8px;min-height:64px;padding:6px;display:flex;flex-direction:column;gap:3px;}
.cal-mc.on{border-color:var(--brand);background:var(--brand-soft);}
.cal-mc.empty{background:transparent;border:none;}
.cal-mc-d{font-size:11px;font-weight:700;color:var(--soft);margin-bottom:2px;}
.cal-mc.on .cal-mc-d{color:var(--brand);}
.cal-mc-ev{height:3px;border-radius:2px;}

/* AI Assistant — floating cloud button + side panel */
.ai-fab{position:fixed;bottom:24px;inset-inline-start:24px;z-index:90;width:60px;height:60px;border-radius:22px;border:none;cursor:pointer;background:linear-gradient(135deg,#2563EB 0%,#7C3AED 100%);color:#fff;display:grid;place-items:center;box-shadow:0 10px 30px rgba(37,99,235,.35),0 0 0 1px rgba(255,255,255,.15) inset;backdrop-filter:blur(20px);animation:ai-float 4s ease-in-out infinite;transition:.25s cubic-bezier(.2,.8,.2,1);}
.ai-fab:hover{transform:translateY(-3px) scale(1.06);box-shadow:0 16px 40px rgba(37,99,235,.5),0 0 0 1px rgba(255,255,255,.2) inset;}
.ai-fab::before{content:"";position:absolute;inset:-4px;border-radius:24px;background:linear-gradient(135deg,#2563EB,#7C3AED);opacity:.4;filter:blur(14px);z-index:-1;animation:ai-glow 3s ease-in-out infinite;}
.ai-fab .ai-pulse{position:absolute;top:8px;inset-inline-end:8px;width:8px;height:8px;border-radius:50%;background:#10F981;box-shadow:0 0 0 0 rgba(16,249,129,.6);animation:ai-pulse 1.8s ease-in-out infinite;}
@keyframes ai-float{0%,100%{transform:translateY(0);}50%{transform:translateY(-6px);}}
@keyframes ai-glow{0%,100%{opacity:.35;}50%{opacity:.65;}}
@keyframes ai-pulse{0%{box-shadow:0 0 0 0 rgba(16,249,129,.6);}70%{box-shadow:0 0 0 8px rgba(16,249,129,0);}100%{box-shadow:0 0 0 0 rgba(16,249,129,0);}}
.ai-fab-tip{position:absolute;bottom:72px;inset-inline-start:0;background:var(--ink);color:var(--bg);font-size:12px;font-weight:600;padding:7px 12px;border-radius:9px;white-space:nowrap;opacity:0;pointer-events:none;transition:.25s;transform:translateY(4px);}
.ai-fab:hover .ai-fab-tip{opacity:1;transform:translateY(0);}

.ai-panel{position:fixed;top:0;inset-inline-start:0;bottom:0;width:440px;max-width:100vw;background:var(--surface);border-inline-end:1px solid var(--line);box-shadow:6px 0 40px rgba(15,23,42,.15);z-index:95;display:flex;flex-direction:column;animation:ai-slide .35s cubic-bezier(.2,.8,.2,1);}
@keyframes ai-slide{from{transform:translateX(-100%);opacity:0;}to{transform:none;opacity:1;}}
[dir="rtl"] .ai-panel{animation-name:ai-slide-rtl;}
@keyframes ai-slide-rtl{from{transform:translateX(100%);opacity:0;}to{transform:none;opacity:1;}}
.ai-panel-h{padding:18px 20px;background:linear-gradient(135deg,rgba(37,99,235,.08),rgba(124,58,237,.04));border-bottom:1px solid var(--line);}
.ai-panel-h-top{display:flex;align-items:center;gap:11px;}
.ai-logo{width:38px;height:38px;border-radius:13px;background:linear-gradient(135deg,#2563EB,#7C3AED);color:#fff;display:grid;place-items:center;box-shadow:0 6px 14px rgba(37,99,235,.3);}
.ai-panel-h h2{margin:0;font-family:'Plus Jakarta Sans','Heebo';font-weight:800;font-size:17px;letter-spacing:-.3px;}
.ai-panel-h small{display:block;font-size:11.5px;color:var(--soft);margin-top:1px;font-weight:500;}
.ai-close{margin-inline-start:auto;border:none;background:var(--surface2);width:32px;height:32px;border-radius:9px;display:grid;place-items:center;cursor:pointer;color:var(--ink);transition:.15s;}
.ai-close:hover{background:var(--hover);}
.ai-greet{margin-top:14px;font-size:13.5px;color:var(--soft);}
.ai-greet strong{color:var(--ink);font-weight:700;}

.ai-body{flex:1;overflow-y:auto;padding:16px 20px 20px;}
.ai-section-t{font-size:11px;font-weight:700;color:var(--soft);letter-spacing:1.5px;margin:14px 0 8px;display:flex;align-items:center;gap:6px;}
.ai-section-t:first-child{margin-top:0;}

.ai-insights{display:flex;flex-direction:column;gap:7px;margin-bottom:6px;}
.ai-insight{display:flex;gap:10px;padding:11px 12px;border-radius:11px;background:var(--surface2);font-size:12.5px;cursor:pointer;transition:.15s;border-inline-start:3px solid var(--brand);}
.ai-insight:hover{background:var(--hover);transform:translateX(-2px);}
[dir="rtl"] .ai-insight:hover{transform:translateX(2px);}
.ai-insight-ic{width:30px;height:30px;border-radius:9px;display:grid;place-items:center;flex-shrink:0;}
.ai-insight-t{font-weight:600;line-height:1.4;}
.ai-insight-s{font-size:11px;color:var(--soft);margin-top:1px;}

.ai-quick{display:grid;grid-template-columns:1fr 1fr;gap:7px;}
.ai-quick button{display:flex;flex-direction:column;align-items:flex-start;gap:5px;padding:11px 12px;border-radius:11px;background:var(--surface2);border:1px solid var(--line2);font-family:inherit;font-size:12px;font-weight:600;color:var(--ink);text-align:start;cursor:pointer;transition:.15s;}
.ai-quick button:hover{background:var(--brand-soft);border-color:var(--brand);color:var(--brand-ink);transform:translateY(-1px);}
.ai-quick button .qi{width:26px;height:26px;border-radius:8px;display:grid;place-items:center;}

.ai-input-wrap{padding:14px 20px;border-top:1px solid var(--line);background:var(--surface);}
.ai-input{display:flex;align-items:center;gap:8px;background:var(--surface2);border:1.5px solid var(--line);border-radius:14px;padding:11px 14px;transition:.15s;}
.ai-input:focus-within{border-color:var(--brand);background:var(--surface);box-shadow:0 0 0 3px var(--brand-soft);}
.ai-input input{flex:1;border:none;background:none;outline:none;font-family:inherit;font-size:13px;color:var(--ink);}
.ai-input input::placeholder{color:var(--faint);}
.ai-input button{border:none;background:linear-gradient(135deg,var(--brand),#60A5FA);color:#fff;width:32px;height:32px;border-radius:9px;display:grid;place-items:center;cursor:pointer;flex-shrink:0;}
.ai-input button:disabled{opacity:.3;cursor:not-allowed;}
.ai-hint{font-size:10.5px;color:var(--faint);margin-top:7px;display:flex;justify-content:space-between;}
.ai-hint kbd{background:var(--surface2);padding:1px 6px;border-radius:5px;border:1px solid var(--line);font-family:monospace;font-size:9.5px;}

.ai-result{margin-top:14px;}
.ai-result-h{font-size:13px;font-weight:700;margin-bottom:10px;display:flex;align-items:center;gap:7px;}
.ai-result-h .ai-back-q{margin-inline-start:auto;background:none;border:none;color:var(--soft);font-size:11px;cursor:pointer;font-family:inherit;display:flex;align-items:center;gap:3px;}
.ai-result-h .ai-back-q:hover{color:var(--ink);}
.ai-card{background:var(--surface2);border:1px solid var(--line);border-radius:13px;padding:13px;margin-bottom:8px;transition:.15s;}
.ai-card:hover{border-color:var(--brand);}
.ai-card-head{display:flex;align-items:center;gap:10px;margin-bottom:8px;}
.ai-card-name{font-weight:700;font-size:13.5px;flex:1;}
.ai-card-meta{font-size:11px;color:var(--soft);margin-top:1px;}
.ai-card-actions{display:flex;gap:5px;flex-wrap:wrap;}
.ai-card-actions button{display:inline-flex;align-items:center;gap:4px;padding:5px 9px;border-radius:7px;border:1px solid var(--line);background:var(--surface);font-family:inherit;font-size:11px;font-weight:600;color:var(--ink);cursor:pointer;transition:.15s;}
.ai-card-actions button:hover{background:var(--hover);transform:translateY(-1px);}
.ai-card-actions button.prim{background:var(--brand);color:#fff;border-color:transparent;}
.ai-card-actions button.wa{background:#25D366;color:#fff;border-color:transparent;}
.ai-empty-result{text-align:center;padding:24px 12px;color:var(--soft);font-size:12.5px;}
.ai-empty-result svg{opacity:.35;margin-bottom:8px;}

.ai-suggest{display:flex;flex-direction:column;gap:5px;}
.ai-suggest-btn{text-align:start;background:var(--surface2);border:1px solid var(--line2);border-radius:9px;padding:8px 11px;font-family:inherit;font-size:12px;color:var(--soft);cursor:pointer;transition:.15s;}
.ai-suggest-btn:hover{background:var(--brand-soft);border-color:var(--brand);color:var(--brand-ink);}

@media(max-width:768px){
  .ai-fab{bottom:90px;width:54px;height:54px;border-radius:18px;}
  .ai-panel{top:auto;width:100%;height:88vh;border-inline-end:none;border-top:1px solid var(--line);border-radius:22px 22px 0 0;animation:ai-slide-up .35s cubic-bezier(.2,.8,.2,1);}
  @keyframes ai-slide-up{from{transform:translateY(100%);opacity:0;}to{transform:none;opacity:1;}}
  .ai-quick{grid-template-columns:1fr;}
}

/* Mobile Bottom Navigation — hidden on desktop/tablet, fixed bar on phones */
.bnav{display:none;}
.bnav-more-ov{display:none;}
@media(max-width:768px){
  .bnav{display:flex;position:fixed;bottom:0;inset-inline:0;background:var(--surface);border-top:1px solid var(--line);padding:6px 4px;padding-bottom:max(8px,env(safe-area-inset-bottom));z-index:40;box-shadow:0 -4px 16px rgba(15,23,42,.06);}
  .bnav-item{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:3px;padding:8px 4px;min-height:54px;border:none;background:none;color:var(--soft);font-family:inherit;font-size:10.5px;font-weight:600;cursor:pointer;border-radius:10px;transition:.15s;position:relative;}
  .bnav-item.on{color:var(--brand);}
  .bnav-item.on svg{stroke:var(--brand);}
  .bnav-item:active{background:var(--hover);}
  .bnav-item .bcnt{position:absolute;top:5px;inset-inline-end:22%;background:var(--red);color:#fff;font-size:9px;font-weight:800;border-radius:9px;padding:1px 5px;min-width:14px;text-align:center;}
  /* Hide the FAB at the very bottom so it doesn't collide with the nav */
  .fab{bottom:78px !important;}

  /* More drawer — bottom sheet */
  .bnav-more-ov{display:flex;align-items:flex-end;justify-content:center;position:fixed;inset:0;background:rgba(15,23,42,.4);z-index:60;animation:fade-in .2s;}
  .bnav-more{width:100%;max-height:78vh;background:var(--surface);border-radius:22px 22px 0 0;padding:8px 18px 22px;animation:slide-up .3s cubic-bezier(.2,.8,.2,1);overflow-y:auto;padding-bottom:max(22px,env(safe-area-inset-bottom));}
  .bnav-more-handle{width:38px;height:4px;background:var(--line);border-radius:3px;margin:6px auto 14px;}
  .bnav-more-h{display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;}
  .bnav-more-h h3{margin:0;font-size:16px;font-weight:700;}
  .bnav-more-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;}
  .bnav-more-item{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:7px;padding:16px 8px;min-height:88px;border:1px solid var(--line2);background:var(--surface2);border-radius:14px;font-family:inherit;font-size:12px;font-weight:600;color:var(--ink);cursor:pointer;transition:.15s;position:relative;}
  .bnav-more-item.on{background:var(--brand-soft);border-color:var(--brand);color:var(--brand-ink);}
  .bnav-more-item:active{transform:scale(.97);}
  .bm-ic{width:36px;height:36px;border-radius:10px;background:var(--surface);display:grid;place-items:center;color:var(--soft);}
  .bnav-more-item.on .bm-ic{background:var(--brand);color:#fff;}
  .bm-cnt{position:absolute;top:8px;inset-inline-end:8px;background:var(--red);color:#fff;font-size:10px;font-weight:800;border-radius:9px;padding:1px 6px;min-width:16px;text-align:center;}
}
`;

/* ════════════════════ PRIMITIVES ════════════════════ */
const AVA = ["#2563EB", "#6366F1", "#0891B2", "#D97706", "#EA580C", "#16A34A", "#9333EA", "#DC2626", "#DB2777"];
const initials = (n) => n.split(" ").map((w) => w[0]).slice(0, 2).join("");
const ac = (id) => AVA[id % AVA.length];
const byId = (a, id) => a.find((x) => x.id === id);
const tVar = (t) => "var(--" + t + ")";
const tSoft = (t) => "var(--" + t + "-soft)";
const statusTone = (s) => ({ חם: "red", בינוני: "amber", קר: "blue", זמין: "green", בלעדיות: "amber", בעסקה: "indigo", נמכר: "gray", קונה: "blue", מוכר: "amber", חדש: "blue", "נוצר קשר": "cyan", בטיפול: "indigo", הבשלה: "amber", סגור: "gray", גבוהה: "red", בינונית: "amber", נמוכה: "gray" }[s] || "gray");

function Avatar({ id, name, size = 34, font }) { return <div className="ava mini" style={{ width: size, height: size, fontSize: font || size * 0.4, background: ac(id) }}>{initials(name)}</div>; }
function Counter({ value, fmt }) {
  const [d, setD] = useState(0);
  useEffect(() => {
    let raf; const start = performance.now(), dur = 750;
    const tick = (now) => { const t = Math.min((now - start) / dur, 1); const e = 1 - Math.pow(1 - t, 3); setD(value * e); if (t < 1) raf = requestAnimationFrame(tick); };
    raf = requestAnimationFrame(tick); return () => cancelAnimationFrame(raf);
  }, [value]);
  return <>{fmt ? fmt(d) : Math.round(d).toLocaleString("he-IL")}</>;
}
function Spark({ data, color }) {
  const w = 66, h = 24, mx = Math.max(...data), mn = Math.min(...data);
  const pts = data.map((v, i) => `${(i / (data.length - 1)) * w},${h - ((v - mn) / (mx - mn || 1)) * (h - 4) - 2}`).join(" ");
  return <svg width={w} height={h} className="spark"><polyline points={pts} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}
function Ring({ pct, size = 58, stroke = 5 }) {
  const r = size / 2 - stroke, c = 2 * Math.PI * r, col = pct >= 80 ? "var(--green)" : pct >= 55 ? "var(--amber)" : pct >= 30 ? "var(--blue)" : "var(--red)";
  return <div className="ring" style={{ width: size, height: size }}><svg width={size} height={size}>
    <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--line2)" strokeWidth={stroke} />
    <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={col} strokeWidth={stroke} strokeLinecap="round" strokeDasharray={c} strokeDashoffset={c - c * pct / 100} style={{ transition: "stroke-dashoffset .9s cubic-bezier(.2,.8,.2,1)" }} />
  </svg><div className="pc" style={{ color: col, fontSize: size * 0.25 }}>{pct}{size > 90 ? "%" : ""}</div></div>;
}
function Photo({ seed, h = 150, children }) {
  const [err, setErr] = useState(false);
  return <div className="photo" style={{ height: h }}>
    {!err && <img src={`https://picsum.photos/seed/nx${seed}/520/360`} onError={() => setErr(true)} alt="" />}
    {err && <Home size={42} color="var(--brand)" style={{ opacity: .4 }} />}
    {children}
  </div>;
}
function Empty({ icon, title, sub }) {
  return <div className="empty"><div className="ei">{icon}</div><h4>{title}</h4><div style={{ fontSize: 13 }}>{sub}</div></div>;
}
function Dropdown({ label, options, value, onChange }) {
  const [o, setO] = useState(false);
  return <div className="dd">
    <button className="chip" onClick={() => setO(!o)}><ArrowUpDown size={14} />{label}: {options.find((x) => x.v === value)?.l}<ChevronDown size={13} /></button>
    {o && <><div style={{ position: "fixed", inset: 0, zIndex: 39 }} onClick={() => setO(false)} />
      <div className="ddm">{options.map((op) => <button key={op.v} className={value === op.v ? "on" : ""} onClick={() => { onChange(op.v); setO(false); }}>{value === op.v && <Check size={14} />}{op.l}</button>)}</div></>}
  </div>;
}
function Skeleton() {
  return <div>
    <div className="kpis">{[0, 1, 2, 3, 4].map((i) => <div className="kpi" key={i}><div className="skel" style={{ width: 36, height: 36, borderRadius: 11 }} /><div className="skel" style={{ width: "60%", height: 12, marginTop: 14 }} /><div className="skel" style={{ width: "45%", height: 22, marginTop: 10 }} /></div>)}</div>
    <div className="row2">{[0, 1].map((i) => <div className="card" key={i}><div className="skel" style={{ width: "40%", height: 16 }} /><div className="skel" style={{ width: "100%", height: 170, marginTop: 16 }} /></div>)}</div>
    <div className="row3">{[0, 1, 2].map((i) => <div className="card" key={i}><div className="skel" style={{ width: "50%", height: 16 }} />{[0, 1, 2, 3].map((j) => <div className="skel" key={j} style={{ width: "100%", height: 38, marginTop: 12 }} />)}</div>)}</div>
  </div>;
}

/* ════════════════════ GEO MODULE — coordinates, projection, aggregation ════════════════════ */
// Israeli city centroids (approximate lat/lng). The SVG canvas is a stylised map of Israel.
const CITY_COORDS = {
  "תל אביב": { lat: 32.0853, lng: 34.7818 },
  "רמת גן": { lat: 32.0700, lng: 34.8244 },
  "גבעתיים": { lat: 32.0719, lng: 34.8104 },
  "הרצליה": { lat: 32.1624, lng: 34.8442 },
  "רעננה": { lat: 32.1836, lng: 34.8709 },
  "פתח תקווה": { lat: 32.0878, lng: 34.8878 },
  "ראשון לציון": { lat: 31.9730, lng: 34.7925 },
  "חולון": { lat: 32.0117, lng: 34.7747 },
  "בת ים": { lat: 32.0167, lng: 34.7500 },
  "נתניה": { lat: 32.3328, lng: 34.8600 },
  "ירושלים": { lat: 31.7683, lng: 35.2137 },
  "חיפה": { lat: 32.7940, lng: 34.9896 },
  "באר שבע": { lat: 31.2530, lng: 34.7915 },
  "אשדוד": { lat: 31.8044, lng: 34.6553 },
  "כפר סבא": { lat: 32.1750, lng: 34.9069 },
  "בני ברק": { lat: 32.0833, lng: 34.8333 },
  "גבעת שמואל": { lat: 32.0775, lng: 34.8483 },
};

// Project lat/lng onto a fixed SVG canvas (1000 wide × 1100 tall, roughly bounded to Israel).
const GEO_BOUNDS = { minLng: 34.2, maxLng: 35.9, minLat: 29.5, maxLat: 33.3 };
function project(lat, lng, w = 1000, h = 1100) {
  const x = ((lng - GEO_BOUNDS.minLng) / (GEO_BOUNDS.maxLng - GEO_BOUNDS.minLng)) * w;
  const y = h - ((lat - GEO_BOUNDS.minLat) / (GEO_BOUNDS.maxLat - GEO_BOUNDS.minLat)) * h;
  return { x, y };
}
function cityXY(city, w, h) { const c = CITY_COORDS[city]; if (!c) return null; return project(c.lat, c.lng, w, h); }
// Deterministic jitter for a property's pin around its city centroid — makes urban clusters legible
function propXY(p, w, h) {
  const base = cityXY(p.city, w, h); if (!base) return null;
  const seed = (p.id || 0) * 9301 + 49297;
  const a = ((seed % 360) * Math.PI) / 180;
  const r = 8 + ((seed >> 8) & 31);
  return { x: base.x + Math.cos(a) * r, y: base.y + Math.sin(a) * r };
}

// Status → marker color
const STATUS_COLOR = { "זמין": "var(--green)", "בלעדיות": "var(--blue)", "בעסקה": "var(--amber)", "נמכר": "var(--red)", "מוקפא": "var(--soft)" };

// Aggregate per-city stats (props, buyer demand, deals, avg time-to-close)
function aggregateByCity(props, contacts, deals) {
  const map = {};
  const ensure = (name) => map[name] || (map[name] = { name, props: 0, buyers: 0, deals: 0, dealsActive: 0, closeDaysSum: 0, closeDaysN: 0, byStatus: {} });
  props.forEach((p) => { const r = ensure(p.city); r.props++; r.byStatus[p.status] = (r.byStatus[p.status] || 0) + 1; });
  contacts.filter((c) => c.kind === "קונה" && c.areas).forEach((c) => { c.areas.forEach((a) => { if (a) { const r = ensure(a); r.buyers++; } }); });
  deals.forEach((d) => {
    const p = props.find((x) => x.id === d.propId); if (!p) return;
    const r = ensure(p.city); r.deals++;
    if (d.stage !== "נסגר") r.dealsActive++;
    if (d.stage === "נסגר" && d.closedAgo != null && d.createdAgo != null) { r.closeDaysSum += (d.createdAgo - d.closedAgo); r.closeDaysN++; }
  });
  return Object.values(map).sort((a, b) => (b.props + b.buyers + b.deals) - (a.props + a.buyers + a.deals));
}

// Smart geo insights (statistical, not ML — explainable and honest)
function geoInsights(cityAgg) {
  const out = [];
  if (cityAgg.length === 0) return out;
  // Highest demand
  const byDemand = [...cityAgg].sort((a, b) => b.buyers - a.buyers);
  if (byDemand[0]?.buyers > 0) out.push({ tone: "red", icon: <TrendingUp size={15} />, t: "ביקוש גבוה ביותר", s: `${byDemand[0].name} — ${byDemand[0].buyers} קונים פעילים מחפשים נכס באזור` });
  // Shortage (high buyers, low props)
  const shortage = cityAgg.find((c) => c.buyers > c.props * 1.5 && c.buyers >= 3);
  if (shortage) out.push({ tone: "amber", icon: <AlertCircle size={15} />, t: "מחסור בנכסים", s: `${shortage.name} — ${shortage.buyers} קונים מול ${shortage.props} נכסים. פוטנציאל גיוס בלעדיות.` });
  // Oversupply
  const oversupply = cityAgg.find((c) => c.props >= 4 && c.buyers < c.props * 0.5);
  if (oversupply) out.push({ tone: "blue", icon: <Building2 size={15} />, t: "מלאי עודף", s: `${oversupply.name} — ${oversupply.props} נכסים מול ${oversupply.buyers} קונים. שווה לקדם שיווק ממוקד.` });
  // Most active deals
  const byDeals = [...cityAgg].sort((a, b) => b.deals - a.deals);
  if (byDeals[0]?.deals > 0) out.push({ tone: "green", icon: <Handshake size={15} />, t: "אזור פעיל", s: `${byDeals[0].name} — ${byDeals[0].deals} עסקאות (${byDeals[0].dealsActive} פעילות עכשיו)` });
  // Average time to close
  const closers = cityAgg.filter((c) => c.closeDaysN > 0).sort((a, b) => (a.closeDaysSum / a.closeDaysN) - (b.closeDaysSum / b.closeDaysN));
  if (closers[0]) {
    const avg = Math.round(closers[0].closeDaysSum / closers[0].closeDaysN);
    out.push({ tone: "purple", icon: <Timer size={15} />, t: "סגירה מהירה ביותר", s: `${closers[0].name} — זמן ממוצע ${avg} ימים מפתיחת עסקה לסגירה` });
  }
  return out;
}

/* ════════════════════ DASHBOARD ════════════════════ */
function Dashboard({ db, openContact, go }) {
  const { contacts, props, deals, tasks, acts } = db;
  const buyers = contacts.filter((c) => c.kind === "קונה");
  const active = deals.filter(isActive);
  const won = deals.filter((d) => d.stage === "נסגר");
  const closeRate = Math.round((won.length / deals.length) * 100);
  const expComm = active.reduce((s, d) => s + commission(d) * stageObj(d.stage).prob / 100, 0);
  const monthRev = won.filter((d) => d.closedAgo <= 30).reduce((s, d) => s + commission(d), 0) + 196000;
  const scored = buyers.map((c) => ({ c, ...leadScore(c, acts, deals) }));
  const activeLeads = scored.filter((x) => x.tier !== "קר").length;
  const goalPct = Math.min(100, Math.round(monthRev / MONTHLY_GOAL * 100));

  const trend = [{ m: "ינו", v: 38, f: 42 }, { m: "פבר", v: 52, f: 50 }, { m: "מרץ", v: 47, f: 55 }, { m: "אפר", v: 61, f: 60 }, { m: "מאי", v: 73, f: 68 }, { m: "יוני", v: Math.round(monthRev / 1000), f: 75 }];
  const srcData = SOURCES.map((s, i) => ({ name: s, value: buyers.filter((c) => c.source === s).length, fill: AVA[i] })).filter((x) => x.value);
  const hot = scored.filter((x) => x.tier === "חם").sort((a, b) => b.score - a.score).slice(0, 5);
  const todayTasks = tasks.filter((t) => !t.done && t.dueIn <= 0).slice(0, 5);

  // City aggregation for the new Geo card (replaces the old activity heatmap)
  const cityAgg = aggregateByCity(props, contacts, deals);

  /* ── Office Health Score (0-100) — explainable, derived from real signals ── */
  const health = (() => {
    const parts = [];
    // Response time: how many hot leads have been contacted in the last 3 days
    const hotLeads = scored.filter((x) => x.tier === "חם");
    const hotContacted = hotLeads.filter((x) => x.c.lastContactAgo <= 3).length;
    const respPct = hotLeads.length ? hotContacted / hotLeads.length : 1;
    parts.push({ label: "זמן תגובה ללידים חמים", score: Math.round(respPct * 100), weight: 25, advice: respPct < 0.7 ? `${hotLeads.length - hotContacted} לידים חמים ללא קשר בשלושת הימים האחרונים` : null });

    // Follow-up consistency: leads contacted in last 7 days vs total active
    const recent = buyers.filter((c) => c.lastContactAgo <= 7).length;
    const followPct = buyers.length ? recent / buyers.length : 1;
    parts.push({ label: "עקביות מעקבים", score: Math.round(followPct * 100), weight: 20, advice: followPct < 0.5 ? `רק ${Math.round(followPct * 100)}% מהלידים קיבלו מעקב בשבוע האחרון` : null });

    // Pipeline health: deals progressing through stages (not all stuck at "ליד")
    const stuck = active.filter((d) => d.stage === "ליד" && d.createdAgo > 7).length;
    const stuckPct = active.length ? 1 - stuck / active.length : 1;
    parts.push({ label: "התקדמות עסקאות", score: Math.round(stuckPct * 100), weight: 25, advice: stuck > 0 ? `${stuck} עסקאות תקועות בשלב "ליד" יותר משבוע` : null });

    // Task completion: % of tasks past due
    const overdue = tasks.filter((t) => !t.done && t.dueIn < 0).length;
    const taskPct = tasks.length ? 1 - overdue / tasks.length : 1;
    parts.push({ label: "ביצוע משימות", score: Math.round(taskPct * 100), weight: 15, advice: overdue > 3 ? `${overdue} משימות באיחור` : null });

    // Activity volume: actions in the last 7 days, normalized
    const recentActs = acts.filter((a) => a.daysAgo <= 7).length;
    const actPct = Math.min(1, recentActs / (buyers.length * 0.5 || 1));
    parts.push({ label: "נפח פעילות", score: Math.round(actPct * 100), weight: 15, advice: actPct < 0.4 ? "נפח פעילות נמוך השבוע — שקול לקבוע סבב פולואפים" : null });

    const total = parts.reduce((s, p) => s + p.score * p.weight, 0) / parts.reduce((s, p) => s + p.weight, 0);
    return { score: Math.round(total), parts };
  })();
  const healthTone = health.score >= 80 ? "green" : health.score >= 60 ? "amber" : "red";
  const healthLabel = health.score >= 80 ? "מצוין" : health.score >= 60 ? "סביר" : "דורש שיפור";

  /* ── Action center — "מה דורש את הטיפול שלי עכשיו" ── */
  const actions = [];
  const hotNoContact = scored.filter((x) => x.tier === "חם" && x.c.lastContactAgo > 3);
  if (hotNoContact.length) actions.push({ tone: "red", icon: <Flame size={15} />, t: `${hotNoContact.length} לידים חמים ללא קשר 3+ ימים`, cta: "לידים", go: () => go("leads") });
  const stuckDeals = active.filter((d) => d.stage === "מו\"מ" && d.createdAgo > 14);
  if (stuckDeals.length) actions.push({ tone: "amber", icon: <Handshake size={15} />, t: `${stuckDeals.length} עסקאות תקועות במו"מ`, cta: "עסקאות", go: () => go("deals") });
  const exclExp = props.filter((p) => p.exclusive && p.exclEndDays != null && p.exclEndDays <= 14);
  if (exclExp.length) actions.push({ tone: "purple", icon: <KeyRound size={15} />, t: `${exclExp.length} הסכמי בלעדיות פוקעים תוך 14 ימים`, cta: "בעלי נכסים", go: () => go("owners") });
  const overdueTasks = tasks.filter((t) => !t.done && t.dueIn < 0);
  if (overdueTasks.length) actions.push({ tone: "red", icon: <AlertCircle size={15} />, t: `${overdueTasks.length} משימות באיחור`, cta: "משימות", go: () => go("tasks") });
  const missingDocs = deals.filter((d) => (d.stage === "חוזה" || d.stage === "נסגר") && (!d.docs || d.docs.filter((doc) => doc.status === "נחתם").length < 2)).length;
  if (missingDocs) actions.push({ tone: "blue", icon: <FileSignature size={15} />, t: `${missingDocs} עסקאות בשלב חוזה עם מסמכים חסרים`, cta: "מסמכים", go: () => go("docs") });
  const newMatches = (() => {
    let n = 0;
    props.filter((p) => p.status === "זמין").forEach((p) => { const k = buyers.filter((b) => { const m = matchScore(b, p); return m && m.score >= 85; }).length; if (k >= 2) n++; });
    return n;
  })();
  if (newMatches) actions.push({ tone: "green", icon: <Target size={15} />, t: `${newMatches} נכסים עם ${"2+"} התאמות חזקות`, cta: "התאמות", go: () => go("match") });

  // AI insights / next best actions
  const insights = [];
  const hotNoDeal = scored.filter((x) => x.tier === "חם" && !deals.some((d) => d.buyerId === x.c.id));
  if (hotNoDeal.length) insights.push({ tone: "red", icon: <Flame size={17} />, t: hotNoDeal.length + " לידים חמים ללא עסקה פעילה", s: "הזדמנות ישירה — פתח עסקה לפני שהם מתקררים", a: "לעבור ללידים", go: () => go("leads") });
  const negDeals = active.filter((d) => d.stage === "מו\"מ" || d.stage === "חוזה");
  if (negDeals.length) insights.push({ tone: "amber", icon: <Handshake size={17} />, t: negDeals.length + " עסקאות בשלב סגירה", s: "שווי כולל " + short(negDeals.reduce((s, d) => s + dealValue(d), 0)) + " — דורש דחיפה לסגירה", a: "לצנרת", go: () => go("deals") });
  let bestProp = null, bestN = 0;
  props.filter((p) => p.status !== "נמכר").forEach((p) => { const n = buyers.filter((b) => { const m = matchScore(b, p); return m && m.score >= 80; }).length; if (n > bestN) { bestN = n; bestProp = p; } });
  if (bestProp && bestN >= 2) insights.push({ tone: "green", icon: <Target size={17} />, t: bestProp.addr + " — " + bestN + " קונים בהתאמה 80+", s: "קבע סבב צפיות ממוקד למקסום סיכויי סגירה", a: "למנוע ההתאמה", go: () => go("match") });
  const expSoon = props.filter((p) => p.exclusive && p.exclEndDays != null && p.exclEndDays <= 14).length;
  if (expSoon) insights.push({ tone: "purple", icon: <KeyRound size={17} />, t: expSoon + " הסכמי בלעדיות לקראת סיום", s: "חדש מול הבעלים לפני שהנכסים נפתחים למתחרים", a: "לבעלי נכסים", go: () => go("owners") });

  const kpis = [
    { lbl: "לידים פעילים", raw: activeLeads, ic: <UserPlus size={16} />, tone: "blue", dl: "+12%", up: true, sp: [18, 22, 20, 26, 25, activeLeads] },
    { lbl: "עסקאות פתוחות", raw: active.length, ic: <KanbanSquare size={16} />, tone: "indigo", dl: "+2", up: true, sp: [12, 14, 13, 17, 18, active.length] },
    { lbl: "שיעור סגירה", raw: closeRate, fmt: (v) => Math.round(v) + "%", ic: <Percent size={16} />, tone: "amber", dl: "+4%", up: true, sp: [22, 26, 24, 28, 30, closeRate] },
    { lbl: "עמלות צפויות", raw: expComm, fmt: short, ic: <Sparkles size={16} />, tone: "purple", dl: "+11%", up: true, sp: [120, 140, 135, 180, 210, Math.round(expComm / 1000)] },
    { lbl: "הכנסות החודש", raw: monthRev, fmt: short, ic: <Banknote size={16} />, tone: "green", dl: "+19%", up: true, sp: [38, 41, 52, 49, 58, Math.round(monthRev / 1000)] },
  ];

  return <>
    {/* ── ACTION CENTER + OFFICE HEALTH SCORE ── */}
    <div className="row2c">
      <div className="card">
        <h3><AlertCircle size={16} color="var(--red)" />מה דורש את הטיפול שלי עכשיו
          {actions.length > 0 && <span className="bdg b-red" style={{ marginInlineStart: "auto" }}>{actions.length}</span>}
        </h3>
        <div className="sub">פעולות שמשפיעות ישירות על סגירת עסקאות</div>
        {actions.length === 0 ? (
          <div style={{ display: "flex", alignItems: "center", gap: 10, padding: 14, background: "var(--green-soft)", borderRadius: 10, color: "var(--green)" }}>
            <CheckCircle2 size={18} /><div><strong style={{ fontSize: 13 }}>הכל תחת שליטה</strong><div style={{ fontSize: 11.5, opacity: .85 }}>אין כרגע פעולות דחופות שדורשות התערבות</div></div>
          </div>
        ) : actions.slice(0, 6).map((a, i) => (
          <div key={i} className="alert" onClick={a.go}>
            <div className="ai" style={{ background: tSoft(a.tone), color: tVar(a.tone) }}>{a.icon}</div>
            <div style={{ flex: 1, fontSize: 13, fontWeight: 600 }}>{a.t}</div>
            <span className="bdg b-gray" style={{ fontSize: 10.5 }}>{a.cta}<ChevronLeft size={11} /></span>
          </div>
        ))}
      </div>

      <div className="card">
        <h3><Shield size={16} color={"var(--" + healthTone + ")"} />Office Health Score</h3>
        <div className="sub">מד תקינות תפעולית של המשרד</div>
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 14 }}>
          <Ring pct={health.score} size={104} stroke={9} />
          <div>
            <div style={{ fontSize: 32, fontWeight: 800, fontFamily: "Plus Jakarta Sans,Heebo", lineHeight: 1, color: "var(--" + healthTone + ")" }}>{health.score}</div>
            <div style={{ fontSize: 12, color: "var(--soft)", marginTop: 4 }}>מתוך 100</div>
            <span className={"bdg b-" + healthTone} style={{ marginTop: 6 }}>{healthLabel}</span>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
          {health.parts.map((p, i) => {
            const tone = p.score >= 75 ? "green" : p.score >= 50 ? "amber" : "red";
            return <div key={i} style={{ fontSize: 11.5 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                <span style={{ color: "var(--soft)" }}>{p.label}</span>
                <strong style={{ color: "var(--" + tone + ")" }}>{p.score}</strong>
              </div>
              <div style={{ height: 4, background: "var(--line2)", borderRadius: 3, overflow: "hidden" }}>
                <div style={{ height: "100%", width: p.score + "%", background: "var(--" + tone + ")", transition: "width .6s" }} />
              </div>
              {p.advice && <div style={{ fontSize: 10.5, color: "var(--" + tone + ")", marginTop: 3, opacity: .85 }}>↳ {p.advice}</div>}
            </div>;
          })}
        </div>
      </div>
    </div>

    <div className="kpis">{kpis.map((k, i) => <div className="kpi" key={i}>
      <div className="kc" style={{ background: tSoft(k.tone), color: tVar(k.tone) }}>{k.ic}</div>
      <div className="lbl">{k.lbl}</div>
      <div className="val"><Counter value={k.raw} fmt={k.fmt} /></div>
      <div className="dl" style={{ background: k.up ? "var(--green-soft)" : "var(--red-soft)", color: k.up ? "var(--green)" : "var(--red)" }}>{k.up ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}{k.dl}</div>
      <Spark data={k.sp} color={k.up ? "var(--green)" : "var(--red)"} /></div>)}</div>

    <div className="row2c">
      <div className="card"><h3><KanbanSquare size={16} color="var(--brand)" />משפך מכירות</h3><div className="sub">{active.length} עסקאות פעילות לאורך שלבי המכירה</div>
        {DEAL_STAGES.filter((s) => s.key !== "נסגר").map((st) => {
          const ds = active.filter((d) => d.stage === st.key); const val = ds.reduce((s, d) => s + dealValue(d), 0);
          const mx = Math.max(...DEAL_STAGES.map((s) => active.filter((d) => d.stage === s.key).length), 1);
          return <div className="fbar" key={st.key}><div className="hd"><span>{st.label} · {ds.length} עסקאות</span><span style={{ color: "var(--soft)" }}>{short(val)}</span></div>
            <div className="tr"><div className="fl" style={{ width: Math.max(ds.length / mx * 100, 4) + "%", background: "linear-gradient(90deg," + tVar(st.color) + ",color-mix(in srgb," + tVar(st.color) + " 70%,#fff))" }} /></div></div>;
        })}</div>
      <div className="card"><h3><Target size={16} color="var(--brand)" />יעד חודשי</h3><div className="sub">ביצוע מול יעד עמלות</div>
        <div className="goalw"><Ring pct={goalPct} size={140} stroke={11} />
          <div style={{ textAlign: "center", marginTop: 14 }}><div style={{ fontWeight: 800, fontSize: 19, fontFamily: "Plus Jakarta Sans" }}>{short(monthRev)}</div>
            <div style={{ fontSize: 12, color: "var(--soft)", marginTop: 2 }}>מתוך יעד {short(MONTHLY_GOAL)}</div></div></div></div>
    </div>

    <div className="row2c">
      <div className="card"><h3><TrendingUp size={16} color="var(--brand)" />תחזית הכנסות</h3><div className="sub">ביצוע מול תחזית — 6 חודשים (₪ אלפים)</div>
        <div style={{ height: 200, direction: "ltr" }}><ResponsiveContainer width="100%" height="100%">
          <AreaChart data={trend} margin={{ top: 8, right: 6, left: 6, bottom: 0 }}>
            <defs><linearGradient id="ga" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="var(--brand)" stopOpacity={.3} /><stop offset="100%" stopColor="var(--brand)" stopOpacity={0} /></linearGradient></defs>
            <XAxis dataKey="m" tick={{ fontSize: 11, fontFamily: "Heebo", fill: "var(--soft)" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 10, fill: "var(--soft)" }} axisLine={false} tickLine={false} width={26} />
            <Tooltip formatter={(v, n) => [v + "K ₪", n === "v" ? "בפועל" : "תחזית"]} contentStyle={{ fontFamily: "Heebo", fontSize: 12, borderRadius: 12, border: "1px solid var(--line)", background: "var(--surface)", direction: "rtl" }} />
            <Area type="monotone" dataKey="f" stroke="var(--faint)" strokeWidth={1.5} strokeDasharray="4 4" fill="none" />
            <Area type="monotone" dataKey="v" stroke="var(--brand)" strokeWidth={2.5} fill="url(#ga)" />
          </AreaChart></ResponsiveContainer></div></div>
      <div className="card"><h3><Users size={16} color="var(--brand)" />מקורות לידים</h3><div className="sub">התפלגות מקורות הגעה</div>
        <div style={{ height: 150, direction: "ltr" }}><ResponsiveContainer width="100%" height="100%"><PieChart>
          <Pie data={srcData} dataKey="value" nameKey="name" innerRadius={40} outerRadius={64} paddingAngle={2}>{srcData.map((e, i) => <Cell key={i} fill={e.fill} />)}</Pie>
          <Tooltip contentStyle={{ fontFamily: "Heebo", fontSize: 12, borderRadius: 12, background: "var(--surface)", border: "1px solid var(--line)", direction: "rtl" }} />
        </PieChart></ResponsiveContainer></div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center", marginTop: 6 }}>{srcData.map((s, i) => <span key={i} style={{ fontSize: 11, color: "var(--soft)", display: "flex", alignItems: "center", gap: 4 }}><span style={{ width: 8, height: 8, borderRadius: 3, background: s.fill }} />{s.name}</span>)}</div></div>
    </div>

    <div className="card" style={{ marginBottom: 18 }}>
      <h3><MapPin size={16} color="var(--brand)" />מפת נכסים וביקושים
        <button className="btn sm" style={{ marginInlineStart: "auto" }} onClick={() => go("geo")}>פתח מפה מלאה<ChevronLeft size={13} /></button>
      </h3>
      <div className="sub">5 הערים הפעילות ביותר — נכסים מול ביקוש</div>
      <div className="geo-mini">
        {cityAgg.slice(0, 5).map((c) => {
          const max = cityAgg[0] ? Math.max(cityAgg[0].props, cityAgg[0].buyers, 1) : 1;
          const propsPct = (c.props / max) * 100;
          const buyersPct = (c.buyers / max) * 100;
          const tone = c.buyers > c.props * 1.3 ? "red" : c.buyers < c.props * 0.6 ? "amber" : "green";
          return <div className="geo-mini-row" key={c.name}>
            <div className="geo-mini-name">{c.name}<small>{c.deals} עסקאות</small></div>
            <div className="geo-mini-bars">
              <div className="geo-mini-bar"><div style={{ width: propsPct + "%", background: "var(--brand)" }} title={c.props + " נכסים"} /></div>
              <div className="geo-mini-bar"><div style={{ width: buyersPct + "%", background: "var(--amber)" }} title={c.buyers + " קונים"} /></div>
            </div>
            <span className={"bdg b-" + tone} style={{ minWidth: 60, justifyContent: "center" }}>
              {tone === "red" ? "ביקוש גבוה" : tone === "amber" ? "מלאי עודף" : "מאוזן"}
            </span>
          </div>;
        })}
      </div>
      <div style={{ display: "flex", gap: 14, marginTop: 10, fontSize: 11, color: "var(--soft)" }}>
        <span style={{ display: "flex", alignItems: "center", gap: 4 }}><span style={{ width: 9, height: 9, borderRadius: 2, background: "var(--brand)" }} />נכסים</span>
        <span style={{ display: "flex", alignItems: "center", gap: 4 }}><span style={{ width: 9, height: 9, borderRadius: 2, background: "var(--amber)" }} />קונים פעילים</span>
      </div>
    </div>

    <div className="row3">
      <div className="card"><h3><Lightbulb size={16} color="var(--amber)" />תובנות חכמות<span className="bdg b-brand" style={{ marginInlineStart: "auto" }}><Sparkles size={11} />AI</span></h3><div className="sub">המלצות לפעולה הבאה</div>
        {insights.slice(0, 4).map((a, i) => <div className="insight" key={i}>
          <div className="ai" style={{ background: tSoft(a.tone), color: tVar(a.tone) }}>{a.icon}</div>
          <div style={{ flex: 1 }}><div style={{ fontWeight: 600, fontSize: 12.5 }}>{a.t}</div><div style={{ fontSize: 11.5, color: "var(--soft)", margin: "2px 0 7px" }}>{a.s}</div>
            <button className="btn sm" onClick={a.go} style={{ padding: "5px 10px" }}>{a.a}<ChevronLeft size={13} /></button></div></div>)}
        {!insights.length && <Empty icon={<Sparkles size={26} />} title="הכל תחת שליטה" sub="אין כרגע פעולות דחופות" />}</div>

      <div className="card"><h3><Flame size={16} color="var(--red)" />לידים חמים</h3><div className="sub">דירוג אוטומטי לפי מעורבות</div>
        {hot.map((x) => <div key={x.c.id} onClick={() => openContact(x.c.id)} style={{ display: "flex", alignItems: "center", gap: 11, padding: "10px 2px", borderBottom: "1px solid var(--line2)", cursor: "pointer" }}>
          <Avatar id={x.c.id} name={x.c.name} /><div style={{ flex: 1 }}><div style={{ fontWeight: 600, fontSize: 13 }}>{x.c.name}</div><div style={{ fontSize: 11.5, color: "var(--soft)" }}>{money(x.c.budget)} · {x.c.minRooms}+ חד׳</div></div>
          <span className="bdg b-red"><Flame size={11} />{x.score}</span></div>)}</div>

      <div className="card"><h3><CheckSquare size={16} color="var(--brand)" />משימות להיום</h3><div className="sub">{todayTasks.length} משימות דורשות טיפול</div>
        {todayTasks.map((t) => { const c = byId(contacts, t.contactId); return <div key={t.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 2px", borderBottom: "1px solid var(--line2)" }}>
          <div className="ti" style={{ width: 30, height: 30, borderRadius: 9, display: "grid", placeItems: "center", background: t.dueIn < 0 ? "var(--red-soft)" : "var(--amber-soft)", color: t.dueIn < 0 ? "var(--red)" : "var(--amber)" }}>{t.dueIn < 0 ? <AlertCircle size={15} /> : <Clock size={15} />}</div>
          <div style={{ flex: 1 }}><div style={{ fontWeight: 600, fontSize: 12.5 }}>{t.title}</div><div style={{ fontSize: 11, color: "var(--soft)" }}>{c ? c.name + " · " : ""}{dueLbl(t.dueIn)}</div></div></div>; })}
        {!todayTasks.length && <Empty icon={<CheckCircle2 size={26} />} title="אין משימות להיום" sub="כל הכבוד, סיימת!" />}</div>
    </div>
  </>;
}

/* ════════════════════ GEO MAP SCREEN ════════════════════ */
// Approximate outline of Israel — hand-tuned polygon coordinates in our projection space.
// Not survey-accurate, but reads as Israel and places the cities correctly inside.
const ISRAEL_PATH = "M 510 80 L 545 95 L 555 135 L 580 165 L 595 210 L 588 250 L 605 290 L 620 330 L 640 370 L 660 410 L 680 460 L 695 510 L 700 560 L 705 610 L 700 660 L 680 720 L 650 780 L 600 850 L 540 920 L 470 980 L 410 1030 L 380 1070 L 360 1090 L 380 1060 L 395 1010 L 405 960 L 400 900 L 380 850 L 360 810 L 340 760 L 330 710 L 340 660 L 360 610 L 380 560 L 395 510 L 410 460 L 425 410 L 440 360 L 445 310 L 440 270 L 445 230 L 460 190 L 478 150 L 495 110 Z";

function GeoMap({ db, currentUser, openProp, toast, onCreateDeal }) {
  const { contacts, props, deals } = db;
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQ, setSearchQ] = useState("");
  const [selectedCity, setSelectedCity] = useState(null);
  const [mode, setMode] = useState("pins"); // pins | heat
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(null);
  const [activePin, setActivePin] = useState(null);
  const svgRef = useRef(null);

  const W = 1000, H = 1100;

  // Filtered properties
  const filteredProps = useMemo(() => {
    return props.filter((p) => {
      if (statusFilter !== "all" && p.status !== statusFilter) return false;
      if (searchQ) {
        const q = searchQ.trim().toLowerCase();
        if (!(p.city.toLowerCase().includes(q) || p.addr.toLowerCase().includes(q) || (p.nbh || "").toLowerCase().includes(q))) return false;
      }
      if (selectedCity && p.city !== selectedCity) return false;
      return true;
    });
  }, [props, statusFilter, searchQ, selectedCity]);

  // Buyer demand per city (for heatmap blobs)
  const cityAgg = useMemo(() => aggregateByCity(props, contacts, deals), [props, contacts, deals]);
  const maxBuyers = Math.max(...cityAgg.map((c) => c.buyers), 1);

  // Aggregate filtered props by city (for cluster bubbles)
  const propsByCity = useMemo(() => {
    const m = {};
    filteredProps.forEach((p) => { (m[p.city] = m[p.city] || []).push(p); });
    return m;
  }, [filteredProps]);

  // Pan/zoom math
  const onWheel = (e) => { e.preventDefault(); const delta = -e.deltaY * 0.001; setZoom((z) => Math.max(0.6, Math.min(4, z + delta))); };
  const onMouseDown = (e) => { setDragging({ x: e.clientX, y: e.clientY, px: pan.x, py: pan.y }); setActivePin(null); };
  const onMouseMove = (e) => { if (!dragging) return; setPan({ x: dragging.px + (e.clientX - dragging.x) / zoom, y: dragging.py + (e.clientY - dragging.y) / zoom }); };
  const onMouseUp = () => setDragging(null);

  const insights = useMemo(() => geoInsights(cityAgg), [cityAgg]);
  const selectedAgg = selectedCity ? cityAgg.find((c) => c.name === selectedCity) : null;

  const handlePinClick = (p, evt) => {
    evt.stopPropagation();
    setActivePin(p);
  };

  // Searching for a city centers on it
  useEffect(() => {
    const q = searchQ.trim();
    if (!q) return;
    const match = Object.keys(CITY_COORDS).find((c) => c.includes(q));
    if (match && CITY_COORDS[match]) {
      const xy = cityXY(match, W, H);
      if (xy) {
        setSelectedCity(match);
        setZoom(2);
      }
    }
  }, [searchQ]);

  return <div className="geo">
    <div className="geo-map-wrap" onMouseUp={onMouseUp} onMouseLeave={onMouseUp}>
      <div className="geo-search-bar">
        <Search size={15} color="var(--faint)" />
        <input value={searchQ} onChange={(e) => setSearchQ(e.target.value)} placeholder="חיפוש עיר / רחוב / שכונה..." />
        {searchQ && <button onClick={() => { setSearchQ(""); setSelectedCity(null); }} style={{ border: "none", background: "none", cursor: "pointer", color: "var(--soft)" }}><X size={14} /></button>}
      </div>

      <div className="geo-toolbar">
        <button className="geo-tool-btn" onClick={() => setZoom((z) => Math.min(4, z + 0.4))} title="הגדל"><Plus size={16} /></button>
        <button className="geo-tool-btn" onClick={() => setZoom((z) => Math.max(0.6, z - 0.4))} title="הקטן"><span style={{ fontSize: 18, lineHeight: 1 }}>−</span></button>
        <button className="geo-tool-btn" onClick={() => { setZoom(1); setPan({ x: 0, y: 0 }); setSelectedCity(null); }} title="איפוס"><Maximize2 size={15} /></button>
      </div>

      <div className="geo-legend">
        <span><i style={{ background: "var(--green)" }} />זמין</span>
        <span><i style={{ background: "var(--blue)" }} />בלעדיות</span>
        <span><i style={{ background: "var(--amber)" }} />בעסקה</span>
        <span><i style={{ background: "var(--red)" }} />נמכר</span>
      </div>

      <div className="geo-mode">
        <button className={mode === "pins" ? "on" : ""} onClick={() => setMode("pins")}>נכסים</button>
        <button className={mode === "heat" ? "on" : ""} onClick={() => setMode("heat")}>ביקושים</button>
      </div>

      <svg ref={svgRef} className="geo-svg" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid meet"
        onWheel={onWheel} onMouseDown={onMouseDown} onMouseMove={onMouseMove}>
        <defs>
          <radialGradient id="demand-high" cx="50%" cy="50%"><stop offset="0%" stopColor="rgba(220,38,38,.55)" /><stop offset="100%" stopColor="rgba(220,38,38,0)" /></radialGradient>
          <radialGradient id="demand-mid" cx="50%" cy="50%"><stop offset="0%" stopColor="rgba(217,119,6,.45)" /><stop offset="100%" stopColor="rgba(217,119,6,0)" /></radialGradient>
          <radialGradient id="demand-low" cx="50%" cy="50%"><stop offset="0%" stopColor="rgba(234,179,8,.35)" /><stop offset="100%" stopColor="rgba(234,179,8,0)" /></radialGradient>
        </defs>

        <g transform={`translate(${pan.x * zoom}, ${pan.y * zoom}) scale(${zoom})`}>
          {/* Israel outline */}
          <path d={ISRAEL_PATH} fill="var(--surface2)" stroke="var(--line)" strokeWidth="2" opacity="0.85" />
          <path d={ISRAEL_PATH} fill="none" stroke="var(--brand)" strokeWidth="1" opacity="0.25" />

          {/* Demand heat layer */}
          {mode === "heat" && cityAgg.map((c) => {
            const xy = cityXY(c.name, W, H); if (!xy || c.buyers === 0) return null;
            const intensity = c.buyers / maxBuyers;
            const grad = intensity > 0.66 ? "url(#demand-high)" : intensity > 0.33 ? "url(#demand-mid)" : "url(#demand-low)";
            const r = 60 + intensity * 100;
            return <circle key={"h-" + c.name} cx={xy.x} cy={xy.y} r={r} fill={grad} pointerEvents="none" />;
          })}

          {/* City labels */}
          {Object.keys(CITY_COORDS).map((cityName) => {
            const xy = cityXY(cityName, W, H); if (!xy) return null;
            const has = propsByCity[cityName]?.length || 0;
            const isSel = selectedCity === cityName;
            return <g key={"l-" + cityName} style={{ cursor: "pointer" }} onClick={(e) => { e.stopPropagation(); setSelectedCity(isSel ? null : cityName); setActivePin(null); }}>
              <text x={xy.x} y={xy.y - 14} textAnchor="middle" fontSize={isSel ? 14 : 11} fontWeight={isSel ? 800 : 600}
                fill={isSel ? "var(--brand)" : "var(--ink)"} fontFamily="Heebo" style={{ pointerEvents: "none", paintOrder: "stroke", stroke: "var(--surface)", strokeWidth: 3 }}>
                {cityName}{has > 0 ? ` (${has})` : ""}
              </text>
            </g>;
          })}

          {/* Property pins */}
          {mode === "pins" && Object.entries(propsByCity).map(([cityName, list]) => {
            const xy = cityXY(cityName, W, H); if (!xy) return null;
            if (list.length === 1) {
              const p = list[0];
              return <g key={"p-" + p.id} style={{ cursor: "pointer" }} onClick={(e) => handlePinClick(p, e)}>
                <circle cx={xy.x} cy={xy.y} r="9" fill={STATUS_COLOR[p.status] || "var(--soft)"} stroke="var(--surface)" strokeWidth="2.5" />
              </g>;
            }
            // Cluster: small dots in a spiral around the city centroid + count badge
            return <g key={"c-" + cityName}>
              {list.slice(0, 12).map((p, i) => {
                const angle = (i / Math.min(list.length, 12)) * Math.PI * 2;
                const dist = 14 + Math.min(list.length, 12) * 1.2;
                const px = xy.x + Math.cos(angle) * dist;
                const py = xy.y + Math.sin(angle) * dist;
                return <circle key={p.id} cx={px} cy={py} r="6" fill={STATUS_COLOR[p.status] || "var(--soft)"} stroke="var(--surface)" strokeWidth="2"
                  style={{ cursor: "pointer" }} onClick={(e) => handlePinClick(p, e)} />;
              })}
              <circle cx={xy.x} cy={xy.y} r="16" fill="var(--brand)" stroke="var(--surface)" strokeWidth="3" style={{ cursor: "pointer" }} onClick={(e) => { e.stopPropagation(); setSelectedCity(cityName); }} />
              <text x={xy.x} y={xy.y + 4} textAnchor="middle" fontSize="12" fontWeight="800" fill="#fff" style={{ pointerEvents: "none" }}>{list.length}</text>
            </g>;
          })}
        </g>
      </svg>

      {/* Property quick card */}
      {activePin && <PropertyQuickCard p={activePin} db={db} onClose={() => setActivePin(null)} openProp={openProp} onCreateDeal={onCreateDeal} toast={toast} />}
    </div>

    {/* Side panel */}
    <div className="geo-side">
      {selectedAgg ? (
        <div className="card">
          <h3><MapPin size={15} color="var(--brand)" />{selectedAgg.name}<button onClick={() => setSelectedCity(null)} style={{ marginInlineStart: "auto", border: "none", background: "none", color: "var(--soft)", cursor: "pointer" }}><X size={15} /></button></h3>
          <div className="sub">סקירת אזור</div>
          <div className="row3" style={{ gridTemplateColumns: "1fr 1fr", gap: 8, margin: 0 }}>
            <div style={{ background: "var(--surface2)", padding: 10, borderRadius: 10 }}>
              <div style={{ fontSize: 11, color: "var(--soft)" }}>נכסים</div>
              <div style={{ fontSize: 20, fontWeight: 800, fontFamily: "Plus Jakarta Sans" }}>{selectedAgg.props}</div>
            </div>
            <div style={{ background: "var(--surface2)", padding: 10, borderRadius: 10 }}>
              <div style={{ fontSize: 11, color: "var(--soft)" }}>קונים פעילים</div>
              <div style={{ fontSize: 20, fontWeight: 800, fontFamily: "Plus Jakarta Sans" }}>{selectedAgg.buyers}</div>
            </div>
            <div style={{ background: "var(--surface2)", padding: 10, borderRadius: 10 }}>
              <div style={{ fontSize: 11, color: "var(--soft)" }}>עסקאות פעילות</div>
              <div style={{ fontSize: 20, fontWeight: 800, fontFamily: "Plus Jakarta Sans" }}>{selectedAgg.dealsActive}</div>
            </div>
            <div style={{ background: "var(--surface2)", padding: 10, borderRadius: 10 }}>
              <div style={{ fontSize: 11, color: "var(--soft)" }}>זמן סגירה ממוצע</div>
              <div style={{ fontSize: 20, fontWeight: 800, fontFamily: "Plus Jakarta Sans" }}>{selectedAgg.closeDaysN ? Math.round(selectedAgg.closeDaysSum / selectedAgg.closeDaysN) + "י" : "—"}</div>
            </div>
          </div>
          <div style={{ marginTop: 12, fontSize: 12, color: "var(--soft)" }}>פיזור סטטוסים:</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginTop: 6 }}>
            {Object.entries(selectedAgg.byStatus).map(([st, n]) => <span key={st} className="bdg b-gray"><i style={{ display: "inline-block", width: 7, height: 7, borderRadius: "50%", background: STATUS_COLOR[st], marginInlineEnd: 4 }} />{st} · {n}</span>)}
          </div>
        </div>
      ) : (
        <div className="card">
          <h3><Filter size={15} color="var(--brand)" />סינון מפה</h3>
          <div className="sub">{filteredProps.length} נכסים מוצגים</div>
          <div className="geo-filters">
            {["all", "זמין", "בלעדיות", "בעסקה", "נמכר"].map((s) => (
              <button key={s} className={"geo-chip" + (statusFilter === s ? " on" : "")} onClick={() => setStatusFilter(s)}>
                {s !== "all" && <i style={{ display: "inline-block", width: 7, height: 7, borderRadius: "50%", background: STATUS_COLOR[s] }} />}
                {s === "all" ? "הכל" : s}
              </button>
            ))}
          </div>
          <div style={{ fontSize: 11.5, color: "var(--faint)", marginTop: 4 }}>לחץ על עיר במפה לצפייה בנתוני אזור מפורטים.</div>
        </div>
      )}

      <div className="card">
        <h3><Lightbulb size={15} color="var(--amber)" />תובנות גיאוגרפיות</h3>
        <div className="sub">חישוב חי מהנתונים שבמערכת</div>
        {insights.length === 0 && <div style={{ fontSize: 12, color: "var(--soft)", padding: "12px 0" }}>אין כרגע תובנות בולטות. הוסף נכסים ולידים כדי לראות מגמות.</div>}
        {insights.map((ins, i) => (
          <div key={i} className="geo-insight">
            <div className="gi-ic" style={{ background: tSoft(ins.tone), color: tVar(ins.tone) }}>{ins.icon}</div>
            <div style={{ flex: 1 }}><strong>{ins.t}</strong>{ins.s}</div>
          </div>
        ))}
      </div>

      <div className="card">
        <h3><BarChart3 size={15} color="var(--brand)" />ביקוש מול היצע</h3>
        <div className="sub">5 הערים הפעילות ביותר</div>
        {cityAgg.slice(0, 5).map((c) => {
          const max = Math.max(cityAgg[0]?.props || 1, cityAgg[0]?.buyers || 1, 1);
          return <div key={c.name} style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 0", borderBottom: "1px solid var(--line2)", cursor: "pointer" }}
            onClick={() => setSelectedCity(c.name)}>
            <div style={{ width: 76, fontSize: 12.5, fontWeight: 600 }}>{c.name}</div>
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 3 }}>
              <div style={{ height: 6, background: "var(--line2)", borderRadius: 3, overflow: "hidden" }}><div style={{ height: "100%", width: `${(c.props / max) * 100}%`, background: "var(--brand)", borderRadius: 3 }} /></div>
              <div style={{ height: 6, background: "var(--line2)", borderRadius: 3, overflow: "hidden" }}><div style={{ height: "100%", width: `${(c.buyers / max) * 100}%`, background: "var(--amber)", borderRadius: 3 }} /></div>
            </div>
            <div style={{ width: 50, textAlign: "left", fontSize: 11, color: "var(--soft)" }}>{c.props}/{c.buyers}</div>
          </div>;
        })}
      </div>

      {currentUser?.role === "OFFICE_MANAGER" && (
        <div className="card">
          <h3><Shield size={15} color="var(--red)" />בקרת אדמין</h3>
          <div className="sub">תמונת מצב למנהל המשרד</div>
          {(() => {
            const noActivity = cityAgg.filter((c) => c.deals === 0 && c.props > 0);
            const highPotential = cityAgg.filter((c) => c.buyers >= 3 && c.props === 0);
            return <>
              <div style={{ fontSize: 12.5, marginBottom: 8 }}><strong>אזורים ללא פעילות:</strong> <span style={{ color: "var(--soft)" }}>{noActivity.length ? noActivity.map((c) => c.name).join(" · ") : "אין"}</span></div>
              <div style={{ fontSize: 12.5 }}><strong>פוטנציאל גיוס נכסים:</strong> <span style={{ color: "var(--soft)" }}>{highPotential.length ? highPotential.map((c) => c.name).join(" · ") : "אין"}</span></div>
            </>;
          })()}
        </div>
      )}
    </div>
  </div>;
}

function PropertyQuickCard({ p, db, onClose, openProp, onCreateDeal, toast }) {
  const matches = db.contacts.filter((c) => c.kind === "קונה").reduce((n, c) => n + (matchScore(c, p) && matchScore(c, p).score >= 60 ? 1 : 0), 0);
  const agent = db.contacts.find((c) => c.id === p.agentId) || null;
  return <div className="geo-pin-card" style={{ top: 60, insetInlineEnd: 60 }}>
    <button onClick={onClose} style={{ position: "absolute", top: 8, insetInlineStart: 8, border: "none", background: "rgba(15,23,42,.45)", borderRadius: 8, width: 26, height: 26, color: "#fff", cursor: "pointer", display: "grid", placeItems: "center" }}><X size={14} /></button>
    <img className="gp-img" src={`https://picsum.photos/seed/nx${p.photoSeed}/520/280`} alt="" />
    <div className="gp-addr">{p.addr}</div>
    <div className="gp-meta">{p.nbh ? p.nbh + ", " : ""}{p.city}</div>
    <div className="gp-price">{money(p.price)}</div>
    <div className="gp-row"><span>{p.rooms} חד׳</span> · <span>{p.size} מ״ר</span> · <span>קומה {p.floor}</span></div>
    <div style={{ display: "flex", gap: 6, marginBottom: 10, fontSize: 11, color: "var(--soft)" }}>
      <span className="bdg b-gray"><i style={{ display: "inline-block", width: 7, height: 7, borderRadius: "50%", background: STATUS_COLOR[p.status], marginInlineEnd: 4 }} />{p.status}</span>
      {matches > 0 && <span className="bdg b-amber"><Flame size={10} />{matches} התאמות</span>}
    </div>
    <div className="gp-actions">
      <button className="btn sm" onClick={() => openProp(p.id)}><Eye size={12} />פתח</button>
      <button className="btn gh sm" onClick={() => { toast && toast("הנכס שותף בוואטסאפ"); }}><Send size={12} />שתף</button>
    </div>
  </div>;
}

/* ════════════════════ LEADS ════════════════════ */
function Leads({ db, openContact, setLeadStatus, toast, logActivity }) {
  const { contacts, deals, acts } = db;
  const [mode, setMode] = useState("table");
  const [q, setQ] = useState(""); const [tier, setTier] = useState("הכל"); const [sort, setSort] = useState("score");
  const [over, setOver] = useState(null);
  const buyers = contacts.filter((c) => c.kind === "קונה");
  const enriched = buyers.map((c) => ({ ...c, ls: leadScore(c, acts, deals) }));
  let rows = enriched.filter((c) => (tier === "הכל" || c.ls.tier === tier) && (!q || c.name.includes(q) || c.phone.includes(q) || (c.areas || []).some((a) => a.includes(q))));
  rows = [...rows].sort((a, b) => sort === "score" ? b.ls.score - a.ls.score : sort === "budget" ? b.budget - a.budget : a.lastContactAgo - b.lastContactAgo);

  return <>
    <div className="chips">
      <div className="srch" style={{ width: 230 }}><Search size={15} /><input placeholder="חיפוש לפי שם / טלפון / אזור" value={q} onChange={(e) => setQ(e.target.value)} /></div>
      {["הכל", "חם", "בינוני", "קר"].map((t) => <button key={t} className={"chip" + (tier === t ? " on" : "")} onClick={() => setTier(t)}>{t === "הכל" ? "כל הדירוגים" : t}</button>)}
      <div style={{ marginInlineStart: "auto", display: "flex", gap: 10, alignItems: "center" }}>
        <Dropdown label="מיון" value={sort} onChange={setSort} options={[{ v: "score", l: "דירוג ליד" }, { v: "budget", l: "תקציב" }, { v: "recent", l: "פעילות אחרונה" }]} />
        <div className="seg"><button className={mode === "table" ? "on" : ""} onClick={() => setMode("table")}><List size={14} />טבלה</button><button className={mode === "kanban" ? "on" : ""} onClick={() => setMode("kanban")}><LayoutGrid size={14} />Kanban</button></div>
      </div>
    </div>

    {rows.length === 0 ? <div className="card"><Empty icon={<Inbox size={28} />} title="לא נמצאו לידים" sub="נסה לשנות את החיפוש או הסינון" /></div>
    : mode === "table" ? <div className="card" style={{ padding: 0 }}><table className="tbl">
      <thead><tr><th>ליד</th><th>דירוג</th><th>סטטוס</th><th>תקציב</th><th>אזורים</th><th>מקור</th><th>קשר אחרון</th><th></th></tr></thead>
      <tbody>{rows.map((c) => <tr key={c.id} onClick={() => openContact(c.id)}>
        <td><div style={{ display: "flex", alignItems: "center", gap: 11 }}><Avatar id={c.id} name={c.name} /><div><div style={{ fontWeight: 600 }}>{c.name}</div><div style={{ fontSize: 11.5, color: "var(--soft)" }}>{c.phone}</div></div></div></td>
        <td><span className={"bdg b-" + statusTone(c.ls.tier)}>{c.ls.tier === "חם" ? <Flame size={11} /> : c.ls.tier === "קר" ? <Snowflake size={11} /> : <Thermometer size={11} />}{c.ls.score}</span></td>
        <td><span className={"bdg b-" + statusTone(c.status)}>{c.status}</span></td>
        <td style={{ fontWeight: 600 }}>{money(c.budget)}</td>
        <td style={{ color: "var(--soft)", fontSize: 12.5 }}>{c.areas.join(", ")}</td>
        <td style={{ color: "var(--soft)" }}>{c.source}</td>
        <td style={{ color: c.lastContactAgo >= 8 ? "var(--red)" : "var(--soft)" }}>{agoLbl(c.lastContactAgo)}</td>
        <td><div className="qa"><button title="התקשר" onClick={(e) => { e.stopPropagation(); logActivity(c.id, "שיחה", "שיחה יזומה"); toast("שיחה תועדה עבור " + c.name); }}><Phone size={14} /></button>
          <button title="וואטסאפ" onClick={(e) => { e.stopPropagation(); logActivity(c.id, "וואטסאפ", "הודעת וואטסאפ נשלחה"); toast("וואטסאפ תועד"); }}><MessageCircle size={14} /></button></div></td>
      </tr>)}</tbody></table></div>
    : <div className="pipe">{LEAD_STATUS.map((st) => { const items = rows.filter((c) => c.status === st); return <div key={st} className={"col" + (over === st ? " over" : "")}
        onDragOver={(e) => { e.preventDefault(); setOver(st); }} onDragLeave={() => setOver((o) => o === st ? null : o)} onDrop={(e) => { setLeadStatus(Number(e.dataTransfer.getData("id")), st); setOver(null); toast("הליד הועבר ל" + st); }}>
        <div className="ch"><span className="nm"><span className="ic" style={{ background: tVar(statusTone(st)) }} />{st}</span><span className="vl">{items.length}</span></div>
        {items.map((c) => <div key={c.id} className="dcard" draggable onDragStart={(e) => e.dataTransfer.setData("id", c.id)} onClick={() => openContact(c.id)}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}><Avatar id={c.id} name={c.name} size={26} /><span style={{ fontWeight: 700, fontSize: 13 }}>{c.name}</span></div>
          <div style={{ fontSize: 11.5, color: "var(--soft)", marginTop: 7 }}>{money(c.budget)} · {c.minRooms}+ חד׳</div>
          <div className="ft"><span className={"bdg b-" + statusTone(c.ls.tier)}>{c.ls.tier} {c.ls.score}</span><span style={{ fontSize: 11, color: c.lastContactAgo >= 8 ? "var(--red)" : "var(--faint)" }}>{agoLbl(c.lastContactAgo)}</span></div>
        </div>)}
      </div>; })}</div>}
  </>;
}

/* ════════════════════ CONTACT DETAIL ════════════════════ */
function ContactDetail({ id, db, back, openDeal, logActivity, toast }) {
  const { contacts, deals, tasks, acts, props } = db;
  const c = byId(contacts, id);
  if (!c) return null;
  const myActs = acts.filter((a) => a.contactId === id).sort((a, b) => a.daysAgo - b.daysAgo);
  const cDeals = deals.filter((d) => d.buyerId === id);
  const cProps = props.filter((p) => p.ownerId === id);
  const cTasks = tasks.filter((t) => t.contactId === id && !t.done);
  const ls = c.kind === "קונה" ? leadScore(c, acts, deals) : null;
  const ICONS = { ליד: [UserPlus, "blue"], שיחה: [Phone, "green"], וואטסאפ: [MessageCircle, "green"], פגישה: [Calendar, "indigo"], צפייה: [Home, "brand"], אימייל: [Mail, "blue"], שלב: [GitBranch, "orange"], הערה: [StickyNote, "amber"] };
  const act = (type, text, msg) => { logActivity(c.id, type, text); toast(msg); };
  return <>
    <button className="btn gh" onClick={back} style={{ marginBottom: 15 }}><ArrowLeft size={15} />חזרה</button>
    <div className="row2" style={{ gridTemplateColumns: "1fr 1.5fr" }}>
      <div>
        <div className="card" style={{ marginBottom: 15 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 15 }}>
            <Avatar id={c.id} name={c.name} size={54} font={20} />
            <div><div style={{ fontFamily: "Plus Jakarta Sans,Heebo", fontWeight: 700, fontSize: 20 }}>{c.name}</div>
              <div style={{ display: "flex", gap: 6, marginTop: 6, flexWrap: "wrap" }}><span className={"bdg b-" + statusTone(c.kind)}>{c.kind}</span>
                {ls && <span className={"bdg b-" + statusTone(ls.tier)}>{ls.tier === "חם" ? <Flame size={11} /> : ls.tier === "קר" ? <Snowflake size={11} /> : <Thermometer size={11} />}דירוג {ls.score}</span>}
                <span className={"bdg b-" + statusTone(c.status)}>{c.status}</span></div></div>
          </div>
          <div className="kv"><span className="k">טלפון</span><span className="v">{c.phone}</span></div>
          <div className="kv"><span className="k">אימייל</span><span className="v">{c.email}</span></div>
          <div className="kv"><span className="k">מקור</span><span className="v">{c.source}</span></div>
          <div className="kv"><span className="k">סוכן מטפל</span><span className="v">{byId(AGENTS, c.agentId).name}</span></div>
          {c.budget && <><div className="kv"><span className="k">תקציב</span><span className="v">{money(c.budget)}</span></div>
            <div className="kv"><span className="k">דרישות</span><span className="v">{c.minRooms}+ חד׳ · {c.minSize}+ מ״ר</span></div>
            <div className="kv"><span className="k">אזורים</span><span className="v">{c.areas.join(", ")}</span></div>
            <div className="kv"><span className="k">חובה</span><span className="v">{[c.needElevator && "מעלית", c.needParking && "חניה", c.needBalcony && "מרפסת", c.needMamad && "ממ״ד"].filter(Boolean).join(" · ") || "—"}</span></div></>}
          <div style={{ display: "flex", gap: 7, marginTop: 14, flexWrap: "wrap" }}>
            <button className="btn sm" onClick={() => act("שיחה", "שיחה יזומה — עדכון סטטוס", "שיחה תועדה")}><Phone size={13} />תיעוד שיחה</button>
            <button className="btn gh sm" onClick={() => act("פגישה", "נקבעה פגישה עם הלקוח", "פגישה נוספה")}><Calendar size={13} />פגישה</button>
            <button className="btn gh sm" onClick={() => act("הערה", "הערה חדשה נוספה", "הערה נשמרה")}><StickyNote size={13} />הערה</button>
          </div>
        </div>
        {cDeals.length > 0 && <div className="card" style={{ marginBottom: 15 }}><h3 style={{ fontSize: 14 }}><KanbanSquare size={14} color="var(--brand)" />עסקאות מקושרות</h3>
          <div style={{ marginTop: 11 }}>{cDeals.map((d) => { const p = byId(props, d.propId); return <div key={d.id} onClick={() => openDeal(d.id)} style={{ display: "flex", alignItems: "center", gap: 9, padding: "9px 0", borderTop: "1px solid var(--line2)", cursor: "pointer" }}>
            <div style={{ flex: 1 }}><div style={{ fontWeight: 600, fontSize: 12.5 }}>{p.addr}</div><div style={{ fontSize: 11.5, color: "var(--soft)" }}>{money(dealValue(d))}</div></div><span className={"bdg b-" + stageObj(d.stage).color}>{stageObj(d.stage).label}</span></div>; })}</div></div>}
        {cProps.length > 0 && <div className="card" style={{ marginBottom: 15 }}><h3 style={{ fontSize: 14 }}><Building2 size={14} color="var(--brand)" />נכסים בבעלות</h3>
          <div style={{ marginTop: 11 }}>{cProps.map((p) => <div key={p.id} style={{ display: "flex", alignItems: "center", gap: 9, padding: "9px 0", borderTop: "1px solid var(--line2)" }}>
            <div style={{ flex: 1 }}><div style={{ fontWeight: 600, fontSize: 12.5 }}>{p.addr}, {p.city}</div><div style={{ fontSize: 11.5, color: "var(--soft)" }}>{money(p.price)}</div></div><span className={"bdg b-" + statusTone(p.status)}>{p.status}</span></div>)}</div></div>}
        {cTasks.length > 0 && <div className="card"><h3 style={{ fontSize: 14 }}><CheckSquare size={14} color="var(--brand)" />משימות פתוחות</h3>
          <div style={{ marginTop: 10 }}>{cTasks.map((t) => <div key={t.id} style={{ display: "flex", alignItems: "center", gap: 8, padding: "7px 0", fontSize: 12.5 }}><CircleDot size={13} color={t.dueIn < 0 ? "var(--red)" : "var(--soft)"} /><span style={{ flex: 1 }}>{t.title}</span>{t.auto && <span className="bdg b-indigo"><Zap size={10} />אוטו׳</span>}</div>)}</div></div>}
      </div>

      <div className="card"><h3><GitBranch size={16} color="var(--brand)" />ציר זמן הלקוח</h3><div className="sub">{myActs.length} אינטראקציות מתועדות</div>
        <div className="tl">{myActs.map((a) => { const [Ic, tone] = ICONS[a.type] || [StickyNote, "amber"]; return <div className="tlrow" key={a.id}>
          <div className="dot" style={{ background: tSoft(tone), color: tVar(tone) }}><Ic size={14} /></div>
          <div><div className="ti">{a.type === "שלב" ? "עדכון שלב" : a.type}</div><div className="tx">{a.text}</div><div className="tm">{agoLbl(a.daysAgo)}</div></div></div>; })}
          {!myActs.length && <Empty icon={<GitBranch size={26} />} title="אין פעילות עדיין" sub="תעד שיחה או פגישה כדי להתחיל" />}</div></div>
    </div>
  </>;
}

/* ════════════════════ PROPERTIES ════════════════════ */
function Properties({ db, openProp, onFb }) {
  const { props, contacts } = db;
  const [q, setQ] = useState(""); const [st, setSt] = useState("הכל"); const [mode, setMode] = useState("grid");
  const buyers = contacts.filter((c) => c.kind === "קונה");
  let rows = props.filter((p) => (st === "הכל" || p.status === st) && (!q || p.addr.includes(q) || p.city.includes(q) || p.nbh.includes(q)));
  const mcount = (p) => buyers.filter((b) => { const m = matchScore(b, p); return m && m.score >= 60; }).length;
  return <>
    <div className="chips">
      <div className="srch" style={{ width: 230 }}><Search size={15} /><input placeholder="חיפוש לפי כתובת / עיר / שכונה" value={q} onChange={(e) => setQ(e.target.value)} /></div>
      {["הכל", "זמין", "בלעדיות", "בעסקה", "נמכר"].map((s) => <button key={s} className={"chip" + (st === s ? " on" : "")} onClick={() => setSt(s)}>{s === "הכל" ? "כל הנכסים" : s}</button>)}
      <div className="seg" style={{ marginInlineStart: "auto" }}><button className={mode === "grid" ? "on" : ""} onClick={() => setMode("grid")}><LayoutGrid size={14} />כרטיסים</button><button className={mode === "table" ? "on" : ""} onClick={() => setMode("table")}><List size={14} />טבלה</button></div>
    </div>
    {rows.length === 0 ? <div className="card"><Empty icon={<Building2 size={28} />} title="לא נמצאו נכסים" sub="נסה סינון אחר" /></div>
    : mode === "grid" ? <div className="props">{rows.map((p) => <div className="prop" key={p.id} onClick={() => openProp(p.id)}>
        <Photo seed={p.photoSeed}><span className={"bdg b-" + statusTone(p.status) + " st"} style={{ background: "var(--surface)" }}>{p.status}</span><span className="pr">{money(p.price)}</span><span className="cnt"><ImageIcon size={11} />{int(6, 14)}</span>
          <button className="fbbtn" title="פרסם בפייסבוק" onClick={(e) => { e.stopPropagation(); onFb(p); }}><Facebook size={15} /></button></Photo>
        <div className="bd"><div className="ad">{p.addr}</div><div className="ct"><MapPin size={12} />{p.city} · {p.nbh}</div>
          <div className="sp"><span><b>{p.rooms}</b> חד׳</span><span><b>{p.size}</b> מ״ר</span><span>קומה <b>{p.floor}</b></span>{p.elevator && <span>מעלית</span>}{p.parking && <span>חניה</span>}</div>
          <div className="mt"><Target size={13} />{mcount(p)} קונים מתאימים{p.exclusive && " · בלעדיות"}</div></div></div>)}</div>
    : <div className="card" style={{ padding: 0 }}><table className="tbl">
      <thead><tr><th>נכס</th><th>סוג</th><th>חדרים</th><th>שטח</th><th>מחיר</th><th>סטטוס</th><th>התאמות</th></tr></thead>
      <tbody>{rows.map((p) => <tr key={p.id} onClick={() => openProp(p.id)}>
        <td><div style={{ fontWeight: 600 }}>{p.addr}</div><div style={{ fontSize: 11.5, color: "var(--soft)" }}>{p.city} · {p.nbh}</div></td>
        <td style={{ color: "var(--soft)" }}>{p.type}</td><td>{p.rooms}</td><td>{p.size} מ״ר</td><td style={{ fontWeight: 700 }}>{money(p.price)}</td>
        <td><span className={"bdg b-" + statusTone(p.status)}>{p.status}</span></td><td><span className="bdg b-brand"><Target size={11} />{mcount(p)}</span></td></tr>)}</tbody></table></div>}
  </>;
}

function PropertyDetail({ id, db, back, openContact, toast }) {
  const { props, contacts, deals, viewings } = db;
  const p = byId(props, id);
  const [gi, setGi] = useState(0);
  const [mdl, setMdl] = useState(null);
  if (!p) return null;
  const owner = byId(contacts, p.ownerId);
  const buyers = contacts.filter((c) => c.kind === "קונה");
  const matched = buyers.map((b) => ({ b, m: matchScore(b, p) })).filter((x) => x.m && x.m.score >= 50).sort((a, b) => b.m.score - a.m.score).slice(0, 6);
  const deal = deals.find((d) => d.propId === id);
  const vh = viewings[id] || [];
  const ATTRS = [[p.elevator, <ArrowUpFromLine size={15} />, "מעלית"], [p.parking, <Car size={15} />, "חניה"], [p.balcony, <Trees size={15} />, "מרפסת"], [p.mamad, <Shield size={15} />, "ממ״ד"]];
  const docs = ["נסח טאבו.pdf", "תשריט הדירה.pdf", "הסכם בלעדיות.pdf", "צילומי הנכס.zip"];
  return <>
    <div style={{ display: "flex", gap: 8, marginBottom: 15, flexWrap: "wrap", alignItems: "center" }}>
      <button className="btn gh" onClick={back}><ArrowLeft size={15} />חזרה</button>
      <div style={{ marginInlineStart: "auto", display: "flex", gap: 8, flexWrap: "wrap" }}>
        <button className="btn" style={{ background: "#1877F2", boxShadow: "0 4px 12px rgba(24,119,242,.3)" }} onClick={() => setMdl("fb")}><Facebook size={14} />פרסם בפייסבוק</button>
        <button className="btn gh" onClick={() => setMdl("compose")}><Sparkles size={14} />שתף ושווק</button>
        <button className="btn gh" onClick={() => setMdl("invest")}><Calculator size={14} />מחשבון השקעה</button>
        <button className="btn gh" onClick={() => setMdl("owner")}><ClipboardList size={14} />עדכון לבעלים</button>
        <button className="btn gh" onClick={() => setMdl("portal")}><Shield size={14} />פורטל בעלים</button>
      </div>
    </div>
    {mdl === "fb" && <FacebookPublish p={p} db={db} onClose={() => setMdl(null)} toast={toast} />}
    {mdl === "compose" && <Compose p={p} onClose={() => setMdl(null)} toast={toast} />}
    {mdl === "invest" && <Investor p={p} onClose={() => setMdl(null)} />}
    {mdl === "owner" && <OwnerUpdate p={p} db={db} onClose={() => setMdl(null)} toast={toast} />}
    {mdl === "portal" && <OwnerPortal p={p} db={db} onClose={() => setMdl(null)} toast={toast} />}
    <div className="row2" style={{ gridTemplateColumns: "1.2fr 1fr" }}>
      <div>
        <div className="card" style={{ padding: 0, overflow: "hidden", marginBottom: 15 }}>
          <Photo seed={p.photoSeed + gi} h={260}><span className={"bdg b-" + statusTone(p.status) + " st"} style={{ background: "var(--surface)" }}>{p.status}</span></Photo>
          <div style={{ padding: 17 }}>
            <div className="gallery">{[0, 1, 2, 3].map((i) => <div key={i} className={"g" + (gi === i ? " sel" : "")} onClick={() => setGi(i)}><img src={`https://picsum.photos/seed/nx${p.photoSeed + i}/160/120`} alt="" /></div>)}</div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginTop: 17 }}>
              <div><div style={{ fontFamily: "Plus Jakarta Sans,Heebo", fontWeight: 700, fontSize: 22 }}>{p.addr}</div><div style={{ color: "var(--soft)", fontSize: 13, marginTop: 2 }}><MapPin size={12} style={{ verticalAlign: -1 }} /> {p.city} · {p.nbh}</div></div>
              <div style={{ textAlign: "left" }}><div style={{ fontSize: 25, fontWeight: 800, fontFamily: "Plus Jakarta Sans,Heebo" }}>{money(p.price)}</div><div style={{ fontSize: 12, color: "var(--soft)" }}>{money(Math.round(p.price / p.size))} למ״ר</div></div>
            </div>
            <div className="f3" style={{ marginTop: 17 }}><div className="attr"><Maximize2 size={15} />{p.size} מ״ר</div><div className="attr"><Home size={15} />{p.rooms} חד׳</div><div className="attr"><ArrowUpFromLine size={15} />קומה {p.floor}/{p.floors}</div></div>
            <div className="f2" style={{ marginTop: 10 }}>{ATTRS.map(([has, ic, lbl], i) => <div key={i} className={"attr" + (has ? "" : " no")}>{ic}{lbl}{has ? "" : " — אין"}</div>)}</div>
            <div className="f3" style={{ marginTop: 10 }}><div className="attr"><Calendar size={15} />נבנה {p.yearBuilt}</div><div className="attr"><Sparkles size={15} />{p.cond}</div><div className="attr"><Eye size={15} />{p.views} צפיות</div></div>
          </div>
        </div>
        <div className="card" style={{ marginBottom: 15 }}><h3 style={{ fontSize: 14 }}><Eye size={14} color="var(--brand)" />היסטוריית צפיות</h3>
          <div style={{ marginTop: 11 }}>{vh.length ? vh.map((v, i) => <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 0", borderTop: i ? "1px solid var(--line2)" : "none", fontSize: 12.5 }}>
            <Calendar size={14} color="var(--soft)" /><span style={{ flex: 1, fontWeight: 600 }}>{v.name}</span><span style={{ color: "var(--soft)" }}>{v.feedback}</span><span style={{ color: "var(--faint)", fontSize: 11 }}>{agoLbl(v.daysAgo)}</span></div>)
            : <Empty icon={<Eye size={24} />} title="טרם בוצעו צפיות" sub="" />}</div></div>
        {deal && deal.offers.length > 0 && <div className="card"><h3 style={{ fontSize: 14 }}><Handshake size={14} color="var(--brand)" />משא ומתן</h3>
          <div style={{ display: "flex", gap: 14, margin: "13px 0" }}>
            <div style={{ flex: 1 }}><div style={{ fontSize: 11.5, color: "var(--soft)" }}>מחיר מבוקש</div><div style={{ fontWeight: 800, fontSize: 17 }}>{money(deal.asking)}</div></div>
            <div style={{ flex: 1 }}><div style={{ fontSize: 11.5, color: "var(--soft)" }}>הצעה נוכחית</div><div style={{ fontWeight: 800, fontSize: 17, color: "var(--brand)" }}>{money(deal.offer)}</div></div>
            <div style={{ flex: 1 }}><div style={{ fontSize: 11.5, color: "var(--soft)" }}>פער</div><div style={{ fontWeight: 800, fontSize: 17, color: "var(--amber)" }}>{Math.round((1 - deal.offer / deal.asking) * 100)}%</div></div></div>
          {deal.offers.map((o, i) => <div key={i} style={{ display: "flex", alignItems: "center", gap: 9, padding: "8px 0", borderTop: "1px solid var(--line2)", fontSize: 12.5 }}>
            <span className={"bdg b-" + (o.by === "buyer" ? "blue" : "amber")}>{o.by === "buyer" ? "קונה" : "מוכר"}</span><span style={{ flex: 1, fontWeight: 600 }}>{money(o.amount)}</span><span style={{ color: "var(--faint)", fontSize: 11 }}>{agoLbl(o.daysAgo)}</span></div>)}</div>}
      </div>
      <div>
        <div className="card" style={{ marginBottom: 15 }}><h3 style={{ fontSize: 14 }}><KeyRound size={14} color="var(--brand)" />בעלים ובלעדיות</h3>
          <div onClick={() => openContact(owner.id)} style={{ display: "flex", alignItems: "center", gap: 11, padding: "11px 0", cursor: "pointer" }}>
            <Avatar id={owner.id} name={owner.name} size={40} /><div style={{ flex: 1 }}><div style={{ fontWeight: 600 }}>{owner.name}</div><div style={{ fontSize: 12, color: "var(--soft)" }}>{owner.phone}</div></div><ChevronLeft size={16} color="var(--faint)" /></div>
          <div className="kv"><span className="k">סטטוס בלעדיות</span><span className="v">{p.exclusive ? (p.exclEndDays < 0 ? "פג תוקף" : "בתוקף") : "ללא בלעדיות"}</span></div>
          {p.exclusive && <div className="kv"><span className="k">תוקף</span><span className="v" style={{ color: p.exclEndDays <= 14 ? "var(--red)" : "var(--ink)" }}>{p.exclEndDays < 0 ? "פג לפני " + -p.exclEndDays + " ימים" : "בעוד " + p.exclEndDays + " ימים"}</span></div>}
          <div className="kv"><span className="k">סוכן אחראי</span><span className="v">{byId(AGENTS, p.agentId).name}</span></div>
          <div className="kv"><span className="k">פורסם</span><span className="v">{agoLbl(p.listedAgo)}</span></div></div>
        <div className="card" style={{ marginBottom: 15 }}><h3 style={{ fontSize: 14 }}><Target size={14} color="var(--brand)" />קונים פוטנציאליים</h3><div className="sub">לפי מנוע ההתאמה</div>
          {matched.map((x) => <div key={x.b.id} onClick={() => openContact(x.b.id)} style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 0", borderTop: "1px solid var(--line2)", cursor: "pointer" }}>
            <Avatar id={x.b.id} name={x.b.name} size={30} /><div style={{ flex: 1 }}><div style={{ fontWeight: 600, fontSize: 12.5 }}>{x.b.name}</div><div style={{ fontSize: 11, color: "var(--soft)" }}>{money(x.b.budget)}</div></div>
            <span className={"bdg b-" + (x.m.score >= 80 ? "green" : x.m.score >= 60 ? "amber" : "gray")}>{x.m.score}</span></div>)}
          {!matched.length && <Empty icon={<Target size={24} />} title="אין קונים מתאימים" sub="" />}</div>
        <div className="card"><h3 style={{ fontSize: 14 }}><FileText size={14} color="var(--brand)" />מסמכים וקבצים</h3>
          <div style={{ marginTop: 12 }}>{docs.map((d, i) => <div className="doc" key={i}><div className="di"><FileText size={15} /></div><div style={{ flex: 1 }}><div style={{ fontWeight: 600 }}>{d}</div><div style={{ fontSize: 11, color: "var(--faint)" }}>{int(120, 4800)} KB · {agoLbl(int(2, 40))}</div></div><Download size={16} color="var(--soft)" style={{ cursor: "pointer" }} /></div>)}</div></div>
      </div>
    </div>
  </>;
}

/* ════════════════════ MATCHING ════════════════════ */
function Matching({ db, openProp }) {
  const { contacts, props } = db;
  const buyers = contacts.filter((c) => c.kind === "קונה" && c.budget);
  const [sel, setSel] = useState(buyers[0]?.id);
  const buyer = byId(contacts, sel);
  const ranked = useMemo(() => buyer ? props.map((p) => ({ p, ...matchScore(buyer, p) })).filter((x) => x.score > 0 && x.p.status !== "נמכר").sort((a, b) => b.score - a.score) : [], [buyer, props]);
  return <>
    <div className="card mhero"><h3 style={{ color: "#fff", position: "relative" }}><Target size={18} />מנוע התאמה חכם</h3>
      <div style={{ fontSize: 12.5, color: "rgba(255,255,255,.9)", marginTop: 5, position: "relative" }}>ציון 0–100 לכל נכס לפי 8 מאפיינים: אזור, תקציב, חדרים, שטח, מעלית, חניה, מרפסת וממ״ד — עם פירוק מלא של כל מה שתורם או גורע מהציון.</div></div>
    <div className="chips" style={{ marginBottom: 18 }}>{buyers.slice(0, 12).map((b) => <button key={b.id} className={"chip" + (sel === b.id ? " on" : "")} onClick={() => setSel(b.id)}>
      <Avatar id={b.id} name={b.name} size={22} font={10} /><span>{b.name}</span><span className="cr">{short(b.budget)} · {b.minRooms}+</span></button>)}</div>
    {ranked.map(({ p, score, reasons }) => <div className="mrow" key={p.id}>
      <Ring pct={score} size={64} />
      <div style={{ width: 160, cursor: "pointer" }} onClick={() => openProp(p.id)}><div style={{ fontWeight: 700, fontSize: 14 }}>{p.addr}</div>
        <div style={{ fontSize: 12, color: "var(--soft)", marginTop: 2 }}>{p.city} · {p.rooms} חד׳ · {p.size} מ״ר</div>
        <div style={{ fontWeight: 800, fontSize: 15, marginTop: 5 }}>{money(p.price)}</div></div>
      <div className="reasons">{reasons.map((r, i) => { const tone = r.t === "pos" ? "green" : r.t === "mid" ? "amber" : "red"; const Ic = r.t === "pos" ? CheckCircle2 : r.t === "mid" ? AlertCircle : X;
        return <div className="reason" key={i}><span className="ri" style={{ background: tSoft(tone), color: tVar(tone) }}><Ic size={11} /></span><b>{r.b}</b><span className="dt">{r.d}</span></div>; })}</div>
    </div>)}
  </>;
}

/* ════════════════════ DEALS ════════════════════ */
function Deals({ db, setDeals, openDeal, toast }) {
  const { deals } = db; const [over, setOver] = useState(null);
  const move = (id, stage) => { setDeals(deals.map((d) => d.id === Number(id) ? { ...d, stage, close: stage === "נסגר" ? (d.close || d.offer || d.asking) : null } : d)); toast("העסקה עודכנה ל" + stageObj(stage).label); };
  return <div className="pipe">{DEAL_STAGES.map((st) => { const ds = deals.filter((d) => d.stage === st.key); const total = ds.reduce((s, d) => s + dealValue(d), 0);
    return <div key={st.key} className={"col" + (over === st.key ? " over" : "")} onDragOver={(e) => { e.preventDefault(); setOver(st.key); }} onDragLeave={() => setOver((o) => o === st.key ? null : o)} onDrop={(e) => { move(e.dataTransfer.getData("id"), st.key); setOver(null); }}>
      <div className="ch"><span className="nm"><span className="ic" style={{ background: tVar(st.color) }} />{st.label}</span><span className="vl">{ds.length} · {short(total)}</span></div>
      {ds.map((d) => { const b = byId(DB_CONTACTS, d.buyerId), p = byId(DB_PROPS, d.propId);
        return <div key={d.id} className="dcard" draggable onDragStart={(e) => e.dataTransfer.setData("id", d.id)} onClick={() => openDeal(d.id)}>
          <div className="pa"><Home size={12} color="var(--soft)" />{p.addr}</div>
          <div className="by"><Avatar id={b.id} name={b.name} size={18} font={9} />{b.name}</div>
          <div className="vl">{money(dealValue(d))}</div>
          <div className="ft"><span style={{ fontSize: 11, color: "var(--soft)", fontWeight: 600 }}>עמלה {short(commission(d))}</span><div className="prob"><i style={{ width: st.prob + "%", background: tVar(st.color) }} /></div></div>
        </div>; })}
      {!ds.length && <div style={{ textAlign: "center", padding: "18px 0", fontSize: 11.5, color: "var(--faint)" }}>גרור לכאן</div>}
    </div>; })}</div>;
}

const MORT_FLOW = ["לא התחיל", "בתהליך", "אישור עקרוני", "אושר סופית"];
const DOC_FLOW = ["טיוטה", "נשלח", "נפתח", "נחתם"];
const docTone = (s) => ({ "טיוטה": "gray", "נשלח": "blue", "נפתח": "amber", "נחתם": "green" }[s] || "gray");
function DealDetail({ id, db, setDeals, close, openContact, openPro, toast }) {
  const { deals, props, contacts, acts, tasks } = db;
  const [tab, setTab] = useState("overview");
  const d = byId(deals, id);
  if (!d) return null;
  const b = byId(contacts, d.buyerId), p = byId(props, d.propId), owner = byId(contacts, p.ownerId);
  const si = DEAL_STAGES.findIndex((s) => s.key === d.stage);
  const dActs = acts.filter((a) => a.dealId === id).sort((a, b) => a.daysAgo - b.daysAgo);
  const dTasks = tasks.filter((t) => t.dealId === id && !t.done);
  const tx = d.tx || { mortgage: { status: "לא התחיל", offers: [], missing: [] }, appraisal: { status: "לא הוזמן" }, legal: { contractStatus: "טיוטה" } };
  const docs = d.docs || [];
  const upd = (patch) => setDeals(deals.map((x) => x.id === id ? { ...x, ...patch } : x));
  const setStage = (i) => { if (i >= 0 && i < DEAL_STAGES.length) { setDeals(deals.map((x) => x.id === id ? { ...x, stage: DEAL_STAGES[i].key, close: DEAL_STAGES[i].key === "נסגר" ? (x.close || x.offer || x.asking) : null } : x)); toast("השלב עודכן ל" + DEAL_STAGES[i].label); } };
  const mortNext = () => { const ni = Math.min(MORT_FLOW.indexOf(tx.mortgage.status) + 1, 3); upd({ tx: { ...tx, mortgage: { ...tx.mortgage, status: MORT_FLOW[ni], missing: ni >= 2 ? [] : tx.mortgage.missing } } }); toast("סטטוס משכנתא: " + MORT_FLOW[ni]); };
  const apprAct = () => { const s = tx.appraisal.status; const next = s === "לא הוזמן" ? "הוזמן" : "בוצע"; upd({ tx: { ...tx, appraisal: { ...tx.appraisal, status: next, value: next === "בוצע" ? (tx.appraisal.value || Math.round(dealValue(d) * 0.98 / 1000) * 1000) : tx.appraisal.value } } }); toast(next === "הוזמן" ? "הוזמנה שמאות" : "דוח שמאות התקבל"); };
  const docNext = (doc) => { const ni = Math.min(DOC_FLOW.indexOf(doc.status) + 1, 3); upd({ docs: docs.map((dc) => dc.id === doc.id ? { ...dc, status: DOC_FLOW[ni], updatedAgo: 0 } : dc) }); toast(DOC_FLOW[ni] === "נחתם" ? "המסמך נחתם דיגיטלית ✓" : "המסמך נשלח לחתימה"); };
  const ICONS = { ליד: [UserPlus, "blue"], שיחה: [Phone, "green"], וואטסאפ: [MessageCircle, "green"], פגישה: [Calendar, "indigo"], צפייה: [Home, "brand"], אימייל: [Mail, "blue"], שלב: [GitBranch, "orange"], הערה: [StickyNote, "amber"] };
  const mPct = (MORT_FLOW.indexOf(tx.mortgage.status) + 1) / 4 * 100;
  const advisor = tx.mortgage.advisorId ? byId(DB_PROS, tx.mortgage.advisorId) : null;
  const appraiser = tx.appraisal.appraiserId ? byId(DB_PROS, tx.appraisal.appraiserId) : null;
  const buyerLawyer = tx.legal.buyerLawyerId ? byId(DB_PROS, tx.legal.buyerLawyerId) : null;
  const sellerLawyer = tx.legal.sellerLawyerId ? byId(DB_PROS, tx.legal.sellerLawyerId) : null;
  const goPro = (pr) => { if (pr) { close(); openPro(pr.id); } };
  const miles = [
    { l: "הצעה", st: d.offer ? "done" : si >= 2 ? "active" : "" },
    { l: "משכנתא", st: tx.mortgage.status === "אושר סופית" ? "done" : tx.mortgage.status !== "לא התחיל" ? "active" : "" },
    { l: "שמאות", st: tx.appraisal.status === "בוצע" ? "done" : tx.appraisal.status === "הוזמן" ? "active" : "" },
    { l: "חוזה", st: tx.legal.contractStatus === "נחתם" ? "done" : tx.legal.contractStatus !== "טיוטה" ? "active" : "" },
    { l: "סגירה", st: d.stage === "נסגר" ? "done" : si >= 4 ? "active" : "" },
  ];
  return <>
    <div className="ov" onClick={close} />
    <div className="slide"><div className="slhd">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div><div style={{ fontFamily: "Plus Jakarta Sans,Heebo", fontWeight: 700, fontSize: 19 }}>{p.addr}, {p.city}</div><div style={{ fontSize: 12.5, color: "var(--soft)", marginTop: 2 }}>{p.type} · {p.rooms} חד׳ · {p.size} מ״ר</div></div>
        <button className="ib" onClick={close}><X size={17} /></button></div>
      <div style={{ display: "flex", alignItems: "baseline", gap: 11, marginTop: 13 }}><div style={{ fontSize: 25, fontWeight: 800, fontFamily: "Plus Jakarta Sans,Heebo" }}>{money(dealValue(d))}</div><span className="bdg b-brand">עמלה {money(commission(d))}</span></div>
      <div className="stagebar">{DEAL_STAGES.map((s, i) => <div key={s.key} className="s" style={{ background: i <= si ? tVar(stageObj(d.stage).color) : "var(--line)" }} />)}</div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
        <span className={"bdg b-" + stageObj(d.stage).color}>{stageObj(d.stage).label} · {stageObj(d.stage).prob}%</span>
        <div style={{ display: "flex", gap: 6 }}><button className="btn gh sm" onClick={() => setStage(si - 1)} disabled={si === 0}><ChevronRight size={14} />אחורה</button><button className="btn sm" onClick={() => setStage(si + 1)} disabled={si === DEAL_STAGES.length - 1}>קדם<ChevronLeft size={14} /></button></div></div>
    </div>
      <div className="slbd">
        <div className="tabs">
          <button className={tab === "overview" ? "on" : ""} onClick={() => setTab("overview")}><List size={14} />סקירה</button>
          <button className={tab === "mortgage" ? "on" : ""} onClick={() => setTab("mortgage")}><Landmark size={14} />משכנתא</button>
          <button className={tab === "appraisal" ? "on" : ""} onClick={() => setTab("appraisal")}><Ruler size={14} />שמאות</button>
          <button className={tab === "legal" ? "on" : ""} onClick={() => setTab("legal")}><Scale size={14} />משפטי</button>
          <button className={tab === "docs" ? "on" : ""} onClick={() => setTab("docs")}><FileSignature size={14} />מסמכים{docs.length ? " · " + docs.length : ""}</button>
          <button className={tab === "timeline" ? "on" : ""} onClick={() => setTab("timeline")}><GitBranch size={14} />Timeline</button>
        </div>

        {tab === "overview" && <>
          <div className="card" style={{ marginBottom: 14, padding: 16 }}><h3 style={{ fontSize: 13.5, marginBottom: 11 }}>פרטי עסקה</h3>
            <div className="kv"><span className="k">מחיר מבוקש</span><span className="v">{money(d.asking)}</span></div>
            {d.offer && <div className="kv"><span className="k">הצעה נוכחית</span><span className="v" style={{ color: "var(--brand)" }}>{money(d.offer)}</span></div>}
            {d.close && <div className="kv"><span className="k">מחיר סגירה</span><span className="v" style={{ color: "var(--green)" }}>{money(d.close)}</span></div>}
            <div className="kv"><span className="k">עמלה ({d.commPct}%)</span><span className="v">{money(commission(d))}</span></div>
            <div className="kv"><span className="k">{d.stage === "נסגר" ? "נסגר" : "צפי סגירה"}</span><span className="v">{d.stage === "נסגר" ? agoLbl(d.closedAgo) : dueLbl(d.closeInDays)}</span></div>
            <div className="kv"><span className="k">סוכן</span><span className="v">{byId(AGENTS, d.agentId).name}</span></div></div>
          <div className="card" style={{ marginBottom: 14, padding: 16 }}><h3 style={{ fontSize: 13.5, marginBottom: 11 }}><Users size={14} color="var(--brand)" />צדדים</h3>
            {[[b, "קונה"], [owner, "מוכר"]].map(([x, role]) => <div key={role} onClick={() => { close(); openContact(x.id); }} style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 0", cursor: "pointer", borderTop: role === "מוכר" ? "1px solid var(--line2)" : "none" }}>
              <Avatar id={x.id} name={x.name} size={34} /><div style={{ flex: 1 }}><div style={{ fontWeight: 600, fontSize: 13 }}>{x.name}</div><div style={{ fontSize: 11.5, color: "var(--soft)" }}>{role} · {x.phone}</div></div><ChevronLeft size={15} color="var(--faint)" /></div>)}</div>
          {dTasks.length > 0 && <div className="card" style={{ marginBottom: 14, padding: 16 }}><h3 style={{ fontSize: 13.5, marginBottom: 10 }}><CheckSquare size={14} color="var(--brand)" />משימות</h3>
            {dTasks.map((t) => <div key={t.id} style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 0", fontSize: 12.5 }}><CircleDot size={13} color={t.dueIn < 0 ? "var(--red)" : "var(--soft)"} /><span style={{ flex: 1 }}>{t.title}</span>{t.auto && <span className="bdg b-indigo"><Zap size={10} />אוטו׳</span>}</div>)}</div>}
        </>}

        {tab === "mortgage" && <>
          <div className="card" style={{ marginBottom: 14, padding: "18px 16px" }}>
            <div className="stepper">{miles.map((m, i) => <div key={i} className={"stp " + m.st}>
              <div className="sd">{m.st === "done" ? <Check size={15} /> : <CircleDot size={13} />}</div><div className="sl">{m.l}</div></div>)}</div>
          </div>

          <div className="card" style={{ marginBottom: 14, padding: 16 }}>
            <div className="txhd"><span className="tn"><span className="ti2" style={{ background: "var(--indigo-soft)", color: "var(--indigo)" }}><Landmark size={16} /></span>סטטוס משכנתא</span>
              <span className={"bdg b-" + (tx.mortgage.status === "אושר סופית" ? "green" : tx.mortgage.status === "לא התחיל" ? "gray" : "amber")}>{tx.mortgage.status}</span></div>
            <div className="tr" style={{ height: 8, background: "var(--line2)", borderRadius: 6, overflow: "hidden", marginBottom: 12 }}><div style={{ width: mPct + "%", height: "100%", background: "var(--indigo)", borderRadius: 6, transition: ".5s" }} /></div>
            <div className="kv"><span className="k">סכום הלוואה ({tx.mortgage.ltv || "—"}% מימון)</span><span className="v">{tx.mortgage.loan ? money(tx.mortgage.loan) : "—"}</span></div>
            {advisor && <div className="kv"><span className="k">יועץ משכנתאות</span><span className="v lk" onClick={() => goPro(advisor)}>{advisor.name}</span></div>}
            {tx.mortgage.status !== "אושר סופית" && <button className="btn sm" style={{ marginTop: 13 }} onClick={mortNext}><ArrowUpRight size={13} />קדם סטטוס משכנתא</button>}
          </div>

          {tx.mortgage.offers && tx.mortgage.offers.length > 0 && (
            <div className="card" style={{ marginBottom: 14, padding: 16 }}>
              <h3 style={{ fontSize: 13.5 }}><Banknote size={14} color="var(--indigo)" />הצעות מבנקים</h3>
              <div className="sub">השוואת ריביות והצעות שהתקבלו</div>
              {tx.mortgage.offers.map((o, i) => {
                const best = i === 0 || Number(o.rate) < Math.min(...tx.mortgage.offers.map((x) => Number(x.rate)));
                return <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 13, padding: "10px 0", borderBottom: i < tx.mortgage.offers.length - 1 ? "1px solid var(--line2)" : "none" }}>
                  <span style={{ fontWeight: 600 }}>בנק {o.bank}{best && <span className="bdg b-green" style={{ marginInlineStart: 6, fontSize: 10 }}>הכי משתלם</span>}</span>
                  <span><span style={{ color: "var(--soft)", fontSize: 11.5 }}>ריבית</span> <strong>{o.rate}%</strong> · {short(o.amount)}</span>
                </div>;
              })}
            </div>
          )}

          {tx.mortgage.missing && tx.mortgage.missing.length > 0 && (
            <div className="card" style={{ padding: 16, borderInlineStart: "3px solid var(--red)" }}>
              <h3 style={{ fontSize: 13.5 }}><AlertCircle size={14} color="var(--red)" />מסמכים חסרים לקראת אישור</h3>
              <div className="sub">יש להגיש לבנק לפני קבלת אישור עקרוני</div>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>{tx.mortgage.missing.map((m, i) => <span key={i} className="bdg b-red" style={{ fontSize: 11 }}>{m}</span>)}</div>
            </div>
          )}
        </>}

        {tab === "appraisal" && <>
          <div className="card" style={{ marginBottom: 14, padding: "18px 16px" }}>
            <div className="stepper">{miles.map((m, i) => <div key={i} className={"stp " + m.st}>
              <div className="sd">{m.st === "done" ? <Check size={15} /> : <CircleDot size={13} />}</div><div className="sl">{m.l}</div></div>)}</div>
          </div>

          <div className="card" style={{ padding: 16 }}>
            <div className="txhd"><span className="tn"><span className="ti2" style={{ background: "var(--cyan-soft)", color: "var(--cyan)" }}><Ruler size={16} /></span>שמאות</span>
              <span className={"bdg b-" + (tx.appraisal.status === "בוצע" ? "green" : tx.appraisal.status === "לא הוזמן" ? "gray" : "amber")}>{tx.appraisal.status}</span></div>
            {appraiser && <div className="kv"><span className="k">שמאי</span><span className="v lk" onClick={() => goPro(appraiser)}>{appraiser.name}</span></div>}
            {tx.appraisal.value && <>
              <div className="kv"><span className="k">שווי שמאי</span><span className="v">{money(tx.appraisal.value)}</span></div>
              <div className="kv"><span className="k">מחיר מבוקש</span><span className="v">{money(d.asking)}</span></div>
              <div className="kv"><span className="k">פער ממחיר מבוקש</span><span className="v" style={{ color: tx.appraisal.value >= d.asking ? "var(--green)" : "var(--amber)" }}>{tx.appraisal.value >= d.asking ? "+" : ""}{Math.round((tx.appraisal.value / d.asking - 1) * 100)}%</span></div>
              <div style={{ marginTop: 12, padding: 12, background: tx.appraisal.value >= d.asking ? "var(--green-soft)" : "var(--amber-soft)", borderRadius: 10, fontSize: 12, color: tx.appraisal.value >= d.asking ? "var(--green)" : "var(--amber)" }}>
                {tx.appraisal.value >= d.asking
                  ? "השמאות תומכת במחיר המבוקש — אין צורך במו״מ נוסף על המחיר."
                  : "השמאות נמוכה מהמחיר המבוקש — הבנק עשוי לממן עד שווי השמאי בלבד."}
              </div>
            </>}
            {tx.appraisal.status !== "בוצע" && <button className="btn gh sm" style={{ marginTop: 12 }} onClick={apprAct}>{tx.appraisal.status === "לא הוזמן" ? <><ClipboardList size={13} />הזמן שמאות</> : <><FileCheck size={13} />סמן כבוצע</>}</button>}
          </div>
        </>}

        {tab === "legal" && <>
          <div className="card" style={{ marginBottom: 14, padding: "18px 16px" }}>
            <div className="stepper">{miles.map((m, i) => <div key={i} className={"stp " + m.st}>
              <div className="sd">{m.st === "done" ? <Check size={15} /> : <CircleDot size={13} />}</div><div className="sl">{m.l}</div></div>)}</div>
          </div>

          <div className="card" style={{ padding: 16 }}>
            <div className="txhd"><span className="tn"><span className="ti2" style={{ background: "var(--purple-soft)", color: "var(--purple)" }}><Scale size={16} /></span>חוזה ועו"ד</span>
              <span className={"bdg b-" + (tx.legal.contractStatus === "נחתם" ? "green" : tx.legal.contractStatus === "טיוטה" ? "gray" : "amber")}>{tx.legal.contractStatus}</span></div>
            {buyerLawyer && <div className="kv"><span className="k">עו״ד קונה</span><span className="v lk" onClick={() => goPro(buyerLawyer)}>{buyerLawyer.name}</span></div>}
            {sellerLawyer && <div className="kv"><span className="k">עו״ד מוכר</span><span className="v lk" onClick={() => goPro(sellerLawyer)}>{sellerLawyer.name}</span></div>}
            {!buyerLawyer && <div style={{ fontSize: 12.5, color: "var(--soft)", padding: "10px 0" }}>עורכי דין ישויכו אוטומטית כשהעסקה תגיע לשלב "חוזה".</div>}
            <div style={{ marginTop: 14, padding: 12, background: "var(--surface2)", borderRadius: 10, fontSize: 11.5, color: "var(--soft)" }}>
              <strong style={{ color: "var(--ink)", display: "block", marginBottom: 4 }}>שלבי טיפול משפטי</strong>
              טיוטה ← בדיקת חוזה ← מוכן לחתימה ← נחתם
            </div>
          </div>
        </>}

        {tab === "docs" && <>
          {(() => {
            // Required docs per stage (per Israeli RE practice)
            const REQUIRED = {
              "ליד": [], "פגישה": [],
              "צפייה": [{ name: "טופס גילוי נאות", type: "טופס" }],
              "מו\"מ": [
                { name: "טופס גילוי נאות", type: "טופס" },
                { name: "הצעת מחיר רשמית", type: "הצעה" },
              ],
              "חוזה": [
                { name: "הצעת מחיר רשמית", type: "הצעה" },
                { name: "זכרון דברים", type: "משפטי" },
                { name: "חוזה מכר — טיוטה", type: "חוזה" },
                { name: "אישור משכנתא עקרוני", type: "משכנתא" },
                { name: "תעודת זהות — קונה", type: "טופס" },
              ],
              "נסגר": [
                { name: "חוזה מכר", type: "חוזה" },
                { name: "נסח טאבו מעודכן", type: "טופס" },
                { name: "אישור משכנתא סופי", type: "משכנתא" },
                { name: "תעודת זהות — קונה", type: "טופס" },
              ],
            };
            const reqs = REQUIRED[d.stage] || [];
            const present = (name) => docs.find((doc) => doc.name === name);
            const missing = reqs.filter((r) => !present(r.name));
            if (reqs.length === 0) return null;
            const completePct = Math.round(((reqs.length - missing.length) / reqs.length) * 100);
            const tone = missing.length === 0 ? "green" : missing.length <= 1 ? "amber" : "red";
            return <div className="card" style={{ padding: 16, marginBottom: 14, borderInlineStart: `3px solid var(--${tone})` }}>
              <h3 style={{ fontSize: 13.5, marginBottom: 10 }}>
                <ClipboardList size={14} color={`var(--${tone})`} />
                צ'קליסט מסמכים לשלב "{d.stage}"
                <span className={"bdg b-" + tone} style={{ marginInlineStart: "auto" }}>{completePct}% הושלם</span>
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {reqs.map((r, i) => { const has = present(r.name); const signed = has && has.status === "נחתם";
                  return <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "7px 9px", background: "var(--surface2)", borderRadius: 9, fontSize: 12.5 }}>
                    {signed ? <CheckCircle2 size={15} color="var(--green)" /> : has ? <Clock size={15} color="var(--amber)" /> : <AlertCircle size={15} color="var(--red)" />}
                    <span style={{ flex: 1, fontWeight: signed ? 500 : 600, textDecoration: signed ? "line-through" : "none", color: signed ? "var(--soft)" : "var(--ink)" }}>{r.name}</span>
                    <span className={"bdg b-" + (signed ? "green" : has ? "amber" : "red")} style={{ fontSize: 10 }}>
                      {signed ? "נחתם" : has ? has.status : "חסר"}
                    </span>
                  </div>;
                })}
              </div>
              {missing.length > 0 && (
                <div style={{ marginTop: 11, fontSize: 11.5, color: "var(--soft)", display: "flex", alignItems: "center", gap: 6 }}>
                  <AlertCircle size={13} color="var(--red)" />
                  {missing.length} מסמכים חסרים — השלמתם תקדם את העסקה לשלב הבא
                </div>
              )}
            </div>;
          })()}
          {docs.length === 0 ? <div className="card"><Empty icon={<FileSignature size={26} />} title="אין עדיין מסמכים" sub="מסמכים נוצרים אוטומטית עם התקדמות העסקה" /></div>
          : <div className="card" style={{ padding: 16 }}><h3 style={{ fontSize: 13.5, marginBottom: 13 }}><FileSignature size={14} color="var(--brand)" />מסמכים וחתימות</h3>
            {docs.map((doc) => { const tone = docTone(doc.status); return <div className="docrow" key={doc.id}>
              <div className="di" style={{ background: tSoft(tone), color: tVar(tone) }}>{doc.status === "נחתם" ? <FileCheck size={16} /> : <FileText size={16} />}</div>
              <div style={{ flex: 1 }}><div style={{ fontWeight: 600, fontSize: 13 }}>{doc.name}</div><div style={{ fontSize: 11, color: "var(--faint)" }}>{doc.type} · עודכן {agoLbl(doc.updatedAgo)}</div></div>
              <span className={"bdg b-" + tone}>{doc.status}</span>
              {doc.status !== "נחתם" && <button className="btn gh sm" style={{ padding: "6px 10px" }} onClick={() => docNext(doc)}>{doc.status === "טיוטה" ? <><Send size={12} />שלח</> : <><PenLine size={12} />חתום</>}</button>}
            </div>; })}
            <div style={{ fontSize: 11.5, color: "var(--soft)", marginTop: 8, display: "flex", alignItems: "center", gap: 6 }}><Shield size={13} />חתימה דיגיטלית מאובטחת — נשלח לחתימה בנייד או במחשב</div>
          </div>}
        </>}

        {tab === "timeline" && <>
          <div className="card" style={{ padding: 16, marginBottom: 14 }}>
            <h3 style={{ fontSize: 13.5 }}><GitBranch size={14} color="var(--brand)" />ציר זמן העסקה</h3>
            <div className="sub">{dActs.length} אירועים מתחילת הטיפול</div>
          </div>

          {dActs.length === 0 ? (
            <div className="card"><Empty icon={<GitBranch size={26} />} title="אין עדיין פעילות בעסקה" sub="פעולות יתועדו אוטומטית עם התקדמות העסקה" /></div>
          ) : (
            <div className="card" style={{ padding: 16 }}>
              <div className="tl">{dActs.map((a) => { const [Ic, tone] = ICONS[a.type] || [StickyNote, "amber"]; return <div className="tlrow" key={a.id}>
                <div className="dot" style={{ background: tSoft(tone), color: tVar(tone) }}><Ic size={13} /></div>
                <div><div className="ti" style={{ fontSize: 12.5 }}>{a.type}</div><div className="tx">{a.text}</div><div className="tm">{agoLbl(a.daysAgo)}</div></div>
              </div>; })}</div>
            </div>
          )}
        </>}
      </div></div>
  </>;
}

/* ════════════════════ TASKS ════════════════════ */
function Tasks({ db, toggleTask, openContact, toast }) {
  const { tasks, contacts } = db;
  const TI = { שיחה: [Phone, "green"], פגישה: [Calendar, "indigo"], מסמך: [FileText, "amber"], מעקב: [Bell, "orange"] };
  const groups = [
    { lbl: "עבר לו הזמן", icon: <AlertCircle size={14} color="var(--red)" />, f: (t) => t.dueIn < 0 },
    { lbl: "להיום", icon: <Clock size={14} color="var(--amber)" />, f: (t) => t.dueIn === 0 },
    { lbl: "בקרוב", icon: <Calendar size={14} color="var(--soft)" />, f: (t) => t.dueIn > 0 },
  ];
  const autoOpen = tasks.filter((t) => t.auto && !t.done).length;
  return <>
    <div className="autobar"><div className="ic"><Wand2 size={19} /></div><div><div style={{ fontWeight: 700, fontSize: 13.5 }}>מנוע אוטומציות פעיל</div>
      <div style={{ fontSize: 12, color: "var(--soft)" }}>המערכת יוצרת משימות לבד: ליד ללא מענה 5+ ימים ← שיחה · שלב 'חוזה' ← הכנת מסמכים · בלעדיות לקראת סיום ← חידוש. כרגע {autoOpen} משימות אוטומטיות פתוחות.</div></div></div>
    {groups.map((g, gi) => { const items = tasks.filter(g.f); if (!items.length) return null;
      return <div className="tgrp" key={gi}><div className="gh">{g.icon}{g.lbl} · {items.filter((t) => !t.done).length}</div>
        {items.slice().sort((a, b) => (a.done - b.done) || (a.dueIn - b.dueIn)).map((t) => { const [Ic, tone] = TI[t.type] || [Bell, "soft"]; const c = byId(contacts, t.contactId);
          return <div className={"task" + (t.done ? " done" : "")} key={t.id}>
            <div className={"cbx" + (t.done ? " ck" : "")} onClick={() => { toggleTask(t.id); if (!t.done) toast("המשימה הושלמה ✓"); }}>{t.done && <CheckCircle2 size={13} color="#fff" />}</div>
            <div className="ti" style={{ background: tSoft(tone), color: tVar(tone) }}><Ic size={15} /></div>
            <div style={{ flex: 1 }}><div className="tt">{t.title}</div><div className="tm">{c && <span className="lk" onClick={() => openContact(c.id)}>{c.name}</span>}{c && " · "}{dueLbl(t.dueIn)}</div></div>
            <span className={"bdg b-" + statusTone(t.priority)}>{t.priority}</span>{t.auto && <span className="bdg b-indigo"><Zap size={10} />אוטו׳</span>}</div>; })}</div>; })}
  </>;
}

/* ════════════════════ OWNERS ════════════════════ */
function Owners({ db, openContact, openProp }) {
  const { contacts, props } = db;
  const exclusive = props.filter((p) => p.exclusive && p.exclEndDays != null);
  const expiring = exclusive.filter((p) => p.exclEndDays <= 14);
  return <>
    {expiring.length > 0 && <div className="autobar" style={{ background: "linear-gradient(110deg,var(--amber-soft),transparent)", borderColor: "var(--amber-soft)" }}>
      <div className="ic" style={{ background: "var(--amber)" }}><KeyRound size={19} /></div><div><div style={{ fontWeight: 700, fontSize: 13.5 }}>{expiring.length} הסכמי בלעדיות דורשים טיפול</div>
        <div style={{ fontSize: 12, color: "var(--soft)" }}>בלעדיות שמסתיימת בתוך 14 ימים או שפג תוקפה — מומלץ ליצור קשר עם הבעלים לחידוש.</div></div></div>}
    <div className="card" style={{ padding: 0 }}><table className="tbl">
      <thead><tr><th>נכס</th><th>בעלים</th><th>סטטוס</th><th>תוקף בלעדיות</th><th>מחיר</th><th>סוכן</th></tr></thead>
      <tbody>{exclusive.slice().sort((a, b) => a.exclEndDays - b.exclEndDays).map((p) => { const o = byId(contacts, p.ownerId);
        return <tr key={p.id} onClick={() => openProp(p.id)}>
          <td><div style={{ fontWeight: 600 }}>{p.addr}</div><div style={{ fontSize: 11.5, color: "var(--soft)" }}>{p.city} · {p.nbh}</div></td>
          <td><div style={{ display: "flex", alignItems: "center", gap: 8 }} onClick={(e) => { e.stopPropagation(); openContact(o.id); }}><Avatar id={o.id} name={o.name} size={28} /><span className="lk">{o.name}</span></div></td>
          <td><span className={"bdg b-" + statusTone(p.status)}>{p.status}</span></td>
          <td>{p.exclEndDays < 0 ? <span className="bdg b-red"><AlertCircle size={11} />פג ({-p.exclEndDays}י׳)</span> : p.exclEndDays <= 14 ? <span className="bdg b-amber"><Clock size={11} />{p.exclEndDays} ימים</span> : <span className="bdg b-green">{p.exclEndDays} ימים</span>}</td>
          <td style={{ fontWeight: 600 }}>{money(p.price)}</td>
          <td style={{ color: "var(--soft)" }}>{byId(AGENTS, p.agentId).name}</td></tr>; })}</tbody></table></div>
  </>;
}

/* ════════════════════ REPORTS ════════════════════ */
function Reports({ db }) {
  const { deals, contacts, acts, props } = db;
  const won = deals.filter((d) => d.stage === "נסגר");
  const totalRev = won.reduce((s, d) => s + commission(d), 0);
  const agentStats = AGENTS.map((a) => {
    const ad = deals.filter((d) => d.agentId === a.id);
    const aw = ad.filter((d) => d.stage === "נסגר");
    const rev = aw.reduce((s, d) => s + commission(d), 0);
    const aa = acts.filter((x) => { const c = byId(contacts, x.contactId); return c && c.agentId === a.id; }).length;
    const resp = 1 + (a.id * 7 % 4);
    return { ...a, deals: ad.length, won: aw.length, rev, rate: ad.length ? Math.round(aw.length / ad.length * 100) : 0, acts: aa, resp };
  }).sort((a, b) => b.rev - a.rev);
  const revBar = agentStats.map((a) => ({ name: a.name.split(" ")[0], val: Math.round(a.rev / 1000) }));
  const overallClose = Math.round(won.length / deals.length * 100);
  const avgResp = (agentStats.reduce((s, a) => s + a.resp, 0) / agentStats.length).toFixed(1);
  return <>
    <div className="kpis" style={{ gridTemplateColumns: "repeat(4,1fr)" }}>
      {[{ l: "הכנסות עמלות", v: short(totalRev), ic: <Banknote size={16} />, t: "green" }, { l: "עסקאות שנסגרו", v: won.length, ic: <Award size={16} />, t: "amber" },
      { l: "שיעור סגירה כללי", v: overallClose + "%", ic: <Percent size={16} />, t: "blue" }, { l: "זמן תגובה ממוצע", v: avgResp + " ימים", ic: <Timer size={16} />, t: "indigo" }].map((k, i) =>
        <div className="kpi" key={i}><div className="kc" style={{ background: tSoft(k.t), color: tVar(k.t) }}>{k.ic}</div><div className="lbl">{k.l}</div><div className="val">{k.v}</div></div>)}
    </div>
    <div className="row2">
      <div className="card"><h3><BarChart3 size={16} color="var(--brand)" />הכנסות לפי סוכן</h3><div className="sub">עמלות שנסגרו (₪ אלפים)</div>
        <div style={{ height: 210, direction: "ltr" }}><ResponsiveContainer width="100%" height="100%">
          <BarChart data={revBar} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
            <XAxis dataKey="name" tick={{ fontSize: 11, fontFamily: "Heebo", fill: "var(--soft)" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 10, fill: "var(--soft)" }} axisLine={false} tickLine={false} width={28} />
            <Tooltip formatter={(v) => [v + "K ₪", "הכנסות"]} contentStyle={{ fontFamily: "Heebo", fontSize: 12, borderRadius: 12, background: "var(--surface)", border: "1px solid var(--line)", direction: "rtl" }} cursor={{ fill: "var(--hover)" }} />
            <Bar dataKey="val" radius={[8, 8, 0, 0]}>{revBar.map((e, i) => <Cell key={i} fill={AVA[i]} />)}</Bar>
          </BarChart></ResponsiveContainer></div></div>
      <div className="card"><h3><Activity size={16} color="var(--brand)" />מדדי פעילות</h3><div className="sub">סיכום ביצועים כללי</div>
        {[["עסקאות פעילות", deals.filter(isActive).length], ["נכסים בניהול", props.length], ["סה״כ אינטראקציות", acts.length], ["לידים חמים", contacts.filter((c) => c.kind === "קונה" && leadScore(c, acts, deals).tier === "חם").length], ["נכסים בבלעדיות", props.filter((p) => p.exclusive).length]].map(([l, v], i) =>
          <div className="kv" key={i}><span className="k">{l}</span><span className="v">{v}</span></div>)}</div>
    </div>
    <div className="card"><h3><Users size={16} color="var(--brand)" />טבלת ביצועי סוכנים</h3>
      <table className="tbl" style={{ marginTop: 13 }}><thead><tr><th>סוכן</th><th>עסקאות</th><th>נסגרו</th><th>שיעור סגירה</th><th>הכנסות</th><th>פעילות</th><th>זמן תגובה</th></tr></thead>
        <tbody>{agentStats.map((a, i) => <tr key={a.id} style={{ cursor: "default" }}>
          <td><div style={{ display: "flex", alignItems: "center", gap: 9 }}><Avatar id={a.id} name={a.name} size={30} />{a.name}{i === 0 && <span className="bdg b-amber"><Award size={11} />מוביל</span>}</div></td>
          <td style={{ fontWeight: 600 }}>{a.deals}</td><td>{a.won}</td>
          <td><span className={"bdg b-" + (a.rate >= 40 ? "green" : a.rate >= 25 ? "amber" : "gray")}>{a.rate}%</span></td>
          <td style={{ fontWeight: 700 }}>{money(a.rev)}</td><td>{a.acts}</td><td>{a.resp} ימים</td></tr>)}</tbody></table></div>
  </>;
}

/* ════════════════════ ADD CONTACT ════════════════════ */
function AddContact({ onClose, onSave }) {
  const [f, setF] = useState({ name: "", phone: "", kind: "קונה", source: "יד2", budget: "2000000", minRooms: "3", minSize: "75", areas: "רמת גן", status: "חדש", needElevator: true, needParking: true, needBalcony: false, needMamad: false });
  const s = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const tog = (k) => setF({ ...f, [k]: !f[k] });
  return <><div className="ov" onClick={onClose} /><div className="modal">
    <h2>ליד / איש קשר חדש<button onClick={onClose}><X size={19} /></button></h2>
    <div className="fld"><label>שם מלא</label><input value={f.name} onChange={s("name")} placeholder="דנה כהן" /></div>
    <div className="f2"><div className="fld"><label>טלפון</label><input value={f.phone} onChange={s("phone")} placeholder="050-0000000" /></div>
      <div className="fld"><label>סוג</label><select value={f.kind} onChange={s("kind")}><option>קונה</option><option>מוכר</option></select></div></div>
    <div className="fld"><label>מקור הליד</label><select value={f.source} onChange={s("source")}>{SOURCES.map((x) => <option key={x}>{x}</option>)}</select></div>
    {f.kind === "קונה" && <>
      <div className="f3"><div className="fld"><label>תקציב</label><input value={f.budget} onChange={s("budget")} /></div>
        <div className="fld"><label>חדרים מינ׳</label><input value={f.minRooms} onChange={s("minRooms")} /></div>
        <div className="fld"><label>שטח מינ׳</label><input value={f.minSize} onChange={s("minSize")} /></div></div>
      <div className="fld"><label>אזורים מועדפים (מופרד בפסיק)</label><input value={f.areas} onChange={s("areas")} placeholder="רמת גן, גבעתיים" /></div>
      <div style={{ display: "flex", gap: 7, flexWrap: "wrap", marginBottom: 15 }}>{[["needElevator", "מעלית"], ["needParking", "חניה"], ["needBalcony", "מרפסת"], ["needMamad", "ממ״ד"]].map(([k, l]) =>
        <button key={k} type="button" className={"chip" + (f[k] ? " on" : "")} style={{ padding: "6px 12px" }} onClick={() => tog(k)}>{l}</button>)}</div></>}
    <button className="btn" style={{ width: "100%", justifyContent: "center" }} onClick={() => { if (!f.name) return;
      onSave({ id: Date.now(), name: f.name, kind: f.kind, gender: "m", phone: f.phone || "—", email: "new@mail.com", source: f.source, agentId: 1, createdAgo: 0, lastContactAgo: 0, status: f.status,
        budget: f.kind === "קונה" ? Number(f.budget) : undefined, minRooms: Number(f.minRooms), minSize: Number(f.minSize),
        areas: f.kind === "קונה" ? f.areas.split(",").map((x) => x.trim()).filter(Boolean) : undefined,
        needElevator: f.needElevator, needParking: f.needParking, needBalcony: f.needBalcony, needMamad: f.needMamad }); }}>שמירה</button>
  </div></>;
}

/* ════════════════════ PROFESSIONALS ════════════════════ */
const PRO_ICON = { "יועץ משכנתאות": [Landmark, "indigo"], "שמאי": [Ruler, "cyan"], "עו\"ד": [Scale, "purple"], "יועץ נדל\"ן": [Briefcase, "blue"], "אדריכל": [PenLine, "amber"], "קבלן שיפוצים": [HardHat, "orange"] };
function Professionals({ db, openPro }) {
  const { pros } = db;
  const [t, setT] = useState("הכל");
  const rows = t === "הכל" ? pros : pros.filter((x) => x.type === t);
  return <>
    <div className="chips">
      <button className={"chip" + (t === "הכל" ? " on" : "")} onClick={() => setT("הכל")}>כל בעלי המקצוע</button>
      {PRO_TYPES.map((x) => { const [Ic] = PRO_ICON[x]; return <button key={x} className={"chip" + (t === x ? " on" : "")} onClick={() => setT(x)}><Ic size={14} />{x}</button>; })}
    </div>
    <div className="pro-grid">{rows.map((pr) => { const [Ic, tone] = PRO_ICON[pr.type] || [Briefcase, "blue"]; return <div className="proc" key={pr.id} onClick={() => openPro(pr.id)}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 46, height: 46, borderRadius: 13, background: tSoft(tone), color: tVar(tone), display: "grid", placeItems: "center", flexShrink: 0 }}><Ic size={22} /></div>
        <div style={{ flex: 1, minWidth: 0 }}><div style={{ fontWeight: 700, fontSize: 14.5 }}>{pr.name}</div><div style={{ fontSize: 12, color: "var(--soft)" }}>{pr.type}</div></div>
        <span className="star"><Star size={13} fill="var(--amber)" />{pr.rating}</span>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 13, paddingTop: 12, borderTop: "1px solid var(--line2)", fontSize: 12, color: "var(--soft)" }}>
        <span>{pr.org}</span><span className="bdg b-brand">{pr.deals} עסקאות</span></div>
    </div>; })}</div>
  </>;
}
function ProDetail({ id, db, close, openContact }) {
  const { pros, deals, contacts, props } = db;
  const pr = byId(pros, id);
  if (!pr) return null;
  const [Ic, tone] = PRO_ICON[pr.type] || [Briefcase, "blue"];
  const myDeals = deals.filter((d) => (d.proIds || []).includes(id));
  return <>
    <div className="ov" onClick={close} />
    <div className="slide"><div className="slhd">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 13 }}>
          <div style={{ width: 50, height: 50, borderRadius: 14, background: tSoft(tone), color: tVar(tone), display: "grid", placeItems: "center" }}><Ic size={24} /></div>
          <div><div style={{ fontFamily: "Plus Jakarta Sans,Heebo", fontWeight: 700, fontSize: 19 }}>{pr.name}</div><div style={{ fontSize: 12.5, color: "var(--soft)", marginTop: 2 }}>{pr.type} · {pr.org}</div></div></div>
        <button className="ib" onClick={close}><X size={17} /></button></div>
      <div style={{ display: "flex", gap: 8, marginTop: 13 }}>
        <button className="btn sm" onClick={() => window.open("tel:" + pr.phone)}><Phone size={13} />התקשר</button>
        <button className="btn gh sm" onClick={() => window.open("https://wa.me/?text=" + encodeURIComponent("שלום " + pr.name))}><MessageCircle size={13} />וואטסאפ</button>
        <span className="star" style={{ marginInlineStart: "auto" }}><Star size={14} fill="var(--amber)" />{pr.rating}</span></div>
    </div>
      <div className="slbd">
        <div className="card" style={{ marginBottom: 14, padding: 16 }}><h3 style={{ fontSize: 13.5, marginBottom: 11 }}>פרטי קשר</h3>
          <div className="kv"><span className="k">טלפון</span><span className="v">{pr.phone}</span></div>
          <div className="kv"><span className="k">אימייל</span><span className="v">{pr.email}</span></div>
          <div className="kv"><span className="k">משרד</span><span className="v">{pr.org}</span></div>
          <div className="kv"><span className="k">עסקאות פעילות</span><span className="v">{myDeals.length}</span></div></div>
        <div className="card" style={{ padding: 16 }}><h3 style={{ fontSize: 13.5, marginBottom: 11 }}><KanbanSquare size={14} color="var(--brand)" />עסקאות מקושרות</h3>
          {myDeals.length ? myDeals.map((d) => { const p = byId(props, d.propId), bu = byId(contacts, d.buyerId); return <div key={d.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 0", borderTop: "1px solid var(--line2)" }}>
            <Home size={15} color="var(--soft)" /><div style={{ flex: 1 }}><div style={{ fontWeight: 600, fontSize: 12.5 }}>{p.addr}, {p.city}</div><div style={{ fontSize: 11.5, color: "var(--soft)" }}>{bu.name} · {money(dealValue(d))}</div></div>
            <span className={"bdg b-" + stageObj(d.stage).color}>{stageObj(d.stage).label}</span></div>; })
          : <Empty icon={<Inbox size={24} />} title="אין עסקאות מקושרות" sub="" />}</div>
      </div></div>
  </>;
}

/* ════════════════════ COMPOSE / MARKETING ════════════════════ */
function copyText(txt, toast) { try { navigator.clipboard.writeText(txt); toast("הטקסט הועתק ✓"); } catch (e) { toast("בחר והעתק ידנית", "info"); } }
function Compose({ p, onClose, toast }) {
  const [tab, setTab] = useState("ad");
  const tags = "#נדלן #" + p.city.replace(/ /g, "") + " #דירהלמכירה #" + p.rooms + "חדרים";
  const feats = [p.elevator && "מעלית", p.parking && "חניה", p.balcony && "מרפסת", p.mamad && "ממ״ד"].filter(Boolean).join(" · ");
  const ad = `למכירה ב${p.city} | ${p.addr}\n${p.type} ${p.rooms} חד׳, ${p.size} מ״ר, קומה ${p.floor}\n${feats || "נכס מטופח"} · ${p.cond}\nמחיר: ${money(p.price)}\nלפרטים וצפייה — צרו קשר עוד היום!`;
  const wa = `שלום 🙂 יש לי נכס שאני חושב שיתאים לך:\n📍 ${p.addr}, ${p.city}\n🏠 ${p.type} · ${p.rooms} חד׳ · ${p.size} מ״ר\n💰 ${money(p.price)}\n${feats}\nאשמח לתאם צפייה. מתי נוח לך?`;
  const social = `🔥 חדש בשוק ב${p.city}!\n${p.type} מהמם, ${p.rooms} חדרים, ${p.size} מ״ר ${p.balcony ? "עם מרפסת שמש ☀️" : ""}\n${money(p.price)} בלבד 🏡\nתייגו מישהו שמחפש! 👇\n\n${tags}`;
  const email = `נושא: הזדמנות נדל״ן ב${p.city} — ${p.addr}\n\nשלום רב,\nברצוני להציג בפניך נכס איכותי שעשוי לעניין אותך:\n\n• כתובת: ${p.addr}, ${p.city} (${p.nbh})\n• סוג: ${p.type}, ${p.rooms} חדרים, ${p.size} מ״ר\n• קומה ${p.floor} מתוך ${p.floors}\n• ${feats}\n• מחיר מבוקש: ${money(p.price)}\n\nאשמח לתאם צפייה במועד הנוח לך.\nבברכה,\nרועי לוי | נדל״ן פרו`;
  const TABS = [["ad", "מודעה", <Megaphone size={14} />], ["wa", "וואטסאפ", <MessageCircle size={14} />], ["social", "רשתות", <Share2 size={14} />], ["email", "מייל", <Mail size={14} />]];
  const txt = { ad, wa, social, email }[tab];
  return <><div className="ov" onClick={onClose} /><div className="modal" style={{ width: 540 }}>
    <h2><span style={{ display: "flex", alignItems: "center", gap: 9 }}><Sparkles size={18} color="var(--brand)" />שיווק חכם<span className="bdg b-brand" style={{ fontSize: 10 }}>AI</span></span><button onClick={onClose}><X size={19} /></button></h2>
    <div style={{ fontSize: 12.5, color: "var(--soft)", marginBottom: 14 }}>תוכן שנוצר אוטומטית עבור {p.addr}, {p.city} — ערוך, העתק או שלח בלחיצה.</div>
    <div className="tabs">{TABS.map(([k, l, ic]) => <button key={k} className={tab === k ? "on" : ""} onClick={() => setTab(k)}>{ic}{l}</button>)}</div>
    <div className="copybox">{txt}</div>
    <div style={{ display: "flex", gap: 8, marginTop: 14 }}>
      <button className="btn" style={{ flex: 1, justifyContent: "center" }} onClick={() => copyText(txt, toast)}><Copy size={14} />העתק טקסט</button>
      {tab === "wa" && <button className="btn gh" style={{ justifyContent: "center" }} onClick={() => window.open("https://wa.me/?text=" + encodeURIComponent(txt))}><Send size={14} />שלח בוואטסאפ</button>}
    </div>
  </div></>;
}

/* ════════════════════ INVESTOR ROI ════════════════════ */
function Investor({ p, onClose }) {
  const [equity, setEquity] = useState(35);
  const [rent, setRent] = useState(Math.round(p.price * 0.0032 / 100) * 100);
  const [rate, setRate] = useState(4.5);
  const years = 25;
  const loan = p.price * (1 - equity / 100);
  const eq = p.price * equity / 100;
  const r = rate / 100 / 12, n = years * 12;
  const mPay = loan > 0 ? Math.round(loan * r / (1 - Math.pow(1 + r, -n))) : 0;
  const expenses = Math.round(rent * 0.08);
  const cashflow = rent - mPay - expenses;
  const grossYield = (rent * 12 / p.price * 100);
  const cashReturn = eq > 0 ? (cashflow * 12 / eq * 100) : 0;
  const F = (v) => v.toFixed(1) + "%";
  return <><div className="ov" onClick={onClose} /><div className="modal">
    <h2><span style={{ display: "flex", alignItems: "center", gap: 9 }}><Calculator size={18} color="var(--brand)" />מחשבון השקעה</span><button onClick={onClose}><X size={19} /></button></h2>
    <div style={{ fontSize: 12.5, color: "var(--soft)", marginBottom: 14 }}>{p.addr}, {p.city} · {money(p.price)}</div>
    <div className="f3">
      <div className="fld"><label>הון עצמי %</label><input type="number" value={equity} onChange={(e) => setEquity(Math.min(100, Math.max(10, +e.target.value || 0)))} /></div>
      <div className="fld"><label>שכ״ד חודשי</label><input type="number" value={rent} onChange={(e) => setRent(+e.target.value || 0)} /></div>
      <div className="fld"><label>ריבית %</label><input type="number" step="0.1" value={rate} onChange={(e) => setRate(+e.target.value || 0)} /></div>
    </div>
    <div style={{ marginTop: 6 }}>
      <div className="calcrow"><span className="cl">הון עצמי נדרש</span><span className="cv">{money(eq)}</span></div>
      <div className="calcrow"><span className="cl">סכום משכנתא</span><span className="cv">{money(loan)}</span></div>
      <div className="calcrow"><span className="cl">החזר חודשי (25 ש׳)</span><span className="cv">{money(mPay)}</span></div>
      <div className="calcrow"><span className="cl">תזרים חודשי נטו</span><span className="cv" style={{ color: cashflow >= 0 ? "var(--green)" : "var(--red)" }}>{money(cashflow)}</span></div>
      <div className="calcrow"><span className="cl">תשואה ברוטו שנתית</span><span className="cv">{F(grossYield)}</span></div>
      <div className="calcrow"><span className="cl">תשואה על ההון (Cash-on-Cash)</span><span className="cv" style={{ color: cashReturn >= 0 ? "var(--green)" : "var(--red)" }}>{F(cashReturn)}</span></div>
    </div>
    <div style={{ fontSize: 11.5, color: "var(--faint)", marginTop: 12 }}>הערכה כללית להמחשה בלבד, אינה ייעוץ פיננסי.</div>
  </div></>;
}

/* ════════════════════ OWNER UPDATE ════════════════════ */
/* ════════════════════ OWNER PORTAL (view-only) ════════════════════ */
function OwnerPortal({ p, db, onClose, toast }) {
  const owner = byId(db.contacts, p.ownerId);
  const buyers = db.contacts.filter((c) => c.kind === "קונה");
  const vh = db.viewings[p.id] || [];
  const matched = buyers.filter((b) => { const m = matchScore(b, p); return m && m.score >= 60; }).length;
  const deal = db.deals.find((d) => d.propId === p.id);
  const offers = deal ? deal.offers : [];
  const stageInfo = deal ? stageObj(deal.stage) : null;

  // Activity timeline (sanitized for owner — no internal notes)
  const events = [];
  events.push({ days: p.listedAgo, type: "list", text: `הנכס הועלה לפרסום` });
  if (p.exclusive) events.push({ days: p.listedAgo - 1, type: "excl", text: `נחתם הסכם בלעדיות` });
  vh.forEach((v) => events.push({ days: v.daysAgo, type: "view", text: `סיור בנכס עם קונה פוטנציאלי` }));
  offers.forEach((o) => events.push({ days: o.daysAgo, type: "offer", text: `התקבלה הצעת מחיר על סך ${money(o.amount)}` }));
  if (deal && deal.stage !== "ליד") events.push({ days: deal.createdAgo, type: "deal", text: `נפתחה עסקה בשלב "${stageInfo.label}"` });
  events.sort((a, b) => a.days - b.days);

  const shareLink = `${typeof window !== "undefined" ? window.location.origin : ""}/owner/${p.id}?t=${btoa(String(p.id * 31 + 7))}`;

  return <div className="ov" onClick={onClose} style={{ overflowY: "auto", padding: "30px 16px" }}>
    <div onClick={(e) => e.stopPropagation()} style={{ maxWidth: 720, margin: "0 auto", background: "var(--bg)", borderRadius: 22, padding: 0, overflow: "hidden", boxShadow: "0 30px 60px rgba(0,0,0,.3)" }}>
      {/* Header bar */}
      <div style={{ background: "linear-gradient(135deg,var(--brand),#60A5FA)", color: "#fff", padding: "22px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <div style={{ fontSize: 11, opacity: .85, letterSpacing: 2, fontWeight: 700 }}>פורטל בעל נכס</div>
          <div style={{ fontSize: 20, fontWeight: 800, marginTop: 4 }}>שלום, {owner ? owner.name.split(" ")[0] : ""}</div>
        </div>
        <button onClick={onClose} style={{ background: "rgba(255,255,255,.2)", border: "none", color: "#fff", width: 36, height: 36, borderRadius: 10, display: "grid", placeItems: "center", cursor: "pointer" }}><X size={18} /></button>
      </div>

      <div style={{ padding: 22 }}>
        {/* Property summary */}
        <div className="card" style={{ marginBottom: 14, padding: 0, overflow: "hidden" }}>
          <Photo seed={p.photoSeed} h={180}>
            <div style={{ position: "absolute", bottom: 12, insetInlineEnd: 12, background: "rgba(255,255,255,.95)", color: "var(--ink)", padding: "5px 12px", borderRadius: 20, fontSize: 12, fontWeight: 700 }}>
              {stageInfo ? stageInfo.label : p.status}
            </div>
          </Photo>
          <div style={{ padding: 16 }}>
            <div style={{ fontSize: 18, fontWeight: 800 }}>{p.addr}, {p.city}</div>
            <div style={{ fontSize: 13, color: "var(--soft)", marginBottom: 8 }}>{p.nbh} · {p.rooms} חד׳ · {p.size} מ״ר · קומה {p.floor}</div>
            <div style={{ fontSize: 26, fontWeight: 800, color: "var(--brand)", fontFamily: "Plus Jakarta Sans,Heebo" }}>{money(p.price)}</div>
          </div>
        </div>

        {/* KPIs */}
        <div className="row3" style={{ gridTemplateColumns: "repeat(4,1fr)", gap: 8, margin: "0 0 14px" }}>
          {[
            ["צפיות באתרים", p.views, Eye, "blue"],
            ["סיורים", vh.length, Users, "cyan"],
            ["קונים מתאימים", matched, Target, "green"],
            ["הצעות מחיר", offers.length, FileText, "amber"],
          ].map(([l, v, Ic, t], i) => (
            <div key={i} style={{ background: tSoft(t), borderRadius: 12, padding: "12px 10px", textAlign: "center" }}>
              <Ic size={16} color={tVar(t)} />
              <div style={{ fontSize: 22, fontWeight: 800, color: tVar(t), fontFamily: "Plus Jakarta Sans,Heebo", marginTop: 4 }}>{v}</div>
              <div style={{ fontSize: 10.5, color: "var(--soft)" }}>{l}</div>
            </div>
          ))}
        </div>

        {/* Latest offers */}
        {offers.length > 0 && (
          <div className="card" style={{ marginBottom: 14 }}>
            <h3 style={{ fontSize: 14 }}><Handshake size={14} color="var(--amber)" />הצעות מחיר אחרונות</h3>
            <div className="sub">הצעות שהתקבלו מקונים פוטנציאליים</div>
            {offers.slice(0, 3).map((o, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 0", borderBottom: i < offers.length - 1 ? "1px solid var(--line2)" : "none" }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: "var(--amber-soft)", color: "var(--amber)", display: "grid", placeItems: "center" }}><Banknote size={17} /></div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 700 }}>{money(o.amount)}</div>
                  <div style={{ fontSize: 11.5, color: "var(--soft)" }}>{agoLbl(o.daysAgo)} · פער מהמבוקש: {Math.round((1 - o.amount / p.price) * 100)}%</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Activity timeline */}
        <div className="card" style={{ marginBottom: 14 }}>
          <h3 style={{ fontSize: 14 }}><Activity size={14} color="var(--brand)" />ציר זמן הפעילות</h3>
          <div className="sub">היסטוריית האירועים על הנכס</div>
          {events.length === 0 ? <Empty icon={<Inbox size={26} />} title="עדיין אין פעילות" /> : events.map((e, i) => {
            const TONE = { list: "blue", excl: "amber", view: "cyan", offer: "green", deal: "purple" }[e.type];
            return <div key={i} style={{ display: "flex", gap: 11, padding: "9px 0", borderBottom: i < events.length - 1 ? "1px solid var(--line2)" : "none" }}>
              <div style={{ width: 30, height: 30, borderRadius: 9, background: tSoft(TONE), color: tVar(TONE), display: "grid", placeItems: "center", flexShrink: 0 }}>
                {e.type === "view" ? <Eye size={14} /> : e.type === "offer" ? <Banknote size={14} /> : e.type === "deal" ? <Handshake size={14} /> : e.type === "excl" ? <KeyRound size={14} /> : <Building2 size={14} />}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12.5, fontWeight: 600 }}>{e.text}</div>
                <div style={{ fontSize: 11, color: "var(--soft)" }}>{agoLbl(e.days)}</div>
              </div>
            </div>;
          })}
        </div>

        {/* Share link */}
        <div className="card" style={{ background: "var(--brand-soft)", border: "1px solid var(--brand)" }}>
          <h3 style={{ fontSize: 13.5 }}><Shield size={14} color="var(--brand)" />קישור מאובטח לבעלים</h3>
          <div style={{ fontSize: 11.5, color: "var(--soft)", marginBottom: 8 }}>קישור לקריאה בלבד — אפשר לשלוח לבעל הנכס</div>
          <div style={{ display: "flex", gap: 6 }}>
            <input value={shareLink} readOnly style={{ flex: 1, fontSize: 11, padding: "8px 10px", borderRadius: 8, border: "1px solid var(--line)", background: "var(--surface)", direction: "ltr", textAlign: "left" }} />
            <button className="btn sm" onClick={() => { copyText(shareLink, toast); }}><Copy size={12} />העתק</button>
          </div>
        </div>
      </div>
    </div>
  </div>;
}

/* ════════════════════ OWNER UPDATE ════════════════════ */
function OwnerUpdate({ p, db, onClose, toast }) {
  const owner = byId(db.contacts, p.ownerId);
  const buyers = db.contacts.filter((c) => c.kind === "קונה");
  const vh = db.viewings[p.id] || [];
  const matched = buyers.filter((b) => { const m = matchScore(b, p); return m && m.score >= 60; }).length;
  const deal = db.deals.find((d) => d.propId === p.id);
  const offers = deal ? deal.offers.length : 0;
  const txt = `עדכון שיווקי — ${p.addr}, ${p.city}\nשלום ${owner.name},\nלהלן סיכום הפעילות על הנכס:\n• צפיות באתרי הנדל״ן: ${p.views}\n• סיורים שבוצעו: ${vh.length}\n• קונים פוטנציאליים מתאימים: ${matched}\n• הצעות מחיר שהתקבלו: ${offers}\n• סטטוס: ${deal ? stageObj(deal.stage).label : p.status}\nנמשיך לעדכן בהמשך. בברכה, רועי לוי`;
  return <><div className="ov" onClick={onClose} /><div className="modal">
    <h2><span style={{ display: "flex", alignItems: "center", gap: 9 }}><ClipboardList size={18} color="var(--brand)" />עדכון לבעלים</span><button onClick={onClose}><X size={19} /></button></h2>
    <div style={{ fontSize: 12.5, color: "var(--soft)", marginBottom: 14 }}>דוח פעילות אוטומטי עבור {owner.name}</div>
    <div className="f2" style={{ marginBottom: 14 }}>
      {[["צפיות", p.views, "blue"], ["סיורים", vh.length, "cyan"], ["קונים מתאימים", matched, "green"], ["הצעות", offers, "amber"]].map(([l, v, t], i) =>
        <div key={i} style={{ background: tSoft(t), borderRadius: 12, padding: "12px 14px" }}><div style={{ fontSize: 22, fontWeight: 800, color: tVar(t), fontFamily: "Plus Jakarta Sans,Heebo" }}>{v}</div><div style={{ fontSize: 12, color: "var(--soft)" }}>{l}</div></div>)}
    </div>
    <div className="copybox">{txt}</div>
    <div style={{ display: "flex", gap: 8, marginTop: 14 }}>
      <button className="btn" style={{ flex: 1, justifyContent: "center" }} onClick={() => window.open("https://wa.me/?text=" + encodeURIComponent(txt))}><Send size={14} />שלח לבעלים</button>
      <button className="btn gh" style={{ justifyContent: "center" }} onClick={() => copyText(txt, toast)}><Copy size={14} />העתק</button>
    </div>
  </div></>;
}

/* ════════════════════ COMMUNICATION ════════════════════ */
const COMM_TYPES = { שיחה: [Phone, "green"], וואטסאפ: [MessageCircle, "green"], אימייל: [Mail, "blue"], פגישה: [Calendar, "indigo"] };
const TEMPLATES = [
  { t: "תיאום צפייה", x: "שלום 🙂 מצאתי נכס שמתאים לדרישות שלך, אשמח לתאם צפייה. מתי נוח לך השבוע?" },
  { t: "מעקב אחרי צפייה", x: "היי, רציתי לשמוע מה התרשמת מהנכס שראינו? אשמח לענות על כל שאלה." },
  { t: "הצעת מחיר", x: "בהמשך לשיחתנו, מצורפת הצעת מחיר רשמית לנכס. אשמח לקדם משם." },
  { t: "עדכון בעלים", x: "עדכון שבועי: הנכס שלך זוכה לעניין, ריכזתי עבורך סיכום פעילות מצורף." },
];
function Communication({ db, openContact, toast }) {
  const { acts, contacts } = db;
  const [f, setF] = useState("הכל");
  const comms = acts.filter((a) => COMM_TYPES[a.type]).sort((x, y) => x.daysAgo - y.daysAgo);
  const rows = f === "הכל" ? comms : comms.filter((a) => a.type === f);
  return <div className="row2" style={{ gridTemplateColumns: "1.6fr 1fr" }}>
    <div className="card"><h3><MessageSquare size={16} color="var(--brand)" />יומן תקשורת מאוחד</h3><div className="sub">כל השיחות, ההודעות והפגישות במקום אחד</div>
      <div className="chips" style={{ marginBottom: 14 }}>{["הכל", "שיחה", "וואטסאפ", "אימייל", "פגישה"].map((t) => <button key={t} className={"chip" + (f === t ? " on" : "")} onClick={() => setF(t)} style={{ padding: "6px 12px" }}>{t}</button>)}</div>
      <div style={{ maxHeight: 560, overflowY: "auto" }}>{rows.slice(0, 40).map((a) => { const [Ic, tone] = COMM_TYPES[a.type]; const c = byId(contacts, a.contactId); return <div className="commrow" key={a.id}>
        <div style={{ width: 36, height: 36, borderRadius: 10, background: tSoft(tone), color: tVar(tone), display: "grid", placeItems: "center", flexShrink: 0 }}><Ic size={16} /></div>
        <div style={{ flex: 1 }}><div style={{ fontWeight: 600, fontSize: 13 }}>{c ? <span className="lk" onClick={() => openContact(c.id)}>{c.name}</span> : a.type} <span style={{ color: "var(--faint)", fontWeight: 400, fontSize: 11 }}>· {a.type}</span></div>
          <div style={{ fontSize: 12.5, color: "var(--soft)", marginTop: 2 }}>{a.text}</div></div>
        <div style={{ fontSize: 11, color: "var(--faint)" }}>{agoLbl(a.daysAgo)}</div></div>; })}
        {!rows.length && <Empty icon={<MessageSquare size={26} />} title="אין תקשורת להצגה" sub="" />}</div></div>
    <div className="card" style={{ alignSelf: "start" }}><h3><StickyNote size={16} color="var(--brand)" />תבניות הודעה</h3><div className="sub">העתק ושלח בלחיצה</div>
      {TEMPLATES.map((tp, i) => <div key={i} style={{ border: "1px solid var(--line)", borderRadius: 12, padding: 13, marginBottom: 10 }}>
        <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 5 }}>{tp.t}</div>
        <div style={{ fontSize: 12, color: "var(--soft)", marginBottom: 10, lineHeight: 1.6 }}>{tp.x}</div>
        <div style={{ display: "flex", gap: 7 }}><button className="btn sm" onClick={() => copyText(tp.x, toast)}><Copy size={12} />העתק</button>
          <button className="btn gh sm" onClick={() => window.open("https://wa.me/?text=" + encodeURIComponent(tp.x))}><MessageCircle size={12} />וואטסאפ</button></div></div>)}</div>
  </div>;
}

/* ════════════════════ DOCUMENTS CENTER ════════════════════ */
function DocsCenter({ db, openDeal }) {
  const { deals, props } = db;
  const [f, setF] = useState("הכל");
  const all = [];
  deals.forEach((d) => (d.docs || []).forEach((doc) => all.push({ ...doc, dealId: d.id, prop: byId(props, d.propId) })));
  all.sort((a, b) => a.updatedAgo - b.updatedAgo);
  const rows = f === "הכל" ? all : all.filter((x) => x.status === f);
  const counts = { "טיוטה": 0, "נשלח": 0, "נפתח": 0, "נחתם": 0 };
  all.forEach((x) => counts[x.status] !== undefined && counts[x.status]++);
  return <>
    <div className="kpis" style={{ gridTemplateColumns: "repeat(4,1fr)" }}>
      {[["טיוטה", "gray"], ["נשלח", "blue"], ["נפתח", "amber"], ["נחתם", "green"]].map(([s, t]) => <div className="kpi" key={s}>
        <div className="kc" style={{ background: tSoft(t), color: tVar(t) }}>{s === "נחתם" ? <FileCheck size={16} /> : <FileText size={16} />}</div>
        <div className="lbl">{s}</div><div className="val">{counts[s]}</div></div>)}
    </div>
    <div className="chips">{["הכל", "טיוטה", "נשלח", "נפתח", "נחתם"].map((s) => <button key={s} className={"chip" + (f === s ? " on" : "")} onClick={() => setF(s)}>{s === "הכל" ? "כל המסמכים" : s}</button>)}</div>
    {rows.length === 0 ? <div className="card"><Empty icon={<Files size={28} />} title="אין מסמכים" sub="מסמכים נוצרים אוטומטית עם התקדמות עסקאות" /></div>
    : <div className="card" style={{ padding: 0 }}><table className="tbl">
      <thead><tr><th>מסמך</th><th>סוג</th><th>נכס</th><th>סטטוס</th><th>עודכן</th></tr></thead>
      <tbody>{rows.map((doc) => <tr key={doc.id} onClick={() => openDeal(doc.dealId)}>
        <td><div style={{ display: "flex", alignItems: "center", gap: 10 }}><div style={{ width: 32, height: 32, borderRadius: 9, background: tSoft(docTone(doc.status)), color: tVar(docTone(doc.status)), display: "grid", placeItems: "center" }}>{doc.status === "נחתם" ? <FileCheck size={15} /> : <FileText size={15} />}</div><span style={{ fontWeight: 600 }}>{doc.name}</span></div></td>
        <td style={{ color: "var(--soft)" }}>{doc.type}</td><td style={{ color: "var(--soft)" }}>{doc.prop ? doc.prop.addr : "—"}</td>
        <td><span className={"bdg b-" + docTone(doc.status)}>{doc.status}</span></td><td style={{ color: "var(--soft)" }}>{agoLbl(doc.updatedAgo)}</td></tr>)}</tbody></table></div>}
  </>;
}

/* ════════════════════ SETTINGS ════════════════════ */
function SettingsView({ theme, setTheme, users, onAddUser }) {
  const [n, setN] = useState({ leads: true, deals: true, tasks: true, weekly: false });
  const tg = (k) => setN({ ...n, [k]: !n[k] });
  return <div className="row2" style={{ gridTemplateColumns: "1fr 1.3fr" }}>
    <div>
      <div className="card" style={{ marginBottom: 16 }}><h3><UserCog size={16} color="var(--brand)" />פרופיל וסוכנות</h3>
        <div style={{ display: "flex", alignItems: "center", gap: 13, margin: "14px 0" }}><div className="ava" style={{ width: 50, height: 50, fontSize: 18, background: "linear-gradient(135deg,var(--brand),#60A5FA)" }}>רל</div>
          <div><div style={{ fontWeight: 700, fontSize: 15 }}>רועי לוי</div><div style={{ fontSize: 12, color: "var(--soft)" }}>מנהל משרד · נדל״ן פרו</div></div></div>
        <div className="kv"><span className="k">שם הסוכנות</span><span className="v">נדל״ן פרו</span></div>
        <div className="kv"><span className="k">טלפון משרד</span><span className="v">03-7100200</span></div>
        <div className="kv"><span className="k">מנוי</span><span className="v"><span className="bdg b-brand">Premium</span></span></div></div>
      <div className="card"><h3><Bell size={16} color="var(--brand)" />התראות</h3><div className="sub">בחר אילו עדכונים לקבל</div>
        {[["leads", "לידים חדשים"], ["deals", "עדכוני עסקאות"], ["tasks", "תזכורות משימות"], ["weekly", "סיכום שבועי"]].map(([k, l]) =>
          <div className="setrow" key={k}><span style={{ fontSize: 13.5 }}>{l}</span><button className={"tgl" + (n[k] ? " on" : "")} onClick={() => tg(k)}><i /></button></div>)}</div>
    </div>
    <div>
      <div className="card" style={{ marginBottom: 16 }}><h3><Sun size={16} color="var(--brand)" />תצוגה</h3>
        <div className="setrow"><div><div style={{ fontWeight: 600, fontSize: 13.5 }}>מצב כהה</div><div style={{ fontSize: 12, color: "var(--soft)" }}>החלף בין ערכת בהירה לכהה</div></div>
          <button className={"tgl" + (theme === "dark" ? " on" : "")} onClick={() => setTheme(theme === "dark" ? "light" : "dark")}><i /></button></div></div>
      <div className="card"><div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}><h3><Users size={16} color="var(--brand)" />צוות ומשתמשים</h3>
        <button className="btn sm" onClick={onAddUser}><Plus size={13} />משתמש חדש</button></div>
        <table className="tbl" style={{ marginTop: 12 }}><thead><tr><th>משתמש</th><th>סוג</th><th>טלפון</th><th>סטטוס</th></tr></thead>
          <tbody>{users.map((u) => <tr key={u.id} style={{ cursor: "default" }}>
            <td><div style={{ display: "flex", alignItems: "center", gap: 9 }}><Avatar id={u.id} name={u.name} size={30} />{u.name}</div></td>
            <td style={{ color: "var(--soft)" }}>{u.type}</td><td style={{ color: "var(--soft)" }}>{u.phone}</td>
            <td><span className={"bdg b-" + (u.status === "פעיל" ? "green" : "amber")}>{u.status}</span></td></tr>)}</tbody></table></div>
    </div>
  </div>;
}

/* ════════════════════ FACEBOOK PUBLISH ════════════════════ */
function FacebookPublish({ p, db, onClose, toast }) {
  const [sel, setSel] = useState(p ? p.id : (db.props[0] && db.props[0].id));
  const prop = p || byId(db.props, sel);
  if (!prop) return null;
  const feats = [prop.elevator && "מעלית", prop.parking && "חניה", prop.balcony && "מרפסת", prop.mamad && "ממ״ד"].filter(Boolean).join(" · ");
  const head = `🏡 למכירה ב${prop.city}: ${prop.type} ${prop.rooms} חד׳ ב-${money(prop.price)}`;
  const body = `${prop.addr}, ${prop.nbh} | ${prop.size} מ״ר, קומה ${prop.floor}\n${feats || "נכס מטופח"} · ${prop.cond}\nהזדמנות מצוינת! פנו עוד היום לתיאום צפייה 📞\n#נדלן #${prop.city.replace(/ /g, "")} #דירהלמכירה`;
  const done = (m) => { toast(m); onClose(); };
  return <><div className="ov" onClick={onClose} /><div className="modal" style={{ width: 500 }}>
    <h2><span style={{ display: "flex", alignItems: "center", gap: 9 }}><Facebook size={18} color="#1877F2" />פרסום בפייסבוק</span><button onClick={onClose}><X size={19} /></button></h2>
    {!p && <div className="fld"><label>בחר נכס</label><select value={sel} onChange={(e) => setSel(+e.target.value)}>{db.props.map((x) => <option key={x.id} value={x.id}>{x.addr}, {x.city}</option>)}</select></div>}
    <div style={{ fontSize: 12, color: "var(--soft)", margin: "4px 0 10px" }}>תצוגה מקדימה — נוצר אוטומטית:</div>
    <div className="fbpost">
      <div className="fh"><div className="fa">נ</div><div><div style={{ fontWeight: 700, fontSize: 13.5 }}>נדל״ן פרו</div><div className="ft2">עכשיו · 🌐</div></div></div>
      <div className="fbody">{head}{"\n\n"}{body}</div>
      <div className="fimg"><img src={`https://picsum.photos/seed/nx${prop.photoSeed}/520/280`} alt="" /></div>
    </div>
    <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
      <button className="btn" style={{ flex: 1, justifyContent: "center", background: "#1877F2", boxShadow: "0 4px 12px rgba(24,119,242,.3)" }} onClick={() => done("הפוסט פורסם בפייסבוק ✓")}><Send size={14} />פרסם עכשיו</button>
      <button className="btn gh" onClick={() => done("הפרסום תוזמן")}><Clock size={14} />תזמן</button>
      <button className="btn gh" onClick={() => done("נשמר כטיוטה")}><FileText size={14} />טיוטה</button>
    </div>
  </div></>;
}

/* ════════════════════ DOC SEND (offer / exclusivity) ════════════════════ */
function DocSend({ mode, db, onClose, toast }) {
  const [sel, setSel] = useState(db.props[0] && db.props[0].id);
  const prop = byId(db.props, sel);
  if (!prop) return null;
  const owner = byId(db.contacts, prop.ownerId);
  const offer = Math.round(prop.price * 0.96 / 1000) * 1000;
  const txt = mode === "offer"
    ? `הצעת מחיר — ${prop.addr}, ${prop.city}\nלכבוד ${owner.name},\nבשם לקוחי, הריני להגיש הצעת מחיר עבור הנכס:\n• נכס: ${prop.type}, ${prop.rooms} חד׳, ${prop.size} מ״ר\n• מחיר מבוקש: ${money(prop.price)}\n• הצעת מחיר: ${money(offer)}\n• תוקף ההצעה: 7 ימים\nאשמח לקדם לעבר חתימה. בברכה, רועי לוי | נדל״ן פרו`
    : `הסכם בלעדיות — ${prop.addr}, ${prop.city}\nלכבוד ${owner.name},\nמצ״ב תמצית הסכם בלעדיות לשיווק הנכס:\n• נכס: ${prop.type}, ${prop.rooms} חד׳, ${prop.size} מ״ר\n• מחיר מבוקש: ${money(prop.price)}\n• תקופת בלעדיות: 3 חודשים\n• עמלת תיווך: 2% בתוספת מע״מ\nלאישור וחתימה דיגיטלית. בברכה, רועי לוי | נדל״ן פרו`;
  return <><div className="ov" onClick={onClose} /><div className="modal">
    <h2><span style={{ display: "flex", alignItems: "center", gap: 9 }}>{mode === "offer" ? <FileText size={18} color="var(--brand)" /> : <FileSignature size={18} color="var(--brand)" />}{mode === "offer" ? "שליחת הצעת מחיר" : "הסכם בלעדיות"}</span><button onClick={onClose}><X size={19} /></button></h2>
    <div className="fld"><label>בחר נכס</label><select value={sel} onChange={(e) => setSel(+e.target.value)}>{db.props.map((x) => <option key={x.id} value={x.id}>{x.addr}, {x.city}</option>)}</select></div>
    <div className="copybox">{txt}</div>
    <div style={{ display: "flex", gap: 8, marginTop: 14 }}>
      <button className="btn" style={{ flex: 1, justifyContent: "center" }} onClick={() => { toast(mode === "offer" ? "הצעת המחיר נשלחה לחתימה" : "הסכם הבלעדיות נשלח לחתימה"); onClose(); }}><Send size={14} />שלח לחתימה</button>
      <button className="btn gh" onClick={() => copyText(txt, toast)}><Copy size={14} />העתק</button>
    </div>
  </div></>;
}

/* ════════════════════ QUICK ADD MODALS ════════════════════ */
function AddUser({ onClose, onSave }) {
  const [f, setF] = useState({ name: "", phone: "", email: "", type: "מתווך" });
  const s = (k) => (e) => setF({ ...f, [k]: e.target.value });
  return <><div className="ov" onClick={onClose} /><div className="modal">
    <h2><span style={{ display: "flex", alignItems: "center", gap: 9 }}><UserCog size={18} color="var(--brand)" />משתמש חדש</span><button onClick={onClose}><X size={19} /></button></h2>
    <div className="fld"><label>שם מלא</label><input value={f.name} onChange={s("name")} placeholder="ישראל ישראלי" /></div>
    <div className="f2"><div className="fld"><label>טלפון</label><input value={f.phone} onChange={s("phone")} placeholder="050-0000000" /></div>
      <div className="fld"><label>אימייל</label><input value={f.email} onChange={s("email")} placeholder="name@mail.com" /></div></div>
    <div className="fld"><label>סוג משתמש</label><select value={f.type} onChange={s("type")}>{USER_TYPES.map((x) => <option key={x}>{x}</option>)}</select></div>
    <div style={{ fontSize: 11.5, color: "var(--faint)", marginBottom: 14, display: "flex", alignItems: "center", gap: 6 }}><Send size={12} />עם היצירה תישלח הזמנה אוטומטית להצטרפות למערכת.</div>
    <button className="btn" style={{ width: "100%", justifyContent: "center" }} onClick={() => { if (!f.name) return; onSave({ id: Date.now(), name: f.name, type: f.type, phone: f.phone || "—", email: f.email || "—", status: "ממתין" }); }}>צור ושלח הזמנה</button>
  </div></>;
}
function AddProperty({ onClose, onSave, db }) {
  const [f, setF] = useState({ addr: "", city: CITY_LIST[0], type: "דירה", rooms: "4", size: "95", price: "2400000", status: "זמין" });
  const s = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const owner = db.contacts.find((c) => c.kind === "מוכר");
  return <><div className="ov" onClick={onClose} /><div className="modal">
    <h2><span style={{ display: "flex", alignItems: "center", gap: 9 }}><Building2 size={18} color="var(--brand)" />נכס חדש</span><button onClick={onClose}><X size={19} /></button></h2>
    <div className="fld"><label>כתובת</label><input value={f.addr} onChange={s("addr")} placeholder="הרצל 25" /></div>
    <div className="f2"><div className="fld"><label>עיר</label><select value={f.city} onChange={s("city")}>{CITY_LIST.map((x) => <option key={x}>{x}</option>)}</select></div>
      <div className="fld"><label>סוג</label><select value={f.type} onChange={s("type")}>{["דירה", "דירת גן", "פנטהאוז", "דופלקס", "בית פרטי"].map((x) => <option key={x}>{x}</option>)}</select></div></div>
    <div className="f3"><div className="fld"><label>חדרים</label><input value={f.rooms} onChange={s("rooms")} /></div>
      <div className="fld"><label>שטח (מ״ר)</label><input value={f.size} onChange={s("size")} /></div>
      <div className="fld"><label>מחיר</label><input value={f.price} onChange={s("price")} /></div></div>
    <div className="fld"><label>סטטוס</label><select value={f.status} onChange={s("status")}>{["זמין", "בלעדיות"].map((x) => <option key={x}>{x}</option>)}</select></div>
    <button className="btn" style={{ width: "100%", justifyContent: "center" }} onClick={() => { if (!f.addr) return;
      const rooms = Number(f.rooms) || 3, size = Number(f.size) || 80, excl = f.status === "בלעדיות";
      onSave({ id: Date.now(), addr: f.addr, city: f.city, nbh: (CITIES[f.city] || ["מרכז"])[0], type: f.type, rooms, size, floor: 2, floors: 6, elevator: true, parking: true, balcony: true, mamad: true, yearBuilt: 2015, cond: "שמור", price: Number(f.price) || 2000000, status: f.status, ownerId: owner ? owner.id : 51, agentId: 1, listedAgo: 0, views: 0, photoSeed: Math.floor(Math.random() * 900) + 200, exclusive: excl, exclEndDays: excl ? 90 : null }); }}>הוסף למאגר</button>
  </div></>;
}
function AddDeal({ onClose, onSave, db }) {
  const buyers = db.contacts.filter((c) => c.kind === "קונה");
  const [f, setF] = useState({ buyerId: buyers[0] && buyers[0].id, propId: db.props[0] && db.props[0].id, stage: "פגישה" });
  const s = (k) => (e) => setF({ ...f, [k]: k === "stage" ? e.target.value : +e.target.value });
  return <><div className="ov" onClick={onClose} /><div className="modal">
    <h2><span style={{ display: "flex", alignItems: "center", gap: 9 }}><KanbanSquare size={18} color="var(--brand)" />עסקה חדשה</span><button onClick={onClose}><X size={19} /></button></h2>
    <div className="fld"><label>קונה</label><select value={f.buyerId} onChange={s("buyerId")}>{buyers.map((b) => <option key={b.id} value={b.id}>{b.name}</option>)}</select></div>
    <div className="fld"><label>נכס</label><select value={f.propId} onChange={s("propId")}>{db.props.map((p) => <option key={p.id} value={p.id}>{p.addr}, {p.city} · {money(p.price)}</option>)}</select></div>
    <div className="fld"><label>שלב</label><select value={f.stage} onChange={s("stage")}>{DEAL_STAGES.map((x) => <option key={x.key} value={x.key}>{x.label}</option>)}</select></div>
    <button className="btn" style={{ width: "100%", justifyContent: "center" }} onClick={() => { const p = byId(db.props, f.propId);
      onSave({ id: Date.now(), buyerId: f.buyerId, propId: f.propId, agentId: 1, stage: f.stage, asking: p ? p.price : 2000000, offer: null, close: null, commPct: 2, createdAgo: 0, closeInDays: 30, closedAgo: null, offers: [], tx: { mortgage: { status: "לא התחיל", offers: [], missing: [] }, appraisal: { status: "לא הוזמן" }, legal: { contractStatus: "טיוטה" } }, docs: [], proIds: [] }); }}>צור עסקה</button>
  </div></>;
}
function AddTask({ onClose, onSave }) {
  const [f, setF] = useState({ title: "", type: "שיחה", priority: "בינונית", dueIn: "0" });
  const s = (k) => (e) => setF({ ...f, [k]: e.target.value });
  return <><div className="ov" onClick={onClose} /><div className="modal">
    <h2><span style={{ display: "flex", alignItems: "center", gap: 9 }}><CheckSquare size={18} color="var(--brand)" />משימה חדשה</span><button onClick={onClose}><X size={19} /></button></h2>
    <div className="fld"><label>כותרת</label><input value={f.title} onChange={s("title")} placeholder="לחזור ללקוח..." /></div>
    <div className="f3"><div className="fld"><label>סוג</label><select value={f.type} onChange={s("type")}>{["שיחה", "פגישה", "מסמך", "מעקב"].map((x) => <option key={x}>{x}</option>)}</select></div>
      <div className="fld"><label>עדיפות</label><select value={f.priority} onChange={s("priority")}>{["גבוהה", "בינונית", "נמוכה"].map((x) => <option key={x}>{x}</option>)}</select></div>
      <div className="fld"><label>בעוד (ימים)</label><input value={f.dueIn} onChange={s("dueIn")} /></div></div>
    <button className="btn" style={{ width: "100%", justifyContent: "center" }} onClick={() => { if (!f.title) return; onSave({ id: Date.now(), title: f.title, type: f.type, priority: f.priority, dueIn: Number(f.dueIn) || 0, contactId: null, dealId: null, auto: false, done: false }); }}>הוסף משימה</button>
  </div></>;
}

/* ════════════════════ FAB MENU ════════════════════ */
function FabMenu({ open, setOpen, onAction }) {
  const items = [
    ["lead", "ליד חדש", <UserPlus size={15} />], ["prop", "נכס חדש", <Building2 size={15} />],
    ["user", "משתמש חדש", <UserCog size={15} />], ["deal", "עסקה חדשה", <KanbanSquare size={15} />],
    ["task", "משימה חדשה", <CheckSquare size={15} />], ["fb", "פרסום בפייסבוק", <Facebook size={15} />],
    ["offer", "שליחת הצעת מחיר", <FileText size={15} />], ["excl", "הסכם בלעדיות", <FileSignature size={15} />],
  ];
  return <>
    {open && <div style={{ position: "fixed", inset: 0, zIndex: 54 }} onClick={() => setOpen(false)} />}
    <div className="fabwrap">
      {open && <div className="fabmenu">{items.map(([k, l, ic], i) => <button className="fabitem" key={k} style={{ animationDelay: (items.length - i) * 0.03 + "s" }} onClick={() => { onAction(k); setOpen(false); }}><span className="fi">{ic}</span>{l}</button>)}</div>}
      <button className="fab" onClick={() => setOpen(!open)} title="פעולות מהירות" style={{ transform: open ? "rotate(45deg)" : "none" }}><Plus size={24} /></button>
    </div>
  </>;
}

/* ════════════════════ TOASTS ════════════════════ */
/* ════════════════════ COMMAND BAR (⌘K) ════════════════════ */
function CommandBar({ db, go, onContact, onProp, onDeal, onQuick, close }) {
  const [q, setQ] = useState("");
  const [sel, setSel] = useState(0);
  const inputRef = useRef(null);
  useEffect(() => { inputRef.current && inputRef.current.focus(); }, []);

  const ql = q.trim().toLowerCase();
  const has = (s) => !ql || (s || "").toString().toLowerCase().includes(ql);
  const bg = (t) => t === "gray" ? "var(--surface2)" : tSoft(t);
  const fg = (t) => t === "gray" ? "var(--soft)" : tVar(t);

  const actions = [
    { id: "a-lead", grp: "פעולות מהירות", icon: <UserPlus size={15} />, tone: "blue", label: "ליד חדש", run: () => onQuick("lead") },
    { id: "a-prop", grp: "פעולות מהירות", icon: <Building2 size={15} />, tone: "indigo", label: "נכס חדש", run: () => onQuick("prop") },
    { id: "a-deal", grp: "פעולות מהירות", icon: <KanbanSquare size={15} />, tone: "amber", label: "עסקה חדשה", run: () => onQuick("deal") },
    { id: "a-task", grp: "פעולות מהירות", icon: <CheckSquare size={15} />, tone: "green", label: "משימה חדשה", run: () => onQuick("task") },
    { id: "a-fb", grp: "פעולות מהירות", icon: <Megaphone size={15} />, tone: "blue", label: "פרסום נכס", run: () => onQuick("fb") },
    { id: "a-offer", grp: "פעולות מהירות", icon: <FileText size={15} />, tone: "purple", label: "שליחת הצעת מחיר", run: () => onQuick("offer") },
    { id: "a-excl", grp: "פעולות מהירות", icon: <FileSignature size={15} />, tone: "purple", label: "שליחת הסכם בלעדיות", run: () => onQuick("excl") },
    { id: "a-user", grp: "פעולות מהירות", icon: <UserCog size={15} />, tone: "cyan", label: "משתמש חדש", run: () => onQuick("user") },
  ].filter((a) => has(a.label));

  const navTargets = [
    ["dash", "דשבורד", <LayoutDashboard size={15} />], ["leads", "לידים", <Users size={15} />], ["deals", "עסקאות", <KanbanSquare size={15} />],
    ["props", "נכסים", <Building2 size={15} />], ["match", "התאמות", <Target size={15} />], ["comms", "תקשורת", <MessageSquare size={15} />],
    ["docs", "מסמכים", <Files size={15} />], ["owners", "בעלי נכסים", <KeyRound size={15} />], ["pros", "בעלי מקצוע", <Briefcase size={15} />],
    ["tasks", "משימות", <CheckSquare size={15} />], ["reports", "דוחות", <BarChart3 size={15} />], ["settings", "הגדרות", <Settings size={15} />],
  ].filter(([, t]) => has(t)).map(([k, t, i]) => ({ id: "n-" + k, grp: "מעבר למסך", icon: i, tone: "gray", label: t, run: () => go(k) }));

  let ents = [];
  if (ql) {
    const cs = db.contacts.filter((c) => has(c.name) || has(c.phone)).slice(0, 5)
      .map((c) => ({ id: "c-" + c.id, grp: "אנשי קשר", icon: <Avatar id={c.id} name={c.name} size={26} font={10} />, tone: "blue", label: c.name, meta: c.kind + " · " + (c.phone || ""), run: () => onContact(c.id) }));
    const ps = db.props.filter((p) => has(p.addr) || has(p.city) || has(p.nbh)).slice(0, 5)
      .map((p) => ({ id: "p-" + p.id, grp: "נכסים", icon: <Home size={15} />, tone: "indigo", label: p.addr + ", " + p.city, meta: p.rooms + " חד׳ · " + money(p.price), run: () => onProp(p.id) }));
    const ds = db.deals.filter((d) => { const b = byId(db.contacts, d.buyerId), pr = byId(db.props, d.propId); return has(b && b.name) || has(pr && pr.addr); }).slice(0, 5)
      .map((d) => { const b = byId(db.contacts, d.buyerId), pr = byId(db.props, d.propId); return { id: "d-" + d.id, grp: "עסקאות", icon: <KanbanSquare size={15} />, tone: "amber", label: (pr ? pr.addr : "עסקה") + (b ? " · " + b.name : ""), meta: d.stage + " · " + money(dealValue(d)), run: () => onDeal(d.id) }; });
    ents = [...cs, ...ps, ...ds];
  }

  const all = ql ? [...ents, ...actions, ...navTargets] : [...actions, ...navTargets];
  const clamped = Math.min(sel, Math.max(0, all.length - 1));
  const run = (i) => { const it = all[i]; if (it) { it.run(); close(); } };
  const onKey = (e) => {
    if (e.key === "ArrowDown") { e.preventDefault(); setSel((s) => Math.min(all.length - 1, s + 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setSel((s) => Math.max(0, s - 1)); }
    else if (e.key === "Enter") { e.preventDefault(); run(clamped); }
    else if (e.key === "Escape") { e.preventDefault(); close(); }
  };

  const groups = [];
  all.forEach((it) => { let g = groups.find((x) => x.grp === it.grp); if (!g) { g = { grp: it.grp, items: [] }; groups.push(g); } g.items.push(it); });
  let idx = -1;

  return <><div className="ov" onClick={close} style={{ zIndex: 80 }} /><div className="cmdk" onKeyDown={onKey}>
    <div className="cmdhead"><Search size={17} color="var(--faint)" /><input ref={inputRef} value={q} onChange={(e) => { setQ(e.target.value); setSel(0); }} placeholder="חפש לקוח, נכס או עסקה — או הקלד פעולה..." /><kbd>ESC</kbd></div>
    <div className="cmdbody">
      {all.length === 0 && <div className="cmdempty">לא נמצאו תוצאות עבור "{q}"</div>}
      {groups.map((g) => <div className="cmdgrp" key={g.grp}><div className="cmdgl">{g.grp}</div>
        {g.items.map((it) => { idx++; const me = idx; return <button key={it.id} className={"cmdrow" + (me === clamped ? " sel" : "")} onMouseEnter={() => setSel(me)} onClick={() => run(me)}>
          <span className="cmdic" style={{ background: bg(it.tone), color: fg(it.tone) }}>{it.icon}</span>
          <span className="cmdlbl">{it.label}{it.meta && <small>{it.meta}</small>}</span>
          <ChevronLeft size={14} className="cmdgo" /></button>; })}</div>)}
    </div>
    <div className="cmdfoot"><span><kbd>↑</kbd><kbd>↓</kbd> ניווט</span><span><kbd>↵</kbd> בחירה</span><span><kbd>esc</kbd> סגירה</span></div>
  </div></>;
}

function ToastItem({ t, remove }) {
  useEffect(() => { const id = setTimeout(() => remove(t.id), 2800); return () => clearTimeout(id); }, []);
  const tone = t.type === "warn" ? "amber" : t.type === "info" ? "blue" : "green";
  const Ic = t.type === "warn" ? AlertCircle : t.type === "info" ? Bell : CheckCircle2;
  return <div className="toast2"><div className="tk" style={{ background: tSoft(tone), color: tVar(tone) }}><Ic size={16} /></div>{t.msg}</div>;
}

/* ════════════════════ APP ════════════════════ */
/* ════════════════════ FIELD MODE ("התחל יום עבודה") ════════════════════ */
function FieldMode({ db, onClose, openContact, toast }) {
  const { tasks, contacts, props } = db;
  const today = tasks.filter((t) => !t.done && t.dueIn <= 0 && (t.type === "פגישה" || t.type === "שיחה"))
    .sort((a, b) => a.dueIn - b.dueIn);
  const [idx, setIdx] = useState(0);
  const cur = today[idx];
  const c = cur ? contacts.find((x) => x.id === cur.contactId) : null;
  const dealProp = cur && cur.dealId ? (() => { const d = db.deals.find((x) => x.id === cur.dealId); return d ? props.find((p) => p.id === d.propId) : null; })() : null;

  // Nearby properties: same city as the contact's preferred areas
  const nearby = c && c.areas ? props.filter((p) => c.areas.includes(p.city) && p.status !== "נמכר").slice(0, 5) : [];

  if (today.length === 0) {
    return <div className="ov" onClick={onClose}><div className="modal" onClick={(e) => e.stopPropagation()}>
      <h2><span style={{ display: "flex", alignItems: "center", gap: 9 }}><Rocket size={18} color="var(--brand)" />מצב שטח</span><button onClick={onClose}><X size={19} /></button></h2>
      <Empty icon={<CheckCircle2 size={32} />} title="אין פגישות או שיחות להיום" sub="כל המשימות הושלמו" />
      <button className="btn" style={{ width: "100%", justifyContent: "center", marginTop: 8 }} onClick={onClose}>סגור</button>
    </div></div>;
  }

  return <div className="ov" onClick={onClose}><div className="modal" style={{ width: 540, maxWidth: "94vw" }} onClick={(e) => e.stopPropagation()}>
    <h2>
      <span style={{ display: "flex", alignItems: "center", gap: 9 }}><Rocket size={18} color="var(--brand)" />מצב שטח</span>
      <span style={{ fontSize: 12, color: "var(--soft)", fontWeight: 500 }}>{idx + 1} / {today.length}</span>
      <button onClick={onClose}><X size={19} /></button>
    </h2>

    <div style={{ background: "var(--brand-soft)", borderRadius: 14, padding: 16, marginBottom: 14 }}>
      <div style={{ fontSize: 11, color: "var(--brand-ink)", fontWeight: 700, letterSpacing: 1, marginBottom: 6 }}>הפעולה הבאה שלך</div>
      <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 4 }}>{cur.title}</div>
      <div style={{ fontSize: 12.5, color: "var(--soft)" }}>{cur.type} · {cur.dueIn < 0 ? `באיחור ${-cur.dueIn} ימים` : cur.dueIn === 0 ? "היום" : "מחר"}</div>
    </div>

    {c && (
      <div className="card" style={{ padding: 14, marginBottom: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
          <Avatar id={c.id} name={c.name} size={44} />
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 700, fontSize: 15 }}>{c.name}</div>
            <div style={{ fontSize: 12, color: "var(--soft)" }}>{c.phone} · {c.email || "—"}</div>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
          <a className="btn" style={{ justifyContent: "center", background: "#25D366" }} href={`https://wa.me/972${(c.phone || "").replace(/\D/g, "").replace(/^0/, "")}`} target="_blank" rel="noreferrer"><MessageCircle size={14} />וואטסאפ</a>
          <a className="btn gh sm" style={{ justifyContent: "center" }} href={`tel:${c.phone || ""}`}><Phone size={14} />חיוג</a>
        </div>
      </div>
    )}

    {dealProp && (
      <div className="card" style={{ padding: 14, marginBottom: 12 }}>
        <div style={{ fontSize: 11, color: "var(--soft)", fontWeight: 700, marginBottom: 6 }}>נכס בעסקה</div>
        <div style={{ fontWeight: 700, fontSize: 13.5 }}>{dealProp.addr}, {dealProp.city}</div>
        <div style={{ fontSize: 12, color: "var(--soft)", marginTop: 2 }}>{dealProp.rooms} חד׳ · {dealProp.size} מ״ר · {money(dealProp.price)}</div>
        <a className="btn gh sm" style={{ justifyContent: "center", marginTop: 8, width: "100%" }}
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(dealProp.addr + " " + dealProp.city)}`} target="_blank" rel="noreferrer">
          <MapPin size={13} />ניווט בגוגל מפות
        </a>
      </div>
    )}

    {nearby.length > 0 && (
      <div className="card" style={{ padding: 14, marginBottom: 12 }}>
        <div style={{ fontSize: 11, color: "var(--soft)", fontWeight: 700, marginBottom: 8 }}>נכסים באזור המועדף של הלקוח</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
          {nearby.map((p) => (
            <div key={p.id} style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 8px", background: "var(--surface2)", borderRadius: 8, fontSize: 12 }}>
              <span style={{ flex: 1, fontWeight: 600 }}>{p.addr}, {p.city}</span>
              <span style={{ fontSize: 11, color: "var(--soft)" }}>{p.rooms} חד׳ · {money(p.price)}</span>
            </div>
          ))}
        </div>
      </div>
    )}

    <div style={{ display: "flex", gap: 6 }}>
      <button className="btn gh sm" disabled={idx === 0} onClick={() => setIdx((i) => Math.max(0, i - 1))} style={{ padding: "9px 14px" }}><ChevronRight size={14} />הקודם</button>
      <button className="btn" style={{ flex: 1, justifyContent: "center", padding: "9px 14px" }}
        onClick={() => { toast("המשימה סומנה כהושלמה"); if (idx < today.length - 1) setIdx(idx + 1); else onClose(); }}>
        <CheckCircle2 size={14} />סיימתי · הבא
      </button>
    </div>
  </div></div>;
}

/* ════════════════════ SMART CALENDAR ════════════════════ */
function CalendarView({ db, openContact, toast }) {
  const { tasks, contacts, deals } = db;
  const [mode, setMode] = useState("week"); // day | week | month
  const [offset, setOffset] = useState(0); // days from today

  const todayMid = new Date(); todayMid.setHours(0, 0, 0, 0);
  // Build event list from tasks (meetings/calls/document) + viewings
  const events = useMemo(() => {
    const out = [];
    tasks.forEach((t) => {
      const c = contacts.find((x) => x.id === t.contactId);
      const tone = t.type === "פגישה" ? "indigo" : t.type === "שיחה" ? "green" : t.type === "מסמך" ? "amber" : "blue";
      out.push({ id: "t" + t.id, dueIn: t.dueIn, title: t.title, type: t.type, tone, done: t.done, contact: c, taskId: t.id });
    });
    return out.sort((a, b) => a.dueIn - b.dueIn);
  }, [tasks, contacts]);

  const inRange = (e, fromDay, toDay) => e.dueIn >= fromDay && e.dueIn <= toDay;

  let view = null;
  if (mode === "day") {
    const day = offset;
    const items = events.filter((e) => e.dueIn === day);
    const date = new Date(todayMid); date.setDate(date.getDate() + day);
    view = <div className="card">
      <h3><Calendar size={15} color="var(--brand)" />{date.toLocaleDateString("he-IL", { weekday: "long", day: "numeric", month: "long" })}</h3>
      <div className="sub">{items.length} אירועים</div>
      {items.length === 0 && <Empty icon={<Calendar size={26} />} title="אין אירועים ליום זה" />}
      {items.map((e) => <div key={e.id} style={{ display: "flex", alignItems: "center", gap: 11, padding: "12px 0", borderBottom: "1px solid var(--line2)" }}>
        <div style={{ width: 38, height: 38, borderRadius: 11, background: tSoft(e.tone), color: tVar(e.tone), display: "grid", placeItems: "center" }}>
          {e.type === "פגישה" ? <Calendar size={17} /> : e.type === "שיחה" ? <Phone size={17} /> : <FileText size={17} />}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 600, fontSize: 13.5, textDecoration: e.done ? "line-through" : "none", color: e.done ? "var(--soft)" : "var(--ink)" }}>{e.title}</div>
          {e.contact && <div style={{ fontSize: 11.5, color: "var(--soft)", cursor: "pointer" }} onClick={() => openContact(e.contact.id)}>{e.contact.name} · {e.contact.phone}</div>}
        </div>
        <span className={"bdg b-" + e.tone}>{e.type}</span>
      </div>)}
    </div>;
  } else if (mode === "week") {
    // 7-day grid starting at the offset week
    const weekStart = offset * 7;
    const days = Array.from({ length: 7 }).map((_, i) => weekStart + i);
    view = <div className="cal-week">
      {days.map((d) => {
        const date = new Date(todayMid); date.setDate(date.getDate() + d);
        const items = events.filter((e) => e.dueIn === d);
        const isToday = d === 0;
        return <div key={d} className={"cal-day" + (isToday ? " on" : "")}>
          <div className="cal-day-h">
            <strong>{date.toLocaleDateString("he-IL", { weekday: "short" })}</strong>
            <span>{date.getDate()}/{date.getMonth() + 1}</span>
          </div>
          <div className="cal-day-events">
            {items.length === 0 && <div className="cal-empty">—</div>}
            {items.slice(0, 4).map((e) => (
              <div key={e.id} className="cal-ev" style={{ background: tSoft(e.tone), color: tVar(e.tone), borderInlineStart: `2px solid var(--${e.tone})` }} title={e.title + (e.contact ? " · " + e.contact.name : "")}>
                {e.title}
              </div>
            ))}
            {items.length > 4 && <div style={{ fontSize: 10, color: "var(--soft)", marginTop: 3 }}>+{items.length - 4} נוספים</div>}
          </div>
        </div>;
      })}
    </div>;
  } else { // month
    const monthOffset = offset;
    const first = new Date(todayMid.getFullYear(), todayMid.getMonth() + monthOffset, 1);
    const lastDay = new Date(first.getFullYear(), first.getMonth() + 1, 0).getDate();
    const startWeekday = first.getDay(); // 0=Sun
    const cells = [];
    for (let i = 0; i < startWeekday; i++) cells.push(null);
    for (let dn = 1; dn <= lastDay; dn++) {
      const date = new Date(first.getFullYear(), first.getMonth(), dn);
      const diff = Math.round((date - todayMid) / 86400000);
      const items = events.filter((e) => e.dueIn === diff);
      cells.push({ dn, items, isToday: diff === 0, diff });
    }
    view = <div>
      <div className="cal-month-h">{first.toLocaleDateString("he-IL", { month: "long", year: "numeric" })}</div>
      <div className="cal-month">
        {["א", "ב", "ג", "ד", "ה", "ו", "ש"].map((d) => <div key={d} className="cal-mh">{d}</div>)}
        {cells.map((c, i) => c ? (
          <div key={i} className={"cal-mc" + (c.isToday ? " on" : "")}>
            <div className="cal-mc-d">{c.dn}</div>
            {c.items.slice(0, 3).map((e) => <div key={e.id} className="cal-mc-ev" style={{ background: tVar(e.tone) }} title={e.title} />)}
            {c.items.length > 3 && <div style={{ fontSize: 9, color: "var(--soft)" }}>+{c.items.length - 3}</div>}
          </div>
        ) : <div key={i} className="cal-mc empty" />)}
      </div>
    </div>;
  }

  return <>
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14, flexWrap: "wrap" }}>
      <div className="chips">
        {[["day", "יום"], ["week", "שבוע"], ["month", "חודש"]].map(([k, t]) => (
          <button key={k} className={"chip" + (mode === k ? " on" : "")} onClick={() => { setMode(k); setOffset(0); }}>{t}</button>
        ))}
      </div>
      <div style={{ display: "flex", gap: 6, alignItems: "center", marginInlineStart: "auto" }}>
        <button className="ib" onClick={() => setOffset((o) => o - 1)}><ChevronRight size={15} /></button>
        <button className="btn gh sm" onClick={() => setOffset(0)}>היום</button>
        <button className="ib" onClick={() => setOffset((o) => o + 1)}><ChevronLeft size={15} /></button>
      </div>
    </div>
    {view}
    <div className="card" style={{ marginTop: 14 }}>
      <h3 style={{ fontSize: 13.5 }}><Calendar size={14} color="var(--brand)" />הסבר צבעים</h3>
      <div style={{ display: "flex", gap: 14, flexWrap: "wrap", fontSize: 11.5, marginTop: 6 }}>
        <span><i style={{ display: "inline-block", width: 9, height: 9, borderRadius: 3, background: "var(--indigo)", marginInlineEnd: 5 }} />פגישה</span>
        <span><i style={{ display: "inline-block", width: 9, height: 9, borderRadius: 3, background: "var(--green)", marginInlineEnd: 5 }} />שיחה</span>
        <span><i style={{ display: "inline-block", width: 9, height: 9, borderRadius: 3, background: "var(--amber)", marginInlineEnd: 5 }} />מסמך</span>
        <span><i style={{ display: "inline-block", width: 9, height: 9, borderRadius: 3, background: "var(--blue)", marginInlineEnd: 5 }} />מעקב</span>
      </div>
    </div>
  </>;
}

/* ════════════════════ AI ASSISTANT ════════════════════ */
// Rule-based query parser. Maps natural Hebrew phrases to structured intents.
// When connected to a real backend, replace runQuery() with an LLM call — same interface.
function parseQuery(q) {
  const text = q.trim().toLowerCase();
  if (!text) return null;

  // Buyers for a property (street address or city mention)
  if (/(קונים?|לקוחות).+(נכס|רחוב|דירה|בנכס|לנכס)/.test(text) || /(לנכס|לדירה|לבית).+(ב|של)/.test(text)) {
    const streetMatch = text.match(/(?:רחוב|ברחוב)\s+([א-ת'"\s]+?)(?:\s+\d|\s*$)/);
    return { type: "buyers_for_property", street: streetMatch ? streetMatch[1].trim() : null, raw: q };
  }
  // Properties for a buyer (lead name)
  if (/(נכסים?|דירות?).+(ל|עבור)\s*([א-ת]+)/.test(text) && !text.includes("בנכס")) {
    return { type: "properties_for_buyer", raw: q };
  }
  // Hot leads
  if (/(לידים|לקוחות).*(חמים|חמות|חם|הכי\s+חם)/.test(text) || /(הכי\s+חמ)/.test(text)) {
    return { type: "hot_leads" };
  }
  // Stuck deals
  if (/(עסקאות|עסקה).*(תקוע|תקועות|לא\s+מתקדמ|עומדות)/.test(text)) {
    return { type: "stuck_deals" };
  }
  // Open deals count
  if (/(כמה|מספר).*(עסקאות|עסקה).*(פתוחות|פתוחה|פעיל)/.test(text)) {
    return { type: "open_deals_count" };
  }
  // Expiring exclusivity
  if (/(בלעדיות).*(פוקעת|מסתיימת|נגמרת|לקראת)/.test(text)) {
    return { type: "expiring_exclusivity" };
  }
  // Today summary
  if (/(סיכום|מה.+יש).*(היום|יומי)/.test(text) || /^(סיכום|מה\s+יש\s+לי\s+היום)$/.test(text)) {
    return { type: "today_summary" };
  }
  // Weekly summary
  if (/(סיכום|דוח).*(שבוע|שבועי)/.test(text)) {
    return { type: "weekly_summary" };
  }
  // Overdue tasks
  if (/(משימות|משימה).*(איחור|לא\s+הושלמ|פתוח)/.test(text)) {
    return { type: "overdue_tasks" };
  }
  // High-demand properties
  if (/(נכס|דירה).*(ביקוש|הרבה\s+קונים|התאמ)/.test(text)) {
    return { type: "high_demand_properties" };
  }
  // Fallback — keyword search
  return { type: "free_search", text };
}

function runQuery(intent, db) {
  if (!intent) return null;
  const { contacts, props, deals, tasks } = db;
  const buyers = contacts.filter((c) => c.kind === "קונה");
  const active = deals.filter(isActive);

  switch (intent.type) {
    case "buyers_for_property": {
      // Find property by street name if provided, else first available property
      let target = null;
      if (intent.street) {
        target = props.find((p) => p.addr.toLowerCase().includes(intent.street));
      }
      if (!target) target = props.filter((p) => p.status === "זמין").sort((a, b) => b.price - a.price)[0];
      if (!target) return { kind: "empty", title: "לא נמצא נכס מתאים" };
      const matched = buyers.map((b) => ({ b, m: matchScore(b, target) })).filter((x) => x.m && x.m.score >= 60).sort((a, b) => b.m.score - a.m.score).slice(0, 6);
      return { kind: "buyer_list", title: `קונים מתאימים ל-${target.addr}, ${target.city}`, items: matched.map((x) => ({ contact: x.b, score: x.m.score, prop: target })) };
    }
    case "properties_for_buyer": {
      // Find buyer by name in query
      const nameMatch = intent.raw.match(/(?:ל|עבור|של)\s+([א-ת]+(?:\s+[א-ת]+)?)/);
      let buyer = null;
      if (nameMatch) buyer = buyers.find((b) => b.name.includes(nameMatch[1].trim()));
      if (!buyer) buyer = buyers.filter((b) => b.budget).sort((a, b) => b.budget - a.budget)[0];
      if (!buyer) return { kind: "empty", title: "לא נמצא לקוח מתאים" };
      const matched = props.filter((p) => p.status === "זמין").map((p) => ({ p, m: matchScore(buyer, p) })).filter((x) => x.m && x.m.score >= 60).sort((a, b) => b.m.score - a.m.score).slice(0, 6);
      return { kind: "property_list", title: `נכסים ל-${buyer.name}`, items: matched.map((x) => ({ prop: x.p, score: x.m.score, contact: buyer })) };
    }
    case "hot_leads": {
      const scored = buyers.map((c) => ({ c, ...leadScore(c, db.acts || [], deals) }));
      const hot = scored.filter((x) => x.tier === "חם").sort((a, b) => b.score - a.score).slice(0, 8);
      return { kind: "buyer_list", title: "הלידים החמים ביותר", items: hot.map((x) => ({ contact: x.c, score: x.score })) };
    }
    case "stuck_deals": {
      const stuck = active.filter((d) => (d.stage === "מו\"מ" || d.stage === "צפייה") && d.createdAgo > 10);
      return { kind: "deal_list", title: `${stuck.length} עסקאות תקועות מעל 10 ימים`, items: stuck };
    }
    case "open_deals_count": {
      const byStage = {};
      active.forEach((d) => byStage[d.stage] = (byStage[d.stage] || 0) + 1);
      return { kind: "stats", title: `${active.length} עסקאות פעילות`, items: Object.entries(byStage).map(([k, v]) => ({ k, v })) };
    }
    case "expiring_exclusivity": {
      const exp = props.filter((p) => p.exclusive && p.exclEndDays != null && p.exclEndDays <= 30).sort((a, b) => a.exclEndDays - b.exclEndDays);
      return { kind: "property_list", title: `${exp.length} בלעדיות פוקעות תוך 30 ימים`, items: exp.map((p) => ({ prop: p, days: p.exclEndDays })) };
    }
    case "today_summary": {
      const overdue = tasks.filter((t) => !t.done && t.dueIn < 0).length;
      const today = tasks.filter((t) => !t.done && t.dueIn === 0).length;
      const hot = buyers.filter((b) => leadScore(b, db.acts || [], deals).tier === "חם").length;
      return { kind: "stats", title: "סיכום יומי", items: [
        { k: "משימות באיחור", v: overdue }, { k: "משימות להיום", v: today },
        { k: "לידים חמים", v: hot }, { k: "עסקאות פעילות", v: active.length },
      ] };
    }
    case "weekly_summary": {
      const recent = (db.acts || []).filter((a) => a.daysAgo <= 7).length;
      const newDeals = active.filter((d) => d.createdAgo <= 7).length;
      const newLeads = buyers.filter((b) => b.daysAgo <= 7).length;
      return { kind: "stats", title: "סיכום השבוע", items: [
        { k: "פעולות שבוצעו", v: recent }, { k: "עסקאות חדשות", v: newDeals },
        { k: "לידים חדשים", v: newLeads }, { k: "סה״כ עסקאות פעילות", v: active.length },
      ] };
    }
    case "overdue_tasks": {
      const ovr = tasks.filter((t) => !t.done && t.dueIn < 0).slice(0, 8);
      return { kind: "task_list", title: `${ovr.length} משימות באיחור`, items: ovr };
    }
    case "high_demand_properties": {
      const ranked = props.filter((p) => p.status === "זמין").map((p) => {
        const n = buyers.filter((b) => { const m = matchScore(b, p); return m && m.score >= 70; }).length;
        return { p, n };
      }).filter((x) => x.n >= 2).sort((a, b) => b.n - a.n).slice(0, 6);
      return { kind: "property_list", title: "נכסים עם ביקוש גבוה", items: ranked.map((x) => ({ prop: x.p, matches: x.n })) };
    }
    case "free_search": {
      const q = intent.text;
      const cMatches = contacts.filter((c) => c.name.toLowerCase().includes(q) || (c.phone || "").includes(q)).slice(0, 4);
      const pMatches = props.filter((p) => p.addr.toLowerCase().includes(q) || p.city.toLowerCase().includes(q) || (p.nbh || "").toLowerCase().includes(q)).slice(0, 4);
      if (cMatches.length === 0 && pMatches.length === 0) {
        return { kind: "empty", title: "לא הצלחתי להבין את הבקשה", suggest: true };
      }
      return { kind: "mixed", title: `${cMatches.length + pMatches.length} תוצאות`, contacts: cMatches, props: pMatches };
    }
    default: return null;
  }
}

function AIAssistant({ open, onClose, db, currentUser, onAction }) {
  const [q, setQ] = useState("");
  const [result, setResult] = useState(null);
  const inputRef = useRef(null);

  useEffect(() => { if (open && inputRef.current) inputRef.current.focus(); }, [open]);

  // Auto-computed insights — same engine the dashboard uses, condensed
  const insights = useMemo(() => {
    if (!db) return [];
    const out = [];
    const buyers = db.contacts.filter((c) => c.kind === "קונה");
    const scored = buyers.map((c) => ({ c, ...leadScore(c, db.acts || [], db.deals) }));
    const hotNoContact = scored.filter((x) => x.tier === "חם" && x.c.lastContactAgo > 3);
    if (hotNoContact.length) out.push({ tone: "red", icon: <Flame size={14} />, t: `${hotNoContact.length} לידים חמים שלא טופלו`, s: "ללא קשר 3+ ימים", query: "לידים חמים" });
    const stuck = db.deals.filter(isActive).filter((d) => (d.stage === "מו\"מ" || d.stage === "צפייה") && d.createdAgo > 10);
    if (stuck.length) out.push({ tone: "amber", icon: <Handshake size={14} />, t: `${stuck.length} עסקאות תקועות מעל 10 ימים`, s: "דורש דחיפה לסגירה", query: "עסקאות תקועות" });
    const expExcl = db.props.filter((p) => p.exclusive && p.exclEndDays != null && p.exclEndDays <= 14).length;
    if (expExcl) out.push({ tone: "purple", icon: <KeyRound size={14} />, t: `${expExcl} בלעדיות פוקעות תוך 14 ימים`, s: "חידוש מומלץ", query: "בלעדיות פוקעת" });
    const highDemand = (() => {
      let n = 0; db.props.filter((p) => p.status === "זמין").forEach((p) => { const k = buyers.filter((b) => { const m = matchScore(b, p); return m && m.score >= 80; }).length; if (k >= 3) n++; });
      return n;
    })();
    if (highDemand) out.push({ tone: "green", icon: <Target size={14} />, t: `${highDemand} נכסים עם ביקוש גבוה`, s: "3+ קונים בהתאמה 80+", query: "נכסים עם ביקוש" });
    return out.slice(0, 4);
  }, [db]);

  const submit = (override) => {
    const text = override || q;
    if (!text.trim()) return;
    const intent = parseQuery(text);
    const res = runQuery(intent, db);
    setResult(res);
    if (override) setQ(override);
  };

  const quickActions = [
    { ic: <Home size={14} />, tone: "blue", t: "מצא קונים לנכס", q: "מצא קונים לנכס הכי יקר" },
    { ic: <Users size={14} />, tone: "indigo", t: "מצא נכסים ללקוח", q: "נכסים ללקוח הכי גדול" },
    { ic: <Flame size={14} />, tone: "red", t: "לידים חמים השבוע", q: "לידים חמים" },
    { ic: <Handshake size={14} />, tone: "amber", t: "עסקאות תקועות", q: "עסקאות תקועות" },
    { ic: <Target size={14} />, tone: "green", t: "נכסים עם ביקוש", q: "נכסים עם ביקוש גבוה" },
    { ic: <KeyRound size={14} />, tone: "purple", t: "בלעדיות פוקעות", q: "בלעדיות פוקעת" },
    { ic: <CheckSquare size={14} />, tone: "cyan", t: "משימות באיחור", q: "משימות באיחור" },
    { ic: <BarChart3 size={14} />, tone: "blue", t: "סיכום יומי", q: "סיכום יומי" },
  ];

  if (!open) return null;
  const firstName = (currentUser?.name || "").split(" ")[0] || "";

  return <>
    <div className="ov" onClick={onClose} style={{ background: "rgba(15,23,42,.3)" }} />
    <div className="ai-panel">
      <div className="ai-panel-h">
        <div className="ai-panel-h-top">
          <div className="ai-logo"><Sparkles size={18} /></div>
          <div>
            <h2>AI Assistant</h2>
            <small>עוזר חכם · מחובר לנתונים</small>
          </div>
          <button className="ai-close" onClick={onClose}><X size={16} /></button>
        </div>
        <div className="ai-greet">שלום {firstName ? <strong>{firstName}</strong> : "👋"} — מה תרצה לעשות עכשיו?</div>
      </div>

      <div className="ai-body">
        {!result && <>
          {insights.length > 0 && <>
            <div className="ai-section-t"><Lightbulb size={11} />תובנות חכמות</div>
            <div className="ai-insights">
              {insights.map((ins, i) => (
                <div key={i} className="ai-insight" onClick={() => submit(ins.query)} style={{ borderInlineStartColor: tVar(ins.tone) }}>
                  <div className="ai-insight-ic" style={{ background: tSoft(ins.tone), color: tVar(ins.tone) }}>{ins.icon}</div>
                  <div style={{ flex: 1 }}>
                    <div className="ai-insight-t">{ins.t}</div>
                    <div className="ai-insight-s">{ins.s}</div>
                  </div>
                  <ChevronLeft size={14} color="var(--soft)" />
                </div>
              ))}
            </div>
          </>}

          <div className="ai-section-t"><Zap size={11} />פעולות מהירות</div>
          <div className="ai-quick">
            {quickActions.map((a, i) => (
              <button key={i} onClick={() => submit(a.q)}>
                <span className="qi" style={{ background: tSoft(a.tone), color: tVar(a.tone) }}>{a.ic}</span>
                <span>{a.t}</span>
              </button>
            ))}
          </div>
        </>}

        {result && <AIResult result={result} db={db} onBack={() => { setResult(null); setQ(""); }} onAction={onAction} onClose={onClose} retry={(text) => submit(text)} />}
      </div>

      <div className="ai-input-wrap">
        <div className="ai-input">
          <Sparkles size={15} color="var(--brand)" />
          <input ref={inputRef} value={q} onChange={(e) => setQ(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && submit()}
            placeholder="שאל אותי כל דבר על הנתונים במערכת..." />
          <button onClick={() => submit()} disabled={!q.trim()}><Send size={14} /></button>
        </div>
        <div className="ai-hint">
          <span>נסה: "לידים חמים" / "עסקאות תקועות"</span>
          <span><kbd>↵</kbd> שלח</span>
        </div>
      </div>
    </div>
  </>;
}

function AIResult({ result, db, onBack, onAction, onClose, retry }) {
  if (!result) return null;

  const callPhone = (phone) => { if (phone) window.open("tel:" + phone); };
  const sendWA = (phone, text) => {
    const num = (phone || "").replace(/\D/g, "").replace(/^0/, "");
    window.open(`https://wa.me/972${num}${text ? "?text=" + encodeURIComponent(text) : ""}`, "_blank");
  };
  const openContact = (id) => { onAction && onAction({ type: "contact", id }); onClose(); };
  const openProp = (id) => { onAction && onAction({ type: "property", id }); onClose(); };

  return <div className="ai-result">
    <div className="ai-result-h">
      <Sparkles size={13} color="var(--brand)" />
      {result.title}
      <button className="ai-back-q" onClick={onBack}><ChevronRight size={12} />חזרה</button>
    </div>

    {result.kind === "empty" && (
      <div className="ai-empty-result">
        <Sparkles size={28} />
        <div style={{ fontWeight: 600, marginBottom: 4 }}>{result.title}</div>
        {result.suggest && <>
          <div style={{ fontSize: 11, marginBottom: 10 }}>נסה אחת מהשאלות הבאות:</div>
          <div className="ai-suggest">
            {["לידים חמים", "עסקאות תקועות", "נכסים עם ביקוש גבוה", "סיכום יומי"].map((s) => (
              <button key={s} className="ai-suggest-btn" onClick={() => retry(s)}>{s}</button>
            ))}
          </div>
        </>}
      </div>
    )}

    {result.kind === "buyer_list" && result.items.map((item, i) => {
      const c = item.contact;
      const sLbl = item.score >= 80 ? "התאמה גבוהה" : item.score >= 60 ? "התאמה בינונית" : "התאמה נמוכה";
      const sTone = item.score >= 80 ? "green" : item.score >= 60 ? "amber" : "red";
      return <div key={i} className="ai-card">
        <div className="ai-card-head">
          <Avatar id={c.id} name={c.name} size={36} />
          <div style={{ flex: 1 }}>
            <div className="ai-card-name">{c.name}</div>
            <div className="ai-card-meta">{c.phone} · תקציב {short(c.budget)}</div>
          </div>
          <span className={"bdg b-" + sTone}>{item.score} · {sLbl}</span>
        </div>
        <div className="ai-card-actions">
          <button className="wa" onClick={() => sendWA(c.phone, item.prop ? `שלום ${c.name}, מצאתי נכס שעשוי להתאים — ${item.prop.addr}, ${item.prop.city}` : "")}><MessageCircle size={11} />WhatsApp</button>
          <button onClick={() => callPhone(c.phone)}><Phone size={11} />התקשר</button>
          <button onClick={() => openContact(c.id)}><Eye size={11} />פתח כרטיס</button>
        </div>
      </div>;
    })}

    {result.kind === "property_list" && result.items.map((item, i) => {
      const p = item.prop;
      return <div key={i} className="ai-card">
        <div className="ai-card-head">
          <div style={{ width: 40, height: 40, borderRadius: 9, background: "var(--brand-soft)", color: "var(--brand)", display: "grid", placeItems: "center", flexShrink: 0 }}><Building2 size={17} /></div>
          <div style={{ flex: 1 }}>
            <div className="ai-card-name">{p.addr}, {p.city}</div>
            <div className="ai-card-meta">{p.rooms} חד׳ · {p.size} מ״ר · {money(p.price)}</div>
          </div>
          {item.score && <span className={"bdg b-" + (item.score >= 80 ? "green" : "amber")}>{item.score}</span>}
          {item.matches && <span className="bdg b-amber"><Flame size={9} />{item.matches}</span>}
          {item.days != null && <span className="bdg b-red">{item.days} ימים</span>}
        </div>
        <div className="ai-card-actions">
          <button className="prim" onClick={() => openProp(p.id)}><Eye size={11} />פתח נכס</button>
          {item.contact && <button className="wa" onClick={() => sendWA(item.contact.phone, `שלום ${item.contact.name}, מצאתי נכס שמתאים — ${p.addr}, ${p.city} (${money(p.price)})`)}><Send size={11} />שלח ללקוח</button>}
        </div>
      </div>;
    })}

    {result.kind === "deal_list" && result.items.length === 0 && (
      <div className="ai-empty-result"><CheckCircle2 size={28} color="var(--green)" /><div>אין עסקאות תקועות — כל הכבוד!</div></div>
    )}
    {result.kind === "deal_list" && result.items.map((d, i) => {
      const p = db.props.find((x) => x.id === d.propId);
      const b = db.contacts.find((c) => c.id === d.buyerId);
      return <div key={i} className="ai-card">
        <div className="ai-card-head">
          <div style={{ width: 40, height: 40, borderRadius: 9, background: tSoft(stageObj(d.stage).color), color: tVar(stageObj(d.stage).color), display: "grid", placeItems: "center", flexShrink: 0 }}><KanbanSquare size={17} /></div>
          <div style={{ flex: 1 }}>
            <div className="ai-card-name">{p ? p.addr + ", " + p.city : "—"}</div>
            <div className="ai-card-meta">{b ? b.name : "—"} · {money(dealValue(d))} · {d.createdAgo} ימים בעסקה</div>
          </div>
          <span className={"bdg b-" + stageObj(d.stage).color}>{d.stage}</span>
        </div>
        <div className="ai-card-actions">
          {b && <button className="wa" onClick={() => sendWA(b.phone, `שלום ${b.name}, רציתי להתעדכן בקשר לעסקה על ${p ? p.addr : "הנכס"}`)}><MessageCircle size={11} />דחוף ב-WhatsApp</button>}
          {b && <button onClick={() => openContact(b.id)}><Users size={11} />פתח לקוח</button>}
        </div>
      </div>;
    })}

    {result.kind === "task_list" && result.items.map((t, i) => {
      const c = db.contacts.find((x) => x.id === t.contactId);
      return <div key={i} className="ai-card">
        <div className="ai-card-head">
          <div style={{ width: 40, height: 40, borderRadius: 9, background: "var(--red-soft)", color: "var(--red)", display: "grid", placeItems: "center", flexShrink: 0 }}><AlertCircle size={17} /></div>
          <div style={{ flex: 1 }}>
            <div className="ai-card-name">{t.title}</div>
            <div className="ai-card-meta">{c ? c.name : ""} · באיחור {-t.dueIn} ימים</div>
          </div>
          <span className="bdg b-red">{t.type}</span>
        </div>
        <div className="ai-card-actions">
          {c && <button className="wa" onClick={() => sendWA(c.phone)}><MessageCircle size={11} />WhatsApp</button>}
          {c && <button onClick={() => openContact(c.id)}><Eye size={11} />פתח לקוח</button>}
        </div>
      </div>;
    })}

    {result.kind === "stats" && (
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
        {result.items.map((it, i) => (
          <div key={i} style={{ background: "var(--surface2)", borderRadius: 12, padding: 14 }}>
            <div style={{ fontSize: 11.5, color: "var(--soft)", fontWeight: 600 }}>{it.k}</div>
            <div style={{ fontSize: 24, fontWeight: 800, fontFamily: "Plus Jakarta Sans,Heebo", marginTop: 4, color: "var(--brand)" }}>{it.v}</div>
          </div>
        ))}
      </div>
    )}

    {result.kind === "mixed" && <>
      {result.contacts.length > 0 && <div className="ai-section-t">לקוחות</div>}
      {result.contacts.map((c) => (
        <div key={c.id} className="ai-card">
          <div className="ai-card-head">
            <Avatar id={c.id} name={c.name} size={32} />
            <div style={{ flex: 1 }}>
              <div className="ai-card-name">{c.name}</div>
              <div className="ai-card-meta">{c.phone} · {c.kind}</div>
            </div>
          </div>
          <div className="ai-card-actions">
            <button className="prim" onClick={() => openContact(c.id)}><Eye size={11} />פתח</button>
            <button className="wa" onClick={() => sendWA(c.phone)}><MessageCircle size={11} />WhatsApp</button>
          </div>
        </div>
      ))}
      {result.props.length > 0 && <div className="ai-section-t">נכסים</div>}
      {result.props.map((p) => (
        <div key={p.id} className="ai-card">
          <div className="ai-card-head">
            <div style={{ width: 36, height: 36, borderRadius: 9, background: "var(--brand-soft)", color: "var(--brand)", display: "grid", placeItems: "center", flexShrink: 0 }}><Building2 size={15} /></div>
            <div style={{ flex: 1 }}>
              <div className="ai-card-name">{p.addr}</div>
              <div className="ai-card-meta">{p.city} · {money(p.price)}</div>
            </div>
          </div>
          <div className="ai-card-actions"><button className="prim" onClick={() => openProp(p.id)}><Eye size={11} />פתח</button></div>
        </div>
      ))}
    </>}
  </div>;
}

/* ════════════════════ AI FLOATING BUTTON ════════════════════ */
function AIFab({ onClick }) {
  return <button className="ai-fab" onClick={onClick} aria-label="פתח עוזר חכם">
    <Sparkles size={24} />
    <span className="ai-pulse" />
    <span className="ai-fab-tip">העוזר החכם שלך</span>
  </button>;
}

/* ════════════════════ MOBILE BOTTOM NAV ════════════════════ */
function BottomNav({ view, setView, fab, counts }) {
  const [moreOpen, setMoreOpen] = useState(false);
  const primary = [
    { k: "dash", t: "בית", i: <LayoutDashboard size={20} /> },
    { k: "leads", t: "לידים", i: <Users size={20} />, c: counts.leads },
    { k: "deals", t: "עסקאות", i: <KanbanSquare size={20} />, c: counts.deals },
    { k: "geo", t: "מפה", i: <MapPin size={20} /> },
  ];
  const more = [
    { k: "tasks", t: "משימות", i: <CheckSquare size={18} />, c: counts.tasks },
    { k: "props", t: "נכסים", i: <Building2 size={18} /> },
    { k: "match", t: "התאמות", i: <Target size={18} /> },
    { k: "cal", t: "יומן", i: <Calendar size={18} /> },
    { k: "comms", t: "תקשורת", i: <MessageSquare size={18} /> },
    { k: "docs", t: "מסמכים", i: <Files size={18} /> },
    { k: "owners", t: "בעלי נכסים", i: <KeyRound size={18} /> },
    { k: "pros", t: "בעלי מקצוע", i: <Briefcase size={18} /> },
    { k: "reports", t: "דוחות", i: <BarChart3 size={18} /> },
    { k: "settings", t: "הגדרות", i: <Settings size={18} /> },
  ];
  const moreActive = more.some((m) => m.k === view);

  const handlePick = (k) => { setView(k); setMoreOpen(false); };

  return <>
    <div className="bnav">
      {primary.map((n) => (
        <button key={n.k} className={"bnav-item" + (view === n.k ? " on" : "")} onClick={() => setView(n.k)}>
          {n.i}
          <span>{n.t}</span>
          {n.c > 0 && <span className="bcnt">{n.c > 99 ? "99+" : n.c}</span>}
        </button>
      ))}
      <button className={"bnav-item" + (moreActive ? " on" : "")} onClick={() => setMoreOpen(true)}>
        <Menu size={20} />
        <span>עוד</span>
      </button>
    </div>

    {moreOpen && <div className="bnav-more-ov" onClick={() => setMoreOpen(false)}>
      <div className="bnav-more" onClick={(e) => e.stopPropagation()}>
        <div className="bnav-more-handle" />
        <div className="bnav-more-h">
          <h3>תפריט מלא</h3>
          <button onClick={() => setMoreOpen(false)} style={{ border: "none", background: "var(--surface2)", width: 32, height: 32, borderRadius: 9, display: "grid", placeItems: "center", cursor: "pointer" }}><X size={15} /></button>
        </div>
        <div className="bnav-more-grid">
          {more.map((m) => (
            <button key={m.k} className={"bnav-more-item" + (view === m.k ? " on" : "")} onClick={() => handlePick(m.k)}>
              <div className="bm-ic">{m.i}</div>
              <span>{m.t}</span>
              {m.c > 0 && <span className="bm-cnt">{m.c}</span>}
            </button>
          ))}
        </div>
      </div>
    </div>}
  </>;
}

function NadlanCRMShell({ currentUser, onSignOut, onOpenAdmin }) {
  const [theme, setTheme] = useState("light");
  const [view, setView] = useState("dash");
  const [contacts, setContacts] = useState(DB_CONTACTS);
  const [props, setProps] = useState(DB_PROPS);
  const [deals, setDeals] = useState(DB_DEALS);
  const [tasks, setTasks] = useState(DB_TASKS);
  const [acts, setActs] = useState(DB_ACTS);
  const [openC, setOpenC] = useState(null);
  const [openP, setOpenP] = useState(null);
  const [openD, setOpenD] = useState(null);
  const [openPro, setOpenPro] = useState(null);
  const [modal, setModal] = useState(false);
  const [users, setUsers] = useState(DB_USERS);
  const [quick, setQuick] = useState(null);
  const [quickProp, setQuickProp] = useState(null);
  const [fabOpen, setFabOpen] = useState(false);
  const [fieldMode, setFieldMode] = useState(false);
  const [aiOpen, setAiOpen] = useState(false);
  const [hdMenu, setHdMenu] = useState(false);
  const [boot, setBoot] = useState(true);
  const [toasts, setToasts] = useState([]);
  const [cmdOpen, setCmdOpen] = useState(false);

  useEffect(() => { setBoot(true); const t = setTimeout(() => setBoot(false), 480); return () => clearTimeout(t); }, [view]);
  // Body-scroll lock when any overlay is active — prevents background scroll on iOS/Android
  useEffect(() => {
    const anyOpen = modal || quick || fieldMode || aiOpen || hdMenu || cmdOpen;
    if (anyOpen) {
      const y = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = -y + "px";
      document.body.style.width = "100%";
      return () => {
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.width = "";
        window.scrollTo(0, y);
      };
    }
  }, [modal, quick, fieldMode, aiOpen, hdMenu, cmdOpen]);
  useEffect(() => {
    const h = (e) => { if ((e.metaKey || e.ctrlKey) && (e.key === "k" || e.key === "K")) { e.preventDefault(); setCmdOpen((o) => !o); } };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, []);
  const toast = (msg, type = "success") => { const id = Date.now() + Math.random(); setToasts((t) => [...t, { id, msg, type }]); };
  const removeToast = (id) => setToasts((t) => t.filter((x) => x.id !== id));

  const db = { contacts, props, deals, tasks, acts, viewings: DB_VIEWINGS, pros: DB_PROS };
  const logActivity = (cid, type, text) => {
    setActs((a) => [{ id: Date.now(), contactId: cid, dealId: null, propId: null, type, text, daysAgo: 0 }, ...a]);
    setContacts((cs) => cs.map((c) => c.id === cid ? { ...c, lastContactAgo: 0 } : c));
  };
  const toggleTask = (id) => setTasks((ts) => ts.map((t) => t.id === id ? { ...t, done: !t.done } : t));
  const setLeadStatus = (id, status) => setContacts((cs) => cs.map((c) => c.id === id ? { ...c, status } : c));
  const goContact = (id) => { setOpenC(id); setOpenP(null); setView("leads"); };
  const goProp = (id) => { setOpenP(id); setOpenC(null); setView("props"); };
  const addUser = (u) => { setUsers((x) => [u, ...x]); toast("המשתמש " + u.name + " נוצר — הזמנה נשלחה"); };
  const addProperty = (p) => { setProps((x) => [p, ...x]); toast("הנכס נוסף למאגר"); };
  const addDeal = (d) => { setDeals((x) => [d, ...x]); toast("העסקה נוצרה"); };
  const addTask = (t) => { setTasks((x) => [t, ...x]); toast("המשימה נוספה"); };
  const openFb = (p) => { setQuickProp(p); setQuick("fb"); };
  const fabAction = (k) => { if (k === "lead") setModal(true); else if (k === "fb") { setQuickProp(null); setQuick("fb"); } else setQuick(k); };

  const nav = [
    { k: "dash", t: "דשבורד", i: <LayoutDashboard size={18} /> },
    { k: "leads", t: "לידים", i: <Users size={18} />, c: contacts.filter((c) => c.kind === "קונה").length },
    { k: "deals", t: "עסקאות", i: <KanbanSquare size={18} />, c: deals.filter(isActive).length },
    { k: "props", t: "נכסים", i: <Building2 size={18} />, c: props.length },
    { k: "match", t: "התאמות", i: <Target size={18} /> },
    { k: "geo", t: "מפה", i: <MapPin size={18} /> },
    { k: "cal", t: "יומן", i: <Calendar size={18} /> },
    { k: "comms", t: "תקשורת", i: <MessageSquare size={18} /> },
    { k: "docs", t: "מסמכים", i: <Files size={18} /> },
    { k: "owners", t: "בעלי נכסים", i: <KeyRound size={18} /> },
    { k: "pros", t: "בעלי מקצוע", i: <Briefcase size={18} />, c: DB_PROS.length },
    { k: "tasks", t: "משימות", i: <CheckSquare size={18} />, c: tasks.filter((t) => !t.done).length },
    { k: "reports", t: "דוחות", i: <BarChart3 size={18} /> },
    { k: "settings", t: "הגדרות", i: <Settings size={18} /> },
  ];
  const titles = {
    dash: ["דשבורד", "מרכז שליטה עסקי בזמן אמת"], leads: ["ניהול לידים", "CRM עם דירוג אוטומטי"],
    deals: ["צנרת עסקאות", "גרור עסקאות בין השלבים"], props: ["מאגר נכסים", "ניהול נכסים מתקדם"],
    match: ["מנוע התאמה", "התאמת קונים לנכסים"], owners: ["בעלי נכסים", "ניהול בלעדיות והסכמים"],
    geo: ["מרכז מפת נכסים וביקושים", "תמונת מצב גיאוגרפית בזמן אמת"],
    cal: ["יומן חכם", "פגישות, שיחות וצפיות"],
    pros: ["בעלי מקצוע", "יועצי משכנתא, שמאים, עו״ד ועוד"],
    comms: ["תקשורת", "יומן מאוחד ותבניות הודעה"], docs: ["מסמכים", "כל מסמכי העסקאות והחתימות"],
    tasks: ["משימות ואוטומציות", "מעקב ותזכורות"], reports: ["דוחות ניהול", "ביצועים והכנסות"],
    settings: ["הגדרות", "פרופיל, צוות והעדפות"],
  };
  const showCD = view === "leads" && openC;
  const showPD = view === "props" && openP;
  const tt = showCD ? ["פרופיל לקוח", "ציר זמן והיסטוריה"] : showPD ? ["כרטיס נכס", "מאפיינים, צפיות והתאמות"] : titles[view];

  return <div className="nx" data-theme={theme}>
    <style>{CSS}</style>
    <div className="shell">
      <aside className="side">
        <div className="logo"><span className="mk"><Home size={20} /></span><span>נדל"ן פרו<small>BROKER OS</small></span></div>
        <nav className="nav">
          <button className="side-cta" onClick={() => fabAction("fb")}><Megaphone size={17} />פרסום נכס</button>
          <div className="navlbl">ניהול מכירות</div>
          {nav.map((n) => <button key={n.k} className={"navit" + (view === n.k ? " on" : "")} onClick={() => { setView(n.k); setOpenC(null); setOpenP(null); }}>{n.i}{n.t}{n.c != null && <span className="cnt">{n.c}</span>}</button>)}</nav>
        <div className="sfoot"><div className="ava" style={{ width: 38, height: 38, fontSize: 14, background: currentUser?.color || "linear-gradient(135deg,var(--brand),#60A5FA)" }}>{currentUser?.name?.split(" ").map((w) => w[0]).slice(0, 2).join("") || "—"}</div>
          <div style={{ flex: 1 }}><div style={{ fontWeight: 600, fontSize: 13 }}>{currentUser?.name}</div><div style={{ fontSize: 11.5, color: "var(--soft)" }}>{currentUser?.roleLabel} · נדל"ן פרו</div></div></div>
      </aside>

      <main className="main">
        <div className="top"><h1>{tt[0]}<small>{tt[1]}</small></h1>
          <div className="srch"><Search size={15} /><input placeholder="חיפוש גלובלי..." /></div>
          <div className="hd-desktop">
            <button className="ib" onClick={() => setTheme(theme === "light" ? "dark" : "light")} title="מצב כהה/בהיר">{theme === "light" ? <Moon size={17} /> : <Sun size={17} />}</button>
            <button className="ib"><Bell size={17} /><span className="pip" /></button>
            <button className="btn gh sm" onClick={() => setFieldMode(true)} title="התחל יום עבודה" style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 12px" }}>
              <Rocket size={14} color="var(--brand)" />יום עבודה
            </button>
            {currentUser?.role === "OFFICE_MANAGER" && (
              <button className="ib" title="לוח ניהול אדמין" onClick={onOpenAdmin}
                style={{ background: "linear-gradient(135deg,#DC2626,#F87171)", color: "#fff", border: "none" }}>
                <Shield size={16} />
              </button>
            )}
            <button className="btn gh" onClick={() => setQuick("user")}><UserCog size={15} />משתמש חדש</button>
          </div>
          <button className="btn" onClick={() => setModal(true)}><Plus size={15} />ליד חדש</button>
          <button className="ib hd-menu-btn" onClick={() => setHdMenu(true)} title="עוד פעולות"><MoreHorizontal size={18} /></button>
          <button className="ib hd-desktop" onClick={onSignOut} title={`התנתקות (${currentUser?.name})`}><LogOut size={16} /></button></div>

        {hdMenu && <div className="hd-menu-ov" onClick={() => setHdMenu(false)}>
          <div className="hd-menu" onClick={(e) => e.stopPropagation()}>
            <div className="hd-menu-h">
              <Avatar id={1} name={currentUser?.name || ""} size={36} />
              <div>
                <div style={{ fontWeight: 700, fontSize: 14 }}>{currentUser?.name}</div>
                <div style={{ fontSize: 11, color: "var(--soft)" }}>{currentUser?.roleLabel}</div>
              </div>
              <button onClick={() => setHdMenu(false)} style={{ marginInlineStart: "auto", border: "none", background: "none", color: "var(--soft)", cursor: "pointer" }}><X size={18} /></button>
            </div>
            <button className="hd-menu-item" onClick={() => { setFieldMode(true); setHdMenu(false); }}><Rocket size={16} color="var(--brand)" />יום עבודה</button>
            {currentUser?.role === "OFFICE_MANAGER" && <button className="hd-menu-item" onClick={() => { onOpenAdmin(); setHdMenu(false); }}><Shield size={16} color="var(--red)" />לוח ניהול אדמין</button>}
            <button className="hd-menu-item" onClick={() => { setQuick("user"); setHdMenu(false); }}><UserCog size={16} color="var(--ink)" />משתמש חדש</button>
            <button className="hd-menu-item" onClick={() => { setTheme(theme === "light" ? "dark" : "light"); setHdMenu(false); }}>
              {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}{theme === "light" ? "מצב כהה" : "מצב בהיר"}
            </button>
            <div style={{ height: 1, background: "var(--line2)", margin: "6px 0" }} />
            <button className="hd-menu-item" onClick={() => { onSignOut(); setHdMenu(false); }} style={{ color: "var(--red)" }}><LogOut size={16} />התנתקות</button>
          </div>
        </div>}

        <div className="body" key={view + (openC || "") + (openP || "") + (boot ? "b" : "")}>
          {boot ? <Skeleton /> : <>
            {view === "dash" && <Dashboard db={db} openContact={goContact} go={setView} />}
            {view === "leads" && !openC && <Leads db={db} openContact={setOpenC} setLeadStatus={setLeadStatus} toast={toast} logActivity={logActivity} />}
            {showCD && <ContactDetail id={openC} db={db} back={() => setOpenC(null)} openDeal={setOpenD} logActivity={logActivity} toast={toast} />}
            {view === "deals" && <Deals db={db} setDeals={setDeals} openDeal={setOpenD} toast={toast} />}
            {view === "props" && !openP && <Properties db={db} openProp={setOpenP} onFb={openFb} />}
            {showPD && <PropertyDetail id={openP} db={db} back={() => setOpenP(null)} openContact={goContact} toast={toast} />}
            {view === "match" && <Matching db={db} openProp={goProp} />}
            {view === "geo" && <GeoMap db={db} currentUser={currentUser} openProp={goProp} toast={toast} onCreateDeal={() => setQuick("deal")} />}
            {view === "cal" && <CalendarView db={db} openContact={goContact} toast={toast} />}
            {view === "comms" && <Communication db={db} openContact={goContact} toast={toast} />}
            {view === "docs" && <DocsCenter db={db} openDeal={setOpenD} />}
            {view === "owners" && <Owners db={db} openContact={goContact} openProp={goProp} />}
            {view === "pros" && <Professionals db={db} openPro={setOpenPro} />}
            {view === "tasks" && <Tasks db={db} toggleTask={toggleTask} openContact={goContact} toast={toast} />}
            {view === "reports" && <Reports db={db} />}
            {view === "settings" && <SettingsView theme={theme} setTheme={setTheme} users={users} onAddUser={() => setQuick("user")} />}
          </>}
        </div>
      </main>
    </div>

    <BottomNav view={view} setView={(v) => { setView(v); setOpenC(null); setOpenP(null); }} fab={() => setFabOpen(true)} counts={{ leads: contacts.filter((c) => c.kind === "קונה").length, deals: deals.filter(isActive).length, tasks: tasks.filter((t) => !t.done).length }} />
    <FabMenu open={fabOpen} setOpen={setFabOpen} onAction={fabAction} />
    {openD && <DealDetail id={openD} db={db} setDeals={setDeals} close={() => setOpenD(null)} openContact={goContact} openPro={(pid) => { setView("pros"); setOpenPro(pid); }} toast={toast} />}
    {openPro && <ProDetail id={openPro} db={db} close={() => setOpenPro(null)} openContact={goContact} />}
    {modal && <AddContact onClose={() => setModal(false)} onSave={(c) => { setContacts([c, ...contacts]); setModal(false); toast("הליד " + c.name + " נוסף בהצלחה"); }} />}
    {quick === "user" && <AddUser onClose={() => setQuick(null)} onSave={(u) => { addUser(u); setQuick(null); }} />}
    {quick === "prop" && <AddProperty db={db} onClose={() => setQuick(null)} onSave={(p) => { addProperty(p); setQuick(null); }} />}
    {quick === "deal" && <AddDeal db={db} onClose={() => setQuick(null)} onSave={(d) => { addDeal(d); setQuick(null); }} />}
    {quick === "task" && <AddTask onClose={() => setQuick(null)} onSave={(t) => { addTask(t); setQuick(null); }} />}
    {quick === "fb" && <FacebookPublish p={quickProp} db={db} onClose={() => { setQuick(null); setQuickProp(null); }} toast={toast} />}
    {quick === "offer" && <DocSend mode="offer" db={db} onClose={() => setQuick(null)} toast={toast} />}
    {quick === "excl" && <DocSend mode="excl" db={db} onClose={() => setQuick(null)} toast={toast} />}
    {fieldMode && <FieldMode db={db} onClose={() => setFieldMode(false)} openContact={goContact} toast={toast} />}
    {!modal && !quick && !fieldMode && !aiOpen && !hdMenu && <AIFab onClick={() => setAiOpen(true)} />}
    <AIAssistant
      open={aiOpen}
      onClose={() => setAiOpen(false)}
      db={db}
      currentUser={currentUser}
      onAction={(act) => {
        if (act.type === "contact") goContact(act.id);
        else if (act.type === "property") goProp(act.id);
      }}
    />
    <div className="toasts">{toasts.map((t) => <ToastItem key={t.id} t={t} remove={removeToast} />)}</div>
  </div>;
}

/* ╔══════════════════════════ DEMO USERS (local auth) ══════════════════════════╗ */
const DEMO_USERS = [
  { email: "roi@nadlan.demo", password: "demo1234", name: "רועי לוי", role: "OFFICE_MANAGER", roleLabel: "מנהל משרד", color: "linear-gradient(135deg,#DC2626,#F87171)", lastLoginDays: 0, loginCount: 234, actionCount: 812 },
  { email: "dana@nadlan.demo", password: "demo1234", name: "דנה כהן", role: "BROKER", roleLabel: "מתווכת", color: "linear-gradient(135deg,#16A34A,#4ADE80)", lastLoginDays: 1, loginCount: 187, actionCount: 645 },
  { email: "itay@nadlan.demo", password: "demo1234", name: "איתי שרון", role: "BROKER", roleLabel: "מתווך", color: "linear-gradient(135deg,#9333EA,#C084FC)", lastLoginDays: 0, loginCount: 156, actionCount: 521 },
  { email: "michal@nadlan.demo", password: "demo1234", name: "מיכל אברהם", role: "MORTGAGE_ADVISOR", roleLabel: "יועצת משכנתאות", color: "linear-gradient(135deg,#D97706,#FBBF24)", lastLoginDays: 2, loginCount: 92, actionCount: 311 },
  { email: "gil@nadlan.demo", password: "demo1234", name: 'עו"ד גיל בן דוד', role: "LAWYER", roleLabel: 'עו"ד', color: "linear-gradient(135deg,#0891B2,#22D3EE)", lastLoginDays: 18, loginCount: 41, actionCount: 87 },
];

/* ╔══════════════════════════ LOGIN SCREEN ══════════════════════════╗ */
function LoginScreen({ onLogin }) {
  const [email, setEmail] = useState("roi@nadlan.demo");
  const [password, setPassword] = useState("demo1234");
  const [err, setErr] = useState(null);
  const [busy, setBusy] = useState(false);

  const submit = (e) => {
    e?.preventDefault?.();
    setBusy(true); setErr(null);
    setTimeout(() => {
      const user = DEMO_USERS.find((u) => u.email === email.trim().toLowerCase() && u.password === password);
      if (!user) { setErr("אימייל או סיסמה שגויים"); setBusy(false); return; }
      onLogin(user);
    }, 350);
  };

  return <div className="nx" data-theme="light">
    <style>{CSS}</style>
    <div style={{ minHeight: "100dvh", minWidth: "100vw", display: "grid", placeItems: "center", padding: 16, background: "linear-gradient(135deg, #EEF4FF 0%, #F8FAFC 100%)" }}>
      <div style={{ width: 420, maxWidth: "100%" }}>
        <div className="card" style={{ padding: 32 }}>
          <div style={{ textAlign: "center", marginBottom: 26 }}>
            <div style={{ width: 60, height: 60, borderRadius: 18, background: "linear-gradient(135deg,var(--brand),#60A5FA)", color: "#fff", display: "grid", placeItems: "center", margin: "0 auto 14px", boxShadow: "0 10px 28px rgba(37,99,235,.3)" }}><Home size={28} /></div>
            <div style={{ fontWeight: 800, fontSize: 24, fontFamily: "Plus Jakarta Sans, Heebo", letterSpacing: "-.4px" }}>נדל"ן פרו</div>
            <div style={{ fontSize: 11, color: "var(--faint)", letterSpacing: 2.5, marginTop: 4 }}>BROKER OS</div>
          </div>

          <div className="fld"><label>אימייל</label>
            <input type="email" autoFocus value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@agency.com" /></div>
          <div className="fld"><label>סיסמה</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} onKeyDown={(e) => e.key === "Enter" && submit()} /></div>

          {err && <div style={{ fontSize: 12, color: "var(--red)", background: "var(--red-soft)", padding: "9px 12px", borderRadius: 10, marginBottom: 12, display: "flex", alignItems: "center", gap: 7 }}><AlertCircle size={14} />{err}</div>}

          <button className="btn" style={{ width: "100%", justifyContent: "center", padding: "12px 16px", marginTop: 4 }} onClick={submit} disabled={busy}>
            {busy ? "מתחבר..." : "התחברות"}
          </button>

          <div style={{ marginTop: 22, paddingTop: 18, borderTop: "1px solid var(--line2)" }}>
            <div style={{ fontSize: 11, color: "var(--soft)", fontWeight: 600, letterSpacing: 1.2, marginBottom: 10, textAlign: "center" }}>חשבונות דמו — לחץ לכניסה מהירה</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {DEMO_USERS.map((u) => (
                <button key={u.email} type="button" onClick={() => { setEmail(u.email); setPassword(u.password); setTimeout(submit, 50); }}
                  style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 12px", border: "1px solid var(--line)", borderRadius: 10, background: "var(--surface)", cursor: "pointer", fontFamily: "inherit", textAlign: "right", transition: ".15s" }}
                  onMouseEnter={(e) => e.currentTarget.style.background = "var(--hover)"}
                  onMouseLeave={(e) => e.currentTarget.style.background = "var(--surface)"}>
                  <div style={{ width: 28, height: 28, borderRadius: "50%", background: u.color, color: "#fff", display: "grid", placeItems: "center", fontSize: 10, fontWeight: 700, flexShrink: 0 }}>{u.name.split(" ").map((w) => w[0]).slice(0, 2).join("")}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 12.5, fontWeight: 600 }}>{u.name}</div>
                    <div style={{ fontSize: 10.5, color: "var(--soft)" }}>{u.roleLabel} · {u.email}</div>
                  </div>
                  {u.role === "OFFICE_MANAGER" && <span className="bdg b-red" style={{ fontSize: 9.5 }}><Shield size={9} />ADMIN</span>}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>;
}

/* ╔══════════════════════════ ADMIN CONSOLE (inline) ══════════════════════════╗ */
const ADMIN_CSS = `
.ac{min-height:100vh;background:var(--bg);color:var(--ink);direction:rtl;font-family:'Heebo',sans-serif;}
.ac-head{display:flex;align-items:center;gap:14px;padding:16px 30px;background:color-mix(in srgb,var(--surface) 90%,transparent);backdrop-filter:blur(14px);border-bottom:1px solid var(--line);position:sticky;top:0;z-index:20;}
.ac-back{display:inline-flex;align-items:center;gap:6px;background:var(--surface2);border:1px solid var(--line);border-radius:10px;padding:8px 14px;font-family:inherit;font-size:13px;color:var(--ink);cursor:pointer;transition:.15s;}
.ac-back:hover{background:var(--hover);}
.ac-title{display:flex;align-items:center;gap:12px;flex:1;}
.ac-logo{width:38px;height:38px;border-radius:11px;background:linear-gradient(135deg,#DC2626,#F87171);color:#fff;display:grid;place-items:center;box-shadow:0 6px 14px rgba(220,38,38,.25);}
.ac-title h1{margin:0;font-family:'Plus Jakarta Sans','Heebo',sans-serif;font-weight:800;font-size:20px;letter-spacing:-.3px;}
.ac-title small{display:block;font-size:11.5px;color:var(--soft);font-weight:500;}
.ac-tabs{display:flex;gap:4px;padding:0 30px;background:var(--surface);border-bottom:1px solid var(--line);overflow-x:auto;}
.ac-tab{display:inline-flex;align-items:center;gap:7px;padding:14px 18px;border:none;background:none;color:var(--soft);font-family:inherit;font-size:13.5px;font-weight:600;cursor:pointer;border-bottom:2px solid transparent;transition:.15s;white-space:nowrap;}
.ac-tab:hover{color:var(--ink);}
.ac-tab.on{color:var(--brand);border-bottom-color:var(--brand);}
.ac-body{padding:24px 30px 60px;animation:rise .4s cubic-bezier(.2,.8,.2,1);}
.ac-kpis{display:grid;grid-template-columns:repeat(6,1fr);gap:12px;margin-bottom:18px;}
.ac-kpi{background:var(--surface);border:1px solid var(--line);border-radius:14px;padding:16px;box-shadow:var(--sh);transition:.2s;}
.ac-kpi:hover{transform:translateY(-2px);box-shadow:var(--sh2);}
.ac-kpi-ic{width:32px;height:32px;border-radius:9px;display:grid;place-items:center;margin-bottom:10px;}
.ac-kpi-lbl{font-size:12px;color:var(--soft);font-weight:500;}
.ac-kpi-val{font-size:22px;font-weight:800;margin-top:4px;font-family:'Plus Jakarta Sans','Heebo';letter-spacing:-.4px;}
.ac-kpi-sub{font-size:11px;color:var(--faint);margin-top:3px;}
.ac-row2{display:grid;grid-template-columns:1.7fr 1fr;gap:14px;margin-bottom:18px;}
.ac-bars{display:flex;gap:6px;align-items:flex-end;height:170px;padding-top:8px;}
.ac-bar-col{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:flex-end;height:100%;}
.ac-bar-fill{width:100%;background:linear-gradient(180deg,var(--brand),color-mix(in srgb,var(--brand) 60%,#fff));border-radius:5px 5px 0 0;min-height:3px;transition:height .8s cubic-bezier(.2,.8,.2,1);}
.ac-bar-lbl{font-size:9.5px;color:var(--faint);margin-top:4px;}
.ac-roles{display:flex;flex-direction:column;gap:10px;}
.ac-role-row{display:flex;align-items:center;gap:10px;font-size:13px;}
.ac-role-row span{width:100px;color:var(--soft);}
.ac-role-row strong{width:24px;text-align:left;font-weight:700;}
.ac-role-bar{flex:1;height:8px;background:var(--line2);border-radius:5px;overflow:hidden;}
.ac-role-bar div{height:100%;background:linear-gradient(90deg,var(--brand),var(--indigo));border-radius:5px;transition:width .8s cubic-bezier(.2,.8,.2,1);}
.ac-filters{display:flex;gap:10px;align-items:center;flex-wrap:wrap;margin-bottom:14px;}
.ac-search{display:flex;align-items:center;gap:7px;background:var(--surface);border:1px solid var(--line);border-radius:10px;padding:8px 12px;color:var(--faint);width:280px;}
.ac-search input{border:none;background:none;outline:none;font-family:inherit;font-size:13px;color:var(--ink);flex:1;}
.ac-filters select{background:var(--surface);border:1px solid var(--line);border-radius:10px;padding:8px 12px;font-family:inherit;font-size:13px;color:var(--ink);cursor:pointer;}
.ac-tbl{width:100%;border-collapse:collapse;}
.ac-tbl th{text-align:right;font-size:11px;font-weight:700;color:var(--soft);letter-spacing:.3px;padding:12px 14px;border-bottom:1px solid var(--line);background:var(--surface2);}
.ac-tbl td{padding:13px 14px;border-bottom:1px solid var(--line2);font-size:13px;vertical-align:middle;}
.ac-tbl tr:last-child td{border-bottom:none;}
.ac-tbl tbody tr{transition:.12s;}
.ac-tbl tbody tr:hover{background:var(--hover);}
.ac-user-cell{display:flex;align-items:center;gap:10px;}
.ac-ava{width:34px;height:34px;border-radius:50%;color:#fff;display:grid;place-items:center;font-weight:700;font-size:12px;flex-shrink:0;}
.ac-uname{font-weight:600;font-size:13px;}
.ac-uemail{font-size:11px;color:var(--soft);}
.ac-dim{color:var(--soft);font-size:12px;}
.ac-bdg{display:inline-flex;align-items:center;gap:4px;font-size:10.5px;font-weight:700;padding:3px 9px;border-radius:20px;}
.ac-btn-sm{display:inline-flex;align-items:center;gap:5px;padding:6px 11px;border-radius:8px;border:1px solid var(--line);background:var(--surface);font-family:inherit;font-size:11.5px;font-weight:600;cursor:pointer;transition:.15s;}
.ac-btn-sm:hover{transform:translateY(-1px);}
.ac-btn-sm.danger{color:var(--red);border-color:var(--red-soft);}
.ac-btn-sm.danger:hover{background:var(--red-soft);}
.ac-btn-sm.success{color:var(--green);border-color:var(--green-soft);}
.ac-btn-sm.success:hover{background:var(--green-soft);}
.ac-alerts{display:flex;flex-direction:column;gap:16px;max-width:760px;}
.ac-alert-group h3{margin:0 0 10px;font-size:13px;font-weight:700;display:flex;align-items:center;gap:8px;color:var(--soft);}
.ac-alert{display:flex;gap:12px;padding:14px;border-radius:12px;background:var(--surface);border:1px solid var(--line);margin-bottom:8px;}
.ac-alert.sev-high{border-inline-start:3px solid var(--red);}
.ac-alert.sev-mid{border-inline-start:3px solid var(--amber);}
.ac-alert.sev-low{border-inline-start:3px solid var(--blue);}
.ac-alert-ic{width:34px;height:34px;border-radius:10px;background:var(--surface2);display:grid;place-items:center;flex-shrink:0;}
.ac-alert-title{font-weight:700;font-size:13.5px;}
.ac-alert-detail{font-size:12.5px;color:var(--soft);margin-top:3px;line-height:1.55;}
@media(max-width:1200px){.ac-kpis{grid-template-columns:repeat(3,1fr);}.ac-row2{grid-template-columns:1fr;}}
@media(max-width:760px){.ac-kpis{grid-template-columns:repeat(2,1fr);}.ac-head,.ac-tabs,.ac-body{padding-inline:16px;}.ac-search{width:100%;}.ac-tbl{font-size:12px;}}
`;

const ACTIVITY_TYPES = {
  CALL: "שיחה", MEETING: "פגישה", WHATSAPP: "וואטסאפ", EMAIL: "מייל",
  NOTE: "הערה", VIEWING: "צפייה", STAGE_CHANGE: "שלב עסקה",
  DOCUMENT: "מסמך", MATCH: "התאמה", SYSTEM: "מערכת",
};

function AdminConsole({ onExit, contacts, props: properties, deals, tasks, acts, theme }) {
  const [tab, setTab] = useState("overview");
  const [userStates, setUserStates] = useState(() => Object.fromEntries(DEMO_USERS.map((u) => [u.email, "ACTIVE"])));
  const [activeRoleFilter, setActiveRoleFilter] = useState("");
  const [actTypeFilter, setActTypeFilter] = useState("");
  const [actSearch, setActSearch] = useState("");

  // KPIs derived live from the same in-memory DB the CRM uses
  const buyers = contacts.filter((c) => c.kind === "קונה");
  const activeDeals = deals.filter((d) => d.stage !== "נסגר");
  const wonDeals = deals.filter((d) => d.stage === "נסגר");
  const monthRev = wonDeals.reduce((s, d) => s + Math.round(((d.close || d.offer || d.asking) * d.commPct) / 100), 0);
  const activeUsers = DEMO_USERS.filter((u) => u.lastLoginDays <= 7 && userStates[u.email] === "ACTIVE").length;

  // 14-day activity bars from acts
  const series = useMemo(() => {
    const buckets = new Array(14).fill(0);
    acts.forEach((a) => { if (a.daysAgo >= 0 && a.daysAgo < 14) buckets[13 - a.daysAgo]++; });
    return buckets;
  }, [acts]);
  const maxSeries = Math.max(...series, 1);

  // Role distribution
  const roleDist = DEMO_USERS.reduce((acc, u) => { acc[u.roleLabel] = (acc[u.roleLabel] || 0) + 1; return acc; }, {});

  // Filtered activity log
  const activityLog = useMemo(() => {
    return acts
      .filter((a) => !actTypeFilter || a.type === actTypeFilter)
      .filter((a) => !actSearch || (a.text || "").includes(actSearch))
      .slice(0, 80)
      .map((a) => {
        const lead = contacts.find((c) => c.id === a.contactId);
        const prop = properties.find((p) => p.id === a.propId);
        // Pseudo-assign to demo users round-robin for visualization
        const user = DEMO_USERS[(a.id || 0) % DEMO_USERS.length];
        return { ...a, lead, prop, user };
      });
  }, [acts, actTypeFilter, actSearch, contacts, properties]);

  // Smart alerts derived from real CRM state
  const alerts = useMemo(() => {
    const list = [];
    // 1. Inactive users
    DEMO_USERS.forEach((u) => {
      if (u.lastLoginDays >= 14 && userStates[u.email] === "ACTIVE") {
        list.push({ id: "i-" + u.email, severity: "mid", title: "משתמש לא פעיל", detail: `${u.name} לא התחבר ${u.lastLoginDays} ימים` });
      }
    });
    // 2. Stuck deals (offers > 30 days, not closed)
    activeDeals.forEach((d) => {
      if ((d.createdAgo || 0) > 30) {
        const prop = properties.find((p) => p.id === d.propId);
        if (prop) list.push({ id: "s-" + d.id, severity: "high", title: "עסקה תקועה", detail: `${prop.addr}, ${prop.city} — בשלב "${d.stage}" יותר מ-30 ימים` });
      }
    });
    // 3. Cold leads with budget (potential revenue leak)
    const coldRich = buyers.filter((c) => c.budget > 2500000 && c.lastContactAgo > 14);
    if (coldRich.length >= 3) {
      list.push({ id: "cold-rich", severity: "high", title: "לידים יקרים מוזנחים", detail: `${coldRich.length} לידים עם תקציב מעל 2.5M לא טופלו בשבועיים האחרונים` });
    }
    // 4. Expiring exclusivity
    const expSoon = properties.filter((p) => p.exclusive && p.exclEndDays != null && p.exclEndDays <= 14).length;
    if (expSoon > 0) {
      list.push({ id: "excl", severity: "mid", title: "הסכמי בלעדיות לקראת סיום", detail: `${expSoon} נכסים — חידוש מומלץ לפני שהם נפתחים למתחרים` });
    }
    return list.sort((a, b) => ({ high: 0, mid: 1, low: 2 }[a.severity] - { high: 0, mid: 1, low: 2 }[b.severity]));
  }, [activeDeals, properties, buyers, userStates]);

  const toggleUserStatus = (email) => {
    setUserStates((s) => ({ ...s, [email]: s[email] === "ACTIVE" ? "DISABLED" : "ACTIVE" }));
  };

  return <div className="nx ac" data-theme={theme}>
    <style>{CSS}</style><style>{ADMIN_CSS}</style>

    <header className="ac-head">
      <button className="ac-back" onClick={onExit}><ArrowLeft size={16} />חזרה למערכת</button>
      <div className="ac-title">
        <span className="ac-logo"><Shield size={18} /></span>
        <div><h1>Admin Console</h1><small>ניהול ובקרה — מנהל משרד</small></div>
      </div>
      <span className="bdg b-red" style={{ fontSize: 11 }}>● {alerts.length} התראות</span>
    </header>

    <nav className="ac-tabs">
      {[["overview", "סקירה", <BarChart3 size={15} />], ["users", "משתמשים", <Users size={15} />], ["activity", "פעילות", <Activity size={15} />], ["alerts", "התראות", <AlertCircle size={15} />]].map(([k, t, i]) => (
        <button key={k} className={"ac-tab" + (tab === k ? " on" : "")} onClick={() => setTab(k)}>{i}{t}</button>
      ))}
    </nav>

    <main className="ac-body">
      {tab === "overview" && <>
        <div className="ac-kpis">
          {[
            { lbl: "משתמשים פעילים", val: activeUsers, sub: `מתוך ${DEMO_USERS.length}`, tone: "blue", ic: <UserPlus size={16} /> },
            { lbl: "לידים סך הכל", val: contacts.length, tone: "indigo", ic: <Users size={16} /> },
            { lbl: "עסקאות פתוחות", val: activeDeals.length, sub: `${wonDeals.length} נסגרו`, tone: "amber", ic: <KanbanSquare size={16} /> },
            { lbl: "הכנסות החודש", val: short(monthRev), tone: "green", ic: <TrendingUp size={16} /> },
            { lbl: "פעילות 7 ימים", val: acts.filter((a) => a.daysAgo < 7).length, sub: `${acts.filter((a) => a.daysAgo < 30).length} ב-30 יום`, tone: "purple", ic: <Activity size={16} /> },
            { lbl: "נכסים זמינים", val: properties.filter((p) => p.status !== "נמכר").length, tone: "cyan", ic: <Building2 size={16} /> },
          ].map((k, i) => (
            <div className="ac-kpi" key={i}>
              <div className="ac-kpi-ic" style={{ background: tSoft(k.tone), color: tVar(k.tone) }}>{k.ic}</div>
              <div className="ac-kpi-lbl">{k.lbl}</div>
              <div className="ac-kpi-val">{k.val}</div>
              {k.sub && <div className="ac-kpi-sub">{k.sub}</div>}
            </div>
          ))}
        </div>

        <div className="ac-row2">
          <div className="card">
            <h3><Activity size={16} color="var(--brand)" />פעילות מערכת — 14 ימים אחרונים</h3>
            <div className="sub">{acts.length} פעולות סך הכל במאגר</div>
            <div className="ac-bars">
              {series.map((v, i) => (
                <div key={i} className="ac-bar-col" title={`לפני ${13 - i} ימים: ${v} פעולות`}>
                  <div className="ac-bar-fill" style={{ height: `${(v / maxSeries) * 100}%` }} />
                  <div className="ac-bar-lbl">{13 - i}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <h3><Users size={16} color="var(--brand)" />צוות לפי תפקיד</h3>
            <div className="sub">חלוקת ההרשאות בארגון</div>
            <div className="ac-roles">
              {Object.entries(roleDist).sort((a, b) => b[1] - a[1]).map(([role, n]) => (
                <div key={role} className="ac-role-row">
                  <span>{role}</span>
                  <div className="ac-role-bar"><div style={{ width: `${(n / DEMO_USERS.length) * 100}%` }} /></div>
                  <strong>{n}</strong>
                </div>
              ))}
            </div>
          </div>
        </div>
      </>}

      {tab === "users" && <>
        <div className="ac-filters">
          <select value={activeRoleFilter} onChange={(e) => setActiveRoleFilter(e.target.value)}>
            <option value="">כל התפקידים</option>
            {[...new Set(DEMO_USERS.map((u) => u.roleLabel))].map((r) => <option key={r}>{r}</option>)}
          </select>
        </div>

        <div className="card" style={{ padding: 0, overflow: "hidden" }}>
          <table className="ac-tbl">
            <thead><tr>
              <th>משתמש</th><th>תפקיד</th><th>סטטוס</th><th>התחברות אחרונה</th>
              <th>כניסות</th><th>פעולות</th><th></th>
            </tr></thead>
            <tbody>
              {DEMO_USERS.filter((u) => !activeRoleFilter || u.roleLabel === activeRoleFilter).map((u) => {
                const status = userStates[u.email];
                return <tr key={u.email}>
                  <td>
                    <div className="ac-user-cell">
                      <div className="ac-ava" style={{ background: u.color }}>{u.name.split(" ").map((w) => w[0]).slice(0, 2).join("")}</div>
                      <div><div className="ac-uname">{u.name}</div><div className="ac-uemail">{u.email}</div></div>
                    </div>
                  </td>
                  <td><span className="bdg b-blue">{u.roleLabel}</span></td>
                  <td><span className={"bdg " + (status === "ACTIVE" ? "b-green" : "b-red")}>{status === "ACTIVE" ? "פעיל" : "מושבת"}</span></td>
                  <td><span className="ac-dim">{u.lastLoginDays === 0 ? "היום" : `לפני ${u.lastLoginDays} ימים`}</span></td>
                  <td>{u.loginCount}</td>
                  <td>{u.actionCount}</td>
                  <td style={{ textAlign: "left" }}>
                    {status === "ACTIVE" ? (
                      <button className="ac-btn-sm danger" onClick={() => toggleUserStatus(u.email)}><UserCog size={13} />השבת</button>
                    ) : (
                      <button className="ac-btn-sm success" onClick={() => toggleUserStatus(u.email)}><CheckCircle2 size={13} />הפעל</button>
                    )}
                  </td>
                </tr>;
              })}
            </tbody>
          </table>
        </div>
      </>}

      {tab === "activity" && <>
        <div className="ac-filters">
          <div className="ac-search"><Search size={14} /><input value={actSearch} onChange={(e) => setActSearch(e.target.value)} placeholder="חיפוש בטקסט הפעולה..." /></div>
          <select value={actTypeFilter} onChange={(e) => setActTypeFilter(e.target.value)}>
            <option value="">כל הסוגים</option>
            {Object.entries(ACTIVITY_TYPES).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
          </select>
          <span style={{ marginInlineStart: "auto", fontSize: 12, color: "var(--soft)", fontWeight: 600 }}>{activityLog.length} פעולות</span>
        </div>

        <div className="card" style={{ padding: 0, overflow: "hidden" }}>
          <table className="ac-tbl">
            <thead><tr><th>זמן</th><th>משתמש</th><th>סוג</th><th>פירוט</th><th>הקשר</th></tr></thead>
            <tbody>
              {activityLog.map((a) => <tr key={a.id}>
                <td><span className="ac-dim">{agoLbl(a.daysAgo)}</span></td>
                <td><div className="ac-user-cell">
                  <div className="ac-ava" style={{ width: 26, height: 26, fontSize: 10, background: a.user.color }}>{a.user.name.split(" ").map((w) => w[0]).slice(0, 2).join("")}</div>
                  <span style={{ fontWeight: 600, fontSize: 12.5 }}>{a.user.name}</span>
                </div></td>
                <td><span className="bdg b-indigo">{ACTIVITY_TYPES[a.type] || a.type}</span></td>
                <td>{a.text}</td>
                <td className="ac-dim" style={{ fontSize: 11 }}>
                  {a.lead && `ליד: ${a.lead.name}`}
                  {a.prop && (a.lead ? " · " : "") + `נכס: ${a.prop.addr}`}
                </td>
              </tr>)}
              {activityLog.length === 0 && <tr><td colSpan={5} style={{ textAlign: "center", padding: 40, color: "var(--soft)" }}>אין פעולות התואמות לסינון</td></tr>}
            </tbody>
          </table>
        </div>
      </>}

      {tab === "alerts" && <div className="ac-alerts">
        {alerts.length === 0 ? (
          <div className="card" style={{ textAlign: "center", padding: 60 }}>
            <CheckCircle2 size={36} color="var(--green)" />
            <h3 style={{ margin: "12px 0 4px", fontSize: 16 }}>הכול תחת שליטה</h3>
            <p style={{ fontSize: 13, color: "var(--soft)" }}>אין כרגע התראות שדורשות תשומת לב.</p>
          </div>
        ) : <>
          {[["high", "דחוף", <AlertCircle size={15} color="var(--red)" />], ["mid", "בינוני", <Clock size={15} color="var(--amber)" />], ["low", "מידע", <Activity size={15} color="var(--blue)" />]].map(([sev, lbl, ic]) => {
            const items = alerts.filter((a) => a.severity === sev);
            if (!items.length) return null;
            return <div className="ac-alert-group" key={sev}>
              <h3>{ic}{lbl}<span className="bdg b-gray">{items.length}</span></h3>
              {items.map((a) => <div key={a.id} className={"ac-alert sev-" + a.severity}>
                <div className="ac-alert-ic"><AlertCircle size={16} color={`var(--${sev === "high" ? "red" : sev === "mid" ? "amber" : "blue"})`} /></div>
                <div style={{ flex: 1 }}>
                  <div className="ac-alert-title">{a.title}</div>
                  <div className="ac-alert-detail">{a.detail}</div>
                </div>
              </div>)}
            </div>;
          })}
        </>}
      </div>}
    </main>
  </div>;
}

/* ╔══════════════════════════ ROOT EXPORT ══════════════════════════╗ */
export default function NadlanCRM() {
  const [user, setUser] = useState(null);
  const [adminOpen, setAdminOpen] = useState(false);

  // iOS PWA: prevent rubber-band scrolling on body when no overlay is open
  useEffect(() => {
    const root = document.documentElement;
    root.style.overscrollBehavior = "none";
    return () => { root.style.overscrollBehavior = ""; };
  }, []);

  if (!user) return <LoginScreen onLogin={setUser} />;

  if (adminOpen) {
    return <AdminConsole
      onExit={() => setAdminOpen(false)}
      contacts={DB_CONTACTS} props={DB_PROPS} deals={DB_DEALS} tasks={DB_TASKS} acts={DB_ACTS}
      theme="light"
    />;
  }

  return <NadlanCRMShell
    currentUser={user}
    onSignOut={() => { setUser(null); setAdminOpen(false); }}
    onOpenAdmin={() => setAdminOpen(true)}
  />;
}
