import admin from "firebase-admin";
import env from './env'

const credential = JSON.parse(
  Buffer.from(String(env.FIREBASE_CREDENTIAL), "base64").toString()
);

const app = admin.initializeApp({
  projectId: "flights-27676",
  credential: admin.credential.cert(credential),
});

export default app