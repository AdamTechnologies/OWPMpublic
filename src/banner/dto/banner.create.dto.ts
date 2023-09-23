import { IsNotEmpty, IsString } from "class-validator";

export class createBannerDto{
    @IsNotEmpty()
    @IsString()
    title:string
}