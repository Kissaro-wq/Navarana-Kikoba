import React, { useState, useEffect, useMemo } from "react";
import "@fontsource/manrope/400.css";
import "@fontsource/manrope/500.css";
import "@fontsource/manrope/600.css";
import "@fontsource/manrope/700.css";
import "@fontsource/manrope/800.css";

/* Persistent storage. localStorage inside the Capacitor Android WebView
   survives app restarts. Phase 2: replace with calls to the FastAPI backend. */
const storage = {
  async get(key) {
    const v = localStorage.getItem(key);
    if (v === null) throw new Error("not found: " + key);
    return { key, value: v };
  },
  async set(key, value) {
    try { localStorage.setItem(key, value); return { key, value }; } catch (e) { return null; }
  },
};


/* localStorage-backed shim matching the window.storage interface the app
   was originally written against (get/set with an object result, throwing
   on a missing key) so the app code above needed no logic changes. */

/* Minimal inline-SVG icon set, replacing lucide-react for the standalone
   published page (which cannot load ES-module packages). Same prop names
   (size, color, strokeWidth) as the lucide components they replace, so the
   rest of the app's JSX needed no changes beyond this file. */

function svgIcon(paths, extra = {}) {
  return function Icon({ size = 24, color = "currentColor", strokeWidth = 2, className = "" }) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color}
           strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
        {paths}
      </svg>
    );
  };
}

