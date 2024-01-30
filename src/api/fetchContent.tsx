// GET https://dhokla.net/api/d/
// GET https://dhokla.net/api/d/{dir_id}
// GET https://dhokla.net/api/l/{dir_id}
// GET https://dhokla.net/f/{file_id}
const API_BASE_URL = "https://drunk.vadapav.mov/api/d/";
const API_FILE_URL = "https://drunk.vadapav.mov/f/";

type ApiResponse = {
	message: string;
	data: {
		id: string;
		name: string;
		dir: boolean;
		parent?: string;
		mtime: string;
		files: {
			id: string;
			name: string;
			dir: boolean;
			size: number;
			parent: ApiResponse["data"]["id"];
			mtime: Date;
		}[];
	};
};

export async function getDirectories(dir: String = "") {
	const directories = await fetch(`${API_BASE_URL}${dir}`)
		.then((response) => response.json())
		.then((data: ApiResponse) => data);
	return directories;
}

export async function getFile(id: String) {
	const file = await fetch(`${API_BASE_URL}${id}`)
		.then((response) => response.json())
		.then((data: ApiResponse) => data);
	return file;
}

export function watchUrl(id: String) {
	return `${API_FILE_URL}${id}`;
}
