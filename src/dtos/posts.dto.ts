import { IsEmail, IsString } from 'class-validator';
export class CreatePostDto {
  @IsString()
  public message: string;

  @IsEmail()
  public userEmail: string;
}
