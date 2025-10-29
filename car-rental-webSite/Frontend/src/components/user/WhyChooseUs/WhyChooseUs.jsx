import { motion } from "framer-motion";
import { ThumbsUp, Shield, Crown, RefreshCcw, MapPin, User } from "lucide-react";

export default function WhyChooseUs() {
  const features = [
    {
      icon: <ThumbsUp className="w-10 h-10 text-teal-600 dark:text-teal-400" />,
      title: "Easy Rent",
      desc: "Book a ride in just a few steps and get instant confirmation.",
    },
    {
      icon: <Crown className="w-10 h-10 text-teal-600 dark:text-teal-400" />,
      title: "Premium Quality",
      desc: "Top-quality vehicles maintained regularly for your comfort.",
    },
    {
      icon: <User className="w-10 h-10 text-teal-600 dark:text-teal-400" />,
      title: "Professional Drivers",
      desc: "Trained and certified drivers ensuring your safe journey.",
    },
    {
      icon: <Shield className="w-10 h-10 text-teal-600 dark:text-teal-400" />,
      title: "Car Safety",
      desc: "Equipped with safety kits and advanced GPS tracking.",
    },
    {
      icon: <RefreshCcw className="w-10 h-10 text-teal-600 dark:text-teal-400" />,
      title: "Easy Refunds",
      desc: "Hassle-free refunds with a transparent cancellation policy.",
    },
    {
      icon: <MapPin className="w-10 h-10 text-teal-600 dark:text-teal-400" />,
      title: "Live Monitoring",
      desc: "Track rides in real-time with our GPS-integrated system.",
    },
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" },
    }),
  };

  return (
    <section className="relative bg-gradient-to-br from-sky-50 via-white to-teal-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 py-20 overflow-hidden transition-colors duration-500">
      {/* decorative glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-teal-200/30 dark:bg-teal-700/20 blur-3xl rounded-full"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-sky-200/30 dark:bg-cyan-800/20 blur-3xl rounded-full"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 relative z-10 text-center">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-extrabold text-gray-800 dark:text-white mb-4"
        >
          Why Choose <span className="text-teal-600 dark:text-teal-400">Us</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          viewport={{ once: true }}
          className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto mb-12"
        >
          We go beyond just renting — we ensure satisfaction, safety, and convenience
          for every customer.
        </motion.p>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {features.map((item, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="relative bg-white/70 dark:bg-gray-800/80 backdrop-blur-xl 
                border border-teal-100 dark:border-gray-700 rounded-2xl p-8 
                shadow-md hover:shadow-xl hover:-translate-y-2 
                transition-all duration-300"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-teal-100/40 dark:from-teal-800/30 to-transparent opacity-0 hover:opacity-100 transition duration-500"></div>
              <div className="relative z-10 text-left">
                <div className="mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
