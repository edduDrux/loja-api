// src/products/products.controller.ts
import { Controller, Get, Post, Body, Param, Delete, Put, Query, UseGuards, Request } from '@nestjs/common';
import { ProductsService } from './products.service';
import { AuthGuard } from '@nestjs/passport';
import { Product } from '@prisma/client';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() data: Product, @Request() req) {
    if (req.user.role !== 'manager') {
      return { message: 'Access denied' };
    }
    return this.productsService.create(data);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  update(@Param('id') id: string, @Body() data: Partial<Product>, @Request() req) {
    if (req.user.role !== 'manager') {
      return { message: 'Access denied' };
    }
    return this.productsService.update(id, data);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    if (req.user.role !== 'manager') {
      return { message: 'Access denied' };
    }
    return this.productsService.remove(id);
  }

  @Get()
  findAll(@Query('skip') skip?: number, @Query('take') take?: number) {
    return this.productsService.findAll(Number(skip) || 0, Number(take) || 10);
  }

  @Get('search')
  search(@Query('description') description: string) {
    return this.productsService.search(description);
  }
}
