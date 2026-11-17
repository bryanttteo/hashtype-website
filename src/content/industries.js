// Verbatim transcription of content/industries.md. Edit the .md first, then mirror it here.

export const industries = {
  meta: {
    title: 'Industries We Serve | HashType',
    description:
      'AI, IoT and vision AI for logistics, manufacturing, offshore & marine, industrial services, construction and F&B. Find your industry.',
  },
  intro: {
    heading: 'Find your industry',
    body: "Every industry has its own bottlenecks. Here are the problems we hear most, and the solutions we'd start with.",
  },
  problemsLabel: 'Problems',
  startLabel: "Where we'd start",
  items: [
    {
      id: 'supply-chain-logistics',
      title: 'Supply Chain & Logistics',
      image: 'industry-logistics.jpg',
      problems: [
        'Stock and container movements are tracked by hand, so errors surface late.',
        'Status updates mean chasing people across email and chat.',
        'Yard and warehouse activity is hard to see in real time.',
      ],
      start: [
        { solution: 'Vision AI', detail: 'camera-based tracking of containers, vehicles and goods.' },
        { solution: 'Intelligence via IoT', detail: 'live location and condition data from the floor.' },
        {
          solution: 'Agentic Automation',
          detail: 'AI agents that gather status updates and notify the right people.',
        },
      ],
    },
    {
      id: 'manufacturing',
      title: 'Manufacturing',
      image: 'industry-manufacturing.jpg',
      problems: [
        'Equipment issues are found after they stop the line.',
        'Quality checks rely on manual inspection.',
        'Production data sits in spreadsheets no one trusts.',
      ],
      start: [
        { solution: 'Intelligence via IoT', detail: 'machine monitoring with alerts before breakdowns.' },
        { solution: 'Vision AI', detail: 'automated visual inspection.' },
        {
          solution: 'Bespoke Business Applications',
          detail: 'a production system built around your line.',
        },
      ],
    },
    {
      id: 'offshore-marine',
      title: 'Offshore & Marine',
      image: 'industry-marine.jpg',
      problems: [
        'Inspection findings and actions are scattered across reports and files.',
        'Integrity status is hard to show to owners and auditors.',
        'Remote assets are difficult to monitor between visits.',
      ],
      start: [
        {
          solution: 'Bespoke Business Applications',
          detail: 'including our Asset Integrity Management (AIM) application.',
        },
        { solution: 'Intelligence via IoT', detail: 'remote monitoring of equipment and conditions.' },
      ],
    },
    {
      id: 'industrial-services',
      title: 'Industrial Services',
      image: 'industry-industrial-services.jpg',
      problems: [
        'Job sheets, checklists and reports are still on paper.',
        'Office staff re-key field data into other systems.',
        "Scheduling and follow-ups depend on a few people's memory.",
      ],
      start: [
        {
          solution: 'Digital Enablement',
          detail: 'field forms and reports on connected digital workflows.',
        },
        {
          solution: 'Agentic Automation',
          detail: 'AI agents that handle scheduling, reminders and follow-ups.',
        },
      ],
    },
    {
      id: 'real-estate-construction',
      title: 'Real Estate & Construction',
      image: 'industry-construction.jpg',
      problems: [
        'Site safety relies on spot checks.',
        "Building conditions such as air quality and energy use aren't visible until someone complains.",
        'Site records live in paper forms and photos on phones.',
      ],
      start: [
        { solution: 'Vision AI', detail: 'camera-based safety monitoring.' },
        { solution: 'Intelligence via IoT', detail: 'environment and building sensors with alerts.' },
        { solution: 'Digital Enablement', detail: 'site records on one connected system.' },
      ],
    },
    {
      id: 'retail-fnb-hospitality',
      title: 'Retail, F&B & Hospitality',
      image: 'industry-fnb.jpg',
      problems: [
        'Staff spend hours on ordering, rostering and admin.',
        'Fridge and storage temperatures are logged by hand.',
        'Customer enquiries pile up outside opening hours.',
      ],
      start: [
        { solution: 'Agentic Automation', detail: 'AI agents for orders, enquiries and admin.' },
        {
          solution: 'Intelligence via IoT',
          detail: 'automatic temperature and equipment monitoring.',
        },
        { solution: 'Digital Enablement', detail: 'checklists and logs moved off paper.' },
      ],
    },
  ],
  closing: {
    heading: 'See it on your own site',
    body: "We'll visit, look at how the work runs today, and show you where AI fits.",
    primary: { label: 'Book a site survey', to: '/contact' },
  },
}
