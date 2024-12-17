import React from "react";

interface hoverSection {
  image: string;
  title: string;
  description: string;
  bgColor: string;
  height: string;
}
interface hoverSectionData {
  data: hoverSection;
}

const HoverTextSection = ({ data }: hoverSectionData) => {
  return (
    <section
      className="relative group w-full h-full overflow-hidden rounded-xl"
      style={{ height: `${data?.height}px` }}
    >
      <div
        className={`absolute top-0 left-0 w-full h-full text-white flex justify-end flex-col text-left p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
        style={{ zIndex: 2, backgroundColor: data.bgColor }}
      >
        <img
          className="w-full h-full object-cover rounded-xl"
          src={data?.image}
          alt="Sample Image"
        />
        <p className="text-4xl mb-4 max-w-[70%]">{data?.title}</p>
        <p className="text-lg max-w-[70%]">{data?.description}</p>
      </div>

      <div
        className="absolute top-0 left-0 w-full h-full group-hover:scale-90 group-hover:opacity-90 transition-all duration-500"
        style={{ zIndex: 1 }}
      >
        <img
          className="w-full h-full object-cover"
          src={data?.image}
          alt="Sample Image"
        />
      </div>
    </section>
  );
};

export default HoverTextSection;
