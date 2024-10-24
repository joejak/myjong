<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	import Cube from './Cube.svelte';
	import type { CubeData } from './types/cube';

	export let demoHeight = 100;
	export let demoWidth = 100;

    let dispatcher = createEventDispatcher();

	const c1: CubeData = {
		faces: {
			front: {
				bgColor: 'wheat',
				value: '?'
			},
			left: {
				bgColor: 'red',
				value: '?'
			},
			right: {
				bgColor: 'green',
				value: '?'
			},
			back: {
				bgColor: 'lightblue',
				value: '?'
			},
			top: {
				bgColor: 'mediumpurple',
				value: '?'
			},
			bottom: {
				bgColor: 'orange',
				value: '?'
			}
		},
		size: {
			height: demoHeight,
			width: demoWidth
		}
	};

	const c2: CubeData = {
		faces: {
			front: {
				bgColor: 'wheat',
				value: '➚'
			},
			left: {
				bgColor: 'red',
				value: '➚'
			},
			right: {
				bgColor: 'green',
				value: '➚'
			},
			back: {
				bgColor: 'lightblue',
				value: '➚'
			},
			top: {
				bgColor: 'mediumpurple',
				value: '➚'
			},
			bottom: {
				bgColor: 'orange',
				value: '➚'
			}
		},
		size: {
			height: demoHeight,
			width: demoWidth
		}
	};

	const c3: CubeData = {
		faces: {
			front: {
				bgColor: 'wheat',
				value: '1'
			},
			left: {
				bgColor: 'red',
				value: '2'
			},
			right: {
				bgColor: 'green',
				value: '3'
			},
			back: {
				bgColor: 'lightblue',
				value: '4'
			},
			top: {
				bgColor: 'mediumpurple',
				value: '5'
			},
			bottom: {
				bgColor: 'orange',
				value: '6'
			}
		},
		size: {
			height: demoHeight,
			width: demoWidth
		}
	};

	const c4: CubeData = {
		faces: {
			front: {
				bgColor: 'orange',
				value: '1'
			},
			left: {
				bgColor: 'wheat',
				value: '2'
			},
			right: {
				bgColor: 'red',
				value: '3'
			},
			back: {
				bgColor: 'green',
				value: '4'
			},
			top: {
				bgColor: 'lightblue',
				value: '5'
			},
			bottom: {
				bgColor: 'mediumpurple',
				value: '6'
			}
		},
		size: {
			height: demoHeight,
			width: demoWidth
		}
	};

	const c5: CubeData = {
		faces: {
			front: {
				bgColor: 'orange',
				value: '3'
			},
			left: {
				bgColor: 'wheat',
				value: '4'
			},
			right: {
				bgColor: 'red',
				value: '5'
			},
			back: {
				bgColor: 'green',
				value: '6'
			},
			top: {
				bgColor: 'lightblue',
				value: '1'
			},
			bottom: {
				bgColor: 'mediumpurple',
				value: '2'
			}
		},
		size: {
			height: demoHeight,
			width: demoWidth
		}
	};
</script>

	<div
		style="display: flex; flex-direction: column; justify-content: space-around; gap: 10px; background-color: black;"
	>
		<h2>How to Play!</h2>

		<div style="display:flex; align-items:center; justify-content: space-between;padding:20px">
			<p>Click on the cube faces to select them!</p>
			<div
				style="padding-left: 50px; transform: rotateX(45deg) rotateY(45deg); transform-style:preserve-3d; background-color:transparent;"
			>
				<Cube id="1" cube={c2} animationDelay={0}></Cube>
			</div>
		</div>
		<div style="display:flex; flex-direction:column">
			<div>
				<p>Clicking faces with the same number grants 5 points.</p>
				<div>
					<Cube id="3" cube={c3}></Cube>
					<Cube id="4" cube={c4}></Cube>
				</div>
			</div>
			<div>
				<p>Clicking faces with the same color grants 5 points.</p>
				<div>
					<Cube id="5" cube={c4}></Cube>
					<Cube id="6" cube={c5}></Cube>
				</div>
			</div>
			<div>
				<p style="font-size: large; ">
					Clicking faces with the same number AND same color grants <strong style="color: gold;">25</strong> points.
				</p>
			</div>
		</div>
		<div style="padding: 30px; display:flex; align-items: center; justify-content: space-between;">
			<p><em>HINT: </em>Cubes rotations are not random!</p>
			<div>
				<Cube id="2" cube={c1} animationDelay={0}></Cube>
			</div>
		</div>
        <button style="font-size:larger; border:solid transparent; border-radius: 15px; background-color:lightgreen; padding: 5px;" on:click={()=>{dispatcher('closeDialog')}}>Start Playing!</button>
	</div>
    


<style>
	div {
		background-color: #060606;
		padding: 5px;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	h1,
	h2,
	h3 {
		text-align: center;
	}
	h1,
	h2,
	h3,
	p {
		color: wheat;
		margin: 0px;
        text-align: center;
	}
</style>
