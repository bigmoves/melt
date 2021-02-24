"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async contact(ctx) {
    const { email, subject, message } = ctx.request.body;

    await strapi.plugins["email"].services.email.send({
      to: "chadtmiller15@gmail.com",
      from: email,
      replyTo: "mel@melt-clay.com",
      subject,
      text: message,
    });

    return "Success";
  },
};
