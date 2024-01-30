import { getFile, watchUrl } from "../api/fetchContent";
import Player from "./player";

export default async function Watch({ path }: { path: String }) {
	const fileData = await getFile(path);
	const src = watchUrl(fileData.data.id);
	return (
		<div className="player-page">
			<Player src={src} name={fileData.data.name} />
			<div className="player-options">
				<a href={src} download={fileData.data.name}>
					Download
				</a>
			</div>
		</div>
	);
}
