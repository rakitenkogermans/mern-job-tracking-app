import { FC } from 'react';
import { useAppContext } from '../context/appContext';
import NavLinks from './NavLinks';
import Logo from '../components/Logo';
import Wrapper from '../assets/wrappers/BigSidebar';

type BigSidebarProps = {};

const BigSidebar: FC<BigSidebarProps> = () => {
    const { showSidebar } = useAppContext();
    return (
        <Wrapper>
            <div className={showSidebar ? 'sidebar-container ' : 'sidebar-container show-sidebar'}>
                <div className="content">
                    <header>
                        <Logo />
                    </header>
                    <NavLinks toggleSidebar={() => {}} />
                </div>
            </div>
        </Wrapper>
    );
};

export default BigSidebar;
