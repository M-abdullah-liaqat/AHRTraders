"use client";
import useSWR from "swr";
import { Swiper, SwiperSlide } from "swiper/react";
import { IoMdStar } from "react-icons/io";
import { useState, useEffect, useContext } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useSelector } from "react-redux";
import MyContext from "@/app/context/Mycontext";
import { useSession } from "next-auth/react";
import { ToastContainer, toast } from "react-toastify";
import { Bounce } from "react-toastify";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
// import required modules
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
export default function App() {
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
  const { data: session } = useSession();
  const Carts = useContext(MyContext);
  const [Ram, setRam] = useState();
  const [Storage, setStorage] = useState();
  const ppa = useParams();
  const searchID = ppa.productID;
  const [productDE, setproductDE] = useState();
  // const ALLDATA = useSelector((state) => state.counter.value);
  const ALLDATA = data;
  useEffect(() => {
    if (ALLDATA) {
      ALLDATA.map((item) => {
        if (item._id === searchID) {
          setproductDE(item);
        }
      });
    }
  }, [ALLDATA]);
  const latestPro = [];
  if (ALLDATA) {
    console.log("ALLDATA Running");
    for (let i = ALLDATA.length - 1; i >= 0; i--) {
      latestPro.push(ALLDATA[i]);
      if (i === ALLDATA.length - 11) {
        break;
      }
    }
  }
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const handleCart = async (price, image, name) => {
    if (Ram && Storage) {
      let ind;
      Carts.Carts.map((item, index) => {
        console.log(item.id);
        if (searchID == item.id) {
          ind = index;
        }
      });
      if (ind + 1) {
        let dummyCart = Carts.Carts;
        dummyCart[ind].quantity = dummyCart[ind].quantity + 1;
        if (session) {
          Carts.setCarts(dummyCart);
          await fetch("https://ahr-admin.vercel.app/api/user", {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              filter: { email: session.user.email },
              update: { carts: dummyCart },
            }),
          });
        } else {
          Carts.setCarts(dummyCart);
          localStorage.setItem("carts", JSON.stringify(dummyCart));
        }
      } else {
        let newData = {
          id: searchID,
          ram: Ram,
          storage: Storage,
          price: price,
          image: image,
          name: name,
          quantity: 1,
        };
        if (session) {
          Carts.setCarts([...Carts.Carts, newData]);
          await fetch("https://ahr-admin.vercel.app/api/user", {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              filter: { email: session.user.email },
              update: { carts: [...Carts.Carts, newData] },
            }),
          });
        } else {
          Carts.setCarts([...Carts.Carts, newData]);
          localStorage.setItem(
            "carts",
            JSON.stringify([...Carts.Carts, newData])
          );
        }
      }
      toast.success("Added to cart", {
        position: "top-right",
        autoClose: 1400,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    } else {
      toast.error("Please select Ram and Storage", {
        position: "top-right",
        autoClose: 1400,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  };
  if (isLoading)
    return (
      <div className="min-h-screen min-w-screen flex items-center justify-center text-2xl font-medium">
        Loading...
      </div>
    );
  if (error)
    return (
      <div className="min-h-screen min-w-screen flex items-center justify-center text-2xl font-medium">
        Error loading products
      </div>
    );
  return (
    <div className="2xl:w-[1532px] w-[100%] justify-self-center min-h-[90vh]">
      <div className="w-[100%] grid mmd:grid-cols-2 grid-cols-1 py-7">
        <div className="space-y-3">
          <Swiper
            style={{
              "--swiper-navigation-color": "#fff",
              "--swiper-pagination-color": "#fff",
            }}
            spaceBetween={10}
            navigation={true}
            thumbs={{ swiper: thumbsSwiper }}
            modules={[FreeMode, Navigation, Thumbs]}
            className="mySwiper2 w-[80%] rounded-2xl object-cover"
          >
            {productDE &&
              productDE.images.map((item, ind) => {
                return (
                  <SwiperSlide key={ind}>
                    <img
                      className="object-cover rounded-2xl"
                      src={item.url}
                      alt={item.altText}
                    />
                  </SwiperSlide>
                );
              })}
          </Swiper>
          <Swiper
            onSwiper={setThumbsSwiper}
            spaceBetween={10}
            slidesPerView={4}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[FreeMode, Navigation, Thumbs]}
            className="mySwiper w-[80%]  cursor-pointer"
          >
            {productDE &&
              productDE.images.map((item, ind) => {
                return (
                  <SwiperSlide key={ind}>
                    <img
                      className="object-cover rounded-2xl"
                      src={item.url}
                      alt={item.altText}
                    />
                  </SwiperSlide>
                );
              })}
          </Swiper>
        </div>
        <div className="px-4 text-2xl font-medium">
          <div>{productDE && productDE.name}</div>
          <div className="text-2xl font-bold pt-5">
            <span className="text-xl pr-2 text-neutral-600 line-through">
              ${productDE && productDE.price}
            </span>
            ${productDE && productDE.discountPrice}
          </div>
          <div className="text-2xl font-bold pb-5 flex items-center">
            <IoMdStar size={18} color="#eca800" />
            <IoMdStar size={18} color="#eca800" />
            <IoMdStar size={18} color="#eca800" />
            <IoMdStar size={18} color="#eca800" />
            <IoMdStar size={18} color="#fad371" />
            <div className="text-[16px] font-normal pl-[1px]">
              ({productDE && productDE.numReviews})
            </div>
          </div>
          <div className="text-[16px] font-normal text-neutral-700">
            {productDE && productDE.description}
          </div>
          <div className="pt-15">
            <div className="text-xl font-medium">Ram</div>
            <div className="flex font-normal text-lg text-center gap-2">
              {productDE &&
                productDE.ram.map((item, ind) => {
                  return (
                    <button
                      onClick={() => setRam(item)}
                      key={ind}
                      className={`py-1 px-2 rounded-xl border-1 ${
                        Ram === item
                          ? "border-blue-400 bg-blue-100"
                          : "border-neutral-500"
                      } transition-all cursor-pointer`}
                    >
                      {item}GB
                    </button>
                  );
                })}
            </div>
            <div className="text-xl font-medium pt-3">Storage</div>
            <div className="flex font-normal text-lg text-center gap-2">
              {productDE &&
                productDE.storage.map((item, ind) => {
                  return (
                    <button
                      onClick={() => setStorage(item)}
                      key={ind}
                      className={`py-1 px-2 rounded-xl border-1 ${
                        Storage === item
                          ? "border-blue-400 bg-blue-100"
                          : "border-neutral-500"
                      } transition-all cursor-pointer`}
                    >
                      {item}GB
                    </button>
                  );
                })}
            </div>
          </div>
          <div className="py-6">
            <button
              onClick={() =>
                handleCart(
                  productDE.discountPrice,
                  productDE.images[0],
                  productDE.name
                )
              }
              className="py-2 px-4 cursor-pointer bg-black text-white text-lg font-normal"
            >
              ADD TO CART
            </button>
          </div>
          <div className="py-3 pt-1 text-[14px] font-normal text-neutral-700">
            <div>Best Price Guarantee</div>
            <div>Free Shipping</div>
            <div>Easy Returns & 7-Day Exchange</div>
            <div>Cash on delivery is available on this product.</div>
          </div>
        </div>
      </div>
      <div className="my-20">
        <div className="lg:text-4xl text-3xl font-medium pb-10 2xl:px-0 px-2">
          Realated Products
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
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </div>
  );
}
