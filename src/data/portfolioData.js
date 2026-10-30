/* ==================================================================
   PORTFOLIO CONTENT
   ------------------------------------------------------------------
   Every word and image on the website comes from this file.
   Edit the text here; the components update automatically.

   To use real photographs:
   1. Put the photo in src/assets/images/  (e.g. portrait.jpg)
   2. Change the matching import line below, e.g.
        import portrait from '../assets/images/portrait.jpg';
================================================================== */

import portrait from '../assets/images/Rani the quuen Img.jpeg';
import aboutImage from '../assets/images/palm-leaf-placeholder.svg';
import certificatePlaceholder from '../assets/images/certificate-placeholder.svg';
import eventPlaceholder from '../assets/images/event-placeholder.svg';

/* ---------- Basic profile ---------- */
export const profile = {
  name: 'E. Jansi Rani',
  nameTamil: 'ஈ. ஜான்சி ராணி',
  qualifications: 'M.A., B.Ed.',
  designation: 'PG Assistant in Tamil',
  school: 'Breeks Memorial Anglo-Indian Higher Secondary School',
  schoolShort: 'Breeks Memorial School',
  town: 'Ooty',
  location: 'Ooty, The Nilgiris, Tamil Nadu',
  intro:
    'An enthusiastic and dedicated Tamil educator with over 14 years of teaching experience, committed to academic excellence, language development, and inspiring students through the richness of Tamil literature and culture.',
  portrait,
  portraitAlt: 'Portrait of E. Jansi Rani',
  // The PDF lives in /public/cv/. Replace the file to update the CV.
  cvUrl: '/cv/E-Jansi-Rani-CV.pdf',
  cvFileName: 'E-Jansi-Rani-CV.pdf',
};

/* ---------- Navigation (order = order on the page) ---------- */
export const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'education', label: 'Education' },
  { id: 'experience', label: 'Experience' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'results', label: 'Results' },
  { id: 'interests', label: 'Interests' },
  { id: 'contact', label: 'Contact' },
];

/* ---------- About ---------- */
export const about = {
  image: aboutImage,
  imageAlt: 'Palm-leaf manuscript, the traditional form of Tamil literature',
  paragraphs: [
    'I am a postgraduate Tamil teacher with more than fourteen years in the classroom, now serving as PG Assistant in Tamil at Breeks Memorial Anglo-Indian Higher Secondary School, Ooty. My career has taken me through five schools in the Nilgiris: matriculation, government, public and Anglo-Indian institutions, each with its own students and its own way of learning.',
    'Tamil is a living language, and I teach it that way. Grammar and prosody matter, but so do the poems, stories and debates that make a student want to read, write and speak well. My aim is a classroom where every student reads with understanding, writes with confidence and stands up to speak without fear.',
    'Results matter to me because they open doors for students. My Tamil classes have recorded a 100% pass rate for the past two consecutive years, with a highest score of 99 out of 100. Outside the classroom I have coordinated the Junior Red Cross, compered school ceremonies and spoken on All India Radio’s Pattimandram.',
  ],
  // Thirukkural 391, a fitting statement of a teacher’s philosophy
  quote: {
    tamil: ['கற்க கசடறக் கற்பவை கற்றபின்', 'நிற்க அதற்குத் தக'],
    translation: 'Learn thoroughly what is worth learning, and then live by what you have learned.',
    source: 'Thirukkural 391',
  },
};

/* ---------- Personal details ----------
   Phone numbers, e-mail and the full residential address are
   deliberately NOT listed here. Set showPersonalDetails to false
   to hide this whole block from the website.                     */
export const showPersonalDetails = true;

export const personalDetails = [
  { label: 'Full name', value: 'E. Jansi Rani' },
  { label: 'Father’s name', value: 'C. Easwaran' },
  { label: 'Date of birth', value: '06.05.1989' },
  { label: 'Marital status', value: 'Married' },
  { label: 'Nationality', value: 'Indian' },
  { label: 'Mother tongue', value: 'Tamil' },
  { label: 'Location', value: 'Ooty, The Nilgiris, Tamil Nadu' },
];

/* ---------- Education (oldest first) ---------- */
export const education = [
  { year: '2004', title: 'SSLC', institution: 'State Board', marks: '81%' },
  { year: '2006', title: 'HSC', institution: 'State Board', marks: '67%' },
  { year: '2012', title: 'B.A. Tamil', institution: 'Annamalai University', marks: '53%' },
  { year: '2013', title: 'B.Ed. Tamil', institution: 'Tamil Nadu Teachers University', marks: '78%' },
  { year: '2015', title: 'M.A. Tamil', institution: 'Annamalai University', marks: '58%' },
];

/* ---------- Experience (oldest first) ----------
   months is used to calculate total experience automatically. */
