import React from 'react';
import {
  Box,
  Flex,
  Heading,
  Spacer,
  HStack,
  Button,
  Link
} from '@chakra-ui/react';
import SearchBarDropdown from './SearchBarDropdown';

const Header = ({listOfPlayers, setSelectedPlayer}) => {
  return (
    <Box bg="#CE1141" px={4} py={3} shadow="md" height={"100%"} width={"100%"}>
      <Flex alignItems="center">

        
        <Spacer />

        <Box width={"70%"}>
          <SearchBarDropdown listOfPlayers={listOfPlayers} setSelectedPlayer={setSelectedPlayer}/>
        </Box>

        <Spacer />

       
      </Flex>
    </Box>
  );
};

export default Header;
