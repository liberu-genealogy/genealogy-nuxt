import { createApp } from 'vue';
import { library, config } from '@fortawesome/fontawesome-svg-core';
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

config.autoAddCss = false;

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

const app = createApp({});
app.component('fa', FontAwesomeIcon);
app.component('fal', FontAwesomeLayers);
app.component('falt', FontAwesomeLayersText);

export default app;
