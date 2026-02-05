export const domains = [
  {
    id: 'housing_history',
    name: 'A. History of Housing & Homelessness',
    shortName: 'Housing History',
    description:
      'Questions about current living situation and history of homelessness.',
    questions: [
      {
        id: 'A1',
        text: 'Where do you sleep most frequently?',
        type: 'multiple_choice',
        options: [
          { value: 'own_housing', label: 'Own apartment or house', score: 0 },
          {
            value: 'family_friends',
            label: 'Staying with family or friends (couch surfing)',
            score: 1,
          },
          { value: 'shelter', label: 'Emergency shelter', score: 2 },
          {
            value: 'transitional',
            label: 'Transitional housing program',
            score: 1,
          },
          {
            value: 'vehicle',
            label: 'Vehicle (car, van, RV)',
            score: 3,
          },
          {
            value: 'outdoors',
            label: 'Outdoors / street / park / encampment',
            score: 4,
          },
          {
            value: 'abandoned',
            label: 'Abandoned building or other place not meant for habitation',
            score: 4,
          },
        ],
      },
      {
        id: 'A2',
        text: 'How long have you been continuously homeless this current episode?',
        type: 'multiple_choice',
        options: [
          { value: 'less_1_month', label: 'Less than 1 month', score: 0 },
          { value: '1_3_months', label: '1 - 3 months', score: 1 },
          { value: '3_6_months', label: '3 - 6 months', score: 2 },
          { value: '6_12_months', label: '6 - 12 months', score: 3 },
          { value: 'more_1_year', label: 'More than 1 year', score: 4 },
        ],
      },
      {
        id: 'A3',
        text: 'How many separate times (episodes) have you experienced homelessness in the past 3 years?',
        type: 'multiple_choice',
        options: [
          { value: 'first_time', label: 'This is my first time', score: 0 },
          { value: '2_times', label: '2 times', score: 1 },
          { value: '3_times', label: '3 times', score: 2 },
          { value: '4_plus', label: '4 or more times', score: 4 },
        ],
      },
    ],
  },
  {
    id: 'risks',
    name: 'B. Risks',
    shortName: 'Risks',
    description:
      'Questions about emergency services, safety, and legal concerns.',
    questions: [
      {
        id: 'B1',
        text: 'How many times have you visited the emergency room in the past 6 months?',
        type: 'multiple_choice',
        options: [
          { value: '0', label: '0 times', score: 0 },
          { value: '1_2', label: '1 - 2 times', score: 1 },
          { value: '3_5', label: '3 - 5 times', score: 2 },
          { value: '6_9', label: '6 - 9 times', score: 3 },
          { value: '10_plus', label: '10 or more times', score: 4 },
        ],
      },
      {
        id: 'B2',
        text: 'How many times have you been hospitalized (admitted overnight or longer) in the past 6 months?',
        type: 'multiple_choice',
        options: [
          { value: '0', label: '0 times', score: 0 },
          { value: '1_2', label: '1 - 2 times', score: 1 },
          { value: '3_5', label: '3 - 5 times', score: 3 },
          { value: '6_plus', label: '6 or more times', score: 4 },
        ],
      },
      {
        id: 'B3',
        text: 'How many times have you used crisis services (e.g., crisis line, crisis team, sobering center) in the past 6 months?',
        type: 'multiple_choice',
        options: [
          { value: '0', label: '0 times', score: 0 },
          { value: '1_2', label: '1 - 2 times', score: 1 },
          { value: '3_5', label: '3 - 5 times', score: 2 },
          { value: '6_plus', label: '6 or more times', score: 4 },
        ],
      },
      {
        id: 'B4',
        text: 'How many times have you had interactions with police or law enforcement in the past 6 months?',
        type: 'multiple_choice',
        options: [
          { value: '0', label: '0 times', score: 0 },
          { value: '1_2', label: '1 - 2 times', score: 1 },
          { value: '3_5', label: '3 - 5 times', score: 2 },
          { value: '6_plus', label: '6 or more times', score: 4 },
        ],
      },
      {
        id: 'B5',
        text: 'Have you been attacked or beaten up since becoming homeless?',
        type: 'yes_no',
        yesScore: 4,
        noScore: 0,
      },
      {
        id: 'B6',
        text: 'Have you threatened to or actually harmed yourself or anyone else in the past year?',
        type: 'yes_no',
        yesScore: 4,
        noScore: 0,
      },
      {
        id: 'B7',
        text: 'Do you have any pending legal issues (e.g., warrants, court dates, probation)?',
        type: 'yes_no',
        yesScore: 2,
        noScore: 0,
      },
      {
        id: 'B8',
        text: 'Please describe any current safety concerns or risks you are facing:',
        type: 'narrative',
      },
    ],
  },
  {
    id: 'socialization',
    name: 'C. Socialization & Daily Functioning',
    shortName: 'Daily Functioning',
    description:
      'Questions about daily living skills, social connections, and functioning.',
    questions: [
      {
        id: 'C1',
        text: 'How would you rate your ability to take care of basic daily needs (hygiene, meals, laundry)?',
        type: 'multiple_choice',
        options: [
          {
            value: 'independent',
            label: 'I handle these independently without difficulty',
            score: 0,
          },
          {
            value: 'mostly',
            label: 'I manage most of the time but sometimes struggle',
            score: 1,
          },
          {
            value: 'difficulty',
            label: 'I often have difficulty and need some assistance',
            score: 2,
          },
          {
            value: 'significant',
            label: 'I have significant difficulty and regularly need help',
            score: 3,
          },
          {
            value: 'unable',
            label: 'I am unable to take care of these needs on my own',
            score: 4,
          },
        ],
      },
      {
        id: 'C2',
        text: 'How would you rate your ability to manage money (budgeting, paying bills, avoiding exploitation)?',
        type: 'multiple_choice',
        options: [
          {
            value: 'well',
            label: 'I manage my money well on my own',
            score: 0,
          },
          {
            value: 'some_difficulty',
            label: 'I have some difficulty but generally manage',
            score: 1,
          },
          {
            value: 'often_struggle',
            label: 'I often struggle with money management',
            score: 2,
          },
          {
            value: 'significant',
            label:
              'I have significant difficulty and money is frequently mismanaged',
            score: 3,
          },
          {
            value: 'unable',
            label: 'I cannot manage money on my own at all',
            score: 4,
          },
        ],
      },
      {
        id: 'C3',
        text: 'How would you describe your social relationships and support network?',
        type: 'multiple_choice',
        options: [
          {
            value: 'strong',
            label:
              'I have a strong support network of family, friends, or community',
            score: 0,
          },
          {
            value: 'some',
            label: 'I have some supportive relationships',
            score: 1,
          },
          {
            value: 'few',
            label: 'I have very few connections and often feel isolated',
            score: 2,
          },
          {
            value: 'conflict',
            label:
              'My relationships are mostly conflictual or harmful',
            score: 3,
          },
          {
            value: 'none',
            label: 'I have no support network at all',
            score: 4,
          },
        ],
      },
      {
        id: 'C4',
        text: 'Please describe any activities you have difficulty doing because of a physical, mental, or emotional condition:',
        type: 'narrative',
      },
    ],
  },
  {
    id: 'wellness',
    name: 'D. Wellness',
    shortName: 'Wellness',
    description:
      'Questions about physical health, mental health, substance use, and disabilities.',
    questions: [
      {
        id: 'D1',
        text: 'How would you rate your overall physical health?',
        type: 'multiple_choice',
        options: [
          { value: 'excellent', label: 'Excellent', score: 0 },
          { value: 'good', label: 'Good', score: 1 },
          { value: 'fair', label: 'Fair', score: 2 },
          { value: 'poor', label: 'Poor', score: 3 },
          {
            value: 'very_poor',
            label: 'Very poor / serious health conditions',
            score: 4,
          },
        ],
      },
      {
        id: 'D2',
        text: 'Do you have any chronic health conditions (e.g., diabetes, heart disease, HIV/AIDS, hepatitis)?',
        type: 'yes_no',
        yesScore: 2,
        noScore: 0,
        followUp: {
          id: 'D2a',
          text: 'If yes, please describe your chronic health conditions:',
          type: 'narrative',
        },
      },
      {
        id: 'D3',
        text: 'Are you currently taking any prescribed medications?',
        type: 'yes_no',
        yesScore: 1,
        noScore: 0,
        followUp: {
          id: 'D3a',
          text: 'If yes, are you able to take them as prescribed consistently?',
          type: 'multiple_choice',
          options: [
            { value: 'always', label: 'Yes, always', score: 0 },
            { value: 'usually', label: 'Usually, but sometimes miss doses', score: 1 },
            { value: 'rarely', label: 'Rarely - I often cannot access or take them', score: 2 },
            { value: 'never', label: 'No - I am unable to take them as prescribed', score: 3 },
          ],
        },
      },
      {
        id: 'D4',
        text: 'How often do you use alcohol or drugs?',
        type: 'multiple_choice',
        options: [
          { value: 'never', label: 'Never', score: 0 },
          {
            value: 'rarely',
            label: 'Rarely (a few times a year or less)',
            score: 0,
          },
          {
            value: 'monthly',
            label: 'Monthly or a few times a month',
            score: 1,
          },
          { value: 'weekly', label: 'Weekly', score: 2 },
          { value: 'daily', label: 'Daily or almost daily', score: 4 },
        ],
      },
      {
        id: 'D5',
        text: 'Has your drinking or drug use ever led to you being kicked out, losing housing, or having trouble keeping housing?',
        type: 'yes_no',
        yesScore: 3,
        noScore: 0,
      },
      {
        id: 'D6',
        text: 'Have you ever been told you have a mental health condition (e.g., depression, anxiety, PTSD, bipolar disorder, schizophrenia)?',
        type: 'yes_no',
        yesScore: 2,
        noScore: 0,
        followUp: {
          id: 'D6a',
          text: 'If yes, please describe your mental health condition(s):',
          type: 'narrative',
        },
      },
      {
        id: 'D7',
        text: 'Do you have a co-occurring mental health and substance use condition (dual diagnosis)?',
        type: 'yes_no',
        yesScore: 3,
        noScore: 0,
      },
      {
        id: 'D8',
        text: 'Do you have any physical, developmental, or cognitive disabilities?',
        type: 'yes_no',
        yesScore: 2,
        noScore: 0,
        followUp: {
          id: 'D8a',
          text: 'If yes, please describe your disability or disabilities:',
          type: 'narrative',
        },
      },
      {
        id: 'D9',
        text: 'Have you ever had a serious brain injury or head trauma?',
        type: 'yes_no',
        yesScore: 2,
        noScore: 0,
      },
      {
        id: 'D10',
        text: 'Please describe any additional physical health, mental health, or substance use concerns:',
        type: 'narrative',
      },
    ],
  },
];

export function getAllQuestions() {
  const questions = [];
  for (const domain of domains) {
    for (const question of domain.questions) {
      questions.push({ ...question, domainId: domain.id });
      if (question.followUp) {
        questions.push({ ...question.followUp, domainId: domain.id, isFollowUp: true, parentId: question.id });
      }
    }
  }
  return questions;
}

export function getMaxScoreForDomain(domainId) {
  const domain = domains.find((d) => d.id === domainId);
  if (!domain) return 0;
  let max = 0;
  for (const q of domain.questions) {
    if (q.type === 'multiple_choice') {
      max += Math.max(...q.options.map((o) => o.score));
    } else if (q.type === 'yes_no') {
      max += Math.max(q.yesScore, q.noScore);
    }
    if (q.followUp && q.followUp.type === 'multiple_choice') {
      max += Math.max(...q.followUp.options.map((o) => o.score));
    }
  }
  return max;
}

export function getTotalMaxScore() {
  return domains.reduce((sum, d) => sum + getMaxScoreForDomain(d.id), 0);
}
