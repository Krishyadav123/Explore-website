import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  User, 
  MessageCircle, 
  Send, 
  CheckCircle, 
  Clock,
  Shield,
  Users,
  ArrowRight
} from 'lucide-react';

const CallbackSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState('');

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const features = [
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Quick Response",
      description: "We'll get back to you within 24 hours"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Secure & Private",
      description: "Your information is completely secure with us"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Expert Guidance",
      description: "Connect with our certified financial advisors"
    }
  ];

  if (isSubmitted) {
    return (
      <div className="bg-gray-900 py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="bg-green-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">Thank You!</h2>
          <p className="text-xl text-gray-300 mb-8">
            Your request has been submitted successfully. Our team will contact you within 24 hours.
          </p>
          <button 
            onClick={() => setIsSubmitted(false)}
            className="text-blue-400 hover:text-blue-300 font-medium"
          >
            Submit Another Request
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 md:gap-16 items-center">
          
          {/* Left Content */}
          <div className="text-white">
            <h2 className="text-3xl lg:text-5xl font-bold mb-6">
              Request A <span className="text-blue-400">Call Back</span>.
            </h2>
            <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed">
              Ready to take the next step in your financial journey? Our expert advisors are here to help you achieve your goals with personalized guidance and proven strategies.
            </p>

            {/* Features */}
            <div className="space-y-6 mb-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="bg-blue-600 rounded-lg p-3 flex-shrink-0">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">{feature.title}</h3>
                    <p className="text-gray-400">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Stats */}
            {/* <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-800">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400 mb-1">10K+</div>
                <div className="text-sm text-gray-400">Happy Clients</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400 mb-1">₹500Cr+</div>
                <div className="text-sm text-gray-400">Assets Managed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400 mb-1">15+</div>
                <div className="text-sm text-gray-400">Years Experience</div>
              </div>
            </div> */}
          </div>

          {/* Right Content - Form */}
          <div className="bg-white rounded-2xl p-4 md:p-6 shadow-2xl">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">How Can We Help?</h3>
              <p className="text-gray-600">Fill out the form below and we'll get back to you soon</p>
            </div>

            <div className="space-y-4">
              {/* Name Field */}
              <div className="relative">
                <div className={`absolute left-4 top-1/2 transform -translate-y-1/2 transition-colors ${
                  focusedField === 'name' ? 'text-blue-500' : 'text-gray-400'
                }`}>
                  <User className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter Your Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField('')}
                  className={`w-full pl-12 pr-4 py-2 border-2 placeholder:text-sm rounded-lg focus:outline-none transition-colors ${
                    focusedField === 'name' 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 bg-gray-50 focus:border-blue-500 focus:bg-blue-50'
                  }`}
                  required
                />
              </div>

              {/* Email Field */}
              <div className="relative">
                <div className={`absolute left-4 top-1/2 transform -translate-y-1/2 transition-colors ${
                  focusedField === 'email' ? 'text-blue-500' : 'text-gray-400'
                }`}>
                  <Mail className="w-5 h-5" />
                </div>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter Your Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField('')}
                  className={`w-full pl-12 pr-4 py-2 border-2 placeholder:text-sm rounded-lg focus:outline-none transition-colors ${
                    focusedField === 'email' 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 bg-gray-50 focus:border-blue-500 focus:bg-blue-50'
                  }`}
                  required
                />
              </div>

              {/* Phone Field */}
              <div className="relative">
                <div className={`absolute left-4 top-1/2 transform -translate-y-1/2 transition-colors ${
                  focusedField === 'phone' ? 'text-blue-500' : 'text-gray-400'
                }`}>
                  <Phone className="w-5 h-5" />
                </div>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Enter Your Phone Number"
                  value={formData.phone}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField('phone')}
                  onBlur={() => setFocusedField('')}
                  className={`w-full pl-12 pr-4 py-2 border-2 placeholder:text-sm rounded-lg focus:outline-none transition-colors ${
                    focusedField === 'phone' 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 bg-gray-50 focus:border-blue-500 focus:bg-blue-50'
                  }`}
                  required
                />
              </div>

              {/* Message Field */}
              <div className="relative">
                <div className={`absolute left-4 top-3 transition-colors ${
                  focusedField === 'message' ? 'text-blue-500' : 'text-gray-400'
                }`}>
                  <MessageCircle className="w-5 h-5" />
                </div>
                <textarea
                  name="message"
                  placeholder="Tell us about your financial goals or questions..."
                  value={formData.message}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField('message')}
                  onBlur={() => setFocusedField('')}
                  rows="4"
                  className={`w-full pl-12 pr-4 py-2 border-2 rounded-lg focus:outline-none transition-colors resize-none ${
                    focusedField === 'message' 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 bg-gray-50 focus:border-blue-500 focus:bg-blue-50'
                  }`}
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-lg font-medium transition-all duration-300 flex items-center justify-center space-x-2 group shadow-lg hover:shadow-xl"
              >
                <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                <span className="text-sm">Send Your Message</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Privacy Note */}
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-500">
                🔒 Your information is secure and will never be shared with third parties
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallbackSection;