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
  Smartphone,
} from "lucide-react";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const usefulLinks = [
    { name: "About Us", href: "#" },
    { name: "Our Service", href: "#" },
    { name: "Contact us", href: "#" },
    { name: "MF Research", href: "#" },
    { name: "Commission Disclosures", href: "#" },
    { name: "Privacy & Policy", href: "#" },
  ];

  const offerings = [
    { name: "Mutual Fund FAQ's", href: "#" },
    { name: "NRI Corner FAQ's", href: "#" },
    { name: "Financial Planning", href: "#" },
    { name: "Calculators", href: "#" },
  ];

  const goalPlanners = [
    { name: "Dream Home", icon: <Home className="w-4 h-4" />, href: "#" },
    {
      name: "Wealth Creation",
      icon: <TrendingUp className="w-4 h-4" />,
      href: "#",
    },
    { name: "Retirement", icon: <Users className="w-4 h-4" />, href: "#" },
    {
      name: "Child Education",
      icon: <GraduationCap className="w-4 h-4" />,
      href: "#",
    },
    { name: "Child Wedding", icon: <Heart className="w-4 h-4" />, href: "#" },
    { name: "Emergency", icon: <Shield className="w-4 h-4" />, href: "#" },
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
        <div className="flex justify-between w-full">
          {/* Company Info */}
          <div className="max-w-[400px] w-full space-y-6">
            <div className="">
              <h3 className="text-xl font-bold mb-4 text-blue-400">Address</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
                  <div className="text-gray-300">
                    <p>Ploutia Finserv Pvt. Ltd.,</p>
                    <p>Udyambag, Belagavi,</p>
                    <p>Karnataka - 590008</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-blue-400" />
                  <a
                    href="tel:+918147049936"
                    className="text-gray-300 hover:text-blue-400 transition-colors"
                  >
                    +91-8147049936
                  </a>
                </div>

                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-blue-400" />
                  <a
                    href="mailto:contact@ploutia.com"
                    className="text-gray-300 hover:text-blue-400 transition-colors"
                  >
                    contact@ploutia.com
                  </a>
                </div>
              </div>
            </div>

            {/* App Download */}
            {/* <div>
              <h4 className="font-semibold mb-3 text-gray-200">
                Download Our App
              </h4>
              <a
                href="#"
                className="inline-flex items-center bg-gray-800 hover:bg-gray-700 rounded-lg px-4 py-2 transition-colors group"
              >
                <Smartphone className="w-6 h-6 text-green-400 mr-3" />
                <div>
                  <div className="text-xs text-gray-400">GET IT ON</div>
                  <div className="text-sm font-semibold">Google Play</div>
                </div>
                <ExternalLink className="w-4 h-4 ml-2 text-gray-400 group-hover:text-blue-400" />
              </a>
            </div> */}
          </div>

          {/* Useful Links */}
          <div className="grid grid-cols-3 w-full">
            <div>
              <h3 className="text-xl font-bold mb-6 text-blue-400">
                Useful Links
              </h3>
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
              <h3 className="text-xl font-bold mb-6 text-blue-400">
                Our Offerings
              </h3>
              <ul className="space-y-3">
                {offerings.map((offering, index) => (
                  <li key={index}>
                    <a
                      href={offering.href}
                      className="text-gray-300 hover:text-blue-400 transition-colors flex items-center group"
                    >
                      <span>{offering.name}</span>
                      <ExternalLink className="w-3 h-3 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Goal Planners */}
            <div>
              <h3 className="text-xl font-bold mb-6 text-blue-400">
                Goal Planners
              </h3>
              <ul className="space-y-3">
                {goalPlanners.map((planner, index) => (
                  <li key={index}>
                    <a
                      href={planner.href}
                      className="text-gray-300 hover:text-blue-400 transition-colors flex items-center group"
                    >
                      <span className="text-blue-400 mr-2">{planner.icon}</span>
                      <span>{planner.name}</span>
                      <ExternalLink className="w-3 h-3 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* AMFI Certification */}
        <div className="border-t border-gray-800 mt-5 pt-8 mb-8">
          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-start space-x-4">
              <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <div className="text-white font-bold text-sm">AMFI</div>
              </div>
              <div>
                <h4 className="font-semibold text-green-400 mb-2">
                  AMFI Certified Distributor
                </h4>
                <p className="text-gray-300 text-sm leading-relaxed">
                  AMFI (Association of Mutual Funds in India) Certified Mutual
                  Fund Distributor. ARN-304099.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="bg-yellow-900/20 border border-yellow-600/30 rounded-lg p-4 mb-8">
          <div className="flex items-start space-x-3">
            <Shield className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
            <p className="text-yellow-100 text-sm leading-relaxed">
              <strong>Investment Disclaimer:</strong> Mutual Fund investments
              are subject to market risks, read all scheme related documents
              carefully before investing.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-400">
              © 2024 Ploutia Finserv Pvt. Ltd - All Rights Reserved
            </div>
            <div className="text-sm text-gray-400">
              Designed and Developed by{" "}
              <a
                href="#"
                className="text-blue-400 hover:text-blue-300 transition-colors font-medium"
              >
                Advisorkraj.com
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Background Decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500 rounded-full blur-3xl"></div>
      </div>
    </footer>
  );
};

export default Footer;