const Home = svgIcon(<><path d="M4 11.5 12 4l8 7.5" /><path d="M6 10v9a1 1 0 0 0 1 1h3v-5h4v5h3a1 1 0 0 0 1-1v-9" /></>);
const Users = svgIcon(<><circle cx="8.5" cy="8" r="3" /><path d="M2.5 20c0-3.5 2.7-6 6-6s6 2.5 6 6" /><circle cx="17" cy="9" r="2.3" /><path d="M14.5 14.3c2.6.5 4.5 2.6 4.5 5.7" /></>);
const PiggyBank = svgIcon(<><rect x="4" y="9" width="14" height="9" rx="4" /><circle cx="15" cy="13" r="0.8" fill="currentColor" stroke="none" /><path d="M18 11h2v3h-2" /><path d="M8 18v2M14 18v2" /><path d="M6 9V6l3 2" /></>);
const Landmark = svgIcon(<><path d="M12 3 3 8h18Z" /><path d="M5 10v9M9.5 10v9M14.5 10v9M19 10v9" /><path d="M3 19h18" /></>);
const MoreHorizontal = svgIcon(<><circle cx="5" cy="12" r="1.6" fill="currentColor" stroke="none" /><circle cx="12" cy="12" r="1.6" fill="currentColor" stroke="none" /><circle cx="19" cy="12" r="1.6" fill="currentColor" stroke="none" /></>);
const Plus = svgIcon(<><path d="M12 5v14M5 12h14" /></>);
const ChevronLeft = svgIcon(<><path d="M15 6l-6 6 6 6" /></>);
const ChevronRight = svgIcon(<><path d="M9 6l6 6-6 6" /></>);
const ChevronDown = svgIcon(<><path d="M6 9l6 6 6-6" /></>);
const Search = svgIcon(<><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" /></>);
const CheckCircle2 = svgIcon(<><circle cx="12" cy="12" r="9" /><path d="M8.5 12.5l2.5 2.5 5-5" /></>);
const XCircle = svgIcon(<><circle cx="12" cy="12" r="9" /><path d="M9 9l6 6M15 9l-6 6" /></>);
const AlertTriangle = svgIcon(<><path d="M12 3 2 20h20L12 3Z" /><path d="M12 9v5" /><circle cx="12" cy="17" r="0.9" fill="currentColor" stroke="none" /></>);
const Clock = svgIcon(<><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3.5 2" /></>);
const Wallet = svgIcon(<><rect x="3" y="6" width="18" height="13" rx="2" /><path d="M3 10h18" /><circle cx="17" cy="14" r="1.3" fill="currentColor" stroke="none" /></>);
const TrendingUp = svgIcon(<><path d="M3 17l6-6 4 4 8-8" /><path d="M15 6h6v6" /></>);
const FileText = svgIcon(<><path d="M6 3h9l5 5v13a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" /><path d="M14 3v5h5" /><path d="M8 13h8M8 17h5" /></>);
const Settings = svgIcon(<><circle cx="12" cy="12" r="3" /><path d="M19.4 15a8 8 0 0 0 0-6l2-1.6-2-3.4-2.4 1a8 8 0 0 0-1.7-1L15 1h-4l-.3 2.4a8 8 0 0 0-1.7 1l-2.4-1-2 3.4L6.6 9a8 8 0 0 0 0 6l-2 1.6 2 3.4 2.4-1a8 8 0 0 0 1.7 1L11 23h4l.3-2.4a8 8 0 0 0 1.7-1l2.4 1 2-3.4Z" /></>);
const ShieldCheck = svgIcon(<><path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6Z" /><path d="M9 12l2 2 4-4" /></>);
const Receipt = svgIcon(<><path d="M6 3h12v18l-3-2-3 2-3-2-3 2Z" /><path d="M9 8h6M9 12h6M9 16h4" /></>);
const ArrowDownCircle = svgIcon(<><circle cx="12" cy="12" r="9" /><path d="M12 7v7M9 11l3 3 3-3" /></>);
const ArrowUpCircle = svgIcon(<><circle cx="12" cy="12" r="9" /><path d="M12 17v-7M9 13l3-3 3 3" /></>);
const X = svgIcon(<><path d="M6 6l12 12M18 6 6 18" /></>);
const Check = svgIcon(<><path d="M5 12l4 4 10-10" /></>);


/* ---------------------------------------------------------------
   TOKENS
   bg: #FAF8F3 (warm paper, not cream-serif cliché — paired w/ sans)
   surface: #FFFFFF
   ink: #16211C
   muted: #6B7A72
   primary (trust/savings): #1F6F5C
   primary-deep: #14493D
   gold (money/shares): #C98A2C
   danger: #B23A2E
   warn: #C98A2C
   line: #E7E2D8
   Font: Manrope (single family, weight does the work)
----------------------------------------------------------------*/

const TZS = (n) =>
  "TZS " + Math.round(n).toLocaleString("en-US");

const todayISO = () => new Date().toISOString().slice(0, 10);

function addMonths(dateStr, n) {
  const d = new Date(dateStr);
  d.setMonth(d.getMonth() + n);
  return d.toISOString().slice(0, 10);
}
function daysBetween(a, b) {
  return Math.round((new Date(b) - new Date(a)) / 86400000);
}
function fmtDate(d) {
  const dt = new Date(d);
  return dt.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}

/* ---------------------------------------------------------------
   DEMO DATA GENERATION
----------------------------------------------------------------*/
const MEMBER_NAMES = ["Mathayo Kissaro","James Kissaro","Junior Kissaro","Mama Naraha","Evaline Kissaro","Lightness Kissaro","Ndeshi Kissaro","Michael Kissaro","Jitu la Kale","Boma Ryaine"];

function buildDemoData() {
  const group = {
    name: "Umoja KIKOBA",
    regNo: "VIC/DSM/00234",
    location: "Dar es Salaam",
    phone: "+255 754 000 111",
    cycleLabel: "2026 Cycle",
    cycleStart: "2026-01-01",
    cycleEnd: "2026-12-31",
    contributionAmount: 50000,
    contributionFrequency: "Monthly",
    shareValue: 10000,
    maxSharesPerContribution: 10,
    interestRate: 0.05,
    interestMethod: "Flat",
    loanPeriodMonths: 3,
    maxLoanMultiplier: 3,
    minGuarantors: 2,
    latePenaltyRate: 0.02,
    entranceFee: 20000,
    socialFundAmount: 5000,
  };

  const months = ["January","February","March","April","May","June","July","August"];
  const members = [];
  for (let i = 0; i < MEMBER_NAMES.length; i++) {
    const id = "KKB-" + String(i + 1).padStart(4, "0");
    const name = MEMBER_NAMES[i];
    members.push({
      id,
      name,
      phone: "+255 7" + (10000000 + i * 13579).toString().slice(0, 8),
      joined: "2026-01-05",
      status: "ACTIVE",
      savings: 0,
      shares: 0,
      socialFund: 0,
      fines: 0,
    });
  }

  const contributions = [];
  const ledger = [];
  let txSeq = 1;
  const nextTx = () => "TXN-" + String(txSeq++).padStart(5, "0");

  members.forEach((m, idx) => {
    // vary how many months paid to create realistic PAID/PARTIAL/UNPAID mix
    const monthsPaid = idx % 6 === 0 ? months.length - 1 : months.length;
    months.forEach((month, mi) => {
      if (mi >= monthsPaid) return;
      let paid = group.contributionAmount;
      let status = "PAID";
      if (idx % 7 === 3 && mi === months.length - 1) {
        paid = 25000; status = "PARTIAL";
      }
      contributions.push({
        id: `C-${m.id}-${mi}`,
        memberId: m.id,
        month,
        year: 2026,
        expected: group.contributionAmount,
        paid,
        status,
        date: `2026-${String(mi + 1).padStart(2, "0")}-05`,
      });
      m.savings += paid;
      m.shares += Math.floor(paid / group.shareValue);
      const social = 5000;
      m.socialFund += social;
      ledger.push({
        id: nextTx(), date: `2026-${String(mi + 1).padStart(2, "0")}-05`, memberId: m.id,
        type: "CONTRIBUTION", amount: paid, ref: `${month} contribution`, createdBy: "Treasurer",
      });
      ledger.push({
        id: nextTx(), date: `2026-${String(mi + 1).padStart(2, "0")}-05`, memberId: m.id,
        type: "SOCIAL FUND", amount: social, ref: `${month} social fund`, createdBy: "Treasurer",
      });
    });
  });

  // Loans for a handful of members
  const loans = [];
  let loanSeq = 1;
  const nextLoan = () => "LN-" + String(loanSeq++).padStart(5, "0");

  function makeLoan(memberIdx, principal, disbursedDate, monthsAgoPaid, guarantorIdxs) {
    const m = members[memberIdx];
    const interest = Math.round(principal * group.interestRate);
    const total = principal + interest;
    const per = Math.round(total / group.loanPeriodMonths);
    const schedule = [];
    for (let i = 1; i <= group.loanPeriodMonths; i++) {
      const due = addMonths(disbursedDate, i);
      const amt = i === group.loanPeriodMonths ? total - per * (group.loanPeriodMonths - 1) : per;
      schedule.push({ n: i, dueDate: due, amount: amt, paid: 0, status: "PENDING" });
    }
    // simulate some repayments
    let remaining = monthsAgoPaid;
    let paidTotal = 0;
    for (const inst of schedule) {
      if (remaining > 0) {
        inst.paid = inst.amount;
        inst.status = "PAID";
        paidTotal += inst.amount;
        remaining--;
      }
    }
    const outstanding = total - paidTotal;
    let status = "ACTIVE";
    if (outstanding <= 0) status = "COMPLETED";
    else {
      const nextDue = schedule.find((s) => s.status !== "PAID");
      if (nextDue && new Date(nextDue.dueDate) < new Date("2026-09-11")) status = "OVERDUE";
    }
    const id = nextLoan();
    ledger.push({ id: nextTx(), date: disbursedDate, memberId: m.id, type: "LOAN DISBURSEMENT", amount: -principal, ref: id, createdBy: "Treasurer" });
    schedule.forEach((s) => {
      if (s.status === "PAID") {
        ledger.push({ id: nextTx(), date: s.dueDate, memberId: m.id, type: "LOAN REPAYMENT", amount: s.amount, ref: `${id} inst.${s.n}`, createdBy: "Treasurer" });
      }
    });
    loans.push({
      id, memberId: m.id, principal, interest, total, period: group.loanPeriodMonths,
      purpose: "Business", disbursedDate, status, schedule, outstanding,
      guarantors: guarantorIdxs.map((gi) => members[gi].id),
      penalties: 0,
    });
  }

  makeLoan(0, 600000, "2026-06-10", 2, [1, 2]);   // Mathayo - overdue
  makeLoan(3, 400000, "2026-07-01", 1, [4, 5]);   // Mama Naraha - overdue
  makeLoan(7, 500000, "2026-05-15", 3, [8, 9]);   // Michael - completed
  makeLoan(9, 300000, "2026-08-20", 0, [1, 2]);   // Boma Ryaine - active, current

  members.forEach((m) => {
    const active = loans.filter((l) => l.memberId === m.id && l.status !== "COMPLETED");
    m.currentLoan = active.reduce((s, l) => s + l.total, 0);
    m.outstandingLoan = active.reduce((s, l) => s + l.outstanding, 0);
  });

  const expenses = [
    { id: "E-0001", date: "2026-03-12", amount: 40000, category: "Stationery", description: "Receipt books & registers", approvedBy: "Chairperson" },
    { id: "E-0002", date: "2026-05-20", amount: 60000, category: "Meeting expenses", description: "Venue & refreshments", approvedBy: "Chairperson" },
    { id: "E-0003", date: "2026-07-04", amount: 25000, category: "Transport", description: "Bank visit", approvedBy: "Treasurer" },
  ];
  expenses.forEach((e) => {
    ledger.push({ id: nextTx(), date: e.date, memberId: null, type: "EXPENSE", amount: -e.amount, ref: e.description, createdBy: e.approvedBy });
  });

  ledger.sort((a, b) => new Date(a.date) - new Date(b.date));

  return { group, members, contributions, loans, expenses, ledger, txSeq, loanSeq };
}

/* ---------------------------------------------------------------
   SMALL UI PRIMITIVES
----------------------------------------------------------------*/
const Card = ({ children, className = "", onClick }) => (
  <div
    onClick={onClick}
    className={`bg-white rounded-2xl border border-[#E7E2D8] ${onClick ? "active:scale-[0.98] cursor-pointer" : ""} ${className}`}
    style={{ transition: "transform 0.08s ease" }}
  >
    {children}
  </div>
);

const Pill = ({ tone = "neutral", children }) => {
  const tones = {
    neutral: "bg-[#F1EEE6] text-[#6B7A72]",
    good: "bg-[#E7F2ED] text-[#1F6F5C]",
    warn: "bg-[#FBF0DD] text-[#8A5A0F]",
    bad: "bg-[#FBEAE6] text-[#B23A2E]",
  };
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[12px] font-semibold ${tones[tone]}`}>
      {children}
    </span>
  );
};

const PrimaryButton = ({ children, onClick, disabled, className = "", type = "button" }) => (
  <button
    type={type}
    onClick={onClick}
    disabled={disabled}
    className={`w-full h-14 rounded-2xl font-bold text-[16px] flex items-center justify-center gap-2 transition-all
      ${disabled ? "bg-[#E7E2D8] text-[#A7A196] cursor-not-allowed" : "bg-[#1F6F5C] text-white active:bg-[#14493D]"} ${className}`}
  >
    {children}
  </button>
);

const SecondaryButton = ({ children, onClick, className = "" }) => (
  <button
    onClick={onClick}
    className={`w-full h-14 rounded-2xl font-bold text-[16px] flex items-center justify-center gap-2 border-2 border-[#1F6F5C] text-[#1F6F5C] active:bg-[#E7F2ED] ${className}`}
  >
    {children}
  </button>
);

const Field = ({ label, children }) => (
  <div className="mb-4">
    <label className="block text-[13px] font-semibold text-[#6B7A72] mb-1.5">{label}</label>
    {children}
  </div>
);

const inputCls = "w-full h-14 rounded-2xl border border-[#E7E2D8] bg-[#FAF8F3] px-4 text-[16px] font-semibold text-[#16211C] outline-none focus:border-[#1F6F5C]";

const Header = ({ title, onBack, right }) => (
  <div className="sticky top-0 z-20 bg-[#FAF8F3]/95 backdrop-blur border-b border-[#E7E2D8] px-4 h-14 flex items-center justify-between">
    <div className="flex items-center gap-2 min-w-0">
      {onBack && (
        <button onClick={onBack} className="w-9 h-9 -ml-2 flex items-center justify-center rounded-full active:bg-[#F1EEE6]">
          <ChevronLeft size={22} />
        </button>
      )}
      <h1 className="text-[17px] font-extrabold text-[#16211C] truncate">{title}</h1>
    </div>
    {right}
  </div>
);

const Sheet = ({ open, onClose, title, children }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative w-full max-w-md bg-[#FAF8F3] rounded-t-3xl max-h-[92vh] overflow-y-auto">
        <div className="sticky top-0 bg-[#FAF8F3] flex items-center justify-between px-5 pt-4 pb-3 border-b border-[#E7E2D8]">
          <h2 className="text-[17px] font-extrabold">{title}</h2>
          <button onClick={onClose} className="w-9 h-9 flex items-center justify-center rounded-full active:bg-[#F1EEE6]">
            <X size={20} />
          </button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
};

const Toast = ({ msg, tone = "good" }) => {
  if (!msg) return null;
  const tones = { good: "bg-[#1F6F5C]", bad: "bg-[#B23A2E]" };
  return (
    <div className="fixed left-1/2 -translate-x-1/2 bottom-24 z-[60] px-4">
      <div className={`${tones[tone]} text-white font-semibold text-[14px] px-5 py-3 rounded-2xl shadow-lg flex items-center gap-2`}>
        {tone === "good" ? <CheckCircle2 size={18} /> : <XCircle size={18} />}
        {msg}
      </div>
    </div>
  );
};

/* ---------------------------------------------------------------
   MEMBER PICKER
----------------------------------------------------------------*/
function MemberPicker({ members, value, onChange, placeholder = "Select member" }) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const selected = members.find((m) => m.id === value);
  const filtered = members.filter(
    (m) => m.name.toLowerCase().includes(q.toLowerCase()) || m.id.toLowerCase().includes(q.toLowerCase())
  );
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={`${inputCls} flex items-center justify-between text-left`}
      >
        <span className={selected ? "" : "text-[#A7A196] font-medium"}>
          {selected ? `${selected.name} · ${selected.id}` : placeholder}
        </span>
        <ChevronDown size={18} className="text-[#A7A196]" />
      </button>
      <Sheet open={open} onClose={() => setOpen(false)} title="Select member">
        <div className="relative mb-3">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A7A196]" />
          <input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search name or ID"
            className={inputCls + " pl-11"}
          />
        </div>
        <div className="space-y-2 max-h-[55vh] overflow-y-auto">
          {filtered.map((m) => (
            <button
              key={m.id}
              onClick={() => { onChange(m.id); setOpen(false); setQ(""); }}
              className="w-full text-left p-3 rounded-xl border border-[#E7E2D8] active:bg-[#F1EEE6] flex items-center justify-between"
            >
              <div>
                <div className="font-bold text-[15px]">{m.name}</div>
                <div className="text-[12px] text-[#6B7A72]">{m.id} · Savings {TZS(m.savings)}</div>
              </div>
              {m.id === value && <Check size={18} className="text-[#1F6F5C]" />}
            </button>
          ))}
        </div>
      </Sheet>
    </>
  );
}

/* ---------------------------------------------------------------
   APP
----------------------------------------------------------------*/
function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("home");
  const [screen, setScreen] = useState(null); // {name, props}
  const [toast, setToast] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await storage.get("kikoba-state-v2");
        if (res && res.value) {
          setData(JSON.parse(res.value));
        } else {
          const fresh = buildDemoData();
          setData(fresh);
          await storage.set("kikoba-state-v2", JSON.stringify(fresh));
        }
      } catch (e) {
        setData(buildDemoData());
      }
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    if (!data) return;
    const t = setTimeout(() => {
      storage.set("kikoba-state-v2", JSON.stringify(data)).catch(() => {});
    }, 300);
    return () => clearTimeout(t);
  }, [data]);

  const showToast = (msg, tone = "good") => {
    setToast({ msg, tone });
    setTimeout(() => setToast(null), 2200);
  };

  const resetDemo = async () => {
    const fresh = buildDemoData();
    setData(fresh);
    await storage.set("kikoba-state-v2", JSON.stringify(fresh)).catch(() => {});
    showToast("Demo data reset");
  };

  if (loading || !data) {
    return (
      <div style={{ fontFamily: "Manrope, sans-serif" }} className="min-h-[600px] flex items-center justify-center bg-[#FAF8F3]">
        <div className="text-[#1F6F5C] font-bold">Loading KIKOBA…</div>
      </div>
    );
  }

  const derived = computeDerived(data);

  const goto = (name, props = {}) => setScreen({ name, props });
  const back = () => setScreen(null);

  return (
    <div style={{ fontFamily: "Manrope, sans-serif" }} className="relative mx-auto max-w-md bg-[#FAF8F3] min-h-[700px] pb-20 text-[#16211C]">
      {!screen && tab === "home" && <HomeScreen data={data} derived={derived} goto={goto} setTab={setTab} />}
      {!screen && tab === "members" && <MembersScreen data={data} derived={derived} goto={goto} />}
      {!screen && tab === "savings" && <SavingsScreen data={data} goto={goto} />}
      {!screen && tab === "loans" && <LoansScreen data={data} derived={derived} goto={goto} />}
      {!screen && tab === "more" && <MoreScreen data={data} derived={derived} goto={goto} resetDemo={resetDemo} />}

      {screen?.name === "memberProfile" && (
        <MemberProfileScreen data={data} derived={derived} memberId={screen.props.memberId} back={back} />
      )}
      {screen?.name === "addMember" && (
        <AddMemberScreen data={data} setData={setData} back={back} showToast={showToast} />
      )}
      {screen?.name === "recordContribution" && (
        <RecordContributionScreen data={data} setData={setData} back={back} showToast={showToast} preselect={screen.props.memberId} />
      )}
      {screen?.name === "newLoan" && (
        <NewLoanScreen data={data} derived={derived} setData={setData} back={back} showToast={showToast} preselect={screen.props.memberId} />
      )}
      {screen?.name === "loanDetail" && (
        <LoanDetailScreen data={data} derived={derived} loanId={screen.props.loanId} back={back} goto={goto} />
      )}
      {screen?.name === "repayLoan" && (
        <RepayLoanScreen data={data} setData={setData} back={back} showToast={showToast} preselect={screen.props} />
      )}
      {screen?.name === "ledger" && <LedgerScreen data={data} back={back} />}
      {screen?.name === "expenses" && <ExpensesScreen data={data} setData={setData} back={back} showToast={showToast} />}
      {screen?.name === "profit" && <ProfitScreen data={data} derived={derived} back={back} goto={goto} />}
      {screen?.name === "shareout" && <ShareOutScreen data={data} derived={derived} back={back} />}
      {screen?.name === "settings" && <SettingsScreen data={data} setData={setData} back={back} showToast={showToast} />}

      {!screen && <BottomNav tab={tab} setTab={setTab} />}
      <Toast msg={toast?.msg} tone={toast?.tone} />
    </div>
  );
}

