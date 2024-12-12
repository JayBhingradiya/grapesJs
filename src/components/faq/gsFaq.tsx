import { Editor } from "grapesjs";
import React from "react";
import { createRoot } from "react-dom/client";
import TwoSectionSlider from "./faq";

const GsFaq = (editor: Editor) => {
  editor.Components.addType("two-section", {
    view: {
      onRender({ el }) {
        const root = createRoot(el);
        root.render(<TwoSectionSlider />);
      },
    },
  });
  editor.BlockManager.add("two-section-list", {
    label: "Two Section",
    category: "React-component",
    content: {
      type: "two-section",
    },
  });
};

export default GsFaq;
