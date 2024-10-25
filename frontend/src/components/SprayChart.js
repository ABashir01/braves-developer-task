import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Box } from '@chakra-ui/react';

const convertPolarToCartesian = (exitDirection, hitDistance) => {
    const radians = (exitDirection * Math.PI) / 180;
    const y = hitDistance * Math.cos(radians);
    const x = hitDistance * Math.sin(radians);
    return { x, y, exitDirection, hitDistance };
};

const CustomTick = ({ x, y, payload }) => {
    return (
        <text x={x} y={y + 15} textAnchor="middle" fill="#666">
            {payload.value}°
        </text>
    );
};

const getColorByOutcome = (playOutcome) => {
    switch (playOutcome) {
        case "HomeRun":
            return "#FF0000";
        case "Triple":
            return "#FFA500";
        case "Double":
            return "#0000FF";
        case "Single":
            return "#00FF00";
        case "Walk":
            return "#FFFF00";
        case "Sacrifice Fly":
            return "#FF69B4";
        case "Fielders Choice":
            return "#8B4513";
        case "Groundout":
            return "#A52A2A";
        case "Flyout":
            return "#1E90FF";
        case "Lineout":
            return "#FFD700";
        case "Strikeout":
            return "#DC143C";
        case "Out":
            return "#D3D3D3";
        default:
            return "#000000";
    }
};

const SprayChart = ({ playerData }) => {
    const data = playerData.map(item => ({
        exitDirection: item[7],
        hitDistance: item[8],
        playOutcome: item[11],
    }));

    const cartesianData = data.map((point, index) => ({
        ...convertPolarToCartesian(point.exitDirection, point.hitDistance),
        playOutcome: point.playOutcome,
        fill: getColorByOutcome(point.playOutcome),
        index,
    }));

    const xValues = cartesianData.map(d => d.x);
    const yValues = cartesianData.map(d => d.y);
    const xMin = Math.min(...xValues);
    const xMax = Math.max(...xValues);

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            const { exitDirection, hitDistance, playOutcome } = data[payload[0].payload.index];
            return (
                <div style={{ backgroundColor: 'white', border: '1px solid #ccc', padding: '5px' }}>
                    <p><strong>Exit Direction:</strong> {exitDirection}°</p>
                    <p><strong>Hit Distance:</strong> {hitDistance} ft</p>
                    <p><strong>Play Outcome:</strong> {playOutcome}</p>
                </div>
            );
        }
        return null;
    };

    return (
        <Box width="100%" height="400px">
            <ResponsiveContainer>
                <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                    <CartesianGrid />
                    <XAxis 
                        type="number" 
                        dataKey="x" 
                        name="Exit Direction (°)" 
                        tick={<CustomTick />} 
                        ticks={[0]} 
                        domain={[Math.min(xMin, -xMax), Math.max(xMax, -xMin)]} 
                    />
                    <YAxis 
                        type="number" 
                        dataKey="y" 
                        name="Hit Distance (ft)" 
                        label={{ value: 'Hit Distance (ft)', angle: -90, position: 'insideLeft', offset: 0 }}
                    />
                    <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: '3 3' }} />
                    <Scatter 
                        name="Hits" 
                        data={cartesianData}
                        fillOpacity={0.7}
                        fill={(d) => getColorByOutcome(d.playOutcome)}
                    />
                </ScatterChart>
            </ResponsiveContainer>
        </Box>
    );
};

export default SprayChart;
