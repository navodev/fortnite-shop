import axios from "axios";
import ShopItem from "./ShopItem";
import { useState, useEffect } from "react";
import { SectionType, ShopItemType } from "../types";

function Shop() {
  const [sections, setSections] = useState<SectionType>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchShop = async () => {
      try {
        const response = await axios.get("/api/shop");
        setSections(response.data as SectionType);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch shop:", error);
        setIsLoading(false);
      }
    };

    fetchShop();
  }, []);

  return (
    <div className="w-screen h-fit min-h-screen bg-gradient-to-bl from-[#053373] to-[#0774bb] text-white">
      <div className="p-10">
        <div className="mb-[100px]">
          <h1 className="text-3xl italic font-bold">ITEM SHOP</h1>
          <p className="text-lg font-semibold">Powered by Navo</p>
          <p className="text-lg font-semibold">Welcome to the Item Shop where you view and purchase current items.</p>
        </div>
        {isLoading ? (
          <p>Loading latest items...</p>
        ) : (
          Object.keys(sections).map((section) => (
            <div key={section} className="mb-8 w-5/6">
              <h2 className="text-[30px] uppercase italic font-extrabold mb-4">{section}</h2>
              <div className="flex items-center max-xs:justify-center flex-wrap gap-2 mt-4">
                {sections[section].map((item: ShopItemType) => (
                  <ShopItem item={item} />
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Shop;
