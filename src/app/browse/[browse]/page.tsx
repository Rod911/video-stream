import styles from "../../page.module.css";

import Directories from "@/components/directories";

export default function Page({ params }: { params: { browse: string } }) {
	return (
		<main>
			<section className={styles.section}>
				<h1>List</h1>
				<Directories path={params.browse} />
			</section>
		</main>
	);
}
