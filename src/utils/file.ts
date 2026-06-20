import { extname } from 'pathe';

export const getFileExtension = (fileName: string): string => extname(fileName).slice(1);
