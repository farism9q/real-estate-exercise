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

export default function PropertyDetail() {
  const { property, isLoading } = useProperty();

  if (isLoading)
    return <SkeletonPropertyItem screen="propertyDetail" length={1} />;

  if (!property) return <Empty label="No property was found" />;

  return (
    <div className="h-full flex flex-col py-6 overflow-hidden">
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
              <img src={img} alt={`${property.title} image`} />
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
            <p className="w-[500px] lg:w-[1100px]">{property?.description}</p>
            <p className="font-bold">{property.address}</p>
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
