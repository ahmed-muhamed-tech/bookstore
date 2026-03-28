import { FaBookOpen, FaGift, FaRegHeart, FaTruckMoving } from "react-icons/fa";
import { motion } from "motion/react";

const contentCards = [
  {
    icon: <FaBookOpen />,
    title: "جودة مختارة",
    content: `نختار العناوين بعناية فائقة لنضمن لك تجربة قرائية ثرية`,
  },
  {
    icon: <FaTruckMoving />,
    title: "توصيل سريع",
    content: `نصل إليك أينما كنت في أسرع وقت ممكن`,
  },
  {
    icon: <FaGift />,
    title: "تغليف هدايا",
    content: `تغليف كلاسيكي يحاكي الماضي ويليق بمحبي الكتب`,
  },
  {
    icon: <FaRegHeart />,
    title: "دعم القراء",
    content: `فريقنا جاهز لمساعدتك دائماً في اختيار كتابك القادم`,
  },
];

function WhyChooseUs() {
  return (
    <section className="py-24">
      <div className="container">
        {/* Head */}
        <div className="mb-16 text-center">
          <p className="text-sm tracking-widest text-(--primary-color) uppercase mb-2 opacity-70">
            ما يميزنا
          </p>
          <h2
            className="text-2xl lg:text-4xl font-bold text-(--head-sec-color) relative inline-block
            after:content-[''] after:absolute after:-bottom-3 after:left-1/2 after:-translate-x-1/2
            after:w-16 after:h-1 after:rounded-full after:bg-(--head-sec-color)"
          >
            لماذا تختارنا؟
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {contentCards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: 0.1 * index,
                duration: 0.4,
                ease: "easeOut",
              }}
              className="group relative text-center bg-(--secondary-bg) p-8 rounded-2xl
                border border-transparent hover:border-(--primary-color)/20
                hover:shadow-xl hover:-translate-y-1
                transition-all duration-300 overflow-hidden"
            >
              {/* Subtle glow on hover */}
              <div
                className="absolute inset-0 bg-linear-to-b from-(--primary-color)/5 to-transparent 
                opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"
              />

              {/* Icon circle */}
              <div
                className="relative w-14 h-14 mx-auto mb-5 rounded-2xl bg-(--primary-color)/10
                flex items-center justify-center text-2xl text-(--primary-color)
                group-hover:bg-(--primary-color) group-hover:text-white
                transition-all duration-300 shadow-sm"
              >
                {card.icon}
              </div>

              <h3 className="text-lg font-bold mb-2 text-(--head-sec-color)">
                {card.title}
              </h3>

              <p className="text-sm leading-7 text-gray-500">{card.content}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhyChooseUs;
