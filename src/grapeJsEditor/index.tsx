"use client";
import grapesjs, { Editor } from "grapesjs";
import gsBlocksBasic from "grapesjs-blocks-basic";
import gsPluginForms from "grapesjs-plugin-forms";
import gsWebpage from "grapesjs-preset-webpage";
import gsCustome from "grapesjs-custom-code";
import React, { useEffect, useRef } from "react";
import "grapesjs/dist/css/grapes.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { serversideDataProps } from "@/app/page";
import AddSaveDataPanel from "./panel/saveData";
import GsListing from "@/components/listing/gsListing";
import GsSlider from "@/components/customImageSlider/gsSlider";
import GsFeaturedCategory from "@/components/featuredCategory/gsFeaturedCategory";

interface grapejsEditorProps {
  serverSideData: serversideDataProps[];
}
const GrapeJsEditor: React.FC<grapejsEditorProps> = ({ serverSideData }) => {
  const editorRef = useRef<Editor | null>(null);

  useEffect(() => {
    editorRef.current = grapesjs.init({
      height: "100vh",
      container: "#gjs",
      width: "auto",
      fromElement: true,
      storageManager: {
        autoload: true,
        autosave: true,
        type: "local",
      },
      plugins: [gsBlocksBasic, gsPluginForms, gsCustome, gsWebpage],
      canvas: {
        styles: [
          "https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css",
          "https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css",
        ],
      },
    });

    // Add icon in panel
    AddSaveDataPanel(editorRef.current);

    // Add custom component
    GsListing(editorRef.current, serverSideData);
    GsSlider(editorRef.current);
    GsFeaturedCategory(editorRef.current, serverSideData);

    editorRef.current.Commands.add("save-db", {
      run: async () => {
        const html = editorRef.current?.getHtml() || "";
        const css = editorRef.current?.getCss() || "";
        console.log("html", html, css);

        const getCustomJson = () => {
          const components = editorRef.current?.getComponents();

          const models = components?.models || [];
          return models.map((comp) => {
            const attributes = comp.get("attributes");
            const temp = comp?.attributes?.components?.models;
            const mapData = temp?.map((data) => data?.attributes);

            return {
              type: comp.get("type"),
              tagName: comp.get("tagName"),
              attributes: attributes,
              textcontent: mapData,
              html: html,
              css: css,
            };
          });
        };
        const customJson = getCustomJson();
        localStorage.setItem("gjs-Data", JSON.stringify(customJson));
      },
    });
  }, [serverSideData]);

  return (
    <div>
      <div id="gjs" className="h"></div>
      <div id="blocks"></div>
    </div>
  );
};

export default GrapeJsEditor;
