import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Box } from '@chakra-ui/react';

const processHitDistances = (data, binSize = 50) => {
    const bins = {};
    
    data.forEach(({ hitDistance }) => {
        const bin = Math.floor(hitDistance / binSize) * binSize;
        if (bins[bin]) {
            bins[bin] += 1;
        } else {
            bins[bin] = 1;
        }
    });

    return Object.keys(bins).map((bin) => ({
        range: `${bin}-${Number(bin) + binSize - 1}`,
        count: bins[bin],
    }));
};

const HitDistanceHistogram = ({ playerData }) => {
    const data = playerData.map(item => ({
        hitDistance: item[8], 
    }));

    const histogramData = processHitDistances(data);

    return (
        <Box width="100%" height="400px">
            <ResponsiveContainer>
                <BarChart
                    data={histogramData}
                    margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="range" name="Hit Distance Range (ft)" label={{ value: 'Hit Distance Range (ft)', angle: 0, position: 'insideBottom', offset: -10 }}/>
                    <YAxis name="Hit Count" />
                    <Tooltip />
                    <Bar dataKey="count" fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>
        </Box>
    );
};

export default HitDistanceHistogram;
