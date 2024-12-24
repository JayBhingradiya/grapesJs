"use client";
import React, { useEffect, useRef } from "react";

interface imageTextAnimation {
  image1: string;
  image2: string;
  text: string;
  title: string;
  buttonText: string;
  date: string;
  componentNo: number;
}

interface imageTextSectionData {
  data: imageTextAnimation;
}

const ImageTextAnimation = ({ data }: imageTextSectionData) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      console.warn("Container not found for component:", data.componentNo);
      return;
    }

    let iframe: HTMLIFrameElement | null = null;
    let doc: Document = document;
    let win: Window = window;

    try {
      iframe = document.querySelector("iframe");
      console.log("iframe", iframe);
      if (iframe?.contentDocument && iframe?.contentWindow) {
        doc = iframe.contentDocument;
        win = iframe.contentWindow;
      }
    } catch (error) {
      console.error("Error accessing iframe content:", error);
    }

    const handleScroll = () => {
      const viewportHeight = win.innerHeight || 0;
      const containerTop = container.getBoundingClientRect().top;
      const scrollPercentage = Math.max(
        0,
        Math.min(1, (viewportHeight - containerTop) / container.offsetHeight)
      );

      const leftImage = doc.querySelector(
        `.container${data.componentNo}-image-left`
      ) as HTMLElement | null;
      if (leftImage) {
        leftImage.style.transform = `translateY(-50%) translateX(-${
          scrollPercentage * 100
        }%)`;
      }

      const rightImage = doc.querySelector(
        `.container${data.componentNo}-image-right`
      ) as HTMLElement | null;
      if (rightImage) {
        rightImage.style.transform = `translateY(-50%) translateX(${
          scrollPercentage * 100
        }%)`;
      }

      const text = doc.querySelector(
        `#container${data.componentNo}text`
      ) as HTMLElement | null;
      if (text) {
        text.style.opacity = scrollPercentage > 0.2 ? "1" : "0";
      }
    };

    const observer = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            win.addEventListener("scroll", handleScroll);
          } else {
            win.removeEventListener("scroll", handleScroll);
          }
        });
      },
      { root: doc === document ? null : doc, threshold: 0.1 }
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
      win.removeEventListener("scroll", handleScroll);
    };
  }, [data.componentNo]);

  return (
    <div
      ref={containerRef}
      className={`container${data.componentNo} flex justify-between relative w-full h-screen overflow-hidden`}
    >
      <img
        src={data.image1}
        alt="Left Image"
        className={`rounded-xl absolute top-1/2 transform -translate-y-1/2 container${data.componentNo}-image-left`}
        style={{ left: "250px", width: "500px", height: "80%" }}
      />
      <div
        className="absolute text-white top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col justify-between items-center h-full opacity-0"
        id={`container${data.componentNo}text`}
        style={{ height: "80%" }}
      >
        <div className="flex gap-3">
          <h1>{data.date}</h1>
          <h2>{data.text}</h2>
        </div>
        <div>
          <h1 className="font-bold text-white text-5xl text-center">
            {data.title}
          </h1>
        </div>
        <div>
          <button className="border-2 rounded-full p-5">
            {data.buttonText}
          </button>
        </div>
      </div>
      <img
        src={data.image2}
        alt="Right Image"
        style={{ right: "250px", width: "500px", height: "80%" }}
        className={`rounded-xl absolute top-1/2 right-[50px] transform -translate-y-1/2 container${data.componentNo}-image-right`}
      />
    </div>
  );
};

export default ImageTextAnimation;
