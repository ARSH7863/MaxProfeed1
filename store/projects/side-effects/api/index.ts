import { v4 as uuidv4 } from "uuid";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

import {
  addDoc,
  getDocs,
  serverTimestamp,
  query,
  where,
  doc,
  getDoc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore/lite";

import {
  storage,
  projectsCollection,
  firestore,
} from "../../../../firebase/config";

import { ProjectFormFields } from "../../../../TS/models";
import { UpdateProjectFields, DeleProjectArgs } from "../index";
import asyncHandler from "../../../../utils/asyncHandler";

const addProject = asyncHandler<ProjectFormFields & { owner: string }>(
  async ({ name, description, image, owner }) => {
    const imageStorageId = uuidv4();
    const uploadRef = ref(storage, `projects/${imageStorageId}`);
    const uploadedImage = await uploadBytes(uploadRef, image, {
      contentType: image.type,
    });
    const imageUrl = await getDownloadURL(uploadedImage.ref);

    await addDoc(projectsCollection, {
      name,
      description,
      owner,
      imageStorageId,
      image: imageUrl,
      numberOfFeedbacks: 0,
      updatedAt: serverTimestamp(),
    });
  }
);

const allProjects = asyncHandler<void>(async () => {
  const snapshot = await getDocs(projectsCollection);
  const projects = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
    updatedAt: doc.data().updatedAt?.toDate().toString(),
  }));

  projects.sort((a, b) => +new Date(b.updatedAt) - +new Date(a.updatedAt));

  return projects;
});

const userProjects = asyncHandler<string>(async (userId) => {
  const projectsQuery = query(projectsCollection, where("owner", "==", userId));
  const snapshot = await getDocs(projectsQuery);
  const projects = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
    updatedAt: doc.data().updatedAt?.toDate().toString(),
  }));

  projects.sort((a, b) => +new Date(b.updatedAt) - +new Date(a.updatedAt));

  return projects;
});

const projectById = asyncHandler<string>(async (projectId) => {
  const projectRef = doc(firestore, "projects", projectId);
  const projectDoc = await getDoc(projectRef);

  if (!projectDoc.exists()) {
    throw new Error();
  }

  const project = {
    ...projectDoc.data(),
    id: projectDoc.id,
    updatedAt: projectDoc.data().updatedAt?.toDate().toString(),
  };

  return project;
});

const deleteUserProject = asyncHandler<DeleProjectArgs>(
  async ({ projectId, imageStorageId }) => {
    const projectRef = doc(firestore, "projects", projectId);
    await deleteDoc(projectRef);
    const imageRef = ref(storage, `projects/${imageStorageId}`);
    await deleteObject(imageRef);
  }
);

const updateUserProject = asyncHandler<UpdateProjectFields>(
  async ({ projectId, name, description, image, imageStorageId }) => {
    const projectRef = doc(firestore, "projects", projectId);

    let imageUrl, imageId;
    // if a new file is uploaded (otherwise image will be a url of previous image)
    if (typeof image !== "string") {
      // upload image to firebase storage
      imageId = uuidv4();
      const uploadRef = ref(storage, `projects/${imageId}`);
      const uploadedImage = await uploadBytes(uploadRef, image, {
        contentType: image.type,
      });
      imageUrl = await getDownloadURL(uploadedImage.ref);
    }

    await updateDoc(projectRef, {
      name,
      description,
      image: imageUrl ?? image,
      imageStorageId: imageUrl && imageId ? imageId : imageStorageId,
      updatedAt: serverTimestamp(),
    });

    // remove previous image if new image was uploaded
    if (imageUrl) {
      const oldImageRef = ref(storage, `projects/${imageStorageId}`);
      await deleteObject(oldImageRef);
    }
  }
);

export {
  addProject,
  allProjects,
  userProjects,
  projectById,
  deleteUserProject,
  updateUserProject,
};
