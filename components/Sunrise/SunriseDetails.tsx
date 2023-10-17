import { FC } from 'react';
import {
  Box,
  Card,
  CardBody,
  Link,
  Stack,
  Text,
  Image,
  Spinner,
} from '@chakra-ui/react';
import { useSunrise } from '../../contexts/SunriseClientContext';

export const SunriseDetails: FC = () => {
  const { details, error } = useSunrise();

  const formattedAmount =
    details?.balances.gsolBalance.uiAmount &&
    Math.floor(details?.balances.gsolBalance.uiAmount * 100) / 100;

  return (
    <div className='w-full'>
      <div>
        <Stack>
          {!details && !error && <Spinner />}
          {error && <Box fontWeight="bold">{error.message}</Box>}
          {formattedAmount && (
            <Box
              alignItems="center"
              as="p"
              display="flex"
              fontWeight="bold"
              justifyContent="start"
              textAlign="left"
            >
              Your gSOL Balance: {formattedAmount}{' '}
              <Image
                alt="GSOL icon"
                height={4}
                src="/assets/gsol.png"
                style={{ marginLeft: '0.2rem' }}
                width={4}
              />
            </Box>
          )}
          {details && !formattedAmount && (
            <Box fontWeight="bold">
              <Text>Your gSOL Balance is 0</Text>
              <Link href="https://app.sunrisestake.com" isExternal>
                Get some gSOL
              </Link>
            </Box>
          )}
        </Stack>
      </div>
    </div>
  );
};
