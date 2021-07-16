import Amadeus from "amadeus";
import firebase from "./firebase";

const amadeus = new Amadeus({
  clientId: "BiUzqF1iysRScGTR2iPS9fKRf5Gbgxft",
  clientSecret: "pmxTVx57EsqDGq5f",
});

export const getData = async () => {
  try {
    const response = await amadeus.shopping.flightDates.get({
      origin: "MUC",
      destination: "MAD",
    });
    const data = JSON.parse(response.body)

    const now = new Date();
    await firebase
      .firestore()
      .collection("flights")
      .doc(
        `${now.getFullYear()}-${now.getMonth()}-${now.getDate()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`
      )
      .set(data);

    return data
  } catch (error) {
    const now = new Date();
    await firebase
      .firestore()
      .collection("logs")
      .doc(
        `${now.getFullYear()}-${now.getMonth()}-${now.getDate()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`
      )
      .set({ error: error.message });
  }
};
