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
        method: "post",
        url: "https://frontapi.anniesannuals.com/StoreProduct/getshopbytype.json",
        data: {
          storeID: 5,
          countforfetchitems: 0,
          shopByGarden: false,
          shopByCategories: true,
          shopByFeatures: false,
          shopByUses: false,
        },
      });
      setServerData(data?.data?.data);
    };
    fetchData();
  }, []);

  // const serverSideData: serversideDataProps[] = [
  //   { id: 1, name: "Denish" },
  //   { id: 2, name: "Dortha" },
  //   { id: 3, name: "Venom" },
  //   { id: 4, name: "Devid" },
  // ];
  return <GrapeJsEditor serverSideData={serverData} />;
};
export default Home;
