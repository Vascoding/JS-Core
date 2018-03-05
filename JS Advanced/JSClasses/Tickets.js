function database(ticketsInput, sortingCriteria) {
    let tickets = []
    class Ticket {
        constructor(destination, price, status) {
            this.destination = destination
            this.price = price
            this.status = status
        }
    }

    for (let i = 0; i < ticketsInput.length; i++) {
        let splitedTicket = ticketsInput[i].split('|')
        let destination = splitedTicket[0],
            price = Number(splitedTicket[1]),
            status = splitedTicket[2]
        tickets.push(new Ticket(destination, price, status))
    }

    return tickets.sort((a, b) => {
        if (sortingCriteria === 'price') {
            return a[sortingCriteria] - b[sortingCriteria]
        }
        return a[sortingCriteria].localeCompare(b[sortingCriteria])
    })
}

console.log(database(['Philadelphia|94.20|available',
        'New York City|95.99|available',
        'New York City|95.99|sold',
        'Boston|126.20|departed'],
    'destination'
));