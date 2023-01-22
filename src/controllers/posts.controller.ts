import { NextFunction, Request, Response } from 'express';
import PostsService from '@services/posts.service';
import { Post } from '@interfaces/posts.interface';
import { CreatePostDto } from '@dtos/posts.dto';

class UsersController {
  public postsService = new PostsService();

  public getPosts = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllPosts: Post[] = await this.postsService.findRecentPosts();

      res.status(200).json({ data: findAllPosts, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getPostsByEmail = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const email: string = req.params.email;
      const findAllPosts: Post[] = await this.postsService.findPostsByEmail(email);

      res.status(200).json({ data: findAllPosts, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public deletePostById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const postId: string = req.params.id;
      const deletedPostData: Post = await this.postsService.deletePost(postId);
      res.status(200).json({ data: deletedPostData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };

  public createPost = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const postData: CreatePostDto = req.body;
      const createUserData: Post = await this.postsService.createPost(postData);

      res.status(201).json({ data: createUserData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updatePost = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const postId: string = req.params.id;
      const postData: CreatePostDto = req.body;
      const updatePostData: Post = await this.postsService.updatePost(postId, postData);

      res.status(200).json({ data: updatePostData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };
}

export default UsersController;
