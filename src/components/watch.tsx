import { getDirectories, getFile, subtitleTypes, getFileSrc } from "@/api/fetchContent";
import Player from "./player";

export default async function Watch({ path }: { path: String }) {
	const fileData = await getFile(path);
	if (!fileData) return null;
	const dirData = await getDirectories(fileData.parent);
	if (!dirData) return null;
	const subtitleFiles = await Promise.all(
		dirData.files
			.filter((file) => subtitleTypes.includes(file.name.split(".").pop() as string))
			.map(async (apiFile) => {
				return { url: await getFileSrc(apiFile.id), name: apiFile.name };
			}),
	);
	const src = await getFileSrc(fileData.id);
	return (
		<div className="player-page">
			<h1>{dirData.name}</h1>
			<Player src={src} name={fileData.name} size={fileData.size} subs={subtitleFiles} />
			<div className="player-options">
				<a href={src} download={fileData.name}>
					Download
				</a>
			</div>
		</div>
	);
}
