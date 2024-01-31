"use client";

import { GlobalContext } from "@/context";
import { adminNavOptions, navOptions, styles } from "@/utils";
import { Fragment, useContext, useEffect } from "react";
import CommonModal from "../CommonModal";
import Cookies from "js-cookie";
import { usePathname, useRouter } from "next/navigation";
import Login from "@/app/login/page";
import { Admin, Cart, Logout, Profile } from "../svgs";
import Image from "next/image";
import logo from "../img/logo3.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import the FontAwesomeIcon component
import { faSearch } from "@fortawesome/free-solid-svg-icons"; // import the icons you need
import CartModal from "../CartModal";


function NavItems({ isModalView = false, isAdminView, router }) {
  return (
    <div
      className={`items-center justify-between w-full md:flex md:w-auto ${
        isModalView ? "" : "hidden"
      }`}
      id="nav-items"
    >
      <ul
        className={`flex flex-col p-4 md:p-0 mt-4 font-medium  rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0 bg-white ${
          isModalView ? "border-none" : "border border-gray-100"
        }`}
      >
        {isAdminView
          ? adminNavOptions.map((item) => (
              <li
                className="cursor-pointer block py-2 pl-3 pr-4 text-gray-900 rounded md:p-0"
                key={item.id}
                onClick={() => router.push(item.path)}
              >
                {item.label}
              </li>
            ))
          : navOptions.map((item) => (
              <li
                className="cursor-pointer block py-2 pl-3 pr-4 text-gray-900 rounded md:p-0"
                key={item.id}
                onClick={() => router.push(item.path)}
              >
                {item.label}
              </li>
            ))}
      </ul>
    </div>
  );
}

