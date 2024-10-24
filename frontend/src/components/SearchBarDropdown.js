import React, { useState } from 'react';
import {
  Input,
  List,
  ListItem,
  Box,
  Stack,
  Text
} from '@chakra-ui/react';

const SearchBarDropdown = ({listOfPlayers, setSelectedPlayer}) => {
  // List of baseball players
  const players = listOfPlayers;

  // State for managing the search input and filtered results
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPlayers, setFilteredPlayers] = useState([]);

  // Handler to update search term and filter the list
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    // Filter players by name based on the search term
    if (value) {
      const filtered = players.filter((player) =>
        player.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredPlayers(filtered);
    } else {
      setFilteredPlayers([]);
    }
  };

  const handleSelectPlayer = (player) => {
    setSearchTerm(player); // Set the selected player's name in the input
    setFilteredPlayers([]); // Clear the dropdown (close it)
    setSelectedPlayer(player); // Pass the selected player to the parent component
  };

  return (
    <Box width="100%" margin="auto" mt={4} position={'relative'}>
      {/* Search Input */}
      <Input
        placeholder="Search for a baseball player..."
        value={searchTerm}
        onChange={handleSearch}
        autoComplete="off"
        focusBorderColor="blue.500"
        backgroundColor={'white'}
        width={'100%'}
      />

      {/* Dropdown List */}
      {filteredPlayers.length > 0 && (
        <Box
          mt={2}
          position="absolute"
          top="100%"
          left={0}
          width="100%"
          border="1px solid"
          borderColor="gray.200"
          borderRadius="md"
          shadow="sm"
          bg="white"
          maxHeight="200px"
          overflowY="auto"
          zIndex={100}
        >
          <List spacing={1}>
            {filteredPlayers.map((player, index) => (
              <ListItem
                key={index}
                px={4}
                py={2}
                width={'100%'}
                _hover={{ backgroundColor: 'gray.100', cursor: 'pointer' }}
                borderBottom="1px solid"
                borderColor="gray.200"
                onClick={() => handleSelectPlayer(player)} 
                textAlign={'center'}
              >
                <Text>{player}</Text>
              </ListItem>
            ))}
          </List>
        </Box>
      )}
    </Box>
  );
};

export default SearchBarDropdown;
