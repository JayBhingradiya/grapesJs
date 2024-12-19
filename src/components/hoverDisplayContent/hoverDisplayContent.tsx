import React, { Fragment, useState } from "react";

const HoverDisplayContent = () => {
  const [openContentIndex, setOpenContentIndex] = useState<number | null>(null);

  const contentData = [
    {
      id: 1,
      title: "Jij zorgt voor de vuile was.",
      image:
        "https://www.hampy.be/Portals/0/dtxArt/blok-afbeelding/bestand/WIT20240305142422editcropmedpre_klein_bf63b383-3d09-4c0d-b2da-e5faca8dddda.jpg",
    },
    {
      id: 2,
      title: "Gebruik de Hampy-bags en plan jouw afhaalmoment in de app.",
      image:
        "https://www.hampy.be/Portals/0/dtxArt/blok-afbeelding/bestand/WIT20240305142721editcropmedpre_klein_c7c07218-4588-4f76-8649-14014cadd97c.jpg",
    },
    {
      id: 3,
      title: "Wij wassen en schrobben met ecologische producten.",
      image:
        "https://www.hampy.be/Portals/0/dtxArt/blok-afbeelding/bestand/WIT20240305114823editcrop2medpre_klein_831c14f6-4991-44f8-bb56-6a0a8cf46295.jpg",
    },
    {
      id: 4,
      title: "Heerlijk frisse was wordt aan je deur geleverd.",
      image:
        "https://www.hampy.be/Portals/0/dtxArt/blok-afbeelding/bestand/WIT20240305161721editcropmedpre_klein_29ab5104-9551-45d8-acc9-733407a9c928.jpg",
    },
    {
      id: 5,
      title: "Everybody hampy!",
      image:
        "https://www.hampy.be/Portals/0/dtxArt/blok-afbeelding/bestand/WIT20240305110301editcropmedpre_klein_d7ad4dfb-babe-4627-97d9-70a16b538cf8.jpg",
    },
  ];

  return (
    <section className="container mx-auto">
      {contentData?.map((data) => {
        return (
          <Fragment key={data.id}>
            <div className="w-full flex justify-between px-5 my-4">
              <div
                className="w-7/12 flex flex-row gap-6"
                onMouseEnter={() => setOpenContentIndex(data.id)}
                onMouseLeave={() => setOpenContentIndex(data.id)}
              >
                <div>
                  <div
                    className="w-12 h-12 rounded-full flex justify-center items-center"
                    style={{ backgroundColor: "#afdde5" }}
                  >
                    <h1 className="text-center">{data.id}</h1>
                  </div>
                </div>
                <div>
                  <h1 className="text-white text-2xl">{data.title}</h1>
                </div>
              </div>
              <div className="w-4/12 flex justify-center items-center">
                {data.id === openContentIndex && (
                  <img src={data.image} className="rounded-xl" />
                )}
              </div>
            </div>
            <div className="w-full">
              <hr className="border-gray-500" />
            </div>
          </Fragment>
        );
      })}
    </section>
  );
};

export default HoverDisplayContent;
