import { useState } from "react";
import AlertPopup from "../ui/AlertPopup";
import Logo from "../ui/Logo";
import {
  FaWhatsapp,
  FaLinkedinIn,
  FaGithub,
  FaArrowUp,
  FaGoogle,
  FaGlobe, // ✅ أيقونة الجيميل/جوجل
} from "react-icons/fa";

function Footer() {
  const currentYear = new Date().getFullYear();
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-(--secondary-bg)/60 text-gray-700">
      {/* 📦 القسم الرئيسي للفوتر */}
      <div className="py-12 md:py-16 border-b border-gray-200/60">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {/* 🏷️ قسم الشعار والوصف */}
          <div className="space-y-4">
            <Logo />
            <p className="text-sm md:text-base leading-7 text-gray-600 max-w-xs">
              نسعى في{" "}
              <span className="font-semibold text-(--primary-color)">
                بيت الكتاب
              </span>{" "}
              لربط القراء بالثقافة والمعرفة من خلال تجربة قرائية مميزة، مختارة
              بعناية لتلهم العقول وتغذي الأرواح.
            </p>
          </div>

          {/* 🔗 روابط سريعة */}
          <div>
            <h3 className="text-lg md:text-xl font-bold mb-5 text-(--primary-color) relative inline-block">
              روابط سريعة
              <span className="absolute -bottom-2 right-0 w-12 h-1 bg-(--primary-color)/30 rounded-full" />
            </h3>
            <ul className="space-y-3">
              {["من نحن", "اتصل بنا", "بطاقات الهدايا"].map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => setIsPopupOpen(true)}
                    className="group flex items-center gap-2 text-sm md:text-base font-medium text-gray-600 hover:text-(--primary-color) transition-all duration-300"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-(--primary-color)/40 group-hover:bg-(--primary-color) transition-colors" />
                    <span className="group-hover:translate-x-1 transition-transform">
                      {link}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* 🛟 الدعم السريع */}
          <div>
            <h3 className="text-lg md:text-xl font-bold mb-5 text-(--primary-color) relative inline-block">
              الدعم السريع
              <span className="absolute -bottom-2 right-0 w-12 h-1 bg-(--primary-color)/30 rounded-full" />
            </h3>
            <ul className="space-y-3">
              {[
                "الشحن والتواصل",
                "الاسترجاع والاستبدال",
                "الأسئلة الشائعة",
                "سياسة الخصوصية",
              ].map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => setIsPopupOpen(true)}
                    className="group flex items-center gap-2 text-sm md:text-base font-medium text-gray-600 hover:text-(--primary-color) transition-all duration-300"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-(--primary-color)/40 group-hover:bg-(--primary-color) transition-colors" />
                    <span className="group-hover:translate-x-1 transition-transform">
                      {link}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* 💬 تواصل معنا */}
          <div className="space-y-6">
            <h3 className="text-lg md:text-xl font-bold text-(--primary-color)">
              تواصل معنا
            </h3>

            {/* زر الواتساب */}
            <a
              href="https://chat.whatsapp.com/KVWWS9z5wYIEHG2ZYTlin5?mode=hqctcla"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 p-4 rounded-2xl bg-[#25D366]/10 hover:bg-[#25D366]/20 border-2 border-[#25D366]/30 hover:border-[#25D366] transition-all duration-300 w-fit"
            >
              <div className="w-14 h-14 rounded-2xl bg-[#25D366] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <FaWhatsapp className="text-3xl text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-gray-500">
                  انضم الي جروبنا عبر
                </span>
                <span className="text-lg font-bold text-[#25D366]">واتساب</span>
              </div>
            </a>

            {/* 🎯 روابط المطور - محدث مع الجيميل ✅ */}
            <div className="pt-4 border-t border-gray-200">
              <p className="text-xs text-gray-400 mb-3">تم التطوير بواسطة</p>

              {/* أيقونات المطور: جيميل + لينكدإن + جيت هاب */}
              <div className="flex items-center gap-3">
                {/* ✉️ Gmail */}
                <a
                  href="https://portfolio-695c6.web.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-3 rounded-xl bg-[#EA4335]/10 hover:bg-[#EA4335] text-[#EA4335] hover:text-white transition-all duration-300 shadow-sm hover:shadow-lg hover:-translate-y-1"
                  aria-label="زيارة موقعي"
                  title="موقعي الشخصي"
                >
                  <FaGlobe className="text-xl" />
                </a>

                {/* 💼 LinkedIn */}
                <a
                  href="https://www.linkedin.com/in/ahmed-mohamed-b54bb336a"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-3 rounded-xl bg-[#0A66C2]/10 hover:bg-[#0A66C2] text-[#0A66C2] hover:text-white transition-all duration-300 shadow-sm hover:shadow-lg hover:-translate-y-1"
                  aria-label="ملفي على LinkedIn"
                  title="ملفي على LinkedIn"
                >
                  <FaLinkedinIn className="text-xl" />
                </a>

                {/* 💻 GitHub */}
                <a
                  href="https://github.com/ahmed-muhamed-tech"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-3 rounded-xl bg-gray-800/10 hover:bg-gray-800 text-gray-700 hover:text-white transition-all duration-300 shadow-sm hover:shadow-lg hover:-translate-y-1"
                  aria-label="ملفي على GitHub"
                  title="ملفي على GitHub"
                >
                  <FaGithub className="text-xl" />
                </a>

                {/* اسم المطور */}
                <span className="text-sm font-semibold text-gray-700 mr-2">
                  Ahmed Mohamed
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ⚖️ شريط الحقوق في الأسفل */}
      <div className="py-4 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          {/* حقوق النشر */}
          <p className="text-center md:text-right">
            © {currentYear}{" "}
            <span className="font-semibold text-(--primary-color)">
              بيت الكتاب
            </span>
            . جميع الحقوق محفوظة.
          </p>

          {/* credit للمطور مع روابط */}
          <p className="flex items-center gap-2 text-center flex-wrap justify-center">
            <span>صُمم وبرمج بـ ❤️ بواسطة</span>
            <a
              href="https://www.linkedin.com/in/ahmed-mohamed-b54bb336a"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-(--primary-color) hover:text-(--primary-color)/80 transition-colors underline-offset-4 hover:underline"
            >
              Ahmed Mohamed
            </a>

            {/* أيقونات صغيرة بجانب الاسم في الشريط السفلي */}
            <span className="flex items-center gap-1 mr-2">
              <a
                href="https://portfolio-695c6.web.app/"
                target="_blank"
                className="text-[#EA4335] hover:scale-110 transition-transform"
                title="إيميل"
              >
                <FaGlobe className="text-xs" />
              </a>
              <a
                href="https://www.linkedin.com/in/ahmed-mohamed-b54bb336a"
                target="_blank"
                className="text-[#0A66C2] hover:scale-110 transition-transform"
                title="LinkedIn"
              >
                <FaLinkedinIn className="text-xs" />
              </a>
              <a
                href="https://github.com/ahmed-muhamed-tech"
                target="_blank"
                className="text-gray-700 hover:scale-110 transition-transform"
                title="GitHub"
              >
                <FaGithub className="text-xs" />
              </a>
            </span>
          </p>
        </div>
      </div>

      {/* ⬆️ زر الصعود للأعلى */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 left-6 p-3 bg-(--primary-color) text-white rounded-full shadow-xl hover:bg-(--primary-color)/90 hover:scale-110 transition-all duration-300 z-50 hidden md:flex items-center justify-center"
        aria-label="العودة للأعلى"
      >
        <FaArrowUp className="text-lg" />
      </button>
      <AlertPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        title="تنبيه: هام "
        message="هذه المعلومات لم تعمل بعد ستكون متوفرق قريبا..."
      />
    </footer>
  );
}

export default Footer;
