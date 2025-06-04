import React, { useRef } from 'react';
import { FaFacebookF, FaInstagram, FaSnapchatGhost, FaTwitter } from 'react-icons/fa';
import { motion, useInView } from 'framer-motion';

const Footer = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: '-100px' });

  const socialIcons = [
    { icon: <FaFacebookF />, name: 'Facebook' },
    { icon: <FaInstagram />, name: 'Instagram' },
    { icon: <FaSnapchatGhost />, name: 'Snapchat' },
    { icon: <FaTwitter />, name: 'Twitter' },
  ];

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.6,
        ease: 'easeOut'
      }
    })
  };

  return (
    <footer ref={ref} className="bg-gradient-to-r from-red-700 to-red-900 text-white py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-8">
        {/* Logo Section */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={0}
        >
          <div className="flex items-center mb-3">
            <img className="h-10 mr-2" src="title image (1).png" alt="logo" />
            <h1 className="text-2xl font-semibold">Bibliothic</h1>
          </div>
          <p className="text-sm font-medium text-white">Your favorite hub for book lovers.</p>
        </motion.div>

        {/* Footer Links */}
        {[
          { title: 'Project', links: ['New Arrivals', 'Book Reviews', 'Library Updates', 'Reading Challenges'] },
          { title: 'Community', links: ['Goodreads Club', 'Discussions', 'Book Swaps', 'Twitter'] },
          { title: 'Help', links: ['FAQs', 'Report an Issue', 'Contact Us'] }
        ].map((section, i) => (
          <motion.div
            key={section.title}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            custom={i + 1}
          >
            <h3 className="font-semibold text-lg mb-3">{section.title}</h3>
            <ul className="space-y-2 text-white">
              {section.links.map((link, idx) => (
                <li
                  key={idx}
                  className="hover:translate-x-2 transition-transform cursor-pointer"
                >
                  {link}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}

        {/* Others & Social */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={4}
          className="space-y-6"
        >
          <div>
            <h3 className="font-semibold text-lg mb-3">Others</h3>
            <ul className="space-y-2 text-white">
              <li className="hover:underline cursor-pointer">Terms of Service</li>
              <li className="hover:underline cursor-pointer">Privacy Policy</li>
              <li className="hover:underline cursor-pointer">Library Rules</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-3">Follow Us</h3>
            <div className="flex gap-4">
              {socialIcons.map((item) => (
                <motion.div
                  key={item.name}
                  whileHover={{ scale: 1.2 }}
                  className="relative group cursor-pointer"
                >
                  {item.icon}
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white text-black text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    {item.name}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Text */}
      <motion.p
        className="text-xl font-semibold text-center mt-10"
        variants={fadeUp}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        custom={5}
      >
        &copy; 2025 Bibliothic — Made with 🤍 for book lovers
      </motion.p>
    </footer>
  );
};

export default Footer;
