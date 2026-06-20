import type { LosslessPngOptions, LossyPngOptions, PngOptions } from '@/options';
import { losslessCompressPng, pngQuantize } from '@napi-rs/image';
import type { UnknownException } from 'effect/Cause';
import { tryPromise, type Effect } from 'effect/Effect';

export const pngCompressor = (
	buffer: Uint8Array,
	options: PngOptions,
): Effect<Buffer, UnknownException, never> => {
	if (options.algorithm === 'lossless') return losslessPngCompressor(buffer, options);

	return lossyPngCompressor(buffer, options);
};

const losslessPngCompressor = (buffer: Uint8Array, options: LosslessPngOptions) =>
	tryPromise(() => losslessCompressPng(buffer, options));

const lossyPngCompressor = (buffer: Uint8Array, options: LossyPngOptions) =>
	tryPromise(() => pngQuantize(buffer, options));
