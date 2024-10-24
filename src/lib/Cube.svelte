<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { CubeData } from './types/cube';

	let dispatcher = createEventDispatcher();

	export let id: string;
	export let cube: CubeData = {
		faces: {
			front: { bgColor: 'wheat', value: 1 },
			left: { bgColor: 'wheat', value: 2 },
			back: { bgColor: 'wheat', value: 3 },
			right: { bgColor: 'wheat', value: 4 },
			top: { bgColor: 'wheat', value: 6 },
			bottom: { bgColor: 'wheat', value: 5 }
		},
		size: { height: 100, width: 100 }
	};
	export let animationDelay: number = 0;
	export let r: number | undefined = undefined;
	export let c: number | undefined = undefined;
	export let s: number | undefined = undefined;

	let width = cube.size.width;
	let height = cube.size.height;
	let faces = cube.faces;

	let wholeCube: HTMLDivElement;

	async function handleClick(target: EventTarget | null | HTMLDivElement) {
		// if(wholeCube){
		// 	wholeCube.remove();
		// }
	}

	async function faceClicked(bgColor: string, value: string | number | HTMLElement) {
		let data = {
			data: {
				id: id,
				bgColor: bgColor,
				value: value,
				r: r,
				c: c,
				s: s
			}
		};
		console.log(data);
		dispatcher('faceClicked', data);
	}
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
	class="autorotate"
	style=" will-change: transform;
	        position: relative; 
			width:{width}px; 
			height:{height}px; 
			min-width:{width}px; 
			min-height: {height}px; 
			transform-style: preserve-3d; 
			border:none; 
			transform-origin: {width / 2}px {height / 2}px 0px; 
			display:block; 
			animation-delay: {Math.random() * animationDelay - animationDelay / 2}s;
			"
	bind:this={wholeCube}
	on:click={(e) => {
		handleClick(e.currentTarget);
	}}
>
	<div
		on:click={() => {
			faceClicked(faces.bottom.bgColor, faces.bottom.value);
		}}
		style=" will-change: transform;width:{width}px; height:{height}px; background-color: {faces
			.bottom.bgColor}; transform-origin: bottom; transform: rotateX(90deg) translateY({height /
			2}px)"
	>
		<span style="font-size:{height * 0.6}px; will-change: transform;transform: rotateX(180deg)"
			>{faces.bottom.value}</span
		>
	</div>
	<div
		on:click={() => {
			faceClicked(faces.right.bgColor, faces.right.value);
		}}
		style=" will-change: transform;width:{height}px; height:{height}px; background-color: {faces
			.right.bgColor}; transform-origin:right; transform: translateX({width -
			height}px) translateZ(-{height / 2}px) rotateY(90deg)"
	>
		<span style="font-size:{height * 0.6}px;">{faces.right.value}</span>
	</div>
	<div
		on:click={() => {
			faceClicked(faces.back.bgColor, faces.back.value);
		}}
		style="will-change: transform;width:{width}px; height:{height}px; background-color: {faces.back
			.bgColor}; transform: translateZ(-{height / 2}px)"
	>
		<span style="font-size:{height * 0.6}px; will-change: transform;transform: rotateY(180deg)"
			>{faces.back.value}</span
		>
	</div>
	<div
		on:click={() => {
			faceClicked(faces.front.bgColor, faces.front.value);
		}}
		style=" will-change: transform;width:{width}px; height:{height}px; background-color: {faces
			.front.bgColor}; transform: rotateX(180deg) translateZ(-{height / 2}px);"
	>
		<span
			style="font-size:{height *
				0.6}px; will-change: transform;transform: rotateY(180deg) rotateZ(180deg);"
			>{faces.front.value}</span
		>
	</div>
	<div
		on:click={() => {
			faceClicked(faces.left.bgColor, faces.left.value);
		}}
		style=" will-change: transform;width:{height}px; height:{height}px; background-color: {faces
			.left.bgColor}; transform-origin:left; transform: translateZ(-{height / 2}px) rotateY(-90deg)"
	>
		<span style="font-size:{height * 0.6}px;">{faces.left.value}</span>
	</div>
	<div
		on:click={() => {
			faceClicked(faces.top.bgColor, faces.top.value);
		}}
		style=" will-change: transform;width:{width}px; height:{height}px; background-color: {faces.top
			.bgColor}; transform-origin:top; transform: rotateX(90deg) translateY(-{height / 2}px);"
	>
		<span style="font-size:{height * 0.6}px;">{faces.top.value}</span>
	</div>
</div>

<style>
	div {
		perspective: 1000;
		position: absolute;
		transform-style: preserve-3d;
		transform-origin: center center;
		display: flex;
		justify-content: center;
		align-items: center;
		backface-visibility: visible;
	}

	span {
		position: fixed;
		font-size: xx-large;
		text-align: center;
		user-select: none;
	}

	.autorotate {
		animation: rot 12s cubic-bezier(0.075, 0.82, 0.165, 1) infinite;
	}

	@keyframes rot {
		0% {
			transform: rotateY(0turn);
		}
		6% {
			transform: rotateY(0turn) scale3d(0.66, 0.66, 0.66);
		}
		8% {
			transform: rotateY(0turn) scale3d(0.66, 0.66, 0.66);
		}
		14.28% {
			transform: rotateY(0.25turn) scale3d(0.66, 0.66, 0.66);
		}
		20% {
			transform: rotateY(0.25turn) scale3d(0.66, 0.66, 0.66);
		}
		22% {
			transform: rotateY(0.25turn) scale3d(0.66, 0.66, 0.66);
		}
		28.57% {
			transform: rotateY(0.5turn) scale3d(0.66, 0.66, 0.66);
		}
		34% {
			transform: rotateY(0.5turn) scale3d(0.66, 0.66, 0.66);
		}
		36% {
			transform: rotateY(0.5turn) scale3d(0.66, 0.66, 0.66);
		}
		42.85% {
			transform: rotateY(0.75turn) scale3d(0.66, 0.66, 0.66);
		}
		48% {
			transform: rotateY(0.75turn) scale3d(0.66, 0.66, 0.66);
		}
		50% {
			transform: rotateY(0.75turn) scale3d(0.66, 0.66, 0.66);
		}
		57.14% {
			transform: rotateY(1turn) scale3d(0.66, 0.66, 0.66);
		}
		63% {
			transform: rotateY(1turn) scale3d(0.66, 0.66, 0.66);
		}
		65% {
			transform: rotateY(1turn) scale3d(0.66, 0.66, 0.66);
		}
		71.42% {
			transform: rotateY(1turn) rotateX(0.25turn) scale3d(0.66, 0.66, 0.66);
		}
		78% {
			transform: rotateY(1turn) rotateX(0.25turn) scale3d(0.66, 0.66, 0.66);
		}
		80% {
			transform: rotateY(1turn) rotateX(0.25turn) scale3d(0.66, 0.66, 0.66);
		}
		85.71% {
			transform: rotateY(1turn) rotateX(-0.25turn) scale3d(0.66, 0.66, 0.66);
		}
		91% {
			transform: rotateY(1turn) rotateX(-0.25turn) scale3d(0.66, 0.66, 0.66);
		}
		93% {
			transform: rotateY(1turn) rotateX(-0.25turn) scale3d(0.66, 0.66, 0.66);
		}
		100% {
			transform: rotateY(1turn) rotateX(0turn);
		}
	}
</style>
