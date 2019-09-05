import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

export default {
	input: 'src/index.js',
	output: {
		name: 'IWorker',
		file: 'dist/index.js',
		format: 'umd',
	},
	plugins: [
		resolve(),
		babel({
			exclude: 'node_modules/**',
		}),
		commonjs(),
	],
};
