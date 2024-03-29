import { Card } from "@/shared";
import { cards } from "../model";

const CardsList = () => {
  return (
    <div className="flex xsm:justify-between justify-center text-center mt-[10px] md:flex-nowrap flex-wrap">
      {cards.map((card, i: number) => (
        <Card className="md:mx-0 mx-7" {...card} key={i} />
      ))}
    </div>
  );
};

export default CardsList;
