<script>
    import {nameEnumToDisplayName, getDescriptionFromNameEnum} from "$lib/utils/utils";
    import leftArrow from "$lib/assets/left.svg"

	export let name;
	export let values;
    export let initialValue;
    export let selectedValue = "";
    let imageIndex=0;

    if (initialValue) {
        for (let i = 0; i < values.length; i++) {
            if (values[i] == initialValue) {
                imageIndex = i;
                break;
            }
        }
        selectedValue = initialValue;
    } else {
        selectedValue = values.length > 0 ? values[0] : "";
    }

    function switchChoiceImage(left) {
        if (left) {
            imageIndex--; 
        } else {
            imageIndex++;
        }

        if(imageIndex < 0) imageIndex = values.length-1;
        if(imageIndex === values.length) imageIndex = 0;

        selectedValue = values[imageIndex];
    }
</script>

<div class='image-preference'>
	<h2>{nameEnumToDisplayName(name)}</h2>
    <p class="description">{getDescriptionFromNameEnum(name)}</p>
    <div class="choice-carousel">
        <picture>
            <img class:disabled={values.length === 1} on:click={()=>{switchChoiceImage(true)}} id="left" class="nav-icon" src={leftArrow} alt="left arrow to switch images"/>
        </picture>
        <div class="image-display">
            <picture>
                <img class="choice-image" src={`images/${selectedValue}`} alt={selectedValue} />
            </picture>
        </div>
        <picture>
            <img class:disabled={values.length === 1} on:click={()=>{switchChoiceImage(false)}} id="right" class="nav-icon" src={leftArrow} alt="right arrow to switch images"/>
        </picture>
    </div>
</div>

<style>
	.image-preference {
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

    .choice-image {
        width: 100%;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
    }

    .description {
        color: var(--secondary-text-color)
    }
    
    #right {
        -moz-transform: scale(-1, 1);
        -webkit-transform: scale(-1, 1);
        -o-transform: scale(-1, 1);
        -ms-transform: scale(-1, 1);
        transform: scale(-1, 1);
    }

    .nav-icon {
        width: 2rem;
        height: 2rem;
    }

    .nav-icon.disabled {
        opacity: 0.25;
    }

    .choice-carousel {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .image-display {
        height: 300px;
        width: 200px;
        position: relative;
    }
</style>