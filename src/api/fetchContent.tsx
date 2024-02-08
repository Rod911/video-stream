import { getApiUrl } from "@/app/actions";

const API_BASE_URL = async () => {
	const API_URL = await getApiUrl();
	return `${API_URL}api/d/`;
};
const API_FILE_URL = async () => {
	const API_URL = await getApiUrl();
	return `${API_URL}f/`;
};

type ApiFile = {
	id: string;
	name: string;
	dir: boolean;
	size: number;
	parent: ApiDir["id"];
	mtime: Date;
	files: [];
};

type ApiFileResponse = {
	message: string;
	data: ApiFile;
};

type ApiDir = {
	id: string;
	name: string;
	dir: boolean;
	parent?: string;
	mtime: string;
	files: ApiFile[];
};

type ApiDirResponse = {
	message: string;
	data: ApiDir;
};

export async function getDirectories(dir: String = "") {
	const directories = await fetch(`${await API_BASE_URL()}${dir}`)
		.then((response) => response.json())
		.then((data: ApiDirResponse) => data.data);
	return directories;
}

export async function getFile(id: String) {
	const file = await fetch(`${await API_BASE_URL()}${id}`)
		.then((response) => response.json())
		.then((data: ApiFileResponse) => data.data);
	return file;
}

export async function getFileSrc(id: String) {
	return `${await API_FILE_URL()}${id}`;
}

export const subtitleTypes = ["srt", "sub", "txt"];
export const imageTypes = ["jpg", "jpeg", "png", "gif", "webp", "avif", "tiff", "tif", "bmp", "svg", "svgz"];
export const videoTypes = ["mp4", "mkv", "mov", "webm", "avi", "flv", "m3u8", "3gp"];
export const infoTypes = ["info", "nfo", "json", "log", "txt"];

export const getFileType = (name: string) => {
	const ext = name.split(".").pop();
	if (!ext) return "file";
	if (subtitleTypes.includes(ext)) return "subtitle";
	if (imageTypes.includes(ext)) return "image";
	if (videoTypes.includes(ext)) return "video";
	if (infoTypes.includes(ext)) return "info";
	return "file";
};
