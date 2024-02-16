import { useModal } from "../../hooks/useStoreModal";
import PropertyForm from "../PropertyForm";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";

export default function EditPropertyFormModal() {
  const { type, isOpen, data, onClose } = useModal();
  return (
    <Dialog open={type === "edit" && isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            <p className="flex gap-2 items-center text-3xl">
              <span>Edit property</span>
            </p>
          </DialogTitle>
        </DialogHeader>

        <div className="h-96 md:h-full overflow-scroll py-2 no-scrollbar">
          <PropertyForm type="edit" data={data} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
