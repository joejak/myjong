<script>
	// @ts-nocheck

	import Cube from '$lib/Cube.svelte';
	import { sleep } from '$lib/sleep';
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';

	let rows = 3;
	let cols = 3;
	let stacks = 3;

	let Width = 25;
	let Height = 25;

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
						size: { height: 50, width: 50 }
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
		redraw();
	});

	let selected;
    let points = 0; 
    let scorebox;

	async function handleFaceClick(e) {
		console.log(e.detail.data);
		let newlySelected = e.detail.data;
		if (!selected) {
			selected = newlySelected;
			return;
		}
        if (newlySelected.id === selected.id && newlySelected.bgColor == selected.bgColor && newlySelected.value == selected.value) return;
		if (newlySelected.value === selected.value || newlySelected.bgColor === selected.bgColor) {
            try{
			document.getElementById(newlySelected.id).remove();
			document.getElementById(selected.id).remove();
            }
            catch(e){
                //I don't actually care, it's more fun this way
            }
			return;
		}
		selected = newlySelected;
	}
</script>

<div
	id="chunk"
	style=" will-change: transform;height:{Height *
		rows *
		4}px; border:solid; contain:content; overflow: none; display:flex; justify-content:center; align-items:center "
>
	<div
		style="border:solid black; width: {Width * 2}px; height: {Height *
			2}px; position: absolute; top: 0px; left: 0px; display: flex; justify-content: center; align-items: center; margin: 10px; border-radius: 10px;"
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
    style="border:solid black; width: {Width * 2}px; height: {Height *
        2}px; position: absolute; top: 0px; right: 0px; display: flex; justify-content: center; align-items: center; margin: 10px; border-radius: 10px;"
>
        <div
            bind:this={scorebox}
            style="width: {Width}px; height: {Height}px; display: flex; flex-direction:column; justify-content: center; align-items: center;"
        >
            <span style="">
                {points}
            </span>
        </div>

</div>
	<div
		class="autorotate"
		style=" will-change: transform;
                position:relative;
                display:block; 
                transform-style: preserve-3d; 
                width:{Width * cols * 2}px; 
                height:{Height * rows * 2}px; 
                transform-origin: {cols * Width}px {rows * Height}px {stacks * Width}px;
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
<button
	on:click={async () => {
		await redraw();
	}}>redraw</button
>

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
