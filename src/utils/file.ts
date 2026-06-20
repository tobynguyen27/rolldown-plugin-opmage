import { succeed, type Effect } from 'effect/Effect';
import { extname } from 'pathe';

export const getFileExtension = (fileName: string): Effect<string, never, never> =>
	succeed(extname(fileName).slice(1));
