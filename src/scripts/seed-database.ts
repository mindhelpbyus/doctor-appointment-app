import { admins } from '../data/admins';
import { agencies } from '../data/agencies';
import { agencyUsers } from '../data/agencyUsers';
import { appointments } from '../data/appointments';
import { billing } from '../data/billing';
import { conversations, messages } from '../data/chat';
import { doctors } from '../data/doctors';
import { insuranceProviders } from '../data/insuranceProviders';
import { journalEntries } from '../data/journal';
import { moods } from '../data/moods';
import { patients } from '../data/patients';
import { paymentMethods } from '../data/paymentMethods';
import { promotions } from '../data/promotions';
import { reports } from '../data/reports';
import { reviews } from '../data/reviews';
import { specialties } from '../data/specialties';
import { testimonials } from '../data/testimonials';
import { user_growth_stats } from '../data/user_growth_stats';
import { users } from '../data/users';
import { visitSummaries } from '../data/visitSummaries';
import { LocalStorage } from 'node-localstorage';

global.localStorage = new LocalStorage('./scratch');

const seedDatabase = () => {
  const data = {
    admins,
    agencies,
    agencyUsers,
    appointments,
    billing,
    conversations,
    messages,
    doctors,
    insuranceProviders,
    journalEntries,
    moods,
    patients,
    paymentMethods,
    promotions,
    reports,
    reviews,
    specialties,
    testimonials,
    user_growth_stats,
    users,
    visitSummaries,
  };

  Object.entries(data).forEach(([key, value]) => {
    localStorage.setItem(key, JSON.stringify(value));
  });

  console.log('Database seeded successfully!');
};

seedDatabase();
