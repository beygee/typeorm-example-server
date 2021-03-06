import { IsEmail, Length, MinLength } from 'class-validator'
import { Field, InputType } from 'type-graphql'
import { IsEmailExist, IsNicknameExist } from './RegisterValidate'
import { PasswordValidate } from './PasswordValidate'

@InputType()
export class RegisterInput {
  @Field()
  @IsEmail()
  @Length(5, 255)
  @IsEmailExist({ message: '이미 사용 중인 이메일입니다.' })
  public email: string

  @Field()
  @Length(1, 255)
  @IsNicknameExist({ message: '이미 사용 중인 별명입니다.' })
  public nickname: string

  @Field()
  @MinLength(6)
  @PasswordValidate({
    message: '암호는 대소문자와 특수문자의 조합으로 6자리 이상 입력해주세요.'
  })
  public password: string
}
