import { Editor } from "grapesjs";
import React from "react";
import TabAccordian from "./tabAccordian";
import { createRoot } from "react-dom/client";

const GsTabAccordian = (editor: Editor) => {
  editor.Components.addType("tab-accordian", {
    view: {
      onRender({ el }) {
        const root = createRoot(el);
        root.render(<TabAccordian />);
      },
    },
  });
  editor.BlockManager.add("tabAccordian", {
    label: "Tab Accordian",
    category: "React-component",
    content: { type: "tab-accordian" },
  });
};

export default GsTabAccordian;
