<script>
	// @ts-nocheck

	import Cube from '$lib/Cube.svelte';
	import { sleep } from '$lib/sleep';
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';

	let rows = 3;
	let cols = 3;
	let stacks = 3;

	let Width = 81;
	let Height = 81;

	let block = writable([[[]]]);

	async function redraw() {
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
					let cub = {
						id: '' + r + c + s,
						faces: {
							front: { bgColor: 'wheat', value: Math.floor(Math.random() * 6) + 1 },
							left: { bgColor: 'red', value: Math.floor(Math.random() * 6) + 1 },
							back: { bgColor: 'blue', value: Math.floor(Math.random() * 6) + 1 },
							right: { bgColor: 'green', value: Math.floor(Math.random() * 6) + 1 },
							bottom: { bgColor: 'orange', value: Math.floor(Math.random() * 6) + 1 },
							top: { bgColor: 'purple', value: Math.floor(Math.random() * 6) + 1 }
						},
						size: { height: Height, width: Width }
					};
					// @ts-ignore
					if (Math.random() > 0.15) {
						temp[r][c].push(cub);
					} else {
						temp[r][c].push(null);
					}
				}
			}
		}
		$block = temp;
	}

	onMount(() => {
		// setInterval(async ()=>{await redraw()}, 1000);
		if (window.visualViewport.width > window.visualViewport.height) {
			Width = window.visualViewport.height / (cols + 2);
			Height = window.visualViewport.height / (rows + 2);
		} else {
			Width = window.visualViewport.width / (cols + 2);
			Height = window.visualViewport.width / (rows + 2);
		}

		redraw();
	});

	let selected;
	let score = 0;
	let scorebox;

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
				document.getElementById(selected.id).remove();
			} catch (e) {
				//I don't actually care, it's more fun this way
			}
			return;
		}
		selected = newlySelected;
	}
</script>

<div
	id="chunk"
	style=" will-change: transform; height: {(Height*1.5)*rows*Math.SQRT2}px ;border:solid; contain:content; overflow: none; display:flex; justify-content:center; align-items:flex-start; "
>
	<div
		style="border:solid black; width: {Width * 1.2}px; height: {Height *
			1.2}px; position: absolute; top: 0px; left: 0px; display: flex; justify-content: center; align-items: center; margin: 10px; border-radius: 10px;"
	>
		{#if selected}
			<div
				style="width: {Width}px; height: {Height}px; background-color: {selected.bgColor}; display: flex; justify-content: center; align-items: center;"
			>
				<span style="">
					{selected.value}
				</span>
			</div>
		{/if}
	</div>
	<div
		style="border:solid black; width: {Width * 1.2}px; height: {Height *
			1.2}px; position: absolute; top: 0px; right: 0px; display: flex; justify-content: center; align-items: center; margin: 10px; border-radius: 10px;"
	>
		<div
			bind:this={scorebox}
			style="width: {Width}px; height: {Height}px; display: flex; flex-direction:column; justify-content: center; align-items: center;"
		>
			<span style="">
				{score}
			</span>
		</div>
	</div>
	<div
		class="autorotate"
		style=" will-change: transform;
                position:relative;
                display:block; 
                margin-right:{Math.SQRT2 * Width}px;
                top: {Width * 1.2}px;
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
							<Cube on:faceClicked={(e) => handleFaceClick(e)} id={cube.id} {cube}></Cube>
						</div>
					{/if}
				{/each}
			{/each}
		{/each}
	</div>
</div>
<div style="display: flex; justify-content:center; padding: 4px;">
	<button
        style="width:20vw; height:5vh;"
		on:click={async () => {
			await redraw();
		}}>Reload Cube</button
	>
</div>

<style>
	#chunk {
		transform-style: preserve-3d;
		/* animation: spin 4s linear infinite; */
	}

	.autorotate {
		/* animation: rot 15s 1s linear infinite; */
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
