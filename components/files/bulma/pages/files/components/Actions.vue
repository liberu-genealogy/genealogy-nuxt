<template>
    <div class="is-flex">
        <fade>
            <div class="is-flex"
                v-if="hovering || handling">
                <template v-if="file.isManageable">
                    <a class="button is-small is-naked"
                        @click="makePrivate"
                        v-if="file.isPublic && canAccess('core.files.makePrivate')">
                        <span class="icon is-small">
                            <fa icon="unlock"/>
                        </span>
                    </a>
                    <a class="button is-small is-naked"
                        @click="makePublic"
                        v-else-if="!file.isPublic && canAccess('core.files.makePublic')">
                        <span class="icon is-small">
                            <fa icon="lock"/>
                        </span>
                    </a>
                </template>
                <dropdown v-if="file.isAccessible && canAccess('core.files.link')"
                    ref="dropdown"
                    @hide="handling = false">
                    <a class="button is-small is-naked"
                        @click="handling = true">
                        <span class="icon is-small">
                            <fa icon="link"/>
                        </span>
                    </a>
                    <template #popper>
                        <ul>
                            <li v-for="{ value, label } in enums.temporaryLinkDuration._filter()"
                                :key="value">
                                <button class="button is-small is-fullwidth"
                                    @click="$refs.dropdown.hide(); link(value)">
                                    {{ label }}
                                </button>
                            </li>
                        </ul>
                    </template>
                </dropdown>
                <a class="button is-small is-naked"
                    @click="show"
                    v-if="isViewable">
                    <span class="icon is-small">
                        <fa icon="eye"/>
                    </span>
                </a>
                <a class="button is-small is-naked"
                    :href="route('core.files.download', file.id)"
                    v-if="file.isAccessible && canAccess('core.files.download')">
                    <span class="icon is-small">
                        <fa icon="cloud-download-alt"/>
                    </span>
                </a>
                <confirmation placement="left"
                    @confirm="$emit('delete')"
                    @hide="handling = false"
                    v-if="file.isManageable && canAccess('core.files.destroy')">
                    <a class="button is-small is-naked"
                        @click="handling = true">
                        <span class="icon is-small">
                            <fa icon="trash-alt"/>
                        </span>
                    </a>
                </confirmation>
            </div>
        </fade>
        <a class="button is-small is-naked"
            v-if="canAccess('core.files.favorite')"
            @click="toggleFavorite">
            <span class="icon is-small"
                v-if="file.isFavorite">
                <fa icon="star"/>
            </span>
            <span class="icon is-small"
                v-else>
                <fa :icon="['far', 'star']"/>
            </span>
        </a>
        <clipboard ref="clipboard"/>
        <preview :file="file"
            v-if="preview"
            @close="preview = false"/>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import { FontAwesomeIcon as Fa } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
    faEye, faCloudDownloadAlt, faTrashAlt, faLink, faStar, faLock, faUnlock,
} from '@fortawesome/free-solid-svg-icons';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';
import Confirmation from '@enso-ui/confirmation/bulma';
import Clipboard from '@enso-ui/clipboard';
import { Fade } from '@enso-ui/transitions';
import { EnsoFile, numberFormat } from '@enso-ui/mixins';
import { Dropdown } from 'v-tooltip';
import format from '@enso-ui/ui/src/modules/plugins/date-fns/format';
import Preview from './Preview.vue';

library.add([
    faEye, faCloudDownloadAlt, faTrashAlt, faLink,
    faStar, farStar, faLock, faUnlock,
]);

export default {
    name: 'Actions',

    components: { Fade, Confirmation, Clipboard, Fa, Preview, Dropdown },

    inject: ['canAccess', 'errorHandler', 'http', 'i18n', 'route'],

    props: {
        hovering: {
            type: Boolean,
            required: true,
        },
        file: {
            type: Object,
            required: true,
        },
    },

    emits: ['copy-to-clipboard', 'delete'],

    data: v => ({
        ensoFile: new EnsoFile(v.file),
        message: null,
        preview: false,
        handling: false,
    }),

    computed: {
        ...mapState(['enums']),
        isViewable() {
            return this.file.isAccessible
                && this.ensoFile.isViewable()
                && this.canAccess('core.files.show');
        },
    },

    methods: {
        copyToClipboard({ data: { link } }) {
            this.$refs.clipboard.copy(link);
            this.$emit('copy-to-clipboard', this.i18n('copied'));
        },
        link(seconds) {
            const path = this.route('core.files.link', this.file.id);
            this.http.get(path, { params: { seconds } })
                .then(this.copyToClipboard)
                .catch(this.errorHandler);
        },
        show() {
            if (this.ensoFile.isViewable()) {
                this.preview = true;
            } else {
                const path = this.route('core.files.show', this.file.id);
                window.open(path, '_blank').focus();
            }

        },
        makePrivate() {
            this.http.patch(this.route('core.files.makePrivate', this.file.id))
                .then(({ data: { isPublic } }) => (this.file.isPublic = isPublic))
                .catch(this.errorHandler);
        },
        makePublic() {
            this.http.patch(this.route('core.files.makePublic', this.file.id))
                .then(({ data: { isPublic } }) => (this.file.isPublic = isPublic))
                .catch(this.errorHandler);
        },
        toggleFavorite() {
            this.http.patch(this.route('core.files.favorite', this.file.id))
                .then(({ data: { isFavorite } }) => (this.file.isFavorite = isFavorite))
                .catch(this.errorHandler);
        },
    },
};
</script>