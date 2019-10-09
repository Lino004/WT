export const defaultMenuType = 'menu-default' // 'menu-default', 'menu-sub-hidden', 'menu-hidden';
export const defaultStartPath = '/app/dashboards/default'
export const searchPath = '/app/pages/search'
export const buyUrl = 'https://1.envato.market/nEyZa'

export const subHiddenBreakpoint = 1440
export const menuHiddenBreakpoint = 768

export const defaultLocale = 'en'
export const defaultDirection = 'ltr'
export const localeOptions = [
  { id: 'en', name: 'English LTR', direction: 'ltr' },
  { id: 'es', name: 'Español', direction: 'ltr' },
  { id: 'enrtl', name: 'English RTL', direction: 'rtl' },
  { id: 'fr', name: 'Français', direction: 'rtl' }
]

export const firebaseConfig = {
  apiKey: 'AIzaSyBSJ2KSU9rMlsTK9SeCZAc3VLA9XD6Qao4',
  authDomain: 'dash-wt.firebaseapp.com',
  databaseURL: 'https://dash-wt.firebaseio.com',
  projectId: 'dash-wt',
  storageBucket: '',
  messagingSenderId: '825180072389',
  appId: '1:825180072389:web:6d013fdae70cfe0bf0c3ac'
}

export const apiUrl = 'https://api.coloredstrategies.com'

export const currentUser = {
  id: 1,
  title: 'Lino Pro',
  img: '/assets/img/default-user.png',
  date: 'Last seen today 15:24'
}

export const defaultColor = 'light.blue'
export const colors = [
  'light.purple',
  'dark.purple',
  'light.blue',
  'dark.blue',
  'light.green',
  'dark.green',
  'light.orange',
  'dark.orange',
  'light.red',
  'dark.red'
]

export const baseRef = {
  billet: 'billets',
  client: 'clients',
  user: 'users'
}

/* export const baseRef = {
  billet: 'billetsText',
  client: 'clientsText',
  user: 'users'
} */
