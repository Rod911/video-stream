import Link from "next/link";

import { getDirectories, subtitleTypes } from "../api/fetchContent";
export default async function Directories({ path }: { path?: String }) {
	const data = await getDirectories(path);
	const dirName = data.name === "/" ? "Home" : data.name;
	const dirIsEmpty = data.files.length === 0;
	const dirFiles = data.files;
	return (
		<section>
			<h1>{dirName}</h1>
			{dirIsEmpty ? (
				<ul>
					<li>No files found</li>
				</ul>
			) : (
				<ul>
					{dirFiles
						.filter((dir) => !subtitleTypes.includes(dir.name.split(".").pop() as string))
						.map((dir) => (
							<li key={dir.id}>{dir.dir ? <Link href={`/browse/${dir.id}`}>{dir.name}</Link> : <Link href={`/watch/${dir.id}`}>{dir.name}</Link>}</li>
						))}
				</ul>
			)}
		</section>
	);
}
