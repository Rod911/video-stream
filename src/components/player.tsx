"use client";

import Plyr, { PlyrOptions, PlyrSource } from "plyr-react";
import "plyr-react/plyr.css";

export default function Player({ src, name }: { src: string, name: string }) {
	const source: PlyrSource = {
		type: "video",
		title: name,
		sources: [
			{
				src,
				provider: "html5",
			},
		],
	};

	const options: PlyrOptions = {
		autoplay: true,
	};

	return (
		<div>
			<Plyr source={source} options={options} />
		</div>
	);
}
