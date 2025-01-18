import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { PostsModel } from './entities/posts.entity';
import { InjectRepository } from '@nestjs/typeorm';

export interface PostModel {
  id: number;
  author: string;
  title: string;
  content: string;
  likeCount: number;
  commentCount: number;
}

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostsModel)
    private readonly postsRepository: Repository<PostsModel>,
  ) {}

  async getAllPosts() {
    return this.postsRepository.find();
  }

  async getPostById(id: string) {
    const post = await this.postsRepository.findOne({
      where: {
        id: +id,
      },
    });
    if (!post) {
      throw new NotFoundException();
    }
    return post;
  }

  async createPost(author: string, title: string, content: string) {
    const post = this.postsRepository.create({
      author,
      title,
      content,
      likeCount: 0,
      commentCount: 0,
    });

    const newPost = await this.postsRepository.save(post);
    return newPost;
  }

  async updatePost(id: string, author: string, title: string, content: string) {
    const post = await this.postsRepository.findOne({
      where: {
        id: +id,
      },
    });
    if (!post) {
      throw new NotFoundException();
    }

    const newPost = this.postsRepository.save({
      ...post,
      ...(author && { author }),
      ...(title && { title }),
      ...(content && { content }),
    });
    return newPost;
  }

  async deletePost(id: string) {
    const post = await this.postsRepository.findOne({
      where: {
        id: +id,
      },
    });
    if (!post) {
      throw new NotFoundException();
    }

    await this.postsRepository.delete(+id);
    return id;
  }
}
