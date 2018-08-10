import '../css/index.css'

class Person{
  constructor(name) {
    this.name = name
  }
  getName() {
    return this.name
  }
}

const p = new Person('wyt')

console.log(p.getName());