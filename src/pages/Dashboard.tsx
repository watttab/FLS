import React, { useEffect, useState } from 'react';
import Layout from '../components/layout/Layout';
import { useProjects } from '../hooks/useProjects';
import { database } from '../lib/firebase';
import { ref, get, set } from 'firebase/database';
import { FolderOpen, Eye, Calendar, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

const Dashboard: React.FC = () => {
    const { projects } = useProjects();
    const [stats, setStats] = useState({ totalViews: 0, launchDate: '' });

    useEffect(() => {
        const fetchStats = async () => {
            const statsRef = ref(database, 'stats');
            const snapshot = await get(statsRef);
            if (snapshot.exists()) {
                setStats(snapshot.val());
            } else {
                // Initialize stats if not exist
                const initialStats = { totalViews: 1, launchDate: new Date().toISOString() };
                await set(statsRef, initialStats);
                setStats(initialStats);
            }
        };
        fetchStats();
    }, []);

    const daysActive = stats.launchDate
        ? Math.ceil(Math.abs(new Date().getTime() - new Date(stats.launchDate).getTime()) / (1000 * 60 * 60 * 24))
        : 0;

    const statsCards = [
        { title: 'ผลงานทั้งหมด', value: projects.length, icon: FolderOpen, color: 'bg-indigo-100 text-indigo-600' },
        { title: 'การเข้าชมทั้งหมด', value: stats.totalViews.toLocaleString(), icon: Eye, color: 'bg-green-100 text-green-600' },
        { title: 'เปิดใช้งาน (วัน)', value: daysActive, icon: Calendar, color: 'bg-amber-100 text-amber-600' },
    ];

    return (
        <Layout>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <motion.h1
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-3xl font-bold text-slate-900 mb-8 flex items-center gap-3"
                >
                    <TrendingUp /> Dashboard
                </motion.h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    {statsCards.map((stat, index) => (
                        <motion.div
                            key={stat.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white rounded-xl shadow-lg p-6 flex items-center space-x-4 border border-slate-100 hover:shadow-xl transition-shadow"
                        >
                            <div className={`p-4 rounded-full ${stat.color}`}>
                                <stat.icon size={24} />
                            </div>
                            <div>
                                <p className="text-sm text-slate-500 font-medium">{stat.title}</p>
                                <h3 className="text-3xl font-bold text-slate-900">{stat.value}</h3>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-white rounded-xl shadow-lg p-8 border border-slate-100"
                >
                    <h3 className="text-xl font-bold text-slate-900 mb-6 border-b border-slate-100 pb-4">ผลงานล่าสุด</h3>
                    <div className="space-y-4">
                        {projects.slice(0, 5).map((project) => (
                            <div key={project.id} className="flex items-center space-x-4 p-3 hover:bg-slate-50 rounded-lg transition-colors group cursor-pointer">
                                <img src={project.image} alt={project.title} className="w-16 h-16 object-cover rounded-lg shadow-sm group-hover:scale-105 transition-transform" />
                                <div>
                                    <h4 className="font-semibold text-slate-800 group-hover:text-indigo-600 transition-colors">{project.title}</h4>
                                    <p className="text-slate-500 text-sm line-clamp-1">{project.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </Layout>
    );
};

export default Dashboard;
