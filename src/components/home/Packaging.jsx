import { motion } from "motion/react";
import { useState } from "react";
import HeadSection from "../ui/HeadSection";

function Packaging() {
  const [countPackaging, setCountPackaging] = useState(4);
  const [showButton, setShowButton] = useState(true);

  const handleShowPackaging = () => {
    const newCount = countPackaging + 4;
    setCountPackaging(newCount);
    if (newCount >= 24) {
      setShowButton(false);
    }
  };

  const packagingImages = Array.from(
    { length: countPackaging },
    (_, index) => `/Packaging/v${index + 1}.webp`,
  );

  return (
    <section className="py-24 bg-(--background)">
      <div className="container mx-auto px-4">
        {/* Header */}
        <HeadSection text="التغليف"/>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {packagingImages.map((photo, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="group overflow-hidden rounded-3xl bg-(--secondary-bg) shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={photo}
                  alt={`تغليف ${index + 1}`}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Show More Button */}
        {showButton && (
          <div className="flex justify-center mt-12">
            <button
              onClick={handleShowPackaging}
              className="group relative px-10 py-4 text-xl font-medium rounded-2xl 
                         bg-(--primary-color) text-white overflow-hidden 
                         hover:bg-(--primary-color)/90 transition-all duration-300
                         flex items-center gap-3"
            >
              <span>عرض المزيد</span>
              <span className="group-hover:rotate-90 transition-transform duration-300">
                ↓
              </span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default Packaging;
