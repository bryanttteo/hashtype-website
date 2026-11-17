// Site-wide details. Source: content/contact-details.md and content/brand.md.
// Replace each [PLACEHOLDER] once here; every page reads from this file.
// The site must not go public while any value still starts with "[".

export const contact = {
  emailEnquiries: '[EMAIL_ENQUIRIES]',
  // One number for calls and WhatsApp.
  phone: '+65 9066 7757',
  location: '[ADDRESS]', // or 'Singapore'
  linkedinUrl: '[LINKEDIN_URL]',
  uen: '[UEN]',
}

// Also update public/sitemap.xml, public/robots.txt and the og: tags in index.html.
export const siteUrl = 'https://[DOMAIN]'

export const brand = {
  name: 'HashType',
  legalName: 'HashType Technologies Pte Ltd',
  description:
    'HashType helps businesses run leaner with AI-first automation, IoT and vision AI.',
  logoAlt: 'HashType logo',
}

export const nav = [
  { label: 'Home', to: '/' },
  { label: 'Solutions', to: '/solutions' },
  { label: 'Industries', to: '/industries' },
  { label: 'Projects', to: '/projects' },
  { label: 'Contact', to: '/contact' },
]

export const emailRequests = {
  subjects: {
    discovery: 'Discovery call request — HashType website',
    demo: 'Demo request — HashType website',
    survey: 'Site survey request — HashType website',
  },
  body: `Hi HashType team,

Company:
Industry:
What we'd like to improve:
Best time to reach me:

Thanks,`,
}

export const isPlaceholder = (value) =>
  typeof value === 'string' && value.trim().startsWith('[')

export const telHref = (number) => `tel:${number.replace(/[^\d+]/g, '')}`
export const whatsappHref = (number) => `https://wa.me/${number.replace(/\D/g, '')}`

export const mailtoFor = (subject) =>
  `mailto:${contact.emailEnquiries}?subject=${encodeURIComponent(
    subject,
  )}&body=${encodeURIComponent(emailRequests.body)}`

// Verbatim transcription of content/not-found.md.
export const notFound = {
  title: 'Page not found | HashType',
  eyebrow: '404',
  heading: 'Page not found',
  body: "The page you're looking for doesn't exist or has moved.",
  button: { label: 'Back to home', to: '/' },
}
