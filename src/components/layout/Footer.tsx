import React from 'react';
import { Facebook, Mail } from 'lucide-react';

import VisitorCounter from '../VisitorCounter';

const Footer: React.FC = () => {
    return (
        <footer className="bg-slate-900 text-white py-12 border-t border-slate-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <h4 className="text-lg font-semibold mb-4 text-indigo-400">ติดต่อ</h4>
                        <div className="flex items-center space-x-2 text-slate-400">
                            <Mail size={16} />
                            <span>Wattanapong.t64@gmail.com</span>
                        </div>
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold mb-4 text-indigo-400">โซเชียลมีเดีย</h4>
                        <div className="flex space-x-4">
                            <a
                                href="https://www.facebook.com/waritta.tabthanee/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white transition-all duration-300"
                            >
                                <Facebook size={20} />
                            </a>
                        </div>
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold mb-4 text-indigo-400">เกี่ยวกับเว็บไซต์</h4>
                        <p className="text-slate-400 leading-relaxed">
                            พื้นที่สำหรับแบ่งปันความรู้ สื่อการสอน และผลงานต่างๆ ที่ได้สร้างสรรค์ขึ้น เพื่อการศึกษาและการเรียนรู้
                        </p>
                    </div>
                </div>
                <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-slate-500 text-sm order-2 md:order-1">
                        &copy; 2024 Free Learning Space by Wattanapong T. All rights reserved.
                    </p>
                    <div className="order-1 md:order-2">
                        <VisitorCounter />
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
