"use client";
import React, { useEffect, useState } from "react";
import ImageSlider from "@/components/customImageSlider/sliderComponents";
import SrollableLogos from "@/components/scrollableLogos/scrollableLogos";
import FeaturedCategory from "../featuredCategory/featuredCategory";
import BrAlphabet from "../brAlphabet/brAlphabet";
import LogoListing from "../logoLisitng/logoListing";
import Faq from "../faq/faq";
import Review from "../review/review";
import Slides from "../slides/slides";
import HoverTextSection from "../hoverTextSection/hoverTextSection";
import TabAccordian from "../tabAccordian/tabAccordian";
import SlideAnimation from "../slidesAnimation/slideAnimation";
import HoverDisplayContent from "../hoverDisplayContent/hoverDisplayContent";
import ImageTextAnimation from "../image_text_animation/imageTextAnimation";
import "../../../public/styles/globals.css";
import Listing from "../listing/listingComponents";

const renderComponent = (component: any, index: number) => {
  if (component.type === "textnode") {
    return component.content;
  }

  const { tagName, type, components, attributes, classes } = component;
  const Tag = tagName || "div";

  const classNameValue = Array.isArray(classes)
    ? classes
        .map((cls: any) => (typeof cls === "string" ? cls : cls.name || ""))
        .filter(Boolean)
        .join(" ")
    : typeof classes === "object" && classes.className
    ? classes.className
    : "";

  const elementProps = {
    className: classNameValue,
    ...attributes,
  };

  if (type === "image") {
    return (
      <img
        key={index}
        id={attributes?.id}
        src={attributes?.src}
        alt={attributes?.alt || "image"}
        className={classNameValue}
      />
    );
  }

  if (type === "button") {
    return (
      <button key={index} {...attributes} disabled>
        {components && components.map(renderComponent)}
      </button>
    );
  }
  if (type === "video") {
    return (
      <video
        key={index}
        src={component?.src}
        autoPlay={attributes?.autoPlay}
        controls={attributes?.controls}
        loop={attributes?.loop}
        muted
      ></video>
    );
  }

  if (type === "link") {
    return (
      <a key={index} href={attributes?.href || "#"} {...attributes}>
        {components && components.map(renderComponent)}
      </a>
    );
  }
  if (type === "custom-slider") {
    return <ImageSlider slides={attributes?.slides} key={index} />;
  }
  if (type === "slides") {
    return <Slides key={index} />;
  }
  if (type === "faq-section") {
    return <Faq key={index} />;
  }
  if (type === "hover-section") {
    return (
      <HoverTextSection
        data={{
          bgColor: attributes.bgColor,
          description: attributes?.description,
          height: attributes?.containerHeight,
          image: attributes?.imageSrc,
          title: attributes?.title,
        }}
        key={index}
      />
    );
  }
  if (type === "slide-animation") {
    return <SlideAnimation key={index} />;
  }
  if (type === "hover-displayText") {
    return <HoverDisplayContent key={index} />;
  }
  if (type === "review-list") {
    return <Review themedata={{ color: attributes.textColor }} key={index} />;
  }
  if (type === "imageTextAnimation") {
    return (
      <ImageTextAnimation
        key={index}
        data={{
          buttonText: attributes?.buttonText,
          date: attributes?.date,
          image1: attributes?.image1,
          image2: attributes?.image2,
          text: attributes?.text,
          title: attributes?.title,
          componentNo: attributes?.componentNo,
        }}
      />
    );
  }
  if (type === "react-listing") {
    return <Listing data={attributes?.date} key={index} />;
  }

  return (
    <Tag key={index} {...elementProps}>
      {components &&
        components.map((child: any, idx: number) =>
          renderComponent(child, idx)
        )}
    </Tag>
  );
};

const Preview = ({ pageId }: { pageId: string }) => {
  const [finalData, setFinalData] = useState<any>([]);
  const [stylesData, setStylesData] = useState<[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `/api/loadGrapesData?id=${pageId || "grapesjs"}`
        );
        const data = await response.json();
        setFinalData(data.data.data.pages[0].frames[0].component.components);
        setStylesData(data.data.data.styles);
      } catch (error) {
        console.error("Error loading component data:", error);
      }
    };

    fetchData();
  }, [pageId]);

  useEffect(() => {
    if (stylesData) {
      const styleTag = document.createElement("style");
      styleTag.textContent = stylesData
        .map((style: any) => {
          const cssString = Object.entries(style.style)
            .map(([key, value]) => `${key}: ${value};`)
            .join(" ");

          const selector = style.selectors[0]?.name
            ? `.${style.selectors[0].name}`
            : `${style.selectors}`;
          if (style.mediaText) {
            return `@media ${style.mediaText} { ${selector} {${cssString}}}`;
          } else if (style.state === "hover") {
            return `${selector}:hover {${cssString}}`;
          } else {
            return `${selector} {${cssString}}`;
          }
        })
        .join(" ");
      document.head.appendChild(styleTag);

      return () => {
        document.head.removeChild(styleTag);
      };
    }
  }, [stylesData]);

  return (
    <div>
      {finalData.map((item: any, index: number) => {
        if (item.type === "custom-slider") {
          return <ImageSlider slides={item.attributes?.slides} key={index} />;
        } else if (item.type === "Slider-logos") {
          return (
            <SrollableLogos slides={item.attributes?.logoSlides} key={index} />
          );
        } else if (item.type === "dynamic-products") {
          return (
            <FeaturedCategory
              key={index}
              serverSideData={item?.attributes?.serverSideData}
            />
          );
        } else if (item.type === "logo-listing") {
          return <LogoListing key={index} />;
        } else if (item.type === "alphabet-listing-section") {
          return <BrAlphabet key={index} />;
        } else if (item.type === "two-section") {
          return <Faq key={index} />;
        } else if (item.type === "review-list") {
          return (
            <Review
              themedata={{ color: item.attributes.textColor }}
              key={index}
            />
          );
        } else if (item.type === "slides") {
          return <Slides key={index} />;
        } else if (item.type === "faq-section") {
          return <Faq key={index} />;
        } else if (item.type === "hover-section") {
          return (
            <HoverTextSection
              data={{
                bgColor: item.attributes.bgColor,
                description: item.attributes?.description,
                height: item.attributes?.containerHeight,
                image: item.attributes?.imageSrc,
                title: item.attributes?.title,
              }}
              key={index}
            />
          );
        } else if (item.type === "tab-accordian") {
          return <TabAccordian key={index} />;
        } else if (item.type === "slide-animation") {
          return <SlideAnimation key={index} />;
        } else if (item.type === "hover-displayText") {
          return <HoverDisplayContent key={index} />;
        } else if (item.type === "imageTextAnimation") {
          return (
            <ImageTextAnimation
              key={index}
              data={{
                buttonText: item.attributes?.buttonText,
                date: item.attributes?.date,
                image1: item.attributes?.image1,
                image2: item.attributes?.image2,
                text: item.attributes?.text,
                title: item.attributes?.title,
                componentNo: item.attributes?.componentNo,
              }}
            />
          );
        } else if (item.type === "react-listing") {
          return <Listing data={item.attributes?.date} key={index} />;
        } else {
          return <div key={index}>{renderComponent(item, index)}</div>;
        }
      })}
    </div>
  );
};

export default Preview;
