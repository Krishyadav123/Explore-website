import React from "react";
import {
  MapPin,
  Phone,
  Mail,
  ExternalLink,
  Home,
  TrendingUp,
  Users,
  GraduationCap,
  Heart,
  Shield,
  ChevronUp,
} from "lucide-react";
import { Link } from "react-router-dom";
// import { Link } from "react-router-dom"; // ✅ React Router Link

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const usefulLinks = [
    { name: "About Us", href: "/about" },
    { name: "Our Service", href: "/services" },
    { name: "Contact us", href: "/contact" },
    { name: "MF Research", href: "/mf-research" },
    { name: "Commission Disclosures", href: "/commission-disclosures" },
    { name: "Privacy & Policy", href: "/privacy-policy" },
  ];

  const offerings = [
    { name: "Mutual Fund FAQ's", href: "/mutual-fund-faq" },
    { name: "NRI Corner FAQ's", href: "/nri-faq" },
    { name: "Financial Planning", href: "/financial-planning" },
    { name: "Calculators", href: "/calculators" },
  ];

  const goalPlanners = [
    { name: "Dream Home", icon: <Home className="w-4 h-4" />, href: "/dream-home" },
    { name: "Wealth Creation", icon: <TrendingUp className="w-4 h-4" />, href: "/wealth-creation" },
    { name: "Retirement", icon: <Users className="w-4 h-4" />, href: "/retirement" },
    { name: "Child Education", icon: <GraduationCap className="w-4 h-4" />, href: "/child-education" },
    { name: "Child Wedding", icon: <Heart className="w-4 h-4" />, href: "/child-wedding" },
    { name: "Emergency", icon: <Shield className="w-4 h-4" />, href: "/emergency" },
  ];

  return (
    <footer className="bg-gray-900 text-white relative">
      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-blue-600 hover:bg-blue-700 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-colors z-10"
      >
        <ChevronUp className="w-6 h-6" />
      </button>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
        <div className="flex flex-col lg:flex-row justify-between gap-10 w-full">
          {/* Company Info */}
          <div className="max-w-[400px] w-full space-y-6">
            <div>
              <h3 className="text-xl font-bold mb-4 text-blue-400">Address</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
                  <div className="text-gray-300">
                    <p>
                      Office No.-26, Kapil Complex, Basement, Mukhani,
                      Kaladhungi Road, Haldwani, Nainital, Uttarakhand
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-blue-400" />
                  <a
                    href="tel:+917500372237"
                    className="text-gray-300 hover:text-blue-400 transition-colors"
                  >
                    +91-7500372237
                  </a>
                </div>

                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-blue-400" />
                  <a
                    href="mailto:help@explore.com"
                    className="text-gray-300 hover:text-blue-400 transition-colors"
                  >
                    help@explore.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Useful Links / Offerings / Goal Planners */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full">
            {/* Useful Links */}
            <div>
              <h3 className="text-xl font-bold mb-6 text-blue-400">Useful Links</h3>
              <ul className="space-y-3">
                {usefulLinks.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-gray-300 hover:text-blue-400 transition-colors flex items-center group"
                    >
                      <span>{link.name}</span>
                      <ExternalLink className="w-3 h-3 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Our Offerings */}
            <div>
              <h3 className="text-xl font-bold mb-6 text-blue-400">Our Offerings</h3>
              <ul className="space-y-3">
                {offerings.map((offering, index) => (
                  <li key={index}>
                    <Link
                      to={offering.href}
                      className="text-gray-300 hover:text-blue-400 transition-colors flex items-center group"
                    >
                      <span>{offering.name}</span>
                      <ExternalLink className="w-3 h-3 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Goal Planners */}
            <div>
              <h3 className="text-xl font-bold mb-6 text-blue-400">Goal Planners</h3>
              <ul className="space-y-3">
                {goalPlanners.map((planner, index) => (
                  <li key={index}>
                    <Link
                      to={planner.href}
                      className="text-gray-300 hover:text-blue-400 transition-colors flex items-center group"
                    >
                      <span className="text-blue-400 mr-2">{planner.icon}</span>
                      <span>{planner.name}</span>
                      <ExternalLink className="w-3 h-3 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="bg-yellow-900/20 border border-yellow-600/30 rounded-lg p-4 my-8">
          <div className="flex items-start space-x-3">
            <Shield className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
            <p className="text-yellow-100 text-sm leading-relaxed">
              <strong>Investment Disclaimer:</strong> Mutual Fund investments are
              subject to market risks, read all scheme related documents carefully
              before investing.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-6">
          <div className="">
            <div className="text-sm text-center text-gray-400">
              © 2024 AlignMF4Yield Finserv Pvt. Ltd - All Rights Reserved
            </div>
           
          </div>
        </div>
      </div>

      {/* Background Decoration */}
      {/* <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500 rounded-full blur-3xl"></div>
      </div> */}
    </footer>
  );
};

export default Footer;
