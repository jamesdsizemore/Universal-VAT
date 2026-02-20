// =============================================================
// DESC CE Mini-VAT Questions (9 domains, 23 questions)
// Scoring: each MC option a=0, b=1, c=2, d=3
// =============================================================

export const domains = [
  {
    id: 'survival_skills',
    name: 'Survival Skills',
    questions: [
      {
        id: 'Q1',
        text: 'Do they have their belongings or benefits taken, i.e. EBT or Direct Express cards stolen, or been the victim of assault or other interpersonal violence within the last twelve months',
        type: 'multiple_choice',
        options: [
          { value: 'a', label: 'Never', score: 0 },
          { value: 'b', label: 'Once or twice in the last year', score: 1 },
          { value: 'c', label: 'Sometimes but not recently', score: 2 },
          { value: 'd', label: 'Frequently or very recently', score: 3 },
        ],
      },
      {
        id: 'Q2',
        text: 'Do they share concerns about their safety?',
        type: 'multiple_choice',
        options: [
          { value: 'a', label: 'No', score: 0 },
          { value: 'b', label: 'Yes but seems to be able to safety plan or navigate away from unsafe situations', score: 1 },
          { value: 'c', label: 'Yes but seems to have challenges safety planning or navigating away from unsafe situations', score: 2 },
          { value: 'd', label: 'No but frequently find themselves in unsafe situations', score: 3 },
        ],
      },
      {
        id: 'Q3',
        text: 'Please share specific observations or incidents to justify above selection',
        type: 'narrative',
      },
    ],
  },
  {
    id: 'organization_orientation',
    name: 'Organization and Orientation',
    questions: [
      {
        id: 'Q4',
        text: 'Do they generally track their surroundings well i.e. can recall history and names, remember to attend to daily tasks, know how to navigate the bus system, etc?',
        type: 'multiple_choice',
        options: [
          { value: 'a', label: 'Yes', score: 0 },
          { value: 'b', label: 'Most of the time', score: 1 },
          { value: 'c', label: 'Sometimes', score: 2 },
          { value: 'd', label: 'Never', score: 3 },
        ],
      },
      {
        id: 'Q5',
        text: 'Is this individual able to independently make and attend appointments without prompting or follow up from others?',
        type: 'multiple_choice',
        options: [
          { value: 'a', label: 'Yes', score: 0 },
          { value: 'b', label: 'Most of the time', score: 1 },
          { value: 'c', label: 'Sometimes', score: 2 },
          { value: 'd', label: 'Never', score: 3 },
        ],
      },
      {
        id: 'Q6',
        text: 'Please share specific observations or incidents to justify above selection',
        type: 'narrative',
      },
    ],
  },
  {
    id: 'medical_risks',
    name: 'Medical Risks',
    questions: [
      {
        id: 'Q7',
        text: 'Does this person have any known medical diagnoses or medications. If there are no known diagnoses or medications, do they have any unexplained medical symptoms including but not limited to: swelling, untreated open wounds, shortness of breath, chest pains, unexplained weight loss, chronic cough, incontinent of urine and stool',
        type: 'multiple_choice',
        options: [
          { value: 'a', label: 'No known or observed medical challenges', score: 0 },
          { value: 'b', label: 'Known or observed medical conditions that have minor impacts', score: 1 },
          { value: 'c', label: 'Known or observed medical conditions that require ongoing treatment', score: 2 },
          { value: 'd', label: 'Known or observed medical conditions that have resulted in hospitalization recently and has major impacts on daily living', score: 3 },
        ],
      },
      {
        id: 'Q8',
        text: 'If there is a known medical diagnosis and/or prescribed medication, are they regularly taking medications and/or following through with treatment plan',
        type: 'multiple_choice',
        showWhen: { questionId: 'Q7', notValue: 'a' },
        options: [
          { value: 'a', label: 'Consistently following through with treatment and/or medication wholly independently', score: 0 },
          { value: 'b', label: 'Most of the time following through with treatment with staff support', score: 1 },
          { value: 'c', label: 'Sometimes following through despite staff support', score: 2 },
          { value: 'd', label: 'Never following through or refusing staff support though clearly needing medical support', score: 3 },
        ],
      },
      {
        id: 'Q9',
        text: 'Please share specific observations or incidents to justify above selection',
        type: 'narrative',
      },
    ],
  },
  {
    id: 'substance_use',
    name: 'Substance Use',
    questions: [
      {
        id: 'Q10',
        text: 'What are impacts from substance use?',
        type: 'multiple_choice',
        options: [
          { value: 'a', label: 'None or do not use', score: 0 },
          { value: 'b', label: 'Minor i.e. some challenges but seems to have figured out how to manage use and meeting his/her needs', score: 1 },
          { value: 'c', label: 'Moderate i.e. clear challenges related to use with difficulty managing, some conflicts or engagements with law enforcement, impacting ability to follow through with needs or goals', score: 2 },
          { value: 'd', label: 'Severe i.e. recent or frequent overdoses, other medical challenges related to substance use, experiences withdrawal symptoms, frequent conflicts or engagement with law enforcement, etc', score: 3 },
        ],
      },
      {
        id: 'Q11',
        text: 'Are they getting support for their substance use disorder i.e. seeing a Substance Use Disorder Professional, on medication assisted treatment such as buprenorphine, plans for inpatient treatment, etc?',
        type: 'multiple_choice',
        showWhen: { questionId: 'Q10', notValue: 'a' },
        options: [
          { value: 'a', label: 'Consistently following through with treatment and recovery wholly independently', score: 0 },
          { value: 'b', label: 'Most of the time following through with treatment and recovery with staff support', score: 1 },
          { value: 'c', label: 'Sometimes following through with treatment and recovery with staff support', score: 2 },
          { value: 'd', label: 'Never following through or refusing staff support though clearly needing support', score: 3 },
        ],
      },
      {
        id: 'Q12',
        text: 'Please share specific observations or incidents to justify above selection',
        type: 'narrative',
      },
    ],
  },
  {
    id: 'basic_needs',
    name: 'Basic Needs',
    questions: [
      {
        id: 'Q13',
        text: 'Are they currently meeting basic needs i.e. food, clothing, shelter, and hygiene',
        type: 'multiple_choice',
        options: [
          { value: 'a', label: 'Yes, meeting hygiene and food needs independently', score: 0 },
          { value: 'b', label: 'Yes, mostly meeting basic needs with staff support', score: 1 },
          { value: 'c', label: 'Somewhat meeting needs, i.e. poor hygiene, unfamiliar with food resources like food banks or meals, no income, even with staff support', score: 2 },
          { value: 'd', label: 'Rarely or not at all meeting needs, i.e. poor hygiene, not getting enough to eat or eating from garbage, and refuses staff support', score: 3 },
        ],
      },
      {
        id: 'Q14',
        text: 'Are they able to maintain healthy and safe living conditions',
        type: 'multiple_choice',
        options: [
          { value: 'a', label: 'Yes, no issues managing independently', score: 0 },
          { value: 'b', label: 'Mostly able to manage belongings and personal space with staff support', score: 1 },
          { value: 'c', label: 'Difficulty maintaining, i.e. accumulating a lot of belongings, belongings attracting pests or becoming unsanitary, even with staff support', score: 2 },
          { value: 'd', label: 'Difficulty maintaining, i.e. accumulating a lot of belongings, belongings attracting pests or becoming unsanitary, and refuses staff support', score: 3 },
        ],
      },
      {
        id: 'Q15',
        text: 'Please share specific observations or incidents to justify above selection',
        type: 'narrative',
      },
    ],
  },
  {
    id: 'social_behaviors',
    name: 'Social Behaviors',
    questions: [
      {
        id: 'Q16',
        text: 'Have they been barred from any services or have been to jail?',
        type: 'multiple_choice',
        options: [
          { value: 'a', label: 'No or not in the last 12 months', score: 0 },
          { value: 'b', label: 'Once or twice in the last year', score: 1 },
          { value: 'c', label: 'Sometimes but not recently', score: 2 },
          { value: 'd', label: 'Frequently or very recently', score: 3 },
        ],
      },
      {
        id: 'Q17',
        text: 'Are they able to communicate and engage appropriately with community members and staff?',
        type: 'multiple_choice',
        options: [
          { value: 'a', label: 'Yes, no known crisis or escalation in last twelve months', score: 0 },
          { value: 'b', label: 'Some minor conflicts but mostly gets along well', score: 1 },
          { value: 'c', label: 'Occasional and recent conflicts with others that seem to be related to inability to tolerate others', score: 2 },
          { value: 'd', label: 'Frequent and recent conflicts with others that seem to be related to inability to tolerate others. Has resulted in crisis response', score: 3 },
        ],
      },
      {
        id: 'Q18',
        text: 'Please share specific observations or incidents to justify above selection',
        type: 'narrative',
      },
    ],
  },
  {
    id: 'mental_health',
    name: 'Mental Health',
    questions: [
      {
        id: 'Q19',
        text: 'Does this person have any known psychiatric disorder diagnoses or medications. If there are no known diagnoses or medications, do they have any unexplained psychiatric symptoms including but not limited to: talking to self, distracted, severe delusions/paranoia, fearful/phobic, extreme depressed or manic mood',
        type: 'multiple_choice',
        options: [
          { value: 'a', label: 'No known or observed psychiatric challenges', score: 0 },
          { value: 'b', label: 'Known or observed psychiatric conditions that have minor impacts, i.e. feeling down about experiencing homelessness', score: 1 },
          { value: 'c', label: 'Known or observed psychiatric conditions that require ongoing treatment', score: 2 },
          { value: 'd', label: 'Known or observed conditions that have recently resulted in hospitalization, crisis response, suicide attempts, and/or have other major impacts on daily living', score: 3 },
        ],
      },
      {
        id: 'Q20',
        text: 'If there is a known psychiatric disorder diagnosis and/or prescribed medication, are they regularly taking medications and/or following through with treatment plan',
        type: 'multiple_choice',
        showWhen: { questionId: 'Q19', notValue: 'a' },
        options: [
          { value: 'a', label: 'Consistently following through with treatment and/or medication wholly independently', score: 0 },
          { value: 'b', label: 'Most of the time following through with treatment with staff support', score: 1 },
          { value: 'c', label: 'Sometimes following through despite staff support', score: 2 },
          { value: 'd', label: 'Never following through or refusing staff support though clearly needing psychiatric support', score: 3 },
        ],
      },
      {
        id: 'Q21',
        text: 'Please share specific observations or incidents to justify above selection',
        type: 'narrative',
      },
    ],
  },
  {
    id: 'communication',
    name: 'Communication',
    questions: [
      {
        id: 'Q22',
        text: 'How well are they able to communicate in English',
        type: 'multiple_choice',
        options: [
          { value: 'a', label: 'Can speak English', score: 0 },
          { value: 'b', label: 'Limited English but can get by in most situations', score: 1 },
          { value: 'c', label: 'Little or no English and requires translation services OR physical impairment that requires non-verbal communication', score: 2 },
          { value: 'd', label: 'No comprehension of English or presents as mute or physical impairments with no non-verbal communication possible', score: 3 },
        ],
      },
    ],
  },
  {
    id: 'homelessness',
    name: 'Homelessness',
    questions: [
      {
        id: 'Q23',
        text: 'How long have they been homeless',
        type: 'multiple_choice',
        options: [
          { value: 'a', label: 'Less than a month', score: 0 },
          { value: 'b', label: 'Less than a year', score: 1 },
          { value: 'c', label: 'Less than five years', score: 2 },
          { value: 'd', label: 'Over five years', score: 3 },
        ],
      },
    ],
  },
];

