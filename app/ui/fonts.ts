import { Inter, Open_Sans, Pacifico } from "next/font/google";

export const openSans = Open_Sans({
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

export const inter = Inter({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const pacifico = Pacifico({
  weight: ["400"],
  subsets: ["latin"],
});
