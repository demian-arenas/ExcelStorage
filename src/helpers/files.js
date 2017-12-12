import { firebaseStorage, ref } from "../config/constants";

export function uploadFile (name) {
  const storageRef = firebaseStorage.ref(`docs/${name}`);
  return storageRef
}

export function saveFile(metadataFile) {
  const date = new Date();
  return ref.child(`docs/${metadataFile.generation}`)
    .set({
      createdAt:  `${date.getMonth()}${date.getFullYear()}`,
      name: metadataFile.name,
      url: metadataFile.downloadURLs[0],
      size: metadataFile.size,
      path: metadataFile.fullPath
    })
    .then(() => metadataFile);
}
