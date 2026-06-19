import type { AvifOptions } from '@/options';
import { Transformer } from '@napi-rs/image';

export const avifCompressor = async (buffer: Uint8Array, options: AvifOptions): Promise<Buffer> =>
	new Transformer(buffer).avif(options);
