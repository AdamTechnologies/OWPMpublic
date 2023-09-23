import { IsNotEmpty, IsNumber } from 'class-validator';

export class createPrizeDDto {
  @IsNotEmpty()
  @IsNumber()
  matching_count: number;

  @IsNotEmpty()
  @IsNumber()
  price: number;
}
