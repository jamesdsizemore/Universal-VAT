import {
  domains,
  getMaxScoreForDomain,
  getTotalMaxScore,
  getCCSMaxScoreForDomain,
  getCCSTotalMaxScore,
} from '../data/questions';

// =============================================
// DESC scoring (extended)
// =============================================

export function getQuestionScore(question, answer) {
  if (!answer && answer !== false) return 0;

  if (question.type === 'multiple_choice') {
    const option = question.options.find((o) => o.value === answer);
    return option ? option.score : 0;
  }

  if (question.type === 'yes_no') {
    return answer === 'yes' ? question.yesScore : question.noScore;
  }

  return 0;
}

export function getDomainScore(domainId, answers) {
  const domain = domains.find((d) => d.id === domainId);
  if (!domain) return 0;

  let score = 0;
  for (const q of domain.questions) {
    score += getQuestionScore(q, answers[q.id]);
    if (q.followUp && q.followUp.type === 'multiple_choice') {
      score += getQuestionScore(q.followUp, answers[q.followUp.id]);
    }
  }
  return score;
}

export function getTotalScore(answers) {
  return domains.reduce((sum, d) => sum + getDomainScore(d.id, answers), 0);
}

export function getRiskLevel(score) {
  const max = getTotalMaxScore();
  const pct = score / max;

  if (pct < 0.25) return { level: 'Low', color: 'green', description: 'Low vulnerability - may benefit from light-touch services or prevention resources.' };
  if (pct < 0.5) return { level: 'Moderate', color: 'yellow', description: 'Moderate vulnerability - would benefit from targeted support services and case management.' };
  if (pct < 0.75) return { level: 'High', color: 'orange', description: 'High vulnerability - needs intensive support services and prioritized housing placement.' };
  return { level: 'Severe', color: 'red', description: 'Severe vulnerability - requires immediate intervention and highest priority for permanent supportive housing.' };
}

export function getDomainRiskLevel(domainId, answers) {
  const score = getDomainScore(domainId, answers);
  const max = getMaxScoreForDomain(domainId);
  if (max === 0) return { level: 'N/A', color: 'gray' };
  const pct = score / max;

  if (pct < 0.25) return { level: 'Low', color: 'green' };
  if (pct < 0.5) return { level: 'Moderate', color: 'yellow' };
  if (pct < 0.75) return { level: 'High', color: 'orange' };
  return { level: 'Severe', color: 'red' };
}

export function getDomainBreakdown(answers) {
  return domains.map((domain) => {
    const score = getDomainScore(domain.id, answers);
    const maxScore = getMaxScoreForDomain(domain.id);
    const risk = getDomainRiskLevel(domain.id, answers);

    const questionDetails = [];
    for (const q of domain.questions) {
      const detail = {
        id: q.id,
        text: q.text,
        type: q.type,
        answer: answers[q.id] || null,
        score: getQuestionScore(q, answers[q.id]),
      };

      if (q.type === 'multiple_choice' && answers[q.id]) {
        const opt = q.options.find((o) => o.value === answers[q.id]);
        detail.answerLabel = opt ? opt.label : answers[q.id];
      } else if (q.type === 'yes_no') {
        detail.answerLabel = answers[q.id] === 'yes' ? 'Yes' : answers[q.id] === 'no' ? 'No' : null;
      } else if (q.type === 'narrative') {
        detail.answerLabel = answers[q.id] || '';
        detail.score = null;
      }

      if (q.followUp) {
        detail.followUp = {
          id: q.followUp.id,
          text: q.followUp.text,
          type: q.followUp.type,
          answer: answers[q.followUp.id] || null,
        };
        if (q.followUp.type === 'multiple_choice' && answers[q.followUp.id]) {
          const fopt = q.followUp.options.find((o) => o.value === answers[q.followUp.id]);
          detail.followUp.answerLabel = fopt ? fopt.label : answers[q.followUp.id];
          detail.followUp.score = getQuestionScore(q.followUp, answers[q.followUp.id]);
        } else if (q.followUp.type === 'narrative') {
          detail.followUp.answerLabel = answers[q.followUp.id] || '';
          detail.followUp.score = null;
        }
      }

      questionDetails.push(detail);
    }

    return {
      id: domain.id,
      name: domain.name,
      shortName: domain.shortName,
      score,
      maxScore,
      risk,
      questions: questionDetails,
    };
  });
}

