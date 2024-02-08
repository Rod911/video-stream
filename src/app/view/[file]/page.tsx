import { getFile, getFileType, getFileSrc } from "@/api/fetchContent";
import styles from "./page.module.css";
import Image from "next/image";

export default async function Page({ params }: { params: { file: string } }) {
	const fileData = await getFile(params.file);
	if (!fileData) return null;
	const src = await getFileSrc(fileData.id);

	const fileType = getFileType(fileData.name);
	if (fileType === "image") {
		return (
			<section className={styles.section}>
				<div className={styles.imageContainer}>
					<Image src={src} alt={fileData.parent} width={800} height={800} objectFit="contain" className={styles.image} />
				</div>
			</section>
		);
	}
	if (fileType === "info") {
		const fileContent = await fetch(src);
		console.log(fileContent);
		return (
			<section className={styles.section}>
				<pre>{JSON.stringify(fileContent.type)}</pre>
			</section>
		);
	}
}
