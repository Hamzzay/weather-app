import {StyleSheet} from 'react-native';
import {hp, wp} from '../../../util';

const createStyles = theme => {
  const styles = StyleSheet.create({
    headingText: {
      fontFamily: theme.family.meduim,
      fontSize: theme.size.large,
      color: theme.color.primaryColor,
    },
    containerCurrent: {
      marginTop: hp(-2),
      alignItems: 'center',
    },
    mainIcon: {
      height: hp(25),
      width: wp(50),
      resizeMode: 'cover',
    },
    containerFlat: {
      marginHorizontal: wp(2),
      borderRadius: 10,
      alignItems: 'center',
      height: hp(14),
      width: wp(25),
    },
    dateStyle: {
      color: theme.color.primaryColor,
      fontSize: theme.size.small,
      fontFamily: theme.family.large,
    },
    timeStyle: {
      color: theme.color.primaryColor,
      fontSize: theme.size.small,
      fontFamily: theme.family.large,
    },
    tempStyle: {
      color: theme.color.primaryColor,
      fontSize: theme.size.small,
      fontFamily: theme.family.large,
    },
    tempCurrent: {
      fontFamily: theme.family.large,
      fontSize: theme.size.xLarge,
      color: theme.color.primaryColor,
    },
    desStyle: {
      padding: wp(3),
      color: theme.color.primaryColor,
    },
    feelCurrent: {
      fontFamily: theme.family.small,
      fontSize: theme.size.small,
      color: theme.color.primaryColor,
    },

    lottieView: {
      height: hp(5),
      width: wp(8),
      padding: wp(3),
      marginLeft: wp(1),
    },
    lottieViewClock: {
      height: hp(6),
      width: wp(12),
      marginRight: wp(-4),
      marginTop: hp(-0.3),
    },
    container7Days: {
      backgroundColor: theme.color.backgroundColor,
      opacity: 0.5,
      paddingHorizontal: wp(2),
      borderRadius: theme.borders.radius2,
      height: wp(50),
      width: wp(96),
      alignSelf: 'center',
    },
    img7Day: {
      width: wp(18),
      height: hp(7),
    },
    heading7day: {
      alignSelf: 'center',
      padding: wp(1),
      color: theme.color.primaryColor,
    },
    containerTimeWise: {
      marginTop: hp(5),
      backgroundColor: theme.color.backgroundColor,
      opacity: 0.5,
      borderRadius: theme.borders.radius2,
      marginBottom: hp(1),
      height: hp(39.5),
      paddingHorizontal: wp(1.8),
      width: wp(96),
      alignSelf: 'center',
    },
    containerHeadingTime: {
      flexDirection: 'row',
      marginBottom: hp(1),
    },
    MianContainerBox: {
      flexDirection: 'row',
      width: wp(98),
      height: hp(25),
      justifyContent: 'space-around',
      alignSelf: 'center',
      marginVertical: hp(1),
      marginBottom: hp(25.5),
    },
    containerBox: {
      width: wp(47),
      height: hp(22),
      backgroundColor: theme.color.backgroundColor,
      opacity: 0.5,
      borderRadius: theme.borders.radius2,
      justifyContent: 'space-evenly',
    },
    windStyle: {
      marginLeft: wp(4),
      color: theme.color.primaryColor,
      fontFamily: theme.family.meduim,
      fontSize: theme.size.large,
    },
    envirStyle: {
      marginLeft: wp(3),
      color: theme.color.primaryColor,
      fontFamily: theme.family.small,
      fontSize: theme.size.small,
      width: wp(42),
    },

    activityInd: {
      alignSelf: 'center',
      width: wp(96),
    },
    mainIndicator: {
      height: hp(100),
      alignSelf: 'center',
      justifyContent: 'center',
    },
    flexRow: {flexDirection: 'row'},
    lineChart: {
      marginLeft: wp(-4),
      alignSelf: 'center',
      justifyContent: 'center',
    },
    headingday: {
      alignSelf: 'center',
      marginTop: hp(-0.9),
      padding: wp(1),
      color: theme.color.primaryColor,
    },
  });
  return styles;
};
export default createStyles;
