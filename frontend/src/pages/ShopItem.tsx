import { useNavigate } from "react-router-dom";
import vBucks from "../assets/vbucks.webp";
import { ShopItemType } from "../types";

interface CardProps {
  item: ShopItemType;
}

const ShopItem: React.FC<CardProps> = ({ item }) => {
  const navigate = useNavigate();

  return (
    <div
      className="relative w-[250px] hover:ring-2 ring-indigo-300 hover:cursor-pointer rounded-xl h-[400px] group overflow-hidden"
      onClick={() => {
        navigate(`/shop/${item.id}`);
      }}
    >
      <img
        src={item.img}
        alt={item.name}
        className="absolute top-0 left-0 object-cover w-full h-full object-center brightness-90 group-hover:scale-110 group-hover:brightness-100 transition-all"
      />
      {item.discount && (
        <p className="absolute top-2 left-2 bg-white text-black rounded-md px-2 font-bold text-sm">
          {item.discount} VBUCKS OFF
        </p>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
      <div className="absolute bottom-5 left-5">
        <p className="font-semibold opacity-0 group-hover:opacity-100 transition-all">{item.type}</p>
        <h3 title={item.name} className="text-left font-bold text-xl ">
          {item.name}
        </h3>
        <div className="flex items-center gap-1 mt-2">
          <img src={vBucks} alt="vBucks" />
          <p className="font-semibold text-xl">{item.price}</p>
        </div>
      </div>
    </div>
  );
};

export default ShopItem;
