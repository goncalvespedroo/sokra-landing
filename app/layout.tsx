import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Sokra — Aprender começa com uma boa pergunta",
  description:
    "Um tutor de estudo baseado no método socrático para aprender com autonomia, clareza e raciocínio ativo.",
  openGraph: {
    title: "Sokra — Aprender começa com uma boa pergunta",
    description:
      "Um tutor de estudo baseado no método socrático para aprender com autonomia, clareza e raciocínio ativo.",
    type: "website",
    locale: "pt_BR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
