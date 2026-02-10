import React from 'react';
import { Facebook, Youtube, Coffee } from 'lucide-react';
import { motion } from 'framer-motion';

const SocialFloatingBar: React.FC = () => {
    const socials = [
        {
            name: 'Facebook',
            icon: Facebook,
            url: 'https://www.facebook.com/waritta.tabthanee/',
            color: 'bg-[#1877F2] hover:bg-[#166fe5]',
            label: 'ติดตามผ่าน Facebook'
        },
        {
            name: 'YouTube',
            icon: Youtube,
            url: 'https://youtube.com/playlist?list=PLPkIU8lXBFXF8ziZKvLf2GTZ-VHrQkBX8',
            color: 'bg-[#FF0000] hover:bg-[#e60000]',
            label: 'ดูผลงานบน YouTube'
        },
        {
            name: 'Support',
            icon: Coffee,
            url: 'https://www.buymeacoffee.com/', // Placeholder, user can update
            color: 'bg-[#FFDD00] text-slate-900 hover:bg-[#ffea00]',
            label: 'Buy me a Coffee'
        }
    ];

    return (
        <div className="fixed left-0 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-2 p-2 pointer-events-none">
            {socials.map((social, index) => (
                <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 1 + index * 0.1, type: 'spring' }}
                    className={`
                        pointer-events-auto
                        flex items-center gap-3 p-3 pl-4 pr-6 
                        ${social.color} text-white 
                        rounded-r-full shadow-lg 
                        transform hover:translate-x-2 transition-transform duration-300
                        group relative
                    `}
                >
                    <social.icon size={24} />
                    <span className="font-medium text-sm whitespace-nowrap max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-out">
                        {social.label}
                    </span>

                    {/* Tooltip for when collapsed */}
                    {/* <div className="absolute left-full ml-2 px-2 py-1 bg-slate-800 text-white text-xs rounded opacity-0 group-hover:opacity-0 transition-opacity whitespace-nowrap">
                        {social.label}
                    </div> */}
                </motion.a>
            ))}
        </div>
    );
};

export default SocialFloatingBar;
