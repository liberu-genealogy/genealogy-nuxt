<script>
import { mapMutations } from 'vuex';
import Driver from 'driver.js';
import { ref, computed, useStore, watch } from 'vue';

export default {
    name: 'CoreTutorial',

    inject: ['errorHandler', 'i18n', 'route'],

    props: {
        labels: {
            type: Object,
            default: () => ({
                done: 'Done',
                close: 'Close',
                next: 'Next',
                previous: 'Previous',
            }),
        },
    },

    data: v => ({
        driver: new Driver({
            animate: false,
            doneBtnText: v.i18n(v.labels.done),
            closeBtnText: v.i18n(v.labels.close),
            nextBtnText: v.i18n(v.labels.next),
            prevBtnText: v.i18n(v.labels.previous),
        }),
    }),
    setup() {
        return {
            ...mapMutations('layout/settings', { toggleSettingsBar: 'toggle' }),
        }
        function fetch() {
            this.$axios.get(this.route('system.tutorials.load'), {
                params: { route: this.$route.name },
            }).then(({ data }) => this.start(data))
                .catch(this.errorHandler);
        }
        function start(steps) {
            if (!steps.length) {
                return;
            }

            this.toggleSettingsBar();
            this.driver.defineSteps(this.localise(steps));
            this.driver.start();
        }
        function localise(steps) {
            return steps.map(({ element, popover }) => ({
                element,
                popover: {
                    description: this.i18n(popover.description),
                    position: popover.position,
                    title: this.i18n(popover.title),
                },
            }));
        }
    },
    
    render() {
        return this.$scopedSlots.default({
            itemEvents: {
                click: this.fetch,
            },
        });
    },
};
</script>
