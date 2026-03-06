import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaMapMarkerAlt,
  FaWhatsapp,
} from "react-icons/fa";
import { motion } from "motion/react";
const quotes = [
  "في بيت الكتاب، لا تدخل لتقرأ فقط، بل تدخل لتسافر بين عوالم لا يحدها زمان ولا مكان، حيث تحملك الصفحات إلى قصص تُلهم روحك وتوقظ خيالك وتمنحك لحظات من التأمل العميق.",

  "هنا بين الرفوف المتراصة، تختبئ حكايات أجيال مضت، وأفكار عقول أبدعت، وكلمات كُتبت لتبقى، فتجد نفسك جزءًا من رحلة إنسانية ممتدة عبر القرون.",

  "بيت الكتاب ليس مجرد مكتبة صامتة، بل مساحة نابضة بالحياة، تتنفس فيها المعرفة، وتتجدد فيها الأحلام، ويجد فيها كل قارئ صوته الخاص بين السطور.",

  "كل كتاب هنا هو نافذة مفتوحة على عالم مختلف؛ تارةً يعلمك، وتارةً يواسيك، وأحيانًا يغير في داخلك شيئًا لم تكن تعلم أنك بحاجة إلى تغييره.",

  "عندما تجلس في زاوية هادئة من بيت الكتاب، وتبدأ في تقليب الصفحات، تشعر وكأن الزمن يبطئ خطواته، وكأن العالم الخارجي يتلاشى تاركًا لك مساحة خالصة للفكر والتأمل.",

  "بين هذه الجدران، تتلاقى الفلسفة مع الأدب، والتاريخ مع الخيال، فتتشكل لوحة معرفية متكاملة تمنحك فهمًا أعمق للحياة والناس والذات.",

  "الكتب هنا ليست أوراقًا مجلدة فحسب، بل أرواح محفوظة بعناية، تنتظر من يفتحها ليُعيد إليها الحياة ويمنحها فرصة لتؤثر من جديد.",

  "في بيت الكتاب، لا تُقاس القيمة بعدد الصفحات، بل بعمق الأثر الذي تتركه الكلمات في قلب القارئ وعقله، وبالأسئلة التي توقظها داخله.",

  "كل رف يحمل كنزًا مختلفًا؛ روايات تشدك إلى عوالم خيالية، وكتب فكر توسع مداركك، وسير ذاتية تلهمك لتكتب قصتك الخاصة بشجاعة.",

  "حين تعتاد زيارة بيت الكتاب، تدرك أن القراءة ليست هواية عابرة، بل أسلوب حياة يثري روحك ويصقل شخصيتك ويمنحك نظرة أكثر اتزانًا ووعيًا تجاه العالم.",
];

const bg = [
  "/bg_hero/v1.jfif",
  "/bg_hero/v2.jfif",
  "/bg_hero/v3.jfif",
  "/bg_hero/v4.jfif",
  "/bg_hero/v5.jfif",
  "/bg_hero/v6.jfif",
  "/bg_hero/v7.jfif",
  "/bg_hero/v8.jfif",
  "/bg_hero/v9.jfif",
];

function Hero() {
  function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  return (
    <motion.div
      initial={{ opacity: 0.6 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      style={{
        backgroundImage: `url(${bg[getRandomArbitrary(0, 9)]})`,
      }}
      className={`animate-wiggle rounded-2xl w-[95%] mx-auto overflow-hidden mt-12 h-[calc(100vh-200px)] bg-no-repeat bg-center bg-cover relative before:absolute before:content-[] before:bg-gray-900/50 before:backdrop-blur-xs before:inset-0 before:h-full before:w-full`}
    >
      <div className="container relative z-10 text-gray-200 h-full flex justify-center items-center">
        <div className="text-center">
          <motion.h3
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6 }}
            className="text-xs mb-1"
          >
            اهلا بكم في
          </motion.h3>
          <motion.h1
            initial={{ translateY: -200 }}
            animate={{ translateY: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl lg:text-6xl font-semibold"
          >
            بيت الكتب
          </motion.h1>

          <p className="w-[90%] md:w-[85%] lg:w-[60%] mx-auto text-sm lg:text-lg mt-6 leading-8">
            {quotes[getRandomArbitrary(0, quotes.length)]
              .split("")
              .map((char, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 * index }}
                >
                  {char}
                </motion.span>
              ))}
          </p>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6 }}
            className="flex justify-center gap-4 mt-4"
          >
            <a
              href="https://chat.whatsapp.com/KVWWS9z5wYIEHG2ZYTlin5?mode=hqctcla"
              target="_blanck"
              className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 rounded-md flex justify-center items-center  bg-(--primary-color)/60 hover:bg-(--primary-color)/40 transition-all duration-300 text-xl md:text-2xl lg:text-3xl"
            >
              <FaWhatsapp />
            </a>
            <a
              href="https://www.facebook.com/share/14NZ6AuQHcu/"
              target="_blanck"
              className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 rounded-md flex justify-center items-center  bg-(--primary-color)/60 hover:bg-(--primary-color)/40 transition-all duration-300 text-xl md:text-2xl lg:text-3xl"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://www.instagram.com/beetelketab?igsh=a2xydW54eW9sMmpi"
              target="_blanck"
              className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 rounded-md flex justify-center items-center  bg-(--primary-color)/60 hover:bg-(--primary-color)/40 transition-all duration-300 text-xl md:text-2xl lg:text-3xl"
            >
              <FaInstagram />
            </a>
            <a
              href=" https://maps.app.goo.gl/eCjvXVxCkhLs1xJr9?g_st=com.google.maps.preview.copy"
              target="_blanck"
              className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 rounded-md flex justify-center items-center  bg-(--primary-color)/60 hover:bg-(--primary-color)/40 transition-all duration-300 text-xl md:text-2xl lg:text-3xl"
            >
              <FaMapMarkerAlt />
            </a>
          </motion.div>

          <div className="mt-8 flex justify-center gap-4 flex-col lg:flex-row">
            <motion.button
              initial={{ translateX: 200 }}
              animate={{ translateX: 0 }}
              transition={{ duration: 0.6 }}
              className="py-2 px-3 lg:py-3 lg:px-6 text-sm lg:text-xl bg-gray-300 text-(--primary-color) rounded-2xl hover:bg-(--primary-color) hover:text-gray-300 transition-all duration-300"
            >
              استكشف الكتب
            </motion.button>
            <motion.button
              initial={{ translateX: -200 }}
              animate={{ translateX: 0 }}
              transition={{ duration: 0.6 }}
              className="py-2 px-3 lg:py-3 lg:px-6 text-sm lg:text-xl bg-(--secondary-bg) rounded-2xl hover:bg-(--primary-color) transition-all duration-300"
            >
              تصفح العروض
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default Hero;
