/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { MdStar } from "react-icons/md";
import img1 from "../../assets/unsplash_img1.png";
import img2 from "../../assets/unsplash_img2.png";
import profile from "../../assets/Intersect.svg";
import profile2 from "../../assets/Intersect2.svg";
import profile3 from "../../assets/Intersect3.svg";
export default function ImagePanel({ autoSlide = true, autoSlideInterval = 5000 }) {
  const [curr, setCurr] = useState(0);
  const slides = [img1, img2];
  const next = () =>
    setCurr((curr) => (curr === slides.length - 1 ? 0 : curr + 1));

  useEffect(() => {
    if (!autoSlide) return;
    const slideInterval = setInterval(next, autoSlideInterval);
    return () => clearInterval(slideInterval);
  });

  return (
    <div className="overflow-hidden relative">
      <div
        className={`flex transition ease-out duration-40 w-[864px] h-[975px]`}
        style={{
          transform: `translateX(-${curr * 100}%)`,
        }}
      >
        {slides.map((s, i) => {
          return <img key={i} src={s} className={"object-cover"} />;
        })}
      </div>

      <div className="absolute bottom-12 left-16 w-[600px]">
        <h1 className="font-greatMango text-white text-5xl tracking-wider leading-[120%]">
          POWERED BY CREATORS AROUND THE WORLD
        </h1>
        <p className="text-white text-2xl mb-8">
          Collaborate with your favourite influencers from trending social media
          platforms easily
        </p>
        <div className="flex gap-3 ">
          <div className="flex -space-x-2 overflow-hidden">
            <img
              className="inline-block h-10 w-10 rounded-full ring-0 ring-white"
              src={profile}
              alt=""
            />
            <img
              className="inline-block h-10 w-10 rounded-full ring-0 ring-white"
              src={profile2}
              alt=""
            />
            <img
              className="inline-block h-10 w-10 rounded-full ring-0 ring-white"
              src={profile3}
              alt=""
            />
            <img
              className="inline-block h-10 w-10 rounded-full ring-0 ring-white"
              src={profile}
              alt=""
            />
          </div>
          <div>
            <span className="flex text-[#FFB700] text-2xl gap-1 items-center">
              <MdStar />
              <MdStar />
              <MdStar />
              <MdStar />
              <MdStar />
              <span className="text-white text-base">5.0</span>
            </span>
            <span className="text-white">200+ Influencer joined</span>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 py-4 flex justify-center gap-3 w-full"></div>
    </div>
  );
}
