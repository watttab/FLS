import React, { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import { useProjects, type Project } from '../hooks/useProjects';
import { database, auth } from '../lib/firebase'; // Ensure auth is exported from firebase.ts
import { ref, push, set, remove, update } from 'firebase/database';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged, type User } from 'firebase/auth';
import { Lock, LogIn, Trash2, Edit, Plus, X, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Admin: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const [isEditing, setIsEditing] = useState<string | null>(null);
    const [showForm, setShowForm] = useState(false);

    // Form state
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        image: '',
        details: '',
        link: ''
    });

    const { projects } = useProjects();

    // Check auth state on mount
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (err: any) {
            console.error(err);
            setError('อีเมลหรือรหัสผ่านไม่ถูกต้อง');
        }
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (isEditing) {
                // Update existing
                const projectRef = ref(database, `projects/${isEditing}`);
                await update(projectRef, formData);
                alert('แก้ไขผลงานเรียบร้อยแล้ว!');
            } else {
                // Add new
                const projectsRef = ref(database, 'projects');
                const newProjectRef = push(projectsRef);
                await set(newProjectRef, formData);
                alert('เพิ่มผลงานเรียบร้อยแล้ว!');
            }
            closeForm();
        } catch (error) {
            console.error(error);
            alert('เกิดข้อผิดพลาดในการบันทึกข้อมูล');
        }
    };

    const handleDelete = async (id: string) => {
        if (confirm('คุณแน่ใจหรือไม่ที่จะลบผลงานนี้?')) {
            try {
                const projectRef = ref(database, `projects/${id}`);
                await remove(projectRef);
            } catch (error) {
                console.error(error);
                alert('เกิดข้อผิดพลาดในการลบข้อมูล');
            }
        }
    };

    const openForm = (project?: Project) => {
        if (project) {
            setIsEditing(project.id);
            setFormData({
                title: project.title,
                description: project.description,
                image: project.image,
                details: project.details,
                link: project.link
            });
        } else {
            setIsEditing(null);
            setFormData({
                title: '',
                description: '',
                image: '',
                details: '',
                link: ''
            });
        }
        setShowForm(true);
    };

    const closeForm = () => {
        setShowForm(false);
        setIsEditing(null);
    };

    if (loading) {
        return (
            <Layout>
                <div className="flex items-center justify-center min-h-[60vh]">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
                </div>
            </Layout>
        );
    }

    if (!user) {
        return (
            <Layout>
                <div className="flex items-center justify-center min-h-[60vh] px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-slate-100"
                    >
                        <div className="text-center mb-8">
                            <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-indigo-600">
                                <Lock size={32} />
                            </div>
                            <h2 className="text-2xl font-bold text-slate-900">Admin Login</h2>
                            <p className="text-sm text-slate-500 mt-2">กรุณาเข้าสู่ระบบด้วยบัญชีผู้ดูแลระบบ</p>
                        </div>
                        <form onSubmit={handleLogin} className="space-y-6">
                            {error && (
                                <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg text-center">
                                    {error}
                                </div>
                            )}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                                    required
                                    placeholder="admin@example.com"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                                    required
                                    placeholder="••••••••"
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all hover:scale-[1.02]"
                            >
                                <LogIn size={20} className="mr-2" /> เข้าสู่ระบบ
                            </button>
                        </form>
                    </motion.div>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                    <h1 className="text-3xl font-bold text-slate-900">Admin Dashboard</h1>
                    <div className="flex space-x-4 items-center">
                        <span className="text-sm text-slate-500 hidden md:inline-block mr-2">{user.email}</span>
                        <button
                            onClick={() => openForm()}
                            className="flex items-center space-x-2 bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition shadow-lg shadow-indigo-500/30"
                        >
                            <Plus size={20} /> <span>เพิ่มผลงาน</span>
                        </button>
                        <button
                            onClick={handleLogout}
                            className="flex items-center space-x-2 bg-slate-200 text-slate-700 px-6 py-2 rounded-lg hover:bg-slate-300 transition"
                        >
                            <LogOut size={18} />
                            <span>ออกจากระบบ</span>
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6">
                    {projects.map((project) => (
                        <motion.div
                            layout
                            key={project.id}
                            className="bg-white p-6 rounded-xl shadow-md border border-slate-100 flex flex-col md:flex-row items-center gap-6"
                        >
                            <img src={project.image} alt={project.title} className="w-full md:w-32 h-32 object-cover rounded-lg" />
                            <div className="flex-1 text-center md:text-left">
                                <h3 className="text-xl font-bold text-slate-900">{project.title}</h3>
                                <p className="text-slate-500 text-sm mb-2">{project.description}</p>
                                <p className="text-slate-400 text-xs truncate max-w-md">{project.link}</p>
                            </div>
                            <div className="flex space-x-3">
                                <button
                                    onClick={() => openForm(project)}
                                    className="p-3 bg-amber-100 text-amber-600 rounded-lg hover:bg-amber-200 transition"
                                >
                                    <Edit size={20} />
                                </button>
                                <button
                                    onClick={() => handleDelete(project.id)}
                                    className="p-3 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition"
                                >
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                    {projects.length === 0 && (
                        <div className="text-center py-20 text-slate-400">ยังไม่มีผลงาน</div>
                    )}
                </div>

                {/* Form Modal */}
                <AnimatePresence>
                    {showForm && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl"
                            >
                                <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                                    <h3 className="text-xl font-bold text-slate-900">{isEditing ? 'แก้ไขผลงาน' : 'เพิ่มผลงานใหม่'}</h3>
                                    <button onClick={closeForm} className="text-slate-400 hover:text-slate-600"><X size={24} /></button>
                                </div>
                                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">ชื่อผลงาน</label>
                                        <input type="text" required value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">คำอธิบายสั้น</label>
                                        <input type="text" required value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">URL รูปภาพ</label>
                                        <input type="url" required value={formData.image} onChange={e => setFormData({ ...formData, image: e.target.value })} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">รายละเอียด</label>
                                        <textarea required rows={4} value={formData.details} onChange={e => setFormData({ ...formData, details: e.target.value })} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"></textarea>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">ลิงก์ผลงาน</label>
                                        <input type="url" required value={formData.link} onChange={e => setFormData({ ...formData, link: e.target.value })} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />
                                    </div>
                                    <div className="flex space-x-4 pt-4">
                                        <button type="submit" className="flex-1 bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition font-medium">บันทึก</button>
                                        <button type="button" onClick={closeForm} className="flex-1 bg-slate-100 text-slate-700 py-3 rounded-lg hover:bg-slate-200 transition font-medium">ยกเลิก</button>
                                    </div>
                                </form>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </Layout>
    );
};

export default Admin;
