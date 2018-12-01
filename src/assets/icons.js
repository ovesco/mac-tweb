import Vue from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
    faFilePdf,
    faThumbsUp,
    faHeart,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faFilePdf);
library.add(faThumbsUp);
library.add(faHeart);

Vue.component('icon', FontAwesomeIcon);
