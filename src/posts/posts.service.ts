import { Injectable, NotFoundException } from '@nestjs/common';

export interface PostModel {
  id: number;
  author: string;
  title: string;
  content: string;
  likeCount: number;
  commentCount: number;
}

let posts: PostModel[] = [
  {
    id: 1,
    author: 'newjeans_official',
    title: '',
    content: '',
    likeCount: 10000,
    commentCount: 10000,
  },
  {
    id: 2,
    author: 'newjeans_official',
    title: '',
    content: '',
    likeCount: 10000,
    commentCount: 10000,
  },
  {
    id: 3,
    author: 'blackpink_official',
    title: '',
    content: '',
    likeCount: 10000,
    commentCount: 10000,
  },
];

@Injectable()
export class PostsService {
  getAllPosts(): PostModel[] {
    return posts;
  }

  getPostById(id: string): PostModel {
    const post = posts.find((post) => post.id === +id);
    if (!post) {
      throw new NotFoundException();
    }
    return post;
  }

  createPost(author: string, title: string, content: string) {
    const post: PostModel = {
      id: posts.length + 1,
      author,
      title,
      content,
      likeCount: 0,
      commentCount: 0,
    };

    posts.push(post);

    return post;
  }

  updatePost(id: string, author: string, title: string, content: string) {
    const post = posts.find((post) => post.id === +id);
    if (!post) {
      throw new NotFoundException();
    }

    const newPost = {
      ...post,
      ...(author && { author }),
      ...(title && { title }),
      ...(content && { content }),
    };
    posts = posts.map((post) => {
      if (post.id === +id) {
        return newPost;
      }

      return post;
    });

    return newPost;
  }

  deletePost(id: string) {
    const post = posts.find((post) => post.id === +id);
    if (!post) {
      throw new NotFoundException();
    }

    posts = posts.filter((post) => post.id !== +id);
    return id;
  }
}
