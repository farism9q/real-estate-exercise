import { useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { AlertCircleIcon } from "lucide-react";
import { useModal } from "../../hooks/useStoreModal";
import { useDeleteProperty } from "../../features/property/useDeleteProperty";

export default function ConfirmModal() {
  const [isMatchedValue, setIsMatchedValue] = useState(false);
  const { onClose, isOpen, type, data } = useModal();
  const { deleteProperty, isDeleting } = useDeleteProperty();

  if (type !== "delete") {
    return null;
  }

  const handleConfirm = () => {
    deleteProperty(data.id);
    onClose();
  };

  return (
    <Dialog open={type === "delete" && isOpen} onOpenChange={() => onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            <p className="flex gap-2 items-center text-3xl">
              <AlertCircleIcon className="text-red-500/80" size={35} />
              <span>Are you sure ?</span>
            </p>
          </DialogTitle>
          <DialogDescription className="text-left">
            This action is irreversible
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleConfirm}>
          <div className="mx-4 my-6 space-y-2">
            <p className="font-semibold text-sm">
              Type property id "{data?.id}" to delete
            </p>
            <input
              onChange={e => {
                if (e.target.value === data.id) {
                  setIsMatchedValue(true);
                } else {
                  setIsMatchedValue(false);
                }
              }}
              type="text"
              className="bg-gray-200 dark:bg-gray-800 border-solid border-[2px] border-slate-50/10 shadow-lg hover:border-slate-50/30 hover:bg-gray-500/20 transition-all duration-300 rounded-md px-2 py-1 focus:outline w-full"
            />
          </div>

          <DialogFooter>
            <div className="flex justify-end items-center gap-2">
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Close
                </Button>
              </DialogClose>
              <Button
                disabled={!isMatchedValue}
                type="submit"
                variant={"destructive"}
              >
                Confirm
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
