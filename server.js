import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// GraphQL query to RateMyProfessors
const RMP_GRAPHQL_ENDPOINT = 'https://www.ratemyprofessors.com/graphql';
const WATERLOO_SCHOOL_ID = 'U2Nob29sLTEwNzM='; // University of Waterloo

// API route to fetch professor data
app.post('/api/professor', async (req, res) => {
    const { professorName } = req.body;

    if (!professorName) {
        return res.status(400).json({ error: 'Professor name is required' });
    }

    const query = `
        query SearchQuery($query: String!, $schoolID: ID!) {
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
        schoolID: WATERLOO_SCHOOL_ID
    };

    try {
        const response = await fetch(RMP_GRAPHQL_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Referer': 'https://www.ratemyprofessors.com/',
            },
            body: JSON.stringify({ query, variables }),
        });

        const json = await response.json();
        const prof = json?.data?.search?.teachers?.edges?.[0]?.node;

        if (!prof) return res.status(404).json({ error: 'Professor not found' });

        const result = {
            formattedName: `${prof.firstName} ${prof.lastName}`,
            avgRating: parseFloat(prof.avgRating).toFixed(1),
            numRatings: prof.numRatings,
            department: prof.department,
            link: `https://www.ratemyprofessors.com/professor/${prof.legacyId}`
        };

        res.json(result);
    } catch (error) {
        console.error('Error fetching professor data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});