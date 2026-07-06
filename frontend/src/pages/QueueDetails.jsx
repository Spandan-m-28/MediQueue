import { useState, useEffect, useRef } from "react";
import {
  Stethoscope,
  ChevronRight,
  ArrowLeft,
  Clock,
  Users,
  Activity,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Timer,
  Wifi,
  RefreshCw,
  Plus,
  Hash,
  Play,
  Pause,
  LogIn,
  Ticket,
  Zap,
  Check,
  ArrowRight,
  Info,
  MapPin,
  User,
  Calendar,
} from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import queueService from "../services/queue.service.js";

// ─── Helpers ──────────────────────────────────────────────────
function fmtTime(dateStr) {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}
function fmtDate(dateStr) {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
function fmtClock(d) {
  return d.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

// ─── Status configs ───────────────────────────────────────────
const QUEUE_STATUS_CFG = {
  active: {
    Icon: CheckCircle2,
    label: "Active",
    cls: "bg-emerald-50 text-emerald-700 border-emerald-100",
  },
  paused: {
    Icon: Pause,
    label: "Paused",
    cls: "bg-amber-50   text-amber-700   border-amber-100",
  },
  closed: {
    Icon: XCircle,
    label: "Closed",
    cls: "bg-red-50     text-red-700     border-red-100",
  },
};

const TOKEN_STATUS_CFG = {
  waiting: {
    label: "Waiting",
    bg: "bg-blue-50",
    text: "text-blue-700",
    border: "border-blue-100",
  },
  active: {
    label: "Active",
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    border: "border-emerald-100",
  },
  completed: {
    label: "Completed",
    bg: "bg-gray-100",
    text: "text-gray-500",
    border: "border-gray-200",
  },
  missed: {
    label: "Missed",
    bg: "bg-amber-50",
    text: "text-amber-700",
    border: "border-amber-100",
  },
  cancelled: {
    label: "Cancelled",
    bg: "bg-red-50",
    text: "text-red-600",
    border: "border-red-100",
  },
};

const TIMELINE_CFG = {
  completed: {
    Icon: CheckCircle2,
    color: "text-emerald-500",
    bg: "bg-emerald-50",
    border: "border-emerald-100",
    label: "Completed",
  },
  called: {
    Icon: Zap,
    color: "text-blue-500",
    bg: "bg-blue-50",
    border: "border-blue-100",
    label: "Called",
  },
  joined: {
    Icon: LogIn,
    color: "text-purple-500",
    bg: "bg-purple-50",
    border: "border-purple-100",
    label: "Joined",
  },
  paused: {
    Icon: Pause,
    color: "text-amber-500",
    bg: "bg-amber-50",
    border: "border-amber-100",
    label: "Paused",
  },
  resumed: {
    Icon: Play,
    color: "text-teal-500",
    bg: "bg-teal-50",
    border: "border-teal-100",
    label: "Resumed",
  },
};

// ═══════════════════════════════════════════════════════════════
// SMALL REUSABLE UI
// ═══════════════════════════════════════════════════════════════

function QueueStatusBadge({ status }) {
  const cfg = QUEUE_STATUS_CFG[status] || QUEUE_STATUS_CFG.closed;
  const Icon = cfg.Icon;
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${cfg.cls}`}
    >
      <Icon size={11} /> {cfg.label}
    </span>
  );
}

function TokenStatusBadge({ status }) {
  const cfg = TOKEN_STATUS_CFG[status] || TOKEN_STATUS_CFG.waiting;
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${cfg.bg} ${cfg.text} ${cfg.border}`}
    >
      {cfg.label}
    </span>
  );
}

