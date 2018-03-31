export const setYAxisScale = scale => ({
  type: 'SET_Y_AXIS_SCALE',
  scale: scale,
})

export const setYAxisRange = (min, max) => ({
  type: 'SET_Y_AXIS_RANGE',
  min: min,
  max: max,
})

export const yAxisScales = {
  TEMP_F: 'TEMP_F',
  TEMP_C: 'TEMP_C',
  HUM: 'HUM',
  PRES: 'PRES',
  BATT: 'BATT',
}
