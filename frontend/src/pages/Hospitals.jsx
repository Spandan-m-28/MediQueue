import { useState, useEffect } from "react";
import Navbar from "../components/Navbar.jsx";
import {
  Search,
  MapPin,
  Phone,
  Mail,
  Building2,
  ChevronLeft,
  ChevronRight,
  SlidersHorizontal,
  ArrowUpDown,
  Menu,
  X,
  Stethoscope,
  Clock,
  CheckCircle2,
  XCircle,
  Bell,
  User,
  ChevronDown,
} from "lucide-react";
import Footer from "../components/Footer.jsx";

// ─── Mock Data ────────────────────────────────────────────────────────────────
const MOCK_HOSPITALS = [
  { id: 1, name: "Apollo Hospitals", address: "21 Greams Lane, Thousand Lights", city: "Chennai", phone: "+91 44 2829 0200", email: "info@apollochennai.com", departments: 34, status: "open", specialty: "Multi-Specialty" },
  { id: 2, name: "Fortis Healthcare", address: "Mulund Goregaon Link Road", city: "Mumbai", phone: "+91 22 6799 2222", email: "care@fortis.in", departments: 28, status: "open", specialty: "Cardiac Care" },
  { id: 3, name: "AIIMS New Delhi", address: "Sri Aurobindo Marg, Ansari Nagar", city: "New Delhi", phone: "+91 11 2659 3308", email: "aiims@gov.in", departments: 42, status: "open", specialty: "Research Hospital" },
  { id: 4, name: "Narayana Health City", address: "258/A Bommasandra Industrial Area", city: "Bengaluru", phone: "+91 80 7122 2222", email: "contact@narayanahealth.org", departments: 31, status: "open", specialty: "Cardiac & Cancer" },
  { id: 5, name: "Kokilaben Dhirubhai", address: "Rao Saheb Achutrao Patwardhan Marg", city: "Mumbai", phone: "+91 22 3066 1000", email: "info@kokilabenhospital.com", departments: 25, status: "closed", specialty: "Neurosciences" },
  { id: 6, name: "Max Super Speciality", address: "1 Press Enclave Road, Saket", city: "New Delhi", phone: "+91 11 2651 5050", email: "help@maxhealthcare.in", departments: 29, status: "open", specialty: "Oncology" },
  { id: 7, name: "Manipal Hospitals", address: "98 HAL Airport Road, Kodihalli", city: "Bengaluru", phone: "+91 80 2502 4444", email: "contact@manipalhospitals.com", departments: 36, status: "open", specialty: "Orthopaedics" },
  { id: 8, name: "Medanta The Medicity", address: "CH Baktawar Singh Road, Sector 38", city: "Gurugram", phone: "+91 124 441 1441", email: "info@medanta.org", departments: 45, status: "open", specialty: "Multi-Specialty" },
  { id: 9, name: "Tata Memorial Centre", address: "Dr. E. Borges Road, Parel", city: "Mumbai", phone: "+91 22 2417 7000", email: "tmc@tatamemorial.gov.in", departments: 18, status: "open", specialty: "Cancer Institute" },
  { id: 10, name: "Christian Medical College", address: "Vellore – 632 004", city: "Vellore", phone: "+91 416 228 2010", email: "cmc@cmcvellore.ac.in", departments: 52, status: "open", specialty: "Teaching Hospital" },
  { id: 11, name: "Lilavati Hospital", address: "A-791 Bandra Reclamation Road", city: "Mumbai", phone: "+91 22 2675 1000", email: "mail@lilavatihospital.com", departments: 22, status: "closed", specialty: "Critical Care" },
  { id: 12, name: "Breach Candy Hospital", address: "60-A Bhulabhai Desai Road", city: "Mumbai", phone: "+91 22 2366 7809", email: "info@breachcandyhospital.org", departments: 19, status: "open", specialty: "Paediatrics" },
];

const CITIES = ["All Cities", "Chennai", "Mumbai", "New Delhi", "Bengaluru", "Gurugram", "Vellore"];
const SORT_OPTIONS = ["Default", "A → Z", "Z → A", "Most Departments"];
const ITEMS_PER_PAGE = 6;

