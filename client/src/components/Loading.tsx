import React from 'react';

type LoadingProps = { center: boolean };

const Loading: React.FC<LoadingProps> = ({ center }) => {
    return <div className={center ? 'loading loading-center' : 'loading'} />;
};

export default Loading;
