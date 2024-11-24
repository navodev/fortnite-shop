import vBucks from "../assets/vbucks.webp";

interface CardProps {
  name: string;
  price: number;
  img: string;
  type: string;
}

const ShopItem: React.FC<CardProps> = ({ name, price, img, type }) => {
  return (
    <div className="relative w-[300px] hover:ring-2 ring-indigo-300 hover:cursor-pointer rounded-xl h-[400px] group overflow-hidden">
      <img
        src={img}
        alt={name}
        className="absolute top-0 left-0 object-cover w-full h-full object-center brightness-90 group-hover:scale-110 group-hover:brightness-100 transition-all"
      />
      <div className="absolute bottom-5 left-5">
        <p className="font-semibold opacity-0 group-hover:opacity-100 transition-all">{type}</p>
        <h3 title={name} className="text-left font-bold text-xl ">
          {name}
        </h3>
        <div className="flex items-center gap-1 mt-2">
          <img src={vBucks} alt="vBucks" />
          <p className="font-semibold text-xl">{price}</p>
        </div>
      </div>
    </div>
  );
};

export default ShopItem;
