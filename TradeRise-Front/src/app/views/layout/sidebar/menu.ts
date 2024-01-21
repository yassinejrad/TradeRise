import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [
  {
    label: 'Main',
    isTitle: true
  },
  {
    label: 'Tableau de bord',
    icon: 'home',
    link: '/dashboard'
  },
  {
    label: 'Actions',
    isTitle: true
  },
  {
    label: 'Actions',
    icon: 'bar-chart-2',
    link: '/stocksuser'
  },
  {
    label: 'Gestion des risques',
    icon: 'home',
    link: '/riskManagement'
  },
  {
    label: 'Aperçu des actions',
    icon: 'home',
    link: '/stockOverview'
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
    label: 'Consultation',
    isTitle: true
  },
  {
    label: 'Consultation',
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
  {
    label: 'Cours',
    isTitle: true,
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
    label: 'Cours en ligne',
    icon: 'calendar',
    link: '/rendezvous',
  },

];
