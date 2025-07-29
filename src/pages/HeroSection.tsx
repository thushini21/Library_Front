import { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
    const [isMounted, setIsMounted] = useState(false);
    const [, setHoveredFeature] = useState(0);
    const navigate = useNavigate();
    const isAuth_1 = localStorage.getItem("isAuth");
    const isAuthBoolean = isAuth_1 === "true";

    useEffect(() => {
        setIsMounted(true);
        if (isAuthBoolean) {
            navigate('/homePage');
        } else {
            navigate('/');
        }
    }, [isAuthBoolean, navigate]);

    const features = [
        {
            icon: "📖",
            title: "Dynamic Reading",
            description: "Immerse yourself in an interactive reading experience with customizable themes and layouts."
        },
        {
            icon: "🧠",
            title: "Knowledge Tracker",
            description: "Track your reading progress, insights, and learning goals with personalized dashboards."
        },
        {
            icon: "🔎",
            title: "Advanced Search",
            description: "Quickly locate quotes, annotations, or topics across your entire library with powerful search tools."
        }
    ];


    return (
        <div
            style={{
                backgroundImage: 'url("../src/assets/library.jpg")',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundAttachment: 'fixed',
            }}
            className="min-h-screen flex flex-col"
        >
            <section className="relative flex-grow flex items-center bg-gradient-to-b from-blue-500/80 to-blue-500/60 px-6 md:px-20 py-16">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left Text */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        animate={isMounted ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.9, ease: "easeOut" }}
                        className="text-white space-y-6"
                    >
                        <h1 className="text-5xl md:text-7xl font-bold leading-tight tracking-tight">
                            <span className="block">Read Allways</span>
                            <span className="block text-amber-400 mt-2">To Get Knowledge</span>
                        </h1>
                        <p className="text-gray-300 max-w-lg text-lg font-light">
                            BookEClub is the ultimate companion for serious readers. Catalog your collection, annotate texts, and discover connections across your entire library with powerful research tools.
                        </p>
                        <div className="flex flex-wrap gap-4 mt-8">
                            <button className="bg-gradient-to-r from-amber-500 to-yellow-400 text-blue-400 font-semibold px-8 py-3 rounded-lg shadow-lg hover:brightness-110 transition">
                                Start Reading 📖
                            </button>
                            <a href="#features" className="self-center text-white underline hover:text-amber-400 transition">
                                Library Features ▼
                            </a>
                        </div>
                    </motion.div>

                    {/* Right Image */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        animate={isMounted ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.9, ease: "easeOut" }}
                        className="relative rounded-xl overflow-hidden shadow-2xl"
                    >
                        <img
                            src="../../src/assets/books.jpg"
                            alt="Decorative gradient"
                            className="w-full h-full object-cover opacity-90"
                        />
                    </motion.div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-20 bg-cyan-700">
                <div className="max-w-7xl mx-auto px-6 md:px-20">
                    <motion.h2
                        className="text-center text-4xl md:text-5xl font-bold text-white mb-16"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        Built for <span className="text-amber-400">Serious Readers</span>
                    </motion.h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {features.map((feature, idx) => (
                            <motion.div
                                key={idx}
                                className="bg-blue-900 p-8 rounded-xl border border-b-blue-400 hover:border-amber-500 cursor-pointer shadow-md hover:shadow-lg transform hover:scale-105 transition"
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: idx * 0.15 }}
                                viewport={{ once: true }}
                                onMouseEnter={() => setHoveredFeature(idx)}
                                onMouseLeave={() => setHoveredFeature(0)}
                            >
                                <div className="text-5xl mb-5">{feature.icon}</div>
                                <h3 className="text-2xl font-semibold mb-3 text-white">{feature.title}</h3>
                                <p className="text-gray-300 font-light">{feature.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section id="about" className="py-20 bg-gray-850">
                <div className="max-w-7xl mx-auto px-6 md:px-20">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
                        <motion.div
                            className="rounded-xl overflow-hidden shadow-lg"
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                        >
                            <img
                                src="../../src/assets/bachground%20image.jpg"
                                alt="Library"
                                className="w-full h-96 object-cover"
                            />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="text-white space-y-6"
                        >
                            <h2 className="text-4xl md:text-5xl font-bold">
                                The Future of <span className="text-amber-400">Reading</span>
                            </h2>
                            <p className="text-gray-300 text-lg font-light leading-relaxed">
                                BookEClub bridges the gap between physical books and digital convenience. Our platform captures the tactile joy of reading while adding powerful digital tools for researchers, students, and avid readers. Highlight, annotate, and connect ideas across your entire library.
                            </p>
                            <div className="flex flex-wrap gap-4 mt-8">
                                <button className="bg-amber-500 text-gray-900 font-semibold px-8 py-3 rounded-lg hover:bg-amber-400 transition">
                                    Explore Features
                                </button>
                                <button className="border-2 border-white text-white font-semibold px-8 py-3 rounded-lg hover:bg-white hover:text-gray-900 transition">
                                    Join Our Members
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HeroSection;
