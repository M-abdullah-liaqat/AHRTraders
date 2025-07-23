"use client";
import React, { useEffect } from "react";
import { notFound, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
function page() {
    const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors, isSubmitting },
  } = useForm()
  return (
    <div>
      <div className="h-[88vh]">
        <form className="flex flex-col gap-2 justify-center items-center h-[100%]">
          <div>
            <label
              htmlFor="small-input"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
              Name
            </label>
            <input
            {...register("name",{required:true})}
              type="text"
              id="small-input"
              className="block lg:w-[800px] w-[90vw] p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-[#E4E3E3] dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="small-input"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
              Email
            </label>
            <input
            {...register("email",{required:true})}
              type="text"
              id="small-input"
              className="block lg:w-[800px] w-[90vw] p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-[#E4E3E3] dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="small-input"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
              Username
            </label>
            <input
            {...register("username",{required:true})}
              type="text"
              id="small-input"
              className="block lg:w-[800px] w-[90vw] p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-[#E4E3E3] dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="small-input"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
              Profile Picture
            </label>
            <input
            {...register("profilepicture")}
              type="text"
              id="small-input"
              className="block lg:w-[800px] w-[90vw] p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-[#E4E3E3] dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="small-input"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
              Cover Picture
            </label>
            <input
            {...register("coverpicture")}
              type="text"
              id="small-input"
              className="block lg:w-[800px] w-[90vw] p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-[#E4E3E3] dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="small-input"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
              Payment
            </label>
            <input
              type="text"
              id="small-input"
              className="block lg:w-[800px] w-[90vw] p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-[#E4E3E3] dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className=" cursor-pointer text-white my-3 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-20 py-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
           Save
          </button>
        </form>
      </div>
    </div>
  );
}

export default page;
