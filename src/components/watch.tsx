import { getDirectories, getFile, subtitleTypes, watchUrl } from "../api/fetchContent";
import Player from "./player";

export default async function Watch({ path }: { path: String }) {
	const fileData = await getFile(path);
	const dirData = await getDirectories(fileData.parent);
	const subtitleFiles = dirData.files
		.filter((file) => subtitleTypes.includes(file.name.split(".").pop() as string))
		.map((apiFile) => {
			return { url: watchUrl(apiFile.id), name: apiFile.name };
		});
	const src = watchUrl(fileData.id);
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
