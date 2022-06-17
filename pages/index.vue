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
		<div class="columns has-text-centered">
			<div class="column chart-column">
				<div class="chart-wrapper--multiple is-flex-grow-1">
					<div v-for="divId in chartIds" :id="divId" :key="divId" />
				</div>
				<div class="stats">
					<button @click="compareStints = !compareStints">
						{{ compareStints ? 'Reset comparing' : 'Compare stints' }}
					</button>
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
			colorArr: ['#42c3fa', '#f70f1c', '#fabd38', '#06f906'],
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
			multiChartsArr: [
				{
					order: 1,
					stintNumber: 3,
					lapNumber: 2,
					startTime: null,
					startTimeFormatted: null,
					startTimeMinutes: null,
					endTime: null,
					endTimeFormatted: null,
					endTimeMinutes: null,
					lapState: 'OK',
					longAcc: 1.5316555867015282,
					longBrk: 2.5036385056926327,
					latLeft: 1.8481020290674175,
					latRight: 2.4905386564077827,
				},
				{
					order: 2,
					stintNumber: 3,
					lapNumber: 3,
					startTime: null,
					startTimeFormatted: null,
					startTimeMinutes: null,
					endTime: null,
					endTimeFormatted: null,
					endTimeMinutes: null,
					lapState: 'OK',
					longAcc: 1.4581659882805034,
					longBrk: 1.8213310980529474,
					latLeft: 1.9129652981850471,
					latRight: 2.0756844959006275,
				},
				{
					order: 3,
					stintNumber: 3,
					lapNumber: 4,
					startTime: null,
					startTimeFormatted: null,
					startTimeMinutes: null,
					endTime: null,
					endTimeFormatted: null,
					endTimeMinutes: null,
					lapState: 'OK',
					longAcc: 0.8057147112582923,
					longBrk: 2.075583976100101,
					latLeft: 1.8228917797528033,
					latRight: 2.1087592044250925,
				},
				{
					order: 4,
					stintNumber: 3,
					lapNumber: 5,
					startTime: null,
					startTimeFormatted: null,
					startTimeMinutes: null,
					endTime: null,
					endTimeFormatted: null,
					endTimeMinutes: null,
					lapState: 'OK',
					longAcc: 0.798191718005259,
					longBrk: 1.806420725784535,
					latLeft: 1.7070404737124505,
					latRight: 2.163136333500573,
				},
				{
					order: 5,
					stintNumber: 3,
					lapNumber: 6,
					startTime: null,
					startTimeFormatted: null,
					startTimeMinutes: null,
					endTime: null,
					endTimeFormatted: null,
					endTimeMinutes: null,
					lapState: 'OK',
					longAcc: 0.8834641521737724,
					longBrk: 2.1048700408468917,
					latLeft: 1.735247068570416,
					latRight: 2.036673675132697,
				},
				{
					order: 6,
					stintNumber: 3,
					lapNumber: 7,
					startTime: null,
					startTimeFormatted: null,
					startTimeMinutes: null,
					endTime: null,
					endTimeFormatted: null,
					endTimeMinutes: null,
					lapState: 'OK',
					longAcc: 0.9516600318154307,
					longBrk: 2.0690212191427153,
					latLeft: 1.6951227528361126,
					latRight: 2.1041858451446624,
				},
				{
					order: 7,
					stintNumber: 3,
					lapNumber: 8,
					startTime: null,
					startTimeFormatted: null,
					startTimeMinutes: null,
					endTime: null,
					endTimeFormatted: null,
					endTimeMinutes: null,
					lapState: 'OK',
					longAcc: 0.8685834303300801,
					longBrk: 2.1204167792799518,
					latLeft: 1.8229378594292533,
					latRight: 1.9945405188199818,
				},
				{
					order: 8,
					stintNumber: 3,
					lapNumber: 9,
					startTime: null,
					startTimeFormatted: null,
					startTimeMinutes: null,
					endTime: null,
					endTimeFormatted: null,
					endTimeMinutes: null,
					lapState: 'OK',
					longAcc: 0.9865559569192588,
					longBrk: 2.0653628428047948,
					latLeft: 1.7144468581640027,
					latRight: 2.107061644698988,
				},
				{
					order: 9,
					stintNumber: 3,
					lapNumber: 10,
					startTime: null,
					startTimeFormatted: null,
					startTimeMinutes: null,
					endTime: null,
					endTimeFormatted: null,
					endTimeMinutes: null,
					lapState: 'OK',
					longAcc: 1.0006620735689526,
					longBrk: 2.1315900314595475,
					latLeft: 1.7350098651726553,
					latRight: 2.429677125267783,
				},
				{
					order: 10,
					stintNumber: 3,
					lapNumber: 11,
					startTime: null,
					startTimeFormatted: null,
					startTimeMinutes: null,
					endTime: null,
					endTimeFormatted: null,
					endTimeMinutes: null,
					lapState: 'OK',
					longAcc: 0.7849602888848074,
					longBrk: 1.6770406600532182,
					latLeft: 1.8455641471403939,
					latRight: 2.4498594402659313,
				},
				{
					order: 11,
					stintNumber: 3,
					lapNumber: 12,
					startTime: null,
					startTimeFormatted: null,
					startTimeMinutes: null,
					endTime: null,
					endTimeFormatted: null,
					endTimeMinutes: null,
					lapState: 'OK',
					longAcc: 0.5533868748842758,
					longBrk: 1.8050713884235035,
					latLeft: 1.6839648605486668,
					latRight: 1.8981076161795798,
				},
				{
					order: 12,
					stintNumber: 3,
					lapNumber: 13,
					startTime: null,
					startTimeFormatted: null,
					startTimeMinutes: null,
					endTime: null,
					endTimeFormatted: null,
					endTimeMinutes: null,
					lapState: 'OK',
					longAcc: 0.7982529631448447,
					longBrk: 2.009915382004173,
					latLeft: 1.8329692300063511,
					latRight: 2.19180411398107,
				},
				{
					order: 13,
					stintNumber: 3,
					lapNumber: 14,
					startTime: null,
					startTimeFormatted: null,
					startTimeMinutes: null,
					endTime: null,
					endTimeFormatted: null,
					endTimeMinutes: null,
					lapState: 'OK',
					longAcc: 0.7927042993201392,
					longBrk: 1.891441228557435,
					latLeft: 2.0091641082919214,
					latRight: 2.0831338491643967,
				},
				{
					order: 14,
					stintNumber: 3,
					lapNumber: 15,
					startTime: null,
					startTimeFormatted: null,
					startTimeMinutes: null,
					endTime: null,
					endTimeFormatted: null,
					endTimeMinutes: null,
					lapState: 'OK',
					longAcc: 0.6232548440511316,
					longBrk: 2.0342077319410596,
					latLeft: 1.7803964021859668,
					latRight: 2.2953669230143228,
				},
				{
					order: 15,
					stintNumber: 3,
					lapNumber: 16,
					startTime: null,
					startTimeFormatted: null,
					startTimeMinutes: null,
					endTime: null,
					endTimeFormatted: null,
					endTimeMinutes: null,
					lapState: 'OK',
					longAcc: 0.6500025407983622,
					longBrk: 1.9173166195308518,
					latLeft: 1.7673994058498184,
					latRight: 2.1636049074256576,
				},
				{
					order: 16,
					stintNumber: 4,
					lapNumber: 2,
					startTime: null,
					startTimeFormatted: null,
					startTimeMinutes: null,
					endTime: null,
					endTimeFormatted: null,
					endTimeMinutes: null,
					lapState: 'OK',
					longAcc: 0.7539362231768842,
					longBrk: 1.6858560715732709,
					latLeft: 1.723026427289397,
					latRight: 2.335939397627182,
				},
				{
					order: 17,
					stintNumber: 4,
					lapNumber: 3,
					startTime: null,
					startTimeFormatted: null,
					startTimeMinutes: null,
					endTime: null,
					endTimeFormatted: null,
					endTimeMinutes: null,
					lapState: 'OK',
					longAcc: 0.9626223285142312,
					longBrk: 1.8778148655011626,
					latLeft: 1.911220881066434,
					latRight: 2.117467679987138,
				},
				{
					order: 18,
					stintNumber: 4,
					lapNumber: 4,
					startTime: null,
					startTimeFormatted: null,
					startTimeMinutes: null,
					endTime: null,
					endTimeFormatted: null,
					endTimeMinutes: null,
					lapState: 'OK',
					longAcc: 0.864245232942758,
					longBrk: 1.9193826222395434,
					latLeft: 1.8104304353517615,
					latRight: 2.166216283520184,
				},
				{
					order: 19,
					stintNumber: 4,
					lapNumber: 5,
					startTime: null,
					startTimeFormatted: null,
					startTimeMinutes: null,
					endTime: null,
					endTimeFormatted: null,
					endTimeMinutes: null,
					lapState: 'OK',
					longAcc: 0.7300441053664648,
					longBrk: 1.9285392566801454,
					latLeft: 1.9734055016505,
					latRight: 2.230963284087108,
				},
				{
					order: 20,
					stintNumber: 4,
					lapNumber: 6,
					startTime: null,
					startTimeFormatted: null,
					startTimeMinutes: null,
					endTime: null,
					endTimeFormatted: null,
					endTimeMinutes: null,
					lapState: 'OK',
					longAcc: 0.7368586965049564,
					longBrk: 1.9025170718007374,
					latLeft: 1.8603821656268913,
					latRight: 2.98664839624994,
				},
				{
					order: 21,
					stintNumber: 4,
					lapNumber: 7,
					startTime: null,
					startTimeFormatted: null,
					startTimeMinutes: null,
					endTime: null,
					endTimeFormatted: null,
					endTimeMinutes: null,
					lapState: 'OK',
					longAcc: 0.9877503343556877,
					longBrk: 1.8322799791497435,
					latLeft: 1.958721833613062,
					latRight: 2.309465748575971,
				},
				{
					order: 22,
					stintNumber: 4,
					lapNumber: 8,
					startTime: null,
					startTimeFormatted: null,
					startTimeMinutes: null,
					endTime: null,
					endTimeFormatted: null,
					endTimeMinutes: null,
					lapState: 'OK',
					longAcc: 1.2311984032058327,
					longBrk: 2.025202752131813,
					latLeft: 1.9087716587700487,
					latRight: 2.7156979544325583,
				},
				{
					order: 23,
					stintNumber: 4,
					lapNumber: 9,
					startTime: null,
					startTimeFormatted: null,
					startTimeMinutes: null,
					endTime: null,
					endTimeFormatted: null,
					endTimeMinutes: null,
					lapState: 'OK',
					longAcc: 0.7953357988176725,
					longBrk: 2.3246006863561974,
					latLeft: 1.9096846974224124,
					latRight: 2.497199211159491,
				},
			],
			chartIds: ['g-force_0', 'g-force_1', 'g-force_2', 'g-force_3'],
			compareStints: false,
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
				color: this.$colorMode.preference === 'light' ? '#171717' : '#eaeaea',
				tooltipColor:
					this.$colorMode.preference === 'light' ? '#eaeaea' : '#171717',
				dividerColor:
					this.$colorMode.preference === 'light' ? 'grey' : '#eaeaea',
				strokeColor:
					this.$colorMode.preference === 'light' ? '#eaeaea' : 'grey',
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
		compareStints(val) {
			this.initMaxGForceLapNumber()
		},
	},
	async mounted() {
		await this.initChart()
		await this.initMaxGForceLapNumber()
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
			this.scs_lap.delete()
			if (this.generalXAxisState !== 'time') {
				this.generalXAxisState = 'time'
			} else {
				this.generalXAxisState = 'number'
			}
		},

		stintCompareProperties(arr, wasmContext) {
			const {
				XyDataSeries,
				// eslint-disable-next-line no-undef
			} = SciChart
			// create dataSeries for primary data
			const primaryDataSeries = new XyDataSeries(wasmContext, {
				containsNaN: true,
				dataSeriesName: `Stint 3`,
			})

			// create dataSeries for secondary data
			const secondaryDataSeries = new XyDataSeries(wasmContext, {
				containsNaN: true,
				dataSeriesName: `Stint 4`,
			})

			const primaryArr = arr.filter((item) => item.stintNumber === 3)
			const secondaryArr = arr.filter((item) => item.stintNumber === 4)

			const dataArr = [primaryDataSeries, secondaryDataSeries]
			return {
				primaryDataSeries,
				secondaryDataSeries,
				primaryArr,
				secondaryArr,
				dataArr,
			}
		},

		setScatterSeriesOption(index, yId, dataSeries, wasmContext, opacity = 1) {
			const {
				XyScatterRenderableSeries,
				EllipsePointMarker,
				// eslint-disable-next-line no-undef
			} = SciChart

			const scatterSeriesOptions = {
				stroke: this.colorArr[index],
				yAxisId: yId,
				dataSeries,
				pointMarker: new EllipsePointMarker(wasmContext, {
					width: 5,
					height: 5,
					strokeThickness: 0,
					fill: this.colorArr[index],
					opacity,
				}),
			}
			if (yId) {
				scatterSeriesOptions.yAxisId = yId
			}
			return new XyScatterRenderableSeries(wasmContext, scatterSeriesOptions)
		},

		setTooltipOptions(lineSeries, xLabel, yLabel) {
			lineSeries.rolloverModifierProps.tooltipColor =
				this.chartAxisStyle.tooltipColor
			lineSeries.rolloverModifierProps.tooltipTextColor =
				this.chartAxisStyle.color
			lineSeries.rolloverModifierProps.tooltipLabelX = xLabel
			lineSeries.rolloverModifierProps.tooltipLabelY = yLabel
		},

		setLegendOptions(surface, placement = 'TopRight') {
			const {
				LegendModifier,
				ELegendPlacement,
				// eslint-disable-next-line no-undef
			} = SciChart
			surface.themeProvider.legendBackgroundBrush =
				this.chartAxisStyle.tooltipColor
			return new LegendModifier({
				showCheckboxes: true,
				showSeriesMarkers: true,
				showLegend: true,
				placement: ELegendPlacement[placement],
			})
		},

		initChart() {
			// eslint-disable-next-line no-undef
			SciChart.SciChartSurface.configure({
				dataUrl:
					'https://cdn.jsdelivr.net/npm/scichart@2.2.2378/_wasm/scichart2d.data',
				wasmUrl:
					'https://cdn.jsdelivr.net/npm/scichart@2.2.2378/_wasm/scichart2d.wasm',
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
			this.scs_lap = sciChartSurface

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

		async initMaxGForceLapNumber() {
			const {
				NumericAxis,
				XyDataSeries,
				EAxisAlignment,
				RolloverModifier,
				ZoomPanModifier,
				EXyDirection,
				NumberRange,
				ENumericFormat,
				LineAnnotation,
				ECoordinateMode,
				EAutoRange,
				SciChartVerticalGroup,
				// eslint-disable-next-line no-undef
			} = SciChart

			const verticalGroup = new SciChartVerticalGroup()

			const arr = this.multiChartsArr

			const dataSeriesArr = [
				{
					title: 'Long Acc',
					value: 'longAcc',
				},
				{
					title: 'Long Brk',
					value: 'longBrk',
				},
				{
					title: 'Lat Left',
					value: 'latLeft',
				},
				{
					title: 'Lat Right',
					value: 'latRight',
				},
			]

			const chartsArr = []

			const xAxisArr = []

			for (let i = 0; i < dataSeriesArr.length; i++) {
				if (this[`scs_g_force${i}`]) {
					this[`scs_g_force${i}`].delete()
				}
				const drawChart = async () => {
					const { sciChartSurface, wasmContext } =
						// eslint-disable-next-line no-undef
						await SciChart.SciChartSurface.createSingle(`g-force_${i}`)

					this[`scs_g_force${i}`] = sciChartSurface

					const xAxis = new NumericAxis(wasmContext, {
						drawLabels: i === dataSeriesArr.length - 1,
						axisTitle: i === dataSeriesArr.length - 1 ? 'Lap Number' : '',
						axisTitleStyle: this.chartAxisStyle,
						labelStyle: this.chartAxisStyle,
						axisBandsFill: 'transparent',
						autoRange: EAutoRange.Never,
						minorDelta: 0.2,
						autoTicks: false,
						majorDelta: 1,
						labelFormat: ENumericFormat.Decimal,
						labelPrecision: 0,
						visibleRange: new NumberRange(0, this.maxVisibleNumberX(arr)),
						visibleRangeLimit: new NumberRange(0, arr.length + 1),
					})

					xAxisArr.push(xAxis)

					xAxis.visibleRangeChanged.subscribe((data) => {
						xAxisArr.forEach((item) => (item.visibleRange = data.visibleRange))
					})

					const yAxis = new NumericAxis(wasmContext, {
						axisTitle: dataSeriesArr[i].title,
						axisTitleStyle: this.chartAxisStyle,
						autoRange: EAutoRange.Never,
						majorDelta: 1,
						minorDelta: 0.5,
						autoTicks: false,
						labelStyle: this.chartAxisStyle,
						axisBandsFill: 'transparent',
						visibleRange: new NumberRange(-0.2, 10),
						visibleRangeLimit: new NumberRange(0, 10),
						axisAlignment: EAxisAlignment.Left,
						id: `yAxis${i + 1}`,
						minorsPerMajor: 1,
						cursorLabelFormat: ENumericFormat.Decimal,
						cursorLabelPrecision: 2,
						axisBorder: {
							borderTop: 10,
							borderBottom: 10,
						},
					})

					sciChartSurface.annotations.add(
						new LineAnnotation({
							stroke: this.chartAxisStyle.dividerColor,
							strokeThickness: 1,
							xCoordinateMode: ECoordinateMode.Relative,
							x1: 0,
							x2: 1,
							yCoordinateMode: ECoordinateMode.DataValue,
							y1: 0,
							y2: 0,
							yAxisId: `yAxis${i + 1}`,
						})
					)

					sciChartSurface.xAxes.add(xAxis)
					sciChartSurface.yAxes.add(yAxis)

					if (this.compareStints) {
						const {
							primaryDataSeries,
							secondaryDataSeries,
							primaryArr,
							secondaryArr,
							dataArr,
						} = this.stintCompareProperties(arr, wasmContext)

						for (let j = 0; j < primaryArr.length; j++) {
							primaryDataSeries.append(
								primaryArr[j].lapNumber,
								primaryArr[j][dataSeriesArr[i].value] === null ||
									primaryArr[j][dataSeriesArr[i].value] > 10
									? NaN
									: primaryArr[j][dataSeriesArr[i].value]
							)
						}
						for (let j = 0; j < secondaryArr.length; j++) {
							secondaryDataSeries.append(
								secondaryArr[j].lapNumber,
								secondaryArr[j][dataSeriesArr[i].value] === null ||
									secondaryArr[j][dataSeriesArr[i].value] > 10
									? NaN
									: secondaryArr[j][dataSeriesArr[i].value]
							)
						}

						for (let k = 0; k < dataArr.length; k++) {
							const lineSeries = this.setScatterSeriesOption(
								k,
								`yAxis${i + 1}`,
								dataArr[k],
								wasmContext
							)

							this.setTooltipOptions(lineSeries, 'Lap', '; Max G-Force')

							sciChartSurface.renderableSeries.add(lineSeries)
						}

						const legend = this.setLegendOptions(sciChartSurface)

						sciChartSurface.chartModifiers.add(legend)
					} else {
						const dataSeries = new XyDataSeries(wasmContext, {
							dataSeriesName: dataSeriesArr[i].title,
						})

						for (let j = 0; j < arr.length; j++) {
							dataSeries.append(
								arr[j].order,
								arr[j][dataSeriesArr[i].value] === null ||
									arr[j][dataSeriesArr[i].value] > 10
									? NaN
									: arr[j][dataSeriesArr[i].value]
							)
						}
						const lineSeries = this.setScatterSeriesOption(
							0,
							`yAxis${i + 1}`,
							dataSeries,
							wasmContext
						)

						this.setTooltipOptions(lineSeries, 'Lap', '; Max G-Force')

						sciChartSurface.renderableSeries.add(lineSeries)
					}

					const rolloverModifier = new RolloverModifier({
						rolloverLineStroke: this.chartAxisStyle.dividerColor,
						modifierGroup: 'first',
					})

					const zoomPanModifier = new ZoomPanModifier({
						xyDirection: EXyDirection.XDirection,
					})

					sciChartSurface.chartModifiers.add(rolloverModifier)
					if (arr.length > 10) {
						sciChartSurface.chartModifiers.add(zoomPanModifier)
					}

					verticalGroup.addSurfaceToGroup(sciChartSurface)

					return { wasmContext, sciChartSurface }
				}
				chartsArr.push(drawChart())
			}
			return await Promise.all(chartsArr)
		},
	},
}
</script>
