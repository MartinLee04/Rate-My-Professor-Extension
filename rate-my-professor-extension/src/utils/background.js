import {
    searchSchool,
    getProfessorRatingAtSchoolId
  } from "ratemyprofessor-api";
  
  chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
    if (request.type === "getProfessorRating") {
      const { professorName, schoolName } = request;
  
      try {
        const schools = await searchSchool(schoolName);
        if (!schools || schools.length === 0) {
          sendResponse({ error: "School not found" });
          return true;
        }
  
        const schoolId = schools[0].node.id;
        const rating = await getProfessorRatingAtSchoolId(professorName, schoolId);
        sendResponse({ data: rating });
      } catch (err) {
        sendResponse({ error: err.message });
      }
  
      return true;
    }
  });