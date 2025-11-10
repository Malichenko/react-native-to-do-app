import { StyleSheet } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { GoalsScreen } from "../screens/goals";

export const App = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <GoalsScreen />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f1f1f1",
  },
});
