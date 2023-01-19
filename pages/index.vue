<template>
	<section class="container pt-4">
		<div class="columns has-text-centered">
			<div class="column chart-column">
				<div id="tire_wear_tire_age" class="chart-wrapper" />
				<div class="is-flex is-flex-direction-column">
					<div
						v-for="(item, idx) in chartTires.stats"
						:key="item.max * idx"
						class="stats"
					>
						<p class="stats__item">
							<span class="stats__label">Max:</span>
							<span>{{ item.max.toFixed(1) }} s</span>
						</p>
						<p class="stats__item">
							<span class="stats__label">Min:</span>
							<span>{{ item.min.toFixed(1) }} s</span>
						</p>
						<p class="stats__item">
							<span class="stats__label">Avg:</span>
							<span>{{ item.avg.toFixed(1) }} s</span>
						</p>
						<p class="stats__item">
							<span class="stats__label">Dev:</span>
							<span>{{ item.dev.toFixed(1) }} s</span>
						</p>
					</div>
					<div v-if="pointStats" class="stats">
						<p class="stats__item">
							<span class="stats__label">Max:</span>
							<span>{{ pointStats.wearAvg.toFixed(1) }} s</span>
						</p>
						<p class="stats__item">
							<span class="stats__label">Min:</span>
							<span>{{ pointStats.wearSD.toFixed(1) }} s</span>
						</p>
						<p class="stats__item">
							<span class="stats__label">Avg:</span>
							<span>{{ pointStats.ageAvg.toFixed(1) }} s</span>
						</p>
						<p class="stats__item">
							<span class="stats__label">Avg:</span>
							<span>{{ pointStats.ageSD.toFixed(1) }} s</span>
						</p>
						<p class="stats__item">
							<span class="stats__label">Avg:</span>
							<span>{{ pointStats.avgROC.toFixed(1) }} s</span>
						</p>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
import _, { sortBy } from 'lodash'
import ChartMixins from '../mixins/ChartMixins'
import { chartTires } from '~/utils/data'

export default {
	mixins: [ChartMixins],
	data() {
		return {
			chartTires,
			pointStats: null,
		}
	},
	async mounted() {
		await this.initChart()
		await this.initTireWearTireAgeChart()
	},
	methods: {
		sortBy,
		initChart() {
			// eslint-disable-next-line no-undef
			SciChart.SciChartSurface.configure({
				dataUrl:
					// 'https://cdn.jsdelivr.net/npm/scichart@3.0.266/_wasm/scichart2d.data',
					'https://cdn.jsdelivr.net/npm/scichart@2.2.2415/_wasm/scichart2d.data',
				wasmUrl:
					// 'https://cdn.jsdelivr.net/npm/scichart@3.0.266/_wasm/scichart2d.wasm',
					'https://cdn.jsdelivr.net/npm/scichart@2.2.2415/_wasm/scichart2d.wasm',
			})
			// eslint-disable-next-line no-undef
			SciChart.SciChartSurface.setRuntimeLicenseKey(
				'0z6W4et78D021vPad9mjMkyfss0UL5xZ7HjZob0zGc3/CXd2QIUrYoOTaFrUos6LHbE3WCY2fxx5uXY/N8690ywIuvwZZTTpAc0MuLW4WJvYELWbvz/vaX+K6+qAPWuf8L5CGjEUItfIRzWME368bX3p14j7AlcIRvrwvQ7AtPViK0Cz36djmsxjqQl28HIYwlI4padwvxFc5mejZnJf2pYwuti+PciVX3ajJhWkwO1U++32A3mEPogSIlFjNT8VD+9/se6AZU5lx6fnP94RB3lPN4hdeZpwgn9+1ay1Y0LtyxK/k6/SnwHkHb+bMZyrVMcBeXvbt1HA0khyiY6C0NpvvegWrTKaaoGmdv2oekrVssT6vfAnvVRR3EmIIA6lc4/RZ0+BPq12CwaGNYyvuUFL2db51CVUtmwPNMH2C7rAuuED/P/NeIKhxw5adGB7CjkkJ5E2VodqQPS4BF9yG6uXXPMHVRj14t0CdsbymNsVGMBex1sG0mIenbcZ5HBOQVBVDFp1DxuwU2kVvGj7V7CJhd7tgJnD3HCq7lQYdeLzGsTwtEHYgt84IWIADNjDR3lBtfCoiOXkUt7oD6yhN904FOiZg2lQsd6tfY+K6dv3vFtMD1rH7MeERh16bwwPrGrKMbjSVlnYcxNWKOpM9/HLWpRvOSGpbvwxOLbRtJBFHBS24bUg1UfhbKBCJKzBe76NYtzJZYxyK4L5XVg='
			)
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

			const arr = this.chartTires.laps
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
				visibleRange: new NumberRange(0, maxVisibleNumberX + 1),
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
				visibleRange: new NumberRange(90, 102),
				visibleRangeLimit: new NumberRange(90, 102),
			})

			sciChartSurface.xAxes.add(xAxis)
			sciChartSurface.yAxes.add(yAxis)

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
							{
								highlight: this.getHighlightedValue(stint[i]),
								wearAvg: 0,
								wearSD: 0,
								ageAvg: 0,
								ageSD: 0,
								avgROC: 0,
							}
						)
					}
					if (stint[i].leftRearWheelTireAge) {
						leftRearDataSeries.append(
							stint[i].leftRearWheelTireAge,
							stint[i].leftRearWheelTireWearFormatted === null
								? NaN
								: stint[i].leftRearWheelTireWearFormatted,
							{
								highlight: this.getHighlightedValue(stint[i]),
								wearAvg: 0,
								wearSD: 0,
								ageAvg: 0,
								ageSD: 0,
								avgROC: 0,
							}
						)
					}
					if (stint[i].rightFrontWheelTireAge) {
						rightFrontDataSeries.append(
							stint[i].rightFrontWheelTireAge,
							stint[i].rightFrontWheelTireWearFormatted === null
								? NaN
								: stint[i].rightFrontWheelTireWearFormatted,
							{
								highlight: this.getHighlightedValue(stint[i]),
								wearAvg: 0,
								wearSD: 0,
								ageAvg: 0,
								ageSD: 0,
								avgROC: 0,
							}
						)
					}
					if (stint[i].rightRearWheelTireAge) {
						rightRearDataSeries.append(
							stint[i].rightRearWheelTireAge,
							stint[i].rightRearWheelTireWearFormatted === null
								? NaN
								: stint[i].rightRearWheelTireWearFormatted,
							{
								highlight: this.getHighlightedValue(stint[i]),
								wearAvg: 0,
								wearSD: 0,
								ageAvg: 0,
								ageSD: 0,
								avgROC: 0,
							}
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
						this.pointStats = xySeriesInfo.pointMetadata
					}
				})
				if (!valuesWithLabels.length) {
					this.pointStats = null
				}
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
