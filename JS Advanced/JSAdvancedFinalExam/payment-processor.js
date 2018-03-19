class PaymentProcessor {
    constructor(option) {
        this.options = {types: ["service", "product", "other"], precision: 2}
        if (option !== undefined) {
            this.setOptions(option)
        }
        this.payments = []
    }

    registerPayment(id, name, type, value){
        if (id === undefined || id === '' || typeof id !== 'string') {
            throw new Error()
        }
        if (name === undefined || name === '' || typeof name !== 'string') {
            throw new Error()
        }

        if (typeof value !== 'number') {
            throw new Error()
        }

        if (!this.options.types.includes(type)) {
            throw new Error()
        }

        if (this.payments.find(p => p.id === id) !== undefined) {
            throw new Error('Id already exists!')
        }

        this.payments.push({
            id: id,
            name: name,
            type: type,
            value: value.toFixed(this.options['precision'])
        })
    }

    deletePayment(id){
        let payment = this.payments.find(p => p.id === id)
        if (payment === undefined) {
            throw new Error()
        }
        let removeIndex = this.payments.map(function(item) { return item.id; }).indexOf(id);

        this.payments.splice(removeIndex, 1);
    }

    get(id){
        let payment = this.payments.find(p => p.id === id)
        if (payment === undefined) {
            throw new Error()
        }
        return `Details about payment ID: ${payment.id}\n- Name: ${payment.name}\n- Type: ${payment.type}\n- Value: ${payment.value}`
    }

    setOptions(option){
        if (option.precision === undefined && option['types'] !== undefined) {
            this.options = {
               types: option['types'],
               precision: 2
           }
        }

        if (option.precision !== undefined && option['types'] !== undefined) {
            this.options = {
                types: option['types'],
                precision: option['precision']
            }
        }

        if (option.precision !== undefined && option['types'] === undefined) {
            this.options = {
                types: ["service", "product", "other"],
                precision: option['precision']
            }
        }

        if (option.precision === undefined && option['types'] === undefined) {
            this.options = {
                types: ["service", "product", "other"],
                precision: 2
            }
        }
    }

    toString(){
        let val = 0
        for (let payment of this.payments) {
            val += Number(payment.value)
        }
        return `Summary:\n- Payments: ${this.payments.length}\n- Balance: ${val}`
    }
}




// Should throw an error (invalid type)








// Initialize processor with custom types
const servicePyaments = new PaymentProcessor({types: ['service']});
servicePyaments.registerPayment('01', 'HR Consultation', 'service', 3000);
servicePyaments.registerPayment('02', 'Discount', 'service', -1500);
console.log(servicePyaments.toString());

// Initialize processor with custom precision
const transactionLog = new PaymentProcessor({precision: 5});
transactionLog.registerPayment('b5af2d02-327e-4cbf', 'Interest', 'other', 0.00153);
console.log(transactionLog.toString());
