import { Client, Account, Databases } from "react-native-appwrite";

export const client = new Client()
  .setEndpoint("https://fra.cloud.appwrite.io/v1")
  .setProject("68ed2869003adc4fd443")
  .setPlatform("com.aryamitrachaudhuri.bodiq");

export const account = new Account(client);
export const databases = new Databases(client);