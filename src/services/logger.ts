import { Context } from 'effect';
import type { PluginContext } from 'vite/rolldown';

interface LoggerService {
	info: (msg: string) => void;
	warn: (msg: string) => void;
	error: (msg: string) => void;
}

export class Logger extends Context.Tag('vite-plugin-opmage/Logger')<Logger, LoggerService>() {}

export const createLogger = ({ info, warn, error }: PluginContext): LoggerService => ({
	info,
	warn,
	error,
});
