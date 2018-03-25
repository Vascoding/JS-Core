function attachEvents() {
    let weather = new Map()
    let weatherSymbol = {
        'Sunny': '&#x2600;',
        'Partly sunny': '&#x26C5;',
        'Overcast': '&#x2601;',
        'Rain': '&#x2614;',
        'Degrees': '&#176;'
    }
    $('#submit').on('click', function () {
        let name = $('#location').val()
        $.ajax({
            method: 'GET',
            url: `https://judgetests.firebaseio.com/locations.json`,
            success: function (res) {
                for (let obj of res) {
                    weather.set(obj.name, obj.code)
                }
                $.ajax({
                    method: 'GET',
                    url: `https://judgetests.firebaseio.com/forecast/today/${weather.get(name)}.json `,
                    success: function (res) {
                        if (res !== null) {
                            $('#forecast').css('display', 'block')
                            let current = $('#current')
                            let wSymbol = $(`<span>${weatherSymbol[res.forecast.condition]}</span>`)
                            wSymbol.addClass('condition symbol')
                            wSymbol.appendTo(current)
                            let condition = $(`<span></span>`).addClass('condition')
                            condition.append(`<span class="forecast-data">${res.name}</span>`)
                            condition.append(`<span class="forecast-data">${res.forecast.low}${weatherSymbol['Degrees']}/${res.forecast.high}${weatherSymbol['Degrees']}</span>`)
                            condition.append(`<span class="forecast-data">${res.forecast.condition}</span>`)
                            condition.appendTo(current)
                            $.ajax({
                                method: 'GET',
                                url: `https://judgetests.firebaseio.com/forecast/upcoming/${weather.get(name)}.json`,
                                success: function (res) {
                                    let upcoming = $('#upcoming')
                                    for (let obj of res.forecast) {
                                        console.log(obj)
                                        let upcomingSpan = $(`<span>`).addClass('upcoming')
                                        upcomingSpan.append(`<span class="symbol">${weatherSymbol[obj.condition]}</span>`)
                                        upcomingSpan.append(`<span class="forecast-data">${obj.low}${weatherSymbol['Degrees']}/${obj.high}${weatherSymbol['Degrees']}</span>`)
                                        upcomingSpan.append(`<span class="forecast-data">${obj.condition}</span>`)
                                        upcomingSpan.appendTo(upcoming)
                                    }
                                },
                                error: function (err) {

                                }
                            })
                        } else {
                            let forecast = $('#forecast').css('display', 'block')
                            forecast.append(`<span>Error</span>`)
                        }
                    },
                    error: function (err) {
                    }
                })
            },
            error: function (err) {
            }
        })
    })


}