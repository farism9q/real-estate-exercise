import ConfirmModal from "../modals/ConfirmModal";
import EditPropertyFormModal from "../modals/EditPropertyFormModal";

export default function ModalsProvider() {
  return (
    <>
      <EditPropertyFormModal />
      <ConfirmModal />
    </>
  );
}
