<template>
    <div class="box p-1 raises-on-hover mb-2">
        <div class="level">
            <div class="level-left">
                <div class="level-item">
                    <span class="icon is-small m-1"
                        v-tooltip="session.ipAddress">
                        <fa icon="link"/>
                    </span>
                    <span>{{ session.ipAddress }}</span>
                </div>
            </div>
            <div class="level-right">
                <div class="level-item">
                    <span class="icon is-small mr-1"
                        v-tooltip="lastActivity(session)">
                        <fa icon="calendar-alt"/>
                    </span>
                    <span class="icon is-small mr-1"
                        v-tooltip="`${session.OS} version: ${session.OSVersion}`">
                        <fa :icon="os(session)"/>
                    </span>
                    <span class="icon is-small mr-1"
                        v-tooltip="`${session.browser} version: ${session.browserVersion}`">
                        <fa :icon="browser(session)"/>
                    </span>
                    <span class="is-pulled-right is-flex">
                        <confirmation placement="top"
                            @show="confirmation = true"
                            @hide="confirmation = false"
                            @confirm="$emit('delete')">
                            <a class="button is-naked is-small">
                                <span class="icon">
                                    <fa icon="trash-alt"/>
                                </span>
                            </a>
                        </confirmation>
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { VTooltip } from 'v-tooltip';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
    faTrashAlt, faInfoCircle, faCalendarAlt, faPencilAlt, faLink,
    faQuestionCircle,
} from '@fortawesome/free-solid-svg-icons';

import {
    faWindows, faLinux, faApple, faAndroid, faChrome,
    faOpera, faInternetExplorer, faFirefoxBrowser, faEdge,
    faUbuntu, faFreebsd, faSafari,
} from '@fortawesome/free-brands-svg-icons';

import Confirmation from '@enso-ui/confirmation/bulma';

library.add([
    faCalendarAlt, faInfoCircle, faPencilAlt, faTrashAlt, faLink,
    faQuestionCircle, faWindows, faLinux, faApple, faAndroid, faChrome,
    faOpera, faInternetExplorer, faFirefoxBrowser, faEdge, faLinux, faUbuntu,
    faFreebsd, faSafari,
]);

export default {
    name: 'Session',

    inject: ['canAccess'],

    directives: { tooltip: VTooltip },

    components: { Confirmation },

    props: {
        session: {
            type: Object,
            required: true,
        },
    },

    data: () => ({
        confirmation: false,
    }),

    methods: {
        lastActivity({ lastActivity }) {
            return lastActivity
                ? `last used: ${this.$formatDistance(lastActivity)}`
                : 'Not used yet';
        },
        os({ OS }) {
            switch (OS) {
            case 'Windows':
            case 'Windows NT':
            case 'WindowsPhoneOS':
            case 'WindowsMobileOS':
                return ['fab', 'windows'];
            case 'OS X':
            case 'iOS':
            case 'iPadOS':
            case 'Macintosh':
                return ['fab', 'apple'];
            case 'Ubuntu':
                return ['fab', 'ubuntu'];
            case 'OpenBSD':
                return ['fab', 'freebsd'];
            case 'Debian':
            case 'Linux':
                return ['fab', 'linux'];
            case 'ChromeOS':
                return ['fab', 'chrome'];
            case 'AndroidOS':
                return ['fab', 'android'];
            default:
                return 'question-circle';
            }
        },
        browser({ browser }) {
            switch (browser) {
            case 'Opera Mini':
            case 'Opera':
                return ['fab', 'opera'];
            case 'Edge':
                return ['fab', 'edge'];
            case 'Chrome':
                return ['fab', 'chrome'];
            case 'Mozilla':
            case 'Firefox':
                return ['fab', 'firefox-browser'];
            case 'Safari':
                return ['fab', 'safari'];
            case 'IE':
                return ['fab', 'internet-explorer'];

            default:
                return 'question-circle';
            }
        },
    },
};
</script>
