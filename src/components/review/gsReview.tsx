import { Editor } from "grapesjs";
import React from "react";
import { createRoot } from "react-dom/client";
import Review from "./review";

const GsReview = (editor: Editor) => {
  editor.Components.addType("review-list", {
    view: {
      onRender({ el }) {
        const root = createRoot(el);
        root.render(<Review />);
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
