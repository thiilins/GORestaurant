import { IconBaseProps } from "react-icons";
import { ReactNode } from "react";
export interface FoodType {
  id: number;
  image: string;
  name: string;
  price: string;
  description: string;
  available: boolean;
}
export interface FoodProps {
  food: FoodType;
  handleEditFood: (food: FoodType) => void;
  handleDelete: (id: number) => void;
}
export type FoodDataType = Omit<FoodType, "id" | "available">;
export interface OpenModalProps {
  openModal: () => void;
}
export interface InputProps {
  name: string;
  placeholder?: string;
  icon?: React.ComponentType<IconBaseProps>;
}
export interface ModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  children: ReactNode;
}
export interface ModalAddFoodProps {
  isOpen: boolean;
  setIsOpen: () => void;
  handleAddFood: (data: FoodDataType) => void;
}
export interface ModalEditFoodProps {
  isOpen: boolean;
  setIsOpen: () => void;
  editingFood: FoodDataType;
  handleUpdateFood: (data: FoodDataType) => void;
}
