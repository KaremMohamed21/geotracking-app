import { IsNotEmpty } from 'class-validator';

export class User {
  name: string;

  @IsNotEmpty()
  position: { lng: number; lat: number };
}
