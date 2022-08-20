import { FC } from 'react';

import { DateAndCount } from '../types/types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

type BarChartProps = { data: DateAndCount[] };

const BarChartComponent: FC<BarChartProps> = ({ data }) => {
    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart
                data={data}
                margin={{
                    top: 50,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="count" fill="#2cb1bc" barSize={75} />
            </BarChart>
        </ResponsiveContainer>
    );
};

export { BarChartComponent };
