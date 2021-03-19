const handler = async (req, res) => {
  const stripeKey = process.env.STRIPE_SECRET_API_KEY;
  const stripe = require("stripe")(stripeKey);
  const { products } = req.body;

  const session = await stripe.checkout.sessions.create({
    // customer_email: email,
    payment_method_types: ["card"],
    line_items: products.map((p) => ({
      name: p.name,
      description: p.description,
      amount: p.price * 100,
      currency: "usd",
      quantity: 1,
      images: [p.image.url],
    })),
    success_url:
      process.env.NODE_ENV === "production"
        ? `https://meltclay.com`
        : `http://localhost:3000/`,
    cancel_url:
      process.env.NODE_ENV === "production"
        ? `https://meltclay.com`
        : "http://localhost:3000/cart",
  });

  res.json({ sessionId: session.id });
};

export default handler;
