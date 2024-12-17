import { Editor } from "grapesjs";
import React from "react";
import { createRoot } from "react-dom/client";
import HoverTextSection from "./hoverTextSection";

const GsHoverTextSection = (editor: Editor) => {
  const defaultSlide = {
    image:
      "https://www.datocms-assets.com/111290/1718387192-fluid.png?fit=max&fm=webp&h=3000&w=2000",
    title: "Revealed Content",
    bgColor: "bg-gray-800",
    height: "500",
    description:
      "This text is always present but hidden behind the image. On hover, the image shrinks to reveal this content.",
  };

  editor.Components.addType("hover-section", {
    model: {
      defaults: {
        tagName: "div",
        draggable: true,
        droppable: true,
        editable: true,
        attributes: {
          imageSrc: defaultSlide.image,
          title: defaultSlide.title,
          description: defaultSlide.description,
          bgColor: defaultSlide.bgColor,
          height: defaultSlide.height,
        },
        traits: [
          {
            type: "text",
            name: "imageSrc",
            label: "Image URL",
          },
          {
            type: "text",
            name: "title",
            label: "Title",
          },
          {
            type: "text",
            name: "description",
            label: "Description",
          },
          {
            type: "color",
            name: "bgColor",
            label: "backgroundColor",
          },
          {
            type: "number",
            name: "containerHeight",
            label: "Height",
          },
        ],
      },
    },
    view: {
      async onRender({ el, model }) {
        const root = createRoot(el);

        const attributes = model.get("attributes");

        const image = attributes?.imageSrc || defaultSlide.image;
        const title = attributes?.title || defaultSlide.title;
        const description = attributes?.description || defaultSlide.description;
        const bgColor = attributes?.bgColor || defaultSlide.bgColor;
        const height = attributes?.containerHeight || defaultSlide.height;

        root.render(
          <HoverTextSection
            data={{ image, title, description, bgColor, height }}
          />
        );
      },
    },
  });

  editor.BlockManager.add("hover-text-section", {
    label: "Hover text section",
    category: "React-component",
    content: { type: "hover-section" },
  });
};

export default GsHoverTextSection;
