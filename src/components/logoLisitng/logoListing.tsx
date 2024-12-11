import axios from "axios";
import React, { useEffect, useState } from "react";

const LogoListing = () => {
  const [logoData, setLogoData] = useState<[]>([]);

  useEffect(() => {
    const getLogoData = async () => {
      await axios
        .post(
          "https://lanofrontapi.lanoequip.com/CmsComponents/getpagecomponents.json",
          {
            pageId: 87,
            type: "Topic",
          }
        )
        .then((data: any) => {
          const logoList = data?.data?.data?.find((data: any) =>
            data.html.includes("Brands_Display_Box")
          );
          if (logoList) {
            const parseData = JSON.parse(logoList.selectedVal);
            setLogoData(parseData?.dynamic.value);
          }
        })
        .catch((err) => console.log(err));
    };
    getLogoData();
  }, []);

  return (
    <div className="w-full mx-auto">
      <div className="w-full px-3.5 mx-auto">
        <div className="w-full">
          <div className="mx-auto pt-2.5 pb-2.5">
            <div className="w-full">
              <div className="flex flex-wrap">
                {logoData?.map((data: any) => {
                  return (
                    <div
                      className="w-full lg:w-1/4 px-3 mt-3 mb-3"
                      key={data.index}
                    >
                      <div className="border border-blue-500 relative">
                        <div className="flex justify-center items-center">
                          <a href="/bobcat-equipment.html">
                            <img
                              className="w-full mx-auto"
                              alt={data.Image_alt}
                              title={data.Image_alt}
                              src={data.Image}
                            />
                          </a>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoListing;
