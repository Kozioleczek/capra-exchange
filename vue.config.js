module.exports = {
  devServer: {
    proxy: {
      'https://free.currconv.com/^': {
        target: 'https://free.currconv.com/api/v7',
        changeOrigin: true,
      },
    },
  },
};
