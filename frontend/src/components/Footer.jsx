import React from 'react'
import {Stethoscope} from "lucide-react"

const Footer = () => {
  return (
    <footer className="border-t border-gray-100 bg-white mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-linear-to-br from-blue-600 to-teal-500 flex items-center justify-center">
              <Stethoscope size={12} className="text-white" />
            </div>
            <span className="font-bold text-sm text-gray-900">Medi<span className="text-blue-600">Queue</span></span>
          </div>
          <p className="text-xs text-gray-400">© 2025 MediQueue. Smart OPD queue management.</p>
          <div className="flex gap-4 text-xs text-gray-400">
            {["Privacy", "Terms", "Support"].map((l) => (
              <a key={l} href="#" className="hover:text-blue-600 transition-colors">{l}</a>
            ))}
          </div>
        </div>
      </footer>
  )
}

export default Footer
