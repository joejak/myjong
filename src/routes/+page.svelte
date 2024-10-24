<script>
	// @ts-nocheck

	import Cube from '$lib/Cube.svelte';
	import { sleep } from '$lib/sleep';
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import HowToDialog from '$lib/HowToDialog.svelte';

	let rows = 3;
	let cols = 3;
	let stacks = 3;

	let Width = 81;
	let Height = 81;

	let block = writable([[[]]]);

	async function redraw(firstRun) {
		/**
		 * @typedef {import('$lib/types/cube.ts').Cube} Cube
		 * @type {Array.<Array.<Array.<Cube>>>}}
		 */
		let temp = new Array();
		for (let r = 0; r < rows; r++) {
			temp.push([]);
			for (let c = 0; c < cols; c++) {
				temp[r].push([]);
				for (let s = 0; s < stacks; s++) {
					if (newGame || !$block[r][c][s]) {
						let cub = {
							id: '' + r + c + s,
							faces: {
								front: { bgColor: 'wheat', value: Math.floor(Math.random() * 6) + 1 },
								left: { bgColor: 'red', value: Math.floor(Math.random() * 6) + 1 },
								back: { bgColor: 'lightblue', value: Math.floor(Math.random() * 6) + 1 },
								right: { bgColor: 'green', value: Math.floor(Math.random() * 6) + 1 },
								bottom: { bgColor: 'orange', value: Math.floor(Math.random() * 6) + 1 },
								top: { bgColor: 'mediumpurple', value: Math.floor(Math.random() * 6) + 1 }
							},
							size: { height: Height, width: Width }
						};
						// @ts-ignore
						if (Math.random() > (firstRun ? 0 : 0.5)) {
							temp[r][c].push(cub);
						} else {
							temp[r][c].push(null);
						}
					} else {
						temp[r][c].push($block[r][c][s]);
					}
				}
			}
		}
		if (firstRun) newGame = false;
		$block = temp;
	}

	let newGame = true;

	onMount(() => {
		// setInterval(async ()=>{await redraw()}, 1000);
		if (window.visualViewport.width > window.visualViewport.height) {
			Width = window.visualViewport.height / (cols + cols * Math.SQRT2);
			Height = window.visualViewport.height / (rows + cols * Math.SQRT2);
		} else {
			Width = window.visualViewport.width / (cols + 2);
			Height = window.visualViewport.width / (rows + 2);
		}

        toggleHelp(true); 

	});


	let selected;
	let score = 0;
	let scorebox;
	/**
	 * @type {HTMLSpanElement}
	 */
	let scoreSpan;

	async function handleFaceClick(e) {
		console.log(e.detail.data);
		let newlySelected = e.detail.data;
		if (!selected) {
			selected = newlySelected;
			return;
		}
		if (
			newlySelected.id === selected.id &&
			newlySelected.bgColor == selected.bgColor &&
			newlySelected.value == selected.value
		)
			return;
		let points = 1;
		if (newlySelected.value === selected.value) {
			points *= 5;
		}
		if (newlySelected.bgColor === selected.bgColor) {
			points *= 5;
		}
		if (points > 1) {
			score += points;
			try {
				document.getElementById(newlySelected.id).remove();
				$block[newlySelected.r][newlySelected.c][newlySelected.s] = null;
				//do these second, as it may already be gone;
				document.getElementById(selected.id).remove();
				$block[selected.r][selected.c][selected.s] = null;
			} catch (e) {
				//I don't actually care, it's more fun this way
			}
			console.log(newlySelected.r, newlySelected.c, newlySelected.s);
		}
		selected = newlySelected;
	}

	/**
	 * @type {HTMLDialogElement}
	 */
	let helpDialog;
	let show = false;
	async function toggleHelp(force) {
		if (force != null) {
			show = force;
		} else {
			show = !show;
		}
		if (show) {
			helpDialog.showModal();
		} else {
			helpDialog.close();
		}
	}
</script>

<div
	id="chunk"
	style=" will-change: transform; height: {Height * 1.45 * rows * Math.SQRT2}px ;
        max-width: {Height *
		1.5 *
		rows *
		Math.SQRT2}px; border:solid; contain:content; overflow: none; display:flex; justify-content:center; align-items:flex-start; margin-left:auto; margin-right:auto;"