/* ---------------------------------------------------------------
   DERIVED FINANCIALS
----------------------------------------------------------------*/
function computeDerived(data) {
  const { group, members, loans, ledger, expenses } = data;
  const totalSavings = members.reduce((s, m) => s + m.savings, 0);
  const totalShares = members.reduce((s, m) => s + m.shares, 0);
  const totalSocialFund = members.reduce((s, m) => s + m.socialFund, 0);
  const outstandingLoans = loans.filter((l) => l.status !== "COMPLETED").reduce((s, l) => s + l.outstanding, 0);
  const activeLoans = loans.filter((l) => l.status !== "COMPLETED");
  const overdueLoans = loans.filter((l) => l.status === "OVERDUE");
  const availableFunds = totalSavings - outstandingLoans;

  const interestIncome = loans.reduce((s, l) => {
    const paidPortion = l.schedule.filter((x) => x.status === "PAID").reduce((a, x) => a + x.amount, 0);
    const ratio = l.total > 0 ? l.interest / l.total : 0;
    return s + paidPortion * ratio;
  }, 0);
  const penaltyIncome = loans.reduce((s, l) => s + (l.penalties || 0), 0);
  const totalExpenses = expenses.reduce((s, e) => s + e.amount, 0);
  const netProfit = interestIncome + penaltyIncome - totalExpenses;

  const monthsList = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  const currentMonthIdx = 7; // August, matching seeded data window before "today"
  const contributionsThisMonth = data.contributions.filter((c) => c.month === monthsList[currentMonthIdx]);
  const paidIds = new Set(contributionsThisMonth.filter((c) => c.status === "PAID").map((c) => c.memberId));
  const notPaidCount = members.filter((m) => !paidIds.has(m.id)).length;

  return {
    totalSavings, totalShares, totalSocialFund, outstandingLoans, activeLoans,
    overdueLoans, availableFunds, interestIncome, penaltyIncome, totalExpenses,
    netProfit, notPaidCount, fullyPaidCount: paidIds.size,
  };
}

function memberById(data, id) {
  return data.members.find((m) => m.id === id);
}

/* ---------------------------------------------------------------
   BOTTOM NAV
----------------------------------------------------------------*/
function BottomNav({ tab, setTab }) {
  const items = [
    { key: "home", label: "Home", icon: Home },
    { key: "members", label: "Members", icon: Users },
    { key: "savings", label: "Savings", icon: PiggyBank },
    { key: "loans", label: "Loans", icon: Landmark },
    { key: "more", label: "More", icon: MoreHorizontal },
  ];
  return (
    <div className="fixed bottom-0 left-0 right-0 mx-auto max-w-md bg-white border-t border-[#E7E2D8] flex z-30">
      {items.map(({ key, label, icon: Icon }) => (
        <button
          key={key}
          onClick={() => setTab(key)}
          className="flex-1 flex flex-col items-center justify-center gap-0.5 py-2.5"
        >
          <Icon size={22} strokeWidth={tab === key ? 2.6 : 2} color={tab === key ? "#1F6F5C" : "#A7A196"} />
          <span className={`text-[11px] font-bold ${tab === key ? "text-[#1F6F5C]" : "text-[#A7A196]"}`}>{label}</span>
        </button>
      ))}
    </div>
  );
}

