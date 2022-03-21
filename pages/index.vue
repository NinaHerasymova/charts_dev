<template>
	<section class="section pt-4">
		<div class="columns has-text-centered">
			<div class="column chart-column">
				<div id="lap_time" class="chart-wrapper" />
				<div class="stats">
					<button @click="toggleGenXAxis">
						{{
							generalXAxisState !== 'time' ? 'xAxis Time' : 'xAxis Lap number'
						}}
					</button>
					<p class="stats__item">
						<span class="stats__label">Max:</span>
						<span>{{ stat.max.toFixed(1) }} s</span>
					</p>
					<p class="stats__item">
						<span class="stats__label">Min:</span>
						<span>{{ stat.min.toFixed(1) }} s</span>
					</p>
					<p class="stats__item">
						<span class="stats__label">Avg:</span>
						<span>{{ stat.avg.toFixed(1) }} s</span>
					</p>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
import _, { sortBy } from 'lodash'

export default {
	data() {
		return {
			chartsArr: [
				{
					order: 1,
					stintNumber: 1,
					lapNumber: 1,
					startTime: 0,
					startTimeFormatted: '00:00:00',
					startTimeMinutes: 0,
					endTime: 199.64583984375,
					endTimeFormatted: '00:03:19',
					endTimeMinutes: 3.3274306640624998,
					lapState: 'OUT',
					lapTime: 199.64583984375,
					lapTimeFormatted: '03:19',
				},
				{
					order: 2,
					stintNumber: 1,
					lapNumber: 2,
					startTime: 199.64583984375,
					startTimeFormatted: '00:03:19',
					startTimeMinutes: 3.3274306640624998,
					endTime: 303.57659545898434,
					endTimeFormatted: '00:05:03',
					endTimeMinutes: 5.059609924316406,
					lapState: 'OK',
					lapTime: 103.93075561523438,
					lapTimeFormatted: '01:43',
				},
				{
					order: 3,
					stintNumber: 1,
					lapNumber: 3,
					startTime: 303.57659545898434,
					startTimeFormatted: '00:05:03',
					startTimeMinutes: 5.059609924316406,
					endTime: 422.7856713867187,
					endTimeFormatted: '00:07:02',
					endTimeMinutes: 7.0464278564453116,
					lapState: 'OK',
					lapTime: 119.20907592773438,
					lapTimeFormatted: '01:59',
				},
				{
					order: 4,
					stintNumber: 1,
					lapNumber: 4,
					startTime: 422.7856713867187,
					startTimeFormatted: '00:07:02',
					startTimeMinutes: 7.0464278564453116,
					endTime: 521.3480493164062,
					endTimeFormatted: '00:08:41',
					endTimeMinutes: 8.689134155273438,
					lapState: 'OK',
					lapTime: 98.5623779296875,
					lapTimeFormatted: '01:38',
				},
				{
					order: 5,
					stintNumber: 1,
					lapNumber: 5,
					startTime: 521.3480493164062,
					startTimeFormatted: '00:08:41',
					startTimeMinutes: 8.689134155273438,
					endTime: 686.5317651367187,
					endTimeFormatted: '00:11:26',
					endTimeMinutes: 11.442196085611979,
					lapState: 'OK',
					lapTime: 165.1837158203125,
					lapTimeFormatted: '02:45',
				},
				{
					order: 6,
					stintNumber: 1,
					lapNumber: 6,
					startTime: 686.5317651367187,
					startTimeFormatted: '00:11:26',
					startTimeMinutes: 11.442196085611979,
					endTime: 785.161953125,
					endTimeFormatted: '00:13:05',
					endTimeMinutes: 13.086032552083333,
					lapState: 'OK',
					lapTime: 98.63018798828125,
					lapTimeFormatted: '01:38',
				},
				{
					order: 7,
					stintNumber: 1,
					lapNumber: 7,
					startTime: 785.161953125,
					startTimeFormatted: '00:13:05',
					startTimeMinutes: 13.086032552083333,
					endTime: 895.084560546875,
					endTimeFormatted: '00:14:55',
					endTimeMinutes: 14.918076009114582,
					lapState: 'OK',
					lapTime: 109.922607421875,
					lapTimeFormatted: '01:49',
				},
				{
					order: 8,
					stintNumber: 1,
					lapNumber: 8,
					startTime: 895.084560546875,
					startTimeFormatted: '00:14:55',
					startTimeMinutes: 14.918076009114582,
					endTime: 997.172451171875,
					endTimeFormatted: '00:16:37',
					endTimeMinutes: 16.61954085286458,
					lapState: 'OK',
					lapTime: 102.087890625,
					lapTimeFormatted: '01:42',
				},
				{
					order: 9,
					stintNumber: 1,
					lapNumber: 9,
					startTime: 997.172451171875,
					startTimeFormatted: '00:16:37',
					startTimeMinutes: 16.61954085286458,
					endTime: 2188.95,
					endTimeFormatted: '00:36:28',
					endTimeMinutes: 36.482499999999995,
					lapState: 'ESC',
					lapTime: null,
					lapTimeFormatted: null,
				},
			],
			stat: {
				min: 10,
				avg: 14,
				max: 28,
			},
			isActive: false,
			generalXAxisState: 'number',
		}
	},
	computed: {
		chartAxisStyle() {
			return {
				fontSize: 14,
				fontFamily: 'Montserrat',
				color: this.$colorMode.preference === 'light' ? '#171717' : '#dbdbdb',
				tooltipColor:
					this.$colorMode.preference === 'light' ? '#ffffff' : '#171717',
			}
		},

		chartColorMode() {
			// eslint-disable-next-line no-undef
			const { SciChartJSLightTheme, SciChartJSDarkTheme } = SciChart
			return this.$colorMode.preference === 'light'
				? new SciChartJSLightTheme()
				: new SciChartJSDarkTheme()
		},
	},
	watch: {
		generalXAxisState(val) {
			this.initLapTimeChart('lap_time', val)
		},
	},
	async mounted() {
		await this.initChart()
	},
	methods: {
		sortBy,
		toggle() {
			this.isActive = !this.isActive
		},

		maxVisibleNumberX(arr) {
			if (arr.length <= 10) {
				return 11
			} else if (arr.length > 10 && arr.length < 50) {
				return arr.length
			} else {
				return 50
			}
		},

		toggleGenXAxis() {
			if (this.generalXAxisState !== 'time') {
				this.generalXAxisState = 'time'
			} else {
				this.generalXAxisState = 'number'
			}
		},

		initChart() {
			// eslint-disable-next-line no-undef
			SciChart.SciChartSurface.configure({
				dataUrl:
					'https://cdn.jsdelivr.net/npm/scichart@2.0.2115/_wasm/scichart2d.data',
				wasmUrl:
					'https://cdn.jsdelivr.net/npm/scichart@2.0.2115/_wasm/scichart2d.wasm',
			})
			// eslint-disable-next-line no-undef
			SciChart.SciChartSurface.setRuntimeLicenseKey(
				'0z6W4et78D021vPad9mjMkyfss0UL5xZ7HjZob0zGc3/CXd2QIUrYoOTaFrUos6LHbE3WCY2fxx5uXY/N8690ywIuvwZZTTpAc0MuLW4WJvYELWbvz/vaX+K6+qAPWuf8L5CGjEUItfIRzWME368bX3p14j7AlcIRvrwvQ7AtPViK0Cz36djmsxjqQl28HIYwlI4padwvxFc5mejZnJf2pYwuti+PciVX3ajJhWkwO1U++32A3mEPogSIlFjNT8VD+9/se6AZU5lx6fnP94RB3lPN4hdeZpwgn9+1ay1Y0LtyxK/k6/SnwHkHb+bMZyrVMcBeXvbt1HA0khyiY6C0NpvvegWrTKaaoGmdv2oekrVssT6vfAnvVRR3EmIIA6lc4/RZ0+BPq12CwaGNYyvuUFL2db51CVUtmwPNMH2C7rAuuED/P/NeIKhxw5adGB7CjkkJ5E2VodqQPS4BF9yG6uXXPMHVRj14t0CdsbymNsVGMBex1sG0mIenbcZ5HBOQVBVDFp1DxuwU2kVvGj7V7CJhd7tgJnD3HCq7lQYdeLzGsTwtEHYgt84IWIADNjDR3lBtfCoiOXkUt7oD6yhN904FOiZg2lQsd6tfY+K6dv3vFtMD1rH7MeERh16bwwPrGrKMbjSVlnYcxNWKOpM9/HLWpRvOSGpbvwxOLbRtJBFHBS24bUg1UfhbKBCJKzBe76NYtzJZYxyK4L5XVg='
			)
			this.initLapTimeChart('lap_time', this.generalXAxisState)
		},

		async initLapTimeChart(id, headerStateToggler) {
			const { sciChartSurface, wasmContext } =
				// eslint-disable-next-line no-undef
				await SciChart.SciChartSurface.create(id)

			const {
				NumericAxis,
				XyDataSeries,
				ZoomPanModifier,
				RolloverModifier,
				FastLineRenderableSeries,
				EAxisAlignment,
				EllipsePointMarker,
				EXyDirection,
				NumberRange,
				EAutoRange,
				ENumericFormat,
				MouseWheelZoomModifier,
				// eslint-disable-next-line no-undef
			} = SciChart

			let arr = this.chartsArr
			let maxVisibleNumberX

			if (headerStateToggler === 'time') {
				arr = sortBy(arr, 'startTimeMinutes')
				maxVisibleNumberX =
					_.maxBy(arr, 'startTimeMinutes').startTimeMinutes + 1
			}

			const minVisibleNumberY = _.minBy(arr, 'lapTime').lapTime - 1
			const maxVisibleNumberY = _.maxBy(arr, 'lapTime').lapTime + 1

			let xAxisOptions = {}

			if (headerStateToggler === 'time') {
				xAxisOptions = {
					cursorLabelPrecision: 3,
					axisTitle: 'Time (minutes)',
					visibleRangeLimit: new NumberRange(-1, maxVisibleNumberX),
				}
			} else {
				xAxisOptions = {
					axisTitle: 'Lap Number',
					minorsPerMajor: 2,
					labelPrecision: 0,
					visibleRange: new NumberRange(0, this.maxVisibleNumberX(arr)),
					visibleRangeLimit: new NumberRange(0, arr.length + 1),
				}
			}
			const xAxis = new NumericAxis(wasmContext, {
				autoRange: EAutoRange.Never,
				axisTitleStyle: this.chartAxisStyle,
				labelFormat: ENumericFormat.Decimal,
				labelStyle: this.chartAxisStyle,
				cursorLabelFormat: ENumericFormat.Decimal,
				...xAxisOptions,
			})

			const yAxis = new NumericAxis(wasmContext, {
				axisTitleStyle: this.chartAxisStyle,
				labelStyle: this.chartAxisStyle,
				labelFormat: ENumericFormat.Decimal,
				labelPrecision: 0,
				cursorLabelFormat: ENumericFormat.Decimal,
				cursorLabelPrecision: 3,
				axisTitle: 'Lap Time',
				axisAlignment: EAxisAlignment.Left,
				visibleRange: new NumberRange(minVisibleNumberY, maxVisibleNumberY),
				visibleRangeLimit: new NumberRange(
					minVisibleNumberY,
					maxVisibleNumberY
				),
			})
			yAxis.labelProvider.formatCursorLabel = (dataValue) => {
				return arr.find((x) => x.lapTime === dataValue).lapTimeFormatted
			}

			const ticks = arr.map((x) => x.lapTime)
			yAxis.tickProvider.getMajorTicks = () => ticks
			yAxis.tickProvider.getMinorTicks = () => ticks
			yAxis.labelProvider.formatLabel = (dataValue) => {
				return arr.find((x) => x.lapTime === dataValue).lapTimeFormatted
			}

			sciChartSurface.xAxes.add(xAxis)
			sciChartSurface.yAxes.add(yAxis)

			const xyDataSeries = new XyDataSeries(wasmContext)

			for (let i = 0; i < arr.length; i++) {
				const xValue =
					headerStateToggler === 'time' ? arr[i].startTimeMinutes : arr[i].order
				xyDataSeries.append(
					+xValue,
					xValue === null || arr[i].lapTime === null ? NaN : arr[i].lapTime
				)
			}

			const lineSeries = new FastLineRenderableSeries(wasmContext, {
				stroke: 'rgba(66,195,250,1)',
				strokeThickness: 3,
				dataSeries: xyDataSeries,
				pointMarker: new EllipsePointMarker(wasmContext, {
					width: 5,
					height: 5,
					strokeThickness: 2,
					fill: 'white',
					stroke: 'rgba(66,195,250,1)',
				}),
			})

			lineSeries.rolloverModifierProps.tooltipColor =
				this.chartAxisStyle.tooltipColor
			lineSeries.rolloverModifierProps.tooltipLabelX =
				headerStateToggler === 'time' ? 'Time' : 'Lap'
			lineSeries.rolloverModifierProps.tooltipLabelY = '; Lap Time'

			const zoomPanModifier = new ZoomPanModifier({
				xyDirection: EXyDirection.XDirection,
			})

			const mouseZoomModifier = new MouseWheelZoomModifier({
				xyDirection: EXyDirection.XDirection,
			})

			const rolloverModifier = new RolloverModifier(wasmContext)

			sciChartSurface.renderableSeries.add(lineSeries)
			sciChartSurface.applyTheme(this.chartColorMode)
			sciChartSurface.chartModifiers.add(rolloverModifier)
			sciChartSurface.chartModifiers.add(zoomPanModifier)
			sciChartSurface.chartModifiers.add(mouseZoomModifier)
		},
	},
}
</script>
