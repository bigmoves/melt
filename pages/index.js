import uniq from "lodash.uniq";

import Airtable from "airtable";

const base = new Airtable({
  apiKey: process.env.NEXT_PUBLIC_AIRTABLE_KEY,
}).base(process.env.NEXT_PUBLIC_AIRTABLE_APP_KEY);

const Home = () => {
  return null;
};

export async function getServerSideProps(ctx) {
  try {
    const products = await base("Products")
      .select({
        view: "Grid view",
      })
      .all();

    const collections = uniq(
      products
        .filter((p) => p.get("collection"))
        .map((p) => p.get("collection").toLowerCase())
    );

    return {
      redirect: {
        destination: `/collections/${collections[0]}`,
        permanent: false,
      },
    };
  } catch (error) {
    return { props: { error } };
  }
}

export default Home;
