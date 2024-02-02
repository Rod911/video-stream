// GET https://dhokla.net/api/d/
// GET https://dhokla.net/api/d/{dir_id}
// GET https://dhokla.net/api/l/{dir_id}
// GET https://dhokla.net/f/{file_id}
const API_BASE_URL = "https://drunk.vadapav.mov/api/d/";
const API_FILE_URL = "https://drunk.vadapav.mov/f/";

type ApiFile = {
	id: string;
	name: string;
	dir: false;
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
	const directories = await fetch(`${API_BASE_URL}${dir}`)
		.then((response) => response.json())
		.then((data: ApiDirResponse) => data.data);
	return directories;
}

export async function getFile(id: String) {
	const file = await fetch(`${API_BASE_URL}${id}`)
		.then((response) => response.json())
		.then((data: ApiFileResponse) => data.data);
	return file;
}

export function watchUrl(id: String) {
	return `${API_FILE_URL}${id}`;
}

export const subtitleTypes = ["srt", "sub", "txt"];
