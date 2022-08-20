import { FC } from 'react';

import { DateAndCount } from '../types/types';
import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from 'recharts';

type AreaChartProps = { data: DateAndCount[] };

const AreaChartComponent: FC<AreaChartProps> = ({ data }) => {
    return (
        <ResponsiveContainer width="100%" height={300}>
            <AreaChart
                data={data}
                margin={{
                    top: 50,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Area type="monotone" dataKey="count" stroke="#2cb1bc" fill="#bef8fd" />
            </AreaChart>
        </ResponsiveContainer>
    );
};

export { AreaChartComponent };
