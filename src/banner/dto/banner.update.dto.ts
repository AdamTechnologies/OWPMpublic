import { IsNotEmpty, IsString } from "class-validator";

export class updateBannerDto{

    @IsNotEmpty()
    @IsString()
    id:string

    @IsNotEmpty()
    @IsString()
    title:string

    @IsNotEmpty()
    @IsString()
    image:string
}