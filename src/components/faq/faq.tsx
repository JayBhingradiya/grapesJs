"use client";
import React, { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const Faq = () => {
  const accordianData = [
    {
      title: "What is your return policy?",
      description:
        "We offer a 30-day return policy for all unused items in their original packaging.",
    },
    {
      title: "Do you offers international shipping?",
      description:
        "Yes, we offer worldwide shipping. Shipping rates and delivery times may vary by location.",
    },
    {
      title: "Do you offers gift cards?",
      description:
        "Yes, we offer gift cards in various denominations. They can be purchased online or in-store.",
    },
    {
      title: "Can i contact customer service for assitance?",
      description:
        "Yes, our customer service team is available via email, phone, or live chat to assist you with any questions or concerns you may have.",
    },
  ];
  const [openAccordian, setOpenAccordian] = useState(false);
  return (
    <section className="px-5 py-11 w-full overflow-hidden  bg-gray-200">
      <div className="w-full mx-auto">
        <div className="flex justify-center gap-4">
          <div className="w-4/12">
            <div className="block relative w-full h-full pb-4">
              <div className="text-5xl font-bold">
                Frequently Asked Questions
              </div>
              <div>
                {accordianData?.map((data, index) => {
                  return (
                    <div
                      className="block border border-gray-600 rounded-lg px-9 pt-5 pb-4 mt-8 cursor-pointer"
                      key={index}
                    >
                      <div
                        className="flex justify-between"
                        onClick={() => setOpenAccordian(true)}
                      >
                        <div className="font-semibold">{data?.title}</div>
                        <div>
                          {openAccordian ? (
                            <IoIosArrowUp />
                          ) : (
                            <IoIosArrowDown />
                          )}
                        </div>
                      </div>
                      {openAccordian && (
                        <div className="text-sm">{data.description}</div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="w-5/12">
            <div>
              <img
                src="https://amber-theme-demo.myshopify.com/cdn/shop/files/1329_12a08ae0-4f7d-4615-ad7a-4af5245dccde.jpg?v=1678544520&width=2000"
                className="border rounded-lg w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Faq;
