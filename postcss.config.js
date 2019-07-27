module.exports = {
  parser: 'postcss-scss',
  plugins: [
    require('postcss-import'),
    require('autoprefixer'),
    require('postcss-simple-vars'),
    require('postcss-advanced-variables'),
    require('postcss-nested'),
    require('cssnano'),
  ],
};
