import { getFile, getFileSrc } from "@/api/fetchContent";
import { redirect } from "next/navigation";

export default async function Page({ params }: { params: { file: string } }) {
	const fileData = await getFile(params.file);
	if (!fileData) return null;
	const src = await getFileSrc(fileData.id);
	redirect(src);
}
