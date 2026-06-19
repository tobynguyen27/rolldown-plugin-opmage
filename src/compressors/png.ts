import type { LosslessPngOptions, LossyPngOptions, PngOptions } from '@/options';
import { losslessCompressPng, pngQuantize } from '@napi-rs/image';

export const pngCompressor = async (buffer: Uint8Array, options: PngOptions): Promise<Buffer> => {
	if (options.algorithm === 'lossless') return losslessPngCompressor(buffer, options);

	return lossyPngCompressor(buffer, options);
};

const losslessPngCompressor = async (buffer: Uint8Array, options: LosslessPngOptions) =>
	losslessCompressPng(buffer, options);

const lossyPngCompressor = async (buffer: Uint8Array, options: LossyPngOptions) =>
	pngQuantize(buffer, options);
