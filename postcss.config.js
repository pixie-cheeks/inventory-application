import postcssPresetEnv from 'postcss-preset-env';
import postcssNested from 'postcss-nested';

/**
 * @param {{
 * env: 'production' | 'development',
 * options: import('postcss').ProcessOptions,
 * file: {
 * dirname: string,
 * basename: string,
 * extname: string
 * }
 * }} context
 * @returns
 */
export default function postcssConfigFunction(context) {
  return {
    map: context.options.map,
    plugins: [postcssNested, postcssPresetEnv()],
  };
}
