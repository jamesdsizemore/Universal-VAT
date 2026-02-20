import { domains, ccsDomains, findQuestion, getDescMaxForDomain, getDescTotalMax, getCCSTotalMax } from '../data/questions';

// =============================================================
// DESC scoring (extended, max 48)
// =============================================================

export function getQuestionScore(question, answer) {
  if (!answer || question.type !== 'multiple_choice') return 0;
  const option = question.options.find((o) => o.value === answer);
  return option ? option.score : 0;
}

export function getDescDomainScore(domainId, answers) {
  const domain = domains.find((d) => d.id === domainId);
  if (!domain) return 0;
  let score = 0;
  for (const q of domain.questions) {
    if (q.type === 'multiple_choice') {
      score += getQuestionScore(q, answers[q.id]);
    }
  }
  return score;
}

export function getDescTotalScore(answers) {
  return domains.reduce((sum, d) => sum + getDescDomainScore(d.id, answers), 0);
}

function riskFromPct(pct) {
  if (pct < 0.25) return { level: 'Low', color: 'green' };
  if (pct < 0.5) return { level: 'Moderate', color: 'yellow' };
  if (pct < 0.75) return { level: 'High', color: 'orange' };
  return { level: 'Severe', color: 'red' };
}

const riskDescriptions = {
  Low: 'Low vulnerability — may benefit from light-touch services or prevention resources.',
  Moderate: 'Moderate vulnerability — would benefit from targeted support services and case management.',
  High: 'High vulnerability — needs intensive support services and prioritized housing placement.',
  Severe: 'Severe vulnerability — requires immediate intervention and highest priority for permanent supportive housing.',
};

export function getDescRiskLevel(score) {
  const risk = riskFromPct(score / getDescTotalMax());
  return { ...risk, description: riskDescriptions[risk.level] };
}

export function getDescDomainRiskLevel(domainId, answers) {
  const max = getDescMaxForDomain(domainId);
  if (max === 0) return { level: 'N/A', color: 'gray' };
  return riskFromPct(getDescDomainScore(domainId, answers) / max);
}

/** Full DESC breakdown: per-domain scores with question details */
export function getDescBreakdown(answers) {
  return domains.map((domain) => {
    const score = getDescDomainScore(domain.id, answers);
    const maxScore = getDescMaxForDomain(domain.id);
    const risk = getDescDomainRiskLevel(domain.id, answers);

    const questionDetails = domain.questions.map((q) => {
      const detail = { id: q.id, text: q.text, type: q.type };

      if (q.type === 'multiple_choice') {
        const opt = q.options.find((o) => o.value === answers[q.id]);
        detail.answer = answers[q.id] || null;
        detail.answerLabel = opt ? `${opt.value}. ${opt.label}` : null;
        detail.score = getQuestionScore(q, answers[q.id]);
        detail.hidden = q.showWhen && answers[q.showWhen.questionId] === q.showWhen.notValue;
      } else {
        detail.answer = answers[q.id] || '';
        detail.score = null;
      }
      return detail;
    });

    return { id: domain.id, name: domain.name, score, maxScore, risk, questions: questionDetails };
  });
}

// =============================================================
// CCS scoring (compact, max 21)
// Each CCS domain score = max of mapped DESC question scores.
// =============================================================

export function getCCSDomainScore(ccsDomain, answers) {
  let maxScore = 0;
  for (const qId of ccsDomain.descQuestions) {
    const q = findQuestion(qId);
    if (q) {
      maxScore = Math.max(maxScore, getQuestionScore(q, answers[qId]));
    }
  }
  return maxScore; // 0-3
}

export function getCCSTotalScore(answers) {
  return ccsDomains.reduce((sum, d) => sum + getCCSDomainScore(d, answers), 0);
}

export function getCCSRiskLevel(score) {
  const risk = riskFromPct(score / getCCSTotalMax());
  return { ...risk, description: riskDescriptions[risk.level] };
}

export function getCCSBreakdown(answers) {
  return ccsDomains.map((ccsDomain) => {
    const score = getCCSDomainScore(ccsDomain, answers);
    const narrative = ccsDomain.narrativeId ? (answers[ccsDomain.narrativeId] || '') : '';
    return {
      id: ccsDomain.id,
      name: ccsDomain.name,
      score,
      maxScore: 3,
      risk: riskFromPct(score / 3),
      narrative,
    };
  });
}

// =============================================================
// Shared: narrative responses
// =============================================================

export function getNarrativeResponses(answers) {
  const narratives = [];
  for (const domain of domains) {
    for (const q of domain.questions) {
      if (q.type === 'narrative' && answers[q.id]) {
        narratives.push({ domainName: domain.name, questionId: q.id, text: q.text, response: answers[q.id] });
      }
    }
  }
  return narratives;
}
