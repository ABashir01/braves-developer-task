import React, {useEffect, useState} from 'react';
import { Box, Heading, List, ListItem, Flex, Divider, Text } from '@chakra-ui/react';
import SprayChart from './SprayChart';

const mockData = [
    { exitDirection: 20, hitDistance: 320 },
    { exitDirection: 45, hitDistance: 400 },
    { exitDirection: -30, hitDistance: 250 },
    { exitDirection: 10, hitDistance: 280 },
    { exitDirection: 60, hitDistance: 450 },
    { exitDirection: -15, hitDistance: 270 },
    { exitDirection: 35, hitDistance: 380 },
    { exitDirection: 50, hitDistance: 410 },
    { exitDirection: -40, hitDistance: 230 },
    { exitDirection: 25, hitDistance: 360 },
    { exitDirection: -20, hitDistance: 290 },
    { exitDirection: 0, hitDistance: 300 },
    { exitDirection: 15, hitDistance: 315 },
    { exitDirection: 30, hitDistance: 340 },
    { exitDirection: -10, hitDistance: 275 },
];


const PlayerCard = ({ playerName, GraphComponent, graphTypes }) => {
    const [playerData, setPlayerData] = useState(null);

    const fetchPlayerData = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:5000/batter?batter=${playerName}`);
            const data = await response.json();
            console.log(data.data);
            setPlayerData(data.data);
        } catch (error) {
            console.error('Error fetching player data:', error);
        };
    };

    useEffect(() => {
        fetchPlayerData();
    }, []);
    

    return (
        <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={4} height={"100%"} width={"90%"} bgColor={"white"} boxShadow={"lg"}>
            {/* Header */}
            <Flex height={"10%"} align="center" justify="center" mb={4}>
                <Heading size="md" textAlign="center">
                    {playerName}
                </Heading>
            </Flex>
            <Divider borderColor={"black"}/>

            {/* Content Layout */}
            <Flex mt={4} height={"80%"} width={"100%"}>
                {/* List of Graph Types */}
                <Box flex="1" pr={4} width={"50%"}>
                    <List spacing={3}>
                        {graphTypes.map((type, index) => (
                            <ListItem 
                                key={index} 
                                p={2} 
                                border="1px" 
                                borderRadius="md" 
                                borderColor="gray.200" 
                                _hover={{ bgColor: "gray.50", cursor: "pointer" }}
                            >
                                <Text fontSize="md" fontWeight="medium">
                                    {type}
                                </Text>
                            </ListItem>
                        ))}
                    </List>
                </Box>

                {/* Graph Component */}
                <Divider orientation="vertical" height="auto" mx={4} borderColor={"black"}/>
                <Box flex="2" pl={4} width={"30%"}>
                    {playerData ? <SprayChart playerData={playerData}/> : <Box>Loading... </Box>}
                </Box>
            </Flex>

        </Box>
    );
};

export default PlayerCard;
