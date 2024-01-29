import {
  View,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  ScrollView,
  ImageBackground,
  RefreshControl,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useThemeAwareObject} from '../../../theme';
import createStyles from './style';
import Text from '../../../Components/CustomText';
import Icon from 'react-native-vector-icons/Ionicons';
import Container from '../../../Components/Container';
import Header from '../../../Components/CustomHeader';
import {colors} from '../../../constants';
import {LineChart} from 'react-native-chart-kit';
import LottieIcons from '../../../Components/CustomLottie';
import LottieView from 'lottie-react-native';
import {wp, hp} from '../../../util';
import Snackbar from '../../../Components/CustomSnackbar';
import BackgroundGif from '../../../Components/CustomBackground';
export default function Detailweather(props) {
  const {city} = props.route.params;
  const styles = useThemeAwareObject(createStyles);
  const API_key = '639371a91c642c097c9a558d4c685123';
  const [weatherData, setWeatherData] = useState([]);
  const [currentWeather, setCurrentWeather] = useState();
  const [weatherTime, setWeatherTime] = useState([]);
  const handleWeekWeather = async () => {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&mode=object&appid=${API_key}`,
      );
      if (res.status == 200) {
        const data = await res.json();
        const currentDate = new Date().toISOString().split('T')[0];
        const dailyData = extractOneDayOneTimeData(data.list, currentDate);
        setWeatherData(dailyData);
        const listArray = Array.isArray(data.list) ? data.list : [];
        setWeatherTime(listArray);
      } else {
        console.error('Failed to fetch weather data');
      }
    } catch (error) {
      Snackbar(error.message, true);
    }
  };
  useEffect(() => {
    handleWeekWeather();
  }, []);
  const handleCurrentWeather = async () => {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_key}`,
      );
      if (res.status == 200) {
        const data = await res.json();
        setCurrentWeather(data);
      } else {
        console.error('Failed to fetch weather data');
      }
    } catch (error) {
      Snackbar(error.message, true);
    }
  };
  useEffect(() => {
    handleCurrentWeather();
  }, []);

  const extractOneDayOneTimeData = (data, currentDate) => {
    const result = {};

    data.forEach(item => {
      const date = item.dt_txt.split(' ')[0];
      if (date !== currentDate) {
        // Skip the current day's data
        if (!result[date]) {
          result[date] = {
            date,
            temperatures: [item.main.temp],
            icon: item.weather[0].icon,
            main: item.weather[0].main,
          };
        } else {
          result[date].temperatures.push(item.main.temp);
        }
      }
    });

    return result;
  };

  const calculateAverageTemp = temperatures => {
    if (Array.isArray(temperatures) && temperatures.length > 0) {
      const totalTemp = temperatures.reduce(
        (sum, temp) => sum + (temp - 273.15),
        0,
      );
      const averageTemp = totalTemp / temperatures.length;
      return averageTemp.toFixed(2);
    } else {
      return 'N/A'; // or any default value you prefer
    }
  };
  const currentDayData =
    weatherTime &&
    weatherTime.filter(item =>
      item.dt_txt.includes(new Date().toISOString().split('T')[0]),
    );
  const temperaturesOfDay = currentDayData.map(item => {
    const tempInKelvin = item?.main?.temp;

    if (typeof tempInKelvin === 'number' && !isNaN(tempInKelvin)) {
      return Math.round(tempInKelvin - 273.15);
    } else {
      return null; // or any default value indicating missing/invalid data
    }
  });

  const renderDotContent = ({x, y, index}) => {
    const temperatureValue = temperaturesOfDay[index];
    return (
      <View
        key={index}
        style={{position: 'absolute', top: y - 21, left: x - 22, zIndex: 2}}>
        <Text style={{color: 'white', fontSize: 16}}>{`${Math.round(
          temperatureValue,
        )}°C`}</Text>
      </View>
    );
  };
  const test = () => {
    const weatherCondition = currentWeather?.weather[0]?.icon;
    const backgroundImage = BackgroundGif({backgroundImage: weatherCondition});
    return backgroundImage;
  };

  const onRefresh = () => {
    setWeatherData([]);
    setCurrentWeather(undefined);
    handleCurrentWeather();
    handleWeekWeather();
  };
  return (
    <Container>
      {currentWeather === undefined || weatherData.length === 1 ? (
        <ActivityIndicator
          size="large"
          color={colors.white}
          style={styles.mainIndicator}
        />
      ) : (
        <ImageBackground
          style={styles.backGroundImage}
          resizeMode="cover"
          source={test()}>
          <View style={styles.mainContainer}>
            <Header
              leftComponent={
                <TouchableOpacity
                  onPress={() => props.navigation.goBack()}
                  style={styles.containerBack}>
                  <Icon
                    name="arrow-back-circle"
                    color={colors.white}
                    size={hp(6)}
                  />
                </TouchableOpacity>
              }
              centerComponent={<Text style={styles.headingText}>{city}</Text>}
            />
            <ScrollView
              style={styles.scrollView}
              showsVerticalScrollIndicator={false}
              refreshControl={
                <RefreshControl refreshing={false} onRefresh={onRefresh} />
              }>
              <View style={styles.containerCurrent}>
                <LottieIcons
                  style={styles.mainIcon}
                  weatherCondition={currentWeather?.weather[0]?.icon}
                />
                <Text style={styles.tempCurrent}>{`${Math.round(
                  currentWeather?.main?.temp - 273.15,
                )}°C`}</Text>
                <Text style={styles.desStyle}>
                  {currentWeather?.weather[0]?.main}
                </Text>
                <Text style={styles.feelCurrent}>{`Feels like ${(
                  currentWeather?.main?.feels_like - 273.15
                ).toFixed(1)}°C`}</Text>
              </View>
              <View style={styles.containerTimeWise}>
                <View style={styles.containerHeadingTime}>
                  <LottieView
                    style={styles.lottieViewClock}
                    source={require('../../../../assets/lottieFiles/clock.json')}
                    autoPlay
                    loop
                  />

                  <Text style={styles.headingday}>Current Day</Text>
                </View>

                <ScrollView showsHorizontalScrollIndicator={false} horizontal>
                  <View style={styles.containerScroll}>
                    {temperaturesOfDay.length > 0 ? (
                      <View style={styles.line}>
                        <LineChart
                          data={{
                            labels: ['12', '3', '6', '9'],
                            datasets: [
                              {
                                data: temperaturesOfDay,
                              },
                            ],
                          }}
                          width={
                            temperaturesOfDay.length === 6
                              ? wp(200)
                              : temperaturesOfDay.length === 5
                              ? wp(162)
                              : temperaturesOfDay.length == 4
                              ? wp(131)
                              : temperaturesOfDay.length == 3
                              ? wp(104)
                              : temperaturesOfDay.length == 2
                              ? wp(80)
                              : wp(33)
                          }
                          height={hp(14)}
                          withInnerLines={false}
                          withOuterLines={false}
                          renderDotContent={renderDotContent}
                          chartConfig={{
                            backgroundGradientFrom: 'rgba(28, 51, 119, 0.6)',
                            backgroundGradientFromOpacity: 0,
                            useShadowColorFromDataset: false, // optional
                            backgroundGradientTo: 'rgba(28, 51, 119, 0.6)',
                            backgroundGradientToOpacity: 0,
                            decimalPlaces: 0,
                            justifyContent: 'center',
                            color: () => colors.white,
                            labelColor: () => `rgba(255, 255, 255, 0)`,
                            propsForDots: {
                              r: '4',
                              strokeWidth: '8',
                              stroke: colors.white,
                            },
                          }}
                          bezier
                          style={styles.lineChart}
                        />
                      </View>
                    ) : (
                      <ActivityIndicator
                        size="large"
                        color={colors.white}
                        style={styles.activityInd}
                      />
                    )}
                    <FlatList
                      scrollEnabled={false}
                      data={currentDayData}
                      keyExtractor={item => item.dt_txt}
                      horizontal={true}
                      showsHorizontalScrollIndicator={false}
                      renderItem={({item}) => {
                        const formattedTime = new Date(
                          item.dt_txt,
                        ).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        });
                        return (
                          <View style={styles.containerFlat}>
                            <Text style={styles.timeStyle}>{formattedTime}</Text>
                            <LottieIcons
                              style={styles.weatherIcon}
                              weatherCondition={item?.weather[0]?.icon}
                            />

                            <Text style={styles.tempStyle}>
                              {item.weather[0].main}
                            </Text>
                            <Text style={styles.tempStyle}>{`${Math.round(
                              item.main.temp - 273.15,
                            )}°C`}</Text>
                          </View>
                        );
                      }}
                    />
                  </View>
                </ScrollView>
              </View>
              <View style={styles.container7Days}>
                <View style={styles.containerHeadingTime}>
                  <LottieView
                    style={styles.lottieView}
                    source={require('../../../../assets/lottieFiles/calander.json')}
                    autoPlay
                    loop
                  />
                  <Text style={styles.heading7day}>Next 5 Day(s)</Text>
                </View>
                <FlatList
                  data={Object.keys(weatherData)}
                  keyExtractor={item => item}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  scrollEnabled
                  contentContainerStyle={{flexGrow: 1}} // Ensure content can grow to fill the container
                  renderItem={({item: date}) => {
                    const currentWeatherData = weatherData[date];
                    return (
                      <View style={styles.containerFlat}>
                        <Text
                          style={
                            styles.dateStyle
                          }>{`${currentWeatherData?.date}`}</Text>
                        <LottieIcons
                          style={styles.weatherIcon}
                          weatherCondition={currentWeatherData?.icon}
                        />
                        <Text style={styles.tempStyle}>
                          {currentWeatherData?.main}
                        </Text>
                        <Text style={styles.tempStyle}>{`${calculateAverageTemp(
                          currentWeatherData?.temperatures,
                        )}°C`}</Text>
                      </View>
                    );
                  }}
                />
              </View>
              <View style={styles.MianContainerBox}>
                <View style={styles.containerBox}>
                  <View style={styles.flexRow}>
                    <LottieView
                      style={styles.lottieView}
                      source={require('../../../../assets/lottieFiles/waterDrop.json')}
                      autoPlay
                      loop
                    />
                    <Text style={styles.heading7day}>Humidity</Text>
                  </View>
                  <Text
                    style={
                      styles.windStyle
                    }>{`${currentWeather?.main?.humidity}%`}</Text>
                  <Text style={styles.envirStyle}>
                    Cold and humid environment, Keep yourself warm.
                  </Text>
                </View>

                <View style={styles.containerBox}>
                  <View style={styles.flexRow}>
                    <LottieView
                      style={styles.lottieView}
                      source={require('../../../../assets/lottieFiles/winds.json')}
                      autoPlay
                      loop
                    />
                    <Text style={styles.heading7day}>Air Quality</Text>
                  </View>
                  <Text style={styles.windStyle}>
                    {currentWeather?.wind?.deg}
                  </Text>
                  <Text style={styles.envirStyle}>
                    Please take precautions when traveling.
                  </Text>
                </View>
              </View>
            </ScrollView>
          </View>
        </ImageBackground>
      )}
    </Container>
  );
}