// ─── Hospital Avatar (image placeholder) ─────────────────────────────────────
const HospitalAvatar = ({ name, id }) => {
  const hues = [
    ["#EFF6FF", "#2563EB"],
    ["#F0FDFA", "#0D9488"],
    ["#F0FDF4", "#16A34A"],
    ["#FFF7ED", "#EA580C"],
    ["#FAF5FF", "#7C3AED"],
    ["#FFF1F2", "#E11D48"],
  ];
  const [bg, text] = hues[id % hues.length];
  const initials = name.split(" ").slice(0, 2).map((w) => w[0]).join("");
  return (
    <div className="w-full h-44 flex items-center justify-center rounded-t-2xl" style={{ background: bg }}>
      <div className="flex flex-col items-center gap-2">
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-xl font-bold" style={{ background: text + "20", color: text }}>
          {initials}
        </div>
        <Stethoscope size={20} style={{ color: text + "80" }} />
      </div>
    </div>
  );
};

// ─── Skeleton Card ────────────────────────────────────────────────────────────
const SkeletonCard = () => (
  <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden animate-pulse">
    <div className="h-44 bg-gray-100" />
    <div className="p-5 space-y-3">
      <div className="h-4 bg-gray-100 rounded-full w-3/4" />
      <div className="h-3 bg-gray-100 rounded-full w-1/2" />
      <div className="h-px bg-gray-100 my-3" />
      <div className="space-y-2">
        <div className="h-3 bg-gray-100 rounded-full w-full" />
        <div className="h-3 bg-gray-100 rounded-full w-4/5" />
        <div className="h-3 bg-gray-100 rounded-full w-3/5" />
      </div>
      <div className="h-10 bg-gray-100 rounded-xl mt-4" />
    </div>
  </div>
);

// ─── Status Badge ─────────────────────────────────────────────────────────────
const StatusBadge = ({ status }) =>
  status === "open" ? (
    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100">
      <CheckCircle2 size={11} /> Open
    </span>
  ) : (
    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-50 text-red-600 border border-red-100">
      <XCircle size={11} /> Closed
    </span>
  );

