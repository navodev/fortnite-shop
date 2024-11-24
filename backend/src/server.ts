import express from "express";
import schedule from "node-schedule";
import fs from "fs";
import path from "path";
import { fetchShopData, fetchItem } from "./fetchShopData";

const app = express();
const PORT = 5500;
const SHOP_JSON_PATH = path.join(__dirname, "data", "shop.json");

app.get("/shop", (req, res) => {
  if (fs.existsSync(SHOP_JSON_PATH)) {
    const shopData = JSON.parse(fs.readFileSync(SHOP_JSON_PATH, "utf-8"));
    res.json(shopData);
  } else {
    res.status(404).json({ message: "Shop data not available" });
  }
});

app.get("/shop/:itemId", (req, res) => {
  const itemId = req.params.itemId;

  const item = fetchItem(itemId);
  if (item) {
    res.json(item);
  } else {
    res.status(404).json({ message: "Item not found." });
  }
});

schedule.scheduleJob("*/5 * * * *", () => {
  fetchShopData();
});

fetchShopData();

app.listen(PORT, () => {
  console.log("Server is running on http://localhost:", PORT);
});
