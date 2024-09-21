import React from "react";
import { useEffect, useState } from "react";
import { View, FlatList, Text, ActivityIndicator } from "react-native";
import { getLatestGames } from "../lib/metacritic";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AnimatedGameCard } from "./GameCard";
import { Logo } from "./Logo";

export function Main() {
  const [games, setGames] = useState([]);
  const insets = useSafeAreaInsets();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getLatestGames().then((games) => {
      setGames(games);
      setLoading(false);
    });
  }, []);
  return (
    <View style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}>
      <View
        style={{
          marginBottom: 20,
          marginTop: 10,
          flexDirection: "row",
          alignItems: "center",
        }}

        // <Logo />lo
      >
        <Logo />
        <text style={{ color: "white", fontSize: 10, fontWeigh: "bold" }}>
          api games
        </text>
      </View>
      {games.length === 0 ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={games}
          keyExtractor={(game) => game.slug}
          renderItem={({ item, index }) => (
            <AnimatedGameCard game={item} index={index} />
          )}
        />
      )}
    </View>
  );
}
