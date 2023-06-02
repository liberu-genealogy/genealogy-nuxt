<template>
    <modal class="preview-modal"
        v-on="$listeners">
        <div class="box has-background-light">
            <div class="detail">
                <strong class="name">{{ file.name }}</strong>
                <a class="button is-naked" :href="url" target="_blank">
                    <span class="icon">
                        <fa icon="external-link-alt"/>
                    </span>
                </a>
            </div>
            <iframe :src="url"/>
        </div>
    </modal>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { Modal } from '@enso-ui/modal/bulma';

library.add(faExternalLinkAlt);

export default {
    name: 'Preview',

    components: { Modal },

    inject: ['i18n', 'route'],

    props: {
        file: {
            type: Object,
            required: true,
        },
    },

    computed: {
        url() {
            return this.route('core.files.show', this.file.id);
        },
    },
};
</script>

<style lang="scss">
    .modal.preview-modal{
        iframe {
            flex: 1;
        }
        .name {
            display: inline-block;
            font-size: 1.1em;
            padding-top: 4px;
        }
        .modal-content {
            overflow: visible;
            height: 85%;
            width: 80%;
        }
        .box.has-background-light {
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
        }
    }
</style>
