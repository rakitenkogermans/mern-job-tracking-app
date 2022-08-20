import { FC } from 'react';

type LoadingProps = { center: boolean };

const Loading: FC<LoadingProps> = ({ center }) => {
    return <div className={center ? 'loading loading-center' : 'loading'} />;
};

export default Loading;
