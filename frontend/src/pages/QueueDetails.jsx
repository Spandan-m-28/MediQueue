import { useState, useEffect, useRef } from "react";
import {
  Stethoscope, Bell, User, ChevronDown, Menu, X, ChevronRight,
  ArrowLeft, Clock, Users, Activity, CheckCircle2, XCircle,
  AlertCircle, Timer, Calendar, Wifi, RefreshCw, Plus,
  Hash, TrendingUp, Play, Pause, LogIn, Ticket, Zap,
  CircleDot, Check, ArrowRight, Info, MapPin, Phone,
} from "lucide-react";
import Footer from "../components/Footer.jsx";
import Navbar from "../components/Navbar.jsx";

// ─── Mock Data ────────────────────────────────────────────────────────────────
const MOCK_QUEUE = {
  id: "q-cardio-001",
  departmentName: "Cardiology",
  hospitalName: "Apollo Hospitals",
  hospitalCity: "Chennai",
  doctorName: "Dr. R. Krishnamurthy",
  status: "active",
  currentToken: 25,
  totalPatients: 14,
  avgConsultMins: 20,
  startTime: "08:00 AM",
  endTime: "02:00 PM",
  tokensServed: 24,
  totalCapacity: 40,
  myToken: null, // set to a number if already joined
};

const MOCK_TIMELINE = [
  { id: 1, type: "completed", token: 24, message: "Token #24 consultation completed", time: "11:42 AM", ago: "3 min ago" },
  { id: 2, type: "called",    token: 25, message: "Token #25 called to counter",      time: "11:40 AM", ago: "5 min ago" },
  { id: 3, type: "resumed",   token: null, message: "Queue resumed after break",      time: "11:30 AM", ago: "15 min ago" },
  { id: 4, type: "joined",    token: 22, message: "New patient joined the queue",     time: "11:20 AM", ago: "25 min ago" },
  { id: 5, type: "completed", token: 22, message: "Token #22 consultation completed", time: "11:15 AM", ago: "30 min ago" },
  { id: 6, type: "called",    token: 23, message: "Token #23 called to counter",      time: "11:10 AM", ago: "35 min ago" },
];

// ─── Timeline icon/color config ───────────────────────────────────────────────
const TIMELINE_CONFIG = {
  completed: { Icon: CheckCircle2, color: "text-emerald-500", bg: "bg-emerald-50",  border: "border-emerald-100", label: "Completed" },
  called:    { Icon: Zap,          color: "text-blue-500",    bg: "bg-blue-50",     border: "border-blue-100",    label: "Called"    },
  resumed:   { Icon: Play,         color: "text-teal-500",    bg: "bg-teal-50",     border: "border-teal-100",    label: "Resumed"   },
  joined:    { Icon: LogIn,        color: "text-purple-500",  bg: "bg-purple-50",   border: "border-purple-100",  label: "Joined"    },
};

// ═══════════════════════════════════════════════════════════════
// REUSABLE COMPONENTS
// ═══════════════════════════════════════════════════════════════

// ─── StatusBadge ──────────────────────────────────────────────
function StatusBadge({ status }) {
  const map = {
    active:  { icon: CheckCircle2, text: "Active",  cls: "bg-emerald-50 text-emerald-700 border-emerald-100" },
    paused:  { icon: Pause,        text: "Paused",  cls: "bg-amber-50   text-amber-700   border-amber-100"   },
    closed:  { icon: XCircle,      text: "Closed",  cls: "bg-red-50     text-red-700     border-red-100"     },
    waiting: { icon: Clock,        text: "Waiting", cls: "bg-blue-50    text-blue-700    border-blue-100"    },
  };
  const cfg = map[status] || map.waiting;
  const Icon = cfg.icon;
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${cfg.cls}`}>
      <Icon size={11} />
      {cfg.text}
    </span>
  );
}

// ─── StatCard ─────────────────────────────────────────────────
function StatCard({ icon: Icon, label, value, unit, color, bg, border, pulse }) {
  return (
    <div className={`bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 group`}>
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 border ${bg} ${border} transition-transform duration-300 group-hover:scale-110`}>
        <Icon size={18} className={`${color} ${pulse ? "animate-pulse" : ""}`} />
      </div>
      <div className="text-2xl font-bold text-gray-900">{value}</div>
      <div className="text-sm text-gray-500 mt-0.5">{label}</div>
      {unit && <div className={`text-xs font-medium mt-1 ${color}`}>{unit}</div>}
    </div>
  );
}

