import React, { useState } from "react";
import { View, TextInput, StyleSheet, TextInputProps } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface SearchBarProps extends TextInputProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  placeholder,
  style,
  ...props
}) => {
  const [query, setQuery] = useState<string>("");

  return (
    <View style={[styles.container, style]}>
      <Ionicons name="search" size={20} color="#888" style={styles.icon} />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#888"
        value={query}
        onChangeText={(text) => {
          setQuery(text);
          onSearch(text);
        }}
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    paddingHorizontal: 10,
    height: 45,
    borderWidth: 1,
    borderColor: "#ccc",
    width: 220,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 0,
    color: "#000",
  },
});

export default SearchBar;
