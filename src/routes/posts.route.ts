import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import PostsController from '@controllers/posts.controller';
import validationMiddleware from '@middlewares/validation.middleware';
import { CreatePostDto } from '@dtos/posts.dto';

class PostsRoute implements Routes {
  public path = '/posts';
  public router = Router();
  public postsController = new PostsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.postsController.getPosts);
    this.router.get(`${this.path}/:email`, this.postsController.getPostsByEmail);
    this.router.delete(`${this.path}/:id`, this.postsController.deletePostById);
    this.router.put(`${this.path}/:id`, validationMiddleware(CreatePostDto, 'body', true), this.postsController.updatePost);
    this.router.post(`${this.path}`, validationMiddleware(CreatePostDto, 'body'), this.postsController.createPost);
  }
}

export default PostsRoute;
