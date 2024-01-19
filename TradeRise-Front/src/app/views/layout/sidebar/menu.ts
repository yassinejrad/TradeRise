import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [
  {
    label: 'Main',
    isTitle: true
  },
  {
    label: 'Dashboard',
    icon: 'home',
    link: '/dashboard'
  },
  {
    label: 'Stocks',
    isTitle: true
  },
  {
    label: 'Stocks',
    icon: 'bar-chart-2',
    link: '/stocksuser'
  },
  {
    label: 'Reclamation',
    isTitle: true
  },
  {
    label: 'Reclamation',
    icon: 'frown',
    link: '/Reclamtionuser'
  },{
    label: 'consultation',
    isTitle: true
  },
  {
    label: 'consultation',
    icon: 'calendar',
    link: '/Consultationuser'
  },
  {
    label: 'Prises',
    isTitle: true
  },
  {
    label: 'Prises',
    icon: 'award',
    link: '/priseuser'
  },
  {
    label: 'Forum',
    isTitle: true
  },
  {
    label: 'Forum',
    icon: 'navigation',
    link: '/commentaire'
  },
];
