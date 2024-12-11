import { Editor } from "grapesjs";
import { createRoot } from "react-dom/client";
import BrAlphabet from "./brAlphabet";

const GsBrAlphabet = (editor: Editor) => {
  editor.Components.addType("alphabet-listing-section", {
    view: {
      onRender({ el }) {
        const root = createRoot(el);
        root.render(<BrAlphabet />);
      },
    },
  });

  editor.BlockManager.add("brAlphabet", {
    label: "Br Alphabet",
    category: "React-component",
    content: {
      type: "alphabet-listing-section",
    },
  });
};

export default GsBrAlphabet;
