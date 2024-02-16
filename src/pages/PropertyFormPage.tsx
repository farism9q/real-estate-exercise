import Heading from "../components/Heading";
import PropertyForm from "../components/PropertyForm";

export default function PropertyFormPage() {
  return (
    <div className="flex flex-col px-28 gap-12 py-6">
      <Heading title="Create new form" />

      <PropertyForm type="create" />
    </div>
  );
}
