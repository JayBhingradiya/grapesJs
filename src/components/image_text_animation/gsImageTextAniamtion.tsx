import { Editor } from "grapesjs";
import React from "react";
import { createRoot } from "react-dom/client";
import ImageTextAnimation from "./imageTextAnimation";

const GsImageTextAnimation = (editor: Editor) => {
  const defaultData = {
    image1:
      "https://cdn.prod.website-files.com/60eeb025115a75902b86a796/647e3cc83822b06137a15c00_Header%201%20Left-p-1080.jpg",
    image2:
      "https://cdn.prod.website-files.com/60eeb025115a75902b86a796/647e3ccc6c2ce83328c9b669_Header%202%20Right-p-1080.jpg",
    date: "MARCH 2023",
    text: "GREENLAND",
    title: "Visit Greenland",
    buttonText: "SEE CASE STUDY",
    componentNo: 1,
  };
  editor.Components.addType("imageTextAnimation", {
    model: {
      defaults: {
        tagName: "div",
        draggable: true,
        droppable: true,
        editable: true,
        attributes: {
          image1: defaultData.image1,
          image2: defaultData.image2,
          date: defaultData.date,
          text: defaultData.text,
          title: defaultData.title,
          buttonText: defaultData.buttonText,
        },
        traits: [
          { type: "text", name: "componentNo", label: "Component No" },
          { type: "text", name: "image1", label: "Image1" },
          { type: "text", name: "image2", label: "Image2" },
          { type: "text", name: "date", label: "Date" },
          { type: "text", name: "text", label: "Text" },
          { type: "text", name: "title", label: "Title" },
          { type: "text", name: "buttonText", label: "buttonText" },
        ],
      },
    },
    view: {
      onRender({ el, model }) {
        const root = createRoot(el);
        const attributes = model.get("attributes");
        const image1 = attributes?.image1 || defaultData.image1;
        const image2 = attributes?.image2 || defaultData.image2;
        const date = attributes?.date || defaultData.date;
        const text = attributes?.text || defaultData.text;
        const title = attributes?.title || defaultData.title;
        const buttonText = attributes?.buttonText || defaultData.buttonText;
        const componentNo = attributes?.componentNo || defaultData.componentNo;

        console.log("attr", attributes);
        root.render(
          <ImageTextAnimation
            data={{
              image1,
              image2,
              text,
              title,
              buttonText,
              date,
              componentNo,
            }}
          />
        );
      },
    },
  });
  editor.BlockManager.add("image_Text_Animation", {
    label: "imageTextAnimation",
    category: "React-component",
    content: {
      type: "imageTextAnimation",
    },
  });
};

export default GsImageTextAnimation;
