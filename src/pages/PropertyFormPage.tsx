import Heading from "../components/Heading";
import PropertyForm from "../components/PropertyForm";

export default function PropertyFormPage() {
  return (
    <div className="flex flex-col px-12 md:px-20 gap-12 py-6">
      <Heading title="Create new property" size="text-3xl" />

      <PropertyForm type="create" />
    </div>
  );
}
