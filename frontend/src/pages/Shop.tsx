import axios from "axios";
import ShopItem from "./ShopItem";

function Shop() {
  return (
    <div className="w-screen h-screen bg-gradient-to-bl from-[#053373] to-[#0774bb] text-white">
      <div className="p-10">
        <div className="mb-[100px]">
          <h1 className="text-3xl italic font-bold">ITEM SHOP</h1>
          <p className="text-lg font-semibold">Powered by Navo</p>
          <p className="text-lg font-semibold">Welcome to the Item Shop where you view and purchase current items.</p>
        </div>
        <div>
          <ShopItem
            name="Werewolf Bundle"
            price={500}
            img="https://media.fortniteapi.io/images/shop/e8340fb46e7fbe841d71d49daa26faaa5e4e489fdb4d45093e712dc257d209ed/v2/MI_Bundle_Featured_Levain/background.png"
            type="Item Bundle"
          />
        </div>
      </div>
    </div>
  );
}

export default Shop;
