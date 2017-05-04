import React, {Component, PropTypes} from 'react';
import { Dimensions, Platform, View } from 'react-native';
import { getScreenSize } from '../lib/ScreenSize';

class Grid extends Component {

  constructor() {
    super();
    this.state = {
      screenSize: getScreenSize()
    };
    if (Platform.OS === 'web') {
      window.addEventListener("resize", () => {
        this.setState({
          screenSize: getScreenSize()
        });
      });
    } else {
      Dimensions.addEventListener('change', () => {
        this.setState({
          screenSize: getScreenSize()
        });
      });
    }
  }

  getChildContext() {
    return {
      screenSize: this.state.screenSize
    };
  }

  render() {
    const {children, ...rest} = this.props
    return <View {...rest}>{children}</View>;
  }
}

Grid.childContextTypes = {
  screenSize: PropTypes.string
};

export default Grid;
