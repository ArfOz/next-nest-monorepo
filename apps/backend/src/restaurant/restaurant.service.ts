import { RestaurantDBService } from '@database';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class RestaurantService {
    constructor(private readonly restaurantDBService: RestaurantDBService) {}

    getData(): { message: string } {
        return { message: 'Hello API' };
    }

    async getAll() {
        const data = await this.restaurantDBService.getAll();
        return data;
    }

    async addRestaurant(data: Prisma.RestaurantsCreateInput) {
        const response = await this.restaurantDBService.addRestaurant(data);
        return response;
    }
}