/* ---------------------------------------------------------------
   HOME
----------------------------------------------------------------*/
function HomeScreen({ data, derived, goto, setTab }) {
  const { group } = data;
  return (
    <div>
      <div className="bg-[#14493D] text-white px-5 pt-7 pb-8 rounded-b-[28px]">
        <div className="text-[13px] font-semibold text-[#B9D6C8] uppercase tracking-wide">{group.name}</div>
        <div className="text-[22px] font-extrabold mt-0.5">{group.cycleLabel}</div>
        <div className="grid grid-cols-2 gap-3 mt-5">
          <StatBlock label="Members" value={data.members.length} />
          <StatBlock label="Savings" value={TZS(derived.totalSavings)} />
          <StatBlock label="Outstanding Loans" value={TZS(derived.outstandingLoans)} />
          <StatBlock label="Available Funds" value={TZS(derived.availableFunds)} />
        </div>
      </div>

      <div className="px-4 mt-5">
        <SectionTitle>Quick actions</SectionTitle>
        <div className="grid grid-cols-2 gap-3">
          <QuickAction icon={PiggyBank} label="Contribution" onClick={() => goto("recordContribution")} />
          <QuickAction icon={Landmark} label="New Loan" onClick={() => goto("newLoan")} />
          <QuickAction icon={ArrowUpCircle} label="Repayment" onClick={() => setTab("loans")} />
          <QuickAction icon={Users} label="Members" onClick={() => setTab("members")} />
        </div>
      </div>

      <div className="px-4 mt-6">
        <SectionTitle>Alerts</SectionTitle>
        <div className="space-y-2">
          {derived.overdueLoans.length > 0 && (
            <AlertRow tone="bad" text={`${derived.overdueLoans.length} overdue loan${derived.overdueLoans.length > 1 ? "s" : ""}`} onClick={() => setTab("loans")} />
          )}
          {derived.notPaidCount > 0 && (
            <AlertRow tone="warn" text={`${derived.notPaidCount} members haven't contributed this month`} onClick={() => setTab("savings")} />
          )}
          <AlertRow tone="good" text={`${derived.fullyPaidCount} members fully paid this month`} onClick={() => setTab("savings")} />
        </div>
      </div>

      <div className="px-4 mt-6">
        <SectionTitle>This cycle</SectionTitle>
        <Card className="p-4">
          <Row label="Interest income" value={TZS(derived.interestIncome)} />
          <Row label="Expenses" value={"– " + TZS(derived.totalExpenses)} />
          <div className="h-px bg-[#E7E2D8] my-2" />
          <Row label="Net profit so far" value={TZS(derived.netProfit)} bold />
        </Card>
      </div>
    </div>
  );
}

const StatBlock = ({ label, value }) => (
  <div className="bg-white/10 rounded-2xl px-4 py-3">
    <div className="text-[12px] text-[#B9D6C8] font-semibold">{label}</div>
    <div className="text-[19px] font-extrabold mt-0.5 leading-tight">{value}</div>
  </div>
);

const SectionTitle = ({ children }) => (
  <div className="text-[13px] font-extrabold text-[#6B7A72] mb-2.5">{children}</div>
);

const QuickAction = ({ icon: Icon, label, onClick }) => (
  <button onClick={onClick} className="bg-white border border-[#E7E2D8] rounded-2xl p-4 flex flex-col items-start gap-3 active:bg-[#F1EEE6]">
    <div className="w-10 h-10 rounded-xl bg-[#E7F2ED] flex items-center justify-center">
      <Icon size={20} color="#1F6F5C" />
    </div>
    <span className="font-bold text-[14px]">{label}</span>
  </button>
);

const AlertRow = ({ tone, text, onClick }) => {
  const dot = { bad: "#B23A2E", warn: "#C98A2C", good: "#1F6F5C" }[tone];
  return (
    <Card onClick={onClick} className="p-3.5 flex items-center gap-3">
      <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: dot }} />
      <span className="text-[14px] font-semibold flex-1">{text}</span>
      <ChevronRight size={18} className="text-[#A7A196]" />
    </Card>
  );
};

const Row = ({ label, value, bold }) => (
  <div className="flex items-center justify-between py-1">
    <span className={`text-[14px] ${bold ? "font-extrabold" : "text-[#6B7A72] font-medium"}`}>{label}</span>
    <span className={`text-[14px] ${bold ? "font-extrabold text-[#1F6F5C]" : "font-bold"}`}>{value}</span>
  </div>
);

/* ---------------------------------------------------------------
   MEMBERS
----------------------------------------------------------------*/
function MembersScreen({ data, derived, goto }) {
  const [q, setQ] = useState("");
  const filtered = data.members.filter(
    (m) => m.name.toLowerCase().includes(q.toLowerCase()) || m.id.toLowerCase().includes(q.toLowerCase()) || m.phone.includes(q)
  );
  return (
    <div>
      <Header title="Members" right={
        <button onClick={() => goto("addMember")} className="w-9 h-9 rounded-full bg-[#1F6F5C] flex items-center justify-center">
          <Plus size={20} color="white" />
        </button>
      } />
      <div className="p-4">
        <div className="relative mb-4">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A7A196]" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search member name, ID or phone" className={inputCls + " pl-11"} />
        </div>
        <div className="space-y-2.5">
          {filtered.map((m) => (
            <Card key={m.id} onClick={() => goto("memberProfile", { memberId: m.id })} className="p-4 flex items-center justify-between">
              <div className="min-w-0">
                <div className="font-extrabold text-[15px] truncate">{m.name}</div>
                <div className="text-[12px] text-[#6B7A72] font-semibold">{m.id} · Savings {TZS(m.savings)}</div>
              </div>
              <div className="flex flex-col items-end gap-1 flex-shrink-0 ml-2">
                <Pill tone={m.status === "ACTIVE" ? "good" : m.status === "SUSPENDED" ? "warn" : "neutral"}>{m.status}</Pill>
                {m.outstandingLoan > 0 && <span className="text-[11px] font-bold text-[#B23A2E]">{TZS(m.outstandingLoan)} due</span>}
              </div>
            </Card>
          ))}
          {filtered.length === 0 && <EmptyState text="No members match your search." />}
        </div>
      </div>
    </div>
  );
}

const EmptyState = ({ text }) => (
  <div className="text-center py-10 text-[#A7A196] font-semibold text-[14px]">{text}</div>
);

function AddMemberScreen({ data, setData, back, showToast }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const canSave = name.trim().length > 1 && phone.trim().length >= 9;

  const save = () => {
    const nextNum = data.members.length + 1;
    const id = "KKB-" + String(nextNum).padStart(4, "0");
    const member = {
      id, name: name.trim(), phone: phone.trim(), joined: todayISO(), status: "ACTIVE",
      savings: 0, shares: 0, socialFund: 0, fines: 0, currentLoan: 0, outstandingLoan: 0,
    };
    setData((d) => ({ ...d, members: [...d.members, member] }));
    showToast(`${member.name} added as ${id}`);
    back();
  };

  return (
    <div>
      <Header title="Add Member" onBack={back} />
      <div className="p-4">
        <Field label="Full name">
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Grace Mushi" className={inputCls} />
        </Field>
        <Field label="Phone number">
          <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+255 7XX XXX XXX" className={inputCls} />
        </Field>
        <div className="bg-[#FBF0DD] text-[#8A5A0F] text-[13px] font-semibold rounded-2xl p-3.5 mb-4">
          Entrance fee of {TZS(data.group.entranceFee)} applies and will be recorded once payment is confirmed.
        </div>
        <PrimaryButton disabled={!canSave} onClick={save}>Save member</PrimaryButton>
      </div>
    </div>
  );
}

