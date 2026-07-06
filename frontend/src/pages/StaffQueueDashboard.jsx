import { useState, useEffect, useRef, useCallback } from "react";
import {
  Stethoscope,
  Bell,
  ChevronDown,
  User,
  LogOut,
  ArrowLeft,
  ChevronRight,
  Hash,
  Users,
  Timer,
  Clock,
  CheckCircle2,
  Pause,
  XCircle,
  Circle,
  Play,
  SkipForward,
  RefreshCw,
  Wifi,
  AlertCircle,
  UserCheck,
  UserX,
  Zap,
  LogIn,
  Activity,
  ShieldAlert,
} from "lucide-react";
import queueService from "../services/queue.service.js";
import { useParams } from "react-router-dom";

// ─────────────────────────────────────────────────────────────────────────
// NOTE ON DATA SHAPE
// This screen is wired to the real backend documents:
//
//   Queue      { _id, departmentId, currentToken, totalTokens, queueStatus, createdAt, updatedAt }
//   Token      { _id, patientId, queueId, tokenNumber, status, estimatedWaitTime, createdAt, updatedAt }
//   Department { _id, hospitalId, name, averageConsultationTime, doctorNames, isActive }
//
// Token.status is one of: "waiting" | "active" | "completed" | "missed" | "cancelled"
// ("active" = this is the token currently being served / called to the counter,
//  "cancelled" = the patient left the queue themselves before being called)
// Queue.queueStatus is one of: "active" | "paused" | "closed" (and "not_started" before the first token is ever called)
//
// getQueue        -> GET  /queue/:queueId              -> { success, message, queue }
// getDeptByQueue  -> GET  /department/details/:deptId  -> { success, department }
// getCurrentActiveToken -> GET /queue/:queueId/current-token -> { success, message, token }  (token is null if nothing is active)
//
// TODO(backend): there is still no endpoint returning the *waiting list* for a
// queue (only the single current-active-token lookup above exists). Once one
// exists (e.g. GET /queue/:queueId/tokens?status=waiting), add a
// `getWaitingTokens(queueId)` to queue.service.js and wire it into `load()`
// below to bring back the waiting-patients table.
//
// TODO(backend): Token.patientId is just an ObjectId reference here. Populate it
// (e.g. patientId -> { name, phone }) so the UI can show a real patient name
// instead of a raw id.
// ─────────────────────────────────────────────────────────────────────────

const STAFF = {
  name: "Priya Sundaram",
  role: "Senior Nurse",
  hospital: "Apollo Hospitals",
};

const STATUS_CONFIG = {
  active: {
    label: "Active",
    Icon: CheckCircle2,
    dot: "bg-emerald-500",
    text: "text-emerald-700",
    bg: "bg-emerald-50",
    border: "border-emerald-100",
  },
  paused: {
    label: "Paused",
    Icon: Pause,
    dot: "bg-amber-400",
    text: "text-amber-700",
    bg: "bg-amber-50",
    border: "border-amber-100",
  },
  closed: {
    label: "Closed",
    Icon: XCircle,
    dot: "bg-red-500",
    text: "text-red-700",
    bg: "bg-red-50",
    border: "border-red-100",
  },
  not_started: {
    label: "Not Started",
    Icon: Circle,
    dot: "bg-gray-400",
    text: "text-gray-600",
    bg: "bg-gray-50",
    border: "border-gray-200",
  },
};

const TIMELINE_CONFIG = {
  completed: {
    Icon: CheckCircle2,
    color: "text-emerald-500",
    bg: "bg-emerald-50",
    border: "border-emerald-100",
  },
  missed: {
    Icon: UserX,
    color: "text-red-500",
    bg: "bg-red-50",
    border: "border-red-100",
  },
  cancelled: {
    Icon: XCircle,
    color: "text-gray-400",
    bg: "bg-gray-50",
    border: "border-gray-100",
  },
  called: {
    Icon: Zap,
    color: "text-blue-500",
    bg: "bg-blue-50",
    border: "border-blue-100",
  },
  joined: {
    Icon: LogIn,
    color: "text-purple-500",
    bg: "bg-purple-50",
    border: "border-purple-100",
  },
  paused: {
    Icon: Pause,
    color: "text-amber-500",
    bg: "bg-amber-50",
    border: "border-amber-100",
  },
  resumed: {
    Icon: Play,
    color: "text-teal-500",
    bg: "bg-teal-50",
    border: "border-teal-100",
  },
};

