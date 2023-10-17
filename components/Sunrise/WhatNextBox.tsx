import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Link,
  Stack,
} from '@chakra-ui/react';

export const WhatNextBox = () => (
  <Card backgroundColor="rgba(255, 255, 255, 0.05)">
    <CardHeader>
      <Heading size="md">What next?</Heading>
    </CardHeader>
    <CardBody>
      <Stack>
        <Box fontWeight="bold">
          <Link
            href="https://www.npmjs.com/package/@sunrisestake/client"
            isExternal
          >
            Check out the docs
          </Link>
        </Box>
        <Box fontWeight="bold">
          <Link
            href="https://github.com/sunrise-stake/next-sunrise-starter"
            isExternal
          >
            Fork this repo
          </Link>
        </Box>
        <Link fontWeight="bold" onClick={() => alert('have fun!')}>
          Go play!
        </Link>
      </Stack>
    </CardBody>
  </Card>
);
