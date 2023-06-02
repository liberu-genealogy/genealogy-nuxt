<template>
    <div class="box has-background-light">
        <input class="input control is-large message-title"
            v-model="message.title"
            :placeholder="i18n('Title...')"
            v-if="title">
        <quill-editor :options="options"
            ref="quillEditor"
            v-model="message.body"/>
        <form ref="inputForm"
            @submit.prevent>
            <input id="file-upload"
                class="is-invisible"
                type="file"
                ref="fileInput"
                @change="upload($event)"
                v-if="attachments">
        </form>
        <div class="has-text-right">
            <a class="button is-small is-rounded"
                @click="$emit('cancel')">
                <span>{{ i18n('Cancel') }}</span>
                <span class="icon is-small">
                    <fa icon="ban"/>
                </span>
            </a>
            <a class="button is-success is-small is-rounded"
                @click="save"
                v-if="filled">
                <span v-if="message.id">
                    {{ i18n('Update') }}
                </span>
                <span v-else>
                    {{ i18n('Post') }}
                </span>
                <span class="icon is-small">
                    <fa icon="check"/>
                </span>
            </a>
        </div>
    </div>
</template>

<script>
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';

import { quillEditor } from 'vue-quill-editor';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCheck, faBan } from '@fortawesome/free-solid-svg-icons';

import './mention/mention';
import './upload/upload';
import './mention/mention.scss';

library.add(faCheck, faBan);

export default {
    name: 'Inputor',

    components: { quillEditor },

    inject: ['errorHandler', 'i18n', 'route'],

    props: {
        title: {
            type: Boolean,
            default: false,
        },
        attachments: {
            type: Boolean,
            default: false,
        },
        placeholder: {
            type: String,
            required: true,
        },
        message: {
            type: Object,
            required: true,
        },
    },

    data: (v) => ({
        tribute: null,
        query: null,
        users: [],
        tagged: [],
        options: {
            theme: 'snow',
            placeholder: v.i18n(v.placeholder),
            modules: {
                toolbar: [
                    ['bold', 'italic', 'strike'],
                    v.attachments
                        ? ['blockquote', 'code-block', 'image', 'link']
                        : ['blockquote', 'code-block', 'link'],
                    [{ header: 1 }, { header: 2 }],
                    [{ list: 'ordered' }, { list: 'bullet' }],
                    [{ align: [] }],
                    [{ color: [] }, { background: [] }, 'clean'],
                ],
                mention: {
                    template: (item) => v.template(item),
                },
                upload: {
                    handler: () => v.openFileBrowser(),
                },
            },
        },
    }),

    computed: {
        filled() {
            return (this.title
                ? this.message.title
                    && this.message.title.trim().length > 3
                : true)
                && this.message.body
                && this.message.body.trim().length > 10;
        },
    },

    methods: {
        openFileBrowser() {
            this.$refs.fileInput.click();
        },
        save() {
            if (this.message.id) {
                this.$emit('update', this.taggedUsers());
                return;
            }

            this.$emit('store', this.taggedUsers());
        },
        tag(user) {
            if (!this.tagged.find(({ id }) => id === user.id)) {
                this.tagged.push(user);
            }
        },
        taggedUsers() {
            return this.tagged.filter((user) => this.message.body.indexOf(this.template(user)) > 0);
        },
        upload($event) {
            const Editor = this.$refs.quillEditor.quill;
            const formData = new FormData();

            formData.append('attachment', $event.target.files[0]);

            this.$axios.post(this.route('core.discussions.upload'), formData)
                .then(({ data }) => {
                    Editor.insertEmbed(
                        Editor.getSelection().index,
                        'image',
                        this.route('core.discussions.showAttachment', data.id),
                    );

                    this.$refs.inputForm.reset();
                }).catch(this.errorHandler);
        },
        avatar(avatarId) {
            return this.route('core.avatars.show', avatarId);
        },
        template(user) {
            return `<img src="${this.route('core.avatars.show', user.avatar.id)}"> ${user.person.name}`;
        },
    },
};
</script>

<style lang="scss">
    .message-title {
        border: unset;
        box-shadow: unset;
        font-weight: bold;

        &:focus {
            box-shadow: unset;
        }
    }

    .quill-editor {
        .ql-toolbar.ql-snow {
            border-left: unset;
            border-right: unset;
            padding: 1rem;
        }

        .ql-container.ql-snow {
            height: unset;
            border: unset;
            min-height: 200px;
            font-size: unset;

            .ql-editor {
                height: unset;

                img {
            width: 1.4rem;
            height: 1.4rem;
            margin-bottom: -0.3rem;
            border-radius: 290486px;
        }
            }

            .ql-editor.ql-blank {
                height: unset;
            }
        }
    }
</style>
