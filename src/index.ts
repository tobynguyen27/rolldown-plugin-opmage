import type { Plugin } from 'rolldown';
import { extname } from 'pathe';
import { defaultOptions, type Options } from './options';
import { pngCompressor } from './compressors/png';
import { jpegCompressor } from './compressors/jpeg';
import { webpCompressor } from './compressors/webp';
import { avifCompressor } from './compressors/avif';

export default function Opmage(opts: Partial<Options> = {}): Plugin {
	const options = { ...defaultOptions, ...opts } satisfies Options;

	return {
		name: 'rolldown-plugin-opmage',
		async generateBundle(outputOptions, bundles, isWrite) {
			for (const bundleName in bundles) {
				const bundle = bundles[bundleName];

				if (bundle.type !== 'asset' || typeof bundle.source === 'string') continue;

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
			}
		},
	};
}
