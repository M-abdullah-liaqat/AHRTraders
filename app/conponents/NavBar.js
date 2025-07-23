"use client";
import { useState } from "react";
import localFont from "next/font/local";
import { useRef, useContext, useEffect } from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import MyContext from "../context/Mycontext";
import { IoPersonOutline } from "react-icons/io5";
import { CgShoppingCart } from "react-icons/cg";
import { usePathname } from "next/navigation";
const antonFont = localFont({
  src: "./fonts/Anton-Regular.ttf",
});

function NavBar() {
  const mypath= ['/login'].includes(usePathname())
  const Carts = useContext(MyContext);
  const { data: session } = useSession();
  useEffect(() => {
    const DIDit = async() => {
      if (session) {
        let dummy=await fetch("http://localhost:3000/api/user", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({email: session.user.email}),
          });
          let sess=await dummy.json();
        let DBcart = sess.carts;
        let abd = JSON.parse(localStorage.getItem("carts"));
        if (abd) {
          let newCart = [...abd, ...DBcart];
          Carts.setCarts(newCart);
          await fetch("http://localhost:3000/api/user", {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              filter: { email: session.user.email },
              update: { carts: newCart },
            }),
          });
          localStorage.clear();
        } else {
          Carts.setCarts(DBcart);
        }
      } else {
        console.log("running");
        let abd = JSON.parse(localStorage.getItem("carts"));
        if (abd) {
          Carts.setCarts(abd);
        } else {
          Carts.setCarts([]);
        }
      }
    };
    DIDit();
  }, [session]);
  const needFocus = useRef();
  const [showDrop, setshowDrop] = useState(false);
  const onHam = useRef();
  if (typeof window !== "undefined") {
    window.onclick = function (event) {
      if (event.target !== needFocus.current) {
        setshowDrop(false);
      }
    };
  }
  return (
    <>
    {!mypath &&
    <div className="Navbar bg-[#2A2A2A] text-[#E4E3E3]">
      <div className="flex justify-between  2xl:w-[1532px] w-[100%] justify-self-center 2xl:px-0 px-5">
        <div className={`logo ${antonFont.className} flex gap-1 items-center`}>
          <div className="cursor-pointer md:hidden flex items-center justify-center">
            <button onClick={() => (onHam.current.style.left = "0px")}>
              <img width="32px" src="/ham.svg" alt="" />
            </button>
          </div>
          <Link href={"/"}>
            {" "}
            <div className="lg:text-[48px] md:text-[42px] cursor-pointer text-[36px] font-bold">
              AHR<span className="md:text-lg text-[16px] pl-1">Traders</span>
            </div>
          </Link>
        </div>

        <ul className="flex lg:text-xl font-medium gap-1 items-center">
          <Link href="/">
            <li className="md:block  hidden hover:bg-neutral-700 cursor-pointer py-3 px-4 rounded-xl hover:text-white">
              Home
            </li>
          </Link>
          <Link href="/products">
            <li className="md:block  hidden hover:bg-neutral-700 cursor-pointer py-3 px-4 rounded-xl hover:text-white">
              Products
            </li>
          </Link>
          <Link href="/about">
            <li className="md:block  hidden hover:bg-neutral-700 cursor-pointer py-3 px-4 rounded-xl hover:text-white">
              About
            </li>
          </Link>
          <Link href="/contact">
            <li className="md:block  hidden hover:bg-neutral-700 cursor-pointer py-3 px-4 rounded-xl hover:text-white">
              Contact
            </li>
          </Link>
          <Link href="/cart">
            <li className="hover:bg-neutral-700 cursor-pointer py-3 px-4 rounded-xl hover:text-white">
              <div className="relative">
                <div className="absolute bottom-0 z-10 bg-black w-[16px] h-[15px] rounded-full text-[12px] text-center">
                  {Carts.Carts.length}
                </div>
                <CgShoppingCart size={28} />
              </div>
            </li>
          </Link>
          {!session && (
            <Link href="/login">
              {" "}
              <li>
                <button className="cursor-pointer flex">
                  <IoPersonOutline size={32} />
                  <span className="text-[12px] font-normal">/Login</span>
                </button>
              </li>
            </Link>
          )}
          {session && (
            <li className="dropdown">
              <button
                onClick={() => {
                  setshowDrop(!showDrop);
                }}
                id="dropdownDefaultButton"
                data-dropdown-toggle="dropdown"
                type="button"
                
                className="dropbtn cursor-pointer"
              >
                <IoPersonOutline ref={needFocus} size={32} />
              </button>
              <div
                id="myDropdown"
                className={`dropdown-content ${
                  showDrop ? "absolute" : "hidden"
                } z-20 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700`}
              >
                <ul
                  className="py-2 text-sm text-gray-700 dark:text-gray-200"
                  aria-labelledby="dropdownDefaultButton"
                >
                  <Link href={"/orders"}>
                    <li>
                      <div
                        href="#"
                        className="block px-4 cursor-pointer py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Orders
                      </div>
                    </li>
                  </Link>
                  <li>
                    <div
                      onClick={signOut}
                      href="#"
                      className="block px-4 cursor-pointer py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Sign out
                    </div>
                  </li>
                </ul>
              </div>
            </li>
          )}
        </ul>
      </div>
      <div
        ref={onHam}
        onClick={() => {
          onHam.current.style.left = "-310px";
        }}
        className=" transition-all absolute left-[-310px] md:hidden bottom-0 z-30 min-h-screen w-[300px] bg-[#2A2A2A]"
      >
        <div
          className={`logo ${antonFont.className} flex gap-1 justify-between items-center px-3`}
        >
          <Link href={"/"}>
            <div className="text-[48px] cursor-pointer font-bold">
              AHR<span className="text-lg pl-1">Traders</span>
            </div>
          </Link>
          <div className="cursor-pointer md:hidden flex items-center justify-center">
            <button onClick={() => (onHam.current.style.left = "-310px")}>
              <img width="32px" src="/close.svg" alt="" />
            </button>
          </div>
        </div>
        <ul className="lg:text-xl font-medium items-center">
          <Link href="/">
            <li className="hover:bg-neutral-700 cursor-pointer py-3 px-4 rounded-xl hover:text-white">
              Home
            </li>
          </Link>
          <Link href="/products">
            <li className="hover:bg-neutral-700 cursor-pointer py-3 px-4 rounded-xl hover:text-white">
              Products
            </li>
          </Link>
          <Link href="/about">
            <li className="hover:bg-neutral-700 cursor-pointer py-3 px-4 rounded-xl hover:text-white">
              About
            </li>
          </Link>
          <Link href="/contact">
            <li className="hover:bg-neutral-700 cursor-pointer py-3 px-4 rounded-xl hover:text-white">
              Contact
            </li>
          </Link>
         {!session && <Link href={"/login"}><li className="hover:bg-neutral-700 cursor-pointer py-3 px-4 rounded-xl hover:text-white">
            Login
          </li></Link>}
        </ul>
      </div>
    </div>
}
    </>
  );
}

export default NavBar;
