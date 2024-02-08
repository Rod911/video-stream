import { getApiUrl, getApiUrlStatus, setApiUrl } from "@/app/actions";
import styles from "@/app/page.module.css";
import { redirect } from "next/navigation";

export default async function ApiForm() {
	async function handleSave(formData: FormData) {
		"use server";

		const rawFormData = {
			API_URL: formData.get("api_url"),
		};
		const update = await setApiUrl(rawFormData.API_URL?.toString() || "");
		if (!update.status) {
			// alert(update.error);
			// return;
		}
		redirect("/", );
	}
	const API_URL_STATUS = await getApiUrlStatus();
	const API_URL = (API_URL_STATUS === "VALID" || API_URL_STATUS === "EMPTY") ? await getApiUrl() : "";
	return (
		<form className={styles.headerForm} action={handleSave}>
			<input type="text" id="API_URL" placeholder={API_URL_STATUS === "INVALID" ? "Invalid API URL" : "API URL"} name="api_url" required className={styles.headerInput} defaultValue={API_URL} />
			<button type="submit" className={styles.headerButton}>
				Save
			</button>
		</form>
	);
}
