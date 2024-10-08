import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import './reset.css';

import "./globals.css";
import "./styles/compositions/flex.css";
import "./styles/compositions/grid.css";
import "./styles/compositions/gridDynamique.css";



export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body >
        <nav>
          <Link href="/">
          <Image
            src="/hbo-max-ctr.png"
            width={100}
            height={100}
            alt="logo"
            className="logo"
          />
          </Link>
          <div>
            <Link href="/">
                <p>Movies</p>
            </Link>
            <Link href="/tvshows">
                <p>TV show</p>
            </Link>
            <Link href="/animations">
                <p>Animations</p>
            </Link>
            <Link href="/upgrade">
                <p>Upgrade</p>
            </Link>
          </div>
          <Image
            src="/search.png"
            width={30}
            height={30}
            alt="search"
            className="search"
          />
        </nav>
        {children}
      </body>
    </html>
  );
}
