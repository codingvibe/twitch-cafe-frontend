<script>
	import { goto } from '$app/navigation';
	import { page} from '$app/stores';
	import TextPreference from '$lib/preference/TextPreference.svelte';
	import ImagePreference from '$lib/preference/ImagePreference.svelte';
	import { onMount } from 'svelte';
	import { authToken, userPrefs, allCafePrefs } from "../stores";
	import Modal, { getModal } from "$lib/Modal.svelte";
	let displayMessage = "";

	onMount(async () => {
		if (!$authToken) {
			const loginUrl = $page.url.href.startsWith("http://localhost") ?
							"http://localhost:8085/v1/api/login" :
							"https://twitchbotapi.codingvibe.dev/prefs/v1/api/login";
			return goto(loginUrl);
		}
    });

	async function getAllPrefs() {
		await getUserPrefs();
		return await getAllCafePrefs();
	}

	async function setUserPrefs() {
		const token = $authToken;
		console.log($userPrefs);
		const currentPrefs = Object.keys($userPrefs).map(function(key, index) {
								return {
									"name": key,
									"value": $userPrefs[key]
								}
							 });
		const userPrefsUrl = $page.url.href.startsWith("http://localhost") ?
							"http://localhost:8085/v1/api/prefs" :
							"https://twitchbotapi.codingvibe.dev/prefs/v1/api/prefs";
		return fetch(userPrefsUrl, 
			{
				mode: 'cors',
				method: "PUT",
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${token}`
				},
				body: JSON.stringify({
					"prefs": currentPrefs
				})
			}
		).then(async (response) => {
			if (response.status != 200) {
				const error = await response.text();
				throw error;
			}
			return response.json()
		})
		.then(data => {
			const userPrefsMap = {};
			data["prefs"].forEach(pref => {
				userPrefsMap[pref.name] = pref.value; 
			});
			userPrefs.set(userPrefsMap);
			displayMessage = "Successfully set preferences!";
			getModal("display").open();
		}).catch(error => {
			console.error(error);
			displayMessage = error;
			getModal("display").open();
		});
	}

	async function getUserPrefs() {
		const token = $authToken;
		const userPrefsUrl = $page.url.href.startsWith("http://localhost") ?
							"http://localhost:8085/v1/api/prefs" :
							"https://twitchbotapi.codingvibe.dev/prefs/v1/api/prefs";
		return fetch(userPrefsUrl, 
			{
				mode: 'cors',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${token}`
				}
			}
		).then(async (response) => {
			if (response.status != 200) {
				const error = await response.text();
				throw error;
			}
			return response.json()
		})
		.then(data => {
			const userPrefsMap = {};
			data["prefs"].forEach(pref => {
				userPrefsMap[pref.name] = pref.value; 
			});
			console.log(userPrefsMap);
			userPrefs.set(userPrefsMap);
		}).catch(error => {
			console.error(error);
			displayMessage = error;
			getModal("display").open();
		});
	}

    async function getAllCafePrefs() {
		const allPrefsUrl = $page.url.href.startsWith("http://localhost") ?
							"http://localhost:8085/v1/api/cafe/prefs" :
							"https://twitchbotapi.codingvibe.dev/prefs/v1/api/cafe/prefs";
		return fetch(allPrefsUrl, 
			{
				mode: 'cors',
				headers: {
					'Content-Type': 'application/json',
				}
			}
		).then(async (response) => {
			if (response.status != 200) {
				const error = await response.text();
				throw error;
			}
			return response.json()
		}).then(data => {
			allCafePrefs.set(data);
		}).catch(error => {
			console.error(error);
			displayMessage = error;
			getModal("display").open();
		});
	}
</script>

<section>
	{#if !$authToken}
		<h2>Redirecting to sign in with Twitch...</h2>
	{:else}
		{#await getAllPrefs()}
			<h2>Loading prefs...</h2>
		{:then}
			<ul>
				{#each $allCafePrefs as item}
					<li>
						{#if item.values.length == 0}
							<TextPreference bind:selectedValue={$userPrefs[item.name]} name={item.name}/>
						{:else}
							<ImagePreference bind:selectedValue={$userPrefs[item.name]} {...item} initialValue={$userPrefs[item.name]}/>
						{/if}
					</li>
				{/each}

				<div id="saveButton" on:click={setUserPrefs}>
					Save
				</div>
			</ul>
		{/await}
	{/if}
</section>

<Modal id="display">
	<h1>{displayMessage}</h1>
</Modal>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 1;
	}

	ul {
		list-style-type: none;
		padding: 0;
	}

	#saveButton {
		object-fit: contain;
		padding-right: 0.4rem;
		background-color: var(--button-color);
		border-radius: 1rem;
		color: var(--pure-white);
		width: 100%;
		height: 100%;
		padding: 0.5rem 0 0.5rem 0;
		cursor: pointer;
		text-align: center;
		-webkit-user-select: none;
  		user-select: none;
	}

	#saveButton:hover {
		background-color: var(--button-hover);
	}

	#saveButton:active {
		background-color: var(--button-press);
	}
</style>
