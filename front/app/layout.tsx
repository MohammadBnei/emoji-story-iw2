import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";

import 'react-toastify/dist/ReactToastify.css';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Emoji Story",
  description: "Lyon M2. Collaboratively build a story with emoji and openAI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="area">
          <ul className="circles">
            <li>🙂</li>
            <li>😡</li>
            <li>😂</li>
            <li>😏</li>
            <li>😍</li>
            <li>😚</li>
            <li>😛</li>
            <li>😜</li>
            <li>😝</li>
            <li>😎</li>
          </ul>
        </div>
        <div className="h-screen">
          <div className="flex justify-center py-8">
            <h1 className="text-5xl font-bold">Emoji Story</h1>
          </div>
          {children}
        </div>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </body>
    </html>
  );
}
