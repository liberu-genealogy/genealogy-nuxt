import { showReportDialog } from '@sentry/browser';
import Router from 'vue-router';

const { isNavigationFailure } = Router;

const routerErrorHandler = error => {
    if (!isNavigationFailure(error)) {
        throw error;
    }
};

const dialog = (vm, eventId) => ({
    eventId,
    title: vm.i18n('It looks like we’re having issues.'),
    subtitle: vm.i18n('Our team has been notified.'),
    subtitle2: vm.i18n('If you’d like to help, tell us what happened below.'),
    labelName: vm.i18n('Name'),
    labelEmail: vm.i18n('Email'),
    labelComments: vm.i18n('What happened?'),
    labelClose: vm.i18n('Close'),
    labelSubmit: vm.i18n('Submit'),
    errorGeneric: vm.i18n('An unknown error occurred while submitting your report. Please try again.'),
    errorFormEntry: vm.i18n('Some fields were invalid. Please correct the errors and try again.'),
});

const toastError = vm => vm.toastr.error(vm.i18n('Something went wrong...'));

const getUserFeedback = vm => vm.$axios.get('api/sentry')
    .then(({ data }) => (data.eventId
        ? showReportDialog(dialog(vm, data.eventId))
        : toastError(vm)));

const redirectToLogin = vm => {
    vm.$store.commit('auth/setIntendedRoute', vm.$route);
    vm.$store.commit('appState', false);
    vm.$store.commit('auth/logout');
    vm.$router.push({ name: 'login' })
        .catch(routerErrorHandler);
};

const report = vm => (vm.$store.state.meta.env === 'production'
    ? getUserFeedback(vm)
    : toastError(vm));

export default {
    methods: {
        errorHandler(error) {
            if (this.$axios.isCancel(error)) {
                return;
            }

            if (!error.response) {
                throw error;
            }

            const { status, data } = error.response;

            switch (status) {
            case 401: case 419:
                redirectToLogin(this);
                break;
            case 409: case 429: case 488:
                this.toastr.warning(this.i18n(data.message));
                break;
            case 403:
                this.$router.push({ name: 'unauthorized' })
                    .catch(routerErrorHandler);
                break;
            case 404:
                this.$router.push({ name: 'notFound' })
                    .catch(routerErrorHandler);
                break;
            case 413:
                this.toastr.warning(this.i18n('Request Entity Too Large'));
                break;
            case 503:
                this.$router.push({ name: 'maintenanceMode' })
                    .catch(routerErrorHandler);
                break;
            default:
                report(this);
                break;
            }
        },
    },
};
