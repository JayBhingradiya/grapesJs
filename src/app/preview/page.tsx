"use client";
import ImageSlider from "@/components/customImageSlider/sliderComponents";
import FeaturedCategory from "@/components/featuredCategory/featuredCategory";
import React, { useEffect, useState } from "react";

interface DataStructure {
  components: any[];
}

const Preview = () => {
  const [data, setData] = useState<DataStructure | null>(null);

  useEffect(() => {
    const getJsonData = async () => {
      const jsonData = await fetch("/grapesJsData.json");
      const finalData = await jsonData.json();
      setData(finalData);
    };
    getJsonData();
  }, []);

  return (
    <section id="allContents">
      {data?.components?.map((item, index) => {
        if (item.type === "custom-slider") {
          return <ImageSlider key={index} slides={item?.attributes?.slides} />;
        } else if (item.type === "dynamic-products") {
          return (
            <FeaturedCategory
              key={index}
              serverSideData={item?.attributes?.serverSideData}
            />
          );
        } else {
          return (
            <>
              <style>{item.css}</style>
              <div
                key={index}
                dangerouslySetInnerHTML={{ __html: item.html }}
              />
            </>
          );
        }
      })}
    </section>
  );
};

export default Preview;
