import Vue from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon, FontAwesomeLayers, FontAwesomeLayersText } from '@fortawesome/vue-fontawesome';
import {
    faListAlt,
    faUpload,
    faShoePrints,
    faPuzzlePiece,
    faCalendarAlt,
    faFolderOpen,
    faVideo,
    faUsersCog,
    faBook,
    faUsers,
    faUniversalAccess,
    faExclamationTriangle,
    faUserTie,
    faTerminal,
    faLanguage,
    faUser,
    faBuilding,
    faCloudUploadAlt,
    faTasks,
    faTachometerAlt,
    faSlidersH,
    faList
} from '@fortawesome/free-solid-svg-icons';
import { faGithub, faGoogle } from '@fortawesome/free-brands-svg-icons';

library.add(
    faListAlt,
    faGithub,
    faUpload,
    faShoePrints,
    faGoogle,
    faPuzzlePiece,
    faCalendarAlt,
    faFolderOpen,
    faVideo,
    faUsersCog,
    faBook,
    faUsers,
    faUniversalAccess,
    faExclamationTriangle,
    faUserTie,
    faTerminal,
    faLanguage,
    faUser,
    faBuilding,
    faCloudUploadAlt,
    faTasks,
    faTachometerAlt,
    faSlidersH,
    faList
);

Vue.component('fa', FontAwesomeIcon);
Vue.component('fal', FontAwesomeLayers);
Vue.component('falt', FontAwesomeLayersText);
