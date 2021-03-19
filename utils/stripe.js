import axios from "axios";

export const checkout = (products) => {
  const stripeKey = process.env.NEXT_PUBLIC_STRIPE_API_KEY;
  const stripe = Stripe(stripeKey);

  return axios("/api/checkout", {
    method: "post",
    data: { products },
  }).then((res) => {
    stripe
      .redirectToCheckout({
        sessionId: res.data.sessionId,
      })
      .then(function (result) {
        console.log(result.error.message);
      });
  });
};
