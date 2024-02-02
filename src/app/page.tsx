import styles from "./page.module.css";
import Directories from "@/components/directories";

export default function Page() {
	return (
		<section className={styles.section}>
			<Directories />
		</section>
	);
}
