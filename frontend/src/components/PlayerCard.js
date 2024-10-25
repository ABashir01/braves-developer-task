import React, {useEffect, useState} from 'react';
import { Box, Heading, List, ListItem, Flex, Divider, Text } from '@chakra-ui/react';

import SprayChart from './SprayChart';
import HitDistanceHistogram from './HitDistanceHistogram';
import HitOutcomePieChart from './HitOutcomePieChart';
import ExitDirectionHistogram from './ExitDirectionHistogram';
import ExitVelocityHistogram from './ExitVelocityHistogram';
import LaunchAngleVsExitVelocityScatterPlot from './LaunchAngleVsExitVelocityScatterPlot';
import HangTimevsHitDistancePlot from './HangTimevsHitDistancePlot';

const PlayerCard = ({ playerName }) => {
    const [playerData, setPlayerData] = useState(null);
    const [graphType, setGraphType] = useState("Spray Chart");

    const graphTypes = ["Spray Chart", 
        "Play Outcome Pie Chart", 
        "Hit Distance Histogram", 
        "Exit Speed Histogram", 
        "Launch Angle vs. Exit Speed Chart",
        "Hit Distance vs. Hang Time Chart"];

    const fetchPlayerData = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:5000/batter?batter=${playerName}`);
            const data = await response.json();
            setPlayerData(data.data);
        } catch (error) {
            console.error('Error fetching player data:', error);
        };
    };

    useEffect(() => {
        fetchPlayerData();
    }, [playerName]);

    const GraphComponent = () => {
        switch (graphType) {
            case "Spray Chart":
                return <SprayChart playerData={playerData} />;
            case "Hit Distance Histogram":
                return <HitDistanceHistogram playerData={playerData} />;
            case "Exit Speed Histogram":
                return <ExitVelocityHistogram playerData={playerData} />;
            case "Exit Direction Histogram":
                return <ExitDirectionHistogram playerData={playerData} />;
            case "Play Outcome Pie Chart":
                return <HitOutcomePieChart playerData={playerData} />;
            case "Launch Angle vs. Exit Speed Chart":
                return <LaunchAngleVsExitVelocityScatterPlot playerData={playerData} />;
            case "Hit Distance vs. Hang Time Chart":
                return <HangTimevsHitDistancePlot playerData={playerData} />;
            default:
                return <Box>Graph Component</Box>;
        }
    }
    

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
                                onClick={() => setGraphType(type)} 
                                bgColor={graphType === type ? "gray.100" : "white"}
                                _hover={{ bgColor: "gray.100", cursor: "pointer" }}
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
                    {playerData ? GraphComponent() : <Box>Loading... </Box>}
                </Box>
            </Flex>

        </Box>
    );
};

export default PlayerCard;
