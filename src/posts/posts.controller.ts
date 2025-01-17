import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { PostsService } from './posts.service';

interface PostModel {
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

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  getPosts(): PostModel[] {
    return posts;
  }

  @Get(':id')
  getPost(@Param('id') id: string) {
    const post = posts.find((post) => post.id === +id);
    if (!post) {
      throw new NotFoundException();
    }
    return post;
  }

  @Post()
  postPosts(
    @Body('author') author: string,
    @Body('title') title: string,
    @Body('content') content: string,
  ) {
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

  @Patch(':id')
  patchPosts(
    @Param('id') id: string,
    @Body('author') author?: string,
    @Body('title') title?: string,
    @Body('content') content?: string,
  ) {
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

  @Delete(':id')
  deletePosts(@Param('id') id: string) {
    const post = posts.find((post) => post.id === +id);
    if (!post) {
      throw new NotFoundException();
    }

    posts = posts.filter((post) => post.id !== +id);
    return id;
  }
}
