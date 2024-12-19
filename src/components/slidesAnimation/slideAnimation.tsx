import React, { useEffect, useRef } from "react";

const SlideAnimation = () => {
  const sectionData = [
    {
      id: 1,
      alt: "Image 1",
      image:
        "https://www.hampy.be/Portals/0/dtxArt/blok-galerij/afbeelding/bestand/WIT20240305140550cropmed_klein_411c937d-867d-442c-8318-25a4c88a98a6.jpg",
    },
    {
      id: 2,
      alt: "Image 2",
      image:
        "https://www.hampy.be/Portals/0/dtxArt/blok-galerij/afbeelding/bestand/WIT20240305103935editcropmed_klein_a9d418d1-18c8-45f3-af63-24ae92a08c86.jpg",
    },
    {
      id: 3,
      alt: "Image 3",
      image:
        "https://www.hampy.be/Portals/0/dtxArt/blok-galerij/afbeelding/bestand/WIT20240305105755editmed_klein_724ccac2-9a39-48bb-81be-f20e40931c60.jpg",
    },
    {
      id: 4,
      alt: "Image 4",
      image:
        "https://www.hampy.be/Portals/0/dtxArt/blok-galerij/afbeelding/bestand/WIT20240305102459editmed_klein_e474653a-033c-41c6-ab30-65f14f925340.jpg",
    },
    {
      id: 5,
      alt: "Image 5",
      image:
        "https://www.hampy.be/Portals/0/dtxArt/blok-galerij/afbeelding/bestand/WIT20240305102459editmed_klein_e474653a-033c-41c6-ab30-65f14f925340.jpg",
    },
    {
      id: 6,
      alt: "Image 6",
      image:
        "https://www.hampy.be/Portals/0/dtxArt/blok-galerij/afbeelding/bestand/WIT20240305143055editmed_klein_1552e892-367d-4e1c-aa6b-feb03532a424.jpg",
    },
    {
      id: 7,
      alt: "Image 7",
      image:
        "https://www.hampy.be/Portals/0/dtxArt/blok-galerij/afbeelding/bestand/WIT20240305155846editcropmed_klein_b7fa8cb5-3fb5-4ceb-91ed-905dd56c25bc.jpg",
    },
  ];
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const speed1 = 0.3;
    const speed2 = -0.5;

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (row1Ref.current && row2Ref.current) {
        row1Ref.current.style.transform = `translateX(${
          scrollPosition * speed1
        }px)`;
        row2Ref.current.style.transform = `translateX(${
          scrollPosition * speed2
        }px)`;
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section className="my-5 mx-5 overflow-hidden">
      <div className="flex flex-col gap-3 items-center justify-evenly h-full w-full max-w-full">
        <div ref={row1Ref} className="flex gap-3">
          {sectionData?.map((data) => {
            return (
              <img
                key={data.id}
                src={data.image}
                alt={data.alt}
                className="inline-block object-cover rounded-md"
              />
            );
          })}
        </div>
        <div ref={row2Ref} className="flex gap-3">
          {sectionData?.map((data) => {
            return (
              <img
                key={data.id}
                src={data.image}
                alt={data.alt}
                className="inline-block object-cover rounded-md"
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SlideAnimation;
