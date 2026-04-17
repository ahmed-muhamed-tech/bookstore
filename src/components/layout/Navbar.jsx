import React, { useContext, useState } from "react";
import { FiMenu } from "react-icons/fi";
import { motion, AnimatePresence } from "motion/react";
import Logo from "../ui/Logo";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { IoCloseSharp } from "react-icons/io5";
import { authUserContext } from "../../contexts/AuthUserContext";
import ConfirmModal from "../ui/ConfirmModal";
import Loading from "../ui/Loading";
import { MdOutlineShoppingCart } from "react-icons/md";
import { itemsCartContext } from "../../contexts/itemsCartContext";
import { supabase } from "../../utils/supabaseClient";
import { IoIosSearch } from "react-icons/io";
import { toast } from "react-toastify";

function Navbar() {
  const [isOpenNavLinks, setIsOpenNavLinks] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const { user, logout, isLoading } = useContext(authUserContext);
  const { countItems } = useContext(itemsCartContext);
  const [textSearch, setTextSearch] = useState("");

  const navigate = useNavigate();

  // current book for search
  const goToBook = async (e) => {
    e.preventDefault();
    const bookTitle = textSearch.trim();
    if (!bookTitle) return;

    try {
      const { data, error } = await supabase
        .from("books")
        .select("id, title, is_available")
        .ilike("title", `%${bookTitle}%`)
        .eq("is_available", true)
        .maybeSingle();

      if (error) throw error;

      if (data) {
        navigate(`/detailsBook/${data.id}`);
        setTextSearch("");
        setIsOpenNavLinks(false);
      } else {
        toast.error("هذا الكتاب غير موجود");
      }
    } catch (error) {
      console.error("Error fetching book:", error.message);
      return null;
    }
  };

  if (isLoading) return <Loading />;

  return (
    <>
      <nav className="h-18 flex items-center justify-between relative z-50">
        <div className="container flex items-center justify-between">
          <div className="flex gap-12 items-center">
            {/* Logo */}
            <Logo />

            {/* Nav Links - Desktop */}
            <div className="items-center gap-1 text-lg lg:text-xl hidden lg:flex">
              {[
                { to: "", label: "الرئيسيه" },
                { to: "/books", label: "الكتب" },
                { to: "/shopping", label: "المشتريات" },
                ...(user?.isAdmin
                  ? [{ to: "/dashboard", label: "لوحه التحكم" }]
                  : []),
              ].map(({ to, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  className={({ isActive }) =>
                    `py-2 px-5 rounded-xl text-base font-medium transition-all duration-300
                    hover:bg-(--primary-color) hover:text-white
                    ${
                      isActive
                        ? "bg-(--primary-color) text-white shadow-md"
                        : "text-gray-700 hover:shadow-md"
                    }`
                  }
                >
                  {label}
                </NavLink>
              ))}
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <div className="flex items-center gap-2 border border-(--primary-color) rounded-2xl text-sm lg:text-lg p-1 lg:p-2">
              <IoIosSearch />
              <input
                type="search"
                className=" outline-none flex-1"
                value={textSearch}
                onChange={(e) => setTextSearch(e.target.value)}
              />
              <button onClick={goToBook} className="  text-(--primary-color)">
                بحث
              </button>
            </div>

            {/* Auth Button - Desktop */}
            <div className=" items-center gap-6 flex">
              {user?.email ? (
                <button
                  onClick={() => setOpenModal(true)}
                  className="py-2 px-5 text-sm font-medium border border-red-400 text-red-500 rounded-xl hover:bg-red-500 hover:text-white hover:border-transparent hover:shadow-lg transition-all duration-300"
                >
                  تسجيل الخروج
                </button>
              ) : (
                <Link
                  to="/login"
                  className="py-2 px-5 text-sm font-medium bg-(--primary-color) text-white rounded-xl hover:opacity-90 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                >
                  تسجيل الدخول
                </Link>
              )}

              {/* Cart */}
              <div className="relative text-2xl w-12 h-12 flex justify-center items-center">
                <MdOutlineShoppingCart />
                <span className="absolute top-0 -right-1 text-sm font-semibold text-(--primary-color)">
                  {countItems}
                </span>
              </div>
            </div>
          </div>

          {/* Hamburger - Mobile */}
          <div className="flex items-center lg:hidden ">
            <motion.button
              initial={false}
              animate={{ rotate: isOpenNavLinks ? 90 : 0 }}
              transition={{ duration: 0.25 }}
              className="text-2xl cursor-pointer p-2 rounded-xl hover:bg-gray-100 transition-colors duration-200"
              onClick={() => setIsOpenNavLinks(!isOpenNavLinks)}
              aria-label="Toggle menu"
            >
              {isOpenNavLinks ? <IoCloseSharp /> : <FiMenu />}
            </motion.button>
            {/* Cart */}
            <div className="relative text-2xl w-12 h-12 flex justify-center items-center">
              <MdOutlineShoppingCart />
              <span className="absolute top-0 -right-1 text-sm font-semibold text-(--primary-color)">
                {countItems}
              </span>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpenNavLinks && (
            <motion.div
              key="mobile-menu"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="absolute top-full w-full left-0 z-50 lg:hidden"
            >
              {/* Glass card */}
              <div className="mx-3 mt-1 rounded-2xl bg-white/80 backdrop-blur-xl border border-white/60 shadow-2xl overflow-hidden">
                <div className="container py-4">
                  {/* Search */}
                  <div className="flex items-center justify-between gap-2 border border-(--primary-color) rounded-2xl text-sm lg:text-lg p-1 lg:p-2 mb-4">
                    <IoIosSearch />
                    <input
                      type="search"
                      className=" outline-none flex-1"
                      value={textSearch}
                      onChange={(e) => setTextSearch(e.target.value)}
                    />
                    <button
                      onClick={goToBook}
                      className="  text-(--primary-color)"
                    >
                      بحث
                    </button>
                  </div>

                  {/* Nav Links */}
                  <div className="flex flex-col gap-1 mb-4">
                    {[
                      { to: "", label: "الرئيسيه" },
                      { to: "/books", label: "الكتب" },
                      { to: "/shopping", label: "المشتريات" },
                      ...(user?.isAdmin
                        ? [{ to: "/dashboard", label: "لوحه التحكم" }]
                        : []),
                    ].map(({ to, label }) => (
                      <NavLink
                        key={to}
                        to={to}
                        className={({ isActive }) =>
                          `w-full text-start py-3 px-4 rounded-xl font-medium transition-all duration-200
                          ${
                            isActive
                              ? "bg-(--primary-color) text-white shadow-sm"
                              : "text-gray-700 hover:bg-(--primary-color)/10 hover:text-(--primary-color)"
                          }`
                        }
                        onClick={() => setIsOpenNavLinks(false)}
                      >
                        {label}
                      </NavLink>
                    ))}
                  </div>

                  {/* Divider */}
                  <div className="h-px bg-gray-200 mb-4" />

                  {/* Auth Button */}
                  {user?.email ? (
                    <button
                      onClick={() => setOpenModal(true)}
                      className="w-full py-2.5 px-4 text-sm font-medium border border-red-400 text-red-500 rounded-xl hover:bg-red-500 hover:text-white hover:border-transparent transition-all duration-300"
                    >
                      تسجيل الخروج
                    </button>
                  ) : (
                    <Link
                      to="/login"
                      className="block w-full text-center py-2.5 px-4 text-sm font-medium bg-(--primary-color) text-white rounded-xl hover:opacity-90 transition-all duration-300"
                      onClick={() => setIsOpenNavLinks(false)}
                    >
                      تسجيل الدخول
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Confirm Modal */}
      <ConfirmModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        onConfirm={logout}
        title="تسجيل الخروج"
        message="هل أنت متأكد أنك تريد تسجيل الخروج؟"
      />
    </>
  );
}

export default Navbar;
