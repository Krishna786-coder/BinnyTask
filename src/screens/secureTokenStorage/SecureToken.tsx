import React, { useCallback, useEffect, useState } from "react";
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, StatusBar } from "react-native";
import * as Keychain from "react-native-keychain";
import Colors from "../../global/colors";
import { height, width } from "../../global/size";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/navigationTypes";
import { useFocusEffect, useNavigation } from "@react-navigation/native";


const SecureToken = () => {
  const [token, setToken] = useState<string | null>(null);
  type SecureTokenScreenNavigationProps = NativeStackNavigationProp<
    RootStackParamList,
    "SecureToken"
  >;

  const navigation = useNavigation<SecureTokenScreenNavigationProps>();

   useFocusEffect(
      useCallback(() => {
        navigation.setOptions({
          title: "Secure Token",
          headerTitleStyle: {
            fontSize: width * 0.05,
          },
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate("ProductListScreen")}
              style={{ marginRight: 10 }}
            >
              <Text style={{ fontSize: width * 0.04, color: "blue" }}>
                Task_4
              </Text>
            </TouchableOpacity>
          ),
        });
      }, [navigation])
    );

  const saveToken = async () => {
    try {
      await Keychain.setGenericPassword("auth", "dummy_auth_token_12345");
      setToken("dummy_auth_token_12345");
      console.log("Token saved securely");
    } catch (error) {
      console.log("Error saving token:", error);
    }
  };

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const credentials = await Keychain.getGenericPassword();
        if (credentials) {
          setToken(credentials.password);
        } else {
          setToken(null);
        }
      } catch (error) {
        console.log("Error retrieving token:", error);
      }
    };
    fetchToken();
  }, []);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: Colors.white }]}>
      <StatusBar backgroundColor={Colors.white} barStyle="dark-content" />
      <View style={styles.content}>
        <Text style={styles.label}>Stored Token:</Text>
        <Text style={styles.token}>{token || "No token found"}</Text>

        <View style={{ height: height * 0.03 }} />

        <TouchableOpacity style={styles.button} onPress={saveToken}>
          <Text style={styles.buttonText}>Save Dummy Token</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: width * 0.05,
  },
  label: {
    fontSize: width * 0.05,
    color: Colors.black,
    marginBottom: height * 0.02,
    fontWeight: "600",
  },
  token: {
    fontSize: width * 0.04,
    color: Colors.grayMedium,
    textAlign: "center",
  },
  button: {
    backgroundColor: Colors.black,
    paddingVertical: height * 0.015,
    paddingHorizontal: width * 0.08,
    borderRadius: width * 0.02,
  },
  buttonText: {
    color: Colors.white,
    fontSize: width * 0.045,
    fontWeight: "600",
    textAlign: "center",
  },
});

export default SecureToken;
