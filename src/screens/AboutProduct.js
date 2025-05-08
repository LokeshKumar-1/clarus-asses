import { Image, StyleSheet, Text, View } from "react-native";
import SafeScreen from "../components/SafeScreen/SafeScreen";
import { useEffect } from "react";
import { getProductsDetails } from "../api/homeApi";
import Header from "../components/headers/Header";
import Fontisto from "@expo/vector-icons/Fontisto";
import Feather from "@expo/vector-icons/Feather";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const AboutProduct = ({ navigation, route }) => {
  const { productData } = route.params;
  const { category, description, image, price, rating, title } =
    productData || {};

  useEffect(() => {
    if (!productData) {
      navigation.goBack();
    }
  }, []);

  return (
    <SafeScreen>
      <Header />
      <View style={styles.contentCont}>
        <Image
          source={{ uri: image }}
          style={styles.image}
          resizeMode="stretch"
        />
        <View style={styles.bottomContentCont}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.desc}>{`${description} - (${category})`}</Text>
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
              style={{ fontSize: 12, marginTop: 8, color: "#878787" }}
            >{`(${rating.count})`}</Text>
          </View>
          <Text style={styles.priceText}>{`$${price}`}</Text>
        </View>
      </View>
    </SafeScreen>
  );
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 300,
    paddingBottom: 10,
    borderBottomWidth: 5,
    elevation: 5,
    borderBottomColor: "#f1f3f6",
    paddingHorizontal: 16,
  },
  contentCont: {
    paddingVertical: 16,
  },
  title: {
    color: "#111112",
    fontSize: 14,
  },
  desc: {
    color: "#606265",
    marginTop: 4,
  },
  bottomContentCont: {
    paddingHorizontal: 16,
    paddingTop: 14,
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
    marginTop: 10,
  },
  priceText: {
    alignSelf: "flex-start",
    color: "#212121",
    marginTop: 4,
    fontSize: 18,
    fontWeight: "600",
  },
  categoryText: {
    alignSelf: "flex-start",
    marginTop: 4,
    fontSize: 12,
    color: "#111112",
  },
});

export default AboutProduct;
