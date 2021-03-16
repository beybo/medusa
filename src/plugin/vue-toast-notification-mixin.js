import VueToast from 'vue-toast-notification';
// Import one of the available themes
//import 'vue-toast-notification/dist/theme-default.css';
import 'vue-toast-notification/dist/theme-sugar.css';

export default {
    extends: VueToast,
    props: {
        position: {
            type: String,
            default: 'top-right'
        }
    },
}