
import React from 'react';
import { Link } from 'react-router-dom';
import { Users, DollarSign, Receipt, Smartphone } from 'lucide-react';

export const LandingPage: React.FC = () => {
  const features = [
    {
      icon: Users,
      title: 'Group Management',
      description: 'Create groups with friends and manage shared expenses effortlessly'
    },
    {
      icon: DollarSign,
      title: 'Smart Splitting',
      description: 'Automatically calculate who owes what and settle up with ease'
    },
    {
      icon: Receipt,
      title: 'Expense Tracking',
      description: 'Keep track of all your shared expenses in one place'
    },
    {
      icon: Smartphone,
      title: 'Mobile Friendly',
      description: 'Access your expenses anywhere, anytime on any device'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-beige-50 via-warm-50 to-beige-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-beige-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-warm-500 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-warm-800">SplitGroup</h1>
            </div>
            
            <div className="flex space-x-4">
              <Link
                to="/login"
                className="px-6 py-2 text-warm-700 hover:text-warm-800 font-medium transition-colors"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-6 py-2 bg-warm-500 text-white rounded-lg hover:bg-warm-600 font-medium transition-all duration-200 shadow-mac hover:shadow-mac-hover"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold text-warm-800 mb-6 leading-tight">
            Split expenses with friends
            <span className="block text-warm-600">effortlessly</span>
          </h2>
          <p className="text-xl text-warm-600 mb-8 max-w-2xl mx-auto">
            Keep track of shared expenses, split bills, and settle up with friends. 
            No more awkward money conversations or forgotten IOUs.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="px-8 py-4 bg-warm-500 text-white rounded-lg hover:bg-warm-600 font-semibold text-lg transition-all duration-200 shadow-mac hover:shadow-mac-hover hover:scale-105"
            >
              Start Splitting Now
            </Link>
            <Link
              to="/login"
              className="px-8 py-4 bg-white text-warm-700 border-2 border-warm-200 rounded-lg hover:bg-beige-50 font-semibold text-lg transition-all duration-200 shadow-mac hover:shadow-mac-hover"
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl font-bold text-warm-800 text-center mb-12">
            Why Choose SplitGroup?
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="text-center p-6 bg-white rounded-xl shadow-mac hover:shadow-mac-hover transition-all duration-200 hover:hover:scale-105"
              >
                <div className="w-16 h-16 bg-warm-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-warm-500" />
                </div>
                <h4 className="text-xl font-semibold text-warm-800 mb-2">
                  {feature.title}
                </h4>
                <p className="text-warm-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl font-bold text-warm-800 mb-6">
            Ready to simplify your shared expenses?
          </h3>
          <p className="text-lg text-warm-600 mb-8">
            Join thousands of users who trust SplitGroup to manage their shared finances.
          </p>
          <Link
            to="/register"
            className="inline-block px-8 py-4 bg-warm-500 text-white rounded-lg hover:bg-warm-600 font-semibold text-lg transition-all duration-200 shadow-mac hover:shadow-mac-hover hover:scale-105"
          >
            Get Started for Free
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-warm-800 text-white py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-warm-500 rounded-full flex items-center justify-center">
              <Users className="w-5 h-5 text-white" />
            </div>
            <h4 className="text-xl font-bold">SplitGroup</h4>
          </div>
          <p className="text-warm-200">
            © 2024 SplitGroup. Split expenses with friends effortlessly.
          </p>
        </div>
      </footer>
    </div>
  );
};
