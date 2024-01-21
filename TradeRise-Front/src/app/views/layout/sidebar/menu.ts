import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [
  {
    label: 'Main',
    isTitle: true,
  },
  {
    label: 'Dashboard',
    icon: 'home',
    link: '/dashboard',
  },
  {
    label: 'Risk Management',
    icon: 'home',
  },
  {
    label: 'Cours',
    icon: 'book',
    link: '/cours',
  },
  {
    label: 'Certif',
    icon: 'plus',
    link: '/certif',
  },
  {
    label: 'Rendez-vous',
    icon: 'calendar',
    link: '/rendezvous',
  },
];
