import React from "react";
import {
  Flex,
  Input,
  FormControl,
  FormLabel,
  Textarea,
  FormErrorMessage,
  Button,
  Box,
} from "@chakra-ui/react";
import axios from "axios";
import Layout from "../components/layout";
import { useForm } from "react-hook-form";

const apiHost = "https://api.studsnstuff.dev";

const Contact = ({ config, error }) => {
  const { register, handleSubmit, reset, errors } = useForm();

  if (error) {
    return <div>An error occured: {error.message}</div>;
  }

  const submit = async (data) => {
    await axios.post(`${apiHost}/contact`, data);
    reset();
  };

  return (
    <Layout config={config} collections={[]}>
      <Box
        as="form"
        pt="4vw"
        direction="column"
        onSubmit={handleSubmit(submit)}
      >
        <Flex pb={5}>
          <FormControl id="first" pr={5} isInvalid={errors.first}>
            <FormLabel>First</FormLabel>
            <Input
              borderColor="palevioletred"
              name="first"
              ref={register({ required: true })}
            />
            <FormErrorMessage>Enter a first name</FormErrorMessage>
          </FormControl>
          <FormControl id="last" isInvalid={errors.last}>
            <FormLabel>Last</FormLabel>
            <Input
              borderColor="palevioletred"
              name="last"
              ref={register({ required: true })}
            />
            <FormErrorMessage>Enter a last name</FormErrorMessage>
          </FormControl>
        </Flex>
        <FormControl id="email" pb={5} isInvalid={errors.email}>
          <FormLabel>Email</FormLabel>
          <Input
            borderColor="palevioletred"
            name="email"
            ref={register({ required: true })}
          />
          <FormErrorMessage>Enter an email</FormErrorMessage>
        </FormControl>
        <FormControl id="subject" pb={5} isInvalid={errors.subject}>
          <FormLabel>Subject</FormLabel>
          <Input
            borderColor="palevioletred"
            name="subject"
            ref={register({ required: true })}
          />
          <FormErrorMessage>Enter a subject</FormErrorMessage>
        </FormControl>
        <FormControl id="message" pb={5} isInvalid={errors.message}>
          <FormLabel>Message</FormLabel>
          <Textarea
            height={200}
            borderColor="palevioletred"
            name="message"
            ref={register({ required: true })}
          />
          <FormErrorMessage>Enter a message</FormErrorMessage>
        </FormControl>

        <Button type="submit" colorScheme="blackAlpha">
          Submit
        </Button>
      </Box>
    </Layout>
  );
};

Contact.getInitialProps = async (ctx) => {
  try {
    const res = await axios.get(`${apiHost}/configs/1`);
    const config = res.data;
    return { config };
  } catch (error) {
    return { error };
  }
};

export default Contact;
