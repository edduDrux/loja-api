import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Product } from '@prisma/client';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async create(data: Product): Promise<Product> {
    return this.prisma.product.create({ data });
  }

  async findAll(skip?: number, take?: number): Promise<Product[]> {
    return this.prisma.product.findMany({
      skip,
      take,
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string): Promise<Product> {
    return this.prisma.product.findUnique({ where: { id } });
  }

  async update(id: string, data: Partial<Product>): Promise<Product> {
    return this.prisma.product.update({ where: { id }, data });
  }

  async remove(id: string): Promise<Product> {
    return this.prisma.product.delete({ where: { id } });
  }

  async search(description: string): Promise<Product[]> {
    return this.prisma.product.findMany({
      where: {
        description: { contains: description, mode: 'insensitive' },
      },
    });
  }
}