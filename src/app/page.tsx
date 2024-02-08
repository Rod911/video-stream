import styles from "./page.module.css";
import Directories from "@/components/directories";
import { getApiUrl } from "./actions";

export default async function Page() {
	const API_URL = await getApiUrl();

	return (
		API_URL && (
			<section className={styles.section}>
				<Directories />
			</section>
		)
	);
}
