import React, { useState } from 'react';
import Wrapper from '../assets/wrappers/Navbar';
import { FaAlignLeft, FaUserCircle, FaCaretDown } from 'react-icons/fa';
import { useAppContext } from '../context/appContext';
import { Logo } from './index';

type NavbarProps = {};

const Navbar: React.FC<NavbarProps> = ({}) => {
    const [showLogout, setShowLogout] = useState(false);
    const { toggleSidebar, showSidebar, user, logoutUser } = useAppContext();
    const handleShowLogout = () => {
        setShowLogout(!showLogout);
    };
    return (
        <Wrapper>
            <div className="nav-center">
                <button className="toggle-btn" onClick={toggleSidebar}>
                    <FaAlignLeft />
                </button>
                <div>
                    <Logo />
                    <h3 className="logo-text">Dashboard</h3>
                </div>
                <div className="btn-container">
                    <button type="button" className="btn" onClick={handleShowLogout}>
                        <FaUserCircle />
                        {user && user.name}
                        <FaCaretDown />
                    </button>
                    <div className={showLogout ? 'dropdown show-dropdown' : 'dropdown'}>
                        <button type="button" className="dropdown-btn" onClick={logoutUser}>
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </Wrapper>
    );
};

export default Navbar;