const TOKEN_STATUS_CONFIG = {
  waiting: {
    label: "Waiting",
    bg: "bg-gray-50",
    text: "text-gray-500",
    border: "border-gray-200",
  },
  active: {
    label: "Called",
    bg: "bg-blue-50",
    text: "text-blue-700",
    border: "border-blue-200",
  },
  missed: {
    label: "Missed",
    bg: "bg-red-50",
    text: "text-red-600",
    border: "border-red-200",
  },
  completed: {
    label: "Completed",
    bg: "bg-emerald-50",
    text: "text-emerald-600",
    border: "border-emerald-200",
  },
  cancelled: {
    label: "Cancelled",
    bg: "bg-gray-50",
    text: "text-gray-400",
    border: "border-gray-200",
  },
};

// ═══════════════════════════════════════════════════════════════
// SHARED LAYOUT
// ═══════════════════════════════════════════════════════════════
function StatusBadge({ status, size = "md" }) {
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG.not_started;
  const Icon = cfg.Icon;
  const pad = size === "sm" ? "px-2 py-0.5 text-[10px]" : "px-2.5 py-1 text-xs";
  return (
    <span
      className={`inline-flex items-center gap-1.5 ${pad} rounded-full font-semibold border transition-colors duration-300 ${cfg.bg} ${cfg.text} ${cfg.border}`}
    >
      <Icon size={size === "sm" ? 10 : 11} />
      {cfg.label}
    </span>
  );
}

function StaffNavbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  return (
    <header className="h-16 bg-white border-b border-gray-100 sticky top-0 z-30 flex items-center px-4 sm:px-6 shadow-sm">
      <div className="flex items-center gap-2.5 shrink-0">
        <div className="w-8 h-8 rounded-lg bg-linear-to-br from-blue-600 to-teal-500 flex items-center justify-center">
          <Stethoscope size={16} className="text-white" />
        </div>
        <span className="font-bold text-gray-900 text-lg tracking-tight hidden sm:inline">
          Medi<span className="text-blue-600">Queue</span>
        </span>
      </div>

      <div className="flex items-center gap-2 min-w-0 ml-4 sm:ml-6">
        <span className="font-semibold text-gray-800 text-sm truncate">
          {STAFF.hospital}
        </span>
        <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 text-[10px] font-semibold border border-blue-100">
          Staff Portal
        </span>
      </div>

      <div className="ml-auto flex items-center gap-2">
        <button className="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-all relative">
          <Bell size={16} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-500 rounded-full" />
        </button>
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 transition-all"
          >
            <div className="w-7 h-7 rounded-full bg-linear-to-br from-blue-500 to-teal-400 flex items-center justify-center text-white text-xs font-bold shrink-0">
              {STAFF.name
                .split(" ")
                .map((w) => w[0])
                .join("")}
            </div>
            <div className="hidden sm:block text-left">
              <div className="text-xs font-semibold text-gray-800 leading-tight">
                {STAFF.name}
              </div>
              <div className="text-[10px] text-gray-400 leading-tight">
                {STAFF.role}
              </div>
            </div>
            <ChevronDown
              size={13}
              className={`text-gray-400 transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
            />
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 top-12 w-48 bg-white border border-gray-100 rounded-xl shadow-xl z-30 overflow-hidden py-1">
              <a
                href="#"
                className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors"
              >
                <User size={14} /> My Profile
              </a>
              <div className="h-px bg-gray-50 my-1" />
              <a
                href="#"
                className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors"
              >
                <LogOut size={14} /> Logout
              </a>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

function StaffLayout({ children }) {
  return (
    <div
      className="min-h-screen bg-[#F8FAFC]"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;900&display=swap"
        rel="stylesheet"
      />
      <StaffNavbar />
      <div>{children}</div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// REUSABLE PAGE COMPONENTS
// ═══════════════════════════════════════════════════════════════
function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel,
  danger,
  onConfirm,
  onCancel,
  loading,
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onCancel}
      />
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 animate-[fadeIn_0.2s_ease-out]">
        <div
          className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${danger ? "bg-red-50" : "bg-amber-50"}`}
        >
          <ShieldAlert
            size={22}
            className={danger ? "text-red-500" : "text-amber-500"}
          />
        </div>
        <h3 className="font-bold text-gray-900 text-base mb-1.5">{title}</h3>
        <p className="text-sm text-gray-500 mb-6 leading-relaxed">{message}</p>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-all"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className={`flex-1 py-2.5 rounded-xl text-sm font-semibold text-white transition-all flex items-center justify-center gap-2 disabled:opacity-60 ${
              danger
                ? "bg-red-500 hover:bg-red-600"
                : "bg-amber-500 hover:bg-amber-600"
            }`}
          >
            {loading && <RefreshCw size={14} className="animate-spin" />}
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

function PageSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 animate-pulse">
      <div className="h-6 bg-gray-200 rounded-full w-64" />
      <div className="bg-white rounded-2xl border border-gray-100 p-8 h-72" />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="bg-white rounded-2xl border border-gray-100 h-24"
          />
        ))}
      </div>
      <div className="bg-white rounded-2xl border border-gray-100 h-96" />
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
        Couldn't load queue
      </h3>
      <p className="text-gray-400 text-sm mb-6 max-w-xs">
        There was a problem fetching queue details. Please try again.
      </p>
      <button
        onClick={onRetry}
        className="px-6 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 active:scale-95 transition-all shadow-sm shadow-blue-200"
      >
        Retry
      </button>
    </div>
  );
}

// ─── Current Token Card ───────────────────────────────────────
// currentToken is the Token document whose tokenNumber === queue.currentToken.
// Calling the next token is only allowed once that token has been resolved
// (status "completed" or "missed") or there isn't one yet (queue never started).
function CurrentTokenCard({
  queue,
  currentToken,
  onNext,
  onComplete,
  onMissed,
  onPause,
  onResume,
  onClose,
  actionLoading,
}) {
  const progress =
    queue.totalTokens > 0
      ? Math.round((queue.currentToken / queue.totalTokens) * 100)
      : 0;
  const hasOpenCurrent = currentToken && currentToken.status === "active";
  const canCallNext = queue.queueStatus === "active" && !hasOpenCurrent;
  const canResolveCurrent = queue.queueStatus === "active" && hasOpenCurrent;

  return (
    <div
      className="bg-white rounded-2xl border border-gray-100 overflow-hidden"
      style={{ boxShadow: "0 4px 24px -4px rgba(37,99,235,0.10)" }}
    >
      <div className="h-1.5 bg-linear-to-r from-blue-600 via-teal-500 to-blue-400" />
      <div className="p-6 md:p-8">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          <div className="flex-1 w-full">
            <div className="flex items-center gap-2 mb-4">
              <div
                className={`w-2 h-2 rounded-full ${queue.queueStatus === "active" ? "bg-emerald-400 animate-pulse" : "bg-gray-300"}`}
              />
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-widest">
                Live Token Control
              </span>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-end gap-6 mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-blue-600 rounded-3xl blur-xl opacity-10 scale-110" />
                <div className="relative bg-linear-to-br from-blue-600 to-blue-700 rounded-3xl p-6 sm:p-8 text-white shadow-lg shadow-blue-200 min-w-35 text-center">
                  <div className="text-xs font-semibold uppercase tracking-widest text-blue-200 mb-1">
                    Current Token
                  </div>
                  <div className="text-6xl sm:text-7xl font-black leading-none tabular-nums">
                    {queue.currentToken > 0 ? queue.currentToken : "—"}
                  </div>
                  <div className="mt-2">
                    <StatusBadge status={queue.queueStatus} />
                  </div>
                  {currentToken && (
                    <div className="mt-2 text-[11px] font-medium text-blue-100">
                      Token status:{" "}
                      {TOKEN_STATUS_CONFIG[currentToken.status]?.label ||
                        currentToken.status}
                    </div>
                  )}
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
                {currentToken && (
                  <div className="bg-amber-50 rounded-2xl px-5 py-3 border border-amber-100">
                    <div className="text-xs text-amber-500 mb-0.5 font-medium">
                      Est. Wait (current)
                    </div>
                    <div className="text-3xl font-bold text-amber-700 tabular-nums">
                      {currentToken.estimatedWaitTime}
                      <span className="text-base font-medium ml-1">min</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="mb-2 flex items-center justify-between text-xs text-gray-500">
              <span>
                Token {queue.currentToken} of {queue.totalTokens} issued
              </span>
              <span className="font-semibold text-blue-600">
                {progress}% complete
              </span>
            </div>
            <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full bg-linear-to-r from-blue-500 to-teal-400 transition-all duration-700"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="w-full lg:w-72 shrink-0 space-y-2.5">
            {/* Resolve step: staff must mark the current token Completed or Missed
               before "Call Next Token" unlocks. Both buttons are always visible so
               it's clear this is a required step, not a hidden mode switch. */}
            <div className="grid grid-cols-2 gap-2.5">
              <button
                onClick={onComplete}
                disabled={!canResolveCurrent || actionLoading === "complete"}
                title={
                  !canResolveCurrent ? "No token currently called" : undefined
                }
                className="py-3 rounded-xl bg-emerald-600 text-white font-bold text-sm flex items-center justify-center gap-1.5 hover:bg-emerald-700 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-sm shadow-emerald-200 hover:-translate-y-0.5"
              >
                {actionLoading === "complete" ? (
                  <RefreshCw size={14} className="animate-spin" />
                ) : (
                  <UserCheck size={14} />
                )}
                Completed
              </button>
              <button
                onClick={onMissed}
                disabled={!canResolveCurrent || actionLoading === "miss"}
                title={
                  !canResolveCurrent ? "No token currently called" : undefined
                }
                className="py-3 rounded-xl bg-red-50 text-red-600 border border-red-200 font-bold text-sm flex items-center justify-center gap-1.5 hover:bg-red-100 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed transition-all hover:-translate-y-0.5"
              >
                {actionLoading === "miss" ? (
                  <RefreshCw size={14} className="animate-spin" />
                ) : (
                  <UserX size={14} />
                )}
                Missed
              </button>
            </div>

            <div className="relative">
              <button
                onClick={onNext}
                disabled={!canCallNext || actionLoading === "next"}
                title={
                  hasOpenCurrent
                    ? "Mark the current token Completed or Missed first"
                    : undefined
                }
                className="w-full py-3.5 rounded-xl bg-blue-600 text-white font-bold text-sm flex items-center justify-center gap-2 hover:bg-blue-700 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-md shadow-blue-200 hover:shadow-lg hover:-translate-y-0.5"
              >
                {actionLoading === "next" ? (
                  <RefreshCw size={15} className="animate-spin" />
                ) : (
                  <SkipForward size={15} />
                )}
                Call Next Token
              </button>
              {hasOpenCurrent && (
                <p className="mt-1.5 text-[11px] text-amber-600 flex items-center gap-1 justify-center">
                  <AlertCircle size={11} /> Resolve token #{queue.currentToken}{" "}
                  first
                </p>
              )}
            </div>

            {queue.queueStatus === "active" ? (
              <button
                onClick={onPause}
                disabled={actionLoading === "pause"}
                className="w-full py-3 rounded-xl bg-amber-50 text-amber-700 border border-amber-200 font-semibold text-sm flex items-center justify-center gap-2 hover:bg-amber-100 active:scale-95 transition-all disabled:opacity-50 hover:-translate-y-0.5"
              >
                {actionLoading === "pause" ? (
                  <RefreshCw size={15} className="animate-spin" />
                ) : (
                  <Pause size={15} />
                )}
                Pause Queue
              </button>
            ) : queue.queueStatus === "paused" ? (
              <button
                onClick={onResume}
                disabled={actionLoading === "resume"}
                className="w-full py-3 rounded-xl bg-teal-50 text-teal-700 border border-teal-200 font-semibold text-sm flex items-center justify-center gap-2 hover:bg-teal-100 active:scale-95 transition-all disabled:opacity-50 hover:-translate-y-0.5"
              >
                {actionLoading === "resume" ? (
                  <RefreshCw size={15} className="animate-spin" />
                ) : (
                  <Play size={15} />
                )}
                Resume Queue
              </button>
            ) : null}

            <button
              onClick={onClose}
              disabled={
                queue.queueStatus === "closed" || actionLoading === "close"
              }
              className="w-full py-3 rounded-xl bg-red-50 text-red-600 border border-red-200 font-semibold text-sm flex items-center justify-center gap-2 hover:bg-red-100 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-0.5"
            >
              {actionLoading === "close" ? (
                <RefreshCw size={15} className="animate-spin" />
              ) : (
                <XCircle size={15} />
              )}
              Close Queue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoStatCard({
  icon: Icon,
  label,
  value,
  unit,
  color,
  bg,
  border,
  pulse,
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 group">
      <div
        className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 border ${bg} ${border} transition-transform duration-300 group-hover:scale-110`}
      >
        <Icon
          size={18}
          className={`${color} ${pulse ? "animate-pulse" : ""}`}
        />
      </div>
      <div className="text-2xl font-bold text-gray-900">{value}</div>
      <div className="text-sm text-gray-500 mt-0.5">{label}</div>
      {unit && (
        <div className={`text-xs font-medium mt-1 ${color}`}>{unit}</div>
      )}
    </div>
  );
}

