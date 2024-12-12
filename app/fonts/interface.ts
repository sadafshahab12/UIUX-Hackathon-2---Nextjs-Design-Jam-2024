import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

export interface THeroSec {
  title: string;
  navName: string;
  navLink: string;
}
export interface TCheckOutCard {
  src: string;
  title: string;
  tag: string;
}
export interface TInfoCard {
  icon: IconDefinition;
  title: string;
  info: string;
}
export interface TBlogCard {
  iconTag: string;
  cardTitle: string;
  cardImg: string;
}
export interface TPostCard {
  postTitle: string;
  postImg: string;
}
export interface TRPCard {
  RPImg: string;
  productTitle: string;
  productType: string;
  priceWithDiscount: string;
  originalPrice?: string;
  discount?: string;
}
export interface TCartItem {
  cartImg: string;
  cartTitle: string;
  cartQty: number;
  cartPrice: string;
}
export interface NavBarProps {
  onCartClick: () => void;
}
export interface cartSideBarProps {
  isOpen: boolean;
  onClose: () => void;
}
