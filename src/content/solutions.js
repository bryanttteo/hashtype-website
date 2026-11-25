// Verbatim transcription of content/solutions.md. Edit the .md first, then mirror it here.

export const solutions = {
  meta: {
    title: 'Solutions & Services | HashType',
    description:
      'Bespoke apps, digital workflows, IoT, vision AI and AI agents, plus consultancy, workflow automation and grant support. Find the fit for your problem.',
  },
  illustrationLabel: 'Illustration',
  intro: {
    heading: 'Match your problem to a solution',
    body: "Each solution starts with the outcome you need. Pick the one that sounds like your problem, or book a demo and we'll work it out with you.",
  },
  solutions: {
    heading: 'Solutions',
    items: [
      {
        id: 'bespoke',
        sketch: {
          type: 'app',
          title: 'Jobs',
          status: 'This week',
          jobs: ['Pump service', 'Panel upgrade', 'Site survey', 'Filter replacement'],
          states: { new: 'New', progress: 'In progress', done: 'Done' },
          toast: 'Suggested: assign to Team B',
        },
        title: 'Bespoke Business Applications',
        outcome:
          'Software that fits how your business actually runs, instead of forcing your team to work around an off-the-shelf tool.',
        how: 'We map your workflow, then build a custom system around it, with AI built in where it saves effort.',
      },
      {
        id: 'digital-enablement',
        sketch: {
          type: 'forms',
          title: 'Daily inspection',
          status: 'Tablet',
          paper: 'Paper',
          steps: ['Fire exits clear', 'Extinguishers checked', 'First-aid kit stocked'],
          signature: 'Signed',
          toast: 'Synced to the office',
        },
        title: 'Digital Enablement',
        outcome:
          'No more chasing paper forms and spreadsheet versions. Everyone works from the same live information.',
        how: 'We move manual, paper and spreadsheet processes onto connected digital workflows.',
      },
      {
        id: 'iot',
        sketch: {
          type: 'sensors',
          title: 'Pump room',
          status: 'Live',
          tiles: ['Temperature', 'Vibration', 'Power'],
          normal: 'Normal',
          watch: 'Watch',
          toast: 'Pump 2 vibration rising. Maintenance notified.',
        },
        title: 'Intelligence via IoT',
        outcome:
          "Know what's happening on your equipment and sites in real time, and get alerted before small problems become costly ones.",
        how: 'Sensors capture the data; we turn it into dashboards, alerts and insights.',
      },
      {
        id: 'vision-ai',
        sketch: {
          type: 'inspection',
          title: 'Line camera',
          status: 'Packing line',
          ok: 'OK',
          defect: 'Scratch',
          toast: 'Defect caught before packing',
        },
        title: 'Vision AI',
        outcome: "Cameras that watch for what matters, so people don't have to stare at screens.",
        how: 'Camera-based detection, inspection and monitoring, with alerts when something needs attention.',
      },
      {
        id: 'agentic-automation',
        sketch: {
          type: 'agent',
          title: 'AI agent',
          status: 'Purchase request',
          steps: ['Read supplier email', 'Draft purchase order', 'Check budget'],
          approval: 'Manager approval',
          waiting: 'Waiting',
          approve: 'Approve',
          reject: 'Reject',
          approved: 'Approved',
          final: 'Order sent',
          toast: 'Order sent to supplier',
        },
        title: 'Agentic Automation',
        outcome:
          'Multi-step tasks handled end to end, with your people approving the decisions that need a human.',
        how: 'AI agents work across your tools to complete tasks, and pause for approval where you set it.',
      },
    ],
  },
  applications: {
    heading: 'See it working',
    body: 'Ready foundations we adapt to your operation. Try a live demo of each.',
    demoLabel: 'Open demo',
    items: [
      {
        title: 'Asset Integrity Management (AIM)',
        body: 'For asset owners and service suppliers. Risk, inspections, findings, actions and integrity status in one view.',
        demoUrl: '', // e.g. https://aim.demo.hashtype.net
      },
      {
        title: 'CRM',
        body: 'Lightweight customer and pipeline management, without the bloat.',
        demoUrl: '',
      },
      {
        title: 'Monitoring Platforms',
        body: 'Dashboards for equipment, environmental and operational data.',
        demoUrl: '',
      },
    ],
  },
  services: {
    heading: 'How we work with you',
    items: [
      {
        title: 'AI Consultancy & Analysis',
        body: 'Find where AI creates real value in your business, and get a roadmap to deliver it.',
      },
      {
        title: 'Business Process Analysis',
        body: 'We map your current workflows and pinpoint what to automate first.',
      },
      {
        title: 'Workflow Automation',
        body: 'We design and deploy workflow automations that connect the tools you already use.',
      },
      { title: 'Web Design & SEO', body: 'Websites built to be found.' },
      {
        title: 'Grant Applications',
        body: 'Support with EDGE Grant and NTUC Company Training Committee (CTC) Grant applications to co-fund eligible projects.',
      },
      {
        title: 'Demo or Site Survey',
        body: 'See a solution working, or have us assess your site in person.',
      },
    ],
  },
  closing: {
    heading: 'See it before you commit',
    body: "We'll walk you through the solution that fits your problem.",
    primary: { label: 'Book a demo', to: '/contact' },
  },
}
