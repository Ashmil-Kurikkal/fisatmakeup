import "./globals.css";
import { fontVariables } from "./fonts";
import SmoothScroller from "@/components/SmoothScroller/SmoothScroller";
import { LoaderProvider } from "@/context/LoaderContext";
import { HOME_PRELOAD } from "@/config/preload";
import Footer from "@/components/Footer/Footer";

export const metadata = {
  title: "FISAT — Federal Institute of Science and Technology, Angamaly",
  description:
    "FISAT is an autonomous engineering and management institute in Angamaly, Kerala — NAAC A+ accredited, NBA accredited B.Tech programmes, affiliated to APJ Abdul Kalam Technological University.",
  icons: {
    icon: "/FISAT_LOGO.png",
    apple: "/FISAT_LOGO.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={fontVariables}>
      <body>
        <SmoothScroller />
        {/* Without JS the loader can never finish — hide it outright. */}
        <noscript>
          <style>{`[data-loader-active]{display:none!important}html{overflow:auto!important}`}</style>
        </noscript>
        <LoaderProvider manifest={HOME_PRELOAD}>
          <main className="app-container" data-app>
            {children}
            <Footer />
          </main>
        </LoaderProvider>
      </body>
    </html>
  );
}