export default function Navbar() {
  const { showNavModal, setShowNavModal } = useContext(GlobalContext);
  const {
    user,
    isAuthUser,
    setIsAuthUser,
    setUser,
    currentUpdatedProduct,
    setCurrentUpdatedProduct,
    showCartModal,
    setShowCartModal,
  } = useContext(GlobalContext);

  const router = useRouter();

  const pathName = usePathname();

  const handleToggleCartModal = () => {
    setShowCartModal((prev) => !prev);
  };

  useEffect(() => {
    if (
      pathName !== "/admin-view/add-product" &&
      currentUpdatedProduct !== null
    )
      setCurrentUpdatedProduct(null);
  }, [pathName]);

  console.log(user, isAuthUser, "navbar");

  function handleLogout() {
    setIsAuthUser(false);
    setUser(null);
    Cookies.remove("token");
    Cookies.remove("token");
    localStorage.clear();
    router.push("/");
  }

  const isAdminView = pathName.includes("admin-view");

  return (
    <>
      <style jsx global>{`
        .blob-btn {
          position: relative;
          z-index: 1;
          padding: 15px 40px;
          margin-top: 20px;
          text-align: center;
          text-transform: uppercase;
          color: #1df221;
          font-size: 13px;
          font-weight: bold;
          background-color: transparent;
          outline: none;
          border: none;
          transition: color 0.5s;
          cursor: pointer;
          border-radius: 30px;
        }

        .blob-btn:before {
          content: "";
          z-index: 1;
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          border: 2px solid #1df221;
          border-radius: 30px;
        }

        .blob-btn:after {
          content: "";
          z-index: -2;
          position: absolute;
          left: 2px;
          top: 2px;
          width: 100%;
          height: 100%;
          transition: all 0.3s 0.2s;
          border-radius: 30px;
        }

        .blob-btn:hover {
          color: #ffffff;
          border-radius: 30px;
        }

        .blob-btn:hover:after {
          transition: all 0.3s;
          left: 0;
          top: 0;
          border-radius: 30px;
        }

        .blob-btn__inner {
          z-index: -1;
          overflow: hidden;
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          border-radius: 30px;
          background: #ffffff;
        }

        .blob-btn__blobs {
          position: relative;
          display: block;
          height: 100%;
          filter: url("#goo");
        }

        .blob-btn__blob {
          position: absolute;
          top: 2px;
          width: 100%;
          height: 100%;
          background: #1df221;
          border-radius: 100%;
          transform: translate3d(0, 150%, 0) scale(1.7);
          transition: transform 0.45s;
        }

        .blob-btn:hover .blob-btn__blob {
          transform: translateZ(0) scale(1.7);
        }
      `}</style>

      <nav className="bg-white w-full z-20 top-0 left-0 ">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <div className="flex items-center cursor-pointer">
            <span
              onClick={() => router.push("/")}
              className="left-center text-2xl font-semibold whitespace-nowrap text-green-500"
            >
              <Image
                src={logo}
                alt="logo"
                style={{ width: "200px", height: "auto", objectFit: "cover" }}
              />
            </span>
          </div>
          <div className="flex md:order-2 gap-2">
            {!isAdminView && isAuthUser ? (
              <Fragment>
                <button style={{ marginRight: "10px" }} title="Profile">
                  <Profile
                    width="30"
                    height="30"
                    style={{ fill: "darkgreen" }}
                    onClick={()=>router.push('/account')}
                  />
                </button>
                <button title="Cart">
                  <Cart width="30" height="30" style={{ fill: "darkgreen" }}
                  onClick={handleToggleCartModal}
                  />
                   {/* {showCartModal && <CartModal setShowCartModal={setShowCartModal} />} */}
                </button>
              </Fragment>
            ) : null}
            {user?.role === "admin" ? (
              isAdminView ? (
                <button
                  onClick={() => router.push("/")}
                  className="mt-1.5 inline-block bg-green-500 px-5 py-3 text-xs font-medium uppercase tracking-wide text-white rounded-lg"
                >
                  {" "}
                  Client View
                </button>
              ) : (
                <button
                  onClick={() => router.push("/admin-view")}
                  style={{ marginLeft: "15px" }}
                  title="Admin"
                >
                  {" "}
                  <Admin width="30" height="30" style={{ fill: "darkgreen" }} />
                </button>
              )
            ) : null}
            {isAuthUser ? (
              <button
                style={{ marginLeft: "15px" }}
                title="logout"
                onClick={handleLogout}
              >
                {" "}
                <Logout width="30" height="30" style={{ fill: "darkgreen" }} />
              </button>
            ) : (
              <button
                className="blob-btn"
                onClick={() => router.push("/login")}
              >
                <div className="blob-btn__inner">
                  <div className="blob-btn__blobs">
                    {[...Array(4)].map((_, index) => (
                      <div key={index} className="blob-btn__blob" />
                    ))}
                  </div>
                </div>
                Login
              </button>
            )}
            <button
              data-collapse-toggle="navbar-sticky"
              type="button"
              className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-sticky"
              aria-expanded="false"
              onClick={() => setShowNavModal(!showNavModal)}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
          <NavItems router={router} isAdminView={isAdminView} />
        </div>
        <div className="flex items-center justify-center">
          <div
            style={{
              borderRadius: "25px",
              margin: "8px",
              border: "1px solid #ccc",
              width: "60%",
            }}
            className="flex justify-between h-8 shadow-lg"
          >
            <input
              className="focus:border-transparent outline-none m-2 w-full"
              type="text"
              placeholder="Search..."
            />
            <FontAwesomeIcon
              className="p-2"
              style={{ fontSize: "15px", cursor: "pointer" }}
              icon={faSearch}
            ></FontAwesomeIcon>
          </div>
        </div>
      </nav>

      <CommonModal
        showModalTitle={false}
        mainContent={
          <NavItems
            router={router}
            isModalView={true}
            isAdminView={isAdminView}
          />
        }
        show={showNavModal}
        setShow={setShowNavModal}
      />
      {showCartModal && <CartModal showCartModal={showCartModal} setShowCartModal={setShowCartModal}/>}
    </>
  );
}
