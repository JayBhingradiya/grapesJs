import { Editor } from "grapesjs";
import React, { createElement } from "react";
import { createRoot } from "react-dom/client";
import LogoListing from "./logoListing";

const gsLogoListing = (editor: Editor) => {
  editor.Components.addType("logo-listing", {
    view: {
      onRender({ el }) {
        const root = createRoot(el);
        root.render(<LogoListing />);
      },
    },
  });
  editor.BlockManager.add("logoListing", {
    label: "Logo Listing",
    category: "React-component",
    content: {
      type: "logo-listing",
    },
  });
};

export default gsLogoListing;
