import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import { useProjects, type Project } from '../hooks/useProjects';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, X, ArrowRight } from 'lucide-react';

const Home: React.FC = () => {
    const { projects, loading } = useProjects();
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    return (
        <Layout>
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-white pt-20 pb-32 lg:pt-32 lg:pb-40">
                <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30"></div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="mx-auto w-32 h-32 mb-8 relative"
                    >
                        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 blur-lg opacity-70 animate-pulse"></div>
                        <img
                            src="https://i.postimg.cc/k4Cqrj9J/1.png"
                            alt="Profile"
                            className="relative w-full h-full rounded-full object-cover border-4 border-white shadow-xl"
                        />
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 mb-6"
                    >
                        Free Learning <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Space</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-xl text-slate-600 max-w-2xl mx-auto mb-10"
                    >
                        โดย Wattanapong Tabthanee (ครูโอ) <br />
                        พื้นที่สำหรับแบ่งปันความรู้ สื่อการสอน และผลงานต่างๆ ที่ได้สร้างสรรค์ขึ้น
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        <a href="#portfolio" className="inline-flex items-center space-x-2 bg-slate-900 text-white px-8 py-3 rounded-full hover:bg-slate-800 transition-all hover:scale-105 shadow-lg shadow-indigo-500/20">
                            <span>ดูผลงาน</span>
                            <ArrowRight size={20} />
                        </a>
                    </motion.div>
                </div>
            </section>

            {/* Portfolio Section */}
            <section id="portfolio" className="py-20 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-slate-900 mb-4">ผลงานทั้งหมด</h2>
                        <div className="h-1 w-20 bg-indigo-500 mx-auto rounded-full"></div>
                    </div>

                    {loading ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="h-80 bg-white rounded-2xl animate-pulse shadow-sm"></div>
                            ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {projects.map((project, index) => (
                                <motion.div
                                    key={project.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    onClick={() => setSelectedProject(project)}
                                    className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 cursor-pointer border border-slate-100 hover:-translate-y-2"
                                >
                                    <div className="relative h-64 overflow-hidden">
                                        <img
                                            src={project.image}
                                            alt={project.title}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                                            <span className="text-white text-sm font-medium inline-flex items-center">
                                                อ่านเพิ่มเติม <ArrowRight size={16} className="ml-1" />
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">{project.title}</h3>
                                        <p className="text-slate-600 line-clamp-2 text-sm">{project.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Project Modal */}
            <AnimatePresence>
                {selectedProject && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                        onClick={() => setSelectedProject(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-white rounded-2xl overflow-hidden max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setSelectedProject(null)}
                                className="absolute top-4 right-4 p-2 bg-white/50 backdrop-blur rounded-full hover:bg-white transition-colors z-10"
                            >
                                <X size={24} />
                            </button>

                            <div className="relative h-64 md:h-96">
                                <img
                                    src={selectedProject.image}
                                    alt={selectedProject.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                <div className="absolute bottom-0 left-0 p-6 md:p-8 text-white">
                                    <h2 className="text-3xl md:text-4xl font-bold mb-2">{selectedProject.title}</h2>
                                    <p className="text-lg opacity-90">{selectedProject.description}</p>
                                </div>
                            </div>

                            <div className="p-6 md:p-10">
                                <div className="prose max-w-none text-slate-600">
                                    <p className="whitespace-pre-wrap text-lg leading-relaxed">{selectedProject.details}</p>
                                </div>

                                <div className="mt-10 flex justify-center">
                                    <a
                                        href={selectedProject.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center space-x-2 bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-500/30"
                                    >
                                        <span>เข้าชมเว็บไซต์</span>
                                        <ExternalLink size={20} />
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </Layout>
    );
};

export default Home;
