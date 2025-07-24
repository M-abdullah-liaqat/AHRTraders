"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import { Bounce } from "react-toastify";
function Page() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const { data: session } = useSession();
  useEffect(() => {
    if (session) {
      router.push("/");
    }
  }, [session]);
  const handleSignUp = async (data) => {
    console.log(data);
    let our = await fetch("https://ahr-admin.vercel.app/api/user", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    let res = await our.json();
    if (res.sucess == false) {
        toast.error(res.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }else{
      setAccount(false)
       toast.success(res.message, {
        position: "top-right",
        autoClose: 5000,
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
  const handleSignin = async (credentials) => {
    const result = await signIn("credentials", {
      email: credentials.email,
      password: credentials.password,
      redirect: false,
    });
    if (result?.error) {
      toast.error("Invalid email or password!", {
        position: "top-right",
        autoClose: 5000,
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
  const [Account, setAccount] = useState(false);
  return (
    <div className="flex min-h-[99vh] min-w[99vw] gap-6 justify-center items-center text-black">
      <div className="space-y-4">
        <div className="text-center">
          <Link href={"/"}>
            <div className="lg:text-[48px] md:text-[42px] cursor-pointer text-[36px] font-bold">
              AHR<span className="md:text-lg text-[16px] pl-1">Traders</span>
            </div>
          </Link>
          <div className="font-bold text-3xl">Login to Get Started</div>
        </div>
        <div>
          <button
            type="button"
            className="justify-self-center w-[250px] flex text-black shadow-xl border-[1px] border-black hover:bg-[#24292F]/90 focus:outline-none font-medium rounded-[3px] text-sm px-7 py-2.5 text-center justify-between items-center dark:hover:bg-[#050708]/30 me-2 mb-2"
          >
            <svg
              className="w-4 h-4 me-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 18 19"
            >
              <path
                fillRule="evenodd"
                d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z"
                clipRule="evenodd"
              />
            </svg>
            Continue with Google
          </button>
          <button
            onClick={() => signIn("github")}
            type="button"
            className="justify-self-center w-[250px] flex text-black shadow-xl border-[1px] border-black hover:bg-[#24292F]/90 focus:outline-none font-medium rounded-[3px] text-sm px-7 py-2.5 text-center justify-between items-center dark:hover:bg-[#050708]/30 me-2 mb-2"
          >
            <svg
              className="w-4 h-4 me-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z"
                clipRule="evenodd"
              />
            </svg>
            Continue with Github
          </button>
        </div>
        <div className="justify-self-center">
          --------------- or --------------
        </div>
        {!Account && (
          <form onSubmit={handleSubmit((e) => handleSignin(e))}>
            <div className="space-y-2">
              <div>Email</div>
              <input
                type="email"
                {...register("email", {
                  required: { value: true, message: "Filed required" },
                })}
                className="w-[300px] text-black shadow-xl border-[1px] border-black focus:outline-none font-medium rounded-[3px] text-sm px-2 py-1 text-center justify-between items-center me-2 mb-2"
                placeholder="Enter your Email"
              />
            </div>
            <div className="space-y-2">
              <div>Passowrd</div>
              <input
                {...register("password", {
                  required: { value: true, message: "Filed required" },
                })}
                className="w-[300px] text-black shadow-xl border-[1px] border-black focus:outline-none font-medium rounded-[3px] text-sm px-2 py-1 text-center justify-between items-center me-2 mb-2"
                type="text"
                placeholder="Enter your Password"
              />
            </div>
            <div className="flex justify-between items-center">
              <button className="px-4 py-2 bg-black text-xl text-white rounded-2xl cursor-pointer">
                Sign in
              </button>
              <div onClick={() => setAccount(true)} className="cursor-pointer">
                Dont have an account
              </div>
            </div>
          </form>
        )}
        {Account && (
          <form
            onSubmit={handleSubmit((e) => handleSignUp(e))}
            className="pb-6"
          >
            <div className="space-y-2">
              <div>Email</div>
              <input
                type="email"
                {...register("email", {
                  required: { value: true, message: "Filed required" },
                })}
                className="w-[300px] text-black shadow-xl border-[1px] border-black focus:outline-none font-medium rounded-[3px] text-sm px-2 py-1 text-center justify-between items-center me-2 mb-2"
                placeholder="Enter your Email"
              />
            </div>
            <div className="space-y-2">
              <div>Username</div>
              <input
                {...register("username", {
                  required: { value: true, message: "Filed required" },
                })}
                className="w-[300px] text-black shadow-xl border-[1px] border-black focus:outline-none font-medium rounded-[3px] text-sm px-2 py-1 text-center justify-between items-center me-2 mb-2"
                type="text"
                placeholder="Enter your Username"
              />
            </div>
            <div className="space-y-2">
              <div>Passowrd</div>
              <input
                {...register("password", {
                  required: { value: true, message: "Filed required" },
                })}
                className="w-[300px] text-black shadow-xl border-[1px] border-black focus:outline-none font-medium rounded-[3px] text-sm px-2 py-1 text-center justify-between items-center me-2 mb-2"
                type="text"
                placeholder="Enter your Password"
              />
            </div>
            <div className="flex justify-between items-center">
              <button
                type="submit"
                className="px-4 py-2 bg-black text-xl text-white rounded-2xl cursor-pointer"
              >
                Sign up
              </button>
              <div onClick={() => setAccount(false)} className="cursor-pointer">
                Sign in
              </div>
            </div>
          </form>
        )}
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
