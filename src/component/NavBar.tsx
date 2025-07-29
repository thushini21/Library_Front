import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes, faSignInAlt, faUserPlus, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

export default function NavBar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const navigate = useNavigate();
    const isAuth = localStorage.getItem("isAuth") === "true";

    const handleLogin = () => {
        navigate("/login");
        setIsMobileMenuOpen(false);
    };

    const handleRegister = () => {
        navigate("/login");
        setIsMobileMenuOpen(false);
    };

    const handleLogout = () => {
        localStorage.setItem("isAuth", "false");
        localStorage.removeItem("token");
        localStorage.removeItem('email');
        localStorage.removeItem('userId');
        navigate("/");
        setIsMobileMenuOpen(false);
    };

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 10);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navItems = [
        { name: "Home", href: "/" },
        { name: "Features", href: "#features" },
        { name: "About", href: "#about" },
    ];

    return (
        <motion.nav
            className={`fixed w-full z-50 ${isScrolled ? 'backdrop-blur-md bg-gray-900/80' : 'backdrop-blur-sm bg-gray-900/80 font-[Bruno_Ace_SC]'}`}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
            <div className="container mx-auto px-4 sm:px-6 md:px-16 py-4">
                <div className="flex justify-between items-center">
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center"
                    >
                        <a href="/" className="text-2xl font-['Bruno_Ace_SC'] text-white tracking-tight">
                            <span className="text-yellow-400">Book</span>Nexus
                        </a>
                    </motion.div>

                    <div className="hidden md:flex items-center space-x-8">
                        {!isAuth && navItems.map((item, index) => (
                            <motion.a
                                key={index}
                                href={item.href}
                                className="relative text-gray-300 hover:text-white text-sm font-medium tracking-wider group"
                                whileHover={{ scale: 1.05 }}
                                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                            >
                                {item.name}
                                <motion.span
                                    className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-400 group-hover:w-full transition-all duration-300"
                                    initial={{ width: 0 }}
                                    whileHover={{ width: '100%' }}
                                />
                            </motion.a>
                        ))}

                        <motion.div className="flex space-x-4 ml-6">
                            {!isAuth ? (
                                <>
                                    <motion.button
                                        onClick={handleLogin}
                                        className="px-6 py-2 text-sm font-['Bruno_Ace_SC'] text-white border border-yellow-400 rounded-lg hover:bg-yellow-400 hover:text-gray-900 transition-colors flex items-center"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <FontAwesomeIcon icon={faSignInAlt} className="mr-2" />
                                        Login
                                    </motion.button>
                                    <motion.button
                                        onClick={handleRegister}
                                        className="px-6 py-2 text-sm font-['Bruno_Ace_SC'] bg-yellow-400 text-gray-900 rounded-lg hover:bg-yellow-300 transition-colors"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <FontAwesomeIcon icon={faUserPlus} className="mr-2" />
                                        Register
                                    </motion.button>
                                </>
                            ) : (
                                <motion.button
                                    onClick={handleLogout}
                                    className="px-6 py-2 text-sm font-['Bruno_Ace_SC'] text-white border border-yellow-400 rounded-lg hover:bg-yellow-400 hover:text-gray-900 transition-colors flex items-center"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                                    Logout
                                </motion.button>
                            )}
                        </motion.div>
                    </div>

                    <motion.button
                        className="md:hidden text-gray-300 focus:outline-none"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <FontAwesomeIcon icon={isMobileMenuOpen ? faTimes : faBars} size="lg" />
                    </motion.button>
                </div>
            </div>

            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        className="md:hidden bg-gray-900/95 backdrop-blur-lg font-[Assistant]"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="container mx-auto px-4 py-4">
                            <div className="flex flex-col space-y-4">
                                {!isAuth && navItems.map((item, index) => (
                                    <motion.a
                                        key={index}
                                        href={item.href}
                                        className="text-gray-300 hover:text-white py-3 border-b border-gray-800 text-sm font-medium"
                                        initial={{ x: -20, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ delay: index * 0.1 }}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        {item.name}
                                    </motion.a>
                                ))}
                                <div className="flex flex-col space-y-4 pt-4">
                                    {!isAuth ? (
                                        <>
                                            <motion.button
                                                onClick={handleLogin}
                                                className="w-full px-4 py-2 text-sm font-['Bruno_Ace_SC'] text-center text-white border border-yellow-400 rounded-lg hover:bg-yellow-400 hover:text-gray-900 transition-colors"
                                                initial={{ scale: 0.9, opacity: 0 }}
                                                animate={{ scale: 1, opacity: 1 }}
                                                transition={{ delay: navItems.length * 0.1 }}
                                            >
                                                <FontAwesomeIcon icon={faSignInAlt} className="mr-2" />
                                                Login
                                            </motion.button>
                                            <motion.button
                                                onClick={handleRegister}
                                                className="w-full px-4 py-2 text-sm font-['Bruno_Ace_SC'] text-center bg-yellow-400 text-gray-900 rounded-lg hover:bg-yellow-300 transition-colors"
                                                initial={{ scale: 0.9, opacity: 0 }}
                                                animate={{ scale: 1, opacity: 1 }}
                                                transition={{ delay: navItems.length * 0.1 + 0.1 }}
                                            >
                                                <FontAwesomeIcon icon={faUserPlus} className="mr-2" />
                                                Register
                                            </motion.button>
                                        </>
                                    ) : (
                                        <motion.button
                                            onClick={handleLogout}
                                            className="w-full px-4 py-2 text-sm font-['Bruno_Ace_SC'] text-center text-white border border-yellow-400 rounded-lg hover:bg-yellow-400 hover:text-gray-900 transition-colors"
                                            initial={{ scale: 0.9, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            transition={{ delay: navItems.length * 0.1 }}
                                        >
                                            <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                                            Logout
                                        </motion.button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}