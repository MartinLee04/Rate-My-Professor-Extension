import { fetchProfessorData } from './rmpScraper.js';

export const rmpApi = {
    async searchSchool(schoolName) {
        return [{ node: { id: 'U2Nob29sLTEwNzM=', name: 'University of Waterloo' } }];
    },
    async getProfessorRatingAtSchoolId(professorName, schoolId) {
        return await fetchProfessorData(professorName, schoolId);
    }
};
