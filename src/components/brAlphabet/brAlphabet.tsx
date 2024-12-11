"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";

const BrAlphabet = () => {
  const [alphabetData, setAlphabetData] = useState<[] | null>();

  const allAlphabets = new Array(26)
    .fill("undefined")
    .map((char, index) => String.fromCharCode(index + 65));

  useEffect(() => {
    const getAlphabetData = async () => {
      await axios
        .get(
          "https://lanofrontapi.lanoequip.com/Brand/getbrandbystoreid/5.json"
        )
        .then((apiData: any) => {
          const alphabetApiData = apiData?.data?.data;
          setAlphabetData(alphabetApiData);
        });
    };
    getAlphabetData();
  }, []);

  const highlightBrand = (character: string) => {
    const iframe = document?.querySelector("iframe");
    let element: HTMLElement | null = null;
    if (iframe) {
      const iframeContent = iframe?.contentDocument;
      element = iframeContent?.getElementById(character) || null;
    } else {
      element = document?.getElementById(character);
    }
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative py-7">
      <div className="pl-4 pr-4 mx-auto max-w-full">
        <div className="w-full flex flex-wrap">
          <div className="lg:w-2/12 W-full pt-10">
            <div
              className="text-2xl mb-6 pt-3 pb-3 sm:sticky sm:top-32"
              id="list-id"
            >
              <div className="text-2xl ml-2 mr-2 font-semibold pb-7">
                <span className="uppercase relative pb-4 after:content-[''] after:bottom-0 after:left-0 after:absolute after:w-14 after:h-1.5 after:bg-black">
                  Brands
                </span>
              </div>
              <button
                title="##"
                className="ml-2 mr-2 border-b border-b-solid border-blue-600 pb-3 inline-block font-semibold hover:text-anchor hover:border-anchor-hover text-[#a7a8a9] cursor-not-allowed"
              >
                #
              </button>
              {allAlphabets.map((char, index) => {
                return (
                  <button
                    key={index}
                    title={char}
                    className="ml-2 mr-2 border-b border-b-solid border-blue-600 pb-3 inline-block font-semibold hover:text-anchor hover:border-black text-[#a7a8a9]"
                    onClick={() => highlightBrand(char)}
                  >
                    {char}
                  </button>
                );
              })}
            </div>
          </div>
          <div className="lg:w-8/12 W-full">
            <div className="flex flex-wrap lg:ml-10 lg:mr-10 bg-gray-100 pt-10 lg:pl-6 lg:pr-6">
              {allAlphabets.map((al, index) => {
                const filterData = alphabetData?.filter(
                  (el: any) => el.brandName[0].toUpperCase() === al
                );

                if (filterData?.length === 0) return null;
                return (
                  <div key={index} className="w-full pl-3 mt-2 mb-2">
                    <div
                      className="text-5xl font-bold mb-2 cursor-pointer"
                      id={al}
                    >
                      {al.toUpperCase()}
                    </div>
                    <div className="mb-2 flex flex-wrap">
                      {filterData?.map((data: any, index) => {
                        return (
                          <div key={index} className="mr-5 mb-2">
                            <a
                              className="text-xl mb-1 text-anchor-hover hover:text-anchor"
                              title={data.brandName}
                            >
                              {data.brandName}
                            </a>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrAlphabet;