export const experience = [
  {
    school: 'Mahatma Gandhi Matriculation School',
    place: 'The Nilgiris',
    role: 'Tamil Teacher',
    duration: '2 years',
    months: 24,
  },
  {
    school: 'GEMS Kendhorai',
    place: 'The Nilgiris',
    role: 'Tamil Teacher',
    duration: '1 year',
    months: 12,
  },
  {
    school: 'Government Higher Secondary School',
    place: 'Nanjanad',
    role: 'Tamil Teacher',
    duration: '1 year 3 months',
    months: 15,
  },
  {
    school: 'RGM Valley View Public Matric School',
    place: 'The Nilgiris',
    role: 'Tamil Teacher',
    duration: '3 years',
    months: 36,
  },
  {
    school: 'Breeks Memorial Anglo-Indian Higher Secondary School',
    place: 'Ooty',
    role: 'PG Assistant in Tamil',
    duration: '7 years',
    months: 84,
    current: true,
  },
];

/* ---------- Results (animated counters) ---------- */
export const results = [
  {
    value: 100,
    suffix: '%',
    label: 'Subject pass percentage',
    detail: 'Every student passed in Tamil, two consecutive years',
  },
  {
    value: 99,
    suffix: '/100',
    label: 'Highest student score',
    detail: 'Top mark achieved by a student in Tamil',
  },
  {
    value: 14,
    suffix: '+',
    label: 'Years of teaching',
    detail: 'Fourteen years and three months in the classroom',
  },
  {
    value: 5,
    suffix: '',
    label: 'Educational institutions',
    detail: 'Matriculation, government, public and Anglo-Indian schools',
  },
];

/* ---------- Awards ----------
   icon must be one of: trophy, award, medal, heart, mic, radio */
export const awards = [
  { title: 'Best Teacher Award', by: 'UIT', year: '2025', icon: 'trophy', featured: true },
  { title: 'Best Teacher Award', by: 'RGM Valley View Public School, Ketti', icon: 'award' },
  { title: 'National Builders Award', by: 'Rotary Club, Ootacamund', icon: 'medal' },
  {
    title: 'JRC Coordinator Award',
    by: 'Presented by the District Collector, The Nilgiris',
    icon: 'heart',
  },
  {
    title: 'Certificate of Appreciation as Compere',
    by: 'Republic Day celebrations',
    year: '2024',
    icon: 'mic',
  },
  {
    title: 'Speaker on All India Radio',
    by: 'Pattimandram, the Tamil debate programme',
    icon: 'radio',
  },
];

/* ---------- Certificate & photo gallery ----------
   Replace each image with a scan or photograph when available. */
export const gallery = [
  {
    image: certificatePlaceholder,
    caption: 'Best Teacher Award, UIT (2025)',
    alt: 'Best Teacher Award certificate from UIT, 2025',
  },
  {
    image: eventPlaceholder,
    caption: 'JRC Coordinator Award presented by the District Collector',
    alt: 'Receiving the JRC Coordinator Award from the Nilgiris District Collector',
  },
  {
    image: certificatePlaceholder,
    caption: 'National Builders Award, Rotary Club, Ootacamund',
    alt: 'National Builders Award certificate from the Rotary Club, Ootacamund',
  },
  {
    image: eventPlaceholder,
    caption: 'Compering the Republic Day celebrations, 2024',
    alt: 'Compering the Republic Day celebrations in 2024',
  },
  {
    image: certificatePlaceholder,
    caption: 'Best Teacher Award, RGM Valley View Public School',
    alt: 'Best Teacher Award certificate from RGM Valley View Public School, Ketti',
  },
  {
    image: eventPlaceholder,
    caption: 'Pattimandram on All India Radio',
    alt: 'Speaking in a Pattimandram debate on All India Radio',
  },
];

/* ---------- Areas of interest ----------
   icon must be one of: scroll, leaf, mic */
export const interests = [
  {
    title: 'History of Tamil Literature',
    tamil: 'இலக்கிய வரலாறு',
    icon: 'scroll',
    text: 'Following Tamil writing from Sangam poetry through the great epics and devotional verse to modern prose, and bringing that long story into the classroom.',
  },
  {
    title: 'Study of Ancient Tamil Medicines',
    tamil: 'பண்டைத் தமிழ் மருத்துவம்',
    icon: 'leaf',
    text: 'Reading the traditional Tamil texts on herbs and healing, and the knowledge of plants and everyday wellbeing they have carried for generations.',
  },
  {
    title: 'Public Speaking',
    tamil: 'பேச்சுக்கலை',
    icon: 'mic',
    text: 'Arguing a side in Pattimandram debates, including on All India Radio, and compering school ceremonies such as the Republic Day celebrations.',
  },
];

/* ---------- Contact ----------
   Leave email / phone empty ('') to keep them private.
   formEndpoint: paste a Formspree (or similar) URL to make the
   contact form deliver messages, e.g. 'https://formspree.io/f/abcdwxyz'.
   Without it, the form opens the visitor's e-mail app (if email is set)
   or explains that online messages are not connected yet.           */
export const contact = {
  email: '',
  phone: '',
  formEndpoint: 'https://formspree.io/f/xyeeddja',
  school: 'Breeks Memorial Anglo-Indian Higher Secondary School, Ooty',
  location: 'Ooty, The Nilgiris, Tamil Nadu',
  hiddenNote: 'Shared on request',
};
