import { FaBookOpen, FaGift, FaRegHeart, FaTruckMoving } from "react-icons/fa";
import { motion } from "motion/react";
const contentCards = [
  {
    icon: <FaBookOpen />,
    title: "جودة مختارة",
    content: ` نختار العناوين بعناية فائقة لنضمن
                لك تجربة قرائية ثرية`,
  },
  {
    icon: <FaTruckMoving />,
    title: "توصيل سريع",
    content: `نصل إليك أينما كنت في أسرع
                وقت ممكن`,
  },
  {
    icon: <FaGift />,
    title: "تغليف هدايا",
    content: `تغليف كلاسيكي يحاكي الماضي
                ويليق بمحبي الكتب`,
  },
  {
    icon: <FaRegHeart />,
    title: "دعم القراء",
    content: `فريقنا جاهز لمساعدتك دائماً في
        اختيار كتابك القادم`,
  },
];

function WhyChooseUs() {
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
            لماذا تختارنا؟
          </h2>
        </div>
        {/*=== head section ===*/}

        {/* cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {contentCards.map((card, index) => {
            return (
              <motion.div
                initial={{ opacity: 0, translateY: 20 }}
                whileInView={{ opacity: 1, translateY: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.3 }}
                key={index}
                className="text-center bg-(--secondary-bg)  p-8 rounded-xl hover:scale-105 transition-all duration-300"
              >
                <div className="w-fit mx-auto mb-1 text-2xl lg:text-3xl text-(--primary-color)">
                  {card.icon}
                </div>
                <h3 className="text-xl mb-2 font-semibold">{card.title}</h3>
                <p className="text-lg leading-6">{card.content}</p>
              </motion.div>
            );
          })}
        </div>

        {/*=== cards ===*/}
      </div>
    </section>
  );
}

export default WhyChooseUs;
