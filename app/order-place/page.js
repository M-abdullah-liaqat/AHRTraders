"use client";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useContext, useRef, useState } from "react";
import MyContext from "../context/Mycontext";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { IoMdAlert } from "react-icons/io";
import { ToastContainer, toast } from "react-toastify";
import { Bounce } from "react-toastify";
import { BsCartXFill } from "react-icons/bs";
function Page() {
  const alertMess = useRef();
  const [Showalert, setShowalert] = useState(true);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const Carts = useContext(MyContext);
  const router = useRouter();
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/login");
    },
  });
  const onSubmit = async (data) => {
    let preOrders = await fetch("https://ahr-admin.vercel.app/api/user", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: session.user.email }),
    });
    let theData = await preOrders.json();
    let orderarray = theData.orders;
    for (let i = 0; i < Carts.Carts.length; i++) {
      let uid = session.user.uData._id;
      let tprice = Carts.Carts[i].price * parseInt(Carts.Carts[i].quantity);
      let newOrder = {
        ...{ userId: uid },
        ...{ userDetail: data },
        ...{ productDetail: Carts.Carts[i] },
        ...{ totalPrice: tprice },
        ...{ productId: Carts.Carts[i].id },
      };
      orderarray.push({ ...Carts.Carts[i], ...{ status: "Order-Placed" } });
      let res = fetch("https://ahr-admin.vercel.app/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newOrder),
      });
    }
    console.log(orderarray);
    await fetch("https://ahr-admin.vercel.app/api/user", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        filter: { email: session.user.email },
        update: { orders: orderarray },
      }),
    });
    Carts.setCarts([]);
    await fetch("https://ahr-admin.vercel.app/api/user", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        filter: { email: session.user.email },
        update: { carts: [] },
      }),
    });
    toast.success("Order Placed", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
    router.push("/orders")
  };
  if (typeof window !== "undefined") {
    window.onclick = function (event) {
      if (event.target !== alertMess.current) setShowalert(false);
    };
  }
  const getTotal = () => {
    return Carts.Carts.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  };
  return (
    <div className="min-h-[90vh]">
      <div className="2xl:w-[1532px] w-[100%] justify-self-center">
        <form
          onSubmit={handleSubmit((e) => {
            onSubmit(e);
          })}
          className="py-7 px-5 flex md:flex-row flex-col md:justify-between items-center gap-6"
        >
          {Carts.Carts.length !== 0 ? (
            <div className="max-w-[510px]">
              <div className="text-2xl font-medium pb-7">Shipping Details</div>
              <div className="space-y-4">
                <div className="flex gap-[3%] relative">
                  <input
                    {...register("fname", {
                      required: { value: true, message: "Field required" },
                      minLength: { value: 5, message: "Min length 5" },
                    })}
                    className="w-[48.5%] py-1 border-[1.5px] border-neutral-300 rounded-[5px] px-2"
                    type="text"
                    placeholder="First Name"
                  />
                  {errors.fname && (
                    <div
                      className={`absolute top-10 ${
                        Showalert ? "block" : "hidden"
                      } bg-slate-100 border-[1px] z-10 border-black shadow-[0_4px_8px_-3px_rgba(0,0,0,0.1)] flex items-center gap-2 shadow-black transition-all py-0.5 px-3`}
                    >
                      <IoMdAlert size={24} />
                      {errors.fname.message}
                    </div>
                  )}
                  <input
                    {...register("lname", {
                      required: { value: true, message: "Field required" },
                      minLength: { value: 5, message: "Min length 5" },
                    })}
                    className="w-[48.5%] py-1 border-[1.5px] border-neutral-300 rounded-[5px] px-2"
                    type="text"
                    placeholder="Last Name"
                  />
                  {errors.lname && (
                    <div
                      className={`absolute top-10 right-4 ${
                        Showalert ? "block" : "hidden"
                      } z-10 bg-slate-100 border-[1px] border-black shadow-[0_4px_8px_-3px_rgba(0,0,0,0.1)] flex items-center gap-2 shadow-black transition-all py-0.5 px-3`}
                    >
                      <IoMdAlert size={24} />
                      {errors.lname.message}
                    </div>
                  )}
                </div>
                <div className="relative">
                  <input
                    {...register("email", {
                      required: { value: true, message: "Field required" },
                    })}
                    className="w-[100%] py-1 border-[1.5px] border-neutral-300 rounded-[5px] px-2"
                    type="text"
                    placeholder="Email Address"
                  />
                  {errors.email && (
                    <div
                      className={`absolute top-10 ${
                        Showalert ? "block" : "hidden"
                      } bg-slate-100 border-[1px] z-10 border-black shadow-[0_4px_8px_-3px_rgba(0,0,0,0.1)] flex items-center gap-2 shadow-black transition-all py-0.5 px-3`}
                    >
                      <IoMdAlert size={24} />
                      {errors.email.message}
                    </div>
                  )}
                </div>
                <div className="relative">
                  <input
                    {...register("address", {
                      required: { value: true, message: "Field required" },
                    })}
                    className="w-[100%] py-1 border-[1.5px] border-neutral-300 rounded-[5px] px-2"
                    type="text"
                    placeholder="Address line"
                  />
                  {errors.address && (
                    <div
                      className={`absolute top-10 ${
                        Showalert ? "block" : "hidden"
                      } bg-slate-100 border-[1px] z-10 border-black shadow-[0_4px_8px_-3px_rgba(0,0,0,0.1)] flex items-center gap-2 shadow-black transition-all py-0.5 px-3`}
                    >
                      <IoMdAlert size={24} />
                      {errors.address.message}
                    </div>
                  )}
                </div>
                <div className="flex gap-[3%] relative">
                  <input
                    {...register("city", {
                      required: { value: true, message: "Field required" },
                    })}
                    className="w-[48.5%] py-1 border-[1.5px] border-neutral-300 rounded-[5px] px-2"
                    type="text"
                    placeholder="City"
                  />
                  {errors.city && (
                    <div
                      className={`absolute top-10 ${
                        Showalert ? "block" : "hidden"
                      } bg-slate-100 border-[1px] z-10 border-black shadow-[0_4px_8px_-3px_rgba(0,0,0,0.1)] flex items-center gap-2 shadow-black transition-all py-0.5 px-3`}
                    >
                      <IoMdAlert size={24} />
                      {errors.city.message}
                    </div>
                  )}
                  <input
                    {...register("state", {
                      required: { value: true, message: "Field required" },
                    })}
                    className="w-[48.5%] py-1 border-[1.5px] border-neutral-300 rounded-[5px] px-2"
                    type="text"
                    placeholder="State"
                  />
                  {errors.state && (
                    <div
                      className={`absolute top-10 right-4 ${
                        Showalert ? "block" : "hidden"
                      } z-10 bg-slate-100 border-[1px] border-black shadow-[0_4px_8px_-3px_rgba(0,0,0,0.1)] flex items-center gap-2 shadow-black transition-all py-0.5 px-3`}
                    >
                      <IoMdAlert size={24} />
                      {errors.state.message}
                    </div>
                  )}
                </div>
                <div className="flex gap-[3%] relative">
                  <input
                    {...register("zipcode", {
                      required: { value: true, message: "Field required" },
                    })}
                    className="w-[48.5%] py-1 border-[1.5px] border-neutral-300 rounded-[5px] px-2"
                    type="text"
                    placeholder="ZipCode/PostalCode"
                  />
                  {errors.zipcode && (
                    <div
                      className={`absolute top-10 ${
                        Showalert ? "block" : "hidden"
                      } bg-slate-100 border-[1px] z-10 border-black shadow-[0_4px_8px_-3px_rgba(0,0,0,0.1)] flex items-center gap-2 shadow-black transition-all py-0.5 px-3`}
                    >
                      <IoMdAlert size={24} />
                      {errors.zipcode.message}
                    </div>
                  )}
                  <input
                    {...register("country", {
                      required: { value: true, message: "Filed required" },
                    })}
                    className="w-[48.5%] py-1 border-[1.5px] border-neutral-300 rounded-[5px] px-2"
                    type="text"
                    placeholder="Country"
                  />
                  {errors.country && (
                    <div
                      className={`absolute top-10 right-4 ${
                        Showalert ? "block" : "hidden"
                      } z-10 bg-slate-100 border-[1px] border-black shadow-[0_4px_8px_-3px_rgba(0,0,0,0.1)] flex items-center gap-2 shadow-black transition-all py-0.5 px-3`}
                    >
                      <IoMdAlert size={24} />
                      {errors.country.message}
                    </div>
                  )}
                </div>
                <div className="relative">
                  <input
                    {...register("phone", {
                      required: { value: true, message: "Filed required" },
                    })}
                    className="w-[100%] py-1 border-[1.5px] border-neutral-300 rounded-[5px] px-2"
                    type="text"
                    placeholder="Phone"
                  />
                  {errors.phone && (
                    <div
                      className={`absolute top-10 ${
                        Showalert ? "block" : "hidden"
                      } bg-slate-100 border-[1px] z-10 border-black shadow-[0_4px_8px_-3px_rgba(0,0,0,0.1)] flex items-center gap-2 shadow-black transition-all py-0.5 px-3`}
                    >
                      <IoMdAlert size={24} />
                      {errors.phone.message}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="max-w-[510px] flex flex-col items-center justify-center gap-3">
              <div className="text-xl font-medium flex items-center gap-3">
                <BsCartXFill size={32} /> Your Cart is empty Click here
              </div>
              <Link href="http://localhost:3000/collection">
                <div>
                  <button className="bg-black cursor-pointer px-5 py-2 rounded-[5px] text-lg text-white">
                    Items
                  </button>
                </div>
              </Link>
            </div>
          )}
          <div className="">
            <div className="xl:w-[510px] lg:w-[450px] md:w-[340px] xss:w-[450px] w-[95vw] justify-center flex flex-col gap-3">
              <div className="text-3xl font-medium">Totals</div>
              <div className="w-[100%] flex justify-between items-center border-b-[1px] border-neutral-400">
                <div>Subtotal</div>
                <div>${getTotal()}</div>
              </div>
              <div className="w-[100%] flex justify-between items-center border-b-[1px] border-neutral-400">
                <div>Shipping</div>
                <div>$0.00</div>
              </div>
              <div className="w-[100%] flex justify-between items-center font-bold">
                <div>Total</div>
                <div>${getTotal()}</div>
              </div>
              <div className="pt-6 flex flex-col gap-5">
                <div className="text-3xl font-medium">Payment Method</div>
                <button className="w-[233px] py-1 px-3 border-[1px] border-neutral-400 cursor-pointer">
                  Cash on Delivery
                </button>
                <button
                  ref={alertMess}
                  onClick={() => {
                    setShowalert(true);
                  }}
                  type="submit"
                  className="py-2 px-4 cursor-pointer bg-black text-white text-lg font-normal"
                >
                  Place Order
                </button>
              </div>
            </div>
          </div>
        </form>
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

export default Page;
