class Car {
    constructor(name, number) {
        this.name = name
        this.number = number
    }
}

class QuickCar extends Car{
    constructor(name, number) {
        super(name, number)
        this.price = 1
    }
}
class SpecialCar extends Car{
    constructor(name, number) {
        super(name, number)
        this.price = 2
    }
}

class Trip {
    constructor(car) {
        this.car = car
    }

    start() {
        const car = this.car
        console.log(`车的名称是${car.name},车牌号是${car.number}`);
    }
    end() {
        const car = this.car
        console.log(`形成话费为${car.price*5}元`);
    } 
}

