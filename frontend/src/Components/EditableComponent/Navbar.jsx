import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const styles = {
    navbar: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem',
        backgroundColor: '#ffffff',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        borderBottom: '1px solid #e5e7eb',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        flexWrap: 'wrap'
    },

    logo: {
        fontSize: '1.5rem',
        fontWeight: 'bold',
        color: '#1f2937',
        textDecoration: 'none'
    },

    mobileMenuBtn: {
        display: 'none',
        background: 'none',
        border: 'none',
        fontSize: '1.5rem',
        cursor: 'pointer',
        color: '#1f2937'
    },

    navLinks: {
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        listStyle: 'none',
        margin: 0,
        padding: 0,
        flexWrap: 'wrap'
    },

    navLinksHidden: {
        display: 'none',
        width: '100%',
        flexDirection: 'column',
        backgroundColor: '#ffffff',
        borderTop: '1px solid #e5e7eb',
        padding: '1rem 0',
        gap: '0.5rem'
    },

    navLinksVisible: {
        display: 'flex',
        width: '100%',
        flexDirection: 'column',
        backgroundColor: '#ffffff',
        borderTop: '1px solid #e5e7eb',
        padding: '1rem 0',
        gap: '0.5rem'
    },

    navItem: {
        margin: 0
    },

    navLink: {
        color: '#6b7280',
        textDecoration: 'none',
        fontSize: '1rem',
        fontWeight: '500',
        padding: '0.5rem 1rem',
        borderRadius: '0.375rem',
        transition: 'all 0.2s ease-in-out',
        cursor: 'pointer',
        whiteSpace: 'nowrap'
    },

    navLinkHover: {
        color: '#3b82f6',
        backgroundColor: '#f3f4f6'
    },

    logoutBtn: {
        color: '#dc2626',
        backgroundColor: '#fef2f2',
        border: '1px solid #fecaca',
        padding: '0.5rem 1rem',
        borderRadius: '0.375rem',
        fontSize: '1rem',
        fontWeight: '500',
        cursor: 'pointer',
        transition: 'all 0.2s ease-in-out',
        whiteSpace: 'nowrap'
    },

    logoutBtnHover: {
        backgroundColor: '#dc2626',
        color: '#ffffff',
        borderColor: '#dc2626'
    }
};

const Navbar = () => {
    const [hoveredItem, setHoveredItem] = useState(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const Navigate = useNavigate()

    const navItems = [
        'Profile',
        'Projects',
        'Certificate',
        'Skill',
        'Education',
        'Internship',
        'Achievements'
    ];

    // Check if screen is mobile size
    React.useEffect(() => {
        const checkScreenSize = () => {
            setIsMobile(window.innerWidth <= 768);
            if (window.innerWidth > 768) {
                setIsMobileMenuOpen(false);
            }
        };

        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);
        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    const handleNavClick = (item) => {
        const link = item.toLowerCase()
        Navigate(`/${link}`)
        setIsMobileMenuOpen(false);
    };

    const handleLogout = () => {
        setIsMobileMenuOpen(false);
        localStorage.removeItem("EditableResumeToken")
        localStorage.removeItem("EditableReg")
        Navigate('/')
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <nav style={styles.navbar}>
            <Link to="/sresume" style={styles.logo}>
                Resume
            </Link>

            {isMobile && (
                <button
                    style={{
                        ...styles.mobileMenuBtn,
                        display: 'block'
                    }}
                    onClick={toggleMobileMenu}
                >
                    ☰
                </button>
            )}

            <ul
                style={{
                    ...styles.navLinks,
                    ...(isMobile ?
                        (isMobileMenuOpen ? styles.navLinksVisible : styles.navLinksHidden) :
                        {}
                    )
                }}
            >
                {navItems.map((item) => (
                    <li key={item} style={styles.navItem}>
                        <a
                            style={{
                                ...styles.navLink,
                                ...(hoveredItem === item ? styles.navLinkHover : {}),
                                ...(isMobile ? {
                                    display: 'block',
                                    width: '100%',
                                    textAlign: 'center',
                                    padding: '0.75rem 1rem'
                                } : {})
                            }}
                            onMouseEnter={() => setHoveredItem(item)}
                            onMouseLeave={() => setHoveredItem(null)}
                            onClick={(e) => {
                                e.preventDefault();
                                handleNavClick(item);
                            }}
                        >
                            {item}
                        </a>
                    </li>
                ))}

                <li style={styles.navItem}>
                    <button
                        style={{
                            ...styles.logoutBtn,
                            ...(hoveredItem === 'logout' ? styles.logoutBtnHover : {}),
                            ...(isMobile ? {
                                display: 'block',
                                width: '100%',
                                textAlign: 'center',
                                padding: '0.75rem 1rem'
                            } : {})
                        }}
                        onMouseEnter={() => setHoveredItem('logout')}
                        onMouseLeave={() => setHoveredItem(null)}
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
