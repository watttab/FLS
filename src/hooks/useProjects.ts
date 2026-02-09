import { useState, useEffect } from 'react';
import { database } from '../lib/firebase';
import { ref, onValue } from 'firebase/database';

export interface Project {
    id: string;
    title: string;
    description: string;
    image: string;
    details: string;
    link: string;
}

export const useProjects = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const projectsRef = ref(database, 'projects');

        return onValue(projectsRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const projectList = Object.keys(data).map(key => ({
                    id: key,
                    ...data[key]
                })).reverse(); // Newest first
                setProjects(projectList);
            } else {
                setProjects([]);
            }
            setLoading(false);
        });
    }, []);

    return { projects, loading };
};