// ─── PrimaryButton ────────────────────────────────────────────
function PrimaryButton({ children, onClick, variant = "solid", size = "md", icon: Icon, disabled, loading }) {
  const base = "inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed";
  const sizes = { sm: "px-4 py-2 text-xs", md: "px-5 py-2.5 text-sm", lg: "px-7 py-3.5 text-base" };
  const variants = {
    solid:   "bg-blue-600 text-white hover:bg-blue-700 shadow-sm shadow-blue-200 hover:shadow-md hover:shadow-blue-200 hover:-translate-y-0.5",
    outline: "border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white hover:-translate-y-0.5",
    teal:    "bg-teal-500 text-white hover:bg-teal-600 shadow-sm shadow-teal-200 hover:shadow-md hover:-translate-y-0.5",
    danger:  "bg-red-500 text-white hover:bg-red-600 shadow-sm shadow-red-200 hover:-translate-y-0.5",
    ghost:   "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
  };
  return (
    <button onClick={onClick} disabled={disabled || loading} className={`${base} ${sizes[size]} ${variants[variant]}`}>
      {loading ? <RefreshCw size={15} className="animate-spin" /> : Icon ? <Icon size={15} /> : null}
      {children}
    </button>
  );
}

// ─── LoadingSkeleton ──────────────────────────────────────────
function LoadingSkeleton() {
  return (
    <div className="animate-pulse space-y-6">
      {/* hero skeleton */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1 space-y-3">
            <div className="h-5 bg-gray-200 rounded-full w-32" />
            <div className="h-8 bg-gray-200 rounded-full w-56" />
            <div className="h-4 bg-gray-100 rounded-full w-44" />
            <div className="flex gap-2 mt-4">
              {[1,2,3].map(i => <div key={i} className="h-7 bg-gray-100 rounded-full w-24" />)}
            </div>
          </div>
          <div className="w-full md:w-52 h-52 bg-gray-100 rounded-2xl" />
        </div>
      </div>
      {/* stats skeleton */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[1,2,3,4].map(i => (
          <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5">
            <div className="w-10 h-10 bg-gray-100 rounded-xl mb-3" />
            <div className="h-7 bg-gray-200 rounded-full w-16 mb-2" />
            <div className="h-3 bg-gray-100 rounded-full w-20" />
          </div>
        ))}
      </div>
      {/* card skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 p-6 h-80" />
        <div className="bg-white rounded-2xl border border-gray-100 p-6 h-80" />
      </div>
    </div>
  );
}

// ─── EmptyState ───────────────────────────────────────────────
function EmptyState({ title, subtitle, actionLabel, onAction }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mb-4">
        <Activity size={28} className="text-blue-300" />
      </div>
      <h3 className="text-gray-800 font-semibold text-base mb-1">{title}</h3>
      <p className="text-gray-400 text-sm mb-5 max-w-xs">{subtitle}</p>
      {actionLabel && (
        <PrimaryButton onClick={onAction}>{actionLabel}</PrimaryButton>
      )}
    </div>
  );
}

// ─── ErrorState ───────────────────────────────────────────────
function ErrorState({ onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center py-32 text-center">
      <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center mb-5">
        <AlertCircle size={34} className="text-red-300" />
      </div>
      <h3 className="text-gray-800 font-semibold text-lg mb-1">Queue data unavailable</h3>
      <p className="text-gray-400 text-sm mb-6 max-w-xs">We couldn't fetch the queue details. Check your connection and try again.</p>
      <PrimaryButton onClick={onRetry} icon={RefreshCw}>Retry</PrimaryButton>
    </div>
  );
}

// ─── SearchBar ────────────────────────────────────────────────
function SearchBar({ value, onChange, placeholder }) {
  return (
    <div className="relative">
      <Hash size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
      <input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
        className="w-full h-10 pl-9 pr-4 rounded-xl border border-gray-200 bg-white text-sm text-gray-800 placeholder-gray-400 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition-all" />
    </div>
  );
}

// ─── FilterButton ─────────────────────────────────────────────
function FilterButton({ label, active, onClick }) {
  return (
    <button onClick={onClick}
      className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
        active ? "bg-blue-600 text-white border-blue-600" : "bg-white text-gray-600 border-gray-200 hover:border-blue-300 hover:text-blue-600"
      }`}>
      {label}
    </button>
  );
}

// ─── QueueSummaryCard (the big token display) ─────────────────
function QueueSummaryCard({ queue, myToken, onJoin, onLeave, joining }) {
  const progress = Math.round((queue.tokensServed / queue.totalCapacity) * 100);
  const waitMins = queue.totalPatients * queue.avgConsultMins;
  const hasJoined = myToken !== null;

  // animated token counter
  const [displayToken, setDisplayToken] = useState(queue.currentToken);
  useEffect(() => { setDisplayToken(queue.currentToken); }, [queue.currentToken]);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden"
      style={{ boxShadow: "0 4px 24px -4px rgba(37,99,235,0.10)" }}>

      {/* top gradient bar */}
      <div className="h-1.5 bg-gradient-to-r from-blue-600 via-teal-500 to-blue-400" />

      <div className="p-6 md:p-8">
        <div className="flex flex-col lg:flex-row gap-8 items-start">

          {/* LEFT — big token display */}
          <div className="flex-1 w-full">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-widest">Live Queue</span>
            </div>

            {/* Token spotlight */}
            <div className="relative flex flex-col sm:flex-row items-start sm:items-end gap-6 mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-blue-600 rounded-3xl blur-xl opacity-10 scale-110" />
                <div className="relative bg-gradient-to-br from-blue-600 to-blue-700 rounded-3xl p-6 sm:p-8 text-white shadow-lg shadow-blue-200 min-w-[140px] text-center">
                  <div className="text-xs font-semibold uppercase tracking-widest text-blue-200 mb-1">Current Token</div>
                  <div className="text-6xl sm:text-7xl font-black leading-none tabular-nums">{displayToken}</div>
                  <div className="mt-2"><StatusBadge status={queue.status} /></div>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <div className="bg-gray-50 rounded-2xl px-5 py-3 border border-gray-100">
                  <div className="text-xs text-gray-400 mb-0.5">Patients Waiting</div>
                  <div className="text-3xl font-bold text-gray-900 tabular-nums">{queue.totalPatients}</div>
                </div>
                <div className="bg-amber-50 rounded-2xl px-5 py-3 border border-amber-100">
                  <div className="text-xs text-amber-500 mb-0.5 font-medium">Est. Wait</div>
                  <div className="text-3xl font-bold text-amber-700 tabular-nums">{waitMins}<span className="text-base font-medium ml-1">min</span></div>
                </div>
              </div>
            </div>

            {/* Progress bar */}
            <div className="mb-2 flex items-center justify-between text-xs text-gray-500">
              <span>Queue Progress</span>
              <span className="font-semibold text-blue-600">{progress}% complete</span>
            </div>
            <div className="h-3 bg-gray-100 rounded-full overflow-hidden mb-1">
              <div
                className="h-full rounded-full bg-gradient-to-r from-blue-500 to-teal-400 transition-all duration-700"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>{queue.tokensServed} served</span>
              <span>{queue.totalCapacity} capacity</span>
            </div>
          </div>

          {/* RIGHT — action panel */}
          <div className="w-full lg:w-72 shrink-0">
            <div className={`rounded-2xl border p-6 ${hasJoined ? "bg-emerald-50 border-emerald-100" : "bg-blue-50 border-blue-100"}`}>

              {hasJoined ? (
                <>
                  <div className="text-center mb-5">
                    <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-3 border border-emerald-200">
                      <Ticket size={26} className="text-emerald-600" />
                    </div>
                    <div className="text-xs text-emerald-600 font-semibold uppercase tracking-widest mb-1">My Token</div>
                    <div className="text-5xl font-black text-emerald-700 tabular-nums">{myToken}</div>
                    <div className="mt-2 text-xs text-emerald-600 font-medium">
                      {myToken - queue.currentToken > 0
                        ? `${myToken - queue.currentToken} patients ahead of you`
                        : "You're next! 🎉"
                      }
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-3 border border-emerald-100 mb-4 text-center">
                    <div className="text-xs text-gray-400 mb-0.5">Your estimated wait</div>
                    <div className="text-xl font-bold text-gray-800">
                      {Math.max(0, (myToken - queue.currentToken)) * queue.avgConsultMins} min
                    </div>
                  </div>

                  <PrimaryButton variant="danger" size="md" onClick={onLeave} className="w-full">
                    Leave Queue
                  </PrimaryButton>
                  <p className="text-xs text-center text-emerald-500 mt-3">Keep this page open for live updates</p>
                </>
              ) : (
                <>
                  <div className="text-center mb-5">
                    <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-3 border border-blue-200">
                      <Plus size={26} className="text-blue-600" />
                    </div>
                    <h3 className="font-bold text-gray-900 text-base mb-1">Join the Queue</h3>
                    <p className="text-xs text-gray-500 leading-relaxed">Get a token and monitor your position in real-time without waiting in-person.</p>
                  </div>

                  <div className="space-y-2 mb-5">
                    {[
                      "Instant digital token",
                      "Live position tracking",
                      "SMS alerts (coming soon)",
                    ].map(f => (
                      <div key={f} className="flex items-center gap-2 text-xs text-gray-600">
                        <div className="w-4 h-4 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                          <Check size={9} className="text-blue-600" />
                        </div>
                        {f}
                      </div>
                    ))}
                  </div>

                  <button onClick={onJoin} disabled={joining || queue.status !== "active"}
                    className="w-full py-3.5 rounded-xl bg-blue-600 text-white font-bold text-sm flex items-center justify-center gap-2 hover:bg-blue-700 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md shadow-blue-200 hover:shadow-lg hover:shadow-blue-200 hover:-translate-y-0.5">
                    {joining
                      ? <><RefreshCw size={15} className="animate-spin" /> Joining…</>
                      : <><LogIn size={15} /> Join Queue</>
                    }
                  </button>
                  {queue.status !== "active" && (
                    <p className="text-xs text-center text-red-500 mt-2">Queue is currently {queue.status}</p>
                  )}
                </>
              )}
            </div>

            {/* Quick meta */}
            <div className="mt-4 grid grid-cols-2 gap-3">
              {[
                { label: "Opens",  value: queue.startTime, icon: Play  },
                { label: "Closes", value: queue.endTime,   icon: XCircle },
              ].map(({ label, value, icon: Icon }) => (
                <div key={label} className="bg-white rounded-xl border border-gray-100 px-3 py-2.5 flex items-center gap-2">
                  <Icon size={13} className="text-gray-400 shrink-0" />
                  <div>
                    <div className="text-xs text-gray-400">{label}</div>
                    <div className="text-xs font-semibold text-gray-700">{value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Queue Info Cards row ─────────────────────────────────────
function QueueInfoCards({ queue }) {
  const waitMins = queue.totalPatients * queue.avgConsultMins;
  const cards = [
    { icon: Hash,      label: "Current Token",   value: `#${queue.currentToken}`, unit: "now serving",     color: "text-blue-600",   bg: "bg-blue-50",   border: "border-blue-100",   pulse: false },
    { icon: Users,     label: "Patients Waiting", value: queue.totalPatients,      unit: "in queue",        color: "text-purple-600", bg: "bg-purple-50", border: "border-purple-100", pulse: false },
    { icon: Timer,     label: "Est. Wait Time",   value: `${waitMins}`,            unit: "minutes approx",  color: "text-amber-600",  bg: "bg-amber-50",  border: "border-amber-100",  pulse: false },
    { icon: Activity,  label: "Queue Status",     value: queue.status,             unit: `${queue.tokensServed} served`, color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-100", pulse: true },
  ];
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map(c => <StatCard key={c.label} {...c} />)}
    </div>
  );
}

// ─── Timeline ────────────────────────────────────────────────
function ActivityTimeline({ events }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden" style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>
      <div className="px-5 py-4 border-b border-gray-50 flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-gray-900 text-sm">Recent Activity</h3>
          <p className="text-xs text-gray-400 mt-0.5">Live event log — ready for Socket.IO</p>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-medium bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-full">
          <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
          Live
        </div>
      </div>

      <div className="divide-y divide-gray-50">
        {events.length === 0 ? (
          <EmptyState title="No activity yet" subtitle="Queue events will appear here in real-time." />
        ) : events.map((ev, idx) => {
          const cfg = TIMELINE_CONFIG[ev.type] || TIMELINE_CONFIG.joined;
          const Icon = cfg.Icon;
          return (
            <div key={ev.id} className="px-5 py-3.5 flex items-start gap-3 hover:bg-gray-50 transition-colors">
              {/* spine */}
              <div className="flex flex-col items-center shrink-0 mt-0.5">
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center border ${cfg.bg} ${cfg.border}`}>
                  <Icon size={14} className={cfg.color} />
                </div>
                {idx < events.length - 1 && <div className="w-px h-full min-h-4 bg-gray-100 mt-1" />}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm text-gray-700 leading-snug">{ev.message}</p>
                  <span className="text-xs text-gray-400 shrink-0 whitespace-nowrap">{ev.ago}</span>
                </div>
                <span className={`inline-flex items-center gap-1 mt-1 px-2 py-0.5 rounded-full text-xs font-medium border ${cfg.bg} ${cfg.color} ${cfg.border}`}>
                  {cfg.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Queue Side Panel ────────────────────────────────────────
function QueueSidePanel({ queue }) {
  return (
    <div className="space-y-4">
      {/* Department info */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5" style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>
        <h3 className="font-semibold text-gray-900 text-sm mb-4">Department Info</h3>
        <div className="space-y-3">
          {[
            { icon: Stethoscope, label: "Department", value: queue.departmentName },
            { icon: MapPin,      label: "Hospital",   value: queue.hospitalName   },
            { icon: User,        label: "Doctor",     value: queue.doctorName     },
            { icon: Clock,       label: "Consult",    value: `~${queue.avgConsultMins} min avg` },
            { icon: Calendar,    label: "Start",      value: queue.startTime      },
            { icon: Calendar,    label: "End",        value: queue.endTime        },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-lg bg-gray-50 flex items-center justify-center border border-gray-100 shrink-0">
                <Icon size={13} className="text-gray-400" />
              </div>
              <div className="min-w-0">
                <div className="text-xs text-gray-400">{label}</div>
                <div className="text-sm font-medium text-gray-800 truncate">{value}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick tips */}
      <div className="bg-gradient-to-br from-blue-50 to-teal-50 rounded-2xl border border-blue-100 p-5">
        <div className="flex items-center gap-2 mb-3">
          <Info size={14} className="text-blue-600" />
          <h3 className="font-semibold text-blue-900 text-sm">Tips</h3>
        </div>
        <ul className="space-y-2">
          {[
            "Arrive 5 min before your turn.",
            "Keep your token number handy.",
            "Page auto-refreshes every 30s.",
            "SMS alerts coming soon.",
          ].map(tip => (
            <li key={tip} className="flex items-start gap-2 text-xs text-blue-700">
              <ArrowRight size={11} className="text-teal-500 mt-0.5 shrink-0" />
              {tip}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// MAIN PAGE
// ═══════════════════════════════════════════════════════════════
export default function QueueDetails() {
  const [queue, setQueue]         = useState(null);
  const [timeline, setTimeline]   = useState([]);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState(false);
  const [myToken, setMyToken]     = useState(null);
  const [joining, setJoining]     = useState(false);
  const [lastRefresh, setLastRefresh] = useState(new Date());
  const [refreshing, setRefreshing]   = useState(false);
  const intervalRef = useRef(null);

  const load = () => {
    setLoading(true); setError(false);
    const t = setTimeout(() => {
      // Replace with: axios.get(`/api/queues/${id}`).then(r => { setQueue(r.data); setTimeline(...) })
      setQueue(MOCK_QUEUE);
      setTimeline(MOCK_TIMELINE);
      setLoading(false);
      setLastRefresh(new Date());
    }, 1500);
    return () => clearTimeout(t);
  };

  const silentRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      // Simulate token bump
      setQueue(prev => prev ? { ...prev, currentToken: prev.currentToken } : prev);
      setLastRefresh(new Date());
      setRefreshing(false);
    }, 600);
  };

  useEffect(() => {
    const cleanup = load();
    // Auto-refresh every 30s — replace with Socket.IO listener
    intervalRef.current = setInterval(silentRefresh, 30000);
    return () => { cleanup(); clearInterval(intervalRef.current); };
  }, []);

  const handleJoin = () => {
    setJoining(true);
    setTimeout(() => {
      const newToken = (queue?.currentToken || 25) + queue.totalPatients + 1;
      setMyToken(newToken);
      setQueue(prev => prev ? { ...prev, totalPatients: prev.totalPatients + 1 } : prev);
      setTimeline(prev => [{
        id: Date.now(), type: "joined", token: newToken,
        message: `New patient joined the queue (Token #${newToken})`,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        ago: "just now",
      }, ...prev]);
      setJoining(false);
    }, 1200);
  };

  const handleLeave = () => {
    setMyToken(null);
    setQueue(prev => prev ? { ...prev, totalPatients: Math.max(0, prev.totalPatients - 1) } : prev);
  };

  const fmtTime = (d) => d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });

  return (
    <div className="min-h-screen bg-[#F8FAFC]" style={{ fontFamily: "'Inter', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;900&display=swap" rel="stylesheet" />

      <Navbar/>

      {/* ── Notice Banner ── */}
      <div className="bg-gradient-to-r from-blue-600 to-teal-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-white text-xs font-medium">
            <Wifi size={13} className="shrink-0 animate-pulse" />
            <span>Real-time updates will appear automatically while this page is open.</span>
          </div>
          <div className="flex items-center gap-2 text-white/80 text-xs shrink-0">
            <RefreshCw size={11} className={refreshing ? "animate-spin" : ""} />
            <span className="hidden sm:inline">Updated {fmtTime(lastRefresh)}</span>
          </div>
        </div>
      </div>

      {/* ── Breadcrumb ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <a href="#" className="hover:text-blue-600 transition-colors">Home</a>
          <ChevronRight size={12} />
          <a href="#" className="hover:text-blue-600 transition-colors">Hospitals</a>
          <ChevronRight size={12} />
          <a href="#" className="hover:text-blue-600 transition-colors">{loading ? "…" : queue?.hospitalName}</a>
          <ChevronRight size={12} />
          <span className="text-gray-700 font-medium">{loading ? "…" : queue?.departmentName} Queue</span>
        </div>
      </div>

      {/* ── Page header ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <button className="w-9 h-9 rounded-xl border border-gray-200 bg-white flex items-center justify-center text-gray-500 hover:bg-gray-50 hover:text-blue-600 transition-all group">
              <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
            </button>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl md:text-2xl font-bold text-gray-900">
                  {loading ? "Loading queue…" : `${queue?.departmentName} Queue`}
                </h1>
                {!loading && queue && <StatusBadge status={queue.status} />}
              </div>
              {!loading && queue && (
                <p className="text-sm text-gray-500 mt-0.5">{queue.hospitalName} · {queue.hospitalCity}</p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button onClick={silentRefresh} disabled={refreshing}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl border border-gray-200 bg-white text-sm font-medium text-gray-600 hover:border-blue-300 hover:text-blue-600 transition-all disabled:opacity-50">
              <RefreshCw size={14} className={refreshing ? "animate-spin" : ""} />
              <span className="hidden sm:inline">Refresh</span>
            </button>
            {myToken && (
              <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-50 border border-emerald-100 text-sm font-semibold text-emerald-700">
                <Ticket size={14} />
                Token #{myToken}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Main content ── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 space-y-6">
        {loading ? <LoadingSkeleton /> : error ? <ErrorState onRetry={load} /> : (
          <>
            {/* Big queue card */}
            <QueueSummaryCard queue={queue} myToken={myToken} onJoin={handleJoin} onLeave={handleLeave} joining={joining} />

            {/* Info cards row */}
            <QueueInfoCards queue={queue} />

            {/* Timeline + Side panel */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <ActivityTimeline events={timeline} />
              </div>
              <div>
                <QueueSidePanel queue={queue} />
              </div>
            </div>
          </>
        )}
      </main>

      {/* ── Footer ── */}
      <Footer/>
    </div>
  );
}