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
import { usePathname } from "next/navigation";
import { styleManagerConfig } from "./styleManagerConfig";
import GsBrAlphabet from "@/components/brAlphabet/gsBrAlphabet";
import gsLogoListing from "@/components/logoLisitng/gsLogoListing";
import GsReview from "@/components/review/gsReview";
import GsSlides from "@/components/slides/gsSlides";
import GsFaq from "@/components/faq/gsFaq";
import GsHoverTextSection from "@/components/hoverTextSection/gsHoverTextSection";
import GsTabAccordian from "@/components/tabAccordian/gsTabAccordian";
import GsHoverDisplayContent from "@/components/hoverDisplayContent/GsHoverDisplayContent";
import GsSlideAnimation from "@/components/slidesAnimation/gsSlideAnimation";

interface grapejsEditorProps {
  serverSideData?: serversideDataProps[];
  projectID?: string;
}
const GrapeJsEditor: React.FC<grapejsEditorProps> = ({ serverSideData }) => {
  const params = usePathname();
  const pageId = params.split("").slice(1).join("") || "grapesjs";

  const editorRef = useRef<Editor | null>(null);

  const loadEndpoint = `/api/loadGrapesData?id=${pageId}`;
  const saveEndpoint = "/api/saveGrapesData";

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
      styleManager: styleManagerConfig,
      storageManager: {
        type: "remote",
        autoload: true,
        options: {
          remote: {
            // Json
            // urlLoad: loadEndpoint,
            // urlStore: saveEndpoint,
            // onStore: (data) => {
            //   console.log("datadatadatadata", data);
            //   return { id: projectID, data };
            // },
            // onLoad: (result) => {
            //   console.log("data", result.data);
            //   return result.data.data || {};
            // },

            // For DB
            contentTypeJson: true,
            urlLoad: loadEndpoint,
            urlStore: saveEndpoint,
            onStore: (data) => {
              return { id: pageId, data };
            },
            onLoad: (result) => {
              return result.data.data || {};
            },
          },
        },
        autosave: true,
        stepsBeforeSave: 1,
      },
      canvas: {
        styles: [
          "https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css",
          "https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css",
        ],
      },
    });

    // Add icon in panel
    AddSaveDataPanel(editorRef.current);

    // Add custom component
    GsListing(editorRef.current, serverSideData || []);
    GsSlider(editorRef.current, pageId);
    GsFeaturedCategory(editorRef.current, serverSideData || []);
    GsLogosSlider(editorRef.current, pageId);
    GsBrAlphabet(editorRef.current);
    gsLogoListing(editorRef.current);
    GsReview(editorRef.current);
    GsFaq(editorRef.current);
    GsSlides(editorRef.current);
    GsHoverTextSection(editorRef.current);
    GsTabAccordian(editorRef.current);
    GsHoverDisplayContent(editorRef.current);
    GsSlideAnimation(editorRef.current);
  }, [serverSideData]);

  return (
    <div>
      <div id="gjs"></div>
    </div>
  );
};

export default GrapeJsEditor;
