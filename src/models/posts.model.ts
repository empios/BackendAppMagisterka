import { prop, getModelForClass, modelOptions } from '@typegoose/typegoose';

@modelOptions({ schemaOptions: { collection: 'posts', timestamps: true } })
class Post {
  @prop({ type: String, required: true })
  public message: string;

  @prop({ type: String, required: true })
  public userEmail: string;

  public createdAt?: Date;

  public updatedAt?: Date;
}

const PostModel = getModelForClass(Post);

export default PostModel;
