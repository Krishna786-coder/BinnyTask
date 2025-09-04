import React, { useCallback, useEffect, useState, useRef } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  StatusBar,
  ListRenderItemInfo,
  RefreshControl,
  Text,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import { Item } from "../types/types";
import { generatePageData } from "../utils/generateData";
import { height, width } from "../global/size";
import Colors from "../global/colors";
//import { SafeAreaView } from "react-native-safe-area-context";

const PAGE_SIZE = 10;
const TOTAL_ITEMS = 5000;

const ITEM_HEIGHT = height * 0.08;
const AVATAR_SIZE = width * 0.1;
const PADDING_HORIZONTAL = width * 0.04;

const LargeListScreen: React.FC = () => {
  const [data, setData] = useState<Item[]>([]);
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [refreshing, setRefreshing] = useState(false);


  const timeoutRef = useRef<any>(null);

  useEffect(() => {
    loadPage(1, true);

   
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const loadPage = (pageNumber: number, replace: boolean = false) => {
    setLoadingMore(true);


    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      const newData = generatePageData(pageNumber, PAGE_SIZE);
      setData((prev) => (replace ? newData : [...prev, ...newData]));
      setPage(pageNumber);
      setLoadingMore(false);
    }, 1000);
  };

  const keyExtractor = useCallback((item: Item) => String(item.id), []);

  const renderItem = useCallback(({ item }: ListRenderItemInfo<Item>) => {
    return (
      <View style={styles.row}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{item.id % 100}</Text>
        </View>
        <View style={styles.body}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.subtitle} numberOfLines={1}>
            {item.subtitle}
          </Text>
        </View>
      </View>
    );
  }, []);

  const getItemLayout = useCallback(
    (_: ArrayLike<Item> | null | undefined, index: number) => ({
      length: ITEM_HEIGHT,
      offset: ITEM_HEIGHT * index,
      index,
    }),
    []
  );

  const onEndReached = () => {
    if (loadingMore) return;
    const totalPages = Math.ceil(TOTAL_ITEMS / PAGE_SIZE);
    if (page < totalPages) {
      loadPage(page + 1);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      loadPage(1, true);
      setRefreshing(false);
    }, 1000);
  };

  const reachedEnd = data.length >= TOTAL_ITEMS;

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" />
      <FlatList
        data={data}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        getItemLayout={getItemLayout}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.5}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        removeClippedSubviews
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        updateCellsBatchingPeriod={16}
        windowSize={10}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Paginated List (10 per page)</Text>
            <Text style={styles.headerCaption}>
              Loads data page by page with footer spinner
            </Text>
          </View>
        }
        ListFooterComponent={
          loadingMore ? (
            <View style={styles.footer}>
              <ActivityIndicator />
            </View>
          ) : reachedEnd ? (
            <View style={styles.footer}>
              <Text style={styles.endText}>You’ve reached the end 🎉</Text>
            </View>
          ) : null
        }
      />
    </SafeAreaView>
  );
};

export default LargeListScreen;

const styles = StyleSheet.create({
    safe: { flex: 1, backgroundColor: Colors.white },
    row: {
      height: ITEM_HEIGHT,
      paddingHorizontal: PADDING_HORIZONTAL,
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: Colors.white,
    },
    avatar: {
      width: AVATAR_SIZE,
      height: AVATAR_SIZE,
      borderRadius: AVATAR_SIZE / 4,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: Colors.grayBackground,
      marginRight: width * 0.03,
    },
    avatarText: { fontWeight: "600", fontSize: width * 0.04, color: Colors.black },
    body: { flex: 1 },
    title: { fontSize: width * 0.045, fontWeight: "700", color: Colors.black },
    subtitle: { marginTop: 4, fontSize: width * 0.035, color: Colors.grayMedium },
    separator: { height: 1, backgroundColor: Colors.grayLight },
    header: {
      paddingHorizontal: PADDING_HORIZONTAL,
      paddingVertical: height * 0.015,
      backgroundColor: Colors.white,
    },
    headerTitle: { fontSize: width * 0.05, fontWeight: "800", color: Colors.black },
    headerCaption: { marginTop: 4, fontSize: width * 0.035, color: Colors.grayMedium },
    footer: { paddingVertical: height * 0.02, alignItems: "center", justifyContent: "center" },
    endText: { color: Colors.grayMedium, fontSize: width * 0.04 },
  });
  