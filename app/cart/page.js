"use client";
import { LuTrash2 } from "react-icons/lu";
import { useContext, useState, useEffect } from "react";
import MyContext from "../context/Mycontext";
import { useSelector } from "react-redux";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import { Bounce } from "react-toastify";
import { BsCartXFill } from "react-icons/bs";

function page() {
  const { data: session } = useSession();
  const Carts = useContext(MyContext);
  const ALLData = useSelector((state) => state.counter.value);
  const [Tprice, setTprice] = useState();
  const handleDelete =async (id) => {
    if (session) {
      Carts.setCarts(Carts.Carts.filter((item) => item.id !== id));
          await fetch("https://ahr-admin.vercel.app/api/user", {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              filter: { email: session.user.email },
              update: { carts: Carts.Carts.filter((item) => item.id !== id) },
            }),
          });
    } else {
      Carts.setCarts(Carts.Carts.filter((item) => item.id !== id));
      localStorage.setItem(
        "carts",
        JSON.stringify(Carts.Carts.filter((item) => item.id !== id))
      );
    }
    toast.success("Deleted", {
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
  };
  const handleQuant = async(pind, pid, e) => {
    if (e.target.value <= 0) {
      handleDelete(pid);
    } else {
      let dummyCart = Carts.Carts;
      dummyCart[pind].quantity = e.target.value;
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
    }
    setTprice(
      Carts.Carts.reduce((sum, item) => {
        return sum + item.price * item.quantity;
      }, 0)
    );
  };
  const getTotal = () => {
    return Carts.Carts.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  };

  const handleCheckout = () => {
    if (Carts.Carts.length != 0) {
      if (session) {
        redirect("/order-place");
      } else {
        redirect("/login");
      }
    }
  };
  return (
    <div className="min-h-[90vh]">
      <div className="2xl:w-[1532px] w-[100%] justify-self-center py-8 xs:px-3 px-1.5">
        <div className="text-3xl font-bold">My Cart</div>
        {/* cart start */}
        <div className="py-10">
          {Carts.Carts.length != 0 ? (
            Carts.Carts.map((item, index) => {
              return (
                <div
                  key={index}
                  className="myGrid grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] gap-4 py-4 border-t-[2px] border-neutral-400 items-center xs:px-3"
                >
                  <div className="flex gap-5 items-center">
                    <div className="md:w-[120px] xs:w-[80px] w-[65px] md:h-[120px] mymy xs:h-[80px] h-[65px] ">
                      <img src={item.image.url} alt={item.image.altText} />
                    </div>
                    <div className="md:space-y-5 space-y-2">
                      <div className="lg:text-xl md:text-lg xs:text-[16px] text-[12px]  font-medium text-neutral-800">
                        {item.name}
                      </div>
                      <div className="flex gap-3 items-center">
                        <div className="lg:text-xl md:text-lg xs:text-[16px] text-[12px]  pr-2 text-neutral-600 ">
                          ${item && item.price}
                        </div>
                        {item && item.ram && (
                          <div className="py-1 px-2 rounded-[5px] border-1 xs:text-[16px] text-[12px] border-neutral-500 cursor-pointer bg-neutral-100">
                            <span className="md:inline hidden">RAM</span>{" "}
                            {item.ram}
                          </div>
                        )}
                        <div className="py-1 px-2 rounded-[5px] border-1 xs:text-[16px] text-[12px] border-neutral-500 cursor-pointer bg-neutral-100">
                          <span className="md:inline hidden">Storage</span>{" "}
                          {item.storage}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <input
                      defaultValue={item.quantity}
                      onChange={(e) => handleQuant(index, item.id, e)}
                      className="border-[1px] border-neutral-400 md:w-[100px] md:text-[16px] text-[12px] py-1  xs:w-[60px] px-2 w-[40px]"
                      type="number"
                    />
                  </div>
                  <div className="">
                    <LuTrash2
                      onClick={() => handleDelete(item.id)}
                      className="lg:w-[25px] lg:h-[25px] w-[20px] h-[20px] cursor-pointer "
                      color="#5a5a5a"
                    />
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-xl font-medium flex items-center gap-3"><BsCartXFill size={32}/> Your Cart is empty</div>
          )}
        </div>
        <div className="flex flex-col gap-3">
          <div className="text-3xl font-bold">Totals</div>
          <div className="max-w-[400px] flex justify-between items-center border-b-[1px] border-neutral-400">
            <div>Subtotal</div>
            <div>${getTotal()}</div>
          </div>
          <div className="max-w-[400px] flex justify-between items-center border-b-[1px] border-neutral-400">
            <div>Shipping</div>
            <div>$0.00</div>
          </div>
          <div className="max-w-[400px] flex justify-between items-center font-bold">
            <div>Total</div>
            <div>${getTotal()}</div>
          </div>
          <div className="py-6">
            <button
              onClick={handleCheckout}
              className="py-2 px-4 cursor-pointer bg-black text-white text-lg font-normal"
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
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

export default page;
