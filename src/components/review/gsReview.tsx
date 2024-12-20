import { Editor } from "grapesjs";
import React from "react";
import { createRoot } from "react-dom/client";
import Review from "./review";

const GsReview = (editor: Editor) => {
  const defaultColor = {
    textColor: "#000000",
  };
  editor.Components.addType("review-list", {
    model: {
      defaults: {
        tagName: "div",
        draggable: true,
        droppable: true,
        editable: true,
        attributes: {
          textColor: defaultColor.textColor,
        },
        traits: [{ type: "color", name: "textColor", label: "Text Color" }],
      },
    },
    view: {
      onRender({ el, model }) {
        const root = createRoot(el);
        const attributes = model.get("attributes");
        console.log("attributes", attributes);
        const color = attributes?.textColor || defaultColor.textColor;
        root.render(<Review themedata={{ color }} />);
      },
    },
  });
  editor.BlockManager.add("reviewListing", {
    label: "Review List",
    category: "React-component",
    content: {
      type: "review-list",
    },
  });
};

export default GsReview;
