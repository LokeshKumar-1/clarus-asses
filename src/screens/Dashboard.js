import {
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import SafeScreen from "../components/SafeScreen/SafeScreen";
import ScrollableScreen from "../components/SafeScreen/ScrollableScreen";
import { useEffect, useState } from "react";
import { deleteExistingProduct, getAllProducts } from "../api/homeApi";
import DashboardHeader from "../components/headers/DashboardHeader";
import Loader from "../components/loader/Loader";
import colors from "../utils/colors";
import Fontisto from "@expo/vector-icons/Fontisto";
import Feather from "@expo/vector-icons/Feather";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import CustomToast from "../components/toastMessage/Toast";
import {
  showFailureToastMessage,
  showSuccessToastMessage,
} from "../components/toastMessage/ToastMessageProvider";

const Dashboard = ({ navigation }) => {
  const [productList, setProductList] = useState([]);
  const [loadingStatus, setLoadingStatus] = useState(false);

  useEffect(() => {
    getProductsData();
  }, []);

  async function getProductsData() {
    setLoadingStatus(true);
    const data = await getAllProducts();
    if (data !== "invalid") {
      setProductList(data ?? []);
    }
    setLoadingStatus(false);
  }

  const deleteProductHandler = async (id) => {
    const response = await deleteExistingProduct(id);
    if (response !== "invalid") {
      showSuccessToastMessage("Product deleted successfully", getProductsData);
    } else {
      showFailureToastMessage("Something went wrong");
    }
  };

  const renderListContentView = () => {
    const renderProductItem = ({ item }) => {
      const { title, image, rating, price, category } = item;
      return (
        <Pressable
          style={styles.productItemCont}
          onPress={() =>
            navigation.navigate("aboutProduct", { productData: item })
          }
        >
          <View style={styles.editDeleteBtnCont}>
            <Pressable
              onPress={() =>
                navigation.navigate("AddAndEdit", {
                  purposeForVisit: "edit",
                  productDetails: item,
                })
              }
            >
              <Feather name="edit" size={15} color="#717478" />
            </Pressable>
            <Pressable onPress={() => deleteProductHandler(item.id)}>
              <MaterialIcons name="delete" size={18} color="#c70055" />
            </Pressable>
          </View>
          <Image
            source={{ uri: image }}
            style={styles.productImage}
            resizeMode="contain"
          />
          <Text style={styles.productName} numberOfLines={1}>
            {title}
          </Text>
          <Text style={styles.categoryText}>{category}</Text>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 6,
              alignSelf: "flex-start",
            }}
          >
            <View style={styles.ratingCont}>
              <Text style={{ color: colors.white, fontSize: 10 }}>
                {rating.rate}
              </Text>
              <Fontisto name="star" size={11} color={colors.white} />
            </View>
            <Text
              style={{ fontSize: 12, marginTop: 4, color: "#878787" }}
            >{`(${rating.count})`}</Text>
          </View>

          <Text style={styles.priceText}>{`$${price}`}</Text>
        </Pressable>
      );
    };

    return (
      <FlatList
        data={productList}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        renderItem={renderProductItem}
        contentContainerStyle={styles.contentCont}
        refreshing={loadingStatus}
        onRefresh={getProductsData}
      />
    );
  };

  const renderEmptyView = () => {
    return (
      <View>
        <Text>EmptyView</Text>
      </View>
    );
  };

  const renderFinalView = () => {
    switch (loadingStatus) {
      case true:
        return <Loader />;
      case false:
        return productList.length > 0
          ? renderListContentView()
          : renderEmptyView();
      default:
        return null;
    }
  };

  return (
    <SafeScreen>
      <DashboardHeader navigation={navigation} />
      <ScrollableScreen
        scrollable={false}
        includePageRefresh={true}
        refreshingStatus={loadingStatus}
        onRefresh={getProductsData}
        addedStyles={{ padding: 0 }}
      >
        {renderFinalView()}
      </ScrollableScreen>
      <CustomToast />
    </SafeScreen>
  );
};

const styles = StyleSheet.create({
  contentCont: {
    paddingBottom: 16,
    paddingHorizontal: 8,
  },
  productItemCont: {
    padding: 16,
    width: "50%",
    height: 200,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#f8fafd",
  },
  productImage: {
    height: 70,
    width: 100,
  },
  productName: {
    color: "#1f1f1f",
    fontSize: 14,
    width: "100%",
    overflow: "hidden",
    marginTop: 6,
  },
  ratingCont: {
    alignSelf: "flex-start",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.primary,
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 2,
    gap: 4,
    marginTop: 4,
  },
  priceText: {
    alignSelf: "flex-start",
    color: "#212121",
    marginTop: 4,
    fontSize: 12,
  },
  categoryText: {
    alignSelf: "flex-start",
    marginTop: 4,
    fontSize: 12,
    color: "#111112",
  },
  editDeleteBtnCont: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export default Dashboard;
