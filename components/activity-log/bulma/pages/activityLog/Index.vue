<template>
    <div class="columns is-reverse-mobile">
        <div class="column is-two-thirds">
            <timeline :loading="loading"
                :feed="feed"
                @load-more="fetch()"/>
        </div>
        <filters class="column is-one-third"
            :loading="loading"
            :filters="filters"
            @reload="offset = 0; fetch()"/>
    </div>
</template>

<script>
import Timeline from './components/Timeline.vue';
import Filters from './components/Filters.vue';

export default {
    name: 'Index',

    components: { Timeline, Filters },

    inject: ['errorHandler', 'http', 'route'],

    data: () => ({
        loading: false,
        axiosRequest: null,
        feed: [],
        offset: 0,
        filters: {
            userIds: [],
            roleIds: [],
            interval: {
                min: null,
                max: null,
            },
            events: [],
        },
    }),

    methods: {
        fetch() {
            this.loading = true;

            if (this.axiosRequest) {
                this.axiosRequest.cancel();
            }

            this.axiosRequest = this.http.CancelToken.source();

            this.http.get(this.route('core.activityLogs.index'), {
                params: { offset: this.offset, filters: this.filters },
                cancelToken: this.axiosRequest.token,
            }).then(({ data }) => {
                const length = this.length(data);

                if (this.offset === 0) {
                    this.feed = data;
                } else {
                    this.merge(data);
                }

                this.offset += length;
                this.loading = false;
                this.ready = true;
            }).catch(error => {
                if (this.http.isCancel(error)) {
                    this.axiosRequest = null;
                    return;
                }

                this.errorHandler(error);
            });
        },
        length(feed) {
            return feed.reduce((total, { entries }) => (total += entries.length), 0);
        },
        merge(feed) {
            if (!feed.length) {
                return;
            }

            if (this.feed[this.feed.length - 1].date === feed[0].date) {
                this.feed[this.feed.length - 1].entries.push(...feed.shift().entries);
            }

            this.feed.push(...feed);
        },
    },
};
</script>
