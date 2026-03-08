import React, { useContext, useState } from "react";
import { FiMenu } from "react-icons/fi";
import { motion } from "motion/react";
import Logo from "../ui/Logo";
import { Link, NavLink } from "react-router-dom";
import { IoCloseSharp } from "react-icons/io5";
import { authUserContext } from "../../contexts/AuthUserContext";
import ConfirmModal from "../ui/ConfirmModal";
import Loading from "../ui/Loading";

function Navbar() {
  const [isOpenNavLinks, setIsOpenNavLinks] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const { user, logout, isLoading } = useContext(authUserContext);

  if (isLoading) return <Loading />;

  return (
    <nav
      className="h-18 flex items-center justify-between relative
    "
    >
      <div className="container flex items-center justify-between">
        <div className="flex gap-12 items-center">
          {/* Logo */}
          <Logo />
          {/*=== Logo ===*/}

          {/* Nav Link */}
          <div className="items-center gap-4 text-lg lg:text-xl hidden lg:flex">
            <NavLink
              to=""
              className={({ isActive }) =>
                `py-3 px-4 rounded-md transition-all duration-300 
                  hover:bg-(--primary-color) hover:text-gray-200
                  ${isActive ? "bg-(--primary-color) text-gray-200" : ""}`
              }
            >
              الرئيسيه
            </NavLink>
            <NavLink
              to="/books"
              className={({ isActive }) =>
                `py-3 px-4 rounded-md transition-all duration-300 
                  hover:bg-(--primary-color) hover:text-gray-200
                  ${isActive ? "bg-(--primary-color) text-gray-200" : ""}`
              }
            >
              الكتب
            </NavLink>
            {user?.isAdmin  && (
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `py-3 px-4 rounded-md transition-all duration-300 
                  hover:bg-(--primary-color) hover:text-gray-200
                  ${isActive ? "bg-(--primary-color) text-gray-200" : ""}`
                }
              >
                لوحه التحكم
              </NavLink>
            )}
          </div>
          {/*=== Nav Link ===*/}
        </div>

        {/* Buttons & search icon */}
        <div className="hidden items-center gap-6 lg:flex">
          <div>
            {user?.email && (
              <button
                onClick={() => setOpenModal(true)}
                className="py-1 px-4 border-red-500 border text-center w-full text-gray-800 hover:bg-red-500 hover:text-gray-200 text-xl rounded-md cursor-pointer hover:scale-95 transition-all duration-300"
              >
                تسجيل الخروج
              </button>
            )}
            {!user?.email && (
              <Link
                to="/login"
                className="py-1 px-4 bg-(--primary-color) text-gray-200 text-xl rounded-md cursor-pointer hover:scale-95 transition-all duration-300"
              >
                تسجيل الدخول
              </Link>
            )}
          </div>
        </div>
        {/*=== Buttons & search icon ===*/}

        {/* Show just in phone */}
        <>
          {/* Menu */}
          <motion.div
            initial={false}
            animate={{ scale: isOpenNavLinks ? 0.8 : 1 }}
            transition={{ duration: 0.3 }}
            className="text-2xl lg:hidden cursor-pointer "
            onClick={() => setIsOpenNavLinks(!isOpenNavLinks)}
          >
            {isOpenNavLinks ? <IoCloseSharp /> : <FiMenu />}
          </motion.div>
          {/*=== Menu ===*/}

          {isOpenNavLinks && (
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: "auto" }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden z-50 lg:hidden bg-(--primary-color)/30 backdrop-blur-2xl absolute top-full w-full left-0 py-4"
            >
              <div className="container">
                <div className="flex flex-col gap-2 text-gray-200 my-4">
                  <NavLink
                    to=""
                    className={({ isActive }) =>
                      `w-full text-start py-3 px-4 rounded-md hover:text-(--primary-color) hover:bg-gray-200 transition-all duration-300
                  ${isActive ? "text-(--primary-color) bg-gray-200" : ""}`
                    }
                    onClick={() => setIsOpenNavLinks(false)}
                  >
                    الرئيسيه
                  </NavLink>
                  <NavLink
                    to="/books"
                    className={({ isActive }) =>
                      `w-full text-start py-3 px-4 rounded-md hover:text-(--primary-color) hover:bg-gray-200 transition-all duration-300
                  ${isActive ? "text-(--primary-color) bg-gray-200" : ""}`
                    }
                    onClick={() => setIsOpenNavLinks(false)}
                  >
                    الكتب
                  </NavLink>
                  {user?.isAdmin && (
                    <NavLink
                      to="/dashboard"
                      className={({ isActive }) =>
                        `w-full text-start py-3 px-4 rounded-md hover:text-(--primary-color) hover:bg-gray-200 transition-all duration-300
                  ${isActive ? "text-(--primary-color) bg-gray-200" : ""}`
                      }
                      onClick={() => setIsOpenNavLinks(false)}
                    >
                      لوحه التحكم
                    </NavLink>
                  )}
                </div>

                <div>
                  {user?.email && (
                    <button
                      onClick={() => setOpenModal(true)}
                      className="py-1 px-4 border-red-500 border text-center w-full text-gray-200 hover:bg-red-500 hover:text-gray-200 text-xl rounded-md cursor-pointer hover:scale-95 transition-all duration-300"
                    >
                      تسجيل الخروج
                    </button>
                  )}
                  {!user?.email && (
                    <Link
                      to="/login"
                      className="py-1 px-4 bg-(--primary-color) text-center w-full text-gray-200 text-xl rounded-md block cursor-pointer hover:scale-95 transition-all duration-300"
                    >
                      تسجيل الدخول
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </>
        {/*=== Show just in phone ===*/}
      </div>

      {/* Confirm Modal */}
      <ConfirmModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        onConfirm={logout}
        title="تسجيل الخروج"
        message="هل أنت متأكد أنك تريد تسجيل الخروج؟"
      />
    </nav>
  );
}

export default Navbar;
