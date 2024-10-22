"use client";
import grapesjs, { Editor } from "grapesjs";
import gsBlocksBasic from "grapesjs-blocks-basic";
import gsPluginForms from "grapesjs-plugin-forms";
import gsWebpage from "grapesjs-preset-webpage";
import gsCustome from "grapesjs-custom-code";
import React, { useEffect, useRef } from "react";
import "grapesjs/dist/css/grapes.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const GrapeJsEditor = () => {
  const editorRef = useRef<Editor | null>(null);
  useEffect(() => {
    editorRef.current = grapesjs.init({
      height: "100vh",
      container: "#gjs",
      width: "auto",
      fromElement: true,

      storageManager: { autoload: true, autosave: true, type: "local" },

      plugins: [gsBlocksBasic, gsPluginForms, gsWebpage, gsCustome],
    });
    editorRef.current.Panels.addButton("options", [
      {
        id: "save-db",
        className: "fas fa-save",
        command: "save-db",
        attributes: {
          title: "Save Changes",
          style: "padding-top:7px",
        },
      },
    ]);
    editorRef.current.Commands.add("save-db", {
      run: () => {
        const html = editorRef.current?.getHtml();
        const css = editorRef.current?.getCss();

        console.log("HTML Content:", html);
        console.log("CSS Content:", css);
      },
    });
  }, []);

  return (
    <div>
      <div id="gjs" className="h "></div>
      <div id="blocks"></div>
    </div>
  );
};

export default GrapeJsEditor;