// =============================================
// CCS scoring (compact, max 21)
// =============================================

export function getCCSQuestionScore(question, answer) {
  if (!answer && answer !== false) return 0;

  if (question.type === 'multiple_choice') {
    const option = question.options.find((o) => o.value === answer);
    return option ? option.ccsScore : 0;
  }

  if (question.type === 'yes_no') {
    return answer === 'yes' ? question.ccsYesScore : question.ccsNoScore;
  }

  return 0;
}

export function getCCSDomainScore(domainId, answers) {
  const domain = domains.find((d) => d.id === domainId);
  if (!domain) return 0;

  let score = 0;
  for (const q of domain.questions) {
    score += getCCSQuestionScore(q, answers[q.id]);
    if (q.followUp && q.followUp.type === 'multiple_choice') {
      score += getCCSQuestionScore(q.followUp, answers[q.followUp.id]);
    }
  }
  return score;
}

export function getCCSTotalScore(answers) {
  return domains.reduce((sum, d) => sum + getCCSDomainScore(d.id, answers), 0);
}

export function getCCSRiskLevel(score) {
  const max = getCCSTotalMaxScore(); // 21
  const pct = score / max;

  if (pct < 0.25) return { level: 'Low', color: 'green', description: 'Low vulnerability - may benefit from light-touch services or prevention resources.' };
  if (pct < 0.5) return { level: 'Moderate', color: 'yellow', description: 'Moderate vulnerability - would benefit from targeted support services and case management.' };
  if (pct < 0.75) return { level: 'High', color: 'orange', description: 'High vulnerability - needs intensive support services and prioritized housing placement.' };
  return { level: 'Severe', color: 'red', description: 'Severe vulnerability - requires immediate intervention and highest priority for permanent supportive housing.' };
}

export function getCCSDomainRiskLevel(domainId, answers) {
  const score = getCCSDomainScore(domainId, answers);
  const max = getCCSMaxScoreForDomain(domainId);
  if (max === 0) return { level: 'N/A', color: 'gray' };
  const pct = score / max;

  if (pct < 0.25) return { level: 'Low', color: 'green' };
  if (pct < 0.5) return { level: 'Moderate', color: 'yellow' };
  if (pct < 0.75) return { level: 'High', color: 'orange' };
  return { level: 'Severe', color: 'red' };
}

export function getCCSDomainBreakdown(answers) {
  return domains.map((domain) => {
    const score = getCCSDomainScore(domain.id, answers);
    const maxScore = getCCSMaxScoreForDomain(domain.id);
    const risk = getCCSDomainRiskLevel(domain.id, answers);

    return {
      id: domain.id,
      name: domain.name,
      shortName: domain.shortName,
      score,
      maxScore,
      risk,
    };
  });
}

// =============================================
// Shared helpers
// =============================================

export function getNarrativeResponses(answers) {
  const narratives = [];
  for (const domain of domains) {
    for (const q of domain.questions) {
      if (q.type === 'narrative' && answers[q.id]) {
        narratives.push({ domainName: domain.shortName, questionId: q.id, text: q.text, response: answers[q.id] });
      }
      if (q.followUp && q.followUp.type === 'narrative' && answers[q.followUp.id]) {
        narratives.push({ domainName: domain.shortName, questionId: q.followUp.id, text: q.followUp.text, response: answers[q.followUp.id] });
      }
    }
  }
  return narratives;
}
