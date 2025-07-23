"use client";
import useSWR from "swr";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { FaChevronRight } from "react-icons/fa6";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import "swiper/css";
const fetcher = (url) => fetch(url).then((res) => res.json());


function Page() {
  const [FilterBrand, setFilterBrand] = useState([])
  const [showFilter, setshowFilter] = useState(false);
  // const AllData=useSelector((state) => state.counter.value)
  const { data, error, isLoading } = useSWR(
    "https://ahr-admin.vercel.app/api/add",
    fetcher,
    {
      refreshInterval: 300000, // Auto refresh every 5 min
      revalidateOnFocus: true, // Refetch when tab is active
      dedupingInterval: 2000, // Avoid multiple requests in 2s
    }
  );
  const handleBrand=(e,brand)=>{
    if(e.target.checked){
      setFilterBrand([...FilterBrand, brand])
    }else{
      setFilterBrand(FilterBrand.filter(item=>item !==brand))
    }
  }
  const TheData=[]
  if(data){
    for (let i = data.length - 1; i >= 0; i--) {
      TheData.push(data[i]);
    }
  }

  let AllData= FilterBrand.length!==0 ? TheData.filter(p=> FilterBrand.includes(p.brand)) : TheData
  if (isLoading) return <div className="min-h-screen min-w-screen flex items-center justify-center">Loading...</div>;
  if (error) return <div>Error loading products</div>;
  return(
    <div className="min-h-[90vh]">
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
              <img src="/laptop/1.png" alt="" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="/laptop/2.png" alt="" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="/laptop/3.png" alt="" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="/laptop/4.png" alt="" />
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
            className="mySwiper flex justify-center items-center"
          >
            <SwiperSlide>
              <div className="flex flex-col justify-center items-center">
                <div className=" 2xl:text-7xl xl:text-6xl lg:text-4xl text-3xl font-bold text-center">
                  AMD Ryzen-7 Outclass Perfomance
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              {" "}
              <div className="flex flex-col justify-center items-center">
                <div className=" 2xl:text-7xl xl:text-6xl lg:text-4xl text-3xl font-bold text-center">
                  Intel Core i9 latest chip latest Perfomance
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              {" "}
              <div className="flex flex-col justify-center items-center">
                <div className=" 2xl:text-7xl xl:text-6xl lg:text-4xl text-3xl font-bold text-center">
                  Intel Core i9 13900-hx with RTX 4090 graphics
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              {" "}
              <div className="flex flex-col justify-center items-center">
                <div className=" 2xl:text-7xl xl:text-6xl lg:text-4xl text-3xl font-bold text-center">
                  AMD Ryzen-7 4700U best For students
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
      <div className="2xl:w-[1532] w-[100%] xs:flex block justify-self-center">
        <div className="xs:hidden flex flex-col px-5 pt-5">
          <div
            onClick={() => setshowFilter(!showFilter)}
            className="text-xl font-bold xs:hidden flex justify-start items-center "
          >
            <div>Filters</div>
            <FaChevronRight size={16} color="black" />
          </div>
          <div
            className={`${
              showFilter ? "flex" : "hidden"
            } flex-col gap-1 px-3 py-1 border-1 border-neutral-300`}
          >
            <div className="font-2xl font-medium">Brands</div>
            <div className="space-x-3">
              <input onChange={(e)=>handleBrand(e, "HP")} className="cursor-pointer" type="checkbox" name="HP" />
              <label htmlFor="HP">HP</label>
            </div>
            <div className="space-x-3">
              <input onChange={(e)=>handleBrand(e, "Dell")} className="cursor-pointer" type="checkbox" name="HP" />
              <label htmlFor="HP">Dell</label>
            </div>
            <div className="space-x-3">
              <input onChange={(e)=>handleBrand(e, "Lenovo")} className="cursor-pointer" type="checkbox" name="HP" />
              <label htmlFor="HP">Lenovo</label>
            </div>
            <div className="space-x-3">
              <input onChange={(e)=>handleBrand(e, "Acer")} className="cursor-pointer" type="checkbox" name="HP" />
              <label htmlFor="HP">Acer</label>
            </div>
          </div>
        </div>
        <div className="lg:w-[18%] md:w-[20%] w-[30%] py-5 xs:flex hidden flex-col gap-4 px-4">
          <div className="text-3xl xs:block hidden font-bold">Filters</div>
          <div className="xs:flex flex-col gap-1 px-3 py-1 border-1 hidden border-neutral-300 w-[90%]">
            <div className="font-2xl font-medium">Brands</div>
            <div className="space-x-3">
              <input onChange={(e)=>handleBrand(e, "HP")} className="cursor-pointer" type="checkbox" name="HP" />
              <label htmlFor="HP">HP</label>
            </div>
            <div className="space-x-3">
              <input onChange={(e)=>handleBrand(e, "Dell")} className="cursor-pointer" type="checkbox" name="HP" />
              <label htmlFor="HP">Dell</label>
            </div>
            <div className="space-x-3">
              <input onChange={(e)=>handleBrand(e, "Lenovo")}  className="cursor-pointer" type="checkbox" name="HP" />
              <label  htmlFor="HP">Lenovo</label>
            </div>
            <div className="space-x-3">
              <input onChange={(e)=>handleBrand(e, "Acer")} className="cursor-pointer" type="checkbox" name="HP" />
              <label htmlFor="HP">Acer</label>
            </div>
          </div>
        </div>
        <div className="grid 2xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 lg:w-[82%] md:w-[80%] xs:w[70%] w-[100%] gap-[14px] my-5  lg:px-0 px-3">
          {AllData &&
            AllData.map((item, ind) => {
              return (
                <Link key={ind} href={`/product/${item._id}`}>
                  <div className="w-[100%] space-y-1 2xl:h-[310px] lg:h-[25vw] md:h-[33vw] xs:h-[48vw] h-[57vw] hover:shadow-2xl transition-all cursor-pointer">
                    <div
                      className={`w-[100%] 2xl:h-[76%] md:h-[77%] xs:h-[70%] h-[79%] relative justify-self-center border-[1px] border-neutral-400 overflow-hidden`}
                    >
                      <img
                        className="w-[100%] h-[100%] object-cover"
                        src={item.images[0].url}
                        alt=""
                      />
                    </div>
                    <div className="md:text-lg text-[16px] w-[100%] h-7 overflow-hidden">
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
    </div>
  );
}

export default Page;
