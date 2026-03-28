import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaMapMarkerAlt,
  FaWhatsapp,
} from "react-icons/fa";
import { motion } from "motion/react";
import AlertPopup from "../ui/AlertPopup";

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
  "/bg_hero/v1.webp",
  "/bg_hero/v2.webp",
  "/bg_hero/v3.webp",
  "/bg_hero/v4.webp",
  "/bg_hero/v5.webp",
  "/bg_hero/v6.webp",
  "/bg_hero/v7.webp",
  "/bg_hero/v8.webp",
  "/bg_hero/v9.webp",
];

function Hero() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
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
      className="animate-wiggle rounded-3xl w-[95%] mx-auto overflow-hidden mt-12 h-[calc(100vh-200px)] bg-no-repeat bg-center bg-cover relative before:absolute before:content-[] before:bg-linear-to-t before:from-gray-950/80 before:via-gray-900/50 before:to-gray-900/30 before:inset-0 before:h-full before:w-full"
    >
      {/* Decorative top border glow */}
      <div className="absolute top-0 inset-x-0 h-full w-full bg-linear-to-r from-transparent   backdrop-blur-sm  to-transparent z-10" />

      <div className="container relative z-10 text-gray-100 h-full flex justify-center items-center px-4">
        <div className="text-center max-w-3xl mx-auto">
          {/* Welcome badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 mb-4"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs text-white/80 tracking-widest">
              اهلا بكم في
            </span>
          </motion.div>

          {/* Main title */}
          <motion.h1
            initial={{ translateY: -40, opacity: 0 }}
            animate={{ translateY: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-4xl lg:text-6xl font-bold tracking-tight drop-shadow-lg"
          >
            بيت الكتاب
            <span className="block text-2xl lg:text-3xl font-medium text-white/70 mt-1 tracking-widest">
              الفيوم
            </span>
          </motion.h1>

          {/* Decorative divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="w-24 h-px bg-linear-to-r from-transparent via-white/60 to-transparent mx-auto mt-5"
          />

          {/* Quote */}
          <p className="w-[90%] md:w-[85%] lg:w-[75%] mx-auto text-sm lg:text-base mt-6 leading-9 text-white/85 font-light">
            {quotes[getRandomArbitrary(0, quotes.length)]
              .split("")
              .map((char, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.03 * index }}
                >
                  {char}
                </motion.span>
              ))}
          </p>

          {/* Social icons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex justify-center gap-3 mt-8"
          >
            {[
              {
                href: "https://wa.me/201018197768",
                icon: <FaWhatsapp />,
                label: "WhatsApp",
              },
              {
                href: "https://www.facebook.com/share/14NZ6AuQHcu/",
                icon: <FaFacebookF />,
                label: "Facebook",
              },
              {
                href: "https://www.instagram.com/beetelketab?igsh=a2xydW54eW9sMmpi",
                icon: <FaInstagram />,
                label: "Instagram",
              },
              {
                href: "https://maps.app.goo.gl/eCjvXVxCkhLs1xJr9?g_st=com.google.maps.preview.copy",
                icon: <FaMapMarkerAlt />,
                label: "Location",
              },
            ].map(({ href, icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="group w-10 h-10 md:w-11 md:h-11 lg:w-12 lg:h-12 rounded-xl flex justify-center items-center bg-white/10 hover:bg-(--primary-color) border border-white/15 hover:border-transparent backdrop-blur-sm transition-all duration-300 text-lg md:text-xl lg:text-2xl shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                {icon}
              </a>
            ))}
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-8 flex flex-wrap gap-3 justify-center"
          >
            <Link
              to="/books"
              className="group relative inline-flex items-center gap-2 py-3 px-8 text-sm lg:text-base font-medium rounded-2xl bg-white text-(--primary-color) hover:bg-(--primary-color) hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl overflow-hidden"
            >
              <span className="relative z-10">استكشف الكتب</span>
              <span className="relative z-10 text-lg">←</span>
            </Link>

            <button
              onClick={() => setIsPopupOpen(true)}
              className="group relative inline-flex items-center gap-2 py-3 px-8 text-sm lg:text-base font-medium rounded-2xl bg-white text-(--primary-color) hover:bg-(--primary-color) hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl overflow-hidden"
            >
              <span className="relative z-10">تصفح العروض</span>
              <span className="relative z-10 text-lg">←</span>
            </button>
          </motion.div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 inset-x-0 h-20 bg-linear-to-t from-gray-950/60 to-transparent pointer-events-none" />
      <AlertPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        title="تنبيه: هام "
        message="هذه الاضافه لم تعمل بعد ستكون متوفرق قريبا..."
      />
    </motion.div>
  );
}

export default Hero;
