// Verbatim transcription of content/projects.md. Edit the .md first, then mirror it here.
//
// To add a project: copy an entry in `items`, fill it in, and put it FIRST (newest first).
// Set `publish: true` only when the client (or NDA) allows it, every result is verified
// and every partner is credited. Unpublished entries are not rendered. If nothing is
// published, the page shows `emptyState` instead.

export const projects = {
  meta: {
    title: 'Projects | HashType',
    description:
      'Completed HashType projects in AI, vision AI, IoT and automation: the problem, what we delivered, and who we delivered it with.',
  },
  intro: {
    heading: 'Projects',
    body: "Work we've delivered, what it solved, and who we delivered it with.",
  },
  labels: {
    client: 'Client',
    sector: 'Sector',
    problem: 'The problem',
    delivered: 'What was delivered',
    role: "HashType's role",
    partners: 'Delivered with',
    result: 'Result',
    solutions: 'Solutions used',
  },
  items: [
    {
      id: 'wildlife-detection',
      publish: true,
      title: 'Wildlife detection and alerts with vision AI',
      status: 'Completed, 2026',
      client: 'A Singapore public-sector client',
      sector: 'Public sector · Wildlife management',
      problem:
        'Wildlife such as monkeys, wild boars, free-roaming chickens and snakes were straying into areas used by people. Staff only learned about incidents after the fact, so responses were slow and hard to coordinate.',
      delivered:
        'Cameras with vision AI that detect and identify animals as they appear. Each detection triggers the right response automatically, from on-site deterrence to alerts for the responsible team, with every event logged for review.',
      role: 'Orchestration. We connected the vision AI detections to alerts, deterrence actions and the response workflow, so the right action happens without someone watching the screens.',
      partners: 'Specialist vision AI and hardware partners.',
      result: null,
      testimonial: null,
      solutions: ['Vision AI', 'Intelligence via IoT', 'Agentic Automation'],
      image: null,
    },
  ],
  emptyState: {
    heading: 'Our first projects are being written up',
    body: "We publish projects once our clients agree. In the meantime, we're happy to walk you through relevant work on a call.",
  },
  closing: {
    heading: 'Have a project in mind?',
    body: "Tell us about it. We'll tell you honestly whether AI is the right fix.",
    primary: { label: 'Talk to us about your project', to: '/contact' },
  },
}
