<template>
	<div id='saved-brackets-page' class="box content">
		<div v-for='(bracket, index) in savedBrackets' :key='bracket.id' class='bracket-card'>
			<router-link class='bracket-title' :to="{name: 'edit-bracket', params: {id: bracket.id, name: bracket.name, games: bracket.games}}">
				<div class='title is-4'>
					{{ bracket.name }}
				</div>
				<div class="subtitle is-6">
						Last Updated: {{ bracket.updateAt }}
				</div>
			</router-link>
			<div>
				<button class="button" @click='askToDelete(index)'>
					<span class="icon is-small">
						<i class="fa fa-trash"></i>
					</span>
				</button>
			</div>
		</div>
		<my-modal v-if='showDelete' v-model='showDelete'>
			<template slot='header'>
				<p class='modal-card-title'>Warning!</p>
				<button class="delete" aria-label="close" @click='showDelete = false'></button>
			</template>
			<template slot='section'>
				Are you sure you want to delete '{{ toDeleteName }}'?
			</template>
			<template slot='footer'>
				<button class="button is-success" @click='deleteToDelete'>Yes</button>
				<button class="button" @click='showDelete = false'>No</button>
			</template>
		</my-modal>
	</div>
	<!-- class="subtitle is-3 has-text-centered" -->
</template>

<script>
import {saveBracketApi} from '@/helpers/authenticatedApi.js'
import MyModal from '@/components/my-modal.vue'

export default {
	name: 'SavedBracketsPage',
	components: {
		MyModal,
	},
	data() {
		return {
			savedBrackets: [],
			showDelete: false,
			toDeleteIndex: -1,
		}
	},
	computed: {
		toDeleteName() {
			return this.savedBrackets[this.toDeleteIndex].name
		},
	},
	methods: {
		askToDelete(index) {
			this.toDeleteIndex = index
			this.showDelete = true
		},
		deleteToDelete() {
			saveBracketApi.deleteBracket(this.savedBrackets[this.toDeleteIndex].id).then(() => {
				this.showDelete = false
				this.$delete(this.savedBrackets, this.toDeleteIndex)
				this.toDeleteIndex = -1
			}).catch(() => {
				console.log('Opps that didnt work!')
			})
		},
	},
	created() {
		saveBracketApi.savedBrackets().then(data => {
			this.savedBrackets = data
		})
	}
}
</script>
<style lang='scss'>
#saved-brackets-page {
	margin: 10px;
	.bracket-card {
		// cursor: pointer;
		display: flex;
		justify-content: space-between;
		padding-bottom: 1rem;
		border-bottom: 1px solid #E6EAEE;
		margin: 10px 0px 0px 0px;
	}
	.bracket-card:first-child {
		margin: 0px;
	}
	.bracket-card:last-child {
		border-bottom: 0px solid #E6EAEE;
	}
}

.bracket-title {
	flex: 1;
}
.side-buttons {
	button.button {
		padding: 5px 5px;
	}
}
</style>
