"use client";
import GrapeJsEditor from "@/grapeJsEditor";
import axios from "axios";
import { useEffect, useState } from "react";
export interface serversideDataProps {
  id: number;
  name: string;
}
const Home = () => {
  const [serverData, setServerData] = useState<[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await axios({
        method: "POST",
        url: "https://front-staging.parsonskellogg.services/CmsComponents/getpagecomponents.json",
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          pageId: 295,
          type: "Topic",
        },
      });
      const featureProductData = data?.data?.data?.find(
        (comp: any) => comp.name === "Featured Products"
      );

      if (featureProductData) {
        setServerData(JSON.parse(featureProductData.selectedVal));
      }
    };
    fetchData();
  }, []);

  return <GrapeJsEditor serverSideData={serverData} />;
};
export default Home;
