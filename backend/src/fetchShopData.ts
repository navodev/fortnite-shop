import axios from "axios";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const SHOP_API_URL = "https://fortniteapi.io/v2/shop";
const AUTH_TOKEN = process.env.AUTH_TOKEN;
const SHOP_JSON_PATH = path.join(__dirname, "data", "shop.json");

export const fetchShopData = async () => {
  try {
    const response = await axios.get(SHOP_API_URL, {
      headers: {
        Authorization: AUTH_TOKEN,
      },
    });

    const shopData = (response.data as any).shop;
    const sections = processShopData(shopData);

    if (!fs.existsSync(SHOP_JSON_PATH)) {
      fs.mkdirSync(SHOP_JSON_PATH);
    }

    fs.writeFileSync(SHOP_JSON_PATH, JSON.stringify(sections, null, 2), "utf-8");
  } catch (error) {
    console.error("Error fetching shop data:", error);
  }
};

const processShopData = (shopData: any) => {
  const sections: any = {};

  shopData.forEach((item: any) => {
    const sectionName = item.section.name || "Unknown section";

    if (!sections[sectionName]) {
      sections[sectionName] = [];
    }

    const img = item.displayAssets[0].background ? item.displayAssets[0].background : item.displayAssets[0].url;

    sections[sectionName].push({
      id: item.mainId,
      name: item.displayName,
      price: item.price.finalPrice,
      type: item.displayType,
      img: img,
      offerId: item.offerId,
      lastSeen: item.previusReleaseDate,
      description: item.displayDescription,
    });
  });

  return sections;
};

export const fetchItem = (itemId: string) => {
  try {
    const sections = JSON.parse(fs.readFileSync(SHOP_JSON_PATH, "utf-8"));

    for (const sectionName in sections) {
      const items = sections[sectionName];
      const foundItem = items.find((item: any) => item.id === itemId);
      if (foundItem) {
        return foundItem;
      }
    }
    return null;
  } catch (error) {
    console.error("Failed to fetch item:", error);
    return null;
  }
};
