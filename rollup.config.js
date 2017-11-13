/*
	rollup 配置文件
*/
import json from 'rollup-plugin-json';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import sass from 'rollup-plugin-sass';
import postcss from 'postcss';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import uglify from 'rollup-plugin-uglify';
import eslint from 'rollup-plugin-eslint';
import replace from 'rollup-plugin-replace';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';

const rollupConfig = {
	input: './src/main.js',
	output: {
		file: './dist/js/bundle.js',
		format: 'cjs'
	},
	plugins: [
		sass({
			output: './dist/css/bundle.css',
			processor: css => postcss([autoprefixer, cssnano])
		    .process(css)
		    .then(result => result.css)
		}),
		replace({
			exclude: 'node_modules/**',
	      ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
	      HOST: JSON.stringify('http://111/111')
		}),
		resolve({browser: true, jsnext: true, main: true}),
		commonjs(),
		json(),
		eslint({
			include: ['src/**/*.js']
		}),
		babel({
			exclude: 'node_modules/**',
			runtimeHelpers: true
		})
	],
	sourcemap: 'inline'
}

if (process.env.NODE_ENV === 'production') {
	rollupConfig.plugins.push(uglify())
}

if (process.env.NODE_ENV === 'development') {
	rollupConfig.plugins.push(livereload());
	rollupConfig.plugins.push(serve({
		open: true,
		contentBase: './',
		historyApiFallback: true,
		host: 'localhost',
		port: 10001,
	}));
}

export default rollupConfig;
