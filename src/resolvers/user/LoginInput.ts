import { InputType, Field } from 'type-graphql'
import { IsEmail, Length, MinLength } from 'class-validator'
import { PasswordValidate } from './PasswordValidate'

@InputType()
export class LoginInput {
  @Field()
  @IsEmail()
  @Length(5, 255)
  public email: string

  @Field()
  @MinLength(6)
  @PasswordValidate({
    message: '암호는 대소문자와 특수문자의 조합으로 6자리 이상 입력해주세요.'
  })
  public password: string
}
