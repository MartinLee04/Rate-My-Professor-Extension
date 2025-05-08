import { getProfessorName } from './utils/professorExtractor.js';
import { createRmpWidget } from './components/widget/widget.js';

function initExtension() {
    const professorName = getProfessorName();
    if (professorName) {
        createRmpWidget(professorName);
    }
}

window.addEventListener('load', initExtension);