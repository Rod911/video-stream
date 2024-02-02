import styles from "./page.module.css";

import Directories from "@/components/directories";

export default function Page({ params }: { params: { browse: string } }) {
	return (
		<section className={styles.section}>
			<Directories path={params.browse} />
		</section>
	);
}
