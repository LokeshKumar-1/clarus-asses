import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import SafeScreen from "../components/SafeScreen/SafeScreen";
import { useEffect, useState } from "react";
import Header from "../components/headers/Header";
import colors from "../utils/colors";
import { editExistingProductApi, postNewProductApi } from "../api/homeApi";
import CustomToast from "../components/toastMessage/Toast";
import {
  showFailureToastMessage,
  showSuccessToastMessage,
} from "../components/toastMessage/ToastMessageProvider";
import ScrollableScreen from "../components/SafeScreen/ScrollableScreen";

const AddAndEdit = ({ navigation, route }) => {
  const { purposeForVisit, productDetails } = route.params || {};

  const [productData, setProductData] = useState({
    title: "",
    price: "",
    description: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isBtnDisabled, setIsBtnDisabled] = useState(true);

  useEffect(() => {
    if (purposeForVisit === "edit") {
      setProductData((prevState) => ({
        ...prevState,
        title: productDetails.title,
        description: productDetails.description,
        price: productDetails.price,
      }));
    }
  }, []);
  useEffect(() => {
    checkToEnableBtn();
  }, [productData]);

  function checkToEnableBtn() {
    const { title, price, description } = productData;
    if (title && price && description) setIsBtnDisabled(false);
    else setIsBtnDisabled(true);
  }

  const btnEventHandler = async () => {
    setIsLoading(true);
    setIsBtnDisabled(true);

    purposeForVisit === "edit"
      ? await editBtnEventHandler()
      : await addBtnEventHandler();

    setIsLoading(false);
    setIsBtnDisabled(false);
  };

  const editBtnEventHandler = async () => {
    const editBodyContent = {
      id: productDetails.id,
      price: Number(productData.price),
      ...productData,
    };

    const response = await editExistingProductApi(
      productDetails.id,
      editBodyContent
    );
    if (response !== "invalid") {
      showSuccessToastMessage("Product updated successfully", () => {
        navigation.navigate("dashboard");
      });
    } else {
      showFailureToastMessage("Something went wrong");
    }
  };
  const addBtnEventHandler = async () => {
    const addBodyContent = {
      ...productData,
      image: "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
      rating: {
        rate: 4.7,
        count: 500,
      },
      category: "men's clothing",
      id: 0,
      price: Number(productData.price),
    };

    const response = await postNewProductApi(addBodyContent);
    if (response !== "invalid") {
      showSuccessToastMessage("Product added successfully", () => {
        navigation.navigate("dashboard");
      });
    } else {
      showFailureToastMessage("Something went wrong");
    }
  };

  const renderTitleInputView = () => {
    return (
      <View style={styles.inputItemCont}>
        <Text style={styles.inputItemTitle}>Title</Text>
        <TextInput
          style={styles.inputEle}
          placeholder="Required"
          placeholderTextColor="#64748B"
          autoCapitalize="none"
          value={productData.title}
          onChangeText={(value) =>
            setProductData((prevState) => ({
              ...prevState,
              title: value,
            }))
          }
        />
      </View>
    );
  };

  const renderDescInputView = () => {
    return (
      <View style={[styles.inputItemCont, { marginTop: 16 }]}>
        <Text style={styles.inputItemTitle}>Description</Text>
        <TextInput
          multiline
          style={styles.inputEle}
          placeholder="Required"
          placeholderTextColor="#64748B"
          autoCapitalize="none"
          value={productData.description}
          onChangeText={(value) =>
            setProductData((prevState) => ({
              ...prevState,
              description: value,
            }))
          }
        />
      </View>
    );
  };

  const renderPriceInputView = () => {
    return (
      <View style={[styles.inputItemCont, { marginTop: 16 }]}>
        <Text style={styles.inputItemTitle}>Price</Text>
        <TextInput
          style={styles.inputEle}
          keyboardType="numeric"
          placeholder="Required"
          placeholderTextColor="#64748B"
          autoCapitalize="none"
          value={productData.price.toString()}
          onChangeText={(value) =>
            setProductData((prevState) => ({
              ...prevState,
              price: value,
            }))
          }
        />
      </View>
    );
  };

  return (
    <SafeScreen>
      <Header />
      <View style={styles.contentCont}>
        {renderTitleInputView()}
        {renderDescInputView()}
        {renderPriceInputView()}
        <Pressable
          style={[
            styles.addBtn,
            { backgroundColor: isBtnDisabled ? "#CBD5E1" : colors.primary },
          ]}
          onPress={btnEventHandler}
          disabled={isBtnDisabled}
        >
          {isLoading ? (
            <ActivityIndicator size="25" color="#fff" />
          ) : (
            <Text style={styles.addBtnText}>
              {purposeForVisit === "edit" ? "Save" : "Add"}
            </Text>
          )}
        </Pressable>
      </View>
      <CustomToast />
    </SafeScreen>
  );
};

const styles = StyleSheet.create({
  contentCont: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  inputItemCont: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 6,
  },
  inputItemTitle: {
    color: "#1E293B",
    fontSize: 16,
    fontWeight: "600",
  },
  inputEle: {
    width: "100%",
    paddingVertical: 10,
    paddingHorizontal: 8,
    color: "#1E293B",
    fontSize: 13,
    fontWeight: "500",
    borderWidth: 1,
    borderColor: "#878787",
    borderRadius: 4,
  },
  addBtn: {
    width: "100%",
    paddingVertical: 12,
    paddingHorizontal: 16,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    marginTop: "auto",
  },
  addBtnText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "600",
  },
});

export default AddAndEdit;
