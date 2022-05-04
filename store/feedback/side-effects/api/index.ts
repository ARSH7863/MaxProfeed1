import {
  doc,
  where,
  addDoc,
  getDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  query,
  serverTimestamp,
} from "firebase/firestore/lite";

import {
  AddFeedbackFields,
  UpdateFeedbackFields,
  FeedbackByIdArgs,
  DeleteFeedbackArgs,
  LikeFeedbackArgs,
  AddToRoadmapArgs,
} from "../index";

import { feedbackCollection, firestore } from "../../../../firebase/config";
import asyncHandler from "../../../../utils/asyncHandler";

const createFeedback = asyncHandler<AddFeedbackFields>(
  async ({ title, description, category, type, projectId, author }) => {
    const projectRef = doc(firestore, "projects", projectId);
    const project = await getDoc(projectRef);
    if (!project.exists()) {
      throw new Error();
    }

    let feedbackType: string;
    if (type) {
      // Only project owners are allowed to select other types ("Planned", "Live" etc)
      if (project.data().owner === author.uid) {
        feedbackType = type;
      } else {
        feedbackType = "Suggestion";
      }
    } else {
      feedbackType = "Suggestion";
    }

    await addDoc(feedbackCollection, {
      title,
      description,
      category,
      projectId,
      author,
      likes: 0,
      likedBy: [],
      comments: 0,
      type: feedbackType,
      updatedAt: serverTimestamp(),
    });

    await updateDoc(projectRef, {
      numberOfFeedbacks: project.data().numberOfFeedbacks + 1,
    });
  }
);

const getFeedbacksForProject = asyncHandler<string>(async (projectId) => {
  const feedbacksQuery = query(
    feedbackCollection,
    where("projectId", "==", projectId)
  );
  const snapshot = await getDocs(feedbacksQuery);
  const feedbacks = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
    updatedAt: doc.data().updatedAt?.toDate().toString(),
  }));

  feedbacks.sort((a, b) => +new Date(b.updatedAt) - +new Date(a.updatedAt));

  return feedbacks;
});

const feedbackById = asyncHandler<FeedbackByIdArgs>(
  async ({ projectId, feedbackId }) => {
    const projectRef = doc(firestore, "projects", projectId);
    const projectDoc = await getDoc(projectRef);
    if (!projectDoc.exists()) {
      throw new Error();
    }

    const feedbackRef = doc(firestore, "feedback", feedbackId);
    const feedbackDoc = await getDoc(feedbackRef);
    if (!feedbackDoc.exists()) {
      throw new Error();
    }

    const feedback = {
      ...feedbackDoc.data(),
      id: feedbackDoc.id,
      updatedAt: feedbackDoc.data().updatedAt?.toDate().toString(),
      projectOwner: projectDoc.data().owner,
    };

    return feedback;
  }
);

const deleteProjectFeedback = asyncHandler<DeleteFeedbackArgs>(
  async ({ feedbackAuthor, feedbackId }) => {
    const feedbackRef = doc(firestore, "feedback", feedbackId);
    const feedbackDoc = await getDoc(feedbackRef);

    if (
      !(
        feedbackDoc.exists() && feedbackDoc.data().author.uid === feedbackAuthor
      )
    ) {
      throw new Error();
    }

    await deleteDoc(feedbackRef);
    const projectRef = doc(firestore, "projects", feedbackDoc.data().projectId);
    const projectDoc = await getDoc(projectRef);

    if (projectDoc.exists()) {
      await updateDoc(projectRef, {
        numberOfFeedbacks: projectDoc.data().numberOfFeedbacks - 1,
      });
    }
  }
);

const updateProjectFeedback = asyncHandler<UpdateFeedbackFields>(
  async ({
    projectId,
    feedbackId,
    title,
    description,
    category,
    type,
    authorId,
  }) => {
    const projectRef = doc(firestore, "projects", projectId);
    const project = await getDoc(projectRef);
    if (!project.exists()) {
      throw new Error();
    }

    const feedbackRef = doc(firestore, "feedback", feedbackId);

    let feedbackType: string;
    if (type) {
      if (project.data().owner === authorId) feedbackType = type;
      else feedbackType = "Suggestion";
    } else feedbackType = "Suggestion";

    await updateDoc(feedbackRef, {
      title,
      description,
      category,
      type: feedbackType,
      updatedAt: serverTimestamp(),
    });
  }
);

const likeFeedbackById = asyncHandler<LikeFeedbackArgs>(
  async ({ feedbackId, userId }) => {
    const feedbackRef = doc(firestore, "feedback", feedbackId);
    const feedback = await getDoc(feedbackRef);

    if (feedback.exists()) {
      let likes: number = feedback.data().likes;
      let likedBy: string[] = feedback.data().likedBy;

      if (likedBy.includes(userId)) {
        likes -= 1;
        likedBy = likedBy.filter((uid: string) => uid !== userId);
      } else {
        likes += 1;
        likedBy.push(userId);
      }

      await updateDoc(feedbackRef, {
        likes,
        likedBy,
      });

      return { feedbackId, userId, likes, likedBy };
    }
  }
);

const addFeedbackToRoadmap = asyncHandler<AddToRoadmapArgs>(
  async ({ projectOwner, feedbackId, userId, type }) => {
    const feedbackRef = doc(firestore, "feedback", feedbackId);

    let feedbackType: string;
    if (type) {
      if (projectOwner === userId) feedbackType = type;
      else feedbackType = "Suggestion";
    } else feedbackType = "Suggestion";

    await updateDoc(feedbackRef, {
      type: feedbackType,
    });
  }
);

export {
  createFeedback,
  getFeedbacksForProject,
  feedbackById,
  deleteProjectFeedback,
  updateProjectFeedback,
  likeFeedbackById,
  addFeedbackToRoadmap,
};
