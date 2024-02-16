export type PropertyItemType = {
  createdAt?: Date;
  title: string;
  images?: string[];
  features: string[];
  warranties: string[];
  description: string;
  address: string;
  price: number;
  id?: string;
};

export type FormType = "create" | "edit";

export type ModalType = "edit" | "delete";
