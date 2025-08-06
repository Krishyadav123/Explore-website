import React, { useState } from 'react';
import { ChevronDown, Menu, X, Mail, Phone, User, Home } from 'lucide-react';
import Logo from '../assets/logo.jpg'; // Assuming you have a Logo component

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [activeSubmenu, setActiveSubmenu] = useState(null);

  const navigationItems = [
    { name: 'Home', href: '#', icon: Home },
    { 
      name: 'About Us', 
      href: 'about',
    },
    { 
      name: 'Services', 
      href: 'services',
     
      
    },
    {
      name: 'MF Research',
      href: '#',
      hasDropdown: true,
      dropdownItems: [
        { 
          name: 'Market Analysis',
          hasSubmenu: true,
          submenu: [
            { name: 'Daily Market Reports', href: '#' },
            { name: 'Weekly Analysis', href: '#' },
            { name: 'Monthly Outlook', href: '#' },
            { name: 'Sector Analysis', href: '#' }
          ]
        },
        { 
          name: 'Fund Performance',
          hasSubmenu: true,
          submenu: [
            { name: 'Top Performers', href: '#' },
            { name: 'Fund Comparison', href: '#' },
            { name: 'Risk Analysis', href: '#' },
            { name: 'Historical Data', href: '#' }
          ]
        },
        { name: 'Research Reports', href: '#' },
        { name: 'Investment Insights', href: '#' },
        { name: 'Expert Recommendations', href: '#' }
      ]
    },
    {
      name: 'Calculators',
      href: '#',
      hasDropdown: true,
      dropdownItems: [
        { 
          name: 'Investment Calculators',
          hasSubmenu: true,
          submenu: [
            { name: 'SIP Calculator', href: '#' },
            { name: 'Lumpsum Calculator', href: '#' },
            { name: 'SWP Calculator', href: '#' },
            { name: 'STP Calculator', href: '#' }
          ]
        },
        { 
          name: 'Goal Calculators',
          hasSubmenu: true,
          submenu: [
            { name: 'Retirement Calculator', href: '#' },
            { name: 'Education Calculator', href: '#' },
            { name: 'Home Loan Calculator', href: '#' },
            { name: 'Car Loan Calculator', href: '#' }
          ]
        },
        { name: 'Tax Calculator', href: '#' },
        { name: 'EMI Calculator', href: '#' },
        { name: 'FD Calculator', href: '#' }
      ]
    },
    {
      name: 'Goal Planners',
      href: '#',
      hasDropdown: true,
      dropdownItems: [
        { 
          name: 'Life Goals',
          hasSubmenu: true,
          submenu: [
            { name: 'Retirement Planning', href: '#' },
            { name: 'Child Education', href: '#' },
            { name: 'Marriage Planning', href: '#' },
            { name: 'Emergency Fund', href: '#' }
          ]
        },
        { 
          name: 'Asset Goals',
          hasSubmenu: true,
          submenu: [
            { name: 'Home Purchase', href: '#' },
            { name: 'Vehicle Purchase', href: '#' },
            { name: 'Vacation Planning', href: '#' },
            { name: 'Business Setup', href: '#' }
          ]
        },
        { name: 'Wealth Creation', href: '#' },
        { name: 'Tax Saving', href: '#' }
      ]
    },
    {
      name: 'Knowledge',
      href: '#',
      hasDropdown: true,
      dropdownItems: [
        { 
          name: 'Learning Center',
          hasSubmenu: true,
          submenu: [
            { name: 'Investment Basics', href: '#' },
            { name: 'Market Fundamentals', href: '#' },
            { name: 'Risk Management', href: '#' },
            { name: 'Tax Planning Guide', href: '#' }
          ]
        },
        { name: 'Articles', href: '#' },
        { name: 'Videos', href: '#' },
        { name: 'Webinars', href: '#' },
        { name: 'Market Updates', href: '#' },
        { name: 'Newsletter', href: '#' }
      ]
    },
    { 
      name: 'Contact Us', 
      href: '#',
     
    }
  ];

  return (
    <div className="bg-white shadow-lg sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-gray-900 via-slate-800 to-gray-900 text-white py-3 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-r from-teal-600/10 via-transparent to-orange-500/10"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-0 left-1/4 w-32 h-32 bg-teal-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-0 right-1/4 w-24 h-24 bg-orange-500/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="px-10 mx-auto flex justify-between items-center text-sm relative z-10">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-3 group">
              <div className="p-1.5 bg-gradient-to-br from-orange-500/20 to-orange-600/20 rounded-lg backdrop-blur-sm border border-orange-400/20">
                <Mail className="w-4 h-4 text-orange-400 group-hover:scale-110 transition-transform duration-200" />
              </div>
              <div className="flex flex-col">
                <span className="text-gray-300 text-xs font-medium tracking-wide uppercase">Mail Us Today</span>
                <a href="mailto:contact@ploutia.com" className="text-orange-400 hover:text-orange-300 transition-colors font-medium hover:underline">
                  contact@ploutia.com
                </a>
              </div>
            </div>
            
            <div className="hidden md:block w-px h-8 bg-gradient-to-b from-transparent via-gray-600 to-transparent"></div>
            
            <div className="flex items-center space-x-3 group">
              <div className="p-1.5 bg-gradient-to-br from-teal-500/20 to-teal-600/20 rounded-lg backdrop-blur-sm border border-teal-400/20">
                <Phone className="w-4 h-4 text-teal-400 group-hover:scale-110 transition-transform duration-200" />
              </div>
              <div className="flex flex-col">
                <span className="text-gray-300 text-xs font-medium tracking-wide uppercase">Contact Number</span>
                <a href="tel:+918147049936" className="text-teal-400 hover:text-teal-300 transition-colors font-medium hover:underline">
                  +91-8147049936
                </a>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="hidden lg:flex items-center space-x-2 text-gray-300">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-xs font-medium">Online Support Available</span>
            </div>
            
            <button className="group relative bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-2 rounded-full text-white text-sm font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <User className="w-4 h-4 group-hover:rotate-12 transition-transform duration-200" />
              <span>Login</span>
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="bg-white border-b border-gray-100">
        <div className="px-10 mx-auto">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <img src={Logo} className='w-full h-10' alt="" />
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
                  <a
                    href={item.href}
                    className="flex items-center space-x-1 px-4 py-2 text-gray-700 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-all duration-200 font-medium group"
                  >
                    {item.icon && <item.icon className="w-4 h-4" />}
                    <span>{item.name}</span>
                    {item.hasDropdown && (
                      <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === item.name ? 'rotate-180' : ''}`} />
                    )}
                  </a>

                  {/* Dropdown Menu */}
                  {item.hasDropdown && activeDropdown === item.name && (
                   <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-48 bg-white rounded-lg shadow-xl border border-gray-100 py-2 z-50">

                      {item.dropdownItems.map((dropdownItem, index) => (
                        <div
                          key={index}
                          className="relative"
                          onMouseEnter={() => dropdownItem.hasSubmenu && setActiveSubmenu(`${item.name}-${index}`)}
                        >
                          <a
                            href={dropdownItem.href || '#'}
                            className="flex items-center justify-between px-4 py-3 text-gray-700 hover:text-teal-600 hover:bg-teal-50 transition-colors duration-200 text-sm group"
                          >
                            <span>{dropdownItem.name}</span>
                            {dropdownItem.hasSubmenu && (
                              <ChevronDown className="w-4 h-4 -rotate-90 group-hover:text-teal-600" />
                            )}
                          </a>

                          {/* Submenu */}
                          {dropdownItem.hasSubmenu && activeSubmenu === `${item.name}-${index}` && (
                            <div className="absolute top-0 left-full w-40 bg-white rounded-lg shadow-xl border border-gray-100 py-2 z-50">
                              {dropdownItem.submenu.map((submenuItem, subIndex) => (
                                <a
                                  key={subIndex}
                                  href={submenuItem.href}
                                  className="block px-4 py-3 text-gray-600 hover:text-teal-600 hover:bg-teal-50 transition-colors duration-200 text-sm"
                                >
                                  {submenuItem.name}
                                </a>
                              ))}
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
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
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
                <button
                  className="w-full flex items-center justify-between px-3 py-3 text-gray-700 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-colors text-left"
                  onClick={() => {
                    if (item.hasDropdown) {
                      setActiveDropdown(activeDropdown === item.name ? null : item.name);
                      setActiveSubmenu(null);
                    } else {
                      setIsMobileMenuOpen(false);
                    }
                  }}
                >
                  <div className="flex items-center space-x-2">
                    {item.icon && <item.icon className="w-4 h-4" />}
                    <span className="font-medium">{item.name}</span>
                  </div>
                  {item.hasDropdown && (
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === item.name ? 'rotate-180' : ''}`} />
                  )}
                </button>

                {/* Mobile Dropdown */}
                {item.hasDropdown && activeDropdown === item.name && (
                  <div className="ml-4 mt-1 space-y-1 border-l-2 border-teal-100 pl-3">
                    {item.dropdownItems.map((dropdownItem, index) => (
                      <div key={index}>
                        <button
                          className="w-full flex items-center justify-between px-3 py-2 text-gray-600 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-colors text-sm text-left"
                          onClick={() => {
                            if (dropdownItem.hasSubmenu) {
                              setActiveSubmenu(activeSubmenu === `${item.name}-${index}` ? null : `${item.name}-${index}`);
                            } else {
                              setIsMobileMenuOpen(false);
                            }
                          }}
                        >
                          <span>{dropdownItem.name}</span>
                          {dropdownItem.hasSubmenu && (
                            <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${activeSubmenu === `${item.name}-${index}` ? 'rotate-180' : ''}`} />
                          )}
                        </button>

                        {/* Mobile Submenu */}
                        {dropdownItem.hasSubmenu && activeSubmenu === `${item.name}-${index}` && (
                          <div className="ml-4 mt-1 space-y-1 border-l-2 border-orange-100 pl-3">
                            {dropdownItem.submenu.map((submenuItem, subIndex) => (
                              <a
                                key={subIndex}
                                href={submenuItem.href}
                                className="block px-3 py-2 text-gray-500 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-colors text-xs"
                                onClick={() => setIsMobileMenuOpen(false)}
                              >
                                {submenuItem.name}
                              </a>
                            ))}
                          </div>
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