import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Box } from '@chakra-ui/react';

const getColorByOutcome = (playOutcome) => {
    switch (playOutcome) {
        case "HomeRun":
            return "#FF0000";
        case "Single":
            return "#00FF00";
        case "Double":
            return "#0000FF";
        case "Triple":
            return "#FFA500";
        case "Out":
            return "#D3D3D3";
        case "Walk":
            return "#FFFF00";
        case "Flyout":
            return "#1E90FF";
        case "Lineout":
            return "#FFD700";
        case "Groundout":
            return "#8B4513";
        case "Strikeout":
            return "#DC143C";
        default:
            return "#000000";
    }
};

const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        const { hangTime, hitDistance, playOutcome } = payload[0].payload;
        return (
            <div style={{ backgroundColor: 'white', border: '1px solid #ccc', padding: '5px' }}>
                <p><strong>Hit Distance:</strong> {hitDistance} ft</p>
                <p><strong>Hang Time:</strong> {hangTime} s</p>
                <p><strong>Play Outcome:</strong> {playOutcome}</p>
            </div>
        );
    }
    return null;
};

const HangTimevsHitDistancePlot = ({ playerData }) => {
    const data = playerData.map(item => ({
        hangTime: item[9],
        hitDistance: item[8],
        playOutcome: item[11],
        fill: getColorByOutcome(item[11]),
    }));

    return (
        <Box width="100%" height="400px">
            <ResponsiveContainer>
                <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                    <CartesianGrid />
                    <XAxis type="number" dataKey="hitDistance" name="Hit Distance (ft)" label={{ value: 'Hit Distance (feet)', position: 'insideBottom', offset: -10 }} />
                    <YAxis type="number" dataKey="hangTime" name="Hang Time (s)" label={{ value: 'Hang Time (seconds)', angle: -90, position: 'insideLeft', offset: 0 }} />
                    <Tooltip content={<CustomTooltip />} />
                    <Scatter 
                        name="Hits"
                        data={data}
                        fill="#8884d8"
                        shape="circle"
                        fillOpacity={0.7}
                        stroke="#000"
                        strokeWidth={1}
                    />
                </ScatterChart>
            </ResponsiveContainer>
        </Box>
    );
};

export default HangTimevsHitDistancePlot;
