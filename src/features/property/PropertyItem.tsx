import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { formatCurrency } from "../../lib/utils";

import { PropertyItemType } from "../../types";
import { Link } from "react-router-dom";

interface PropertyItemProps {
  propertyItem: PropertyItemType;
}

export default function PropertyItem({ propertyItem }: PropertyItemProps) {
  return (
    <Link to={propertyItem.id!}>
      <Card className="border-none cursor-pointer hover:opacity-70 hover:shadow-xl transition duration-200">
        <CardHeader className="p-0">
          <img src={propertyItem.images!.at(0)} alt={propertyItem.title} />
          <CardTitle className="text-center text-2xl md:text-lg">
            {propertyItem.title}
          </CardTitle>
        </CardHeader>

        <CardFooter className="p-0 m-0">
          <div className="grid grid-cols-[1fr_0.2fr] gap-4 text-xs w-full px-2 pt-3 pb-1">
            <p>{propertyItem.address}</p>
            <p className="font-bold">{formatCurrency(propertyItem.price)}</p>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
