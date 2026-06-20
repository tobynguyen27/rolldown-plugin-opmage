import { getFileExtension } from '@/utils/file';
import { forEach, gen, type Effect } from 'effect/Effect';
import type { OutputBundle } from 'rolldown';
import { pngCompressor } from './png';
import { jpegCompressor } from './jpeg';
import { webpCompressor } from './webp';
import { avifCompressor } from './avif';
import type { UnknownException } from 'effect/Cause';
import type { Options } from '@/options';

export const compressor = (
	bundles: OutputBundle,
	options: Options,
): Effect<void[], UnknownException> =>
	forEach(
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
