/* eslint-disable react-hooks/exhaustive-deps */
import LottieView from 'lottie-react-native';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  ImageBackground,
  Linking,
  LogBox,
  Platform,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {SwipeListView} from 'react-native-swipe-list-view';
import AddIcon from 'react-native-vector-icons/AntDesign';
import {useDispatch, useSelector} from 'react-redux';
import Container from '../../../Components/Container';
import BackgroundGif from '../../../Components/CustomBackground';
import Header from '../../../Components/CustomHeader';
import LottieIcons from '../../../Components/CustomLottie';
import Snackbar from '../../../Components/CustomSnackbar';
import Text from '../../../Components/CustomText';
import {RequestLocationPermission} from '../../../Components/Permissions';
import {colors} from '../../../constants';
import {removeWeatherData} from '../../../redux/slices/userSlice';
import {useThemeAwareObject} from '../../../theme';
import {hp, wp} from '../../../util';
import creahandleCloseRowsyles from './style';

export default function Home(props) {
  const styles = useThemeAwareObject(creahandleCloseRowsyles);
  const API_key = '639371a91c642c097c9a558d4c685123';
  const [currentWeatherData, setCurrentWeatherData] = useState([]);
  const [currentLocationWeather, setCurrentLocationWeather] = useState();
  const [locationPermission, setLocationPermission] = useState(false);
  const {weatherData} = useSelector(state => state.user);
  const [closeRows, setcloseRows] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, []);
  async function askPermission() {
    try {
      const permissionStatus = await RequestLocationPermission();
      if (permissionStatus == 'granted') {
        getCurrentLocation();
        setLocationPermission(false);
      } else {
        setLocationPermission(true);
        Snackbar('Location permission denied', true);
        if (permissionStatus === 'blocked') {
          Linking.openSettings();
        }
      }
    } catch (error) {
      Snackbar(error, true);
    }
  }

  useEffect(() => {
    askPermission();
  }, []);
  const fetchWeatherData = async (lat, lon) => {
    const API_key = '639371a91c642c097c9a558d4c685123';

    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_key}`,
      );
      if (res.status === 200) {
        const data = await res.json();
        return data;
      } else {
        Snackbar('Failed to fetch weather data', true);
      }
    } catch (err) {
      Snackbar('Network request failed', true);
      return null;
    }
  };

  const fetchDataForCities = async () => {
    try {
      const uniqueCityNames = new Set();
      const APIResponses = await Promise.all(
        weatherData.map(async city => {
          const {lat, lon} = city;
          return await fetchWeatherData(lat, lon);
        }),
      );
      const uniqueAPIResponses = APIResponses.filter(data => {
        if (!uniqueCityNames.has(data?.name)) {
          uniqueCityNames.add(data?.name);

          return true;
        }
        return false;
      });
      const uniqueAPIRes = uniqueAPIResponses.map((response, id) => {
        return {
          ...response,
          key: id + 1,
        };
      });
      setCurrentWeatherData(uniqueAPIRes.filter(Boolean)); // Remove null values
    } catch (error) {
      Snackbar(error.message, true);
    }
  };

  useEffect(() => {
    fetchDataForCities();
  }, [weatherData]);

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        currentLoctionData(latitude, longitude);
      },
      error => {
        Snackbar(error.message, true);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

  const currentLoctionData = async (lat, lon) => {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_key}`,
      );
      if (res.status == 200) {
        const data = await res.json();
        setCurrentLocationWeather(data);
      } else {
        Snackbar('Failed to fetch weather data', true);
      }
    } catch (err) {
      Snackbar(' Network request failed', true);
    }
  };
  const currentBackGif = () => {
    const weatherCondition = currentLocationWeather?.weather[0]?.icon;
    const backgroundImage = BackgroundGif({backgroundImage: weatherCondition});
    return backgroundImage;
  };
  const backGif = e => {
    const backgroundImage = BackgroundGif({backgroundImage: e});
    return backgroundImage;
  };
  const closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };
  const handleCloseRows = () => {
    if (closeRows !== undefined && closeRows) {
      if (closeRows?.e[closeRows?.x]) {
        closeRows.e[closeRows.x].closeRow();
      }
    } else {
      console.log(
        'closeRows is undefined or some of its properties are not defined',
      );
    }
  };

  return (
    <Container>
      <ImageBackground
        blurRadius={80}
        style={styles.mainImage}
        resizeMode="cover"
        source={require('../../../../assets/images/wallpaper.jpg')}>
        <Header
          rightComponent={
            <View>
              <TouchableOpacity
                style={styles.containerAddIcon}
                onPress={() => {
                  handleCloseRows();
                  props.navigation.navigate('AddCity');
                }}>
                <AddIcon
                  name="pluscircle"
                  color={colors.black}
                  size={hp(4.2)}
                />
              </TouchableOpacity>
            </View>
          }
        />
        {locationPermission ? (
          <TouchableOpacity onPress={() => askPermission()}>
            <Text style={styles.permissionDeniedText}>
              Location permission denied. Please enable location services in
              your settings.
            </Text>
          </TouchableOpacity>
        ) : (
          <ScrollView nestedScrollEnabled={true}>
            {!currentLocationWeather ? (
              <ActivityIndicator
                size="large"
                color={colors.white}
                style={styles.activityInd}
              />
            ) : (
              <View>
                <ImageBackground
                  style={styles.backGroundImage}
                  resizeMode="cover"
                  source={currentBackGif()}>
                  <TouchableOpacity
                    onPress={() => {
                      handleCloseRows();
                      props.navigation.navigate('Detailweather', {
                        city: currentLocationWeather?.name,
                      });
                    }}
                    style={styles.containerFlat}>
                    <View style={styles.innerContainer}>
                      <View>
                        <Text style={styles.nameStyle}>
                          {currentLocationWeather?.name}
                        </Text>
                        <Text style={styles.locStyle}>My Location</Text>
                      </View>
                      <Text style={styles.desStyle}>
                        {currentLocationWeather?.weather[0]?.main}
                      </Text>
                    </View>
                    <View style={styles.innerContainer}>
                      <Text style={styles.tempStyle}>{`${Math.round(
                        currentLocationWeather?.main?.temp - 273.15,
                      )}°C`}</Text>
                      <LottieIcons
                        style={styles.weatherIcon}
                        weatherCondition={
                          currentLocationWeather?.weather[0]?.icon
                        }
                      />
                    </View>
                  </TouchableOpacity>
                </ImageBackground>
                <SwipeListView
                  data={currentWeatherData}
                  useFlatList={true}
                  disableRightSwipe
                  renderItem={(data, rowMap) => {
                    return (
                      <ImageBackground
                        style={styles.backGroundImage}
                        resizeMode="cover"
                        source={backGif(data?.item?.weather[0]?.icon)}>
                        <TouchableOpacity
                          onPress={() => {
                            handleCloseRows();
                            closeRow(rowMap, data.item.key);
                            props.navigation.navigate('Detailweather', {
                              city: data?.item?.name,
                            });
                          }}
                          style={styles.containerFlat}>
                          <View style={styles.innerContainer}>
                            <Text style={styles.nameStyle}>
                              {data?.item?.name}
                            </Text>
                            <Text style={styles.desStyle}>
                              {data.item?.weather[0]?.main}
                            </Text>
                          </View>
                          <View style={styles.innerContainer}>
                            <Text style={styles.tempStyle}>{`${Math.round(
                              data?.item?.main?.temp - 273.15,
                            )}°C`}</Text>
                            <LottieIcons
                              style={styles.weatherIcon}
                              weatherCondition={data?.item?.weather[0]?.icon}
                            />
                          </View>
                        </TouchableOpacity>
                      </ImageBackground>
                    );
                  }}
                  renderHiddenItem={(data, rowMap) => (
                    <TouchableOpacity
                      onPress={() => {
                        closeRow(rowMap, data.item.key);
                        dispatch(
                          removeWeatherData({indexToRemove: data.index}),
                        );
                      }}
                      style={styles.containerFlatDel}>
                      <LottieView
                        style={styles.lottieView}
                        source={require('../../../../assets/lottieFiles/delete.json')}
                        autoPlay
                        loop
                      />
                    </TouchableOpacity>
                  )}
                  rightOpenValue={wp(-34)}
                  closeOnRowBeginSwipe
                  onRowOpen={(rowKey, rowMap) => {
                    setcloseRows({e: rowMap, x: rowKey});
                  }}
                />
              </View>
            )}
          </ScrollView>
        )}
      </ImageBackground>
    </Container>
  );
}
