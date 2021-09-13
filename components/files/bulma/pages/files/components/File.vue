<template>
    <div class="box has-background-light raises-on-hover file-box p-3">
        <figure class="image is-32x32 avatar">
            <img class="is-rounded"
                :src="route('core.avatars.show', file.owner.avatar.id)">
        </figure>
        <p class="has-text-centered mb-2">
            <fa :icon="icon"
                size="3x"/>
        </p>
        <h5 class="title is-5 filename has-text-centered"
            v-tooltip="file.name">
            {{ file.name }}
        </h5>
        <p class="has-text-centered"
           v-tooltip="date(file.createdAt)">
            <span class="icon is-small">
                <fa icon="calendar-alt"/>
            </span>
            {{ timeFromNow(file.createdAt) }}
        </p>
        <p class="mt-1 has-text-centered">
            <span class="icon is-small">
                <fa icon="database"/>
            </span>
            {{ size }} KB
        </p>
        <div class="has-text-centered mt-2">
            <div class="details">
                <a class="button is-naked"
                    v-if="file.isShareable && canAccess('core.files.link')"
                    @click.stop="link">
                    <span class="icon">
                        <fa icon="link"/>
                    </span>
                </a>
                <a class="button is-naked"
                    @click.stop="show"
                    v-if="file.isViewable && canAccess('core.files.show')">
                    <span class="icon">
                        <fa icon="eye"/>
                    </span>
                </a>
                <a class="button is-naked"
                    :href="route('core.files.download', file.id)"
                    v-if="file.isViewable && canAccess('core.files.download')">
                    <span class="icon">
                        <fa icon="cloud-download-alt"/>
                    </span>
                </a>
                <confirmation placement="top"
                    @confirm="$emit('delete')"
                    v-if="file.isDestroyable && canAccess('core.files.destroy')">
                    <a class="button is-naked">
                        <span class="icon">
                            <fa icon="trash-alt"/>
                        </span>
                    </a>
                </confirmation>
            </div>
        </div>
        <url :show="temporaryLink !== ''"
            :link="temporaryLink"
            @close="temporaryLink = ''"/>
        <preview :file="preview"
            v-if="preview"
            @close="preview = null"/>
    </div>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core';
import {
    faEye, faCloudDownloadAlt, faTrashAlt, faLink, faCalendarAlt, faDatabase,
} from '@fortawesome/free-solid-svg-icons';
import { VTooltip } from 'v-tooltip';
import Confirmation from '@enso-ui/confirmation/bulma';
import files from '~/mixins/files'
import Url from './Url.vue';
import Preview from './Preview.vue';

library.add(faEye, faCloudDownloadAlt, faTrashAlt, faLink, faCalendarAlt, faDatabase);

export default {
    name: 'File',

    inject: ['canAccess', 'errorHandler', 'route'],

    directives: { tooltip: VTooltip },

    components: { Confirmation, Url, Preview },

    mixins: [files],

    props: {
        file: {
            type: Object,
            required: true,
        },
    },

    data: () => ({
        preview: null,
        temporaryLink: '',
    }),

    computed: {
        size() {
            return this.$numberFormat(this.file.size / 1000);
        },
    },

    methods: {
        link() {
            this.$axios.get(this.route('core.files.link', this.file.id))
                .then(({ data }) => (this.temporaryLink = data.link))
                .catch(this.errorHandler);
        },
        show() {
            if (this.file.mimeType === 'application/pdf') {
                this.preview = this.file;
                return;
            }

            window.open(this.route('core.files.show', this.file.id), '_blank').focus();
        },
        timeFromNow(date) {
            return this.$formatDistance(date);
        },
        date(date) {
            return this.$format(date);
        },
    },
};
</script>

<style lang="scss" scoped>
    .file-box {
        position: relative;
        cursor: pointer;

        .avatar {
            position: absolute;
            top: .6em;
            left: .6em;
        }

        .details {
            display: flex;
            justify-content: center;
        }

        .title.filename {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
    }
</style>
