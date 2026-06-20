import type { JpegOptions } from '@/options';
import { compressJpeg } from '@napi-rs/image';
import type { UnknownException } from 'effect/Cause';
import { tryPromise, type Effect } from 'effect/Effect';

export const jpegCompressor = (
	buffer: Uint8Array,
	options: JpegOptions,
): Effect<Buffer, UnknownException, never> => tryPromise(() => compressJpeg(buffer, options));
