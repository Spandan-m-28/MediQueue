import React from "react";
import { useState } from "react";
import {ChevronDown,Stethoscope,Bell,User,Menu} from "lucide-react"

const Navbar = () => {
  const [open, setOpen] = useState(false);
  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-linear-to-br from-blue-600 to-teal-500 flex items-center justify-center">
              <Stethoscope size={16} className="text-white" />
            </div>
            <span className="font-bold text-gray-900 text-lg tracking-tight">
              Medi<span className="text-blue-600">Queue</span>
            </span>
          </div>
          {/*  Will add this pages later
          <div className="hidden md:flex items-center gap-1">
            {["Hospitals", "Doctors", "Appointments", "About"].map((item) => (
              <a
                key={item}
                href="#"
                className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                  item === "Hospitals"
                    ? "text-blue-600 bg-blue-50"
                    : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                {item}
              </a>
            ))}
          </div> */}

          <div className="hidden md:flex items-center gap-2">
            <button className="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-all relative">
              <Bell size={16} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-500 rounded-full" />
            </button>
            <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 transition-all">
              <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                <User size={13} className="text-blue-600" />
              </div>
              <span className="text-sm font-medium text-gray-700">Account</span>
              <ChevronDown size={13} className="text-gray-400" />
            </button>
          </div>

          <button
            onClick={() => setOpen(!open)}
            className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg border border-gray-200"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>
      {open && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 pb-4 pt-2">
          {["Hospitals", "Doctors", "Appointments", "About"].map((item) => (
            <a
              key={item}
              href="#"
              className="block px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50"
            >
              {item}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
