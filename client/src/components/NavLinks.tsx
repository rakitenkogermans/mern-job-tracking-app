import React from 'react';
import links from '../utils/links';
import { NavLink } from 'react-router-dom';

type NavLinksProps = { toggleSidebar: () => void };

const NavLinks: React.FC<NavLinksProps> = ({ toggleSidebar }) => {
    return (
        <div className="nav-links">
            {links.map((link) => {
                const { id, path, text, icon } = link;
                return (
                    <NavLink to={path} key={id} onClick={toggleSidebar} className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
                        <span className="icon">{icon}</span>
                        {text}
                    </NavLink>
                );
            })}
        </div>
    );
};

export default NavLinks;
