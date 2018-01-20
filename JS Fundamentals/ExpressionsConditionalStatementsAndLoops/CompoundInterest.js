function compoundInterest(args) {
    let principalSum = args[0],
        rateInPercent = args[1],
        periodInMonths = 12/args[2],
        years = args[3]

    let compoundInterest = principalSum * Math.pow((1 + ((rateInPercent/100) / periodInMonths)), periodInMonths * years)

    console.log(compoundInterest.toFixed(2))
}

compoundInterest([1500, 4.3, 3, 6])