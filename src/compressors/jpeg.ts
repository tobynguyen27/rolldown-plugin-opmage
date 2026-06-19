import type { JpegOptions } from '@/options';
import { compressJpeg } from '@napi-rs/image';

export const jpegCompressor = async (buffer: Uint8Array, options: JpegOptions): Promise<Buffer> =>
	compressJpeg(buffer, options);
