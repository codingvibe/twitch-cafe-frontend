<script context="module">
	export const prerender = true;
</script>

<script lang="ts">
import { goto } from '$app/navigation';

	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { authToken } from "../stores";

	let displayError: String | null = null;
	onMount(()=> {
		const queryParams = new URLSearchParams(window.location.search);
		if (queryParams.has("error")) {
			displayError = decodeURI(queryParams.get("error_description") || "Unknown error");
			return;
		}

		const authUrl = $page.url.href.startsWith("http://localhost") ?
							"http://localhost:8080/v1/api/authenticate" :
							"https://twitchbotapi.codingvibe.dev/prefs/v1/api/authenticate";
		const hashParams = new URLSearchParams(window.location.hash.replace("#", "?"));
		const twitchAccessToken = hashParams.get("access_token");
		const twitchState = hashParams.get("state");
		if (twitchAccessToken == null || twitchState == null) {
			displayError = "Invalid redirect url. Try again.";
			return;
		}
		
		fetch(authUrl,
			{
				mode: 'cors',
				cache: 'no-cache',
				headers: {
					'Content-Type': 'application/json',
					'X-Twitch-State': twitchState!,
					'X-Twitch-Token': twitchAccessToken!
				}
			}
		).then(async (response) => {
			if (response.status != 200) {
				const error = await response.text();
				throw error;
			}
			return response.json()
		}).then(data => {
			authToken.set(data.accessToken);
			goto("/");
		}).catch(error => {
			displayError = error;
		});
	});
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="User preferences for Codingvibe's Cafe" />
</svelte:head>

<section>
	<h3>
		{#if displayError}
			<h3>
				Error getting auth token: {displayError}
			</h3>
		{/if}
	</h3>
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 1;
	}

	h3 {
		width: 100%;
	}
</style>
