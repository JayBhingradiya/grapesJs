"use client";
import React, { useRef } from "react";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const PrevBtn = (props: any) => {
  const { onClick } = props;
  return (
    <button
      name="Previous"
      className="bg-light-gray bg-opacity-90 flex justify-center items-center w-10 h-10 rounded-md shadow-md focus:outline-none"
      onClick={onClick}
    >
      <svg
        viewBox="0 0 20 20"
        fill="currentColor"
        className="chevron-left w-10 h-10"
      >
        <path
          fillRule="evenodd"
          d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
          clipRule="evenodd"
        ></path>
      </svg>
    </button>
  );
};

const NextBtn = (props: any) => {
  const { onClick } = props;
  return (
    <button
      name="Next"
      className="bg-light-gray bg-opacity-90 flex justify-center items-center w-10 h-10 rounded-md shadow-md focus:outline-none"
      onClick={onClick}
    >
      <svg
        viewBox="0 0 20 20"
        fill="currentColor"
        className="chevron-right w-10 h-10"
      >
        <path
          fillRule="evenodd"
          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
          clipRule="evenodd"
        ></path>
      </svg>
    </button>
  );
};

const Review = () => {
  const swiperRef = useRef<any>(null);

  const previewCardData = [
    {
      description:
        " I appreciate the variety of styles available on this website. It's so easy to find something I love!",
      city: "New York, NY",
      name: "Emily F.",
    },
    {
      description:
        "I have received so many compliments on the outfits I have purchased from this website. It's my new go-to for fashion.",
      city: "Los Angeles, CA",
      name: "Jane D.",
    },
    {
      description:
        "I am so impressed with the customer service. They are responsive, friendly, and always willing to help.",
      city: "Los Angeles, CA",
      name: "Dana R.",
    },
    {
      description:
        "The clothes fit me perfectly, and they're true to size. It's so refreshing to find a website with consistent sizing!",
      city: "Los Angeles, CA",
      name: "Lilly A.",
    },
    {
      description:
        "I have never been able to find such unique and beautiful clothing before. This website has truly exceeded my expectations!",
      city: "Brooklyn, NY",
      name: "Samantha R. ",
    },
    {
      description:
        "I absolutely love the dresses I bought from this website! They are stylish, comfortable, and perfect for any occasion.",
      city: "Toronto, ON ",
      name: "Rachel F.",
    },
    {
      description:
        "I absolutely love the dresses I bought from this website! They are stylish, comfortable, and perfect for any occasion.",
      city: "Los Angeles",
      name: "Maria L.",
    },
  ];

  return (
    <section className="block p-20">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div>
            <div className="text-4xl font-bold">Reviews</div>
          </div>
        </div>

        <div className="ml-10">
          <div className="flex">
            <PrevBtn onClick={() => swiperRef.current?.sliderPrev()} />
            <NextBtn onClick={() => swiperRef.current?.slideNext()} />
          </div>
        </div>
      </div>
      <div className="mt-10">
        <ul className=" w-full">
          <Swiper
            slidesPerView={4}
            slidesPerGroup={1}
            className="mySwiper"
            modules={[Pagination]}
            pagination={{ clickable: true }}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
          >
            {previewCardData?.map((data, index) => {
              return (
                <SwiperSlide key={index}>
                  <li className=" p-4">
                    <div className="flex mb-3">
                      {Array.from({ length: 5 }).map((_, index) => {
                        return (
                          <div key={index} className=" p-1">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="15"
                              viewBox="0 0 16 15"
                            >
                              <path
                                fill="currentColor"
                                d="M3.612,15.443a.531.531,0,0,1-.746-.592l.83-4.73L.173,6.765a.556.556,0,0,1,.283-.95l4.9-.7L7.538.792a.513.513,0,0,1,.927,0l2.184,4.327,4.9.7a.556.556,0,0,1,.282.95l-3.522,3.356.83,4.73a.531.531,0,0,1-.746.592L8,13.187,3.611,15.443Z"
                                transform="translate(-0.001 -0.499)"
                              ></path>
                            </svg>
                          </div>
                        );
                      })}
                    </div>
                    <div>
                      <p>{data.description}</p>
                    </div>
                    <div className="pt-2">
                      <h4>{data?.name}</h4>
                      <h6>{data?.city}</h6>
                    </div>
                  </li>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </ul>
      </div>
    </section>
  );
};

export default Review;
