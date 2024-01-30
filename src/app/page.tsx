import Link from "next/link";
import styles from "./page.module.css";
import Directories from "@/components/directories";

export default function Page() {
	return (
		<main>
			<header className={styles.header}>
				<Link href="/" className={styles.brand}>
					Video Stream
				</Link>
			</header>
			<section className={styles.section}>
				<h1>Categories</h1>
				<Directories />
			</section>
		</main>
	);
}
