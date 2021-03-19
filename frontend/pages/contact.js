import React, { useState } from "react";
import {
  Flex,
  Input,
  FormControl,
  FormLabel,
  Textarea,
  FormErrorMessage,
  Button,
  Box,
  Text,
} from "@chakra-ui/react";
import Layout from "../components/layout";
import { useForm } from "react-hook-form";

import Airtable from "airtable";

const base = new Airtable({ apiKey: "keyTyIzEu5Xh7Wfe9" }).base(
  "appLtM7uiOSFVdPBl"
);

const Contact = ({ error }) => {
  const { register, handleSubmit, reset, errors } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [messageSent, setMessageSent] = useState(false);

  if (error) {
    return <div>An error occured: {error.message}</div>;
  }

  const submit = async (data) => {
    setMessageSent(false);
    setIsSubmitting(true);
    await base("Messages").create([
      {
        fields: {
          name: data.name,
          email: data.email,
          message: data.message,
        },
      },
    ]);
    setIsSubmitting(false);
    setMessageSent(true);
    reset();
  };

  return (
    <Layout collections={[]}>
      <Box
        as="form"
        direction="column"
        width={{ base: "100%", md: "500px" }}
        onSubmit={handleSubmit(submit)}
      >
        <FormControl id="first" pb={5} isInvalid={errors.name}>
          <FormLabel>Name</FormLabel>
          <Input
            borderColor="palevioletred"
            name="name"
            ref={register({ required: true })}
          />
          <FormErrorMessage>Enter a name</FormErrorMessage>
        </FormControl>
        <FormControl id="email" pb={5} isInvalid={errors.email}>
          <FormLabel>Email</FormLabel>
          <Input
            borderColor="palevioletred"
            name="email"
            ref={register({ required: true })}
          />
          <FormErrorMessage>Enter an email</FormErrorMessage>
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

        <Button type="submit" colorScheme="blackAlpha" isLoading={isSubmitting}>
          Submit
        </Button>
        {messageSent && (
          <Text pt={5} pb={5}>
            Message sent. Talk to you soon ✨
          </Text>
        )}
      </Box>
    </Layout>
  );
};

export default Contact;
