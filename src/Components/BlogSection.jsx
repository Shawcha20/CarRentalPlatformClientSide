import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowRight, BookOpen } from 'lucide-react';

export default function BlogSection() {
  const [hoveredCard, setHoveredCard] = useState(null);

  const blogs = [
    {
      id: 1,
      title: 'Top 10 Road Trip Destinations You Must Explore',
      excerpt:
        'Discover the most scenic routes and breathtaking destinations perfect for your next adventure with a rental car.',
      image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=500&h=300&fit=crop',
      author: 'Sarah Johnson',
      date: 'Jan 4, 2024',
      category: 'Travel Tips',
      readTime: '5 min read'
    },
    {
      id: 2,
      title: 'Essential Car Maintenance Tips Before a Long Journey',
      excerpt:
        'Learn the crucial steps to take before embarking on a long road trip to ensure safety and comfort.',
      image: 'https://images.unsplash.com/photo-1487754180144-351b8f186d3f?w=500&h=300&fit=crop',
      author: 'Mike Chen',
      date: 'Jan 2, 2024',
      category: 'Maintenance',
      readTime: '7 min read'
    },
    {
      id: 3,
      title: 'How to Get the Best Deal on Car Rentals',
      excerpt:
        'Expert strategies to help you save money on car rentals without compromising on quality or comfort.',
      image: 'https://images.unsplash.com/photo-1554224311-beee415c201e?w=500&h=300&fit=crop',
      author: 'Emily Rodriguez',
      date: 'Dec 30, 2023',
      category: 'Money Saving',
      readTime: '6 min read'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <BookOpen size={24} className="text-primary" />
            <span className="text-primary font-semibold">BLOG & INSIGHTS</span>
          </div>
          <h2 className="text-4xl text-black font-bold mb-4">
            Latest Articles & <span className="text-primary">Travel Tips</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Stay informed with our latest articles on travel guides, car maintenance tips, and money-saving strategies
          </p>
        </motion.div>

        {/* Blog Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
        >
          {blogs.map((blog, index) => (
            <motion.div
              key={blog.id}
              variants={cardVariants}
              onMouseEnter={() => setHoveredCard(blog.id)}
              onMouseLeave={() => setHoveredCard(null)}
              className="bg-white rounded-lg overflow-hidden border border-gray-200 hover:border-primary transition-all duration-300 hover:shadow-xl group"
            >
              {/* Image Container */}
              <div className="relative overflow-hidden h-48 bg-gray-300">
                <motion.img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover"
                  animate={{
                    scale: hoveredCard === blog.id ? 1.1 : 1
                  }}
                  transition={{ duration: 0.3 }}
                />
                {/* Category Badge */}
                <div className="absolute top-4 left-4 bg-primary text-white px-3 py-1 rounded-full text-xs font-semibold">
                  {blog.category}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Title */}
                <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-primary transition-colors line-clamp-2">
                  {blog.title}
                </h3>

                {/* Excerpt */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {blog.excerpt}
                </p>

                {/* Meta Info */}
                <div className="flex flex-wrap gap-3 text-xs text-gray-500 mb-4 pb-4 border-b border-gray-200">
                  <div className="flex items-center gap-1">
                    <User size={14} />
                    <span>{blog.author}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar size={14} />
                    <span>{blog.date}</span>
                  </div>
                  <span>{blog.readTime}</span>
                </div>

                {/* Read More Button */}
                <motion.button
                  whileHover={{ x: 5 }}
                  className="text-primary font-semibold flex items-center gap-2 hover:gap-3 transition-all"
                >
                  Read More
                  <ArrowRight size={16} />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center"
        >
          <button className="px-8 py-3 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary hover:text-white transition-all duration-300">
            View All Articles
          </button>
        </motion.div>
      </div>
    </section>
  );
}