// =============================================================
// CCS Screening Checklist (yes/no, not scored — for CCS output)
// =============================================================

export const ccsScreeningQuestions = [
  { id: 'SC1', text: 'Have you met with this person within the last 48 hours?' },
  { id: 'SC2', text: 'Can person perform activities of daily living (i.e. showering, toileting, dressing)?' },
  { id: 'SC3', text: 'Is the person able to walk on their own?' },
  { id: 'SC4', text: 'If needed, can the person use a mobility device independently?' },
  { id: 'SC5', text: 'Can the person transfer to/from a bed and/or a toilet independently?' },
  { id: 'SC6', text: 'Does the person and care team understand that CCS/CCA shelters are not a medical or assisted living facility?' },
  { id: 'SC7', text: 'Does the person have symptoms of significant cognitive impairment, e.g. due to TBI or dementia?' },
  { id: 'SC8', text: 'Does the person use a colostomy, urinary catheter, or require tube feeding?' },
  { id: 'SC9', text: 'Does the person have specialized medical needs such as dressing changes, special diet, supplemental oxygen, etc.?' },
  { id: 'SC10', text: 'Does the person have a pet and/or a service animal?' },
  { id: 'SC11', text: 'Does the person have a partner?' },
];

// =============================================================
// CCS Qualifying History domain definitions
// Each CCS domain maps to one or two DESC questions.
// CCS domain score = max of the mapped DESC question scores (0-3).
// 7 domains × max 3 = 21 total.
// =============================================================

