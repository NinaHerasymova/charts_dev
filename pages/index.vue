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
		<div class="columns has-text-centered">
			<div class="column chart-column">
				<div id="lap_time_highlight2" class="chart-wrapper" />
				<div class="stats">
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
				<div id="tire_wear_tire_age" class="chart-wrapper" />
			</div>
		</div>
	</section>
</template>

<script>
import _, { sortBy } from 'lodash'
import ChartMixins from '../mixins/ChartMixins'
import {
	chartsArr,
	multiChartsArr,
	chartHighlight,
	chartHighlight2,
	chartTires,
} from '~/utils/data'

export default {
	mixins: [ChartMixins],
	data() {
		return {
			chartsArr,
			multiChartsArr,
			chartHighlight,
			chartHighlight2,
			chartTires,
			filters: {
				highlight1: true,
				highlight2: true,
			},
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
		await this.initLapTimeChart('lap_time', this.generalXAxisState)
		await this.initMaxGForceLapNumber()
		await this.initLapTimeHighlight2Chart()
		await this.initTireWearTireAgeChart()
	},
	methods: {
		sortBy,
		toggle() {
			this.isActive = !this.isActive
		},

		toggleGenXAxis() {
			this.scs_lap.delete()
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
					'https://cdn.jsdelivr.net/npm/scichart@2.2.2415/_wasm/scichart2d.data',
				wasmUrl:
					'https://cdn.jsdelivr.net/npm/scichart@2.2.2415/_wasm/scichart2d.wasm',
			})
			// eslint-disable-next-line no-undef
			SciChart.SciChartSurface.setRuntimeLicenseKey(
				'0z6W4et78D021vPad9mjMkyfss0UL5xZ7HjZob0zGc3/CXd2QIUrYoOTaFrUos6LHbE3WCY2fxx5uXY/N8690ywIuvwZZTTpAc0MuLW4WJvYELWbvz/vaX+K6+qAPWuf8L5CGjEUItfIRzWME368bX3p14j7AlcIRvrwvQ7AtPViK0Cz36djmsxjqQl28HIYwlI4padwvxFc5mejZnJf2pYwuti+PciVX3ajJhWkwO1U++32A3mEPogSIlFjNT8VD+9/se6AZU5lx6fnP94RB3lPN4hdeZpwgn9+1ay1Y0LtyxK/k6/SnwHkHb+bMZyrVMcBeXvbt1HA0khyiY6C0NpvvegWrTKaaoGmdv2oekrVssT6vfAnvVRR3EmIIA6lc4/RZ0+BPq12CwaGNYyvuUFL2db51CVUtmwPNMH2C7rAuuED/P/NeIKhxw5adGB7CjkkJ5E2VodqQPS4BF9yG6uXXPMHVRj14t0CdsbymNsVGMBex1sG0mIenbcZ5HBOQVBVDFp1DxuwU2kVvGj7V7CJhd7tgJnD3HCq7lQYdeLzGsTwtEHYgt84IWIADNjDR3lBtfCoiOXkUt7oD6yhN904FOiZg2lQsd6tfY+K6dv3vFtMD1rH7MeERh16bwwPrGrKMbjSVlnYcxNWKOpM9/HLWpRvOSGpbvwxOLbRtJBFHBS24bUg1UfhbKBCJKzBe76NYtzJZYxyK4L5XVg='
			)
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

		async initLapTimeHighlight2Chart() {
			const { sciChartSurface, wasmContext } =
				// eslint-disable-next-line no-undef
				await SciChart.SciChartSurface.create('lap_time_highlight2')

			const {
				NumericAxis,
				XyDataSeries,
				ZoomPanModifier,
				EAxisAlignment,
				EXyDirection,
				NumberRange,
				ENumericFormat,
				EAutoRange,
				SeriesSelectionModifier,
				CursorModifier,
				parseColorToUIntArgb,
				EStrokePaletteMode,
				// eslint-disable-next-line no-undef
			} = SciChart

			sciChartSurface.background = this.changeBackgroundColorTheme
			sciChartSurface.chartModifiers.add(
				new SeriesSelectionModifier({
					enableHover: true,
				})
			)
			// this is the unsorted  array of the data to be rendered
			const arr = this.chartHighlight
			// we need to convert it to the bunch of arrays belongs to the same stint (based on stintId property
			const stints = this.getStintsLapsArray(arr)

			// set visible ranges
			const minVisibleNumberY = _.minBy(arr, 'lapTime').lapTime - 1
			const maxVisibleNumberY = _.maxBy(arr, 'lapTime').lapTime + 1
			const maxVisibleNumberX = _.maxBy(arr, 'lapNumber').lapNumber + 1

			const xAxis = new NumericAxis(wasmContext, {
				axisTitle: 'Lap Number',
				autoRange: EAutoRange.Never,
				minorDelta: 0.2,
				autoTicks: false,
				majorDelta: 1,
				axisTitleStyle: this.chartAxisStyle,
				axisBandsFill: 'transparent',
				labelFormat: ENumericFormat.Decimal,
				labelPrecision: 0,
				labelStyle: this.chartAxisStyle,
				cursorLabelFormat: ENumericFormat.Decimal,
				visibleRange: new NumberRange(0, maxVisibleNumberX),
				visibleRangeLimit: new NumberRange(0, maxVisibleNumberX + 1),
			})

			const yAxis = new NumericAxis(wasmContext, {
				axisTitleStyle: this.chartAxisStyle,
				labelStyle: this.chartAxisStyle,
				labelFormat: ENumericFormat.Decimal,
				labelPrecision: 0,
				cursorLabelFormat: ENumericFormat.Decimal,
				cursorLabelPrecision: 3,
				axisTitle: 'Lap Time',
				axisBandsFill: 'transparent',
				axisAlignment: EAxisAlignment.Left,
				autoRange: EAutoRange.Never,
				visibleRange: new NumberRange(minVisibleNumberY, maxVisibleNumberY),
				visibleRangeLimit: new NumberRange(
					minVisibleNumberY,
					maxVisibleNumberY
				),
			})

			// format the time which we receive from API to the readable time in minutes for the labels
			yAxis.labelProvider.formatLabel = (dataValue) => {
				return this.msToLapTime(dataValue, this.$dateFns).slice(0, 7)
			}

			sciChartSurface.xAxes.add(xAxis)
			sciChartSurface.yAxes.add(yAxis)

			// here we build the data series for each stint
			stints.forEach((stint) => {
				const xyDataSeries = new XyDataSeries(wasmContext, {
					dataSeriesName: `Stint ${stint[0]?.stintId}`,
				})

				// append the X and Y datapoints
				for (let i = 0; i < stint.length; i++) {
					const xValue = stint[i].lapNumber
					// we use filters for highlighting certain stints whiches are selected user previously.
					// E.g. we can highlight the stints with certain driver or car.
					// We have only two highlighted sets which related to blue and red colors.
					// 	isHighlighted1 and isHighlighted1 property received from the API

					// Below I add the highlight property as a metadata
					let highlightedPoint
					if (stint[i].isHighlighted2) {
						highlightedPoint = 2
					} else if (stint[i].isHighlighted1) {
						highlightedPoint = 1
					}

					xyDataSeries.append(
						xValue === null ? NaN : xValue,
						xValue === null || stint[i].lapTime === null
							? NaN
							: stint[i].lapTime,
						highlightedPoint
					)
				}

				// render the grey data series by FastLineRenderableSeries
				const lineSeries = this.setLineSeriesOption(
					4,
					null,
					xyDataSeries,
					wasmContext,
					{
						strokeThickness: 0,
						onHoveredChanged: (sourceSeries, isHovered) => {
							sourceSeries.strokeThickness = isHovered ? 1 : 0
						},
					}
				)

				lineSeries.paletteProvider.overrideStrokeArgb = (
					xValue,
					yValue,
					index,
					opacity,
					metadata
				) => {
					return metadata
						? metadata === 1
							? parseColorToUIntArgb('#42c3fa')
							: parseColorToUIntArgb('#f70f1c')
						: undefined
				}

				const red = parseColorToUIntArgb('#f70f1c')
				const blue = parseColorToUIntArgb('#42c3fa')

				lineSeries.paletteProvider.overridePointMarkerArgb = (
					xValue,
					yValue,
					index,
					opacity,
					metadata
				) => {
					return metadata
						? metadata === 1
							? {
									stroke: blue,
									fill: blue,
							  }
							: {
									stroke: red,
									fill: red,
							  }
						: undefined
				}
				lineSeries.paletteProvider.strokePaletteMode = EStrokePaletteMode.SOLID
				sciChartSurface.renderableSeries.add(lineSeries)
			})

			const customTemplate = (seriesInfos, tooltipTitle) => {
				const valuesWithLabels = []
				if (tooltipTitle) {
					valuesWithLabels.push(tooltipTitle)
				}
				seriesInfos.forEach((xySeriesInfo) => {
					if (xySeriesInfo.isHit) {
						const x = xySeriesInfo.formattedXValue
						const y = this.msToLapTime(
							xySeriesInfo.formattedYValue,
							this.$dateFns
						)
						valuesWithLabels.push(`${xySeriesInfo.seriesName}`)
						valuesWithLabels.push(`Lap Number: ${x} Lap Time: ${y}`)
					}
				})

				return valuesWithLabels
			}

			const cursorModifier = new CursorModifier({
				crosshairStroke: 'transparent',
				crosshairStrokeThickness: 1,
				tooltipContainerBackground: this.chartAxisStyle.tooltipColor,
				tooltipTextStroke: this.chartAxisStyle.color,
				showTooltip: true,
				showAxisLabels: false,
				tooltipDataTemplate: customTemplate,
			})

			cursorModifier.hitTestRenderableSeries = (rs, mousePoint) => {
				return rs.hitTestProvider.hitTestDataPoint(
					mousePoint.x,
					mousePoint.y,
					5
				)
			}

			sciChartSurface.chartModifiers.add(cursorModifier)

			const zoomPanModifier = new ZoomPanModifier({
				xyDirection: EXyDirection.XDirection,
			})
			if (arr.length > 10) {
				sciChartSurface.chartModifiers.add(zoomPanModifier)
			}
		},
		async initTireWearTireAgeChart() {
			if (this.scs_wear_age) {
				this.scs_wear_age.delete()
			}
			const { sciChartSurface, wasmContext } =
				// eslint-disable-next-line no-undef
				await SciChart.SciChartSurface.create('tire_wear_tire_age')
			this.scs_wear_age = sciChartSurface
			const {
				NumericAxis,
				XyDataSeries,
				ZoomPanModifier,
				CursorModifier,
				EAxisAlignment,
				EXyDirection,
				NumberRange,
				ENumericFormat,
				EAutoRange,
				SeriesSelectionModifier,
				// eslint-disable-next-line no-undef
			} = SciChart

			sciChartSurface.background = this.changeBackgroundColorTheme

			sciChartSurface.chartModifiers.add(
				new SeriesSelectionModifier({
					enableHover: true,
				})
			)

			const arr = this.chartTires
			const stints = this.getStintsLapsArray(arr)

			const maxVisibleNumberLF = _.maxBy(
				arr,
				'leftFrontWheelTireAge'
			).leftFrontWheelTireAge

			const maxVisibleNumberRF = _.maxBy(
				arr,
				'rightFrontWheelTireAge'
			).rightFrontWheelTireAge

			const maxVisibleNumberLR = _.maxBy(
				arr,
				'leftRearWheelTireAge'
			).leftRearWheelTireAge

			const maxVisibleNumberRR = _.maxBy(
				arr,
				'rightRearWheelTireAge'
			).rightRearWheelTireAge

			const maxVisibleNumberX = _.max([
				maxVisibleNumberLF,
				maxVisibleNumberRF,
				maxVisibleNumberLR,
				maxVisibleNumberRR,
			])

			const xAxis = new NumericAxis(wasmContext, {
				axisTitle: 'Tire Age',
				axisTitleStyle: this.chartAxisStyle,
				labelStyle: this.chartAxisStyle,
				axisBandsFill: 'transparent',
				labelFormat: ENumericFormat.Decimal,
				labelPrecision: 0,
				minorDelta: 0.2,
				autoTicks: false,
				majorDelta: 1,
				autoRange: EAutoRange.Never,
				visibleRange: new NumberRange(0, maxVisibleNumberX),
				visibleRangeLimit: new NumberRange(0, maxVisibleNumberX + 1),
			})
			const yAxis = new NumericAxis(wasmContext, {
				axisTitle: 'Tire Wear (%)',
				axisTitleStyle: this.chartAxisStyle,
				labelStyle: this.chartAxisStyle,
				labelFormat: ENumericFormat.Decimal,
				labelPrecision: 0,
				cursorLabelFormat: ENumericFormat.Decimal,
				cursorLabelPrecision: 2,
				autoRange: EAutoRange.Never,
				axisBandsFill: 'transparent',
				axisAlignment: EAxisAlignment.Left,
				visibleRange: new NumberRange(-1, 101),
				visibleRangeLimit: new NumberRange(-1, 101),
			})

			sciChartSurface.xAxes.add(xAxis)
			sciChartSurface.yAxes.add(yAxis)

			const legend = this.setLegendOptions(sciChartSurface, 'BottomRight')

			sciChartSurface.chartModifiers.add(legend)

			stints.forEach((stint) => {
				const leftFrontDataSeries = new XyDataSeries(wasmContext, {
					dataSeriesName: `Stint ${stint[0]?.stintId} Left front`,
				})

				const leftRearDataSeries = new XyDataSeries(wasmContext, {
					dataSeriesName: `Stint ${stint[0]?.stintId} Left rear`,
				})

				const rightFrontDataSeries = new XyDataSeries(wasmContext, {
					dataSeriesName: `Stint ${stint[0]?.stintId} Right front`,
				})

				const rightRearDataSeries = new XyDataSeries(wasmContext, {
					dataSeriesName: `Stint ${stint[0]?.stintId} Right rear`,
				})

				for (let i = 0; i < stint.length; i++) {
					if (stint[i].leftFrontWheelTireAge !== null) {
						leftFrontDataSeries.append(
							stint[i].leftFrontWheelTireAge,
							stint[i].leftFrontWheelTireWearFormatted === null
								? NaN
								: stint[i].leftFrontWheelTireWearFormatted,
							this.getHighlightedValue(stint[i])
						)
					}
					if (stint[i].leftRearWheelTireAge) {
						leftRearDataSeries.append(
							stint[i].leftRearWheelTireAge,
							stint[i].leftRearWheelTireWearFormatted === null
								? NaN
								: stint[i].leftRearWheelTireWearFormatted,
							this.getHighlightedValue(stint[i])
						)
					}
					if (stint[i].rightFrontWheelTireAge) {
						rightFrontDataSeries.append(
							stint[i].rightFrontWheelTireAge,
							stint[i].rightFrontWheelTireWearFormatted === null
								? NaN
								: stint[i].rightFrontWheelTireWearFormatted,
							this.getHighlightedValue(stint[i])
						)
					}
					if (stint[i].rightRearWheelTireAge) {
						rightRearDataSeries.append(
							stint[i].rightRearWheelTireAge,
							stint[i].rightRearWheelTireWearFormatted === null
								? NaN
								: stint[i].rightRearWheelTireWearFormatted,
							this.getHighlightedValue(stint[i])
						)
					}
				}

				const dataArr = [
					leftFrontDataSeries,
					rightFrontDataSeries,
					leftRearDataSeries,
					rightRearDataSeries,
				]

				for (let i = 0; i < dataArr.length; i++) {
					const lineSeries = this.setLineSeriesOption(
						4,
						null,
						dataArr[i],
						wasmContext,
						{
							strokeThickness: 0,
							onHoveredChanged: (sourceSeries, isHovered) => {
								sourceSeries.strokeThickness = isHovered ? 1 : 0
							},
						}
					)

					this.setHighlightedColors(lineSeries)

					sciChartSurface.renderableSeries.add(lineSeries)
				}
			})
			const customTemplate = (seriesInfos, tooltipTitle) => {
				const valuesWithLabels = []
				if (tooltipTitle) {
					valuesWithLabels.push(tooltipTitle)
				}
				seriesInfos.forEach((xySeriesInfo) => {
					if (xySeriesInfo.isHit) {
						const x = xySeriesInfo.formattedXValue
						const y = xySeriesInfo.formattedYValue
						valuesWithLabels.push(`${xySeriesInfo.seriesName}`)
						valuesWithLabels.push(`Tire Age: ${x} ; Tire wear: ${y}`)
					}
				})

				return valuesWithLabels
			}
			const cursorModifier = new CursorModifier({
				crosshairStroke: 'transparent',
				crosshairStrokeThickness: 1,
				tooltipContainerBackground: this.chartAxisStyle.tooltipColor,
				tooltipTextStroke: this.chartAxisStyle.color,
				showTooltip: true,
				showAxisLabels: false,
				tooltipDataTemplate: customTemplate,
			})

			cursorModifier.hitTestRenderableSeries = (rs, mousePoint) => {
				if (!mousePoint) {
					return undefined
				}
				return rs.hitTestProvider.hitTestDataPoint(
					mousePoint.x,
					mousePoint.y,
					5
				)
			}

			sciChartSurface.chartModifiers.add(cursorModifier)

			const zoomPanModifier = new ZoomPanModifier({
				xyDirection: EXyDirection.XDirection,
			})

			sciChartSurface.chartModifiers.add(zoomPanModifier)
		},
	},
}
</script>
