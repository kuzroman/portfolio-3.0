module.exports = {
  plugins: {
    'postcss-preset-env': {
      browsers: 'last 2 versions',
      autoprefixer: process.env.NODE_ENV === 'production',
    },
  },
}
