module.exports = {
  settings: {
    // cors: {
    //   enabled: true,
    //   headers: "*",
    //   origin: ["*"],
    //   // origin: [
    //   //   "http://localhost:3000",
    //   //   "http://64.227.109.182",
    //   //   "https://melt-chadtmiller15.vercel.app",
    //   //   "https://melt.vercel.app",
    //   // ],
    // },
    cors: {
      enabled: true,
      origin: "*",
      expose: [
        "WWW-Authenticate",
        "Server-Authorization",
        "Access-Control-Expose-Headers",
      ],
      maxAge: 31536000,
      credentials: true,
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS", "HEAD"],
      headers: [
        "Content-Type",
        "Authorization",
        "X-Frame-Options",
        "Origin",
        "Access-Control-Allow-Headers",
        "access-control-allow-origin",
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
