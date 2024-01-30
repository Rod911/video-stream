import Link from "next/link";

import { getDirectories } from "../api/fetchContent";
export default function Directories({ path }: { path?: String }) {
	const data = getDirectories(path);
	return (
		<ul>
			{data.then((data) => {
				if (data.data.files.length === 0) {
					return <li>No files found</li>;
				}
				return data.data.files.map((dir) => <li key={dir.id}>{dir.dir ? <Link href={`/browse/${dir.id}`}>{dir.name}</Link> : <Link href={`/watch/${dir.id}`}>{dir.name}</Link>}</li>);
			})}
		</ul>
	);
}
