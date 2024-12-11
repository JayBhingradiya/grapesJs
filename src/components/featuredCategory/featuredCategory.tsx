import React, { useEffect, useState } from "react";
import { SwiperSlide, Swiper } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import axios from "axios";
interface FeaturedCategoryProps {
  serverSideData: { value: any[] };
}

const FeaturedCategory = ({ serverSideData }: FeaturedCategoryProps) => {
  const [activetab, setActiveTab] = useState("Patagonia");
  const [data, setData] = useState<any[] | null>(null);

  const ServerData = serverSideData?.value?.map((data) => data);
  const tabData = ServerData?.find((name) => name.tabName === activetab);
  console.log("tabData", tabData);

  useEffect(() => {
    const fetchDataFromName = async () => {
      await axios({
        method: "POST",
        url: "https://cg-prod.parsonskellogg.services/StoreProduct/getfeaturedproductitemsbytagnameandsename.json",
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          sename: tabData?.selectedBrands?.[0].value,
          type: "Brand",
          storeId: 5,
          maximumItemsForFetch: 16,
          tagName: "featured",
        },
      })
        .then((productData: any) => {
          setData(productData?.data?.data);
        })
        .catch((err) => console.log(err));
    };
    fetchDataFromName();
  }, [activetab]);

  return (
    <section className="text-center py-10">
      <>
        <div className="flex justify-center space-x-4 mb-3">
          {ServerData?.map((name: any, index: number) => {
            return (
              <button
                className={`text-anchor border-b-2 ${
                  name.tabName == activetab
                    ? "text-blue-500 border-blue-500 border-2 p-2"
                    : "text-black border-black"
                }`}
                key={index}
                onClick={() => setActiveTab(name.tabName)}
              >
                {name.tabName}
              </button>
            );
          })}
        </div>

        <Swiper
          navigation
          modules={[Navigation]}
          className="mySwiper"
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
            1200: {
              slidesPerView: 4,
            },
          }}
        >
          {(data || []).map((data: any) => {
            return (
              <SwiperSlide key={data?.productId}>
                <div className="w-full px-2">
                  <div className="border border-gray-50 px-6 py-6 bg-white relative h-auto">
                    <div>
                      <div className="inline-block w-auto h-auto m-auto">
                        <img
                          className="object-contain"
                          height={350}
                          width={350}
                          src={`https://storagemedia.corporategear.com/${data?.imageUrl}`}
                          alt={data?.brandSename}
                        />
                      </div>

                      <div
                        className={`absolute top-0 left-0  ${data.productTagViewModel?.[0]?.tagPosition}`}
                      >
                        {data.productTagViewModel.length > 0 && (
                          <img
                            src={`https://storagemedia.corporategear.com/${data.productTagViewModel?.[0]?.imagename}`}
                            alt={data.productTagViewModel?.[0]?.imagename}
                          />
                        )}
                      </div>
                    </div>
                    <div>
                      <div className="inline-block text-center h-auto cursor-pointer">
                        <img
                          src={`https://storagemedia.corporategear.com/${data.productBrandLogo}`}
                          alt=""
                        />
                      </div>
                      <div
                        className="text-base p-2 text-blue-700 text-center"
                        style={{ height: "50px" }}
                      >
                        <a className="overflow-hidden w-full ">
                          {data?.productName}
                        </a>
                      </div>
                      <div className="mt-3 text-[#000000] text-base tracking-wider">
                        <span className="font-bold">MSRP ${data.msrp}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </>
    </section>
  );
};

export default FeaturedCategory;
