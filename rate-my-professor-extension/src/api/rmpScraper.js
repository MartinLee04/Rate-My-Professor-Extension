export async function fetchProfessorData(professorName, schoolId) {
    const query = `
        query SearchQuery(
            $query: String!
            $schoolID: ID!
        ) {
            search: newSearch {
                teachers(query: $query, schoolID: $schoolID, first: 1) {
                    edges {
                        node {
                            id
                            firstName
                            lastName
                            avgRating
                            numRatings
                            department
                            legacyId
                        }
                    }
                }
            }
        }
    `;

    const variables = {
        query: professorName,
        schoolID: schoolId, // e.g., 'U2Nob29sLTEwNzM=' for Waterloo
    };

    try {
        const response = await fetch('https://www.ratemyprofessors.com/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Referer': 'https://www.ratemyprofessors.com/',
            },
            body: JSON.stringify({ query, variables }),
        });

        const json = await response.json();
        const teacher = json?.data?.search?.teachers?.edges?.[0]?.node;

        if (!teacher) return null;

        return {
            avgRating: parseFloat(teacher.avgRating).toFixed(1),
            numRatings: teacher.numRatings,
            department: teacher.department,
            formattedName: `${teacher.firstName} ${teacher.lastName}`,
            link: `https://www.ratemyprofessors.com/professor/${teacher.legacyId}`
        };
    } catch (err) {
        console.error('Failed to fetch RMP data:', err);
        return null;
    }
}
