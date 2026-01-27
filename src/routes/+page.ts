import { getProjects } from '$utils/data';

export const load = async () => {
    const projects = await getProjects();
    return {
        projects
    };
};
