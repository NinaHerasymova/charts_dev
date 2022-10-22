<script>
export default {
	name: 'ChartMixins',
	data() {
		return {
			colorArr: ['#42c3fa', '#f70f1c', '#fabd38', '#06f906', '#a5a5a5'],
			emptyChartText: 'Sorry, data for this chart is empty :(',
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

		changeBackgroundColorTheme() {
			return this.$colorMode.preference === 'dark' ? 'transparent' : '#FFFFFF'
		},
	},
	methods: {
		msToLapTime(
			duration,
			dateFns = this.$dateFns,
			removeMilliseconds = false,
			diff = false
		) {
			if (!duration || !dateFns) return
			let time = ''
			const t = dateFns.addMilliseconds(new Date(0), duration * 1000)

			if (duration * 1000 >= 3600000) {
				time = !removeMilliseconds
					? dateFns.format(dateFns.addHours(t, -1), 'hh:mm:ss.SSS')
					: dateFns.format(dateFns.addHours(t, -1), 'hh:mm:ss')

				if (diff) {
					time = dateFns.format(t, '+h:ss.SSS')
				}
			} else {
				time = !removeMilliseconds
					? dateFns.format(t, 'mm:ss.SSS')
					: dateFns.format(t, 'mm:ss')

				if (diff) {
					time = dateFns.format(t, '+s.SSS')
				}
			}

			return time
		},
		checkDataArray(arr, property) {
			return !arr.every((item) => item[property] === null)
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
		maxVisibleNumberX(arr) {
			if (arr.length <= 10) {
				return 11
			} else if (arr.length > 10 && arr.length < 50) {
				return arr.length
			} else {
				return 50
			}
		},
		setLineSeriesOption(
			index,
			yId,
			dataSeries,
			wasmContext,
			options,
			opacity = 1
		) {
			const {
				FastLineRenderableSeries,
				EllipsePointMarker,
				// eslint-disable-next-line no-undef
			} = SciChart

			const lineSeriesOptions = {
				stroke: this.colorArr[index],
				strokeThickness: 3,
				yAxisId: yId,
				isVisible: true,
				dataSeries,
				pointMarker: new EllipsePointMarker(wasmContext, {
					width: 5,
					height: 5,
					strokeThickness: 0,
					fill: this.colorArr[index],
					opacity,
				}),
				...options,
			}
			if (yId) {
				lineSeriesOptions.yAxisId = yId
			}

			return new FastLineRenderableSeries(wasmContext, lineSeriesOptions)
		},
		// Related to event page charts
		getStintsLapsArray(arr) {
			const temp = {}
			arr.forEach((item) => {
				if (temp[item.stintId]) {
					temp[item.stintId].push(item)
				} else {
					temp[item.stintId] = [item]
				}
			})
			return Object.keys(temp).map((key) => {
				return temp[key]
			})
		},
		getHighlightedArray(arr, highlight, prop) {
			return arr.map((item) => {
				if (!item[highlight]) {
					return {
						...item,
						[prop]: null,
					}
				} else {
					return item
				}
			})
		},
		getHighlightedValue(point) {
			let highlightedPoint
			if (point.isHighlighted2) {
				highlightedPoint = 2
			} else if (point.isHighlighted1) {
				highlightedPoint = 1
			}
			return highlightedPoint
		},
		setHighlightedColors(lineSeries) {
			const {
				parseColorToUIntArgb,
				EStrokePaletteMode,
				// eslint-disable-next-line no-undef
			} = SciChart

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
			lineSeries.paletteProvider.overrideStrokeArgb = (
				xValue,
				yValue,
				index,
				opacity,
				metadata
			) => {
				return metadata ? (metadata === 1 ? blue : red) : undefined
			}

			lineSeries.paletteProvider.strokePaletteMode = EStrokePaletteMode.SOLID
		},
	},
}
</script>
