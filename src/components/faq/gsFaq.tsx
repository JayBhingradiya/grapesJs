import { Editor } from "grapesjs";
import React from "react";
import { createRoot } from "react-dom/client";
import TwoSectionSlider from "./faq";

const GsFaq = (editor: Editor) => {
  editor.Components.addType("faq-section", {
    view: {
      onRender({ el }) {
        const root = createRoot(el);
        root.render(<TwoSectionSlider />);
      },
    },
  });
  editor.BlockManager.add("faq-section", {
    label: "Faq Section",
    category: "React-component",
    content: {
      type: "faq-section",
    },
  });
};

export default GsFaq;
