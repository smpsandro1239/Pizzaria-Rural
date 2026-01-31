import {
  IsString,
  IsArray,
  IsBoolean,
  IsOptional,
  IsNumber,
  ValidateNested,
  IsIn,
} from 'class-validator';
import { Type } from 'class-transformer';

class OrderItemDto {
  @IsString()
  pizzaId: string;

  @IsOptional()
  @IsString()
  sizeId?: string;

  @IsNumber()
  quantity: number;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  extras?: string[];
}

export class CreateOrderDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items: OrderItemDto[];

  @IsString()
  address: string;

  @IsString()
  phone: string;

  @IsBoolean()
  delivery: boolean;

  @IsOptional()
  @IsString()
  couponCode?: string;

  @IsOptional()
  @IsNumber()
  usePoints?: number;

  @IsOptional()
  @IsString()
  @IsIn(['CARD', 'MBWAY', 'CASH'])
  paymentMethod?: string;
}