function MemberProfileScreen({ data, derived, memberId, back }) {
  const m = memberById(data, memberId);
  if (!m) return null;
  const loans = data.loans.filter((l) => l.memberId === memberId);
  const contributions = data.contributions.filter((c) => c.memberId === memberId);
  const ownership = derived.totalSavings > 0 ? m.savings / derived.totalSavings : 0;
  const memberProfit = derived.netProfit > 0 ? ownership * derived.netProfit : 0;

  return (
    <div>
      <Header title={m.name} onBack={back} />
      <div className="p-4">
        <Card className="p-4 mb-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="font-extrabold text-[16px]">{m.name}</div>
              <div className="text-[12px] text-[#6B7A72] font-semibold">{m.id} · {m.phone}</div>
            </div>
            <Pill tone={m.status === "ACTIVE" ? "good" : "warn"}>{m.status}</Pill>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <MiniStat label="Total Savings" value={TZS(m.savings)} />
            <MiniStat label="Total Shares" value={m.shares} />
            <MiniStat label="Current Loan" value={TZS(m.currentLoan || 0)} />
            <MiniStat label="Outstanding" value={TZS(m.outstandingLoan || 0)} tone={m.outstandingLoan > 0 ? "bad" : "good"} />
            <MiniStat label="Social Fund" value={TZS(m.socialFund)} />
            <MiniStat label="Fines" value={TZS(m.fines)} />
          </div>
        </Card>

        <Card className="p-4 mb-4">
          <SectionTitle>Estimated profit share (this cycle)</SectionTitle>
          <div className="text-[13px] text-[#6B7A72] font-medium mb-2">
            {TZS(m.savings)} ÷ {TZS(derived.totalSavings)} = {(ownership * 100).toFixed(1)}% ownership
          </div>
          <Row label="Profit so far" value={TZS(memberProfit)} bold />
        </Card>

        <SectionTitle>Loan history</SectionTitle>
        <div className="space-y-2 mb-4">
          {loans.length === 0 && <EmptyState text="No loans yet." />}
          {loans.map((l) => (
            <Card key={l.id} className="p-3.5 flex items-center justify-between">
              <div>
                <div className="font-bold text-[14px]">{l.id} · {TZS(l.principal)}</div>
                <div className="text-[12px] text-[#6B7A72] font-semibold">Disbursed {fmtDate(l.disbursedDate)}</div>
              </div>
              <StatusPill status={l.status} />
            </Card>
          ))}
        </div>

        <SectionTitle>Contribution history</SectionTitle>
        <div className="space-y-2">
          {contributions.slice(-6).reverse().map((c) => (
            <Card key={c.id} className="p-3.5 flex items-center justify-between">
              <div>
                <div className="font-bold text-[14px]">{c.month} {c.year}</div>
                <div className="text-[12px] text-[#6B7A72] font-semibold">Paid {TZS(c.paid)} of {TZS(c.expected)}</div>
              </div>
              <StatusPill status={c.status} />
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

const MiniStat = ({ label, value, tone }) => (
  <div>
    <div className="text-[11.5px] text-[#6B7A72] font-semibold">{label}</div>
    <div className={`text-[16px] font-extrabold ${tone === "bad" ? "text-[#B23A2E]" : tone === "good" ? "text-[#1F6F5C]" : ""}`}>{value}</div>
  </div>
);

function StatusPill({ status }) {
  const map = {
    PAID: "good", COMPLETED: "good", ACTIVE: "good",
    PARTIAL: "warn", PENDING: "neutral", "PENDING APPROVAL": "warn",
    UNPAID: "bad", OVERDUE: "bad", DEFAULT: "bad", REJECTED: "bad",
  };
  return <Pill tone={map[status] || "neutral"}>{status}</Pill>;
}

/* ---------------------------------------------------------------
   SAVINGS
----------------------------------------------------------------*/
function SavingsScreen({ data, goto }) {
  const monthsList = ["January","February","March","April","May","June","July","August"];
  const currentMonth = monthsList[monthsList.length - 1];
  const rows = data.members.map((m) => {
    const c = data.contributions.find((x) => x.memberId === m.id && x.month === currentMonth);
    return { member: m, contribution: c };
  });

  return (
    <div>
      <Header title="Savings" />
      <div className="p-4">
        <PrimaryButton onClick={() => goto("recordContribution")} className="mb-5">
          <Plus size={18} /> Record contribution
        </PrimaryButton>
        <SectionTitle>{currentMonth} 2026 status</SectionTitle>
        <div className="space-y-2">
          {rows.map(({ member, contribution }) => (
            <Card key={member.id} onClick={() => goto("recordContribution", { memberId: member.id })} className="p-3.5 flex items-center justify-between">
              <div>
                <div className="font-bold text-[14px]">{member.name}</div>
                <div className="text-[12px] text-[#6B7A72] font-semibold">
                  {contribution ? `Paid ${TZS(contribution.paid)} of ${TZS(contribution.expected)}` : `Expected ${TZS(data.group.contributionAmount)}`}
                </div>
              </div>
              <StatusPill status={contribution?.status || "UNPAID"} />
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

function RecordContributionScreen({ data, setData, back, showToast, preselect }) {
  const monthsList = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  const currentMonth = "August";
  const [memberId, setMemberId] = useState(preselect || "");
  const [amount, setAmount] = useState(String(data.group.contributionAmount));
  const [month, setMonth] = useState(currentMonth);
  const [step, setStep] = useState("form"); // form | confirm | receipt

  const member = memberById(data, memberId);
  const amt = Number(amount) || 0;
  const expected = data.group.contributionAmount;
  const existing = member ? data.contributions.find((c) => c.memberId === member.id && c.month === month) : null;
  const alreadyPaid = existing ? existing.paid : 0;
  const newTotal = alreadyPaid + amt;
  const status = newTotal >= expected ? "PAID" : newTotal > 0 ? "PARTIAL" : "UNPAID";
  const shares = Math.floor(amt / data.group.shareValue);

  const canContinue = member && amt > 0;

  const confirm = () => {
    setData((d) => {
      const contributions = [...d.contributions];
      const idx = contributions.findIndex((c) => c.memberId === member.id && c.month === month);
      if (idx >= 0) {
        contributions[idx] = { ...contributions[idx], paid: newTotal, status, date: todayISO() };
      } else {
        contributions.push({
          id: `C-${member.id}-${month}`, memberId: member.id, month, year: 2026,
          expected, paid: newTotal, status, date: todayISO(),
        });
      }
      const members = d.members.map((m) =>
        m.id === member.id ? { ...m, savings: m.savings + amt, shares: m.shares + shares } : m
      );
      const seq = (d.txSeq || 1);
      const ledger = [...d.ledger, {
        id: "TXN-" + String(seq).padStart(5, "0"), date: todayISO(), memberId: member.id,
        type: "CONTRIBUTION", amount: amt, ref: `${month} contribution`, createdBy: "Treasurer",
      }];
      return { ...d, contributions, members, ledger, txSeq: seq + 1 };
    });
    setStep("receipt");
    showToast("Contribution recorded");
  };

  if (step === "receipt") {
    return (
      <div>
        <Header title="Receipt" onBack={back} />
        <div className="p-4">
          <Card className="p-6 text-center mb-5">
            <div className="w-14 h-14 rounded-full bg-[#E7F2ED] flex items-center justify-center mx-auto mb-3">
              <CheckCircle2 size={28} color="#1F6F5C" />
            </div>
            <div className="text-[13px] font-semibold text-[#6B7A72]">Contribution received from</div>
            <div className="text-[18px] font-extrabold mt-0.5">{member.name}</div>
            <div className="text-[30px] font-extrabold text-[#1F6F5C] mt-3">{TZS(amt)}</div>
            <div className="text-[13px] font-semibold text-[#6B7A72] mt-1">{month} 2026 · {shares} share{shares !== 1 ? "s" : ""}</div>
            <div className="h-px bg-[#E7E2D8] my-4" />
            <Row label="Status" value={status} bold />
          </Card>
          <PrimaryButton onClick={back}>Done</PrimaryButton>
        </div>
      </div>
    );
  }

  if (step === "confirm") {
    return (
      <div>
        <Header title="Confirm Contribution" onBack={() => setStep("form")} />
        <div className="p-4">
          <Card className="p-5 mb-5">
            <Row label="Member" value={member.name} />
            <Row label="Month" value={`${month} 2026`} />
            <div className="h-px bg-[#E7E2D8] my-2" />
            <Row label="Amount" value={TZS(amt)} bold />
            <Row label="Shares earned" value={`${shares} share${shares !== 1 ? "s" : ""}`} />
            <Row label="New status" value={status} bold />
          </Card>
          <PrimaryButton onClick={confirm}>Confirm payment</PrimaryButton>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header title="Record Contribution" onBack={back} />
      <div className="p-4">
        <Field label="Member">
          <MemberPicker members={data.members} value={memberId} onChange={setMemberId} />
        </Field>
        <Field label="Month">
          <select value={month} onChange={(e) => setMonth(e.target.value)} className={inputCls}>
            {monthsList.map((mo) => <option key={mo} value={mo}>{mo} 2026</option>)}
          </select>
        </Field>
        <Field label="Amount (TZS)">
          <input inputMode="numeric" value={amount} onChange={(e) => setAmount(e.target.value.replace(/[^0-9]/g, ""))} className={inputCls} />
        </Field>
        {member && (
          <Card className="p-4 mb-4 bg-[#F1EEE6] border-0">
            <Row label="Expected" value={TZS(expected)} />
            <Row label="Already paid" value={TZS(alreadyPaid)} />
            <Row label="Balance after payment" value={TZS(Math.max(expected - newTotal, 0))} bold />
          </Card>
        )}
        <PrimaryButton disabled={!canContinue} onClick={() => setStep("confirm")}>Continue</PrimaryButton>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------
   LOANS
----------------------------------------------------------------*/
function LoansScreen({ data, derived, goto }) {
  const sorted = [...data.loans].sort((a, b) => (a.status === "OVERDUE" ? -1 : 1));
  return (
    <div>
      <Header title="Loans" />
      <div className="p-4">
        <PrimaryButton onClick={() => goto("newLoan")} className="mb-5">
          <Plus size={18} /> New loan application
        </PrimaryButton>

        {derived.overdueLoans.length > 0 && (
          <div className="mb-5">
            <SectionTitle>🔴 Overdue</SectionTitle>
            <div className="space-y-2">
              {derived.overdueLoans.map((l) => {
                const m = memberById(data, l.memberId);
                const nextDue = l.schedule.find((s) => s.status !== "PAID");
                const days = nextDue ? daysBetween(nextDue.dueDate, "2026-09-11") : 0;
                return (
                  <Card key={l.id} onClick={() => goto("loanDetail", { loanId: l.id })} className="p-3.5">
                    <div className="flex items-center justify-between">
                      <div className="font-extrabold text-[14px]">{m.name}</div>
                      <span className="text-[12px] font-bold text-[#B23A2E]">{days} days overdue</span>
                    </div>
                    <div className="text-[13px] text-[#6B7A72] font-semibold mt-0.5">Outstanding {TZS(l.outstanding)}</div>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        <SectionTitle>All loans</SectionTitle>
        <div className="space-y-2">
          {sorted.map((l) => {
            const m = memberById(data, l.memberId);
            return (
              <Card key={l.id} onClick={() => goto("loanDetail", { loanId: l.id })} className="p-3.5 flex items-center justify-between">
                <div>
                  <div className="font-bold text-[14px]">{m.name} · {l.id}</div>
                  <div className="text-[12px] text-[#6B7A72] font-semibold">
                    {TZS(l.principal)} · Outstanding {TZS(l.outstanding)}
                  </div>
                </div>
                <StatusPill status={l.status} />
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function eligibilityCheck(data, derived, member, principal, guarantorIds) {
  const reasons = [];
  if (!member) reasons.push("Select a member.");
  if (member && member.status !== "ACTIVE") reasons.push("Member is not active.");
  const hasOverdue = data.loans.some((l) => l.memberId === member?.id && l.status === "OVERDUE");
  if (hasOverdue) reasons.push("Existing overdue loan.");
  const maxLoan = member ? member.savings * data.group.maxLoanMultiplier : 0;
  if (member && principal > maxLoan) reasons.push(`Amount exceeds maximum loan of ${TZS(maxLoan)}.`);
  if (principal > 0 && principal > derived.availableFunds) reasons.push("Insufficient available lending funds in the group.");
  if (guarantorIds.filter(Boolean).length < data.group.minGuarantors) {
    reasons.push(`At least ${data.group.minGuarantors} guarantors are required.`);
  }
  return { eligible: reasons.length === 0, reasons, maxLoan };
}

function NewLoanScreen({ data, derived, setData, back, showToast, preselect }) {
  const [memberId, setMemberId] = useState(preselect || "");
  const [amount, setAmount] = useState("");
  const [purpose, setPurpose] = useState("Business");
  const [period, setPeriod] = useState(data.group.loanPeriodMonths);
  const [g1, setG1] = useState("");
  const [g2, setG2] = useState("");
  const [checked, setChecked] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const member = memberById(data, memberId);
  const principal = Number(amount) || 0;
  const guarantorIds = [g1, g2].filter(Boolean);
  const result = eligibilityCheck(data, derived, member, principal, guarantorIds);

  const interest = Math.round(principal * data.group.interestRate);
  const total = principal + interest;

  const submit = () => {
    const loanSeq = data.loanSeq || 1;
    const id = "LN-" + String(loanSeq).padStart(5, "0");
    const disbursedDate = todayISO();
    const per = Math.round(total / period);
    const schedule = [];
    for (let i = 1; i <= period; i++) {
      const dueDate = addMonths(disbursedDate, i);
      const amt = i === period ? total - per * (period - 1) : per;
      schedule.push({ n: i, dueDate, amount: amt, paid: 0, status: "PENDING" });
    }
    const loan = {
      id, memberId: member.id, principal, interest, total, period, purpose,
      disbursedDate, status: "ACTIVE", schedule, outstanding: total,
      guarantors: guarantorIds, penalties: 0,
    };
    setData((d) => {
      const members = d.members.map((m) =>
        m.id === member.id ? { ...m, currentLoan: (m.currentLoan || 0) + total, outstandingLoan: (m.outstandingLoan || 0) + total } : m
      );
      const seq = d.txSeq || 1;
      const ledger = [...d.ledger, {
        id: "TXN-" + String(seq).padStart(5, "0"), date: disbursedDate, memberId: member.id,
        type: "LOAN DISBURSEMENT", amount: -principal, ref: id, createdBy: "Treasurer",
      }];
      return { ...d, loans: [...d.loans, loan], members, ledger, txSeq: seq + 1, loanSeq: loanSeq + 1 };
    });
    setSubmitted(id);
    showToast("Loan disbursed");
  };

  if (submitted) {
    return (
      <div>
        <Header title="Loan Disbursed" onBack={back} />
        <div className="p-4">
          <Card className="p-6 text-center mb-5">
            <div className="w-14 h-14 rounded-full bg-[#E7F2ED] flex items-center justify-center mx-auto mb-3">
              <CheckCircle2 size={28} color="#1F6F5C" />
            </div>
            <div className="text-[13px] font-semibold text-[#6B7A72]">Loan {submitted} disbursed to</div>
            <div className="text-[18px] font-extrabold mt-0.5">{member.name}</div>
            <div className="text-[30px] font-extrabold text-[#1F6F5C] mt-3">{TZS(principal)}</div>
            <div className="text-[13px] font-semibold text-[#6B7A72] mt-1">Repayable {TZS(total)} over {period} months</div>
          </Card>
          <PrimaryButton onClick={back}>Done</PrimaryButton>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header title="New Loan" onBack={back} />
      <div className="p-4">
        <Field label="Member">
          <MemberPicker members={data.members} value={memberId} onChange={(v) => { setMemberId(v); setChecked(false); }} />
        </Field>
        <Field label="Amount (TZS)">
          <input inputMode="numeric" value={amount} onChange={(e) => { setAmount(e.target.value.replace(/[^0-9]/g, "")); setChecked(false); }} className={inputCls} placeholder="1,000,000" />
        </Field>
        <Field label="Purpose">
          <select value={purpose} onChange={(e) => setPurpose(e.target.value)} className={inputCls}>
            {["Business","Education","Medical","Agriculture","Other"].map((p) => <option key={p}>{p}</option>)}
          </select>
        </Field>
        <Field label="Period">
          <select value={period} onChange={(e) => { setPeriod(Number(e.target.value)); setChecked(false); }} className={inputCls}>
            {[1,2,3,4,5,6].map((p) => <option key={p} value={p}>{p} month{p > 1 ? "s" : ""}</option>)}
          </select>
        </Field>
        <Field label={`Guarantors (min ${data.group.minGuarantors})`}>
          <div className="space-y-2">
            <MemberPicker members={data.members.filter((m) => m.id !== memberId)} value={g1} onChange={(v) => { setG1(v); setChecked(false); }} placeholder="Guarantor 1" />
            <MemberPicker members={data.members.filter((m) => m.id !== memberId && m.id !== g1)} value={g2} onChange={(v) => { setG2(v); setChecked(false); }} placeholder="Guarantor 2" />
          </div>
        </Field>

        {principal > 0 && (
          <Card className="p-4 mb-4 bg-[#F1EEE6] border-0">
            <Row label="Interest (flat, 5%)" value={TZS(interest)} />
            <Row label="Total repayable" value={TZS(total)} bold />
          </Card>
        )}

        {!checked ? (
          <SecondaryButton onClick={() => setChecked(true)} className="mb-3">
            <ShieldCheck size={18} /> Check eligibility
          </SecondaryButton>
        ) : (
          <Card className={`p-4 mb-4 border-0 ${result.eligible ? "bg-[#E7F2ED]" : "bg-[#FBEAE6]"}`}>
            <div className={`flex items-center gap-2 font-extrabold text-[15px] mb-1 ${result.eligible ? "text-[#1F6F5C]" : "text-[#B23A2E]"}`}>
              {result.eligible ? <CheckCircle2 size={20} /> : <XCircle size={20} />}
              {result.eligible ? "ELIGIBLE" : "NOT ELIGIBLE"}
            </div>
            {result.eligible ? (
              <div className="text-[13px] font-semibold text-[#1F6F5C]">Maximum loan: {TZS(result.maxLoan)}</div>
            ) : (
              <ul className="text-[13px] font-semibold text-[#B23A2E] list-disc pl-5 space-y-0.5">
                {result.reasons.map((r, i) => <li key={i}>{r}</li>)}
              </ul>
            )}
          </Card>
        )}

        <PrimaryButton disabled={!checked || !result.eligible} onClick={submit}>
          Submit &amp; disburse
        </PrimaryButton>
      </div>
    </div>
  );
}

function LoanDetailScreen({ data, derived, loanId, back, goto }) {
  const loan = data.loans.find((l) => l.id === loanId);
  if (!loan) return null;
  const m = memberById(data, loan.memberId);
  return (
    <div>
      <Header title={loan.id} onBack={back} />
      <div className="p-4">
        <Card className="p-4 mb-4">
          <div className="flex items-center justify-between mb-2">
            <div className="font-extrabold text-[16px]">{m.name}</div>
            <StatusPill status={loan.status} />
          </div>
          <Row label="Principal" value={TZS(loan.principal)} />
          <Row label="Interest" value={TZS(loan.interest)} />
          <div className="h-px bg-[#E7E2D8] my-2" />
          <Row label="Total repayable" value={TZS(loan.total)} bold />
          <Row label="Outstanding" value={TZS(loan.outstanding)} bold />
          <Row label="Purpose" value={loan.purpose} />
          <Row label="Disbursed" value={fmtDate(loan.disbursedDate)} />
          <Row label="Guarantors" value={loan.guarantors.map((g) => memberById(data, g)?.name).join(", ")} />
        </Card>

        {loan.outstanding > 0 && (
          <PrimaryButton onClick={() => goto("repayLoan", { loanId: loan.id })} className="mb-5">
            <ArrowUpCircle size={18} /> Record repayment
          </PrimaryButton>
        )}

        <SectionTitle>Repayment schedule</SectionTitle>
        <div className="space-y-2">
          {loan.schedule.map((s) => (
            <Card key={s.n} className="p-3.5 flex items-center justify-between">
              <div>
                <div className="font-bold text-[14px]">Installment {s.n}</div>
                <div className="text-[12px] text-[#6B7A72] font-semibold">Due {fmtDate(s.dueDate)} · {TZS(s.amount)}</div>
              </div>
              <StatusPill status={s.status === "PAID" ? "PAID" : new Date(s.dueDate) < new Date("2026-09-11") ? "OVERDUE" : "PENDING"} />
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

function RepayLoanScreen({ data, setData, back, showToast, preselect }) {
  const [loanId, setLoanId] = useState(preselect?.loanId || "");
  const [amount, setAmount] = useState("");
  const [step, setStep] = useState("form");
  const loan = data.loans.find((l) => l.id === loanId);
  const activeLoans = data.loans.filter((l) => l.outstanding > 0);
  const amt = Number(amount) || 0;

  const pay = () => {
    setData((d) => {
      const loans = d.loans.map((l) => {
        if (l.id !== loanId) return l;
        let remaining = amt;
        const schedule = l.schedule.map((s) => {
          if (remaining <= 0 || s.status === "PAID") return s;
          const due = s.amount - s.paid;
          const pay = Math.min(due, remaining);
          remaining -= pay;
          const paid = s.paid + pay;
          return { ...s, paid, status: paid >= s.amount ? "PAID" : s.status };
        });
        const outstanding = Math.max(l.outstanding - amt, 0);
        const status = outstanding <= 0 ? "COMPLETED" : l.status === "OVERDUE" && outstanding < l.outstanding ? "ACTIVE" : l.status;
        return { ...l, schedule, outstanding, status };
      });
      const paidLoan = loans.find((l) => l.id === loanId);
      const members = d.members.map((m) => {
        if (m.id !== paidLoan.memberId) return m;
        return { ...m, outstandingLoan: Math.max((m.outstandingLoan || 0) - amt, 0) };
      });
      const seq = d.txSeq || 1;
      const ledger = [...d.ledger, {
        id: "TXN-" + String(seq).padStart(5, "0"), date: todayISO(), memberId: paidLoan.memberId,
        type: "LOAN REPAYMENT", amount: amt, ref: `${loanId} repayment`, createdBy: "Treasurer",
      }];
      return { ...d, loans, members, ledger, txSeq: seq + 1 };
    });
    setStep("done");
    showToast("Repayment recorded");
  };

  if (step === "done") {
    return (
      <div>
        <Header title="Repayment Recorded" onBack={back} />
        <div className="p-4">
          <Card className="p-6 text-center mb-5">
            <div className="w-14 h-14 rounded-full bg-[#E7F2ED] flex items-center justify-center mx-auto mb-3">
              <CheckCircle2 size={28} color="#1F6F5C" />
            </div>
            <div className="text-[30px] font-extrabold text-[#1F6F5C]">{TZS(amt)}</div>
            <div className="text-[13px] font-semibold text-[#6B7A72] mt-1">Applied to {loanId}</div>
          </Card>
          <PrimaryButton onClick={back}>Done</PrimaryButton>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header title="Repay Loan" onBack={back} />
      <div className="p-4">
        <Field label="Loan">
          <select value={loanId} onChange={(e) => setLoanId(e.target.value)} className={inputCls}>
            <option value="">Select a loan</option>
            {activeLoans.map((l) => {
              const m = memberById(data, l.memberId);
              return <option key={l.id} value={l.id}>{l.id} · {m.name}</option>;
            })}
          </select>
        </Field>
        {loan && (
          <Card className="p-4 mb-4 bg-[#F1EEE6] border-0">
            <Row label="Outstanding" value={TZS(loan.outstanding)} bold />
          </Card>
        )}
        <Field label="Amount paid (TZS)">
          <input inputMode="numeric" value={amount} onChange={(e) => setAmount(e.target.value.replace(/[^0-9]/g, ""))} className={inputCls} />
        </Field>
        <PrimaryButton disabled={!loan || amt <= 0 || amt > loan.outstanding} onClick={pay}>
          Confirm payment
        </PrimaryButton>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------
   MORE: Ledger, Expenses, Profit, Share-out, Settings
----------------------------------------------------------------*/
function MoreScreen({ data, derived, goto, resetDemo }) {
  const items = [
    { icon: FileText, label: "Financial ledger", onClick: () => goto("ledger") },
    { icon: Receipt, label: "Expenses", onClick: () => goto("expenses") },
    { icon: TrendingUp, label: "Profit calculation", onClick: () => goto("profit") },
    { icon: Wallet, label: "Cycle share-out", onClick: () => goto("shareout") },
    { icon: Settings, label: "Group settings", onClick: () => goto("settings") },
  ];
  return (
    <div>
      <Header title="More" />
      <div className="p-4 space-y-2.5">
        {items.map(({ icon: Icon, label, onClick }) => (
          <Card key={label} onClick={onClick} className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#E7F2ED] flex items-center justify-center">
              <Icon size={19} color="#1F6F5C" />
            </div>
            <span className="font-bold text-[15px] flex-1">{label}</span>
            <ChevronRight size={18} className="text-[#A7A196]" />
          </Card>
        ))}
        <button onClick={resetDemo} className="w-full text-center text-[13px] font-semibold text-[#A7A196] mt-6 py-2">
          Reset demo data
        </button>
      </div>
    </div>
  );
}

function LedgerScreen({ data, back }) {
  const [filter, setFilter] = useState("ALL");
  const types = ["ALL", "CONTRIBUTION", "SOCIAL FUND", "LOAN DISBURSEMENT", "LOAN REPAYMENT", "EXPENSE"];
  const rows = [...data.ledger].reverse().filter((r) => filter === "ALL" || r.type === filter);
  return (
    <div>
      <Header title="Financial Ledger" onBack={back} />
      <div className="px-4 pt-3 pb-1 overflow-x-auto flex gap-2 whitespace-nowrap">
        {types.map((t) => (
          <button key={t} onClick={() => setFilter(t)}
            className={`px-3 py-1.5 rounded-full text-[12px] font-bold flex-shrink-0 ${filter === t ? "bg-[#1F6F5C] text-white" : "bg-[#F1EEE6] text-[#6B7A72]"}`}>
            {t}
          </button>
        ))}
      </div>
      <div className="p-4 space-y-2">
        {rows.map((r) => (
          <Card key={r.id} className="p-3.5 flex items-center gap-3">
            {r.amount >= 0 ? <ArrowDownCircle size={20} className="text-[#1F6F5C]" /> : <ArrowUpCircle size={20} className="text-[#B23A2E]" />}
            <div className="flex-1 min-w-0">
              <div className="font-bold text-[13.5px] truncate">{r.type}{r.memberId ? ` · ${memberById(data, r.memberId)?.name || r.memberId}` : ""}</div>
              <div className="text-[11.5px] text-[#6B7A72] font-semibold">{fmtDate(r.date)} · {r.ref}</div>
            </div>
            <span className={`font-extrabold text-[14px] ${r.amount >= 0 ? "text-[#1F6F5C]" : "text-[#B23A2E]"}`}>
              {r.amount >= 0 ? "+" : "−"}{TZS(Math.abs(r.amount))}
            </span>
          </Card>
        ))}
      </div>
    </div>
  );
}

function ExpensesScreen({ data, setData, back, showToast }) {
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Meeting expenses");
  const [description, setDescription] = useState("");
  const categories = ["Bank charges","Administration","Meeting expenses","Stationery","Transport","Other"];

  const save = () => {
    const amt = Number(amount) || 0;
    if (amt <= 0) return;
    const id = "E-" + String(data.expenses.length + 1).padStart(4, "0");
    const expense = { id, date: todayISO(), amount: amt, category, description, approvedBy: "Treasurer" };
    setData((d) => {
      const seq = d.txSeq || 1;
      const ledger = [...d.ledger, {
        id: "TXN-" + String(seq).padStart(5, "0"), date: todayISO(), memberId: null,
        type: "EXPENSE", amount: -amt, ref: description || category, createdBy: "Treasurer",
      }];
      return { ...d, expenses: [...d.expenses, expense], ledger, txSeq: seq + 1 };
    });
    showToast("Expense recorded");
    setOpen(false);
    setAmount(""); setDescription("");
  };

  return (
    <div>
      <Header title="Expenses" onBack={back} right={
        <button onClick={() => setOpen(true)} className="w-9 h-9 rounded-full bg-[#1F6F5C] flex items-center justify-center">
          <Plus size={20} color="white" />
        </button>
      } />
      <div className="p-4 space-y-2">
        {[...data.expenses].reverse().map((e) => (
          <Card key={e.id} className="p-3.5 flex items-center justify-between">
            <div>
              <div className="font-bold text-[14px]">{e.category}</div>
              <div className="text-[12px] text-[#6B7A72] font-semibold">{fmtDate(e.date)} · {e.description}</div>
            </div>
            <span className="font-extrabold text-[14px] text-[#B23A2E]">−{TZS(e.amount)}</span>
          </Card>
        ))}
      </div>
      <Sheet open={open} onClose={() => setOpen(false)} title="Record Expense">
        <Field label="Amount (TZS)">
          <input inputMode="numeric" value={amount} onChange={(e) => setAmount(e.target.value.replace(/[^0-9]/g, ""))} className={inputCls} />
        </Field>
        <Field label="Category">
          <select value={category} onChange={(e) => setCategory(e.target.value)} className={inputCls}>
            {categories.map((c) => <option key={c}>{c}</option>)}
          </select>
        </Field>
        <Field label="Description">
          <input value={description} onChange={(e) => setDescription(e.target.value)} className={inputCls} placeholder="e.g. Venue hire" />
        </Field>
        <PrimaryButton onClick={save}>Save expense</PrimaryButton>
      </Sheet>
    </div>
  );
}

function ProfitScreen({ data, derived, back, goto }) {
  return (
    <div>
      <Header title="Profit Calculation" onBack={back} />
      <div className="p-4">
        <Card className="p-4 mb-5">
          <SectionTitle>Net profit this cycle</SectionTitle>
          <Row label="Interest income" value={TZS(derived.interestIncome)} />
          <Row label="Penalty income" value={TZS(derived.penaltyIncome)} />
          <Row label="Other income" value={TZS(0)} />
          <Row label="Expenses" value={"– " + TZS(derived.totalExpenses)} />
          <div className="h-px bg-[#E7E2D8] my-2" />
          <Row label="Net profit" value={TZS(derived.netProfit)} bold />
        </Card>

        <SectionTitle>Distribution by savings ownership</SectionTitle>
        <div className="text-[13px] text-[#6B7A72] font-medium mb-3">
          Member profit = (member savings ÷ total group savings) × net profit
        </div>
        <div className="space-y-2">
          {data.members.map((m) => {
            const ownership = derived.totalSavings > 0 ? m.savings / derived.totalSavings : 0;
            const profit = derived.netProfit > 0 ? ownership * derived.netProfit : 0;
            return (
              <Card key={m.id} className="p-3.5 flex items-center justify-between">
                <div>
                  <div className="font-bold text-[14px]">{m.name}</div>
                  <div className="text-[12px] text-[#6B7A72] font-semibold">{(ownership * 100).toFixed(1)}% ownership</div>
                </div>
                <span className="font-extrabold text-[14px] text-[#1F6F5C]">{TZS(profit)}</span>
              </Card>
            );
          })}
        </div>
        <PrimaryButton onClick={() => goto("shareout")} className="mt-5">
          Continue to share-out
        </PrimaryButton>
      </div>
    </div>
  );
}

function ShareOutScreen({ data, derived, back }) {
  const rows = data.members.map((m) => {
    const ownership = derived.totalSavings > 0 ? m.savings / derived.totalSavings : 0;
    const profit = derived.netProfit > 0 ? ownership * derived.netProfit : 0;
    const finalAmount = m.savings + profit - (m.outstandingLoan || 0) - (m.fines || 0);
    return { m, profit, finalAmount };
  });
  const totalShareOut = rows.reduce((s, r) => s + r.finalAmount, 0);

  return (
    <div>
      <Header title="Cycle Share-Out" onBack={back} />
      <div className="p-4">
        <div className="bg-[#FBF0DD] text-[#8A5A0F] text-[13px] font-semibold rounded-2xl p-3.5 mb-4 flex items-start gap-2">
          <AlertTriangle size={18} className="flex-shrink-0 mt-0.5" />
          This is a preview based on current balances. Closing the cycle requires administrator confirmation and reconciliation of all accounts.
        </div>
        <Card className="p-4 mb-5">
          <Row label="Total to be shared out" value={TZS(totalShareOut)} bold />
        </Card>
        <SectionTitle>Per member</SectionTitle>
        <div className="space-y-2">
          {rows.map(({ m, profit, finalAmount }) => (
            <Card key={m.id} className="p-3.5">
              <div className="flex items-center justify-between mb-2">
                <div className="font-extrabold text-[14px]">{m.name}</div>
                <span className="font-extrabold text-[15px] text-[#1F6F5C]">{TZS(finalAmount)}</span>
              </div>
              <div className="text-[12px] text-[#6B7A72] font-medium space-y-0.5">
                <div>Savings {TZS(m.savings)} + Profit {TZS(profit)} − Loan {TZS(m.outstandingLoan || 0)} − Fines {TZS(m.fines || 0)}</div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

function SettingsScreen({ data, setData, back, showToast }) {
  const g = data.group;
  const [form, setForm] = useState({ ...g });

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const save = () => {
    setData((d) => ({
      ...d,
      group: {
        ...d.group,
        ...form,
        contributionAmount: Number(form.contributionAmount),
        shareValue: Number(form.shareValue),
        interestRate: Number(form.interestRate),
        loanPeriodMonths: Number(form.loanPeriodMonths),
        maxLoanMultiplier: Number(form.maxLoanMultiplier),
        minGuarantors: Number(form.minGuarantors),
        entranceFee: Number(form.entranceFee),
        socialFundAmount: Number(form.socialFundAmount),
      },
    }));
    showToast("Group settings updated");
    back();
  };

  return (
    <div>
      <Header title="Group Settings" onBack={back} />
      <div className="p-4">
        <Field label="Group name">
          <input value={form.name} onChange={set("name")} className={inputCls} />
        </Field>
        <Field label="Contribution amount (TZS)">
          <input inputMode="numeric" value={form.contributionAmount} onChange={set("contributionAmount")} className={inputCls} />
        </Field>
        <Field label="Share value (TZS)">
          <input inputMode="numeric" value={form.shareValue} onChange={set("shareValue")} className={inputCls} />
        </Field>
        <Field label="Loan interest rate (decimal, e.g. 0.05 = 5%)">
          <input value={form.interestRate} onChange={set("interestRate")} className={inputCls} />
        </Field>
        <Field label="Loan repayment period (months)">
          <input inputMode="numeric" value={form.loanPeriodMonths} onChange={set("loanPeriodMonths")} className={inputCls} />
        </Field>
        <Field label="Maximum loan multiplier (× savings)">
          <input inputMode="numeric" value={form.maxLoanMultiplier} onChange={set("maxLoanMultiplier")} className={inputCls} />
        </Field>
        <Field label="Minimum guarantors">
          <input inputMode="numeric" value={form.minGuarantors} onChange={set("minGuarantors")} className={inputCls} />
        </Field>
        <Field label="Entrance fee (TZS)">
          <input inputMode="numeric" value={form.entranceFee} onChange={set("entranceFee")} className={inputCls} />
        </Field>
        <Field label="Social fund contribution (TZS)">
          <input inputMode="numeric" value={form.socialFundAmount} onChange={set("socialFundAmount")} className={inputCls} />
        </Field>
        <PrimaryButton onClick={save}>Save settings</PrimaryButton>
      </div>
    </div>
  );
}




export default App;
