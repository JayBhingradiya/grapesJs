import { Editor } from "grapesjs";
import { createRoot } from "react-dom/client";
import Slides from "./slides";

const GsSlides = (editor: Editor) => {
  editor.Components.addType("slides", {
    view: {
      onRender({ el }) {
        const root = createRoot(el);
        root.render(<Slides />);
      },
    },
  });
  editor.BlockManager.add("slides", {
    label: "Image Slides",
    category: "React-component",
    content: {
      type: "slides",
    },
  });
};

export default GsSlides;
