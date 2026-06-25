import { defineConfig, type UserConfig } from 'vite-plus';
import Opmage from 'vite-plugin-opmage';

const config: UserConfig = defineConfig({
	plugins: [Opmage()],
});

export default config;
