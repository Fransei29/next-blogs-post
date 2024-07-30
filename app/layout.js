import { Inter } from "next/font/google";
import "./globals.css";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Latest posts", // Cambia el título aquí
  description: "Generated by create next app",
  icons: {
    icon: 'favico.ico', // Agrega el favicon aquí
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tailwindcss/ui@latest/dist/tailwind-ui.min.css"/>
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
