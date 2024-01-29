import {StyleSheet, SafeAreaView, View} from 'react-native';
import React from 'react';
import {useThemeAwareObject} from './src/theme';
import HomeStack from './src/Navigation';
import {Provider} from 'react-redux';
import {store, persistor} from './src/redux/store';
import {PersistGate} from 'redux-persist/integration/react';
export default function App() {
  const createStyles = () => {
    const themeStyles = StyleSheet.create({
      container: {
        flex: 1,
      },
    });
    return themeStyles;
  };
  const styles = useThemeAwareObject(createStyles);
  return (
    <View style={styles.container}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <HomeStack />
        </PersistGate>
      </Provider>
    </View>
  );
}
