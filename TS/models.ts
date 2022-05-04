export interface LoginFormFields {
  email: string;
  password: string;
}

export interface SignupFormFields {
  name: string;
  email: string;
  password: string;
  avatar: string;
}

export interface ProjectFormFields {
  name: string;
  description: string;
  image: File;
}

export interface FeedbackFormFields {
  title: string;
  category: string;
  description: string;
  type?: string;
}

export interface CommentFormFields {
  body: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  image: string;
  owner: string;
  updatedAt: string;
  imageStorageId: string;
  numberOfFeedbacks: number;
}

export interface Feedback {
  id: string;
  title: string;
  category: string;
  type?: string;
  description: string;
  updatedAt: string;
  likes: number;
  likedBy: string[];
  comments: number;
  projectId: string;
  author: { uid: string; name: string; avatar: string };
}

export interface Comment {
  id: string;
  body: string;
  author: { uid: string; name: string; avatar: string };
  updatedAt: string;
  parentCommentId: string;
  replies: Comment[];
}
