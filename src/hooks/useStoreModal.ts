import { create } from "zustand";
import { ModalType, PropertyItemType } from "../types";

interface useModalStore {
  type: ModalType | null;
  data: PropertyItemType | any; // We will pass PropertyItem in edit modal and the property id in delete modal
  isOpen: boolean;
  onOpen: (type: ModalType, data?: PropertyItemType | {}) => void;
  onClose: () => void;
}

export const useModal = create<useModalStore>(set => ({
  type: null,
  data: undefined,
  isOpen: false,
  onOpen: (type: ModalType, data: PropertyItemType | undefined | {}) =>
    set({ isOpen: true, type, data: data }),
  onClose: () => set({ isOpen: false, type: null }),
}));
