import VueToast from 'vue-toast-notification';
// Import one of the available themes
//import 'vue-toast-notification/dist/theme-default.css';
import 'vue-toast-notification/dist/theme-sugar.css';

VueToast.props.position = {
    type: String,
    default: 'top-right'
};

VueToast.props.duration = {
    type: Number,
    default: 10000
}

export default VueToast;
