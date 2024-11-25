import { ShopItemType } from "../types";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import vBucks from "../assets/vbucks.webp";

function ShopDetail() {
  const [itemData, setItemData] = useState<ShopItemType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const { itemId } = useParams();

  useEffect(() => {
    const fetchItemData = async () => {
      try {
        const response = await axios.get(`/api/shop/${itemId}`);
        setItemData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch item data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchItemData();
  }, [itemId]);

  return (
    <div className="w-screen h-screen bg-gradient-to-bl from-[#053373] to-[#0774bb] text-white">
      <div className="pt-[200px] pl-[100px]">
        {isLoading ? (
          <p>Loading...</p>
        ) : itemData ? (
          <div className="flex gap-[30px]">
            <div className="relative h-[500px]">
              <img src={itemData.img} alt={itemData.name} className="h-full w-full rounded-xl" />
              {itemData.discount && (
                <p className="absolute top-2 left-2 bg-white text-black rounded-md px-2 font-bold text-sm">
                  {itemData.discount} VBUCKS OFF
                </p>
              )}
            </div>

            <div className="flex flex-col">
              <h3 className="text-xl font-bold">{itemData.type}</h3>
              <h1 className="text-[40px] font-bold leading-none">{itemData.name}</h1>
              <div className="flex items-center gap-1 mt-3 mb-1">
                <img src={vBucks} alt="vBucks" className="h-6" />
                <p className="font-semibold text-xl">{itemData.price}</p>
              </div>
              <p className="mb-2 font-medium">{itemData.description}</p>
              <p className="text-md bg-slate-900 font-semibold text-center rounded-lg py-2 px-4 mb-5 w-fit">
                Last seen: {itemData.lastSeen}
              </p>
              <div>
                <p className="font-semibold text-lg mb-2">Included in bundle:</p>
                <div className="flex gap-1">
                  {itemData.includes.map((img) => (
                    <div className="rounded-xl overflow-hidden border-white border-2">
                      <img src={img} className="w-[75px]" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p>Item not found.</p>
        )}
      </div>
    </div>
  );
}

export default ShopDetail;
