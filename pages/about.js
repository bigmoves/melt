import React from "react";
import { Box, Text, Flex } from "@chakra-ui/react";
import Image from "next/image";
import Layout from "../components/layout";

import Airtable from "airtable";

const base = new Airtable({
  apiKey: process.env.NEXT_PUBLIC_AIRTABLE_KEY,
}).base(process.env.NEXT_PUBLIC_AIRTABLE_APP_KEY);

const About = ({ config, error }) => {
  if (error) {
    return <div>An error occured: {error.message}</div>;
  }
  return (
    <Layout collections={[]} direction={{ base: "column", md: "row" }} flex={1}>
      <Box flex={1}>
        <Image
          src={`${config.aboutImage[0].thumbnails.large.url}`}
          alt="mel"
          width={config.aboutImage[0].thumbnails.large.width}
          height={config.aboutImage[0].thumbnails.large.height}
        />
      </Box>
      <Box flex={1} ml={{ base: 0, md: 5 }} mt={{ base: 5, md: 0 }}>
        <Text>{config.bio}</Text>
      </Box>
    </Layout>
  );
};

export async function getStaticProps(ctx) {
  try {
    const configs = await base("Config")
      .select({
        view: "Grid view",
      })
      .all();

    return { props: { config: configs[0].fields } };
  } catch (error) {
    return { props: { error } };
  }
}

export default About;
