module.exports = {
  settings: {
    cors: {
      enabled: true,
      origin: [
        "http://localhost:3000",
        "http://64.227.109.182",
        "https://melt-chadtmiller15.vercel.app",
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
