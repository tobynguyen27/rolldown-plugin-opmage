import type { LossyWebpOptions, WebpOptions } from '@/options';
import { Transformer } from '@napi-rs/image';

export const webpCompressor = async (buffer: Uint8Array, options: WebpOptions): Promise<Buffer> => {
	if (options.algorithm === 'lossless') return losslessWebpCompressor(buffer);

	return lossyWebpCompressor(buffer, options);
};

const losslessWebpCompressor = async (buffer: Uint8Array) => new Transformer(buffer).webpLossless();

const lossyWebpCompressor = async (buffer: Uint8Array, { quality }: LossyWebpOptions) =>
	new Transformer(buffer).webp(quality);
