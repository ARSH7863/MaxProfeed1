import {
  doc,
  query,
  where,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  serverTimestamp,
} from "firebase/firestore/lite";

import { Comment } from "../../../../TS/models";
import { AddCommentArgs, DeleteCommentArgs } from "../index";
import { firestore, commentsCollection } from "../../../../firebase/config";
import asyncHandler from "../../../../utils/asyncHandler";

const createComment = asyncHandler<AddCommentArgs>(
  async ({ feedbackId, body, author, parentCommentId = null }) => {
    const feedbackRef = doc(firestore, "feedback", feedbackId);
    const feedback = await getDoc(feedbackRef);
    if (!feedback.exists()) {
      throw new Error();
    }

    const newCommentDocRef = await addDoc(commentsCollection, {
      feedbackId,
      body,
      author,
      parentCommentId,
      updatedAt: serverTimestamp(),
    });

    // just to get the updatedAt timestamp from server :(
    const newComment = await getDoc(newCommentDocRef);

    // increase number of comments only if a top level comment is added
    !parentCommentId &&
      (await updateDoc(feedbackRef, {
        comments: feedback.data().comments + 1,
      }));

    return {
      id: newCommentDocRef.id,
      updatedAt: newComment.data()?.updatedAt.toDate().toString(),
      parentCommentId,
      body,
      author,
      replies: [],
    };
  }
);

const getAllComments = asyncHandler<string>(async (feedbackId) => {
  const commentsQuery = query(
    commentsCollection,
    where("feedbackId", "==", feedbackId)
  );
  const snapshot = await getDocs(commentsQuery);
  const comments: Comment[] = snapshot.docs.map((doc) => ({
    ...(doc.data() as Comment),
    id: doc.id,
    updatedAt: doc.data().updatedAt?.toDate().toString(),
  }));

  comments.sort((a, b) => +new Date(b.updatedAt) - +new Date(a.updatedAt));

  const topLevelComments = comments.filter(
    (comment) => comment.parentCommentId === null
  );

  topLevelComments.forEach((topLevelComment) => {
    const replies = comments.filter(
      (comment) => comment.parentCommentId === topLevelComment.id
    );
    // update replies array of parent comment
    topLevelComment.replies = replies;
  });

  return topLevelComments;
});

const removeComment = asyncHandler<DeleteCommentArgs>(
  async ({ commentId, commentAuthorId }) => {
    const commentRef = doc(firestore, "comments", commentId);
    const commentDoc = await getDoc(commentRef);
    if (
      !(commentDoc.exists() && commentDoc.data().author.uid === commentAuthorId)
    ) {
      throw new Error();
    }

    await deleteDoc(commentRef);
    const parentId = commentDoc.data().parentCommentId;
    // decrease number of comments only if a top level comment is deleted
    // parentId is null for a top level comment
    if (!parentId) {
      const feedbackRef = doc(
        firestore,
        "feedback",
        commentDoc.data().feedbackId
      );
      const feedbackDoc = await getDoc(feedbackRef);

      if (feedbackDoc.exists()) {
        await updateDoc(feedbackRef, {
          comments: feedbackDoc.data().comments - 1,
        });
      }
    }

    return { commentId, parentCommentId: parentId };
  }
);

export { createComment, getAllComments, removeComment };
