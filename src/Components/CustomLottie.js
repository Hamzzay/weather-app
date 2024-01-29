// LottieIcons.js
import React from 'react';
import {View, StyleSheet} from 'react-native';
import LottieView from 'lottie-react-native';
import {useThemeAwareObject} from '../theme';
import {hp, wp} from '../util';
const LottieIcons = props => {
  const {weatherCondition, style} = props;
  const createStyles = () => {
    const themeStyles = StyleSheet.create({
      img: {
        height: hp(10),
        width: wp(15),
      },
    });
    return themeStyles;
  };
  const styles = useThemeAwareObject(createStyles);
  let animationSource;

  switch (weatherCondition) {
    case '01d':
      animationSource = require('../../assets/lottieFiles/sun.json');
      break;
    case '01n':
      animationSource = require('../../assets/lottieFiles/moon.json');
      break;
    case '02d':
      animationSource = require('../../assets/lottieFiles/cloudySun.json');
      break;
    case '02n':
      animationSource = require('../../assets/lottieFiles/cloudyMoon.json');
      break;
    case '03d':
      animationSource = require('../../assets/lottieFiles/clouds.json');
      break;
    case '03n':
      animationSource = require('../../assets/lottieFiles/clouds.json');
      break;
    case '04d':
      animationSource = require('../../assets/lottieFiles/scrachetNight.json');
      break;
    case '04n':
      animationSource = require('../../assets/lottieFiles/scrachetDay.json');
      break;
    case '09d':
      animationSource = require('../../assets/lottieFiles/lightRain.json');
      break;
    case '09n':
      animationSource = require('../../assets/lottieFiles/lightRain.json');
      break;
    case '10d':
      animationSource = require('../../assets/lottieFiles/rain.json');
      break;
    case '10n':
      animationSource = require('../../assets/lottieFiles/rain.json');
      break;
    case '11d':
      animationSource = require('../../assets/lottieFiles/thunderDay.json');
      break;
    case '11n':
      animationSource = require('../../assets/lottieFiles/thunderNight.json');
      break;
    case '13d':
      animationSource = require('../../assets/lottieFiles/snow.json');
      break;
    case '13n':
      animationSource = require('../../assets/lottieFiles/snow.json');
      break;

    case '50d':
      animationSource = require('../../assets/lottieFiles/misty.json');
      break;
    case '50n':
      animationSource = require('../../assets/lottieFiles/misty.json');
      break;
    default:
      animationSource = null; // Set a default animation source or handle accordingly
  }

  return (
    <View>
      {animationSource && (
        <LottieView
          style={[styles.img, style]}
          source={animationSource}
          autoPlay
          loop
        />
      )}
    </View>
  );
};

export default LottieIcons;
