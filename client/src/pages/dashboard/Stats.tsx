import React, { useEffect, useRef } from 'react';
import { useAppContext } from '../../context/appContext';
import { ChartsContainer, Loading, StatsContainer } from '../../components';

type StatsProps = {};

const Stats: React.FC<StatsProps> = ({}) => {
    const stopRunningUseEffectTwice = useRef(false);
    const { showStats, isLoading, monthlyApplications } = useAppContext();

    useEffect(() => {
        if (!stopRunningUseEffectTwice.current) {
            showStats().then();

            return () => {
                stopRunningUseEffectTwice.current = true;
            };
        }
    }, []);

    if (isLoading) {
        return <Loading center />;
    }
    return (
        <>
            <StatsContainer />
            {monthlyApplications.length > 0 && <ChartsContainer />}
        </>
    );
};

export default Stats;
