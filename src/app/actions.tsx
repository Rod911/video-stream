"use server";

import { cookies } from "next/headers";

export async function setApiUrl(value: string) {
	const status = await fetch(value, { method: "HEAD" });
	if (!status.ok) {
		const set = cookies().set("API_URL_STATUS", "INVALID", {
			path: "/",
		});
		return {
			status: false,
			error: await status.text(),
		};
	}
	const set = cookies().set("API_URL", value, {
		path: "/",
	});
	cookies().set("API_URL_STATUS", "VALID", {
		path: "/",
	});
	return {
		status: true,
		cookie: set,
	};
}

export async function getApiUrl() {
	return cookies().get("API_URL")?.value;
}

export async function getApiUrlStatus() {
	return cookies().get("API_URL_STATUS")?.value || "EMPTY";
}