function StatCard({ icon: Icon, label, value, sub, color, bg, border, pulse }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 group">
      <div
        className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 border ${bg} ${border} group-hover:scale-110 transition-transform duration-300`}
      >
        <Icon
          size={18}
          className={`${color} ${pulse ? "animate-pulse" : ""}`}
        />
      </div>
      <div className="text-2xl font-bold text-gray-900 tabular-nums">
        {value}
      </div>
      <div className="text-sm text-gray-500 mt-0.5">{label}</div>
      {sub && <div className={`text-xs font-medium mt-1 ${color}`}>{sub}</div>}
    </div>
  );
}

// ─── Skeletons ────────────────────────────────────────────────
function LoadingSkeleton() {
  return (
    <div className="animate-pulse space-y-6">
      <div className="bg-white rounded-2xl border border-gray-100 p-6 h-72" />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="bg-white rounded-2xl border border-gray-100 p-5 h-28"
          >
            <div className="w-10 h-10 bg-gray-100 rounded-xl mb-3" />
            <div className="h-6 bg-gray-200 rounded-full w-16 mb-2" />
            <div className="h-3 bg-gray-100 rounded-full w-20" />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 h-64" />
        <div className="bg-white rounded-2xl border border-gray-100 h-64" />
      </div>
    </div>
  );
}

function ErrorState({ onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center py-32 text-center">
      <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center mb-5">
        <AlertCircle size={34} className="text-red-300" />
      </div>
      <h3 className="text-gray-800 font-semibold text-lg mb-1">
        Queue data unavailable
      </h3>
      <p className="text-gray-400 text-sm mb-6 max-w-xs">
        We couldn't fetch the queue details. Check your connection and try
        again.
      </p>
      <button
        onClick={onRetry}
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 active:scale-95 transition-all shadow-sm shadow-blue-200"
      >
        <RefreshCw size={14} /> Retry
      </button>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// QUEUE SUMMARY CARD
// queue  → raw Queue document from getQueue controller
//           { _id, departmentId (ObjectId only), currentToken, totalTokens, queueStatus, startTime, endTime }
// dept   → Department document from separate getDepartmentByQueue call
//           { _id, name, averageConsultationTime, doctorNames, hospitalId: { name, city } }
// myToken → null | { tokenNumber, estimatedWaitTime, status } built locally after joinQueue
// ═══════════════════════════════════════════════════════════════
function QueueSummaryCard({ queue, dept, myToken, onJoin, onLeave, joining }) {
  const progress =
    queue.totalTokens > 0
      ? Math.min(
          100,
          Math.round((queue.currentToken / queue.totalTokens) * 100),
        )
      : 0;
  const remaining = Math.max(0, queue.totalTokens - queue.currentToken);
  const hasJoined = myToken !== null;
  const aheadCount = hasJoined
    ? Math.max(0, myToken.tokenNumber - queue.currentToken - 1)
    : 0;

  return (
    <div
      className="bg-white rounded-2xl border border-gray-100 overflow-hidden"
      style={{ boxShadow: "0 4px 24px -4px rgba(37,99,235,0.10)" }}
    >
      <div className="h-1.5 bg-linear-to-r from-blue-600 via-teal-500 to-blue-400" />

      <div className="p-6 md:p-8">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* LEFT — token + progress */}
          <div className="flex-1 w-full">
            <div className="flex items-center gap-2 mb-4">
              <div
                className={`w-2 h-2 rounded-full ${queue.queueStatus === "active" ? "bg-emerald-400 animate-pulse" : "bg-gray-300"}`}
              />
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-widest">
                Live Queue
              </span>
            </div>

            {/* Token spotlight */}
            <div className="flex flex-col sm:flex-row items-start sm:items-end gap-6 mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-blue-600 rounded-3xl blur-xl opacity-10 scale-110" />
                <div className="relative bg-linear-to-br from-blue-600 to-blue-700 rounded-3xl p-6 sm:p-8 text-white shadow-lg shadow-blue-200 min-w-35 text-center">
                  <div className="text-xs font-semibold uppercase tracking-widest text-blue-200 mb-1">
                    Current Token
                  </div>
                  <div className="text-6xl sm:text-7xl font-black leading-none tabular-nums">
                    {queue.currentToken}
                  </div>
                  <div className="mt-2">
                    <QueueStatusBadge status={queue.queueStatus} />
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <div className="bg-gray-50 rounded-2xl px-5 py-3 border border-gray-100">
                  <div className="text-xs text-gray-400 mb-0.5">
                    Total Tokens
                  </div>
                  <div className="text-3xl font-bold text-gray-900 tabular-nums">
                    {queue.totalTokens}
                  </div>
                </div>
                <div className="bg-amber-50 rounded-2xl px-5 py-3 border border-amber-100">
                  <div className="text-xs text-amber-500 mb-0.5 font-medium">
                    Remaining
                  </div>
                  <div className="text-3xl font-bold text-amber-700 tabular-nums">
                    {remaining}
                  </div>
                </div>
              </div>
            </div>

            {/* Progress */}
            <div className="mb-2 flex items-center justify-between text-xs text-gray-500">
              <span>
                Token {queue.currentToken} of {queue.totalTokens}
              </span>
              <span className="font-semibold text-blue-600">
                {progress}% complete
              </span>
            </div>
            <div className="h-3 bg-gray-100 rounded-full overflow-hidden mb-1">
              <div
                className="h-full rounded-full bg-linear-to-r from-blue-500 to-teal-400 transition-all duration-700"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>{queue.currentToken} served</span>
              <span>{queue.totalTokens} capacity</span>
            </div>

            {/* Hours strip */}
            {(queue.startTime || queue.endTime) && (
              <div className="flex gap-3 mt-4 flex-wrap">
                {queue.startTime && (
                  <div className="flex items-center gap-1.5 text-xs text-gray-500 bg-gray-50 border border-gray-100 px-3 py-1.5 rounded-xl">
                    <Play size={11} className="text-gray-400" /> Starts{" "}
                    {fmtTime(queue.startTime)}
                  </div>
                )}
                {queue.endTime && (
                  <div className="flex items-center gap-1.5 text-xs text-gray-500 bg-gray-50 border border-gray-100 px-3 py-1.5 rounded-xl">
                    <XCircle size={11} className="text-gray-400" /> Ends{" "}
                    {fmtTime(queue.endTime)}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* RIGHT — join / my-token panel */}
          <div className="w-full lg:w-72 shrink-0">
            <div
              className={`rounded-2xl border p-6 ${hasJoined ? "bg-emerald-50 border-emerald-100" : "bg-blue-50 border-blue-100"}`}
            >
              {hasJoined ? (
                /* ─ Already joined ─ */
                <>
                  <div className="text-center mb-5">
                    <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-3 border border-emerald-200">
                      <Ticket size={26} className="text-emerald-600" />
                    </div>
                    <div className="text-xs text-emerald-600 font-semibold uppercase tracking-widest mb-1">
                      My Token
                    </div>
                    {/* tokenNumber comes from joinQueue response */}
                    <div className="text-5xl font-black text-emerald-700 tabular-nums">
                      {myToken.tokenNumber}
                    </div>
                    <div className="mt-2">
                      <TokenStatusBadge status={myToken.status} />
                    </div>
                    <div className="mt-2 text-xs text-emerald-600 font-medium">
                      {aheadCount > 0
                        ? `${aheadCount} patients ahead of you`
                        : "You're next! 🎉"}
                    </div>
                  </div>

                  {/* estimatedWaitTime comes directly from joinQueue response */}
                  <div className="bg-white rounded-xl p-3 border border-emerald-100 mb-4 text-center">
                    <div className="text-xs text-gray-400 mb-0.5">
                      Estimated wait time
                    </div>
                    <div className="text-xl font-bold text-gray-800">
                      {myToken.estimatedWaitTime != null
                        ? `${myToken.estimatedWaitTime} min`
                        : "—"}
                    </div>
                  </div>

                  <button
                    onClick={onLeave}
                    className="w-full py-2.5 rounded-xl bg-red-500 text-white text-sm font-semibold hover:bg-red-600 active:scale-95 transition-all shadow-sm shadow-red-200"
                  >
                    Leave Queue
                  </button>
                  <p className="text-xs text-center text-emerald-500 mt-3">
                    Keep this page open for live updates
                  </p>
                </>
              ) : (
                /* ─ Not joined ─ */
                <>
                  <div className="text-center mb-5">
                    <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-3 border border-blue-200">
                      <Plus size={26} className="text-blue-600" />
                    </div>
                    <h3 className="font-bold text-gray-900 text-base mb-1">
                      Join the Queue
                    </h3>
                    <p className="text-xs text-gray-500 leading-relaxed">
                      Get a digital token and track your position in real-time.
                    </p>
                  </div>

                  <div className="space-y-2 mb-5">
                    {[
                      "Instant digital token issued",
                      "Live position tracking",
                      "Estimated wait time shown",
                    ].map((f) => (
                      <div
                        key={f}
                        className="flex items-center gap-2 text-xs text-gray-600"
                      >
                        <div className="w-4 h-4 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                          <Check size={9} className="text-blue-600" />
                        </div>
                        {f}
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={onJoin}
                    disabled={joining || queue.queueStatus !== "active"}
                    className="w-full py-3.5 rounded-xl bg-blue-600 text-white font-bold text-sm flex items-center justify-center gap-2 hover:bg-blue-700 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md shadow-blue-200 hover:-translate-y-0.5"
                  >
                    {joining ? (
                      <>
                        <RefreshCw size={15} className="animate-spin" />{" "}
                        Joining…
                      </>
                    ) : (
                      <>
                        <LogIn size={15} /> Join Queue
                      </>
                    )}
                  </button>

                  {queue.queueStatus !== "active" && (
                    <p className="text-xs text-center text-red-500 mt-2 capitalize">
                      Queue is currently {queue.queueStatus}
                    </p>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Stat cards — fields from Queue model only ────────────────
function QueueStatCards({ queue }) {
  const remaining = Math.max(0, queue.totalTokens - queue.currentToken);
  const qCfg = {
    active: {
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      border: "border-emerald-100",
    },
    paused: {
      color: "text-amber-600",
      bg: "bg-amber-50",
      border: "border-amber-100",
    },
    closed: {
      color: "text-red-600",
      bg: "bg-red-50",
      border: "border-red-100",
    },
  }[queue.queueStatus] || {
    color: "text-gray-600",
    bg: "bg-gray-50",
    border: "border-gray-100",
  };

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        icon={Hash}
        label="Current Token"
        value={queue.currentToken}
        sub="now serving"
        color="text-blue-600"
        bg="bg-blue-50"
        border="border-blue-100"
        pulse={false}
      />
      <StatCard
        icon={Users}
        label="Total Tokens"
        value={queue.totalTokens}
        sub="total issued"
        color="text-purple-600"
        bg="bg-purple-50"
        border="border-purple-100"
        pulse={false}
      />
      <StatCard
        icon={Timer}
        label="Remaining"
        value={remaining}
        sub="tokens left"
        color="text-amber-600"
        bg="bg-amber-50"
        border="border-amber-100"
        pulse={false}
      />
      <StatCard
        icon={Activity}
        label="Queue Status"
        value={
          queue.queueStatus.charAt(0).toUpperCase() + queue.queueStatus.slice(1)
        }
        sub={`${queue.currentToken}/${queue.totalTokens} done`}
        {...qCfg}
        pulse={queue.queueStatus === "active"}
      />
    </div>
  );
}

// ─── My Token detail card — fields from joinQueue response ────
// joinQueue returns: { success, message, tokenNumber, estimatedWaitTime }
// We store this shape in myToken state
function MyTokenCard({ myToken, queue }) {
  if (!myToken) return null;
  const aheadCount = Math.max(0, myToken.tokenNumber - queue.currentToken - 1);
  return (
    <div
      className="bg-white rounded-2xl border border-gray-100 p-5"
      style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}
    >
      <h3 className="font-semibold text-gray-900 text-sm mb-4 flex items-center gap-2">
        <Ticket size={15} className="text-emerald-600" /> My Token Details
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Token Number", value: `#${myToken.tokenNumber}` },
          {
            label: "Status",
            value: <TokenStatusBadge status={myToken.status} />,
          },
          { label: "Patients Ahead", value: aheadCount },
          {
            label: "Estimated Wait",
            value:
              myToken.estimatedWaitTime != null
                ? `${myToken.estimatedWaitTime} min`
                : "—",
          },
        ].map(({ label, value }) => (
          <div
            key={label}
            className="bg-gray-50 rounded-xl p-3 border border-gray-100"
          >
            <div className="text-xs text-gray-400 mb-1">{label}</div>
            <div className="text-sm font-semibold text-gray-800">{value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Side Panel — dept from getDepartmentByQueue ──────────────
function QueueSidePanel({ queue, dept }) {
  const hospital = dept?.hospitalId; // populated if your dept route populates it
  const rows = [
    { icon: Stethoscope, label: "Department", value: dept?.name || "—" },
    { icon: MapPin, label: "Hospital", value: hospital?.name || "—" },
    { icon: MapPin, label: "City", value: hospital?.city || "—" },
    {
      icon: User,
      label: "Doctor(s)",
      value: dept?.doctorNames?.join(", ") || "—",
    },
    {
      icon: Clock,
      label: "Avg Consult",
      value: dept?.averageConsultationTime
        ? `${dept.averageConsultationTime} min`
        : "—",
    },
    { icon: Calendar, label: "Date", value: fmtDate(queue.startTime) },
    { icon: Play, label: "Start", value: fmtTime(queue.startTime) },
    { icon: XCircle, label: "End", value: fmtTime(queue.endTime) },
  ];

  return (
    <div className="space-y-4">
      <div
        className="bg-white rounded-2xl border border-gray-100 p-5"
        style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}
      >
        <h3 className="font-semibold text-gray-900 text-sm mb-4">Queue Info</h3>
        <div className="space-y-3">
          {rows.map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-lg bg-gray-50 flex items-center justify-center border border-gray-100 shrink-0">
                <Icon size={13} className="text-gray-400" />
              </div>
              <div className="min-w-0">
                <div className="text-xs text-gray-400">{label}</div>
                <div className="text-sm font-medium text-gray-800 wrap-break-word">
                  {value}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-linear-to-br from-blue-50 to-teal-50 rounded-2xl border border-blue-100 p-5">
        <div className="flex items-center gap-2 mb-3">
          <Info size={14} className="text-blue-600" />
          <h3 className="font-semibold text-blue-900 text-sm">Tips</h3>
        </div>
        <ul className="space-y-2">
          {[
            "Arrive 5 min before your token is called.",
            "Keep your token number handy.",
            "Page auto-refreshes every 30 s.",
            "Don't close this tab to stay updated.",
          ].map((tip) => (
            <li
              key={tip}
              className="flex items-start gap-2 text-xs text-blue-700"
            >
              <ArrowRight size={11} className="text-teal-500 mt-0.5 shrink-0" />
              {tip}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// ─── Activity Timeline ────────────────────────────────────────
function ActivityTimeline({ events }) {
  return (
    <div
      className="bg-white rounded-2xl border border-gray-100 overflow-hidden"
      style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}
    >
      <div className="px-5 py-4 border-b border-gray-50 flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-gray-900 text-sm">
            Recent Activity
          </h3>
          <p className="text-xs text-gray-400 mt-0.5">
            Live event log — ready for Socket.IO
          </p>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-medium bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-full">
          <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />{" "}
          Live
        </div>
      </div>

      <div className="divide-y divide-gray-50">
        {events.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mb-3">
              <Activity size={22} className="text-blue-300" />
            </div>
            <p className="text-sm text-gray-500 font-medium">No activity yet</p>
            <p className="text-xs text-gray-400 mt-1">
              Queue events will appear here in real-time.
            </p>
          </div>
        ) : (
          events.map((ev, idx) => {
            const cfg = TIMELINE_CFG[ev.type] || TIMELINE_CFG.joined;
            const Icon = cfg.Icon;
            return (
              <div
                key={ev.id}
                className="px-5 py-3.5 flex items-start gap-3 hover:bg-gray-50 transition-colors"
              >
                <div className="flex flex-col items-center shrink-0 mt-0.5">
                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center border ${cfg.bg} ${cfg.border}`}
                  >
                    <Icon size={14} className={cfg.color} />
                  </div>
                  {idx < events.length - 1 && (
                    <div className="w-px h-full min-h-4 bg-gray-100 mt-1" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm text-gray-700 leading-snug">
                      {ev.message}
                    </p>
                    <span className="text-xs text-gray-400 shrink-0 whitespace-nowrap">
                      {ev.ago}
                    </span>
                  </div>
                  <span
                    className={`inline-flex items-center gap-1 mt-1 px-2 py-0.5 rounded-full text-xs font-medium border ${cfg.bg} ${cfg.color} ${cfg.border}`}
                  >
                    {cfg.label}
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// MAIN PAGE
// ═══════════════════════════════════════════════════════════════
export default function QueueDetails() {
  const { id } = useParams(); // queue_id from /queue/:id
  const navigate = useNavigate();

  // ── State ──────────────────────────────────────────────────
  // queue   → Queue document: { _id, departmentId, currentToken, totalTokens, queueStatus, startTime, endTime }
  // dept    → Department document: { _id, name, averageConsultationTime, doctorNames, hospitalId }
  // myToken → null | { tokenNumber, estimatedWaitTime, status }
  //           built from joinQueue response: { tokenNumber, estimatedWaitTime }
  //           + enriched by getMyTokens for status field
  // timeline → local event log (will be replaced by Socket.IO events)
  const [queue, setQueue] = useState(null);
  const [dept, setDept] = useState(null);
  const [myToken, setMyToken] = useState(null);
  const [timeline, setTimeline] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [joining, setJoining] = useState(false);
  const [lastRefresh, setLastRefresh] = useState(new Date());
  const [refreshing, setRefreshing] = useState(false);
  const intervalRef = useRef(null);

  // ── Helpers ────────────────────────────────────────────────
  const pushEvent = (type, message) => {
    setTimeline((prev) => [
      {
        id: Date.now(),
        type,
        message,
        ago: "just now",
      },
      ...prev,
    ]);
  };

  // ── Load ───────────────────────────────────────────────────
  const load = async () => {
    setLoading(true);
    setError(false);
    try {
      // 1️⃣  GET /api/queues/:queueId
      //     Controller: getQueue
      //     Returns: { success, message, queue: { _id, departmentId (ObjectId), currentToken, totalTokens, queueStatus, startTime, endTime } }
      const qRes = await queueService.getQueue(id);
      const q = qRes.queue;
      setQueue(q);

      // 2️⃣  GET /api/departments/:departmentId
      //     Wire your getDepartmentByQueue(q.departmentId) once the route exists.
      //     Expected shape: { success, department: { _id, name, averageConsultationTime, doctorNames, hospitalId: { name, city } } }
      const dRes = await queueService.getDepartmentByQueue(q.departmentId);
      setDept(dRes.department);

      // 3️⃣  GET /api/tokens/my
      //     Controller: getMyToken
      //     Returns: { success, message, token: [ ...Token docs ] }  ← token is an ARRAY
      //     Find the one that belongs to this queue
      const tRes = await queueService.getMyTokens();
      const existing = tRes.token?.find(
        (t) =>
          String(t.queueId) === String(q._id) &&
          ["waiting", "active", "missed"].includes(t.status),
      );
      if (existing) {
        // Map Token model fields → myToken state shape
        setMyToken({
          tokenNumber: existing.tokenNumber,
          estimatedWaitTime: existing.estimatedWaitTime,
          status: existing.status,
        });
      }

      setLastRefresh(new Date());
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  // ── Silent refresh (poll) ──────────────────────────────────
  const silentRefresh = async () => {
    setRefreshing(true);
    try {
      // Re-fetch queue status + currentToken
      const qRes = await queueService.getQueue(id);
      setQueue(qRes.queue);

      // Re-fetch my token status in case it changed (e.g. staff called it)
      const tRes = await queueService.getMyTokens();
      const existing = tRes.token?.find(
        (t) =>
          String(t.queueId) === String(qRes.queue._id) &&
          ["waiting", "active", "missed"].includes(t.status),
      );
      if (existing) {
        setMyToken({
          tokenNumber: existing.tokenNumber,
          estimatedWaitTime: existing.estimatedWaitTime,
          status: existing.status,
        });
      } else if (myToken) {
        // token no longer active — update status locally
        // (Socket.IO will handle this properly later)
      }

      setLastRefresh(new Date());
    } catch {
      /* silent */
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    load();
    intervalRef.current = setInterval(silentRefresh, 30000);
    return () => clearInterval(intervalRef.current);
  }, [id]);

  // ── Join ───────────────────────────────────────────────────
  const handleJoin = async () => {
    setJoining(true);
    try {
      // POST /api/queues/:queueId/join
      // Controller: joinQueue
      // Returns: { success, message, tokenNumber, estimatedWaitTime }
      // Note: controller does NOT return a full Token document — just these two fields
      const res = await queueService.joinQueue(id);

      if (!res.success) {
        // Handle "Patient already exists in the queue" (409) gracefully
        alert(res.message || "Could not join queue.");
        return;
      }

      // Build myToken state from the response fields
      setMyToken({
        tokenNumber: res.tokenNumber,
        estimatedWaitTime: res.estimatedWaitTime,
        status: "waiting", // newly created token is always "waiting"
      });

      // Optimistically bump totalTokens on queue
      setQueue((prev) =>
        prev ? { ...prev, totalTokens: prev.totalTokens + 1 } : prev,
      );

      pushEvent("joined", `You joined the queue (Token #${res.tokenNumber})`);
    } catch (err) {
      console.error(err);
      const msg = err?.response?.data?.message || "Failed to join queue.";
      alert(msg);
    } finally {
      setJoining(false);
    }
  };

  const handleLeave = async () => {
    if (!myToken) return;

    try {
      const response = await queueService.leaveQueue(queue._id);

      setMyToken(null);

      setQueue((prev) =>
        prev
          ? {
              ...prev,
              totalTokens: Math.max(0, prev.totalTokens - 1),
            }
          : prev,
      );

      pushEvent(
        "completed",
        `Token #${myToken.tokenNumber} — you left the queue`,
      );

      console.log(response.message);
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  return (
    <div
      className="min-h-screen bg-[#F8FAFC]"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;900&display=swap"
        rel="stylesheet"
      />

      <Navbar />

      {/* Live banner */}
      <div className="bg-linear-to-r from-blue-600 to-teal-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-white text-xs font-medium">
            <Wifi size={13} className="shrink-0 animate-pulse" />
            <span>
              Real-time updates will appear automatically while this page is
              open.
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-1.5 text-white/80 text-xs shrink-0">
            <RefreshCw size={11} className={refreshing ? "animate-spin" : ""} />
            <span>Updated {fmtClock(lastRefresh)}</span>
          </div>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <a href="/" className="hover:text-blue-600 transition-colors">
            Home
          </a>
          <ChevronRight size={12} />
          <a
            href="/hospitals"
            className="hover:text-blue-600 transition-colors"
          >
            Hospitals
          </a>
          <ChevronRight size={12} />
          <span className="text-gray-700 font-medium">
            {loading ? "…" : `${dept?.name || ""} Queue`}
          </span>
        </div>
      </div>

      {/* Page header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="w-9 h-9 rounded-xl border border-gray-200 bg-white flex items-center justify-center text-gray-500 hover:bg-gray-50 hover:text-blue-600 transition-all group shrink-0"
            >
              <ArrowLeft
                size={16}
                className="group-hover:-translate-x-0.5 transition-transform"
              />
            </button>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl md:text-2xl font-bold text-gray-900">
                  {loading ? "Loading queue…" : `${dept?.name || ""} Queue`}
                </h1>
                {!loading && queue && (
                  <QueueStatusBadge status={queue.queueStatus} />
                )}
              </div>
              {!loading && dept && (
                <p className="text-sm text-gray-500 mt-0.5">
                  {dept.hospitalId?.name}
                  {dept.hospitalId?.city ? ` · ${dept.hospitalId.city}` : ""}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={silentRefresh}
              disabled={refreshing}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl border border-gray-200 bg-white text-sm font-medium text-gray-600 hover:border-blue-300 hover:text-blue-600 transition-all disabled:opacity-50"
            >
              <RefreshCw
                size={14}
                className={refreshing ? "animate-spin" : ""}
              />
              <span className="hidden sm:inline">Refresh</span>
            </button>
            {myToken && (
              <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-50 border border-emerald-100 text-sm font-semibold text-emerald-700">
                <Ticket size={14} /> Token #{myToken.tokenNumber}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 space-y-6">
        {loading ? (
          <LoadingSkeleton />
        ) : error ? (
          <ErrorState onRetry={load} />
        ) : (
          <>
            <QueueSummaryCard
              queue={queue}
              dept={dept}
              myToken={myToken}
              onJoin={handleJoin}
              onLeave={handleLeave}
              joining={joining}
            />

            {/* Stat cards — Queue model fields */}
            <QueueStatCards queue={queue} />

            {/* My token detail row — joinQueue response fields */}
            {myToken && <MyTokenCard myToken={myToken} queue={queue} />}

            {/* Timeline + side panel */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <ActivityTimeline events={timeline} />
              </div>
              <div>
                <QueueSidePanel queue={queue} dept={dept} />
              </div>
            </div>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}
