import React from "react";
import { Box, Text, Flex } from "@chakra-ui/react";
import Image from "next/image";
import Layout from "../components/layout";

import Airtable from "airtable";

const base = new Airtable({ apiKey: "keyTyIzEu5Xh7Wfe9" }).base(
  "appLtM7uiOSFVdPBl"
);

const About = ({ config, error }) => {
  if (error) {
    return <div>An error occured: {error.message}</div>;
  }
  return (
    <Layout collections={[]} direction={{ base: "column", md: "row" }} flex={1}>
      <Box flex={1}>
        <Image
          src={`${config.fields.aboutImage[0].thumbnails.large.url}`}
          alt="mel"
          width={config.fields.aboutImage[0].thumbnails.large.width}
          height={config.fields.aboutImage[0].thumbnails.large.height}
        />
      </Box>
      <Box flex={1} ml={{ base: 0, md: 5 }} mt={{ base: 5, md: 0 }}>
        <Text>{config.fields.bio}</Text>
      </Box>
    </Layout>
  );
};

About.getInitialProps = async (ctx) => {
  try {
    const configs = await base("Config")
      .select({
        view: "Grid view",
      })
      .all();

    return { config: configs[0] };
  } catch (error) {
    return error;
  }
};

export default About;
