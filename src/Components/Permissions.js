
import {Linking, PermissionsAndroid} from 'react-native';
import {PERMISSIONS, RESULTS, check, request} from 'react-native-permissions';

export const RequestLocationPermission = async () => {
    try {
      let permissionStatus;

      if (Platform.OS === 'ios') {
        permissionStatus = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
      } else {
        permissionStatus = await request(
          PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        );
      }

      if (permissionStatus === RESULTS.GRANTED) {
        console.log('Location permission granted');
        // Now you can use Geolocation to get the device's location
      } else {
        if (permissionStatus === RESULTS.NEVER_ASK_AGAIN) {
          Linking.openSettings();
        }
        console.log('Location permission denied');
      }

      return permissionStatus; // Return the permission status
    } catch (error) {
      console.error('Error requesting location permission:', error);
      return RESULTS.DENIED; // Return a default value for the error case
    }
  };