import { error } from '@sveltejs/kit';
import { getProjects } from '$utils/data';

export const load = async ({ params }) => {
    const projects = await getProjects();
    const project = projects.find((p) => p.slug === params.slug);

    if (!project) {
        throw error(404, 'Article not found');
    }

    return {
        project
    };
};
