import { version as browserslistVersion } from 'browserslist/package.json';
import license from 'rollup-plugin-license';
import typescript from '@wessberg/rollup-plugin-ts';
import { author, browserslist, main, module, name, repository, version } from './package.json';


const input = './typescript.ts';

const commonPlugins = [
	license({
		banner: {
		commentStyle: 'none',
		content: `/*! ${name} v${version} | (c) ${author.name} | ${repository.url.replace('.git', `/blob/v${version}/LICENSE`)} | @browserslist v${browserslistVersion}: ${browserslist.join(', ')} */`
		}
	})
];


export default [
	{
		input,
		output: {
			file: module,
			format: 'es'
		},
		plugins: [
			typescript({
				transpiler: 'babel',
				babelConfig: {
					presets: [['@babel/preset-env']],
					comments: false
				}
			}),
			...commonPlugins
		]
	},
	{
		input,
		output: {
			name,
			file: main,
			format: 'umd'
		},
		plugins: [
			typescript({
				transpiler: 'babel',
				tsconfig: (config) => ({
					...config,
					declaration: false
				}),
				babelConfig: {
					presets: [['@babel/preset-env']],
					comments: false
				}
			}),
			...commonPlugins
		]
	}
];
