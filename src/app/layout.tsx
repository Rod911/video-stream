import type { Metadata } from "next";
import Link from "next/link";
// import { Inter } from 'next/font/google'
import "./globals.css";
import styles from "./page.module.css";
// const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: "Video Stream",
	description: "",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body>
				<header className={styles.header}>
					<div className={styles.container}>
						<Link href="/" className={styles.brand}>
							Video Stream
						</Link>
					</div>
				</header>
				<main className={styles.container}>{children}</main>
			</body>
		</html>
	);
}
