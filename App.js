import React from "react";
import { Easing } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./stores/themeReducer";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";

import { MainLayout, CourseListing } from "./screens";

const Stack = createSharedElementStackNavigator();
const options = {
  gestureEnabled: false,
  transitionSpec: {
    open: {
      animation: "timing",
      config: { duration: 300, easing: Easing.inOut(Easing.ease) },
    },
    close: {
      animation: "timing",
      config: { duration: 300, easing: Easing.inOut(Easing.ease) },
    },
  },
  cardStyleInterpolator: ({ current: { progress } }) => {
    return {
      cardStyle: {
        opacity: progress,
      },
    };
  },
};

const store = configureStore({
  reducer: themeReducer,
});

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            useNativeDriver: true,
            headerShown: false,
          }}
          initialRouteName={"Dashboard"}
          detachInactiveScreens={false}
        >
          <Stack.Screen name="Dashboard" component={MainLayout} />
          <Stack.Screen
            name="CourseListing"
            component={CourseListing}
            options={() => options}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
