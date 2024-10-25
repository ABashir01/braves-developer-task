import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';

import {
  Box,
  Flex,
} from '@chakra-ui/react';

import Header from './components/Header';
import PlayerCard from './components/PlayerCard';

function App() {
  const [listOfPlayers, setListOfPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  
  const fetchPlayers = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/batters'); 
      const data = await response.json();
      setListOfPlayers(data.batters); 
      setLoading(false); 
    } catch (error) {
      console.error('Error fetching players:', error);
      setLoading(false); 
    } 
  };

  useEffect(() => {
    fetchPlayers();
  }, []);

  return (
        <Flex flexDir={"column"} height={"100vh"} width={"100vw"}>
          <Box height={"15%"} width={"100%"}>
            {listOfPlayers.length > 0 && !loading ? <Header listOfPlayers={listOfPlayers} setSelectedPlayer={setSelectedPlayer}/> : <Box>Loading...</Box>}
          </Box>
          
          <Flex padding={"2%"} height={"85%"} width={"100%"} bgColor={"#13274F"} alignItems={"center"} justifyContent={"center"}>
            {selectedPlayer ? 
              <PlayerCard 
                playerName={selectedPlayer} 
                GraphComponent={() => <Box>Graph Component</Box>} 
                graphTypes={["Type 1", "Type 2", "Type 3"]} 
              />
            : null}
          </Flex>
        </Flex>
  );
}

export default App;
