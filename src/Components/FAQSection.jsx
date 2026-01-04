import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export default function FAQSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const faqs = [
    {
      id: 1,
      question: 'How do I book a car?',
      answer:
        'Simply browse our available cars on the Browse Cars page, select your desired vehicle, choose your rental dates, and proceed to checkout. You can also filter by car type, price, and availability to find the perfect match for your needs.'
    },
    {
      id: 2,
      question: 'What documents do I need to rent a car?',
      answer:
        "You'll need a valid driver's license, proof of identity (passport or national ID), and a valid credit card for the security deposit. International renters should bring an International Driving Permit (IDP) along with their original license."
    },
    {
      id: 3,
      question: 'What is your cancellation policy?',
      answer:
        'We offer free cancellation up to 48 hours before your rental starts. Cancellations made within 48 hours may incur a charge. In case of emergency, please contact our support team for assistance.'
    },
    {
      id: 4,
      question: 'Is there a minimum age requirement?',
      answer:
        'Yes, drivers must be at least 21 years old to rent a car. Some premium vehicles may require drivers to be 25 or older. Valid driving experience of at least 1 year is also required.'
    },
    {
      id: 5,
      question: 'What about insurance coverage?',
      answer:
        'All our vehicles come with basic comprehensive insurance coverage. You can opt for additional coverage options like full insurance protection, theft protection, or damage waiver for extra peace of mind during your rental period.'
    },
    {
      id: 6,
      question: 'Can I modify or extend my booking?',
      answer:
        'Yes, you can extend your rental period anytime, subject to vehicle availability. Modifications can be made through your account dashboard or by contacting our customer support team. Any price adjustments will be calculated based on current rates.'
    },
    {
      id: 7,
      question: 'What is included in the rental price?',
      answer:
        'The rental price includes the vehicle, basic insurance, roadside assistance, and unlimited mileage. It does not include fuel, tolls, or parking charges. Additional services like GPS, child seats, or extra drivers incur additional fees.'
    },
    {
      id: 8,
      question: 'How do I list my car for rental?',
      answer:
        'Go to the "Add Car" section in your account and provide vehicle details, photos, pricing, and availability. Our team will verify your information, and your car will appear in our listings within 24-48 hours.'
    }
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? -1 : index);
  };

  return (
    <section className="py-16 bg-gradient-to-b from-white rounded-2xl to-gray-50">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-black mb-4">
            Frequently Asked <span className="text-primary">Questions</span>
          </h2>
          <p className="text-gray-600 text-lg">
            Find answers to common questions about our car rental service
          </p>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 bg-white hover:bg-gray-50 transition flex items-center justify-between"
              >
                <span className="text-lg font-semibold text-gray-800 text-left">
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: activeIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown
                    size={24}
                    className="text-primary flex-shrink-0 ml-4"
                  />
                </motion.div>
              </button>

              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{
                  height: activeIndex === index ? 'auto' : 0,
                  opacity: activeIndex === index ? 1 : 0
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden bg-gray-50"
              >
                <p className="px-6 py-4 text-gray-700 leading-relaxed">
                  {faq.answer}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Footer CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 p-8 bg-primary/10 rounded-lg text-center border border-primary/20"
        >
          <h3 className="text-2xl font-bold mb-3 text-gray-800">
            Still have questions?
          </h3>
          <p className="text-gray-600 mb-4">
            Our customer support team is here to help. Reach out to us anytime!
          </p>
          <button className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-lg font-semibold transition">
            Contact Support
          </button>
        </motion.div>
      </div>
    </section>
  );
}
