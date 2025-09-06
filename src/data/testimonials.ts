export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  comment: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Sarah L.',
    role: 'Patient',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    comment: 'Medixy made it so easy to find a specialist for my son. The booking process was seamless, and the virtual consultation was just as effective as an in-person visit. A game-changer for busy parents!',
  },
  {
    id: 'test-2',
    name: 'Dr. Mark R.',
    role: 'Dermatologist',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    comment: 'As a provider, Medixy has streamlined my practice management significantly. The platform is intuitive, and it has helped me connect with new patients who genuinely need my expertise. The integrated tools are fantastic.',
  },
  {
    id: 'test-3',
    name: 'David Chen',
    role: 'Patient',
    avatar: 'https://randomuser.me/api/portraits/men/46.jpg',
    comment: 'I was hesitant about telehealth, but Medixy exceeded my expectations. The video quality was excellent, and my doctor was attentive and thorough. I saved so much time not having to travel to the clinic.',
  },
  {
    id: 'test-4',
    name: 'Emily White',
    role: 'Patient',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    comment: 'Finding a doctor who accepts my insurance used to be a nightmare. With Medixy, I could filter by my plan and find a great in-network doctor in minutes. So grateful for this platform!',
  },
  {
    id: 'test-5',
    name: 'Dr. Jessica A.',
    role: 'Pediatrician',
    avatar: 'https://randomuser.me/api/portraits/women/50.jpg',
    comment: 'The ability to manage my schedule, communicate with patients securely, and handle billing all in one place has been invaluable. Medixy allows me to focus more on patient care and less on administrative tasks.',
  },
];