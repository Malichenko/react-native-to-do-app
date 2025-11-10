import { View, StyleSheet } from "react-native";

type DividerProps = {
  color?: string;
  thickness?: number;
  spacing?: number;
};

export const Divider = ({
  color = "#E0E0E0",
  thickness = 1,
  spacing = 8,
}: DividerProps) => {
  return (
    <View
      style={[
        styles.divider,
        {
          height: thickness,
          backgroundColor: color,
          marginVertical: spacing,
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  divider: {
    width: "100%",
  },
});
