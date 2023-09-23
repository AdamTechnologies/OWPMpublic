import {
  IsDateString,
  IsNotEmpty,
  IsString,
  IsArray,
  ArrayMinSize,
  ArrayMaxSize,
  IsInt,
  Min,
  Max,
} from 'class-validator';

export class createPastDrawDto {
  @IsNotEmpty()
  @IsString()
  raffle_id: string;

  @IsDateString()
  @IsNotEmpty()
  date: Date;

  @IsArray()
  @ArrayMinSize(7)
  @ArrayMaxSize(7)
  @IsInt({ each: true })
  winning_number: number[];
}
