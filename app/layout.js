import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "./conponents/NavBar";
import Footer from "./conponents/Footer";
import SessionRapper from "./conponents/sessionRapper";
import localFont from "next/font/local";
import ReduxRapper from "./conponents/ruduxRapper";
import ContextRapper from "./conponents/ContextRapper";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const outFit = localFont({
  src: "./fonts/Outfit-VariableFont_wght.ttf",
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "AHR Traders",
  description: "AHR traders is a online ecom web where laptops are available all over the world",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${outFit.className} ${geistMono.variable} ${geistSans.variable} antialiased bg-[#FFFFFF]`}
      >
        <ContextRapper>
        <ReduxRapper>
        <SessionRapper>
        <NavBar/>
        {children}
        <Footer/>
        </SessionRapper>
        </ReduxRapper>
        </ContextRapper>
      </body>
    </html>
  );
}
