import postcssPresetEnv from 'postcss-preset-env';
import postcssNested from 'postcss-nested';

const postcssConfig = {
  plugins: [postcssNested, postcssPresetEnv()],
};

export default postcssConfig;
