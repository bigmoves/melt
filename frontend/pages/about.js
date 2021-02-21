import React from "react";
import { Box, Text, Flex } from "@chakra-ui/react";
import axios from "axios";
import Image from "next/image";
import Layout from "../components/layout";

const apiHost = "http://64.227.109.182";

const About = ({ config, error }) => {
  if (error) {
    return <div>An error occured: {error.message}</div>;
  }
  return (
    <Layout config={config} collections={[]}>
      <Flex direction={{ base: "column", md: "row" }}>
        <Box flex={1} pr="3vw">
          <Image
            src={`${apiHost}${config.aboutImage.formats.large.url}`}
            alt="mel"
            width={config.aboutImage.formats.large.width}
            height={config.aboutImage.formats.large.height}
          />
        </Box>
        <Box pt="4vw" flex={1}>
          <Text>{config.bio}</Text>
        </Box>
      </Flex>
    </Layout>
  );
};

About.getInitialProps = async (ctx) => {
  try {
    const res = await axios.get("http://64.227.109.182/configs/1");
    const config = res.data;
    return { config };
  } catch (error) {
    return { error };
  }
};

export default About;
