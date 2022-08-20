import { FC, ReactNode } from 'react';
import Wrapper from '../assets/wrappers/StatItem';

type StatsItemProps = { count: number; title: string; icon: ReactNode; color: string; bcg: string };

const StatItem: FC<StatsItemProps> = ({ count, title, icon, color, bcg }) => {
    return (
        <Wrapper color={color} bcg={bcg}>
            <header>
                <span className="count">{count}</span>
                <div className="icon">{icon}</div>
            </header>
            <h5 className="title">{title}</h5>
        </Wrapper>
    );
};

export { StatItem };
