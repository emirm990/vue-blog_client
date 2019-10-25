import Vue from 'vue';
import App from './App.vue';
import router from './router';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
library.add(faEye);
library.add(faEyeSlash);
Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.config.productionTip = false;
import wysiwyg from 'vue-wysiwyg';
Vue.use(wysiwyg, {}); // config is optional. more below
new Vue({
	router,
	render: (h) => h(App)
}).$mount('#app');
