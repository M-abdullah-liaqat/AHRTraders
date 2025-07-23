
import Link from "next/link";
function page() {
  return (
    <div>
    <div className="text-5xl font-bold pt-3 justify-self-center">Contact us</div>
      <div className="min-h-screen lg:grid lg:grid-cols-2">
        <div className="flex justify-center items-center">
          <img
            className="rounded-4xl p-3"
            width="700px"
            src="/about2.jpg"
            alt=""
          />
        </div>
        <div className="px-5 py-7 flex flex-col justify-center"> 
          <div className="text-xl mt-20">
            <div className="text-2xl font-bold">Address</div>
            <div>Sataina Road-Rex city Faisalabad</div>
            <div>Punjab-Pakistan</div>
            <div className="mt-7">Tel: (041) 0000-000</div>
            <div>Email: dummy.fake@gmal.com</div>
          </div>
          <div className="mt-5 text-xl">
            <div className="text-2xl font-bold">Explore More</div>
            <Link href="/about"><button className="py-3 cursor-pointer px-6 bg-[#bbbbbb] text-black font-medium rounded-full hover:bg-[#8a8a8a] my-5">
              About us
            </button></Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
