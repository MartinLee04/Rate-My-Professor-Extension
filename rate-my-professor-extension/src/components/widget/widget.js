import { rmpApi } from '../../api/rmpApi.js';

export function createRmpWidget(professorName) {
    const existingWidget = document.querySelector('.rmp-container');
    if (existingWidget) existingWidget.remove();

    const container = document.createElement('div');
    container.className = 'rmp-container';

    const loading = document.createElement('div');
    loading.className = 'rmp-loading';
    loading.textContent = 'Loading professor data...';
    container.appendChild(loading);

    document.body.appendChild(container);

    rmpApi.getProfessorRatingAtSchoolId(professorName, 'U2Nob29sLTEwNzM=').then(data => {
        container.innerHTML = '';

        const title = document.createElement('h3');
        title.textContent = \`RateMyProfessor: \${professorName}\`;
        container.appendChild(title);

        if (data) {
            const rating = document.createElement('div');
            rating.className = 'rmp-rating';
            rating.textContent = \`Rating: \${data.avgRating}/5\`;
            container.appendChild(rating);

            const difficulty = document.createElement('div');
            difficulty.className = 'rmp-rating';
            difficulty.textContent = \`Difficulty: \${data.avgDifficulty}/5\`;
            container.appendChild(difficulty);

            const wouldTakeAgain = document.createElement('div');
            wouldTakeAgain.className = 'rmp-rating';
            wouldTakeAgain.textContent = \`Would Take Again: \${data.wouldTakeAgainPercent}%\`;
            container.appendChild(wouldTakeAgain);

            const reviews = document.createElement('div');
            reviews.className = 'rmp-rating';
            reviews.textContent = \`Reviews: \${data.numRatings}\`;
            container.appendChild(reviews);

            const department = document.createElement('div');
            department.className = 'rmp-rating';
            department.textContent = \`Department: \${data.department}\`;
            container.appendChild(department);

            const link = document.createElement('a');
            link.className = 'rmp-link';
            link.href = data.link;
            link.target = '_blank';
            link.textContent = 'View on RateMyProfessor';
            container.appendChild(link);
        } else {
            const error = document.createElement('div');
            error.className = 'rmp-error';
            error.textContent = 'No data found for this professor.';
            container.appendChild(error);
        }
    });
}