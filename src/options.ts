import type {
	AvifConfig,
	JpegCompressOptions,
	PNGLosslessOptions,
	PngQuantOptions,
} from '@napi-rs/image';

export type LosslessPngOptions = { algorithm: 'lossless' } & PNGLosslessOptions;
export type LossyPngOptions = { algorithm: 'lossy' } & PngQuantOptions;
export type PngOptions = LosslessPngOptions | LossyPngOptions;

export type JpegOptions = JpegCompressOptions;

export type LossyWebpOptions = { algorithm: 'lossy'; quality: number };
export type LosslessWebpOptions = { algorithm: 'lossless' };
export type WebpOptions = LosslessWebpOptions | LossyWebpOptions;

export type AvifOptions = AvifConfig;

export type Options = {
	png: PngOptions;
	jpeg: JpegOptions;
	webp: WebpOptions;
	avif: AvifOptions;
};

export const defaultOptions: Options = {
	png: {
		algorithm: 'lossless',
		strip: true,
	},
	jpeg: {
		quality: 80,
	},
	webp: {
		algorithm: 'lossy',
		quality: 80,
	},
	avif: {
		quality: 75,
	},
};
