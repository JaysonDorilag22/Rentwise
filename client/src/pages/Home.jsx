import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FiSearch, 
  FiMapPin, 
  FiTrendingUp, 
  FiUsers, 
  FiHome, 
  FiStar, 
  FiArrowRight,
  FiCheckCircle,
  FiPlay,
  FiShield,
  FiClock,
  FiThumbsUp
} from 'react-icons/fi';

const Home = () => {
  const features = [
    {
      icon: FiSearch,
      title: 'AI-Powered Search',
      description: 'Our intelligent search algorithm learns your preferences to show you the most relevant properties first.',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      icon: FiMapPin,
      title: 'Interactive Maps',
      description: 'Explore neighborhoods with detailed maps showing nearby amenities, transport, and safety ratings.',
      gradient: 'from-green-500 to-emerald-500',
    },
    {
      icon: FiTrendingUp,
      title: 'Real-Time Analytics',
      description: 'Get live market insights, price predictions, and investment opportunities in your area.',
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      icon: FiShield,
      title: 'Verified Listings',
      description: 'Every property is verified and every landlord is background-checked for your safety.',
      gradient: 'from-orange-500 to-red-500',
    },
  ];

  const stats = [
    { number: '10,000+', label: 'Active Properties', icon: FiHome },
    { number: '5,000+', label: 'Happy Tenants', icon: FiUsers },
    { number: '2,000+', label: 'Verified Landlords', icon: FiCheckCircle },
    { number: '50+', label: 'Cities Covered', icon: FiMapPin },
  ];

  const testimonials = [
    {
      name: 'Maria Santos',
      role: 'Software Engineer',
      avatar: 'MS',
      content: 'RentWise completely transformed my apartment hunting experience. Found my dream place in BGC within a week!',
      rating: 5,
      location: 'Bonifacio Global City'
    },
    {
      name: 'John Rodriguez',
      role: 'Property Investor',
      avatar: 'JR',
      content: 'As a landlord, the platform has helped me find quality tenants quickly. The verification process is thorough.',
      rating: 5,
      location: 'Makati City'
    },
    {
      name: 'Sarah Chen',
      role: 'University Student',
      avatar: 'SC',
      content: 'Perfect for students! Found an affordable bedspace near my university with all the amenities I needed.',
      rating: 5,
      location: 'Quezon City'
    },
  ];

  const steps = [
    {
      number: '01',
      title: 'Smart Search',
      description: 'Use our AI-powered filters to find properties that match your exact needs and budget.',
      icon: FiSearch,
    },
    {
      number: '02',
      title: 'Virtual Tours',
      description: 'Take immersive 360° virtual tours and video calls with landlords from anywhere.',
      icon: FiPlay,
    },
    {
      number: '03',
      title: 'Secure Booking',
      description: 'Book instantly with our secure payment system and digital contract signing.',
      icon: FiShield,
    },
  ];

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Hero Section - Modern Glass Effect */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-green-600 via-green-500 to-emerald-600">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-4 -left-4 w-72 h-72 bg-white/10 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute top-1/3 -right-4 w-72 h-72 bg-green-300/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-1/3 w-72 h-72 bg-emerald-300/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            {/* Modern Badge */}
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white mb-8 animate-fade-in">
              <FiThumbsUp className="w-4 h-4 mr-2" />
              <span className="text-sm font-medium">Trusted by 10,000+ users</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white leading-tight">
              Find Your
              <span className="block bg-gradient-to-r from-green-100 to-emerald-100 bg-clip-text text-transparent">
                Dream Home
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-10 text-green-50 max-w-3xl mx-auto leading-relaxed">
              Discover premium apartments, modern bedspaces, and luxury dorms across the Philippines. 
              Your perfect rental is just a click away.
            </p>

            {/* Modern CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/properties"
                className="group relative inline-flex items-center px-8 py-4 bg-white text-green-600 rounded-2xl font-semibold text-lg shadow-2xl hover:shadow-green-500/25 transition-all duration-300 hover:scale-105"
              >
                <FiSearch className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                Explore Properties
                <FiArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link
                to="/register"
                className="group inline-flex items-center px-8 py-4 bg-transparent border-2 border-white text-white rounded-2xl font-semibold text-lg hover:bg-white hover:text-green-600 transition-all duration-300"
              >
                <FiHome className="w-5 h-5 mr-2" />
                List Property
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="mt-12 flex items-center justify-center space-x-8 text-green-100">
              <div className="flex items-center">
                <FiCheckCircle className="w-5 h-5 mr-2" />
                <span className="text-sm">100% Verified</span>
              </div>
              <div className="flex items-center">
                <FiShield className="w-5 h-5 mr-2" />
                <span className="text-sm">Secure Platform</span>
              </div>
              <div className="flex items-center">
                <FiClock className="w-5 h-5 mr-2" />
                <span className="text-sm">24/7 Support</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section - Modern Cards */}
      <section className="py-20 bg-gray-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div 
                  key={index} 
                  className="bg-white rounded-3xl p-8 text-center shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
                  style={{animationDelay: `${index * 100}ms`}}
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-600 font-medium">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section - Modern Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-100 text-green-700 text-sm font-semibold mb-6">
              Why Choose RentWise
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Experience the Future of
              <span className="block bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Property Rental
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're revolutionizing how people find and rent properties with cutting-edge technology and user-centric design.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-green-200 hover:-translate-y-1"
                >
                  <div className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-green-600 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                  <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                    <FiArrowRight className="w-6 h-6 text-green-500" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works - Modern Timeline */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get started in minutes with our streamlined process
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="relative">
                  {/* Connection Line */}
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-green-300 to-emerald-300 z-0" 
                         style={{ width: 'calc(100% - 4rem)' }}>
                    </div>
                  )}
                  
                  <div className="relative z-10 text-center">
                    <div className="w-32 h-32 bg-gradient-to-br from-green-500 to-emerald-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl hover:scale-105 transition-transform duration-300">
                      <Icon className="w-12 h-12 text-white" />
                    </div>
                    <div className="bg-white rounded-2xl p-6 shadow-lg">
                      <div className="text-sm font-bold text-green-600 mb-2">{step.number}</div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">
                        {step.title}
                      </h3>
                      <p className="text-gray-600">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials - Modern Cards */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              What Our Users Say
            </h2>
            <p className="text-xl text-gray-600">
              Join thousands of satisfied users who found their perfect home
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-white to-gray-50 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-gray-100"
              >
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">{testimonial.name}</div>
                    <div className="text-gray-600 text-sm">{testimonial.role}</div>
                    <div className="text-green-600 text-sm">{testimonial.location}</div>
                  </div>
                </div>
                
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FiStar key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <p className="text-gray-600 leading-relaxed italic">
                  "{testimonial.content}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Modern Design */}
      <section className="py-24 bg-gradient-to-br from-green-600 via-green-500 to-emerald-600 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <div className="grid grid-cols-8 h-full">
              {[...Array(64)].map((_, i) => (
                <div key={i} className="border border-white/20"></div>
              ))}
            </div>
          </div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Find Your
            <span className="block">Perfect Home?</span>
          </h2>
          <p className="text-xl text-green-100 mb-10 max-w-2xl mx-auto">
            Join thousands of satisfied tenants and landlords who trust RentWise for their rental needs.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/properties"
              className="group inline-flex items-center px-8 py-4 bg-white text-green-600 rounded-2xl font-semibold text-lg shadow-2xl hover:shadow-white/25 transition-all duration-300 hover:scale-105"
            >
              <FiSearch className="w-5 h-5 mr-2" />
              Start Searching
              <FiArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link
              to="/register"
              className="inline-flex items-center px-8 py-4 bg-transparent border-2 border-white text-white rounded-2xl font-semibold text-lg hover:bg-white hover:text-green-600 transition-all duration-300"
            >
              <FiUsers className="w-5 h-5 mr-2" />
              Join Free
            </Link>
          </div>

          {/* Social Proof */}
          <div className="mt-12 text-green-100">
            <p className="text-sm">Trusted by 10,000+ users • 4.9/5 rating • 24/7 support</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;