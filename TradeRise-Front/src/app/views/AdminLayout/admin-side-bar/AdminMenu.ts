import { MenuItem } from './AdminMenu.model';

export const MENU: MenuItem[] = [
  {
    label: 'Main',
    isTitle: true
  },
  {
    label: 'Dashboard',
    icon: 'home',
    link: 'Dashboard'
  },
  {
    label: 'User Management',
    isTitle: true
  },
  {
    label: 'Users',
    icon: 'user',
    link: 'Users'
  },
  {
    label: 'Roles',
    icon: 'user',
    link: 'Roles'
  },
  {
    label: 'Reclamation Management',
    isTitle: true
  },
  {
    label: 'Reclamation',
    icon: 'frown',
    link: 'Reclamtionadmin'
  },
  {
    label: 'Prises',
    isTitle: true
  },
  {
    label: 'Prises',
    icon: 'award',
    link: 'priseadmin'
  },
];
