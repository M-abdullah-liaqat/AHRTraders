import Image from "next/image";

function Page() {
  return (
    <div>
    <div className="min-h-screen lg:grid lg:grid-cols-2">
      <div className="flex justify-center items-center">
        <img className="rounded-4xl p-3" width="700px" src="/about2.jpg" alt="" />
      </div>
      <div className="px-5 py-7">
        <div className="text-5xl font-bold ">About us</div>
        <div className="text-xl mt-20">
          Welcome to AHR traders your trusted destination for the latest
          laptops, unbeatable deals, and expert advice. We are passionate about
          technology and believe that the right laptop can unlock endless
          possibilities. Whether you're a student, professional, gamer, or
          casual user, we are here to help you find the perfect device that fits
          your lifestyle and budget. At AHR traders, we offer a wide
          selection of laptops from top brands like Dell, HP, Apple, Lenovo,
          ASUS, and more. From high-performance machines to sleek and portable
          notebooks, our curated collection is designed to meet every need. What
          sets us apart?
          <ol className="text-xl list-disc list-inside">
            <li>
              <span className="font-bold">Genuine Products:</span> 100%
              authentic laptops with manufacturer warranty.
            </li>
            <li>
              <span className="font-bold">Expert Guidance:</span> Tech-savvy
              support to help you make informed choices..
            </li>
            <li>
              <span className="font-bold">Fast Shipping:</span> Quick and
              reliable delivery to your doorstep.
            </li>
            <li>
              <span className="font-bold">Customer Satisfaction:</span>{" "}
              Hassle-free returns and dedicated support.
            </li>
          </ol>
        </div>
        <div className="mt-5 text-xl">
          <div className="text-2xl font-bold">Our Mission</div>
          <div>
            At AHR traders, our mission is simple: To make high-quality
            laptops accessible, affordable, and understandable for everyone. We
            aim to bridge the gap between technology and people by providing:
            <ol className="text-xl list-disc list-inside py-3">
              <li>Reliable products at fair prices</li>
              <li>Transparent information with no tech jargon</li>
              <li>A seamless online shopping experience</li>
              <li>Friendly support before and after your purchase</li>
            </ol>
            We believe that the right laptop can empower people to learn more,
            do more, and be more — and we're here to make that happen.
          </div>
        </div>
      </div>
    </div>
      <div className="2xl:w-[1532px] w-screen justify-self-center py-13 space-y-12">
            <div className="lg:text-4xl text-3xl font-bold px-5">
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

export default Page;
