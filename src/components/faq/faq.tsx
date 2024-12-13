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
      title: "Do you offer international shipping?",
      description:
        "Yes, we offer worldwide shipping. Shipping rates and delivery times may vary by location.",
    },
    {
      title: "Do you offer gift cards?",
      description:
        "Yes, we offer gift cards in various denominations. They can be purchased online or in-store.",
    },
    {
      title: "Can I contact customer service for assistance?",
      description:
        "Yes, our customer service team is available via email, phone, or live chat to assist you with any questions or concerns you may have. For additional inquiries, please feel free to reach out to our support team anytime.",
    },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    if (openIndex === index) {
      setOpenIndex(null);
    } else {
      setOpenIndex(index);
    }
  };

  return (
    <section className="px-5 py-11 w-full h-full overflow-hidden">
      <div className="w-full h-full max-w-xl mx-auto">
        <div className="text-left mb-8">
          <h1 className="text-5xl font-bold">Frequently Asked Questions</h1>
        </div>
        <div>
          {accordianData?.map((data, index) => {
            return (
              <div
                className="block border border-gray-600 rounded-lg px-6 pt-5 pb-4 mt-4 cursor-pointer"
                key={index}
              >
                <div
                  className="flex justify-between items-center"
                  onClick={() => toggleAccordion(index)}
                >
                  <div className="font-semibold">{data?.title}</div>
                  <div>
                    {openIndex === index ? (
                      <IoIosArrowUp size={20} />
                    ) : (
                      <IoIosArrowDown size={20} />
                    )}
                  </div>
                </div>
                {openIndex === index && (
                  <div className="text-sm mt-3 overflow-hidden text-gray-700">
                    {data.description}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Faq;
