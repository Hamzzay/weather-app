import React, {useState} from 'react';
import {TextInput, View, FlatList, TouchableOpacity} from 'react-native';
import Text from '../../../Components/CustomText';
import Icon from 'react-native-vector-icons/Ionicons';
import Header from '../../../Components/CustomHeader';
import {useDispatch, useSelector} from 'react-redux';
import {setWeatherdata} from '../../../redux/slices/userSlice';
import Container from '../../../Components/Container';
import createStyles from './style';
import {Cities as data} from '../../../Components/CustomCities';
import {useThemeAwareObject} from '../../../theme';
import {colors} from '../../../constants';
import {hp} from '../../../util';
import LottieView from 'lottie-react-native';

const AddCity = props => {
  const styles = useThemeAwareObject(createStyles);
  const [searchResults, setSearchResults] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [city, setCity] = useState('');
  const dispatch = useDispatch();

  const handleSearch = text => {
    if (text.trim() !== '') {
      const results = data.filter(
        item => item.name.toLowerCase().indexOf(text.toLowerCase()) > -1,
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };
  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          dispatch(setWeatherdata(item));
          props.navigation.goBack();
        }}
        style={styles.containerFlat}>
        <Text style={styles.searchTest}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <Container>
      <Header
        leftComponent={
          <TouchableOpacity onPress={() => props.navigation.goBack()}>
            <Icon name="arrow-back-circle" color={colors.white} size={hp(6)} />
          </TouchableOpacity>
        }
      />
      <View style={styles.containerTextInput}>
        <LottieView
          style={styles.lottieView}
          source={require('../../../../assets/lottieFiles/search.json')}
          autoPlay
          loop
        />
        <TextInput
          onFocus={() => setIsTyping(true)} // Handle onFocus event
          onBlur={() => setIsTyping(false)} // Handle onBlur event
          placeholder="Search for a city"
          placeholderTextColor="white"
          style={styles.textInput}
          onChangeText={text => {
            handleSearch(text);
            setCity(text);
          }}
        />
      </View>
      <FlatList
        data={searchResults}
        keyboardShouldPersistTaps={'handled'}
        keyExtractor={(item, index) => item.name + index}
        renderItem={renderItem}
        style={styles.flatList}
      />
    </Container>
  );
};

export default AddCity;
