import Vue from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
    faFilePdf,
    faThumbsUp,
    faHeart,
    faStar,
    faCommentAlt,
    faUser,
    faFolderOpen,
    faExternalLinkAlt,
    faTrash,
    faCopy,
    faFolderPlus,
    faSignInAlt,
    faSignOutAlt,
    faFileImage,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faFilePdf);
library.add(faThumbsUp);
library.add(faStar);
library.add(faHeart);
library.add(faCommentAlt);
library.add(faUser);
library.add(faFolderOpen);
library.add(faTrash);
library.add(faExternalLinkAlt);
library.add(faCopy);
library.add(faFolderPlus);
library.add(faSignInAlt);
library.add(faSignOutAlt);
library.add(faFileImage);

Vue.component('icon', FontAwesomeIcon);
