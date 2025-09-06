import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Alert,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Colors from "../../global/colors";
import { height, width } from "../../global/size";
import { User } from "../../types/types";
import { RootStackParamList } from "../../types/navigationTypes";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

const API_URL = "https://jsonplaceholder.typicode.com/users";
const STORAGE_KEY = "@users_data";

const OfflineScreen = () => {
  const [data, setData] = useState<User[] | null>(null);
  const [loading, setLoading] = useState(true);

  type OfflineScreenNavigationProps = NativeStackNavigationProp<
    RootStackParamList,
    "LargeListScreen"
  >;

  const navigation = useNavigation<OfflineScreenNavigationProps>();


  useFocusEffect(
    useCallback(() => {
      navigation.setOptions({
        title: "Offline Support",
        headerTitleStyle: {
          fontSize: width * 0.05,
        },
        headerRight: () => (
          <TouchableOpacity
            onPress={() => navigation.navigate("SecureToken")}
            style={{ marginRight: 10 }}
          >
            <Text style={{ fontSize: width * 0.04, color: "blue" }}>
              Task_3
            </Text>
          </TouchableOpacity>
        ),
      });
    }, [navigation])
  );

  // Load data from AsyncStorage or API
  const loadData = async () => {
    try {
      const cachedData = await AsyncStorage.getItem(STORAGE_KEY);
      if (cachedData) {
        setData(JSON.parse(cachedData));
        setLoading(false);
        return;
      }

      const response = await fetch(API_URL);
      if (!response.ok)
        throw new Error(`HTTP error! Status: ${response.status}`);
      const jsonData: User[] = await response.json();

      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(jsonData));

      setData(jsonData);
    } catch (error) {
      console.log("Error fetching data:", error);
      Alert.alert("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  if (loading)
    return (
      <SafeAreaView
        style={[styles.centerContainer, { backgroundColor: Colors.white }]}
      >
        <ActivityIndicator size="large" color={Colors.black} />
      </SafeAreaView>
    );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: Colors.white }]}>
      <FlatList
        data={data || []}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.nameText}>{item.name}</Text>
            <Text style={styles.emailText}>{item.email}</Text>
          </View>
        )}
        contentContainerStyle={{ paddingBottom: height * 0.02 }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  itemContainer: {
    backgroundColor: Colors.white,
    padding: width * 0.04,
    marginHorizontal: width * 0.03,
    marginVertical: height * 0.01,
    borderRadius: width * 0.02,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  nameText: {
    fontSize: width * 0.045,
    color: Colors.black,
    fontWeight: "600",
  },
  emailText: {
    fontSize: width * 0.035,
    color: Colors.grayMedium,
    marginTop: height * 0.005,
  },
});

export default OfflineScreen;
