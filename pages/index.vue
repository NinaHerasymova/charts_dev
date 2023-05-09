<template>
	<section class="section pt-4">
		<ChartBlock
			:chart-ids="[
				'channel_0',
				'channel_1',
				'channel_2',
				'channel_3',
				'channel_4',
			]"
			multiple-roots
			reduce-width
			:counter="4"
			:decimals="2"
		/>
	</section>
</template>

<script>
import { sortBy } from 'lodash'
import ChartMixins from '~/mixins/ChartMixins'
export default {
	name: 'TelemetryChannels',
	mixins: [ChartMixins],
	fetchOnServer: false,
	data() {
		return {
			chartsArr: {
				laps: [
					{
						order: 1,
						stintNumber: 1,
						lapNumber: 1,
						startTime: 0,
						startTimeFormatted: '00:00:00',
						startTimeMinutes: 0,
						endTime: 77.0000024414062,
						endTimeFormatted: '00:01:17',
						endTimeMinutes: 1.2833333740234365,
						lapState: 'OUT',
						longAcc: 1.0547459125518799,
						longBrk: 1.602734088897705,
						latLeft: 1.132718563079834,
						latRight: 1.1657699346542358,
					},
					{
						order: 2,
						stintNumber: 1,
						lapNumber: 2,
						startTime: 77,
						startTimeFormatted: '00:01:17',
						startTimeMinutes: 1.2833333333333334,
						endTime: 182.4000268554687,
						endTimeFormatted: '00:03:02',
						endTimeMinutes: 3.040000447591145,
						lapState: 'OK',
						longAcc: 0.9717572331428528,
						longBrk: 1.7463185787200928,
						latLeft: 1.6178115606307983,
						latRight: 1.6248233318328857,
					},
					{
						order: 3,
						stintNumber: 1,
						lapNumber: 3,
						startTime: 182.39999999999998,
						startTimeFormatted: '00:03:02',
						startTimeMinutes: 3.0399999999999996,
						endTime: 247.0000024414062,
						endTimeFormatted: '00:04:07',
						endTimeMinutes: 4.11666670735677,
						lapState: 'OK',
						longAcc: 0.9256117343902588,
						longBrk: 1.901135802268982,
						latLeft: 1.404805302619934,
						latRight: 2.1533501148223877,
					},
					{
						order: 4,
						stintNumber: 1,
						lapNumber: 4,
						startTime: 247,
						startTimeFormatted: '00:04:07',
						startTimeMinutes: 4.116666666666666,
						endTime: 307.39996582031245,
						endTimeFormatted: '00:05:07',
						endTimeMinutes: 5.123332763671874,
						lapState: 'OK',
						longAcc: 1.080358624458313,
						longBrk: 1.9328335523605347,
						latLeft: 1.8437288999557495,
						latRight: 2.248526096343994,
					},
					{
						order: 5,
						stintNumber: 1,
						lapNumber: 5,
						startTime: 307.39999999999986,
						startTimeFormatted: '00:05:07',
						startTimeMinutes: 5.123333333333331,
						endTime: 367.60003906249995,
						endTimeFormatted: '00:06:07',
						endTimeMinutes: 6.126667317708333,
						lapState: 'OK',
						longAcc: 1.0866506099700928,
						longBrk: 1.9690399169921875,
						latLeft: 8.8705698251724243,
						latRight: 2.415987968444824,
					},
					{
						order: 6,
						stintNumber: null,
						lapNumber: 6,
						startTime: null,
						startTimeFormatted: null,
						startTimeMinutes: null,
						endTime: null,
						endTimeFormatted: null,
						endTimeMinutes: null,
						lapState: null,
						longAcc: null,
						longBrk: null,
						latLeft: null,
						latRight: null,
					},
				],
			},
			loading: false,
			updateIntervalId: null,
		}
	},
	computed: {},
	async mounted() {
		// eslint-disable-next-line no-undef
		SciChart.SciChartSurface.configure({
			dataUrl:
				'https://cdn.jsdelivr.net/npm/scichart@3.0.266/_wasm/scichart2d.data',
			wasmUrl:
				'https://cdn.jsdelivr.net/npm/scichart@3.0.266/_wasm/scichart2d.wasm',
		})
		// eslint-disable-next-line no-undef
		SciChart.SciChartSurface.setRuntimeLicenseKey(
			'zEK8PMFIkjlIdKHhWt5fJxwtTfV5rjvAh8BWpFy1M/sy8Xzk9VZMR8QjEIiY16Z8DThW4HG8UEXEYG/tnAH25wfV6BFILWwe6ail8byWzcaTdPms1cTsaDNVnz2yKeL2He3NAtHn+HSKm4pCOlsP63Rs7vk5VpxU7WwlRx5lkHZ5UipZOanYOclZuPa4L5d1pvcwwdLlBnmU7p0ThWY4QsPmpc9yV3OrgbZqTGr5w/VQErITP/sOZ7E0TzbC6Sg/qITF+F4RO+Qo5mefhOF68Cqo7oWDFQg4dZjmx4uo7f0wpwNerq/QjHCnv7uE+8CbSuDUA1sEPpiMpO7AShT6EIMKpR7G9xoyncyDfTUPZUzP/Q6mY+YI7Ew6tTlKFnZ2jFhTsczI1NQfHRgDSLTfxASqeXqJnealV61yjU7sTwMKYG+EXOA8+9N5EHyHoYjLHTKxlRsJwOKBn4ZwH5AOdU8reyqSS8/hcCwrdSkF3oRxnlFQPB/28SQ5oi4mUD0FUNmB+t5LjNCzzAbt+/wrA8PQpzC1lbmEHvy6oQ3pmUPGBWTPX4885bbKXdZeEtqPndU2RMpC+iQmhrmXq9TikXzF5/Oai8fWnr6b8W4kwME4+ap2mbMvQ+tDmLPgztiLmwKKSWS2BvApdGRxz9/sc7YxKjmGXcHtFxt4sylalxbhg3LJHxMmGbleL8Jrtrfh'
		)
		await this.initDataTelemetryChart()
		this.updateIntervalId = setInterval(() => {
			for (let i = 0; i < 5; i++) {
				this.updateDataFunc(
					this[`scs_channel_${i}_data`],
					this[`scs_channel${i}`]
				)
			}
		}, 1000)
	},
	methods: {
		async initDataTelemetryChart() {
			const {
				NumericAxis,
				XyDataSeries,
				EAxisAlignment,
				RolloverModifier,
				ZoomPanModifier,
				MouseWheelZoomModifier,
				ENumericFormat,
				EAutoRange,
				SciChartVerticalGroup,
				// eslint-disable-next-line no-undef
			} = SciChart

			const verticalGroup = new SciChartVerticalGroup()

			const arr = sortBy(
				this.chartsArr.laps.filter((item) => item.startTimeMinutes !== null),
				'startTimeMinutes'
			)

			const dataSeriesArr = [
				{
					title: 'Speed',
					value: 'longAcc',
				},
				{
					title: 'Throttle + Brake',
					value: 'longBrk',
				},
				{
					title: 'Steering Angle',
					value: 'latLeft',
				},
				{
					title: 'Gear',
					value: 'latRight',
				},
				{
					title: 'RPM',
					value: 'longAcc',
				},
			]

			const chartsArr = []

			const xAxisArr = []

			for (let i = 0; i < dataSeriesArr.length; i++) {
				if (this[`scs_channel${i}`]) {
					this[`scs_channel${i}`].delete()
				}
				const drawChart = async () => {
					const { sciChartSurface, wasmContext } =
						// eslint-disable-next-line no-undef
						await SciChart.SciChartSurface.create(`channel_${i}`, {
							heightAspect: 150,
						})

					this[`scs_channel${i}`] = sciChartSurface

					sciChartSurface.background = this.changeBackgroundColorTheme

					const xAxis = new NumericAxis(wasmContext, {
						drawLabels: i === dataSeriesArr.length - 1,
						axisTitle: i === dataSeriesArr.length - 1 ? 'Lap Time' : '',
						axisTitleStyle: this.chartAxisStyle,
						labelStyle: this.chartAxisStyle,
						axisBandsFill: 'transparent',
						autoRange: EAutoRange.Never,
						minorDelta: 0.2,
						autoTicks: false,
						majorDelta: 1,
						labelFormat: ENumericFormat.Decimal,
						labelPrecision: 0,
						cursorLabelPrecision: 2,
						// visibleRange: new NumberRange(-0.5, 5),
						// visibleRangeLimit: new NumberRange(-0.5, 15),
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

					sciChartSurface.xAxes.add(xAxis)
					sciChartSurface.yAxes.add(yAxis)

					const dataSeries = new XyDataSeries(wasmContext)
					this[`scs_channel_${i}_data`] = dataSeries

					for (let j = 0; j < arr.length; j++) {
						dataSeries.append(
							arr[j].startTimeMinutes,
							arr[j][dataSeriesArr[i].value] === null
								? NaN
								: arr[j][dataSeriesArr[i].value]
						)
					}

					const lineSeries = this.setLineSeriesOption(
						0,
						`yAxis${i + 1}`,
						dataSeries,
						wasmContext
					)

					this.setTooltipOptions(
						lineSeries,
						'Time',
						`; ${dataSeriesArr[i].title}`
					)

					sciChartSurface.renderableSeries.add(lineSeries)

					sciChartSurface.chartModifiers.add(new MouseWheelZoomModifier())

					sciChartSurface.chartModifiers.add(
						new RolloverModifier({
							rolloverLineStroke: this.chartAxisStyle.dividerColor,
							modifierGroup: 'first',
						})
					)
					sciChartSurface.chartModifiers.add(new ZoomPanModifier())

					verticalGroup.addSurfaceToGroup(sciChartSurface)
					return { wasmContext, sciChartSurface }
				}
				chartsArr.push(drawChart())
			}
			return await Promise.all(chartsArr)
		},
		updateDataFunc(dataSeries, sciChartSurface) {
			const {
				NumberRange,
				// eslint-disable-next-line no-undef
			} = SciChart

			const xAxis = sciChartSurface.xAxes.get(0)
			const yAxis = sciChartSurface.yAxes.get(0)

			const yValues = dataSeries.getNativeYValues()
			const xValues = dataSeries.getNativeXValues()
			const lastDataPoint = dataSeries.count() - 1
			dataSeries.append(
				xValues.get(lastDataPoint) + 0.5,
				yValues.get(lastDataPoint) + 0.1
			)
			xAxis.visibleRange = new NumberRange(
				xValues.get(lastDataPoint) <= 6 ? 0 : xValues.get(lastDataPoint) - 6,
				xValues.get(lastDataPoint) + 1
			)
			yAxis.visibleRange = new NumberRange(
				yValues.get(lastDataPoint) <= 6 ? 0 : yValues.get(lastDataPoint) - 6,
				yValues.get(lastDataPoint) + 1
			)

			// sciChartSurface.zoomExtents()
		},
	},
}
</script>
