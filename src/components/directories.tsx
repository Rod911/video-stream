import Link from "next/link";

import { getDirectories, getFileSrc, getFileType, subtitleTypes } from "@/api/fetchContent";
export default async function Directories({ path }: { path?: String }) {
	const data = await getDirectories(path);
	if (!data) return null;
	const dirName = data.name === "/" ? "Home" : data.name;
	const dirIsEmpty = data.files.length === 0;
	const dirFiles = data.files;

	return (
		<section>
			<title>{dirName + " - Video Stream"}</title>
			<h1>{dirName}</h1>
			{dirIsEmpty ? (
				<ul>
					<li>No files found</li>
				</ul>
			) : (
				<ul>
					{dirFiles
						.filter((dir) => !subtitleTypes.includes(dir.name.split(".").pop() as string))
						.map(async (dir) => {
							const isDir = dir.dir;
							if (isDir) {
								return (
									<li key={dir.id}>
										<Link href={`/browse/${dir.id}`}>{dir.name}</Link>
									</li>
								);
							}
							const fileType = getFileType(dir.name);
							if (fileType === "video") {
								return (
									<li key={dir.id}>
										<Link href={`/watch/${dir.id}`}>{dir.name}</Link>
									</li>
								);
							}
							if (fileType === "info" || fileType === "subtitle") {
								const src = await getFileSrc(dir.id);
								return (
									<li key={dir.id}>
										<Link href={src} target="_blank">{dir.name}</Link>
									</li>
								);
							}
							return (
								<li key={dir.id}>
									<Link href={`/view/${dir.id}`}>{dir.name}</Link>
								</li>
							);
						})}
				</ul>
			)}
		</section>
	);
}
