import React from 'react';
import { Link } from 'react-router-dom';
import { Brain, Twitter, Github, Linkedin, Mail, Heart, Users, Shield, Gift } from 'lucide-react';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-2">
              <Brain className="w-8 h-8 text-purple-600" />
              <span className="text-xl font-bold text-gray-900">ZEITGEIST</span>
            </div>
            <p className="text-gray-600">
              Evolving consciousness through technology and community.
            </p>
            <div className="flex space-x-4">
              <a href="https://twitter.com" className="text-gray-400 hover:text-purple-600">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="https://github.com" className="text-gray-400 hover:text-purple-600">
                <Github className="w-5 h-5" />
              </a>
              <a href="https://linkedin.com" className="text-gray-400 hover:text-purple-600">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h3 className="text-gray-900 font-semibold mb-4">Platform</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/learn" className="text-gray-600 hover:text-purple-600">
                  Learning Center
                </Link>
              </li>
              <li>
                <Link to="/marketplace" className="text-gray-600 hover:text-purple-600">
                  Marketplace
                </Link>
              </li>
              <li>
                <Link to="/impact" className="text-gray-600 hover:text-purple-600">
                  Impact Dashboard
                </Link>
              </li>
              <li>
                <Link to="/social" className="text-gray-600 hover:text-purple-600">
                  Community
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-gray-900 font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/docs" className="text-gray-600 hover:text-purple-600">
                  Documentation
                </Link>
              </li>
              <li>
                <Link to="/guides" className="text-gray-600 hover:text-purple-600">
                  Guides
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-600 hover:text-purple-600">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/support" className="text-gray-600 hover:text-purple-600">
                  Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Governance & Collaboration */}
          <div>
            <h3 className="text-gray-900 font-semibold mb-4">Participate</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/governance" className="text-gray-600 hover:text-purple-600 flex items-center space-x-2">
                  <Shield className="w-4 h-4" />
                  <span>Governance</span>
                </Link>
              </li>
              <li>
                <Link to="/collaborate" className="text-gray-600 hover:text-purple-600 flex items-center space-x-2">
                  <Users className="w-4 h-4" />
                  <span>Collaborate</span>
                </Link>
              </li>
              <li>
                <Link to="/referral" className="text-gray-600 hover:text-purple-600 flex items-center space-x-2">
                  <Gift className="w-4 h-4" />
                  <span>Referral Program</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-1 text-gray-600">
              <span>© {currentYear} ZEITGEIST. Made with</span>
              <Heart className="w-4 h-4 text-red-500" />
              <span>for consciousness evolution.</span>
            </div>
            <div className="flex space-x-6 text-sm">
              <Link to="/privacy" className="text-gray-600 hover:text-purple-600">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-600 hover:text-purple-600">
                Terms of Service
              </Link>
              <Link to="/cookies" className="text-gray-600 hover:text-purple-600">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;