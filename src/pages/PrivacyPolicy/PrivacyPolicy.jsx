import React from 'react';
import { Shield, Users, Lock, Eye, Mail, FileText } from 'lucide-react';
import Footer from '@/component/Footer';
import Navbar from '@/component/Navbar';

const PrivacyPolicy = () => {
  return (
    <>  
    <Navbar/>
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Shield className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Privacy Policy</h1>
          </div>
          <p className="text-gray-600 text-center text-lg">
            Your privacy and data protection are our top priorities at Explore
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="bg-white rounded-lg shadow-sm border p-8 space-y-8">
          
          {/* Privacy Commitment */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Users className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-semibold text-gray-900">Our Privacy Commitment</h2>
            </div>
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
              <p className="text-gray-700 leading-relaxed">
                The User's right to privacy is of paramount importance to Explore. Any information provided by the users will not be shared with any third party. Explore reserves the right to use the information to provide the User a more personalized online experience.
              </p>
            </div>
            <p className="text-gray-700 leading-relaxed mt-4">
              In general, you can visit without telling us who you are and without revealing any information about yourself. At times, however, we may need more information from you.
            </p>
          </section>

          {/* Information Sharing */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Lock className="w-6 h-6 text-green-600" />
              <h2 className="text-2xl font-semibold text-gray-900">Information Sharing Policy</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              Explore does not rent, sell, or share personal information about you with other people or non-affiliated companies except to provide products or services you've requested, when we have your permission, or under the following circumstances:
            </p>
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-3">Trusted Partners</h3>
              <p className="text-gray-700 leading-relaxed">
                We provide the information to trusted partners who work on behalf of or with Explore under extremely strict confidentiality agreements. These companies may use your personal information to help Explore communicate with you about product & service offerings from Explore and our marketing partners. However, these companies do not have any independent right to share this information.
              </p>
            </div>
          </section>

          {/* Cookies Policy */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Eye className="w-6 h-6 text-purple-600" />
              <h2 className="text-2xl font-semibold text-gray-900">Cookie Usage</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-3">Purpose</h3>
                <p className="text-gray-700 leading-relaxed">
                  Explore may use browser based cookies primarily for the purpose of identifying you on subsequent visits to our website. At times, information from cookies may also be used to customize the services for you.
                </p>
              </div>
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-3">Important Note</h3>
                <p className="text-gray-700 leading-relaxed">
                  Please note that should you disable your browser from accepting cookies, some information or services may not be accessible to you.
                </p>
              </div>
            </div>
          </section>

          {/* Legal Compliance */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <FileText className="w-6 h-6 text-red-600" />
              <h2 className="text-2xl font-semibold text-gray-900">Legal Compliance & Data Protection</h2>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <p className="text-gray-700 leading-relaxed mb-4">
                <strong>Court Orders:</strong> Unless required by court of law we do not reveal any information pertaining to the user or your usage data.
              </p>
              <p className="text-gray-700 leading-relaxed">
                <strong>Data Safety:</strong> Explore does not take any responsibility for correctness and safety of the user data. But we would take due care to maintain the safety and integrity of data.
              </p>
            </div>
          </section>

          {/* Age Policy */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Users className="w-6 h-6 text-indigo-600" />
              <h2 className="text-2xl font-semibold text-gray-900">Age Policy & Financial Literacy</h2>
            </div>
            <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-6">
              <p className="text-gray-700 leading-relaxed mb-4">
                We do not block access to users of any age as we expect that financial literacy has to be an integral part of one's life and in our endeavor to spread its awareness, users may need to go through articles/knowledge/blogs sections published on this website.
              </p>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
                <p className="text-gray-700 leading-relaxed">
                  <strong>Parental Guidance:</strong> We believe that users under 15 years of age would have permission from their parents/guardian before using any information published on this website. Also the users need to check up local country laws and regulation on accessing financial awareness/literacy websites before accessing Explore.
                </p>
              </div>
            </div>
          </section>

          {/* User Registration & Communication */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Mail className="w-6 h-6 text-teal-600" />
              <h2 className="text-2xl font-semibold text-gray-900">User Registration & Communication</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-teal-50 border border-teal-200 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-3">Registered Users</h3>
                <p className="text-gray-700 leading-relaxed">
                  Registered users are the ones who willfully provide us their user details like name, contact no., email id's and other demographics etc.
                </p>
              </div>
              <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-3">Communication Methods</h3>
                <p className="text-gray-700 leading-relaxed">
                  We would normally be communicating with registered users of the site through email, telephone and mailers etc. but from time to time we may have to communicate with the other users as well.
                </p>
              </div>
            </div>
          </section>

          {/* Data Correction */}
          <section>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-3">Data Correction</h3>
              <p className="text-gray-700 leading-relaxed">
                Any incorrect data may be reported to us for correction.
              </p>
            </div>
          </section>

          {/* Policy Updates */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <FileText className="w-6 h-6 text-amber-600" />
              <h2 className="text-2xl font-semibold text-gray-900">Policy Updates</h2>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
              <p className="text-gray-700 leading-relaxed">
                We update our privacy policy from time to time as we keep on adding more products, services & features to our website to spread financial literacy. Please visit this page regularly to view the latest details on privacy policy.
              </p>
            </div>
          </section>

        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <p className="text-gray-600">
              Last updated: {new Date().toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
            <p className="text-gray-500 text-sm mt-2">
              If you have any questions about this Privacy Policy, please contact us.
            </p>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default PrivacyPolicy;