"use client";

import Plyr, { PlyrOptions, PlyrSource } from "plyr-react";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile, toBlobURL } from "@ffmpeg/util";
import "plyr-react/plyr.css";
import { useEffect, useRef, useState } from "react";

export default function Player({ src, name, size, subs = [] }: { src: string; name: string; size?: number; subs?: { url: string; name: string }[] }) {
	const [loaded, setLoaded] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const ffmpegRef = useRef(new FFmpeg());
	const urlRef = useRef("");

	const load = async () => {
		setIsLoading(true);
		const baseURL = "https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd";
		const ffmpeg = ffmpegRef.current;
		ffmpeg.on("log", ({ message }) => {
			// if (messageRef.current) messageRef.current.innerHTML = message;
			console.log(message);
		});
		// toBlobURL is used to bypass CORS issue, urls with the same
		// domain can be used directly.
		await ffmpeg.load({
			coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, "text/javascript"),
			wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, "application/wasm"),
		});
		setLoaded(true);
		setIsLoading(false);
		transcode();
	};

	const transcode = async () => {
		const ffmpeg = ffmpegRef.current;
		const srcExt = src.split(".").pop();
		const inputFileName = `input.${srcExt}`;
		await ffmpeg.writeFile(inputFileName, await fetchFile(src));
		await ffmpeg.exec(["-i", inputFileName, "output.mp4"]);
		const data = (await ffmpeg.readFile("output.mp4")) as any;
		const videoUrl = URL.createObjectURL(new Blob([data.buffer], { type: "video/mp4" }));
		// urlRef.current = videoUrl;

		source.sources.push({
			// src: urlRef.current,
			src: videoUrl,
			provider: "html5",
			size: size,
		});
	};

	const source: PlyrSource = {
		type: "video",
		title: name,
		sources: [],
		tracks: subs.map((sub, i) => {
			return {
				kind: "captions",
				label: sub.name.split(".").pop() as string,
				src: sub.url,
				default: i === 0,
				srcLang: "",
			};
		}),
	};

	const options: PlyrOptions = {
		autoplay: true,
	};

	useEffect(() => {
		load();
	});
	// console.log(loaded);

	// return loaded ? (
	// 	<div>
	// 		<Plyr source={source} options={options} />
	// 	</div>
	// ) : (
	// 	<div>Loading...</div>
	// 	);
	// return <Plyr source={source} options={options} />;
	return loaded ? <Plyr source={source} options={options} /> : isLoading ? <div>Loading...</div> : <div>Failed to load</div>;
}
