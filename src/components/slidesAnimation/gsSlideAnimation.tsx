import { Editor } from "grapesjs";
import React from "react";
import { createRoot } from "react-dom/client";
import SlideAnimation from "./slideAnimation";

const GsSlideAnimation = (editor: Editor) => {
  editor.Components.addType("slide-animation", {
    view: {
      onRender({ el }) {
        const root = createRoot(el);
        root.render(<SlideAnimation />);
      },
    },
  });
  editor.BlockManager.add("slideAnimation", {
    label: "Slide Animation",
    category: "React-component",
    content: { type: "slide-animation" },
  });
};

export default GsSlideAnimation;
