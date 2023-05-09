<template>
	<div class="columns has-text-centered">
		<div class="column chart-column">
			<template v-if="multipleRoots">
				<div
					class="chart-wrapper chart-wrapper--multiple is-flex-grow-1"
					:class="[
						showLegend ? 'show-legend' : 'hide-legend',
						chartIds.length < 4 ? 'chart-wrapper--multiple-high' : '',
					]"
				>
					<div v-for="divId in chartIds" :id="divId" :key="divId" />
				</div>
			</template>
			<template v-else>
				<div
					:id="chartId"
					class="chart-wrapper"
					:class="[
						showLegend ? 'show-legend' : 'hide-legend',
						aspectRatio && 'chart-wrapper--ratio',
					]"
				/>
				<template v-if="tooltipId">
					<div :id="tooltipId" class="chart-tooltip" />
				</template>
			</template>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		multipleRoots: {
			type: Boolean,
			default: false,
		},
		chartIds: {
			type: Array,
			default: () => [],
		},
		chartId: {
			type: String,
			default: '',
		},
		tooltipId: {
			type: String,
			default: '',
		},
		injectChartId: {
			type: String,
			default: '',
		},
		counter: {
			type: Number,
			default: 0,
		},
		reduceWidth: {
			type: Boolean,
			default: false,
		},
		showLegend: {
			type: Boolean,
			default: false,
		},
		aspectRatio: {
			type: Boolean,
			default: false,
		},
	},
}
</script>

<style></style>
