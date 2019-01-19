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
    faCompress,
    faExpand,
    faTrash,
    faCopy,
    faFolderPlus,
    faSignInAlt,
    faSignOutAlt,
    faFileImage,
    faTimes,
    faSearch,
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
library.add(faCompress);
library.add(faExpand);
library.add(faSignOutAlt);
library.add(faFileImage);
library.add(faTimes);
library.add(faSearch);

Vue.component('icon', FontAwesomeIcon);
