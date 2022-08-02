import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { v4 as uuid } from 'uuid';

import { CreateCarDto, UpdateCarDto } from './dto';
import { Car } from './interfaces/car.interface';

@Injectable()
export class CarsService {
  private cars: Car[] = [
    // {
    //   id: uuid(),
    //   brand: 'Toyota',
    //   model: 'Corolla',
    // },
  ];

  findAll() {
    return this.cars;
  }

  findOneById(id: string) {
    const car = this.cars.find((car) => car.id === id);

    if (!car) throw new NotFoundException(`Car with id ${id} not found`);
    return car;
  }

  create(createCarDto: CreateCarDto) {
    const newCar: Car = {
      id: uuid(),
      ...createCarDto,
    };
    this.cars.push(newCar);
    return newCar;
  }

  update(id: string, updateCarDto: UpdateCarDto) {
    const car = this.findOneById(id);
    if (updateCarDto.id && updateCarDto.id !== car.id)
      throw new BadRequestException(`Car with id ${id} is not valid`);
    if (!car) throw new NotFoundException(`Car with id ${id} not found`);
    const updatedCar: Car = {
      ...car,
      ...updateCarDto,
    };
    this.cars = this.cars.map((car) => (car.id === id ? updatedCar : car));
    return updatedCar;
  }

  delete(id: string) {
    const carDB = this.findOneById(id);
    if (!carDB) throw new NotFoundException(`Car with id ${id} not found`);
    this.cars = this.cars.filter((car) => car.id !== id);
  }

  fillCarsWithSeedData(cars: Car[]) {
    this.cars = cars;
  }
}
