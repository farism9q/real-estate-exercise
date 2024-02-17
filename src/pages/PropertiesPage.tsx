import Heading from "../components/Heading";
import PropertyList from "../features/property/PropertyList";

export default function PropertiesPage() {
  return (
    <div className="flex flex-col items-center md:items-start space-y-8 px-12 md:px-20 py-8">
      <Heading title="Properties" size="text-6xl" />
      <PropertyList />
    </div>
  );
}