>
	<div
		style="width: {Width * 1.2}px; height: {Height *
			1.2}px; position: absolute; top: 0px; left: 0px; display: flex; justify-content: center; align-items: center; margin: 10px; border-radius: 10px;"
	>
		{#if selected}
			<div
				style="width: {Width}px; height: {Height}px; background-color: {selected.bgColor}; display: flex; justify-content: center; align-items: center;"
			>
				<span style="font-size: {Height / 1.6}px">
					{selected.value}
				</span>
			</div>
		{/if}
	</div>
	<button
		style="position:absolute; margin-left:auto; margin-right:auto; margin-top: 5px; width: 30px; aspect-ratio: 1/1; border-radius: 15px; background-color: lightblue; border: thin; color: darkblue"
		on:click={() => {
			toggleHelp(true);
		}}
	>
		?
	</button>
	<div
		style="width: {Width * 1.2}px; height: {Height *
			1.2}px; position: absolute; top: 0px; right: 0px; display: flex; justify-content: center; align-items: center; margin: 10px; border-radius: 10px;"
	>
		<div
			bind:this={scorebox}
			style="width: {Width}px; height: {Height}px; display: flex; flex-direction:column; justify-content: center; align-items: center;"
		>
			{#key score}
				<span class="flash" style="font-size:{Height / 2}px;">
					<em>{score}</em>
				</span>
			{/key}
		</div>
	</div>
	<div
		class="autorotate"
		style=" will-change: transform;
                position:relative;
                display:block; 
                margin-right:{Math.SQRT2 * Width}px;
                top: {Width * Math.SQRT2}px;
                transform-style: preserve-3d; 
                transform-origin: center center {(Width * stacks) / 2}px;
                transform: rotateX(45deg) rotateY(45deg)"
	>
		{#each $block as row, x (x)}
			{#each row as col, y (y)}
				{#each col as cube, z (z)}
					{#if cube}
						<div
							id={cube.id}
							style=" will-change: transform; transform-style: preserve-3d; position: fixed; transform: translate3d({x *
								cube.size.width}px, {y * cube.size.height}px, {z * cube.size.height}px)"
						>
							<Cube
								on:faceClicked={(e) => handleFaceClick(e)}
								id={cube.id}
								{cube}
								r={x}
								c={y}
								s={z}
								animationDelay="20"
							></Cube>
						</div>
					{/if}
				{/each}
			{/each}
		{/each}
	</div>
</div>
<div style="display: flex; justify-content:center; padding: 4px;">
	<button
		style="width:20vw; min-width:150px;height:5vh;"
		on:click={() => {
			redraw(true);
		}}
		>Start
	</button>
	<button
		disabled={newGame}
		style="width:20vw; min-width:150px; height:5vh;"
		on:click={() => {
			redraw(newGame);
		}}>Roll To Add In Where Missing</button
	>
</div>
<h3 style="text-align:center; color: gold; font-family:Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif; font-size:xx-large; font-weight:500"><em>K E R J O N G</em></h3>
<footer style="margin-top:30vh">
    <p style="text-align:center; color:#313131; font-family:Cambria, Cochin, Georgia, Times, 'Times New Roman', serif">Made with 💜 by Joseph Jackson for Kerry Jackson</p>
</footer>

<dialog bind:this={helpDialog} style="background-color: black;">
	<HowToDialog
		on:closeDialog={() => {
			helpDialog.close();
		}}
	></HowToDialog>
</dialog>

<style>
	#chunk {
		transform-style: preserve-3d;
		/* animation: spin 4s linear infinite; */
	}

	.autorotate {
		/* animation: rot 15s 1s linear infinite; */
	}

	.flash {
		animation: flash 200ms ease-out;
		transition: all 500ms;
		color: green;
	}

	@keyframes flash {
		0% {
			color: green;
			transform: scale(1);
		}
		50% {
			color: gold;
			transform: scale(1.5);
		}
		100% {
			color: green;
			transform: scale(1);
		}
	}

	@keyframes rot {
		0% {
			transform: rotateX(0deg) rotateY(0deg);
		}
		10% {
			transform: rotateX(180deg) rotateY(180deg);
		}
		50% {
			transform: rotateX(180deg) rotateY(180deg);
		}
		60% {
			transform: rotateX(360deg) rotateY(360deg);
		}
		100% {
			transform: rotateX(360deg) rotateY(360deg);
		}
	}
</style>
