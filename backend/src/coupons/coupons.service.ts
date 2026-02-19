import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CouponsService {
  constructor(private prisma: PrismaService) {}

  async validate(code: string, orderValue: number) {
    const coupon = await this.prisma.coupon.findUnique({
      where: { code: code.toUpperCase() },
    });

    if (!coupon) {
      throw new NotFoundException('Cupão não encontrado');
    }

    if (!coupon.active) {
      throw new BadRequestException('Este cupão já não está ativo');
    }

    if (orderValue < coupon.minOrderValue) {
      throw new BadRequestException(`Este cupão requer uma encomenda mínima de ${(coupon.minOrderValue / 100).toFixed(2)}€`);
    }

    return {
      code: coupon.code,
      type: coupon.type,
      value: coupon.value,
    };
  }
}
