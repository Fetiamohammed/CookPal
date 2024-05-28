import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { AppRegistry } from 'react-native';
import AppNavigation from "./src/navigation";
import { Provider } from "react-redux";
import { store } from "./src/store/store";


export default function App() {
  return (
    <Provider store={store}>
    <AppNavigation />
    </Provider>

  );
}
AppRegistry.registerComponent('CookPal', () => App);
