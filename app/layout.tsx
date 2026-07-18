import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aether Run: Veer Skybound — Play Free",
  description: "An original seven-round Indian-fantasy platform adventure for desktop and mobile browsers.",
  other: { "codex-preview": "development" },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
