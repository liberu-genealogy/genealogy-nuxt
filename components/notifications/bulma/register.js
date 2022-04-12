import App from '@enso-ui/ui/src/core/app';
import Notification from './components/navbar/Notifications.vue';
import ToastPosition from './components/settings/ToastrPosition.vue';

App.registerNavbarItem('notification', Notification, 300, 'core.notifications.count');
App.registerSettingsItem('toaster-position', ToastPosition, 300);
