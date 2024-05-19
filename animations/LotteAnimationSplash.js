import React, { useRef } from "react";
import { Button, ImageBackground, StyleSheet, View } from "react-native";
import LottieView from "lottie-react-native";
import { theme } from "../core/theme";
const LotteAnimationSplash = () => {
  return (
    <ImageBackground
      source={require("../assets/background_dot.png")}
      resizeMode="repeat"
      style={styles.background}
    >
      <View style={styles.animationContainer}>
        <LottieView
          autoPlay
          style={{
            width: 200,
            height: 200,
            // backgroundColor: "#eee",
          }}
          source={require("../assets/animation.json")}
        />
      </View>
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  animationContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  buttonContainer: {
    paddingTop: 20,
  },
  background: {
    flex: 1,
    width: "100%",
    backgroundColor: theme.colors.surface,
  },
});
export default LotteAnimationSplash;
