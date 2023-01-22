import postsModel from '@models/posts.model';
import { Post } from '@interfaces/posts.interface';
import { isEmpty } from '@utils/util';
import { HttpException } from '@exceptions/HttpException';
import { CreatePostDto } from '@dtos/posts.dto';

class PostsService {
  public async findRecentPosts(): Promise<Post[]> {
    const posts: Post[] = await postsModel.find().sort({ _id: -1 }).limit(20);
    return posts;
  }

  public async findPostsByEmail(email: string): Promise<Post[]> {
    console.log(email);
    const posts: Post[] = await postsModel.find({ userEmail: email });
    return posts;
  }

  public async createPost(postData: CreatePostDto): Promise<Post> {
    if (isEmpty(postData)) throw new HttpException(400, 'postData is empty');
    return await postsModel.create({ ...postData });
  }

  public async deletePost(postId: string): Promise<Post> {
    const deletePostById: Post = await postsModel.findByIdAndDelete(postId);
    if (!deletePostById) throw new HttpException(409, "Post doesn't exist");
    return deletePostById;
  }

  public async updatePost(postId: string, postData: CreatePostDto): Promise<Post> {
    if (isEmpty(postData)) throw new HttpException(400, 'userData is empty');
    const updatePostById: Post = await postsModel.findByIdAndUpdate(postId, { message: postData.message });
    return updatePostById;
  }
}

export default PostsService;
