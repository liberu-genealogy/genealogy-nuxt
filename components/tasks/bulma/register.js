import App from '@enso-ui/ui/src/core/app';
import Tasks from './components/navbar/Tasks.vue';

App.registerNavbarItem('tasks', Tasks, 150, 'tasks.count');
