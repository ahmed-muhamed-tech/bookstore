import React, { useContext, useEffect, useRef, useState } from "react";
import { FaEye, FaEyeSlash, FaGoogle, FaFacebook } from "react-icons/fa";
import { MdOutlineEmail, MdOutlineLockReset } from "react-icons/md";
import { RiLockPasswordLine, RiUserSmileLine } from "react-icons/ri";
import { motion } from "framer-motion"; // اختياري للأنيميشن

import { authUserContext } from "../contexts/AuthUserContext";

function Login() {
  const { login, isLoading, error } = useContext(authUserContext); // تأكد من وجود isLoading و error في الـ Context
  const emailRef = useRef(null);
  const [showPass, setShowPass] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  const [dataAuth, setDataAuth] = useState({
    email: "",
    password: "",
  });

  // التحقق من صحة البيانات
  const validateForm = () => {
    const errors = {};
    if (!dataAuth.email) {
      errors.email = "البريد الإلكتروني مطلوب";
    } else if (!/\S+@\S+\.\S+/.test(dataAuth.email)) {
      errors.email = "صيغة البريد الإلكتروني غير صحيحة";
    }
    if (!dataAuth.password) {
      errors.password = "كلمة المرور مطلوبة";
    } else if (dataAuth.password.length < 6) {
      errors.password = "كلمة المرور يجب أن تكون 6 أحرف على الأقل";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleFormData = (e) => {
    const { name, value } = e.target;
    setDataAuth({ ...dataAuth, [name]: value });
    // مسح الخطأ عند الكتابة
    if (formErrors[name]) {
      setFormErrors({ ...formErrors, [name]: "" });
    }
  };

  const handleSendDataToSupabase = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    await login(dataAuth.email, dataAuth.password, rememberMe);
  };

  useEffect(() => {
    emailRef?.current?.focus();
  }, []);

  // متغيرات للأنيميشن (اختياري)
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center py-12 px-4 overflow-hidden">
      
      {/* 🎨 خلفية زخرفية */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-(--primary-color)/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-(--secondary-bg)/50 rounded-full blur-3xl" />
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-md"
      >
        {/* 🪪 بطاقة التسجيل */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 md:p-10">
          
          {/* 👋 الرأس */}
          <div className="text-center mb-8 space-y-2">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-linear-to-br from-(--primary-color) to-(--primary-color)/70 text-white mb-4 shadow-lg">
              <RiUserSmileLine className="text-3xl" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-(--text-primary)">
              أهلاً بعودتك! 👋
            </h2>
            <p className="text-gray-500 text-sm md:text-base">
              سجل الدخول لمتابعة رحلتك مع الكتب
            </p>
          </div>

          {/* ⚠️ رسالة الخطأ */}
          {(error || formErrors.submit) && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm flex items-center gap-2"
            >
              <span>⚠️</span>
              <span>{error || "حدث خطأ أثناء تسجيل الدخول"}</span>
            </motion.div>
          )}

          {/* 📝 النموذج */}
          <form onSubmit={handleSendDataToSupabase} className="space-y-5">
            
            {/* حقل البريد */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                البريد الإلكتروني
              </label>
              <div className={`relative flex items-center rounded-2xl border-2 transition-all duration-300 ${
                formErrors.email 
                  ? "border-red-300 bg-red-50/50" 
                  : "border-gray-200 focus-within:border-(--primary-color) focus-within:bg-(--primary-color)/5"
              }`}>
                <MdOutlineEmail className={`mx-4 text-xl ${formErrors.email ? "text-red-400" : "text-gray-400"}`} />
                <input
                  ref={emailRef}
                  name="email"
                  type="email"
                  id="email"
                  placeholder="name@example.com"
                  autoComplete="email"
                  className={`w-full py-4 pr-2 outline-none bg-transparent text-gray-800 placeholder-gray-400 ${
                    formErrors.email ? "text-red-600" : ""
                  }`}
                  value={dataAuth.email}
                  onChange={handleFormData}
                  aria-invalid={!!formErrors.email}
                  aria-describedby={formErrors.email ? "email-error" : undefined}
                />
              </div>
              {formErrors.email && (
                <p id="email-error" className="text-red-500 text-xs mt-1 flex items-center gap-1">
                  <span>•</span> {formErrors.email}
                </p>
              )}
            </div>

            {/* حقل كلمة المرور */}
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                كلمة المرور
              </label>
              <div className={`relative flex items-center rounded-2xl border-2 transition-all duration-300 ${
                formErrors.password 
                  ? "border-red-300 bg-red-50/50" 
                  : "border-gray-200 focus-within:border-(--primary-color) focus-within:bg-(--primary-color)/5"
              }`}>
                <RiLockPasswordLine className={`mx-4 text-xl ${formErrors.password ? "text-red-400" : "text-gray-400"}`} />
                <input
                  type={showPass ? "text" : "password"}
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  autoComplete="current-password"
                  className={`w-full py-4 pr-2 outline-none bg-transparent text-gray-800 placeholder-gray-400 ${
                    formErrors.password ? "text-red-600" : ""
                  }`}
                  value={dataAuth.password}
                  onChange={handleFormData}
                  aria-invalid={!!formErrors.password}
                  aria-describedby={formErrors.password ? "password-error" : undefined}
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="mx-3 text-gray-400 hover:text-(--primary-color) transition-colors p-1"
                  aria-label={showPass ? "إخفاء كلمة المرور" : "إظهار كلمة المرور"}
                >
                  {showPass ? <FaEyeSlash className="text-lg" /> : <FaEye className="text-lg" />}
                </button>
              </div>
              {formErrors.password && (
                <p id="password-error" className="text-red-500 text-xs mt-1 flex items-center gap-1">
                  <span>•</span> {formErrors.password}
                </p>
              )}
            </div>

            {/* خيارات إضافية */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 text-(--primary-color) focus:ring-(--primary-color) cursor-pointer"
                />
                <span className="text-gray-600 group-hover:text-gray-800 transition-colors">تذكرني</span>
              </label>
              <button 
                type="button"
                className="text-(--primary-color) hover:text-(--primary-color)/80 font-medium flex items-center gap-1 transition-colors"
              >
                <MdOutlineLockReset />
                <span>نسيت كلمة المرور؟</span>
              </button>
            </div>

            {/* زر الدخول */}
            <button
              type="submit"
              disabled={isLoading}
              className="group w-full py-4 px-6 bg-linear-to-r from-(--primary-color) to-(--primary-color)/90 hover:from-(--primary-color)/90 hover:to-(--primary-color) text-white font-bold rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3 text-lg"
            >
              {isLoading ? (
                <>
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>جاري التسجيل...</span>
                </>
              ) : (
                <>
                  <span>تسجيل الدخول</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </>
              )}
            </button>
          </form>

          
       
        </div>

        {/* 🔒 ملاحظة أمان */}
        <p className="text-center text-gray-400 text-xs mt-6 flex items-center justify-center gap-1">
          <span>🔒</span>
          <span>بياناتك مشفرة ومحمية بأعلى معايير الأمان</span>
        </p>
      </motion.div>
    </section>
  );
}

export default Login;