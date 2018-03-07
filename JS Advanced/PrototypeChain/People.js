function people() {
    class Employee{
        constructor(name, age) {
            if (new.target === Employee) {
                throw new Error('Abstract class cannot be instantiated!')
            }
            this.name = name
            this.age = age
            this.salary = 0
            this.tasks = []
        }

        work(){
            let currentTask = this.tasks.shift()
            console.log(currentTask)
            this.tasks.push(currentTask)
        }

        collectSalary(){
            console.log(`${this.name} received ${this.getSalary()} this month.`)
        }

        getSalary(){
            return this.salary
        }
    }

    class Junior extends Employee{
        constructor(name, age){
            super(name, age)
            this.tasks.push(`${this.name} is working on a simple task.`)
        }
    }

    class Senior extends Employee{
        constructor(name, age){
            super(name, age)
            this.tasks.push(`${this.name} is working on a complicated task.`)
            this.tasks.push(`${this.name} is taking time off work.`)
            this.tasks.push(`${this.name} is supervising junior workers.`)
        }
    }

    class Manager extends Employee{
        constructor(name, age){
            super(name, age)
            this.dividend = 0
            this.tasks.push(`${this.name} scheduled a meeting.`)
            this.tasks.push(`${this.name} is preparing a quarterly report.`)
        }

        getSalary(){
            return this.salary + this.dividend
        }
    }

    return {Employee, Junior, Senior, Manager}
}


let Junior = people().Junior
let Manager = people().Manager

let misho = new Manager('Misho', 45)
misho.divident = 34
misho.salary = 52
misho.collectSalary()
let jun = new Junior('Pesho', 25)
