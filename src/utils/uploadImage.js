// src/utils/uploadImage.js
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebaseConfig";

export const uploadImage = async (file) => {
  const imageRef = ref(storage, `productos/${Date.now()}-${file.name}`);
  await uploadBytes(imageRef, file);
  const url = await getDownloadURL(imageRef);
  return url; // Esta URL la puedes guardar en MongoDB
};
