import React from "react";
import { Box, Text, Flex } from "@chakra-ui/react";
import Image from "next/image";
import NewLayout from "../components/new-layout";

import Airtable from "airtable";

const base = new Airtable({
  apiKey: process.env.NEXT_PUBLIC_AIRTABLE_KEY,
}).base(process.env.NEXT_PUBLIC_AIRTABLE_APP_KEY);

const About = ({ config, error }) => {
  if (error) {
    return <div>An error occured: {error.message}</div>;
  }
  return (
    <NewLayout collections={[]}>
      <Flex direction="row" justifyContent="center">
        <Box maxW={700} py={10}>
          <Image
            src={`${config.aboutImage[0].thumbnails.large.url}`}
            alt="mel"
            width={config.aboutImage[0].thumbnails.large.width}
            height={config.aboutImage[0].thumbnails.large.height}
          />
          <Text mt={3}>{config.bio}</Text>
        </Box>
      </Flex>
    </NewLayout>
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
