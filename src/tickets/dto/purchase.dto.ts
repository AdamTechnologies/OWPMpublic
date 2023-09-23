import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class purchaseDto {
  @IsNotEmpty()
  @IsDateString()
  date: Date;

  // @IsNotEmpty()
  // @IsString()
  password: string;

  @IsArray()
  @ArrayMinSize(7)
  @ArrayMaxSize(7)
  @IsInt({ each: true })
  number: number[];
}
