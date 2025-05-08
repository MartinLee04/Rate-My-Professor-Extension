export const mockRmpApi = {
    async searchSchool(schoolName) {
        return [{ node: { id: 'U2Nob29sLTEwNzM=', name: 'University of Waterloo' } }];
    },
    async getProfessorRatingAtSchoolId(professorName, schoolId) {
        return {
            avgRating: 4.0,
            avgDifficulty: 3.0,
            wouldTakeAgainPercent: 70,
            numRatings: 100,
            formattedName: professorName,
            department: 'Unknown',
            link: 'https://www.ratemyprofessors.com'
        };
    }
};