"use client";
import grapesjs, { Editor } from "grapesjs";
import gsPluginForms from "grapesjs-plugin-forms";
import gsWebpage from "grapesjs-preset-webpage";
import gsBlocks from "grapesjs-blocks-basic";
import gsFlexBlock from "grapesjs-blocks-flexbox";
import gsCustome from "grapesjs-custom-code";
import React, { useEffect, useRef } from "react";
import "grapesjs/dist/css/grapes.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { serversideDataProps } from "@/app/page";
import GsListing from "@/components/listing/gsListing";
import AddSaveDataPanel from "./panel/saveData";
import GsSlider from "@/components/customImageSlider/gsSlider";
import GsFeaturedCategory from "@/components/featuredCategory/gsFeaturedCategory";
import GsLogosSlider from "@/components/scrollableLogos/gsSlider";

interface grapejsEditorProps {
  serverSideData: serversideDataProps[];
}
const GrapeJsEditor: React.FC<grapejsEditorProps> = ({ serverSideData }) => {
  const editorRef = useRef<Editor | null>(null);

  const loadEndpoint = "api/loadData";
  const saveEndpoint = "api/saveData";

  // const loadEndpoint = "/api/loadGrapesData";
  // const saveEndpoint = "/api/saveGrapesData";

  const projectID = "grapesjs";

  useEffect(() => {
    editorRef.current = grapesjs.init({
      height: "100vh",
      container: "#gjs",
      width: "auto",
      fromElement: true,
      plugins: [gsCustome, gsBlocks, gsPluginForms, gsWebpage, gsFlexBlock],
      pluginsOpts: {
        "grapesjs-blocks-basic": {
          flexGrid: true,
        },
      },
      selectorManager: { componentFirst: true },
      storageManager: {
        type: "remote",
        autoload: true,
        options: {
          remote: {
            contentTypeJson: true,
            // For json file
            urlLoad: loadEndpoint,
            urlStore: saveEndpoint,
            onStore: (data) => {
              console.log("datadatadatadata", data);
              return { id: projectID, data };
            },
            onLoad: (result) => {
              console.log("data", result);
              return result.data.data || {};
            },

            // From Db
            // urlLoad: loadEndpoint,
            // urlStore: saveEndpoint,
            // onStore: (data) => {
            //   return { id: projectID, data };
            // },
            // onLoad: (result) => {
            //   return result.data[0].data || {};
            // },
          },
        },
        autosave: true,
        stepsBeforeSave: 1,
      },
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
    GsLogosSlider(editorRef.current);

    // Add style Manager
    // ExtraStyleManager(editorRef.current);
    // GenerelStyleManager(editorRef.current);
  }, [serverSideData]);

  return (
    <div>
      <div id="gjs"></div>
      {/* <div id="blocks"></div> */}
    </div>
  );
};

export default GrapeJsEditor;
