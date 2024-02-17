import { Navigation, Scrollbar, Keyboard } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { useProperty } from "./useProperty";
import SkeletonPropertyItem from "./SkeletonPropertyItem";
import Heading from "../../components/Heading";
import GridCards from "../../components/GridCards";
import Empty from "../../components/Empty";

import "swiper/css";
import "swiper/css/navigation";
import "../.././index.css";
import { Button } from "../../components/ui/button";
import { useModal } from "../../hooks/useStoreModal";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { formatCurrency } from "../../lib/utils";

export default function PropertyDetail() {
  const { property, isLoading } = useProperty();
  const { onOpen } = useModal();
  const navigate = useNavigate();

  if (isLoading)
    return <SkeletonPropertyItem screen="propertyDetail" length={1} />;

  if (!property) return <Empty label="No property was found" />;

  return (
    <div className="h-full flex flex-col py-6 overflow-hidden">
      <div className="flex justify-between md:justify-end px-2 items-center">
        <div className="md:hidden">
          <button
            onClick={() => {
              navigate(-1);
            }}
          >
            <ChevronLeft size={32} />
          </button>
        </div>

        <div className="flex justify-end gap-2 items-center px-2">
          <Button onClick={() => onOpen("edit", property)}>Edit</Button>
          <Button
            onClick={() => onOpen("delete", { id: property.id })}
            variant={"destructive"}
          >
            Delete
          </Button>
        </div>
      </div>

      <div className="lg:px-[120px]">
        <Swiper
          modules={[Navigation, Scrollbar, Keyboard]}
          slidesPerView={1}
          navigation
          className="max-w-[90%] lg:max-w-[80%]"
          keyboard={{
            enabled: true,
          }}
          centeredSlides
        >
          {property?.images!.map((img, idx) => (
            <SwiperSlide
              key={img + idx}
              className="px-[50px] py-[30px] lg:px-[70px]"
            >
              {" "}
              <img src={img} alt={`${property.title}`} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* PROPERTY INFORMATION */}
      <div className="px-4 lg:pl-8 space-y-12">
        <div className="py-8 space-y-4">
          <div className="flex gap-4">
            <div className="w-[2px] bg-primary/70" />
            <Heading title={property?.title as string} />
          </div>

          <div className="flex flex-col gap-2 text-lg px-2 text-zinc-400">
            <p className="w-[400px] lg:w-[1100px] pr-2">
              {property?.description}
            </p>
            <p className="font-bold">{property.address}</p>
            <p className="text-black dark:text-white text-lg font-bold">
              {formatCurrency(property.price)}
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <Heading title="Features" />
          <GridCards data={property.features} />
        </div>

        <div className="space-y-6">
          <Heading title="Warranties" />
          <GridCards data={property.warranties} />
        </div>
      </div>
    </div>
  );
}
