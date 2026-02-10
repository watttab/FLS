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
                {/* Aurora Background */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-100 via-indigo-100 to-purple-100 bg-[length:400%_400%] animate-aurora opacity-60"></div>
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-multiply"></div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="mx-auto w-36 h-36 mb-10 relative"
                    >
                        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 blur-2xl opacity-60 animate-pulse"></div>
                        <img
                            src="https://i.postimg.cc/k4Cqrj9J/1.png"
                            alt="Profile"
                            className="relative w-full h-full rounded-full object-cover border-[6px] border-white shadow-2xl"
                        />
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="font-display text-5xl md:text-8xl font-bold tracking-tight text-slate-900 mb-8"
                    >
                        Free Learning <span className="text-gradient">Space</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="font-sans text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto mb-12 leading-relaxed"
                    >
                        โดย <span className="font-semibold text-slate-800">Wattanapong Tabthanee (ครูโอ)</span> <br />
                        พื้นที่สำหรับแบ่งปันสื่อส่งเสริมการเรียนรู้ ชุดการเรียนรู้ ระบบดูแลช่วยเหลือครูและช่วยเหลือตนเองที่ได้สร้างสรรค์ขึ้น ^_^"
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        <a
                            href="https://youtube.com/playlist?list=PLPkIU8lXBFXF8ziZKvLf2GTZ-VHrQkBX8&si=w0lVP271r5740De8"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center space-x-3 bg-red-600 text-white px-10 py-4 rounded-full hover:bg-red-700 transition-all hover:scale-105 shadow-xl shadow-red-500/20 group"
                        >
                            <span className="font-medium text-lg">ดูผลงาน (YouTube)</span>
                            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </a>
                    </motion.div>
                </div>
            </section>

            {/* Portfolio Section */}
            <section id="portfolio" className="py-24 bg-slate-50 relative">
                {/* Subtle background blob */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                    <div className="absolute top-1/4 -left-64 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
                    <div className="absolute top-1/4 -right-64 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-20">
                        <h2 className="font-display text-4xl font-bold text-slate-900 mb-6">ผลงานทั้งหมด</h2>
                        <div className="h-1.5 w-24 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full"></div>
                    </div>

                    {loading ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="h-[400px] bg-white rounded-3xl animate-pulse shadow-sm"></div>
                            ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                            {projects.map((project, index) => (
                                <motion.div
                                    key={project.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ delay: index * 0.1, duration: 0.5 }}
                                    onClick={() => setSelectedProject(project)}
                                    className="group glass-premium rounded-3xl overflow-hidden cursor-pointer hover:-translate-y-3 transition-all duration-500"
                                >
                                    <div className="relative h-72 overflow-hidden">
                                        <img
                                            src={project.image}
                                            alt={project.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                                            <span className="text-white font-medium inline-flex items-center translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                                อ่านเพิ่มเติม <ArrowRight size={18} className="ml-2" />
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-8">
                                        <h3 className="font-display text-2xl font-bold text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors line-clamp-1">{project.title}</h3>
                                        <p className="font-sans text-slate-600 line-clamp-2 text-base leading-relaxed">{project.description}</p>
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
