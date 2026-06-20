import type { Plugin } from 'rolldown';
import { extname } from 'pathe';
import { defaultOptions, type Options } from './options';
import { pngCompressor } from './compressors/png';
import { jpegCompressor } from './compressors/jpeg';
import { webpCompressor } from './compressors/webp';
import { avifCompressor } from './compressors/avif';
import pLimit from 'p-limit';

export default function Opmage(opts: Partial<Options> = {}): Plugin {
	const options = { ...defaultOptions, ...opts } satisfies Options;
	const limit = pLimit(options.concurrency);

	return {
		name: 'rolldown-plugin-opmage',
		async generateBundle(outputOptions, bundles, isWrite) {
			const tasks = Object.values(bundles).map((bundle) =>
				limit(async () => {
					if (bundle.type !== 'asset' || typeof bundle.source === 'string') return;

					const fileExtension = extname(bundle.fileName).slice(1);
					const buffer = bundle.source;

					switch (fileExtension) {
						case 'png':
							bundle.source = await pngCompressor(buffer, options.png);
							break;
						case 'jpg':
						case 'jpeg':
							bundle.source = await jpegCompressor(buffer, options.jpeg);
							break;
						case 'webp':
							bundle.source = await webpCompressor(buffer, options.webp);
							break;
						case 'avif':
							bundle.source = await avifCompressor(buffer, options.avif);
							break;
					}
				}),
			);

			await Promise.all(tasks);
		},
	};
}
