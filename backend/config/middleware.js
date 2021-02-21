module.exports = {
  settings: {
    cors: {
      origin: [
        "http://localhost",
        "https://melt-g2nx2a7af-chadtmiller15.vercel.app",
        "https://melt.vercel.app",
      ],
    },
    parser: {
      enabled: true,
      multipart: true,
      formidable: {
        maxFileSize: 200 * 1024 * 1024,
      },
    },
  },
};
