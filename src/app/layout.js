import "./globals.css";
import { fontVariables } from "./fonts";
import { LoaderProvider } from "@/context/LoaderContext";
import { HOME_PRELOAD } from "@/config/preload";

export const metadata = {
  title: "FISAT — Federal Institute of Science and Technology, Angamaly",
  description:
    "FISAT is an autonomous engineering and management institute in Angamaly, Kerala — NAAC A+ accredited, NBA accredited B.Tech programmes, affiliated to APJ Abdul Kalam Technological University.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={fontVariables}>
      <body>
        {/* Without JS the loader can never finish — hide it outright. */}
        <noscript>
          <style>{`[data-loader-active]{display:none!important}html{overflow:auto!important}`}</style>
        </noscript>
        <LoaderProvider manifest={HOME_PRELOAD}>
          <main className="app-container" data-app>
            {children}
          </main>
        </LoaderProvider>
      </body>
    </html>
  );
}
