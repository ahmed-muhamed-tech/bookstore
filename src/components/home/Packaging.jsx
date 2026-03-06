import { motion } from "motion/react";
import { useState } from "react";

function Packaging() {
  const [countPackaging, setCountPackaging] = useState(4);
  const [showButton, setShowBotton] = useState(true);
  const handleShowPackaging = () => {
    const count = countPackaging + 4;
    setCountPackaging(count);
    if (count >= 24) {
      setShowBotton(false);
    }
  };

  const packaging = () => {
    return Array.from(
      { length: countPackaging },
      (_, index) => `/Packaging/v${index + 1}.webp`,
    );
  };

  return (
    <section className="py-24">
      <div className="container">
        {/* head section */}
        <div className="mb-18">
          <h2
            className="w-fit text-2xl lg:text-4xl mx-auto relative 
            before:content-[''] before:absolute before:-bottom-2 
            before:bg-(--head-sec-color) before:h-1 before:w-[70%] 
            before:transform before:-translate-x-1/2 before:left-1/2
            text-(--head-sec-color)"
          >
            التغليف؟
          </h2>
        </div>
        {/*=== head section ===*/}

        {/* cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {packaging().map((photo, index) => (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              key={index}
              className="p-4 bg-(--secondary-bg) rounded-2xl"
            >
              <img
                src={photo}
                alt="photo"
                loading="lazy"
                className="rounded-2xl object-cover h-full w-full"
              />
            </motion.div>
          ))}
        </div>

        {/* Show More */}
        {showButton && (
          <button
            onClick={handleShowPackaging}
            className=" w-fit py-2 px-6 text-xl lg:text-2xl bg-(--primary-color)/50 hover:font-semibold rounded-md mx-auto block mt-8 text-gray-800 transition-all duration-300"
          >
            عرض اكثر
          </button>
        )}
        {/*=== Show More ===*/}

        {/*=== cards ===*/}
      </div>
    </section>
  );
}

export default Packaging;