// ─── Hospital Card ────────────────────────────────────────────────────────────
const HospitalCard = ({ hospital }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="bg-white rounded-2xl border border-gray-100 overflow-hidden flex flex-col transition-all duration-300 cursor-pointer"
      style={{
        boxShadow: hovered ? "0 20px 40px -12px rgba(37,99,235,0.15), 0 4px 16px -4px rgba(0,0,0,0.08)" : "0 1px 4px rgba(0,0,0,0.06)",
        transform: hovered ? "translateY(-4px) scale(1.01)" : "translateY(0) scale(1)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative">
        <HospitalAvatar name={hospital.name} id={hospital.id} />
        <div className="absolute top-3 right-3">
          <StatusBadge status={hospital.status} />
        </div>
        <div className="absolute bottom-3 left-3">
          <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-white/80 backdrop-blur-sm text-gray-600 border border-white/60">
            {hospital.specialty}
          </span>
        </div>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-semibold text-gray-900 text-base leading-tight">{hospital.name}</h3>

        <div className="flex items-start gap-1.5 mt-1.5">
          <MapPin size={13} className="text-gray-400 mt-0.5 shrink-0" />
          <p className="text-xs text-gray-500 leading-snug">{hospital.address}</p>
        </div>

        <div className="border-t border-gray-50 mt-3 pt-3 space-y-2">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <MapPin size={12} className="text-blue-400 shrink-0" />
            <span>{hospital.city}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Phone size={12} className="text-teal-400 shrink-0" />
            <span>{hospital.phone}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Mail size={12} className="text-purple-400 shrink-0" />
            <span className="truncate">{hospital.email}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Building2 size={12} className="text-orange-400 shrink-0" />
            <span>{hospital.departments} Departments</span>
          </div>
        </div>

        <button
          className="mt-4 w-full py-2.5 rounded-xl text-sm font-semibold transition-all duration-200"
          style={{
            background: hovered ? "#2563EB" : "#EFF6FF",
            color: hovered ? "#ffffff" : "#2563EB",
          }}
        >
          View Details
        </button>
      </div>
    </div>
  );
};

// ─── Empty State ──────────────────────────────────────────────────────────────
const EmptyState = ({ query }) => (
  <div className="col-span-full flex flex-col items-center justify-center py-20 text-center">
    <div className="w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center mb-5">
      <Search size={32} className="text-blue-300" />
    </div>
    <h3 className="text-gray-800 font-semibold text-lg mb-1">No hospitals found</h3>
    <p className="text-gray-400 text-sm max-w-xs">
      No results for <span className="font-medium text-gray-600">"{query}"</span>. Try a different name or city.
    </p>
  </div>
);

// ─── Pagination ───────────────────────────────────────────────────────────────
const Pagination = ({ current, total, onChange }) => {
  const pages = Array.from({ length: total }, (_, i) => i + 1);
  return (
    <div className="flex items-center justify-center gap-1 mt-10">
      <button
        onClick={() => onChange(current - 1)}
        disabled={current === 1}
        className="w-9 h-9 rounded-xl border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
      >
        <ChevronLeft size={16} />
      </button>
      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onChange(p)}
          className="w-9 h-9 rounded-xl border text-sm font-medium transition-all duration-150"
          style={{
            background: p === current ? "#2563EB" : "white",
            color: p === current ? "white" : "#6B7280",
            borderColor: p === current ? "#2563EB" : "#E5E7EB",
          }}
        >
          {p}
        </button>
      ))}
      <button
        onClick={() => onChange(current + 1)}
        disabled={current === total}
        className="w-9 h-9 rounded-xl border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
};

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function Hospitals() {
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");
  const [city, setCity] = useState("All Cities");
  const [sort, setSort] = useState("Default");
  const [page, setPage] = useState(1);
  const [cityOpen, setCityOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);

  // Simulate API fetch
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      // Swap line below with: axios.get("/api/hospitals").then(r => setHospitals(r.data))
      setHospitals(MOCK_HOSPITALS);
      setLoading(false);
    }, 1400);
    return () => clearTimeout(timer);
  }, []);

  // Filter + Sort
  const filtered = hospitals
    .filter((h) => h.name.toLowerCase().includes(query.toLowerCase()))
    .filter((h) => city === "All Cities" || h.city === city)
    .sort((a, b) => {
      if (sort === "A → Z") return a.name.localeCompare(b.name);
      if (sort === "Z → A") return b.name.localeCompare(a.name);
      if (sort === "Most Departments") return b.departments - a.departments;
      return 0;
    });

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const handleQuery = (v) => { setQuery(v); setPage(1); };
  const handleCity = (c) => { setCity(c); setPage(1); setCityOpen(false); };
  const handleSort = (s) => { setSort(s); setPage(1); setSortOpen(false); };

  return (
    <div className="min-h-screen" style={{ background: "#F8FAFC", fontFamily: "'Inter', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />

      <Navbar />

      {/* ── Hero Section ── */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-gray-400 mb-6">
            <a href="#" className="hover:text-blue-600 transition-colors">Home</a>
            <ChevronRight size={12} />
            <span className="text-gray-700 font-medium">Hospitals</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 mb-4">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                <span className="text-xs font-semibold text-blue-600 tracking-wide uppercase">Live Queue Status</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                Find a Hospital
              </h1>
              <p className="text-gray-500 mt-2 text-base max-w-lg">
                Browse hospitals and check their live OPD queues. Book your slot before you arrive.
              </p>
            </div>

            <div className="flex items-center gap-4">
              {[
                { label: "Hospitals", value: hospitals.length, color: "#2563EB", bg: "#EFF6FF" },
                { label: "Cities", value: CITIES.length - 1, color: "#0D9488", bg: "#F0FDFA" },
              ].map(({ label, value, color, bg }) => (
                <div key={label} className="text-center px-5 py-3 rounded-2xl" style={{ background: bg }}>
                  <div className="text-2xl font-bold" style={{ color }}>{value}</div>
                  <div className="text-xs font-medium text-gray-500 mt-0.5">{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Search + Filters */}
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            {/* Search */}
            <div className="flex-1 relative">
              <Search size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search hospitals by name…"
                value={query}
                onChange={(e) => handleQuery(e.target.value)}
                className="w-full h-12 pl-11 pr-4 rounded-xl border border-gray-200 bg-white text-sm text-gray-800 placeholder-gray-400 outline-none transition-all focus:border-blue-400 focus:ring-2 focus:ring-blue-50"
              />
            </div>

            {/* City Filter */}
            <div className="relative">
              <button
                onClick={() => { setCityOpen(!cityOpen); setSortOpen(false); }}
                className="h-12 px-4 rounded-xl border border-gray-200 bg-white flex items-center gap-2 text-sm font-medium text-gray-600 hover:border-blue-300 hover:text-blue-600 transition-all min-w-[148px] justify-between"
              >
                <div className="flex items-center gap-2">
                  <SlidersHorizontal size={15} className="text-gray-400" />
                  {city}
                </div>
                <ChevronDown size={14} className={`text-gray-400 transition-transform ${cityOpen ? "rotate-180" : ""}`} />
              </button>
              {cityOpen && (
                <div className="absolute top-14 left-0 w-48 bg-white border border-gray-100 rounded-xl shadow-xl z-30 overflow-hidden py-1">
                  {CITIES.map((c) => (
                    <button
                      key={c}
                      onClick={() => handleCity(c)}
                      className="w-full text-left px-4 py-2.5 text-sm hover:bg-blue-50 hover:text-blue-600 transition-colors"
                      style={{ color: city === c ? "#2563EB" : "#374151", fontWeight: city === c ? 600 : 400 }}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Sort */}
            <div className="relative">
              <button
                onClick={() => { setSortOpen(!sortOpen); setCityOpen(false); }}
                className="h-12 px-4 rounded-xl border border-gray-200 bg-white flex items-center gap-2 text-sm font-medium text-gray-600 hover:border-blue-300 hover:text-blue-600 transition-all min-w-[148px] justify-between"
              >
                <div className="flex items-center gap-2">
                  <ArrowUpDown size={15} className="text-gray-400" />
                  {sort}
                </div>
                <ChevronDown size={14} className={`text-gray-400 transition-transform ${sortOpen ? "rotate-180" : ""}`} />
              </button>
              {sortOpen && (
                <div className="absolute top-14 left-0 w-48 bg-white border border-gray-100 rounded-xl shadow-xl z-30 overflow-hidden py-1">
                  {SORT_OPTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => handleSort(s)}
                      className="w-full text-left px-4 py-2.5 text-sm hover:bg-blue-50 hover:text-blue-600 transition-colors"
                      style={{ color: sort === s ? "#2563EB" : "#374151", fontWeight: sort === s ? 600 : 400 }}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Active filter pills */}
          {(city !== "All Cities" || sort !== "Default" || query) && (
            <div className="mt-3 flex flex-wrap gap-2">
              {query && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-medium border border-blue-100">
                  "{query}"
                  <button onClick={() => handleQuery("")}><X size={11} /></button>
                </span>
              )}
              {city !== "All Cities" && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 text-teal-700 text-xs font-medium border border-teal-100">
                  {city}
                  <button onClick={() => handleCity("All Cities")}><X size={11} /></button>
                </span>
              )}
              {sort !== "Default" && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-medium border border-purple-100">
                  {sort}
                  <button onClick={() => handleSort("Default")}><X size={11} /></button>
                </span>
              )}
            </div>
          )}
        </div>
      </section>

      {/* ── Grid Section ── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Results count */}
        {!loading && !error && (
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-gray-500">
              Showing <span className="font-semibold text-gray-800">{Math.min((page - 1) * ITEMS_PER_PAGE + 1, filtered.length)}–{Math.min(page * ITEMS_PER_PAGE, filtered.length)}</span>{" "}
              of <span className="font-semibold text-gray-800">{filtered.length}</span> hospitals
            </p>
            <div className="flex items-center gap-1.5 text-xs text-gray-400">
              <Clock size={12} />
              Updated just now
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center mb-5">
              <XCircle size={32} className="text-red-300" />
            </div>
            <h3 className="text-gray-800 font-semibold text-lg mb-1">Something went wrong</h3>
            <p className="text-gray-400 text-sm mb-5">We couldn't load hospitals. Please try again.</p>
            <button
              onClick={() => window.location.reload()}
              className="px-5 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors"
            >
              Retry
            </button>
          </div>
        )}

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
            : !error && paginated.length === 0
            ? <EmptyState query={query} />
            : !error && paginated.map((h) => <HospitalCard key={h.id} hospital={h} />)
          }
        </div>

        {/* Pagination */}
        {!loading && !error && totalPages > 1 && (
          <Pagination current={page} total={totalPages} onChange={setPage} />
        )}
      </main>

      {/* ── Footer ── */}
      <Footer/>
    </div>
  );
}