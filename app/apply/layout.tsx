import type { Metadata } from "next";
import { CLIENT_CONFIG } from "@/config/client";

export const metadata: Metadata = {
  title: CLIENT_CONFIG.meta.title,
  description: CLIENT_CONFIG.meta.description,
};

export default function ApplyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />
      <div style={{ fontFamily: "Inter, sans-serif", background: "#ffffff", minHeight: "100vh" }}>
        {children}
      </div>
    </>
  );
}
