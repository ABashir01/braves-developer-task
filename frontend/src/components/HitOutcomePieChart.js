import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { Box } from '@chakra-ui/react';

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

const processHitOutcomes = (playerData) => {
    const outcomes = {};

    const data = playerData.map(item => ({
        playOutcome: item[11],
    }));

    data.forEach(({ playOutcome }) => {
        if (outcomes[playOutcome]) {
            outcomes[playOutcome] += 1;
        } else {
            outcomes[playOutcome] = 1;
        }
    });

    return Object.keys(outcomes).map((outcome) => ({
        name: outcome,
        value: outcomes[outcome],
    }));
};

const renderCustomizedLabel = ({
    cx, cy, midAngle, innerRadius, outerRadius, percent, index, name
}) => {
    const radius = outerRadius + 30;
    const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
    const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));

    return (
        <text
            x={x}
            y={y}
            fill="black"
            fontSize="12px"
            textAnchor={x > cx ? 'start' : 'end'}
            dominantBaseline="central"
        >
            {`${name}: ${(percent * 100).toFixed(0)}%`}
        </text>
    );
};

const HitOutcomePieChart = ({ playerData }) => {
    const outcomeData = processHitOutcomes(playerData);

    return (
        <Box width="100%" height="100%">
            <ResponsiveContainer>
                <PieChart>
                    <Pie
                        data={outcomeData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={120}
                        fill="#8884d8"
                        label={renderCustomizedLabel}
                        labelLine
                    >
                        {outcomeData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={getColorByOutcome(entry.name)} />
                        ))}
                    </Pie>
                    <Tooltip />
                </PieChart>
            </ResponsiveContainer>
        </Box>
    );
};

export default HitOutcomePieChart;
