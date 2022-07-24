import { writable } from 'svelte/store';

export const authToken = writable("");
export const userPrefs = writable({});
export const allCafePrefs = writable([]);