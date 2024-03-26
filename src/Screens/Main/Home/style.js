import {StyleSheet} from 'react-native';
import {hp, wp} from '../../../util';

const createStyles = theme => {
  const styles = StyleSheet.create({
    containerFlat: {
      height: hp(20),
      width: wp(96),
      alignSelf: 'center',
      borderRadius: theme.borders.radius3,
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: wp(3),
    },

    nameStyle: {
      fontSize: theme.size.medium,
      fontFamily: theme.family.medium,
      color: theme.color.primaryColor,
    },
    weatherIcon: {
      marginTop: hp(5.3),
    },
    desStyle: {
      fontFamily: theme.family.medium,
      color: theme.color.primaryColor,
    },
    tempStyle: {
      marginLeft: wp(2),
      fontSize: theme.size.medium,
      fontFamily: theme.family.medium,
      color: theme.color.primaryColor,
    },
    locStyle: {
      fontSize: theme.size.xSmall,
      fontFamily: theme.family.medium,
      color: theme.color.defaultColor,
    },
    containerFlatDel: {
      height: hp(20),
      width: wp(30),
      alignSelf: 'flex-end',
      alignItems:'center',
      borderRadius: theme.borders.radius2,
      marginRight: wp(4),
      justifyContent: 'center',
      backgroundColor: theme.color.error,
    },
    scrollView: {
      paddingHorizontal: wp(10),
      width: wp(20),
    },
    permissionDeniedText: {
      color: theme.color.primaryColor,
      width: wp(80),
      marginTop: hp(30),
      alignSelf: 'center',
    },
    activityInd: {
      height: hp(100),
    },
    innerContainer: {
      height: hp(16),
      justifyContent: 'space-between',
      alignSelf: 'center',
      marginRight: wp(-2),
    },
    backGroundImage: {
      overflow: 'hidden',
      borderRadius: 20,
      width: wp(96),
      alignSelf: 'center',
      height: hp(20),
      marginBottom: hp(1),
    },
    lottieView: {
      height: hp(20),
      width: wp(22),
      padding: wp(3),
      marginLeft: wp(1),
    },
    mainImage:{
      flex:1
    }
  });
  return styles;
};
export default createStyles;
