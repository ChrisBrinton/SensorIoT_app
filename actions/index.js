export const yAxisTypes = {
  TempF: 'TempF',
  TempC: 'TempC',
  Hum: 'Hum',
  Pres: 'Pres',
  Batt: 'Batt',
}

export const setYAxisType = type => ({
  type: 'SET_Y_AXIS_TYPE',
  yAxisType: type,
})

export const setYAxisRange = (min, max) => ({
  type: 'SET_Y_AXIS_RANGE',
  yAxisMin: min,
  yAxisMax: max,
})

export const setXDateRange = (days) => ({
  type: 'SET_X_DATE_RANGE',
  xDateRange: days,
})

export const toggleNode = (nodeIndex) => ({
  type: 'TOGGLE_NODE',
  nodeIndex: nodeIndex,
})

export const toggleTempType = () => ({
  type: 'TOGGLE_TEMP_TYPE',
})

export const setMQTTServer = value => ({
  type: 'SET_MQTT_SERVER',
  myMQTTServer: value,
})

export const setGatewayID = value => ({
  type: 'SET_GATEWAY_ID',
  myGatewayID: value,
})
