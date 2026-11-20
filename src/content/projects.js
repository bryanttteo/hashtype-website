// Projects page: completed projects first, then typical projects by industry.
// Mirrors content/projects.md. Industry entries come from industries.js.

import { industries } from './industries.js'

export const projects = {
  meta: {
    title: 'Projects | HashType',
    description:
      'Completed work and typical projects across logistics, manufacturing, marine, industrial services, construction and F&B. Find your project.',
  },
  intro: {
    heading: 'Find your project',
    body: "Every business has its own bottlenecks. Here are the problems we hear most, and the solutions we'd start with.",
  },
  illustrationLabel: 'Illustration',
  problemsLabel: 'Problems',
  startLabel: "Where we'd start",
  groups: {
    completed: 'Completed projects',
    industry: 'Typical projects by industry',
  },
  items: [
    {
      id: 'wildlife-detection',
      group: 'completed',
      title: 'Wildlife Detection & Alerts',
      badge: 'Completed · 2026 · Public sector',
      problemsLabel: 'The problem',
      startLabel: 'What we delivered',
      sketch: {
        type: 'wildlife',
        title: 'Detection feed',
        status: 'Zone A',
        monkey: 'Monkey',
        boar: 'Wild boar',
        deterrent: 'Deterrent activated',
        alerted: 'Team alerted',
        toast: 'Monkey detected. Deterrent activated and team alerted.',
      },
      problems: [
        'Wildlife such as monkeys, wild boars, free-roaming chickens and snakes strayed into areas used by people.',
        'Staff only learned about incidents after the fact.',
        'Responses were slow and hard to coordinate.',
      ],
      start: [
        { solution: 'Vision AI', detail: 'cameras that detect and identify animals as they appear.' },
        {
          solution: 'Agentic Automation',
          detail:
            'each detection triggers the right response automatically, from on-site deterrence to an alert for the responsible team.',
        },
        {
          solution: 'Intelligence via IoT',
          detail: 'on-site deterrent devices, with every event logged for review.',
        },
      ],
      note: 'Our role: orchestration, connecting detections to alerts, deterrence and the response workflow. Delivered for a Singapore public-sector client with specialist vision AI and hardware partners.',
    },
    ...industries.items.map((item) => ({ ...item, group: 'industry' })),
  ],
  closing: industries.closing,
}
