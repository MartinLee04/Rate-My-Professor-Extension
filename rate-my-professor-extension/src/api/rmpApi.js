import { fetchProfessorData } from './rmpScraper.js';

export const rmpApi = {
    async searchSchool(schoolName) {
        // Optionally implement this or hardcode the ID
        return [{ node: { id: 'U2Nob29sLTEwNzM=', name: 'University of Waterloo' } }];
    },
    async getProfessorRatingAtSchoolId(professorName, schoolId) {
        return await fetchProfessorData(professorName, schoolId);
    }
};