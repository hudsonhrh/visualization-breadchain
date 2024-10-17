// pages/index.js
import { gql, useQuery } from '@apollo/client';
import { ApolloProvider } from '@apollo/client/react';
import client from '../lib/apolloClient';
import {
  Box,
  Heading,
  Text,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  SimpleGrid,
  Flex,
  Spinner,
  Icon,
} from '@chakra-ui/react';
import { FiTrendingUp, FiTrendingDown } from 'react-icons/fi';

const GET_BREADTOKEN_DATA = gql`
  query GetBreadToken {
    breadToken(id: "0xa555d5344f6fb6c65da19e403cb4c1ec4a1a5ee3") {
      id
      name
      symbol
      totalSupply
      totalMinted
      totalBurned
      totalYieldClaimed
      totalDelegatedVotes
    }
  }
`;

function formatTokenAmount(amount) {
  const formattedAmount = Number(amount) / 1e18;
  return formattedAmount.toLocaleString(undefined, { maximumFractionDigits: 2 });
}

function HomePage() {
  const { loading, error, data } = useQuery(GET_BREADTOKEN_DATA);

  if (loading)
    return (
      <Flex justify="center" align="center" height="100vh">
        <Spinner size="xl" color="teal.500" />
      </Flex>
    );

  if (error)
    return (
      <Flex justify="center" align="center" height="100vh">
        <Text fontSize="xl" color="red.500">
          Error: {error.message}
        </Text>
      </Flex>
    );

  const token = data.breadToken;

  return (
    <Box p={5} maxW="1200px" mx="auto">
      <Heading mb={8} textAlign="center" color="teal.600">
        {token.name} ({token.symbol}) Statistics
      </Heading>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
        <Stat bg="white" p={5} borderRadius="md" shadow="md">
          <StatLabel>Total Supply</StatLabel>
          <StatNumber color="teal.600">
            {formatTokenAmount(token.totalSupply)}
          </StatNumber>
          <StatHelpText>
            <Icon as={FiTrendingUp} color="green.500" mr={1} />
            Tokens in circulation
          </StatHelpText>
        </Stat>

        <Stat bg="white" p={5} borderRadius="md" shadow="md">
          <StatLabel>Total Minted</StatLabel>
          <StatNumber color="teal.600">
            {formatTokenAmount(token.totalMinted)}
          </StatNumber>
          <StatHelpText>
            <Icon as={FiTrendingUp} color="green.500" mr={1} />
            Tokens minted
          </StatHelpText>
        </Stat>

        <Stat bg="white" p={5} borderRadius="md" shadow="md">
          <StatLabel>Total Burned</StatLabel>
          <StatNumber color="teal.600">
            {formatTokenAmount(token.totalBurned)}
          </StatNumber>
          <StatHelpText>
            <Icon as={FiTrendingDown} color="red.500" mr={1} />
            Tokens burned
          </StatHelpText>
        </Stat>

        <Stat bg="white" p={5} borderRadius="md" shadow="md">
          <StatLabel>Total Yield Claimed</StatLabel>
          <StatNumber color="teal.600">
            {formatTokenAmount(token.totalYieldClaimed)}
          </StatNumber>
          <StatHelpText>
            <Icon as={FiTrendingUp} color="green.500" mr={1} />
            Yield claimed
          </StatHelpText>
        </Stat>

        <Stat bg="white" p={5} borderRadius="md" shadow="md">
          <StatLabel>Total Delegated Votes</StatLabel>
          <StatNumber color="teal.600">
            {formatTokenAmount(token.totalDelegatedVotes)}
          </StatNumber>
          <StatHelpText>
            <Icon as={FiTrendingUp} color="green.500" mr={1} />
            Votes delegated
          </StatHelpText>
        </Stat>
      </SimpleGrid>
    </Box>
  );
}

export default function Index() {
  return (
    <ApolloProvider client={client}>
      <HomePage />
    </ApolloProvider>
  );
}
