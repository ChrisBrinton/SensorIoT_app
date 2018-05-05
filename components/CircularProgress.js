import React from 'react';
import PropTypes from 'prop-types';
import { View, ViewPropTypes, Platform, ART, AppState } from 'react-native';
const { Surface, Shape, Path, Group } = ART;

export default class CircularProgress extends React.Component {

  state = {
    // We need to track this to mitigate a bug with RN ART on Android.
    // After being unlocked the <Surface> is not rendered.
    // To mitigate this we change the key-prop to forcefully update the <Surface>
    // It's horrible.
    // See https://github.com/facebook/react-native/issues/17565
    appState: AppState.currentState,
  }

  circlePath(cx, cy, r, startDegree, endDegree) {
    let p = Path();
    p.path.push(0, cx + r, cy);
    p.path.push(4, cx, cy, r, startDegree * Math.PI / 180, (endDegree * .9999) * Math.PI / 180, 1);
    return p;
  }

  clampFill = fill => Math.min(100, Math.max(0, fill));

  componentDidMount = () => AppState.addEventListener('change', this.handleAppStateChange);
  
  componentWillUnmount = () => AppState.removeEventListener('change', this.handleAppStateChange);

  handleAppStateChange = appState => this.setState({ appState });

  render() {
    const {
      size,
      width,
      backgroundWidth,
      tintColor,
      backgroundColor,
      style,
      rotation,
      lineCap,
      arcSweepAngle,
      renderChild,
      fill,
      value,
    } = this.props;

    const backgroundPath = this.circlePath(size / 2, size / 2, size / 2 - width / 2, 0, arcSweepAngle);
    const circlePath = this.circlePath(size / 2, size / 2, size / 2 - width / 2, 0, arcSweepAngle * this.clampFill(fill) / 100);
    const offset = size - (width * 2);

    const childContainerStyle = {
      position: 'absolute',
      left: width,
      top: width,
      width: offset,
      height: offset,
      borderRadius: offset / 2,
      alignItems: 'center',
      justifyContent: 'center'
    };

    return (
      <View style={style}>
        <Surface
          width={size}
          height={size}
          key={this.state.appState}
          style={{ backgroundColor: 'transparent' }}
        >
          <Group rotation={rotation - 90} originX={size/2} originY={size/2}>
            { backgroundColor && (
              <Shape
                d={backgroundPath}
                stroke={backgroundColor}
                strokeWidth={backgroundWidth || width}
                strokeCap={lineCap}
              />
            )}
            <Shape
              d={circlePath}
              stroke={tintColor}
              strokeWidth={width}
              strokeCap={lineCap}
            />
          </Group>
        </Surface>
        {renderChild && (
          <View style={childContainerStyle}>
            {renderChild(value)}
          </View>
        )}
      </View>
    );
  }
}

CircularProgress.propTypes = {
  style: ViewPropTypes.style,
  size: PropTypes.number.isRequired,
  fill: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  backgroundWidth: PropTypes.number,
  tintColor: PropTypes.string,
  backgroundColor: PropTypes.string,
  rotation: PropTypes.number,
  lineCap: PropTypes.string,
  arcSweepAngle: PropTypes.number,
  renderChild: PropTypes.func
};

CircularProgress.defaultProps = {
  tintColor: 'black',
  rotation: 90,
  lineCap: 'butt',
  arcSweepAngle: 360
};