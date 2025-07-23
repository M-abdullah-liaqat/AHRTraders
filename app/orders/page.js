"use client";
import { LuTrash2 } from "react-icons/lu";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

function page() {
  const [Allorders, setAllorders] = useState();
  const [User, setUser] = useState();
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/login");
    },
  });
  useEffect(() => {
    const getone = async () => {
      if (session) {
        let data = await fetch("http://localhost:3000/api/user", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: session.user.email }),
        });
        let fin = await data.json();
        setUser(fin);
        setAllorders(fin.orders);
      }
    };
    getone();
  }, [session]);
  const handleTrack = async (item) => {
    let what = await fetch("http://localhost:3000/api/order", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: User._id, productId: item.id }),
    });
    let STat = await what.json();
    setAllorders(
      Allorders.map((ite) => {
        if (ite.id === item.id) {
          ite.status = STat.status;
          return ite;
        } else {
          return ite;
        }
      })
    );
    await fetch("http://localhost:3000/api/user", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        filter: { _id: User._id },
        update: {
          orders: Allorders.map((ite) => {
            if (ite.id === item.id) {
              ite.status = STat.status;
              return ite;
            } else {
              return ite;
            }
          }),
        },
      }),
    });
  };
  return (
    <div className="2xl:w-[1532px] min-h-[90vh] w-[100%] justify-self-center">
      <div className="md:text-2xl text-xl font-medium py-5">My Orders</div>
      <div className="py-10 px-4 space-y-5">
        {Allorders &&
          Allorders.map((item, index) => {
            return (
              <div
                key={index}
                className="border-2 border-neutral-500 rounded-[5px] bg-neutral-100 py-3 flex justify-between items-center gap-3 md:px-6 px-4 text-neutral-800"
              >
                <div className="flex  items-center gap-8">
                  <div className="w-[100px] h-[100px] ">
                    <img src={item.image.url} alt="" />
                  </div>
                  <div className=" space-y-3">
                    <div>{item.name}</div>
                  </div>
                </div>
                <div>{item.status}</div>
                <div>
                  <button
                    onClick={() => handleTrack(item)}
                    className="cursor-pointer"
                  >
                    <LuTrash2
                      className="lg:w-[25px] lg:h-[25px] w-[20px] h-[20px] cursor-pointer "
                      color="#5a5a5a"
                    />
                  </button>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default page;
