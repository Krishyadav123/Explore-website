import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, User } from 'lucide-react';

const BlogPage = () => {
  const blogPosts = [
    {
      id: 1,
      title: "Getting Started with React and TypeScript",
      description: "Learn how to set up a modern React project with TypeScript for better type safety and developer experience.",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop&crop=center",
      author: "Sarah Chen",
      date: "March 15, 2024",
      category: "Development",
      color: "bg-blue-500"
    },
    {
      id: 2,
      title: "Advanced CSS Grid Techniques",
      description: "Discover powerful CSS Grid layouts that will transform your web design workflow and create stunning responsive designs.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop&crop=center",
      author: "Mike Johnson",
      date: "March 12, 2024",
      category: "Design",
      color: "bg-green-500"
    },
    {
      id: 3,
      title: "Building Scalable APIs with Node.js",
      description: "Best practices for creating robust and scalable backend APIs using Node.js, Express, and modern architecture patterns.",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=250&fit=crop&crop=center",
      author: "Alex Rivera",
      date: "March 10, 2024",
      category: "Backend",
      color: "bg-orange-500"
    },
    {
      id: 4,
      title: "The Future of Web Development",
      description: "Exploring emerging trends in web development including WebAssembly, edge computing, and the next generation of frameworks.",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=250&fit=crop&crop=center",
      author: "Emma Davis",
      date: "March 8, 2024",
      category: "Technology",
      color: "bg-pink-500"
    },
    {
      id: 5,
      title: "Mastering Responsive Design",
      description: "Create beautiful, responsive websites that work perfectly across all devices using modern CSS techniques and best practices.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop&crop=center",
      author: "David Kim",
      date: "March 5, 2024",
      category: "Design",
      color: "bg-cyan-500"
    },
    {
      id: 6,
      title: "JavaScript Performance Optimization",
      description: "Learn essential techniques to optimize your JavaScript code for better performance and user experience in modern web applications.",
      image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400&h=250&fit=crop&crop=center",
      author: "Lisa Wang",
      date: "March 3, 2024",
      category: "Performance",
      color: "bg-yellow-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="text-center"
          >
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Our Latest Blog Posts
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover insights, tutorials, and stories from our community of developers and designers
            </p>
          </motion.div>
        </div>
      </div>

      {/* Blog Cards Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden border border-gray-200 hover:-translate-y-1"
            >
              {/* Image Container */}
              <div className="relative overflow-hidden h-48">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                
                {/* Category Badge */}
                <div className="absolute top-3 left-3">
                  <span className={`px-2 py-1 text-xs font-medium text-white rounded-lg ${post.color}`}>
                    {post.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                {/* Meta Information */}
                <div className="flex items-center text-sm text-gray-500 mb-3 space-x-3">
                  <div className="flex items-center space-x-1">
                    <User className="w-3 h-3" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-3 h-3" />
                    <span>{post.date}</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-200">
                  {post.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                  {post.description}
                </p>

                {/* Read More Button */}
                <button className="w-full bg-gray-900 hover:bg-gray-800 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center justify-center space-x-2 group/btn">
                  <span>Read More</span>
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform duration-200" />
                </button>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Load More Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center mt-12"
        >
          <button className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium transition-colors duration-200">
            Load More Posts
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default BlogPage;