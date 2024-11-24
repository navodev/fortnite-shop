import axios from "axios";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const SHOP_API_URL = "https://fortniteapi.io/v2/shop";
const AUTH_TOKEN = process.env.AUTH_TOKEN;
const SHOP_JSON_PATH = path.join(__dirname, "data", "shop.json");

const fetchShopData = async () => {
  try {
    const response = await axios.get(SHOP_API_URL, {
      headers: {
        Authorization: AUTH_TOKEN,
      },
    });

    const shopData = response.data.shop;
    const sections = processShopData(shopData);

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
      name: item.displayName,
      price: item.price.finalPrice,
      type: item.displayType,
      img: img,
    });
  });

  return sections;
};

export default fetchShopData;
