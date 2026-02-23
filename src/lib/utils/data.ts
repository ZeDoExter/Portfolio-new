import frontMatter from 'front-matter';
import { marked } from 'marked';

export interface Project {
    slug: string;
    title: string;
    description: string;
    tags: string[];
    thumbnail?: string;
    content: string;
    date: string;
    layout?: "A" | "B" | "C";
    jarUrl?: string;
    jarWidth?: number;
    githubUrl?: string;
    jarHeight?: number;
    jarScale?: number;
    priority?: number;
}

export const getProjects = async (): Promise<Project[]> => {
    const modules = import.meta.glob('/src/content/projects/*.md', { query: '?raw', import: 'default' });
    const projects: Project[] = [];

    for (const path in modules) {
        const raw = await modules[path]() as string;
        // @ts-ignore
        const { attributes, body } = frontMatter(raw);
        const slug = path.split('/').pop()?.replace('.md', '') || '';
        const htmlContent = await marked.parse(body);

        projects.push({
            slug,
            ...attributes as any,
            content: htmlContent
        });
    }

    return projects.sort((a, b) => {
        const pA = a.priority || 0;
        const pB = b.priority || 0;
        if (pB !== pA) {
            return pB - pA;
        }
        return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
};
