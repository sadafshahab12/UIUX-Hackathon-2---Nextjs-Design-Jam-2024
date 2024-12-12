import { Montserrat, Poppins } from "next/font/google";

export const montserrat = Montserrat({
  weight: ["400", "700"],
  style: ["normal"],
  subsets: ["latin"],
});
export const poppins = Poppins({
  weight: ["400", "700"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
});
