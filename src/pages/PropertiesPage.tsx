import Heading from "../components/Heading";
import PropertyList from "../features/property/PropertyList";

export default function PropertiesPage() {
  return (
    <div className="flex flex-col items-center md:items-start space-y-8 px-28 py-8">
      <Heading title="Properties" />
      <PropertyList />
    </div>
  );
}
