"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { IoClose } from "react-icons/io5";

function Page() {
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
        let data = await fetch("https://ahr-admin.vercel.app/api/user", {
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

  const handleDel=async (ind)=>{
    setAllorders(Allorders.filter((item, index)=>index!==ind))
    let what = await fetch("https://ahr-admin.vercel.app/api/user", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({filter: { _id: User._id }, 
        update:{orders: Allorders.filter((item, index)=>index!==ind)}
      }),
    });
    let STat = await what.json();
  }
  const handleTrack = async (item) => {
    let what = await fetch("https://ahr-admin.vercel.app/api/order", {
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
    await fetch("https://ahr-admin.vercel.app/api/user", {
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
      <div className="md:text-2xl text-xl font-medium px-4 py-5">My Orders</div>
      <div className="py-10 px-4 space-y-5">
        {Allorders &&
          Allorders.map((item, index) => {
            return (
              <div
                key={index}
                className="relative border-2 border-neutral-500 rounded-[5px] bg-neutral-100 py-3 flex justify-between items-center gap-3 md:px-6 px-4 text-neutral-800"
              >
                <div className="flex  items-center gap-8">
                  <div className="w-[100px] h-[100px] ">
                    <img src={item.image.url} alt="" />
                  </div>
                  <div className=" md:text-[16px] text-[12px]">
                    <div>{item.name}</div>
                  </div>
                </div>
                <div className="md:text-[16px] text-[12px]">{item.status}</div>
                <div>
                  <button
                    onClick={() => handleTrack(item)}
                    className="cursor-pointer py-1 px-3 bg-neutral-300 rounded-[5px] border-1 border-neutral-700 md:text-[16px] text-[12px]"
                  >
                    Track Order
                  </button>
                </div>
                <div onClick={()=>handleDel(index)} className="absolute top-1 right-1 cursor-pointer"><IoClose /></div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default Page;
