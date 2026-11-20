// Site-wide details. Source: content/contact-details.md and content/brand.md.
// Replace each [PLACEHOLDER] once here; every page reads from this file.
// The site must not go public while any value still starts with "[".

// The email and phone number are stored scrambled so that bots scanning the site's
// code can't harvest them. They are only unscrambled in the browser when needed.
// To change one, reverse the text and base64-encode it, for example in Terminal:
//   echo -n '+65 1234 5678' | rev | base64
const unscramble = (s) => atob(s).split('').reverse().join('')
const EMAIL = 'dGVuLmVweXRoc2FoQHNlaXJpdXFuZQ==' // enquiries@ (shared mailbox)
const PHONE = 'NzU3NyA2NjA5IDU2Kw==' // one number for calls and WhatsApp

export const contact = {
  get emailEnquiries() {
    return unscramble(EMAIL)
  },
  get phone() {
    return unscramble(PHONE)
  },
  location: '', // hidden for now (home office); set e.g. 'Singapore' to show it
  linkedinUrl: 'https://www.linkedin.com/company/hashtype',
  uen: '', // hidden until registered; set e.g. '2026xxxxxK' to show it in the footer
}

// If the domain changes, also update public/sitemap.xml, public/robots.txt and the og: tags in index.html.
export const siteUrl = 'https://hashtype.net'

export const brand = {
  name: 'HashType',
  // Shown beside the logo in the header and footer.
  wordmark: 'HashType Technologies',
  legalName: 'HashType Technologies Pte Ltd',
  description:
    'HashType helps businesses run leaner with AI-first automation, IoT and vision AI.',
  logoAlt: 'HashType logo',
}

// Official grant pages, linked wherever grants are mentioned.
export const grantLinks = [
  { label: 'EDGE Grant — Enterprise Singapore', href: 'https://www.enterprisesg.gov.sg/financial-support/edge-grant' },
  { label: 'CTC Grant — NTUC e2i', href: 'https://www.e2i.com.sg/employers/ntuc-ctc-grant/' },
]

// Labels for contact links, the floating WhatsApp button and back-to-top.
export const contactUi = {
  email: 'Email',
  call: 'Call',
  whatsapp: 'WhatsApp',
  linkedin: 'LinkedIn',
  showNumber: 'Show number',
  whatsappFloat: 'WhatsApp us',
  whatsappMessage: "Hi HashType, I'd like to know more about ",
  backToTop: 'Back to top',
}

export const nav = [
  { label: 'Home', to: '/' },
  { label: 'Solutions', to: '/solutions' },
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
export const whatsappHref = (number, text = '') =>
  `https://wa.me/${number.replace(/\D/g, '')}${text ? `?text=${encodeURIComponent(text)}` : ''}`

// Open a link built only at the moment of the click (keeps numbers out of the page).
export const openLink = (url, newTab = false) => {
  if (newTab) window.open(url, '_blank', 'noopener,noreferrer')
  else window.location.href = url
}

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
