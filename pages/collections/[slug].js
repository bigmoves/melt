import React, { useEffect, useState } from "react";
import {
  SimpleGrid,
  Box,
  Stack,
  Heading,
  Flex,
  Select,
} from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import NewLayout from "../../components/new-layout";
import uniq from "lodash.uniq";
import Carousel, { Modal, ModalGateway } from "react-images";

import Airtable from "airtable";
import Link from "../../components/link";

const base = new Airtable({
  apiKey: process.env.NEXT_PUBLIC_AIRTABLE_KEY,
}).base(process.env.NEXT_PUBLIC_AIRTABLE_APP_KEY);

const Product = ({ product, onClick }) => {
  const router = useRouter();

  //   const handleClick = (e) => {
  //     // e.preventDefault();
  //     // router.push(`/products/${product.id}`);
  //     onClick(product.id);
  //   };

  const image = product?.images?.[0];
  const imageUrl = image ? image.thumbnails.full.url : "";

  return (
    <Box cursor="pointer" onClick={onClick}>
      {product?.images?.length > 0 ? (
        <Image
          src={imageUrl}
          alt="melt"
          width={500}
          height={500}
          objectFit="cover"
        />
      ) : null}
    </Box>
  );
};

const getImageInfo = (product) => {
  const image = product?.images?.[0];
  return {
    width: image.thumbnails.large.width,
    height: image.thumbnails.large.height,
    src: image.thumbnails.large.url,
  };
};

const Collection = ({ collections, products, error }) => {
  const router = useRouter();
  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);

  console.log({ router });
  const openLightbox = (index) => {
    setCurrentImage(index);
    setViewerIsOpen(true);
  };

  const closeLightbox = () => {
    setCurrentImage(0);
    setViewerIsOpen(false);
  };

  const handleCollectionChange = (event) => {
    router.push(`/collections/${event.target.value}`);
  };

  console.log(products.map((p) => getImageInfo(p)));

  if (error) {
    return <div>An error occured: {error.message}</div>;
  }

  return (
    <NewLayout collections={collections}>
      <Select
        display={{ base: "block", md: "none" }}
        placeholder="All Collections"
        onChange={handleCollectionChange}
        value={router.query.slug}
      >
        {collections.map((c) => (
          <option value={c.toLowerCase()}>{c}</option>
        ))}
      </Select>
      <Flex>
        <Box ml={6} mr={14} mt={10} display={{ base: "none", md: "block" }}>
          <Stack>
            <Link href="/">
              <Heading size="sm">All Collections</Heading>
            </Link>
            {collections.map((c) => (
              <Link href={`/collections/${c.toLowerCase()}`}>{c}</Link>
            ))}
          </Stack>
        </Box>
        {products.length > 0 ? (
          <>
            <Box
              display={{ base: "none", md: "block" }}
              bgImg="url(/wiggle_L.svg)"
              minH="600px"
              flex="0 0 100px"
              backgroundSize="contain"
              mt={10}
              mr={2}
            ></Box>
            <SimpleGrid
              columns={{ base: 1, md: 3 }}
              spacing={{ base: 1, md: 4 }}
              mt={{ base: 3, md: 10 }}
              flex="1"
            >
              {products.map((p, index) => (
                <Product
                  key={p.id}
                  product={p}
                  onClick={() => openLightbox(index)}
                />
              ))}
            </SimpleGrid>
            <Box
              display={{ base: "none", md: "block" }}
              bgImg="url(/wiggle_R.svg)"
              minH="600px"
              flex="0 0 100px"
              backgroundSize="contain"
              mt={10}
              ml={2}
            ></Box>
          </>
        ) : null}
      </Flex>

      {/* -- Image Viewer -- */}
      <ModalGateway>
        {viewerIsOpen ? (
          <Modal onClose={closeLightbox}>
            <Carousel
              currentIndex={currentImage}
              views={products.map((p) => getImageInfo(p))}
            />
          </Modal>
        ) : null}
      </ModalGateway>
    </NewLayout>
  );
};

export async function getServerSideProps(ctx) {
  try {
    const products = await base("Products")
      .select({
        view: "Grid view",
      })
      .all();

    const collections = uniq(
      products.map((p) => p.get("collection")).filter((p) => !!p)
    );

    const filteredProducts = products
      .filter(
        (p) =>
          p.get("collection") &&
          p.get("collection").toLowerCase() === ctx.params.slug.toLowerCase()
      )
      .map((p) => ({ id: p.id, ...p.fields }));

    if (!filteredProducts.length) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        collections: collections,
        products: filteredProducts,
      },
    };
  } catch (error) {
    return { props: { error } };
  }
}

export default Collection;
