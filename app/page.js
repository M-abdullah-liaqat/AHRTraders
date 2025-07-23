"use client";
import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import useSWR from "swr";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import "swiper/css";
export default function Home() {
  const { data, error, isLoading } = useSWR(
    "https://ahr-admin.vercel.app/api/add",
    async (url) => {
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error("Failed to fetch user data");
      }
      return await res.json();
    },
    {
      refreshInterval: 300000, // Auto refresh every 5 seconds
      revalidateOnFocus: true, // Refetch when tab is active
      dedupingInterval: 2000, // Avoid multiple requests in 2s
    }
  );
  // const ALLDATA = useSelector((state) => state.counter.value);
  const ALLDATA = data;
  const latestPro = [];
  if (ALLDATA) {
    for (let i = ALLDATA.length - 1; i >= 0; i--) {
      latestPro.push(ALLDATA[i]);
      if (i === ALLDATA.length - 11) {
        break;
      }
    }
  }
  const { data: session } = useSession();
  const [N, setN] = useState(0);
  const newN = () => {
    setN((N + 1) % 4);
  };
  useEffect(() => {
    const inter = setInterval(() => {
      newN();
    }, 5000);
    return () => clearInterval(inter);
  }, [N]);
  if (isLoading)
    return (
      <div className="min-h-screen min-w-screen flex items-center justify-center">
        Loading...
      </div>
    );
  if (error) {
    return (
      <div className="min-h-screen min-w-screen flex items-center justify-center">
        Error loading products
      </div>
    );
  }
  return (
    <div className="main min-h-screen bg-[#FFFFFF]">
      <div className="grid mmd:grid-cols-2 grid-cols-1 gap-3 bg-gray-100 border-[2px] rounded-[5px] border-gray-700 m-5 shadow-2xl">
        <div className="">
          <Swiper
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            modules={[Autoplay]}
            className="mySwiper object-cover"
          >
            <SwiperSlide>
              <img src="/HuamnsPics/1.png" alt="" />
            </SwiperSlide>
            <SwiperSlide>
              {" "}
              <img src="/HuamnsPics/2.png" alt="" />
            </SwiperSlide>
            <SwiperSlide>
              {" "}
              <img src="/HuamnsPics/3.png" alt="" />
            </SwiperSlide>
            <SwiperSlide>
              {" "}
              <img src="/HuamnsPics/4.png" alt="" />
            </SwiperSlide>
          </Swiper>
        </div>
        <div className="flex justify-center items-center">
          <Swiper
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            modules={[Autoplay]}
            className="mySwiper object-cover"
          >
            <SwiperSlide>
              {" "}
              <div className="flex flex-col justify-center items-center">
                <div className=" 2xl:text-7xl xl:text-6xl lg:text-4xl text-3xl font-bold text-center">
                  Welcome to AHR traders Your One-Stop Laptop Destination
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              {" "}
              <div className="flex flex-col justify-center items-center">
                <div className=" 2xl:text-7xl xl:text-6xl lg:text-4xl text-3xl font-bold text-center">
                  Work Smarter
                </div>
                <div className="textAnimate relative overflow-hidden text-2xl mt-7 text-center">
                  Boost your productivity with laptops that are built for
                  business. Lightweight, long battery life, and powerful
                  performance — ideal for remote work, freelancing, or office
                  use.
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              {" "}
              <div className="flex flex-col justify-center items-center">
                <div className=" 2xl:text-7xl xl:text-6xl lg:text-4xl text-3xl font-bold text-center">
                  Game Harder
                </div>
                <div className="textAnimate relative overflow-hidden text-2xl mt-7 text-center">
                  Crush every frame with high-performance gaming laptops. Enjoy
                  smooth graphics, lightning-fast refresh rates, and custom
                  cooling systems.
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              {" "}
              <div className="flex flex-col justify-center items-center">
                <div className=" 2xl:text-7xl xl:text-6xl lg:text-4xl text-3xl font-bold text-center">
                  Study Better
                </div>
                <div className="textAnimate relative overflow-hidden text-2xl mt-7 text-center">
                  Affordable laptops for students with all the essentials — fast
                  boot times, clear displays, and plenty of storage for your
                  projects and presentations.
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
      <div className="2xl:w-[1532px] w-screen justify-self-center my-20">
        <div className="lg:text-4xl text-3xl font-medium pb-10 2xl:px-0 px-2">
          Latest Products
        </div>
        <div className="grid 2xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 2xl:px-[15px] lg:px-[1vw] md:px-[1.25vw] px-[2.5vw] 2xl:gap-[12px] lg:gap-[1vw] md:gap-[1.5vw] gap-[5vw]">
          {latestPro &&
            latestPro.map((item, index) => {
              return (
                <Link key={index} href={`/product/${item._id}`}>
                  <div key={index} className="">
                    <div>
                      <div className="w-[100%] myName 2xl:h-[286px] lg:h-[23.5vw] md:h-[31vw] h-[44vw] relative border-[1px] border-neutral-400">
                        <img
                          className="w-[100%] h-[100%] object-cover"
                          style={{ objectFit: "cover" }}
                          src={item.images[0].url}
                          alt=""
                        />
                      </div>
                    </div>
                    <div className="md:text-lg text-[16px] w-[100%]">
                      {item.name}
                    </div>
                    <div className="md:text-lg text-[16px] font-bold">
                      <span className="md:text-[16px] text-[12px] pr-2 text-neutral-600 line-through">
                        ${item.price}
                      </span>{" "}
                      ${item.discountPrice}
                    </div>
                  </div>
                </Link>
              );
            })}
        </div>
      </div>
      <div className="2xl:w-[1532px] w-screen justify-self-center py-13 space-y-12">
        <div className="lg:text-4xl text-3xl font-medium px-5">
          Why Shop With Us?
        </div>
        <div className="grid xl:w-[1280px] lg:w-[1024px] mmd:w-[800] md:w-[700px] xs:w-[600px] xss:w-[400px] w-[220px] xl:h-[416px] lg:h-[333px] mmd:h-[260px] md:h-[228px] xs:h-[780px] xss:h-[520px] h-[1144px] justify-self-center md:grid-cols-4 xss:grid-cols-2 grid-cols-1 2xl:p-0 px-3 gap-5">
          <div className="bg-[#DBDBDB] w-[100%] h-[100%] rounded-3xl">
            <div className="justify-selt-center left-4 w-[90%] h-[68%] relative">
              <Image fill={true} src="/Icons/1.png" alt="" />
            </div>
            <div className="xl:w-[250px] text-center justify-self-center xl:text-3xl lg:text-2xl mmd:text-xl text-lg font-bold lg:pt-7 xl:p-0">
              Best Price Guarantee
            </div>
          </div>
          <div className="bg-[#DBDBDB] h-[100%] rounded-3xl">
            <div className="justify-selt-center left-4 w-[90%] h-[68%] relative">
              <Image fill={true} src="/Icons/2.png" alt="" />
            </div>
            <div className="xl:w-[250px] text-center justify-self-center xl:text-3xl lg:text-2xl mmd:text-xl text-lg font-bold lg:pt-7 xl:p-0">
              Free Shipping
            </div>
          </div>
          <div className="bg-[#DBDBDB] h-[100%] rounded-3xl">
            <div className="justify-selt-center left-2 w-[90%] h-[63%] relative">
              <Image fill={true} src="/Icons/3.png" alt="" />
            </div>
            <div className="xl:w-[250px] text-center justify-self-center xl:text-3xl lg:text-2xl mmd:text-xl text-lg font-bold lg:pt-7 xl:p-0">
              Easy Returns & 7-Day Exchange
            </div>
          </div>
          <div className="bg-[#DBDBDB] h-[100%] rounded-3xl">
            <div className="justify-selt-center left-4 w-[90%] h-[68%] relative">
              <Image fill={true} src="/Icons/4.png" alt="" />
            </div>
            <div className="xl:w-[250px] text-center justify-self-center xl:text-3xl lg:text-2xl mmd:text-xl text-lg font-bold xl:pt-7 lg:p-0">
              Cash on delivery available
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
