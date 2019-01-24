import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './vuex'
import '@/assets/styles.scss';
import Toasted from 'vue-toasted';

Vue.config.productionTip = false
Vue.use(Toasted, {iconPack: 'fontawesome', duration: 3000})

Vue.toasted.register('unauthenticated',
		(payload) => {
				if(! payload.message) {
					return "You must login to view this page."
				}
				return payload.message;
		}, {
			type : 'error',
			icon: 'exclamation',
		}
)

Vue.toasted.register('failed_to_save',
	(payload) => {
		let toReturn = "Failed to Saved."
		if(payload.message) {
			toReturn += " " + payload.message
		}
		return toReturn
	}, {
		type: 'error',
		icon: 'exclamation',
	}
)

Vue.toasted.register('failed_to_delete',
	(payload) => {
		let toReturn = "Failed to Delete."
		if(payload.message) {
			toReturn += " " + payload.message
		}
		return toReturn
	}, {
		type: 'error',
		icon: 'exclamation',
	}
)

Vue.toasted.register('saved',
	(payload) => {
		let toReturn = "Saved!"
		if(payload.message) {
			toReturn += " " + payload.message
		}
		return toReturn
	}, {
		type: 'success',
		icon: 'check',
	}
)

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')
