import Watch from "@/components/watch";
import styles from "./page.module.css";

export default function Page({ params }: { params: { file: string } }) {
	return (
		<section className={styles.section}>
			<Watch path={params.file} />
		</section>
	);
}
