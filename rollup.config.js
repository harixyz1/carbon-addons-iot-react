import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
import { uglify } from 'rollup-plugin-uglify';
import filesize from 'rollup-plugin-filesize';
import postcss from 'rollup-plugin-postcss';

const env = process.env.NODE_ENV || 'development';
const prodSettings = env === 'development' ? [] : [uglify(), filesize()];

export default {
  input: 'src/index.js',
  output: {
    file: 'lib/index.js',
    name: 'CarbonAddonsIoTReact',
    format: 'umd',
    globals: {
      classnames: 'classNames',
      'prop-types': 'PropTypes',
      react: 'React',
      'react-dom': 'ReactDOM',
      '@carbon/charts': 'CarbonCharts',
      '@carbon/charts-react': 'CarbonChartsReact',
      'carbon-icons': 'CarbonIcons',
      '@carbon/icons-react': 'CarbonIconsReact',
      'carbon-components': 'CarbonComponents',
      'carbon-components-react': 'CarbonComponentsReact',
      'styled-components': 'styled',
      d3: 'd3',
    },
  },
  external: [
    'react',
    'styled-components',
    'prop-types',
    'carbon-components-react',
    'carbon-icons',
    '@carbon/charts',
    '@carbon/charts-react',
    '@carbon/icons',
    '@carbon/icons-react',
    'carbon-components',
    'd3',
  ],
  plugins: [
    resolve({ browser: true, extensions: ['.mjs', '.js', '.jsx', '.json'] }),
    postcss({
      plugins: [],
    }),
    commonjs({
      namedExports: {
        'react-js': ['isValidElementType'],
        'node_modules/carbon-components-react/lib/components/UIShell/index.js': [
          'Header',
          'HeaderName',
          'HeaderMenu',
          'HeaderGlobalBar',
          'HeaderGlobalAction',
          'SkipToContent',
          'HeaderMenuItem',
          'HeaderNavigation',
          'SideNav',
          'SideNavItems',
          'SideNavLink',
          'SideNavMenu',
          'SideNavMenuItem',
          'SideNavFooter',
        ],
      },

      include: 'node_modules/**',
    }),

    babel({
      exclude: 'node_modules/**',
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify(env),
    }),
    ...prodSettings,
  ],
};