function PatientListEmpty() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mb-4">
        <Users size={28} className="text-blue-300" />
      </div>
      <h3 className="text-gray-800 font-semibold text-base mb-1">
        No patients waiting
      </h3>
      <p className="text-gray-400 text-sm">The queue is currently empty.</p>
    </div>
  );
}

// ─── Activity Timeline ────────────────────────────────────────
// This is built from local staff actions for now — there's no activity-log
// endpoint yet. Ready to swap for a Socket.IO feed later.
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
            Local session log — ready for Socket.IO
          </p>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-medium bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-full">
          <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
          Live
        </div>
      </div>
      <div className="divide-y divide-gray-50 max-h-105 overflow-y-auto">
        {events.length === 0 ? (
          <PatientListEmpty />
        ) : (
          events.map((ev, idx) => {
            const cfg = TIMELINE_CONFIG[ev.type] || TIMELINE_CONFIG.joined;
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
export default function StaffQueueDashboard() {
  const { id } = useParams();

  const [queue, setQueue] = useState(null);
  const [department, setDepartment] = useState(null);
  const [currentToken, setCurrentToken] = useState(null); // the single active Token doc, or null
  const [timeline, setTimeline] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [actionLoading, setActionLoading] = useState(null);
  const [confirmAction, setConfirmAction] = useState(null); // 'pause' | 'close' | null
  const [lastRefresh, setLastRefresh] = useState(new Date());
  const intervalRef = useRef(null);

  const pushEvent = useCallback((type, message) => {
    setTimeline((prev) => [
      { id: Date.now(), type, message, ago: "just now" },
      ...prev,
    ]);
  }, []);

  const load = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      // getQueue returns only { success, message, queue } — no tokens, no department.
      const queueRes = await queueService.getQueue(id);
      setQueue(queueRes.queue);

      // Department is a separate call keyed by departmentId.
      if (queueRes.queue?.departmentId) {
        const deptRes = await queueService.getDepartmentByQueue(
          queueRes.queue.departmentId,
        );
        setDepartment(deptRes.department || null);
      }

      // The current active token — this is what gates "Call Next" vs "Completed/Missed".
      const activeRes = await queueService.getCurrentActiveToken(id);
      setCurrentToken(activeRes.token || null);

      // TODO(backend): there is still no endpoint for the *waiting list* (all
      // "waiting" tokens for this queue). Once GET /queue/:queueId/tokens (or
      // similar) exists, fetch it here and bring back the waiting-patients table.
      setLastRefresh(new Date());
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    load();
    intervalRef.current = setInterval(load, 30000);
    return () => clearInterval(intervalRef.current);
  }, [load]);

  // ── Token actions ──
  // Each controller only returns { success, message, token } (the single token
  // that was just touched) — not the full queue or token list — so the
  // simplest reliable thing to do is re-run load() after a successful call
  // rather than trying to patch local state from a partial response.
  const handleNext = async () => {
    setActionLoading("next");
    try {
      const response = await queueService.callNextToken(id);
      pushEvent(
        "called",
        `Token #${response.token?.tokenNumber ?? queue.currentToken + 1} called to counter`,
      );
      await load();
    } catch (err) {
      console.error(err);
    } finally {
      setActionLoading(null);
    }
  };

  const handleComplete = async () => {
    setActionLoading("complete");
    try {
      await queueService.completeCurrentToken(id);
      pushEvent("completed", `Token #${queue.currentToken} marked completed`);
      await load();
    } catch (err) {
      console.error(err);
    } finally {
      setActionLoading(null);
    }
  };

  const handleMissed = async () => {
    setActionLoading("miss");
    try {
      await queueService.missCurrentToken(id);
      pushEvent("missed", `Token #${queue.currentToken} marked missed`);
      await load();
    } catch (err) {
      console.error(err);
    } finally {
      setActionLoading(null);
    }
  };

  const handleStatusChange = async (
    newStatus,
    actionKey,
    eventType,
    eventMessage,
  ) => {
    setActionLoading(actionKey);
    try {
      const response = await queueService.updateQueueStatus(id, newStatus);
      setQueue(response.queue || { ...queue, queueStatus: newStatus });
      pushEvent(eventType, eventMessage);
    } catch (err) {
      console.error(err);
    } finally {
      setActionLoading(null);
      setConfirmAction(null);
    }
  };

  const handlePauseConfirmed = () =>
    handleStatusChange("paused", "pause", "paused", "Queue paused by staff");
  const handleResume = () =>
    handleStatusChange("active", "resume", "resumed", "Queue resumed by staff");
  const handleCloseConfirmed = () =>
    handleStatusChange("closed", "close", "paused", "Queue closed by staff");

  const fmtTime = (d) =>
    d.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

  return (
    <StaffLayout>
      <div className="bg-linear-to-r from-blue-600 to-teal-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-white text-xs font-medium">
            <Wifi size={13} className="shrink-0 animate-pulse" />
            <span>
              Live updates are enabled. Queue information refreshes
              automatically every 30s.
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-white/80 text-xs shrink-0">
            <RefreshCw size={11} />
            <span>Updated {fmtTime(lastRefresh)}</span>
          </div>
        </div>
      </div>

      {loading ? (
        <PageSkeleton />
      ) : error || !queue ? (
        <ErrorState onRetry={load} />
      ) : (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
          <div>
            <div className="flex items-center gap-2 text-xs text-gray-400 mb-4">
              <a href="#" className="hover:text-blue-600 transition-colors">
                Staff
              </a>
              <ChevronRight size={12} />
              <a href="#" className="hover:text-blue-600 transition-colors">
                Queue Management
              </a>
              <ChevronRight size={12} />
              <span className="text-gray-700 font-medium">
                {department?.name || "Department"}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-3">
                <button className="w-9 h-9 rounded-xl border border-gray-200 bg-white flex items-center justify-center text-gray-500 hover:bg-gray-50 hover:text-blue-600 transition-all group shrink-0">
                  <ArrowLeft
                    size={16}
                    className="group-hover:-translate-x-0.5 transition-transform"
                  />
                </button>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h1 className="text-xl md:text-2xl font-bold text-gray-900">
                      {department?.name || "Queue"}
                    </h1>
                    <StatusBadge status={queue.queueStatus} />
                  </div>
                  <p className="text-sm text-gray-500 mt-0.5">
                    {STAFF.hospital}
                    {department?.averageConsultationTime
                      ? ` · ~${department.averageConsultationTime} min / consult`
                      : ""}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <CurrentTokenCard
            queue={queue}
            currentToken={currentToken}
            onNext={handleNext}
            onComplete={handleComplete}
            onMissed={handleMissed}
            onPause={() => setConfirmAction("pause")}
            onResume={handleResume}
            onClose={() => setConfirmAction("close")}
            actionLoading={actionLoading}
          />

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <InfoStatCard
              icon={Hash}
              label="Current Token"
              value={queue.currentToken > 0 ? `#${queue.currentToken}` : "—"}
              unit="now serving"
              color="text-blue-600"
              bg="bg-blue-50"
              border="border-blue-100"
            />
            <InfoStatCard
              icon={Users}
              label="Current Token Status"
              value={
                currentToken
                  ? TOKEN_STATUS_CONFIG[currentToken.status]?.label ||
                    currentToken.status
                  : "None active"
              }
              unit={
                currentToken
                  ? `token #${currentToken.tokenNumber}`
                  : "queue idle"
              }
              color="text-purple-600"
              bg="bg-purple-50"
              border="border-purple-100"
            />
            <InfoStatCard
              icon={Timer}
              label="Total Tokens"
              value={queue.totalTokens}
              unit="issued today"
              color="text-amber-600"
              bg="bg-amber-50"
              border="border-amber-100"
            />
            <InfoStatCard
              icon={Activity}
              label="Queue Status"
              value={
                STATUS_CONFIG[queue.queueStatus]?.label || queue.queueStatus
              }
              unit={`${queue.currentToken}/${queue.totalTokens} issued`}
              color="text-emerald-600"
              bg="bg-emerald-50"
              border="border-emerald-100"
              pulse={queue.queueStatus === "active"}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div
              className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 overflow-hidden"
              style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}
            >
              <div className="px-5 py-4 border-b border-gray-50">
                <h3 className="font-semibold text-gray-900 text-sm">
                  Waiting Patients
                </h3>
                <p className="text-xs text-gray-400 mt-0.5">
                  Not available yet
                </p>
              </div>
              <div className="flex flex-col items-center justify-center py-16 text-center px-6">
                <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mb-4">
                  <Users size={28} className="text-blue-300" />
                </div>
                <h3 className="text-gray-800 font-semibold text-base mb-1">
                  Waiting list needs a backend endpoint
                </h3>
                <p className="text-gray-400 text-sm max-w-sm">
                  Only the current active token can be fetched right now (GET
                  /queue/:queueId/current-token). Add an endpoint that returns
                  all "waiting" tokens for this queue to populate this table.
                </p>
              </div>
            </div>

            <ActivityTimeline events={timeline} />
          </div>
        </main>
      )}

      <ConfirmDialog
        open={confirmAction === "pause"}
        title="Pause this queue?"
        message="Patients won't be called while the queue is paused. You can resume it anytime."
        confirmLabel="Pause Queue"
        onConfirm={handlePauseConfirmed}
        onCancel={() => setConfirmAction(null)}
        loading={actionLoading === "pause"}
      />
      <ConfirmDialog
        open={confirmAction === "close"}
        title="Close this queue?"
        message="This will end the queue for today. Remaining patients will need to be redirected. This action cannot be undone."
        confirmLabel="Close Queue"
        danger
        onConfirm={handleCloseConfirmed}
        onCancel={() => setConfirmAction(null)}
        loading={actionLoading === "close"}
      />
    </StaffLayout>
  );
}
