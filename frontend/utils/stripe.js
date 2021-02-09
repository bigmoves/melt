import axios from "axios";

export const checkout = (items) => {
  const stripeKey =
    "pk_test_51IIPU4L5C5ZVC56p35gxNkhAaXzZXxLbU5as3sr9X230tvn7mpwoGTxdMn9RTWZUZNZteUx7HESHH6pC5YYvD5Z000inaW6bMU";
  // process.env.NODE_ENV === "production"
  //   ? process.env.STRIPE_PUBLIC_API_KEY_PROD
  //   : process.env.STRIPE_PUBLIC_API_KEY;
  const stripe = Stripe(stripeKey);

  return axios("http://localhost:1337/checkout", {
    method: "post",
    // withCredentials: true,
    data: { items },
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
