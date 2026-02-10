import React, { useEffect, useState } from 'react';
import { database } from '../lib/firebase';
import { ref, onValue, runTransaction } from 'firebase/database';
import { User } from 'lucide-react';

const VisitorCounter: React.FC = () => {
    const [views, setViews] = useState<number>(0);

    useEffect(() => {
        const statsRef = ref(database, 'stats/totalViews');

        // Listen for real-time updates
        const unsubscribe = onValue(statsRef, (snapshot) => {
            if (snapshot.exists()) {
                setViews(snapshot.val());
            }
        });

        // Increment view count on session start (simple implementation)
        const hasVisited = sessionStorage.getItem('hasVisited');
        if (!hasVisited) {
            runTransaction(statsRef, (currentViews) => {
                return (currentViews || 0) + 1;
            }).then(() => {
                sessionStorage.setItem('hasVisited', 'true');
            }).catch(console.error);
        }

        return () => unsubscribe();
    }, []);

    return (
        <div className="inline-flex items-center space-x-2 bg-slate-800/50 backdrop-blur px-3 py-1.5 rounded-full border border-slate-700/50">
            <User size={14} className="text-indigo-400" />
            <span className="text-slate-400 text-xs font-medium">
                ผู้เข้าชม: <span className="text-white font-bold animate-pulse">{views.toLocaleString()}</span>
            </span>
        </div>
    );
};

export default VisitorCounter;
