import type { AvifOptions } from '@/options';
import { Transformer } from '@napi-rs/image';
import type { UnknownException } from 'effect/Cause';
import { tryPromise, type Effect } from 'effect/Effect';

export const avifCompressor = (
	buffer: Uint8Array,
	options: AvifOptions,
): Effect<Buffer, UnknownException, never> =>
	tryPromise(() => new Transformer(buffer).avif(options));
