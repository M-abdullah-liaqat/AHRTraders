"use client";
import localFont from "next/font/local";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
const antonFont = localFont({
  src: "./fonts/Anton-Regular.ttf",
});

function Footer() {
  const mypath= ['/login'].includes(usePathname())
  const { data: session } = useSession();
  return (
    <>
    {
      !mypath &&
    <div className="Navbar h-[350px] bg-[#2A2A2A] text-[#E4E3E3]">
      <div className="flex md:justify-between justify-center  2xl:w-[1532px] w-[100%] justify-self-center 2xl:px-0 px-5 pt-4">
        <div className={`logo ${antonFont.className} flex gap-1 items-center`}>
          <Link href={"/"}>
            <div className="text-[32px] font-bold">
              AHR <span className="text-lg">Traders</span>
            </div>
          </Link>
        </div>
        <ul className="flex text-lg font-medium gap-1 items-center">
          <Link href="/">
            <li className="hidden md:block hover:bg-neutral-700 cursor-pointer py-3 px-4 rounded-xl hover:text-white">
              Home
            </li>
          </Link>
          <Link href="/products">
            <li className="hidden md:block hover:bg-neutral-700 cursor-pointer py-3 px-4 rounded-xl hover:text-white">
              Products
            </li>
          </Link>
          <Link href="/about">
            <li className="hidden md:block hover:bg-neutral-700 cursor-pointer py-3 px-4 rounded-xl hover:text-white">
              About
            </li>
          </Link>
          <Link href="/contact">
            <li className="hidden md:block hover:bg-neutral-700 cursor-pointer py-3 px-4 rounded-xl hover:text-white">
              Contact
            </li>
          </Link>
          {!session && (
            <Link href={"/login"}>
              <li className="hidden md:block hover:bg-neutral-700 cursor-pointer py-3 px-4 rounded-xl hover:text-white">
                Login
              </li>
            </Link>
          )}
        </ul>
      </div>
      <div className="2xl:w-[1300px] w-[92%]  h-[190px] bg-[#484848] justify-self-center rounded-2xl mt-3 lg:px-0 px-1.5">
        {!session && <div className="w-[100%] h-[100%] flex md:flex-row flex-col lg:justify-around md:justify-between justify-center md:gap-0 gap-6 items-center">
          <div>
            <div className="lg:text-[24px] text-xl font-bold text-center">
              Ready to find your next laptop?
            </div>
            <div className="font-medium text-[17px] lgtext-[20px] text-center">
              Start browsing now and enjoy unbeatable deals!
            </div>
          </div>
          <div className="flex gap-4 items-center">
            <input
              type="text"
              className="bg-white lg:w-[300px] w-[200px] rounded-full px-3 py-2 text-black"
              placeholder="example@email.com"
            />
            <button className="px-5 py-2 lg:py-3 lg:px-8 bg-[#D9D9D9] lg:text-xl font-medium text-black rounded-full hover:bg-[#B5B5B5]">
              Sign up
            </button>
          </div>
        </div>}
        {session && <div className="w-[100%] h-[100%] flex md:flex-row flex-col lg:justify-around md:justify-between justify-center md:gap-0 gap-6 items-center">
          <div className="flex flex-col gap-2 items-center">
            <div className="lg:text-[24px] text-xl font-bold text-center">
              Connect with us at
            </div>
            <div className="flex gap-1">
              <img className="mmd:w-[42px] w-[32px]" src="/socialIcons/tiktok1.svg" alt="" />
              <img className="mmd:w-[42px] w-[32px]" src="/socialIcons/2.svg" alt="" />
              <img className="mmd:w-[42px] w-[32px]" src="/socialIcons/3.svg" alt="" />
              <img className="mmd:w-[42px] w-[32px]" src="/socialIcons/4.svg" alt="" />
              <img className="mmd:w-[42px] w-[32px]" src="/socialIcons/5.svg" alt="" />
            </div>
          </div>
          <div className="flex flex-col items-center gap-3">
            <div className="lg:text-[24px] text-xl font-bold text-center">Subscribe for Our Emails</div>
             <div className="flex gap-4 items-center">
            <input
              type="text"
              className="bg-white lg:w-[300px] xs:w-[200px] w-[170px] rounded-full px-3 py-2 text-black"
              placeholder="example@email.com"
            />
            <button className="mmd:px-5 px-3 py-2 lg:py-3 lg:px-8 bg-[#D9D9D9] lg:text-xl font-medium text-black rounded-full hover:bg-[#B5B5B5]">
              Subscribe
            </button>
          </div>
          </div>
        </div>}
      </div>
      <div className="text-center text-xl mt-6">
        Cppyright-2025 AHR traders- All rights reserved!
      </div>
    </div>
}
    </>
  );
}

export default Footer;
