import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Box } from '@chakra-ui/react';

const processExitVelocities = (data, binSize = 5) => {
    const bins = {};

    data.forEach(({ exitVelocity }) => {
        if (!isNaN(exitVelocity)) {
            const bin = Math.floor(exitVelocity / binSize) * binSize;
            if (bins[bin]) {
                bins[bin] += 1;
            } else {
                bins[bin] = 1;
            }
        }
    });

    return Object.keys(bins).map((bin) => ({
        range: `${bin}-${Number(bin) + binSize - 1}`,
        count: bins[bin],
    }));
};

const ExitVelocityHistogram = ({ playerData }) => {
    const data = playerData.map(item => ({
        exitVelocity: Number(item[6]),
    })).filter(item => !isNaN(item.exitVelocity));

    const histogramData = processExitVelocities(data);

    return (
        <Box width="100%" height="400px">
            <ResponsiveContainer>
                <BarChart
                    data={histogramData}
                    margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="range" name="Exit Velocity Range (mph)" label={{ value: 'Exit Velocity Range (mph)', angle: 0, position: 'insideBottom', offset: -10 }} />
                    <YAxis name="Hit Count" />
                    <Tooltip />
                    <Bar dataKey="count" fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>
        </Box>
    );
};

export default ExitVelocityHistogram;
