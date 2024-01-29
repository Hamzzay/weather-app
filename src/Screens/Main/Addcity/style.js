import {StyleSheet} from 'react-native';
import {hp, wp} from '../../../util';

const createStyles = theme => {
  const styles = StyleSheet.create({
    containerTextInput: {
      width: wp(90),
      alignSelf: 'center',
      borderRadius: theme.borders.radius2,
      borderWidth: 1,
      borderColor: theme.color.primaryColor,
      flexDirection: 'row',
      marginBottom: hp(2),
    },
    textInput: {
      color: theme.color.primaryColor,
      width: wp(78),
      height: hp(8),
    },
    containerTypeText: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
    },
    typeText: {
      color: theme.color.primaryColor,
      fontSize: theme.size.medium,
    },
    containerFlat: {
      marginTop: hp(2),
      borderRadius: theme.borders.radius3,
      justifyContent: 'space-evenly',
    },
    searchTest: {
      color: theme.color.primaryColor,
      paddingHorizontal: wp(7),
      paddingVertical: hp(1),
    },
    lottieView: {
      height: hp(8),
      width: wp(15),
        },
  });
  return styles;
};
export default createStyles;
