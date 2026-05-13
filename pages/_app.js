import "@/styles/globals.css";
import { DM_Serif_Display, DM_Sans } from "next/font/google";

const dmSerif = DM_Serif_Display({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-dm-serif",
  display: "swap",
});

const dmSans = DM_Sans({
  weight: ["300", "400", "500"],
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

export default function App({ Component, pageProps }) {
  return (
    <div className={`${dmSerif.variable} ${dmSans.variable} font-sans`}>
      <Component {...pageProps} />
    </div>
  );
}
