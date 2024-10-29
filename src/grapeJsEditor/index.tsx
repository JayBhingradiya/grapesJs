"use client";
import grapesjs, { Editor } from "grapesjs";
import gsPluginForms from "grapesjs-plugin-forms";
import gsWebpage from "grapesjs-preset-webpage";
import gsNewsLetter from "grapesjs-preset-newsletter";
import gsCustome from "grapesjs-custom-code";
import React, { useEffect, useRef } from "react";
import "grapesjs/dist/css/grapes.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { serversideDataProps } from "@/app/page";
import GsListing from "@/components/listing/gsListing";
import AddSaveDataPanel from "./panel/saveData";
import GsSlider from "@/components/customImageSlider/gsSlider";
import GsFeaturedCategory from "@/components/featuredCategory/gsFeaturedCategory";
import GenerelStyleManager from "@/app/styleManager/generalStyleManager";
import ExtraStyleManager from "@/app/styleManager/extra";

interface grapejsEditorProps {
  serverSideData: serversideDataProps[];
}
const GrapeJsEditor: React.FC<grapejsEditorProps> = ({ serverSideData }) => {
  const editorRef = useRef<Editor | null>(null);

  useEffect(() => {
    const initEditor = async () => {
      editorRef.current = grapesjs.init({
        height: "100vh",
        container: "#gjs",
        width: "auto",
        fromElement: false,
        storageManager: {
          autoload: true,
          autosave: true,
          type: "local",
        },
        plugins: [gsCustome, gsNewsLetter, gsPluginForms, gsWebpage],
        selectorManager: { componentFirst: true },
        canvas: {
          styles: [
            "https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css",
            "https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css",
          ],
        },
      });

      try {
        const response = await fetch("/api/loadData");
        if (response.ok) {
          const result = await response.json();
          const existingData = result.data || [];

          if (existingData.length > 0) {
            editorRef.current.load(existingData);
          }
        }
      } catch (error) {
        console.error("Failed to load existing data:", error);
      }
      // Add icon in panel
      AddSaveDataPanel(editorRef.current);

      // Add custom component
      GsListing(editorRef.current, serverSideData);
      GsSlider(editorRef.current);
      GsFeaturedCategory(editorRef.current, serverSideData);

      // Add style Manager
      ExtraStyleManager(editorRef.current);
      GenerelStyleManager(editorRef.current);

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
          try {
            const response = await fetch("/api/saveData", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ data: customJson }),
            });

            if (response.ok) {
              console.log("Data saved successfully to server");
            }
          } catch (error) {
            console.error("Error ", error);
          }
        },
      });
    };
    initEditor();
  }, [serverSideData]);

  return (
    <div>
      <div id="gjs" className="h"></div>
      <div id="blocks"></div>
    </div>
  );
};

export default GrapeJsEditor;
