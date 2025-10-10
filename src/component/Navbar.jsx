import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ChevronDown,
  Menu,
  X,
  Mail,
  Phone,
  User,
  Home,
} from "lucide-react";
import Logo from "../assets/Logo.png";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [activeSubmenu, setActiveSubmenu] = useState(null);

  const navigationItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "About Us", href: "/about" },
    { name: "Services", href: "/services" },
    {
      name: "MF Research",
      href: "#",
      hasDropdown: true,
      "dropdownItems": [
        { "name": "Benchmark Return", "href": "/mf/benchmark-return" },
        { "name": "Top Performing SIP", "href": "/mf/top-performers" },
        // { "name": "SIP Return Calculator", "href": "/mf/sip-return-calculator" },
        { "name": "SIP with Annual Increase", "href": "/mf/annual-increase" },
        { "name": "Top SWP Fund", "href": "/mf/top-swp-returns" },
        { "name": "Mutual Fund Volatility Ranking", "href": "/mf/mf-volatility-ranking" },
        // { "name": "Scheme Categories", "href": "#" },
        // { "name": "All Mutual Fund Companies", "href": "#" },
        { "name": "Best Performing Funds - AMC Wise", "href": "/mf/mf-trailing-returns" },
        { "name": "Mutual Fund Category Returns", "href": "/mf/category-returns" },
        { "name": "Mutual Fund category Monitor", "href": "/mf/category-monitor" },
        // { "name": "SWP Return Calculator", "href": "#" },
        { "name": "Mutual Fund SIP Returns", "href": "/mf/mf-sip-returns" },
        // { "name": "All Mutual Fund Schemes", "href": "#" },
        // { "name": "Scheme Details page (Lite)", "href": "#" }
      ],
    },
    {
  name: "Calculators",
  href: "#",
  hasDropdown: true,
  dropdownItems: [
    { name: "Become A Crorepati", href: "/calculator/become-a-crorepati" },
    { name: "SIP Return Calculator", href: "/calculator/sip-calculator" },
    { name: "Retirement Planning Calculator", href: "/calculator/retirement-planning-calculator" },
    { name: "Asset Allocation Calculator", href: "/calculator/asset-allocation-calculator" },
    { name: "EMI Calculator", href: "/calculator/emi-calculator" },
    { name: "PPF Calculator", href: "/calculator/ppf-calculator" },
    { name: "Employees PF Calculator", href: "/calculator/epf-calculator" },
    { name: "Goal Setting Calculator", href: "/calculator/goal-setting-calculator" },
    { name: "Composite Financial Goal Calculator", href: "/calculator/composite-financial-goal-planner-calculator" },
    { name: "Children Education Planner", href: "/calculator/children-education-planner-calculator" },
    { name: "Nettworth Calculator", href: "/calculator/networth-calculator" },
    { name: "Compounding Calculator", href: "/calculator/compounding-calculator" },
    { name: "Spending Less Calculator", href: "/calculator/save-more-by-spending-less-calculator" },
    { name: "Future Value Calculator", href: "/calculator/future-value-calculator" },
    { name: "Human Life Value Calculator", href: "/calculator/human-life-value-calculator" },
    { name: "SIP Step Up Calculator", href: "/calculator/mutual-fund-sip-calculator-step-up" },
  ],
}
,
    {
      name: "Goal Planners",
      href: "#",
      hasDropdown: true,
      dropdownItems: [
        { name: "Dream Home", href: "/goal/home" },
        { name: "Wealth Creation", href: "/goal/wealth-creation" },
        { name: "Retirement", href: "/goal/retirement" },
        { name: "Child Education", href: "/goal/child-education" },
        { name: "Child Wedding", href: "/goal/child-wedding" },
        { name: "Emergency", href: "/goal/emergency" },
      ],
    },
    // {
    //   name: "Knowledge",
    //   href: "#",
    //   hasDropdown: true,
    //   dropdownItems: [
    //     { name: "Blogs", href: "blogs" },
    //     { name: "Videos", href: "#" },
    //     {
    //       name: "Learning Center",
    //       hasSubmenu: true,
    //       submenu: [
    //         { name: "Investment Basics", href: "#" },
    //         { name: "Market Fundamentals", href: "#" },
    //         { name: "Risk Management", href: "#" },
    //         { name: "Tax Planning Guide", href: "#" },
    //       ],
    //     },
    //   ],
    // },
    { name: "Contact Us", href: "/contact" },
  ];

  return (
    <div className="bg-white shadow-lg sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-gray-900 via-slate-800 to-gray-900 text-white py-3 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-teal-600/10 via-transparent to-orange-500/10"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-0 left-1/4 w-32 h-32 bg-teal-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-0 right-1/4 w-24 h-24 bg-orange-500/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
        </div>
        <div className="md:px-10 mx-auto flex flex-col md:flex-row justify-between items-center text-sm relative z-10">
          <div className="flex items-center space-x-8">
            {/* Mail */}
            <div className="flex items-center space-x-3 group">
              <div className="p-1.5 bg-gradient-to-br from-orange-500/20 to-orange-600/20 rounded-lg backdrop-blur-sm border border-orange-400/20">
                <Mail className="w-4 h-4 text-orange-400 group-hover:scale-110 transition-transform duration-200" />
              </div>
              <div className="flex flex-col">
                <span className="text-gray-300 text-xs font-medium tracking-wide uppercase">
                  Mail Us Today
                </span>
                <a
                  href="mailto:help@exploremfs.com"
                  className="text-orange-400 hover:text-orange-300 transition-colors font-medium hover:underline"
                >
                  help@exploremfs.com
                </a>
              </div>
            </div>
            <div className="hidden md:block w-px h-8 bg-gradient-to-b from-transparent via-gray-600 to-transparent"></div>
            {/* Phone */}
            <div className="flex items-center space-x-3 group">
              <div className="p-1.5 bg-gradient-to-br from-teal-500/20 to-teal-600/20 rounded-lg backdrop-blur-sm border border-teal-400/20">
                <Phone className="w-4 h-4 text-teal-400 group-hover:scale-110 transition-transform duration-200" />
              </div>
              <div className="flex flex-col">
                <span className="text-gray-300 text-xs font-medium tracking-wide uppercase">
                  Contact Number
                </span>
                <a
                  href="tel:+917500372237 "
                  className="text-teal-400 hover:text-teal-300 transition-colors font-medium hover:underline"
                >
                  +91-7500372237
                </a>
              </div>
            </div>
          </div>
          {/* Login */}
          <div className="flex items-center space-x-4 mt-3 md:mt-0">
            <a
              href="https://login.exploremfs.com"
              target="_blank"
              className="group relative bg-gradient-to-r from-orange-500 to-orange-600 px-10 md:px-6 py-2 rounded-full text-white text-sm font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <User className="w-4 h-4 group-hover:rotate-12 transition-transform duration-200" />
              Login
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="bg-white border-b border-gray-100">
        <div className="px-10 mx-auto">
          <div className="flex justify-between items-center py-2">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <Link to="/">
                <img src={Logo} className="w-full h-14" alt="Logo" />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navigationItems.map((item) => (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => {
                    if (item.hasDropdown) {
                      setActiveDropdown(item.name);
                      setActiveSubmenu(null);
                    }
                  }}
                  onMouseLeave={() => {
                    setActiveDropdown(null);
                    setActiveSubmenu(null);
                  }}
                >
                  {item.hasDropdown ? (
                    <button
                      className="flex items-center space-x-1 px-4 py-2 text-gray-700 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-all duration-200 font-medium group"
                    >
                      {item.icon && <item.icon className="w-4 h-4" />}
                      <span>{item.name}</span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === item.name ? "rotate-180" : ""
                          }`}
                      />
                    </button>
                  ) : (
                    <Link
                      to={item.href}
                      className="flex items-center space-x-1 px-4 py-2 text-gray-700 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-all duration-200 font-medium group"
                    >
                      {item.icon && <item.icon className="w-4 h-4" />}
                      <span>{item.name}</span>
                    </Link>
                  )}

                  {/* Dropdown Menu */}
                  {item.hasDropdown && activeDropdown === item.name && (
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-56 bg-white rounded-lg shadow-xl border border-gray-100 py-2 z-50">
                      {item.dropdownItems.map((dropdownItem, index) => (
                        <div
                          key={index}
                          className="relative"
                          onMouseEnter={() =>
                            dropdownItem.hasSubmenu &&
                            setActiveSubmenu(`${item.name}-${index}`)
                          }
                        >
                          {dropdownItem.href === "#" ? (
                            <button
                              className="w-full flex items-center justify-between px-4 py-2 text-gray-700 hover:text-teal-600 hover:bg-teal-50 transition-colors duration-200 text-xs group text-left"
                            >
                              <span>{dropdownItem.name}</span>
                              {dropdownItem.hasSubmenu && (
                                <ChevronDown className="w-4 h-4 -rotate-90 group-hover:text-teal-600" />
                              )}
                            </button>
                          ) : (
                            <Link
                              to={dropdownItem.href}
                              className="flex items-center justify-between px-4 py-2 text-gray-700 hover:text-teal-600 hover:bg-teal-50 transition-colors duration-200 text-xs group"
                            >
                              <span>{dropdownItem.name}</span>
                              {dropdownItem.hasSubmenu && (
                                <ChevronDown className="w-4 h-4 -rotate-90 group-hover:text-teal-600" />
                              )}
                            </Link>
                          )}

                          {/* Submenu */}
                          {dropdownItem.hasSubmenu &&
                            activeSubmenu === `${item.name}-${index}` && (
                              <div className="absolute top-0 left-full w-40 bg-white rounded-lg border border-gray-100 py-2 z-50">
                                {dropdownItem.submenu.map(
                                  (submenuItem, subIndex) => (
                                    submenuItem.href === "#" ? (
                                      <button
                                        key={subIndex}
                                        className="block w-full text-left px-4 py-1 text-gray-600 hover:text-teal-600 hover:bg-teal-50 transition-colors duration-200 text-xs"
                                      >
                                        {submenuItem.name}
                                      </button>
                                    ) : (
                                      <Link
                                        key={subIndex}
                                        to={submenuItem.href}
                                        className="block px-4 py-1 text-gray-600 hover:text-teal-600 hover:bg-teal-50 transition-colors duration-200 text-xs"
                                      >
                                        {submenuItem.name}
                                      </Link>
                                    )
                                  )
                                )}
                              </div>
                            )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 shadow-lg">
          <div className="px-4 py-2 space-y-1 max-h-96 overflow-y-auto">
            {navigationItems.map((item) => (
              <div key={item.name}>
                {item.hasDropdown ? (
                  <button
                    className="w-full flex items-center justify-between px-3 py-3 text-gray-700 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-colors text-left"
                    onClick={() => {
                      setActiveDropdown(
                        activeDropdown === item.name ? null : item.name
                      );
                      setActiveSubmenu(null);
                    }}
                  >
                    <div className="flex items-center space-x-2">
                      {item.icon && <item.icon className="w-4 h-4" />}
                      <span className="font-medium">{item.name}</span>
                    </div>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === item.name ? "rotate-180" : ""
                        }`}
                    />
                  </button>
                ) : (
                  <Link
                    to={item.href}
                    className="block px-3 py-3 text-gray-700 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-colors font-medium"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <div className="flex items-center space-x-2">
                      {item.icon && <item.icon className="w-4 h-4" />}
                      <span>{item.name}</span>
                    </div>
                  </Link>
                )}

                {/* Mobile Dropdown */}
                {item.hasDropdown && activeDropdown === item.name && (
                  <div className="ml-4 mt-1 space-y-1 border-l-2 border-teal-100 pl-3">
                    {item.dropdownItems.map((dropdownItem, index) => (
                      <div key={index}>
                        {dropdownItem.hasSubmenu ? (
                          <>
                            <button
                              className="w-full flex items-center justify-between px-3 py-2 text-gray-600 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-colors text-sm text-left"
                              onClick={() =>
                                setActiveSubmenu(
                                  activeSubmenu === `${item.name}-${index}`
                                    ? null
                                    : `${item.name}-${index}`
                                )
                              }
                            >
                              <span>{dropdownItem.name}</span>
                              <ChevronDown
                                className={`w-3 h-3 transition-transform duration-200 ${activeSubmenu === `${item.name}-${index}`
                                    ? "rotate-180"
                                    : ""
                                  }`}
                              />
                            </button>

                            {/* Mobile Submenu */}
                            {activeSubmenu === `${item.name}-${index}` && (
                              <div className="ml-4 mt-1 space-y-1 border-l-2 border-orange-100 pl-3">
                                {dropdownItem.submenu.map(
                                  (submenuItem, subIndex) => (
                                    submenuItem.href === "#" ? (
                                      <button
                                        key={subIndex}
                                        className="block w-full text-left px-3 py-2 text-gray-500 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-colors text-xs"
                                        onClick={() =>
                                          setIsMobileMenuOpen(false)
                                        }
                                      >
                                        {submenuItem.name}
                                      </button>
                                    ) : (
                                      <Link
                                        key={subIndex}
                                        to={submenuItem.href}
                                        className="block px-3 py-2 text-gray-500 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-colors text-xs"
                                        onClick={() =>
                                          setIsMobileMenuOpen(false)
                                        }
                                      >
                                        {submenuItem.name}
                                      </Link>
                                    )
                                  )
                                )}
                              </div>
                            )}
                          </>
                        ) : (
                          dropdownItem.href === "#" ? (
                            <button
                              className="block w-full text-left px-3 py-2 text-gray-600 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-colors text-sm"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              {dropdownItem.name}
                            </button>
                          ) : (
                            <Link
                              to={dropdownItem.href}
                              className="block px-3 py-2 text-gray-600 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-colors text-sm"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              {dropdownItem.name}
                            </Link>
                          )
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;