export const ccsDomains = [
  { id: 'ccs_mental_health', name: 'Mental Health', descQuestions: ['Q19', 'Q20'], narrativeId: 'Q21' },
  { id: 'ccs_organization', name: 'Organization & Orientation', descQuestions: ['Q4', 'Q5'], narrativeId: 'Q6' },
  { id: 'ccs_survival', name: 'Survival Skills', descQuestions: ['Q1', 'Q2'], narrativeId: 'Q3' },
  { id: 'ccs_social', name: 'Social Functioning', descQuestions: ['Q16', 'Q17'], narrativeId: 'Q18' },
  { id: 'ccs_substance', name: 'Substance Use', descQuestions: ['Q10', 'Q11'], narrativeId: 'Q12' },
  { id: 'ccs_homelessness', name: 'Homelessness', descQuestions: ['Q23'], narrativeId: null },
  { id: 'ccs_medical', name: 'Medical', descQuestions: ['Q7', 'Q8'], narrativeId: 'Q9' },
];

// =============================================================
// Helpers
// =============================================================

/** Flat lookup: find a question object by id across all domains */
export function findQuestion(questionId) {
  for (const domain of domains) {
    for (const q of domain.questions) {
      if (q.id === questionId) return q;
    }
  }
  return null;
}

/** DESC max score for a single domain */
export function getDescMaxForDomain(domainId) {
  const domain = domains.find((d) => d.id === domainId);
  if (!domain) return 0;
  let max = 0;
  for (const q of domain.questions) {
    if (q.type === 'multiple_choice') {
      max += Math.max(...q.options.map((o) => o.score));
    }
  }
  return max;
}

/** DESC total max across all domains */
export function getDescTotalMax() {
  return domains.reduce((sum, d) => sum + getDescMaxForDomain(d.id), 0);
}

/** CCS total max = number of CCS domains × 3 */
export function getCCSTotalMax() {
  return ccsDomains.length * 3; // 21
}
