"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async checkout(ctx) {
    const stripeKey =
      process.env.NODE_ENV === "production"
        ? process.env.STRIPE_SECRET_API_KEY_PROD
        : process.env.STRIPE_SECRET_API_KEY;
    const stripe = require("stripe")(stripeKey);
    const { items } = ctx.request.body;

    console.log(JSON.stringify(items));

    const session = await stripe.checkout.sessions.create({
      // customer_email: email,
      payment_method_types: ["card"],
      line_items: items.map((item) => ({
        name: item.title,
        description: item.description,
        amount: item.price * 100,
        currency: "usd",
        quantity: 1,
        images: item.images,
      })),
      // metadata: {
      // },
      success_url:
        process.env.NODE_ENV === "production"
          ? `https://meltclay.com`
          : `http://localhost:3000/`,
      cancel_url:
        process.env.NODE_ENV === "production"
          ? `https://meltclay.com`
          : "http://localhost:3000/cart",
    });

    return { sessionId: session.id };
  },
};
