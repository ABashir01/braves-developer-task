import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Box } from '@chakra-ui/react';

// Function to convert polar coordinates to Cartesian coordinates
const convertPolarToCartesian = (exitDirection, hitDistance) => {
    const radians = (exitDirection * Math.PI) / 180;
    const y = hitDistance * Math.cos(radians);
    const x = hitDistance * Math.sin(radians);
    return { x, y, exitDirection, hitDistance }; // Return original values too for tooltip
};

// Custom Tick Component to format tick labels
const CustomTick = ({ x, y, payload }) => {
    return (
        <text x={x} y={y + 15} textAnchor="middle" fill="#666">
            {payload.value}°
        </text>
    );
};

// Function to determine color based on the play outcome
const getColorByOutcome = (playOutcome) => {
    switch (playOutcome) {
        case "HomeRun":
            return "#FF0000"; // Red for home runs
        case "Single":
            return "#00FF00"; // Green for singles
        case "Double":
            return "#0000FF"; // Blue for doubles
        case "Triple":
            return "#FFA500"; // Orange for triples
        case "Out":
            return "#8884d8"; // Default blue for outs
        case "Walk":
            return "#FFFF00"; // Yellow for walks
        case "Sacrifice Fly":
            return "#FF69B4"; // Pink for sacrifice fly
        case "Fielders Choice":
            return "#A52A2A"; // Brown for fielder's choice
        case "Groundout":
            return "#8B4513"; // SaddleBrown for groundouts
        case "Flyout":
            return "#1E90FF"; // DodgerBlue for flyouts
        case "Lineout":
            return "#FFD700"; // Gold for lineouts
        case "Strikeout":
            return "#DC143C"; // Crimson for strikeouts
        default:
            return "#000000"; // Black for unknown outcomes
    }
};

const SprayChart = ({ playerData }) => {

            // Format the data to match the expected structure
            const data = playerData.map(item => ({
                exitDirection: item[7],
                hitDistance: item[8],
                playOutcome: item[11],
            }));


    // Convert the polar coordinates (exitDirection, hitDistance) to Cartesian coordinates (x, y)
    const cartesianData = data.map((point, index) => ({
        ...convertPolarToCartesian(point.exitDirection, point.hitDistance),
        index, // Keep index to reference the original data in the tooltip
    }));

    // Find the minimum and maximum x and y values for setting axis domains
    const xValues = cartesianData.map(d => d.x);
    const yValues = cartesianData.map(d => d.y);
    const xMin = Math.min(...xValues);
    const xMax = Math.max(...xValues);
    const yMin = Math.min(...yValues);
    const yMax = Math.max(...yValues);

    // Custom tooltip to show original exitDirection and hitDistance
    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            const { exitDirection, hitDistance, playOutcome } = data[payload[0].payload.index];
            return (
                <div style={{ backgroundColor: 'white', border: '1px solid #ccc', padding: '5px' }}>
                    <p><strong>Exit Direction:</strong> {exitDirection}°</p>
                    <p><strong>Hit Distance:</strong> {hitDistance} ft</p>
                    <p><strong>Play Outcome: {playOutcome}</strong></p>
                </div>
            );
        }
        return null;
    };

    return (
        <Box width="100%" height="400px">
            <ResponsiveContainer>
                <ScatterChart
                    margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                >
                    <CartesianGrid />
                    {/* Set the domain of the X-axis to center at 0 */}
                    <XAxis 
                        type="number" 
                        dataKey="x" 
                        name="Exit Direction (°)" 
                        tick={<CustomTick />} // Use the custom tick component
                        ticks={[0]} // Custom ticks at 30-degree intervals
                        domain={[Math.min(xMin, -xMax), Math.max(xMax, -xMin)]}  // Symmetrical domain around 0
                    />
                    {/* Set the domain of the Y-axis to match the min and max hit distances */}
                    <YAxis 
                        type="number" 
                        dataKey="y" 
                        name="Hit Distance (ft)" 
                    />
                    <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: '3 3' }} />
                    <Scatter name="Hits" data={cartesianData} fill="#8884d8" />
                </ScatterChart>
            </ResponsiveContainer>
        </Box>
    );
};

export default SprayChart;
