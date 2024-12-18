import React, { useState } from "react";
import { FiMinus, FiPlus } from "react-icons/fi";

const TabAccordian = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const accordianData = [
    {
      id: 1,
      title1: "Woolworths",
      title2: "Research - Strategy",
      description:
        "Working closely with Woolworths within a SPRINT framework, we undertook extensive primary and secondary user research as well as user experience testing with the client's desired target audience. The result was a tested and validated savings and budgeting proposition.",
    },
    {
      id: 2,
      title1: "Sneaker LAB",
      title2: "DESIGN",
      description:
        "Sneaker LAB specialises in the development, marketing and distribution of cleaning, care and protection products for shoes. We created a simple, clean, and frictionless online experience that embodied the key service attributes that are received at the Sneaker Lab brick and mortar stores. We also highlighted their commitment to communities and the planet by visually dialling up their positioning around being “built on a green philosophy” and a “culture of care”.",
    },
    {
      id: 3,
      title1: "Batoka Hospitality",
      title2: "Research - Strategy - Design - Development",
      description:
        "We've been providing HKLM with ongoing web design, development, and optimisation services since 2018. Our team has built web properties for some of South Africa's most well known brands within the hospitality and education sectors - Tswalu Game Reserve, Richfield, and AAA School of Advertising to name a few.",
    },
    {
      id: 4,
      title1: "Digitas Liquorice",
      title2: "Design",
      description:
        "Digitas Liquorice is owned by the Publicis Groupe - one of the world's leading communications groups. They brought us in to assist with the redesign of four Unilever brand websites - starting with wireframes and ending with high-fidelity designs which were then handed over to the Unilever development team.",
    },
    {
      id: 5,
      title1: "Batoka Hospitality",
      title2: "Research - Strategy - Design - Development",
      description:
        "We were appointed lead creative agency to conceptualise the Batoka brand and develop their digital presence in order to promote travel and tourism throughout Africa. To date, we have built the brand identities and websites for both sub-brands. Batoka Safaris is the destination management business and Batoka Lodges, the accommodation management business - with two incredible locations in and around Victoria Falls.",
    },
    {
      id: 6,
      title1: "SENDMARC",
      title2: "Strategy - Design - Development",
      description:
        "Sendmarc automates the process of protecting your domain from being used in email impersonation and phishing attacks. We created a clean yet striking online experience, which effectively displayed Sendmarc's content and key business messaging in an efficient and engaging way. This has led to an increase in traffic to the website as well as engaged prospects and leads.",
    },
    {
      id: 7,
      title1: "VANA",
      title2: "Research - Strategy - Design - Development",
      description:
        "Vana is an emerging wellness brand, focussed on the power of breathing. We were contracted to create their brand identity and build an app that promotes meditative breath work and wellness. The creative idea was rooted in the concept of finding balance between calmness and energy - creating a beautiful tension that translates to flow, movement and confidence.",
    },
    {
      id: 8,
      title1: "Fairways to Africa",
      title2: "Design - Development",
      description:
        "Fairways to Africa creates once-in-a-lifetime golf and leisure experiences. We were approached by Fairways to Africa to create a slick and simple digital presence that would appeal to their young, jet-setting target market. Their main goal was to create a web experience that would set them apart as a small and passionate team of avid golfers who focus on unforgettable customised golf travel for their clients.",
    },
    {
      id: 9,
      title1: "FINCHECK",
      title2: "Research - Strategy - Design - Development",
      description:
        "Fincheck's mission is to help South Africans make better financial decisions. We were contracted to reinvigorate Fincheck's digital platform with a specific focus on improving overall brand consistency, and to establish them as a trusted and credible brand within the financial services industry. Our main objective was to improve the user experience of the application process to inspire higher conversion rates when users applied for specific lending verticals. We also increased customer value by improving time on site with easy browsing and streamlined navigation.",
    },
    {
      id: 10,
      title1: "PARROT PRINT",
      title2: "Research - Design",
      description:
        "Parrotprint.com is one of the web's leading personalised photo-to-canvas print brands. The brief was to rebrand and transform the company from what felt like a physical printing factory to a premium, intelligent, online brand - designed for a digital economy. Our team undertook a brand refresh that visually positioned the business as an online printing platform. We also worked closely with Conversion Rate Experts to redesign the website's user interfaces.",
    },
    {
      id: 11,
      title1: "Sophie Dallamore",
      title2: "Design - Development",
      description:
        "Having spent a number of years perfecting her craft as a stylist for the likes of Burberry, Liberty and Boutique One, Sophie decided to start her own fashion consulting and styling business. She contracted us to assist with brand conceptualisation and roll-out of key brand assets. The team also worked closely with Sophie to build out her website so she could promote her services online.",
    },
    {
      id: 12,
      title1: "& Tomorrow",
      title2: "Strategy - Design - Development",
      description:
        "& Tomorrow is a Cape Town based production agency that creates inspiring global content - predominantly focussed on sport. The client has been doing sports production for a number of years, and wanted to reposition and refresh their business to showcase the work they were producing. We were brought in from the very start - conceptualising the brand name all the way through to web design that reflects a bold, impactful and modern brand.",
    },
  ];

  const toggleAccordion = (index: number) => {
    if (openIndex === index) {
      setOpenIndex(null);
    } else {
      setOpenIndex(index);
    }
  };

  return (
    <section className="px-5 py-11 w-full h-full overflow-hidden">
      <div className="w-full h-full  mx-auto">
        <div>
          {accordianData.map((data) => {
            return (
              <div
                key={data.id}
                className="block border-b-2 border-gray-400 px-6 pt-5 pb-4 mt-4 cursor-pointer hover:border-black transform transition-all duration-900 ease-in-out"
                onClick={() => toggleAccordion(data.id)}
              >
                <div className="flex justify-between w-full">
                  <div className="font-semibold w-6/12">{data.title1}</div>
                  <div className="flex flex-col w-6/12">
                    <div className="flex flex-row justify-between">
                      <div>
                        <h2>{data.title2}</h2>
                      </div>
                      <div className="flex justify-center">
                        {openIndex === data.id ? (
                          <>
                            <div>Less</div>
                            <div className="pt-1">
                              <FiMinus />
                            </div>
                          </>
                        ) : (
                          <>
                            <div>more</div>
                            <div className="pt-1">
                              <FiPlus />
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                    {openIndex === data.id && (
                      <div className="text-sm mt-3 overflow-hidden text-gray-700">
                        {data.description}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TabAccordian;
