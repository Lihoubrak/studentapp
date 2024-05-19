import React, { useState } from "react";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import Background from "../../components/Background";
import Logo from "../../components/Logo";
import Header from "../../components/Header";
import Button from "../../components/Button";
import TextInput from "../../components/TextInput";
import { passwordValidator } from "../../helpers/passwordValidator";
import { theme } from "../../core/theme";
import tokenExpo from "../../utils/tokenExpo";
import { useAuthContext } from "../../contexts/AuthContext";

export default function LoginScreen() {
  const [username, setUsername] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const { setAuth, axiosInstance } = useAuthContext();
  const onLoginPressed = async () => {
    const passwordError = passwordValidator(password.value);
    if (!username.value || passwordError) {
      setUsername({
        ...username,
        error: !username.value ? "Username can't be empty" : "",
      });
      setPassword({ ...password, error: passwordError });
      return;
    }

    const expoToken = await tokenExpo();
    try {
      const response = await axiosInstance.post("/users/v1/login", {
        username: username.value,
        password: password.value,
        expoToken,
      });
      setAuth(response.data);
    } catch (error) {
      setUsername({ ...username, error: "Incorrect username or password" });
      setPassword({ ...password, error: "Incorrect username or password" });
    }
  };
  return (
    <Background>
      <Logo />
      <Header>Welcome back.</Header>
      <TextInput
        label="Username"
        returnKeyType="next"
        value={username.value}
        onChangeText={(text) => setUsername({ value: text, error: "" })}
        error={!!username.error}
        errorText={username.error}
        autoCapitalize="none"
      />
      <TextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: "" })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
      <View style={styles.forgotPassword}>
        <TouchableOpacity>
          <Text style={styles.forgot}>Forgot your password?</Text>
        </TouchableOpacity>
      </View>
      <Button mode="contained" onPress={onLoginPressed}>
        Login
      </Button>
      <View style={styles.row}>
        <Text>Don’t have an account? </Text>
        <TouchableOpacity>
          <Text style={styles.link}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  forgotPassword: {
    width: "100%",
    alignItems: "flex-end",
    marginBottom: 24,
  },
  row: {
    flexDirection: "row",
    marginTop: 4,
  },
  forgot: {
    fontSize: 13,
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: "bold",
    color: theme.colors.primary,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
