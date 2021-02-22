module.exports = ({ env }) => ({
  host: env("HOST", "0.0.0.0"),
  port: env.int("PORT", 1337),
  url: "api.studsnstuff.dev",
  admin: {
    auth: {
      secret: env("ADMIN_JWT_SECRET", "f3bbae485ea8f4ec67db5022f14ecd20"),
    },
  },
});
