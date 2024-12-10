import { Editor } from "grapesjs";
import { createRoot } from "react-dom/client";
import BrAlphabet from "./br_alphabet";

const GsBrAlphabet = (editor: Editor) => {
  editor.Components.addType("dynamic-products", {
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
      type: "dynamic-products",
    },
  });
};

export default GsBrAlphabet;
