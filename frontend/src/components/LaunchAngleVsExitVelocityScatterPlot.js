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
        const { launchAngle, exitVelocity, playOutcome } = payload[0].payload;
        return (
            <div style={{ backgroundColor: 'white', border: '1px solid #ccc', padding: '5px' }}>
                <p><strong>Launch Angle:</strong> {launchAngle}°</p>
                <p><strong>Exit Velocity:</strong> {exitVelocity} mph</p>
                <p><strong>Play Outcome:</strong> {playOutcome}</p>
            </div>
        );
    }
    return null;
};

const LaunchAngleVsExitVelocityScatterPlot = ({ playerData }) => {
    const data = playerData.map(item => ({
        launchAngle: item[5],
        exitVelocity: item[6],
        playOutcome: item[11],
        fill: getColorByOutcome(item[11]),
    }));

    return (
        <Box width="100%" height="400px">
            <ResponsiveContainer>
                <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                    <CartesianGrid />
                    <XAxis type="number" dataKey="launchAngle" name="Launch Angle (°)" label={{ value: 'Launch Angle (°)', angle: 0, position: 'insideBottom', offset: -10 }} />
                    <YAxis type="number" dataKey="exitVelocity" name="Exit Velocity (mph)" label={{ value: 'Exit Velocity (mph)', angle: -90, position: 'insideLeft', offset: 0 }} />
                    <Tooltip content={<CustomTooltip />} />
                    <Scatter 
                        name="Hits"
                        data={data}
                        fillOpacity={0.7}
                        stroke="#000"
                        strokeWidth={1}
                    />
                </ScatterChart>
            </ResponsiveContainer>
        </Box>
    );
};

export default LaunchAngleVsExitVelocityScatterPlot;
