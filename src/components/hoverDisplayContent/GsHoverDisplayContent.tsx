import { Editor } from "grapesjs";
import React from "react";
import { createRoot } from "react-dom/client";
import HoverDisplayContent from "./hoverDisplayContent";

const GsHoverDisplayContent = (editor: Editor) => {
  editor.Components.addType("hover-displayText", {
    view: {
      onRender({ el }) {
        const root = createRoot(el);
        root.render(<HoverDisplayContent />);
      },
    },
  });
  editor.BlockManager.add("hoverText", {
    label: "Hover Image Section",
    category: "React-component",
    content: {
      type: "hover-displayText",
    },
  });
};

export default GsHoverDisplayContent;
