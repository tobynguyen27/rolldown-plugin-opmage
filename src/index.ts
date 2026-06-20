import type { Plugin } from 'rolldown';
import { defaultOptions, type Options } from './options';
import { pngCompressor } from './compressors/png';
import { jpegCompressor } from './compressors/jpeg';
import { webpCompressor } from './compressors/webp';
import { avifCompressor } from './compressors/avif';
import { forEach, gen, runPromise } from 'effect/Effect';
import { getFileExtension } from './utils/file';

export default function Opmage(opts: Partial<Options> = {}): Plugin {
	const options = { ...defaultOptions, ...opts } satisfies Options;

	return {
		name: 'rolldown-plugin-opmage',
		async generateBundle(outputOptions, bundles, isWrite) {
			const program = forEach(
				Object.values(bundles),
				(bundle) =>
					gen(function* () {
						if (bundle.type !== 'asset' || typeof bundle.source === 'string') return;

						const fileExtension = yield* getFileExtension(bundle.fileName);
						const buffer = bundle.source;

						switch (fileExtension) {
							case 'png':
								bundle.source = yield* pngCompressor(buffer, options.png);
								break;
							case 'jpg':
							case 'jpeg':
								bundle.source = yield* jpegCompressor(buffer, options.jpeg);
								break;
							case 'webp':
								bundle.source = yield* webpCompressor(buffer, options.webp);
								break;
							case 'avif':
								bundle.source = yield* avifCompressor(buffer, options.avif);
								break;
						}
					}),
				{ concurrency: options.concurrency },
			);

			await runPromise(program);
		},
	};
}
