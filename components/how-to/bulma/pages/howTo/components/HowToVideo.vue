<template>
    <card>
        <card-header>
            <template v-slot:title>
                <span class="icon is-small mr-1">
                    <fa icon="video"/>
                </span>
                {{ video.name }}
            </template>
            <template v-slot:controls>
                <card-control v-tooltip="video.description">
                    <span class="icon">
                        <fa icon="info-circle"/>
                    </span>
                </card-control>
                <card-control v-if="!video.poster && canAccess('howTo.posters.store')">
                    <uploader class="pt-1"
                        :url="route('howTo.posters.store')"
                        :params="{ videoId: video.id }"
                        file-key="poster"
                        @upload-successful="video.poster = $event">
                        <template v-slot:control="{ controlEvents }">
                            <span class="icon"
                                v-on="controlEvents">
                                <fa :icon="['far', 'image']"/>
                            </span>
                        </template>
                    </uploader>
                </card-control>
                <card-control v-if="canAccess('howTo.videos.update')">
                    <span class="icon"
                        @click="$emit('edit')">
                        <fa :icon="['far', 'edit']"/>
                    </span>
                </card-control>
                <card-control v-if="canAccess('howTo.videos.update')">
                    <span class="icon"
                        @click="tagging = !tagging; $emit(tagging ? 'start-tagging' : 'stop-tagging')">
                        <fa :icon="tagging ? 'check' : 'tags'"/>
                    </span>
                </card-control>
                <card-control v-if="canAccess('howTo.posters.destroy') && video.poster">
                    <confirmation @confirm="destroyPoster"
                        v-tooltip="i18n('Remove poster')">
                        <span class="icon is-small">
                            <fa :icon="['far', 'trash-alt']"/>
                        </span>
                    </confirmation>
                </card-control>
                <card-control v-else-if="canAccess('howTo.videos.destroy')">
                    <confirmation @confirm="destroyVideo"
                        v-tooltip="i18n('Delete video')">
                        <span class="icon is-small">
                            <fa :icon="['far', 'trash-alt']"/>
                        </span>
                    </confirmation>
                </card-control>
                <card-collapse/>
            </template>
        </card-header>
        <card-content class="is-paddingless">
            <video-player :options="options()"
                class="vjs-custom-skin"
                playsinline/>
        </card-content>
        <card-footer>
            <card-footer-item>
                <div class="field is-grouped is-grouped-multiline"
                    v-if="video.tagList.length">
                    <div class="control"
                        v-for="(tag, index) in tagList"
                        :key="index">
                        <div class="tags is-bold has-addons">
                            <span class="tag">
                                {{ tag.name }}
                            </span>
                            <a class="tag is-delete"
                                 @click="removeTag(tag)"
                                v-if="canAccess('howTo.videos.update') && tagging"/>
                        </div>
                    </div>
                </div>
                <span class="tag"
                    v-else>
                    {{ i18n('untagged') }}
                </span>
            </card-footer-item>
        </card-footer>
    </card>
</template>

<script>
import { VTooltip } from 'v-tooltip';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faInfo, faTags, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { faTrashAlt, faEdit, faImage } from '@fortawesome/free-regular-svg-icons';
import { videoPlayer } from 'vue-video-player';
import 'vue-video-player/src/custom-theme.css';
import {
    Card, CardHeader, CardCollapse, CardControl, CardContent,
    CardFooter, CardFooterItem,
} from '@enso-ui/card/bulma';
import Confirmation from '@enso-ui/confirmation/bulma';
import { Uploader } from '@enso-ui/uploader';
import 'video.js/dist/video-js.css';

library.add([faTrashAlt, faInfo, faTags, faEdit, faImage, faInfoCircle]);

export default {
    name: 'HowToVideo',

    inject: ['canAccess', 'errorHandler', 'i18n', 'route', 'toastr'],

    directives: { tooltip: VTooltip },

    components: {
        Card,
        CardControl,
        Confirmation,
        videoPlayer,
        CardHeader,
        CardCollapse,
        CardFooter,
        CardFooterItem,
        CardContent,
        Uploader,
    },

    props: {
        video: {
            type: Object,
            required: true,
        },
        tags: {
            type: Array,
            required: true,
        },
    },

    data: () => ({
        tagging: false,
    }),

    computed: {
        tagList() {
            return this.tags.filter(({ id }) => this.video.tagList.includes(id));
        },
    },

    methods: {
        options() {
            return {
                muted: false,
                language: 'en',
                playbackRates: [0.7, 1.0, 1.5, 2.0],
                aspectRatio: '16:9',
                sources: [{
                    type: 'video/mp4',
                    src: this.route('howTo.videos.show', this.video.id),
                }],
                poster: this.video.poster
                    ? this.route('howTo.posters.show', this.video.poster.id)
                    : '',
            };
        },
        destroyPoster() {
            this.$axios.delete(this.route('howTo.posters.destroy', this.video.poster.id))
                .then(({ data }) => {
                    this.toastr.success(data.message);
                    this.video.poster = null;
                }).catch(this.errorHandler);
        },
        destroyVideo() {
            this.$axios.delete(this.route('howTo.videos.destroy', this.video.id))
                .then(({ data }) => {
                    this.toastr.success(data.message);
                    this.$emit('delete');
                }).catch(this.errorHandler);
        },
        removeTag(tag) {
            const index = this.video.tagList.findIndex(id => id === tag.id);
            this.video.tagList.splice(index, 1);
        },
    },
};
</script>

<style lang="scss" scoped>
    .card-footer {
        white-space: nowrap;
        overflow: auto;
        text-overflow: ellipsis;
    }
</style>
