<script>
    import {nameEnumToDisplayName, getDescriptionFromNameEnum} from "$lib/utils/utils";
    
    export let name;
    export let selectedValue;
</script>

<div class='preference'>
	<h2>{nameEnumToDisplayName(name)}</h2>
    <p class="description">{getDescriptionFromNameEnum(name)}</p>
    <input class="choice-text" type="text" bind:value={selectedValue} />
</div>

<style>
	.preference {
		position: relative;
		margin: 0.5em;
		padding: 0.5em 3em 0.5em 3em;
		border: 1px solid #eee;
		border-radius: 4px;
		box-shadow: 2px 2px 4px rgba(0,0,0,0.1);
		min-height: 5em;
        background: linear-gradient(#c8acac, #9f8a8a);
	}

	h2 {
		margin: 0 0 0.5em 0;
		font-size: 28px;
        text-align: center;
	}
    .description {
        color: var(--secondary-text-color)
    }

    .choice-text {
        width: 100%;
    }
</style>