function attachEventsListeners() {
    let days = document.getElementById('daysBtn')
    let hours = document.getElementById('hoursBtn')
    let seconds = document.getElementById('secondsBtn')
    let minutes = document.getElementById('minutesBtn')

    days.addEventListener('click', convertDays)
    hours.addEventListener('click', convertHours)
    minutes.addEventListener('click', convertMinutes)
    seconds.addEventListener('click', convertSeconds)
    function convertDays() {
        let days = document.getElementById('days')
        let hours = document.getElementById('hours')
        let seconds = document.getElementById('seconds')
        let minutes = document.getElementById('minutes')

        hours.value = days.value * 24
        minutes.value = hours.value * 60
        seconds.value = minutes.value * 60
    }

    function convertHours() {
        let hours = document.getElementById('hours')
        let days = document.getElementById('days')
        let seconds = document.getElementById('seconds')
        let minutes = document.getElementById('minutes')

        days.value = (hours.value / 24).toFixed(1)
        minutes.value = hours.value * 60
        seconds.value = minutes.value * 60
    }

    function convertMinutes() {
        let minutes = document.getElementById('minutes')
        let hours = document.getElementById('hours')
        let days = document.getElementById('days')
        let seconds = document.getElementById('seconds')


        hours.value = Math.trunc(minutes.value / 60)
        days.value = (hours.value / 24).toFixed(1)
        seconds.value = minutes.value * 60
    }

    function convertSeconds() {
        let seconds = document.getElementById('seconds')
        let minutes = document.getElementById('minutes')
        let hours = document.getElementById('hours')
        let days = document.getElementById('days')

        minutes.value = Math.trunc(seconds.value / 60)
        hours.value = Math.trunc(minutes.value / 60)
        days.value = (hours.value / 24).toFixed(1)
    }
}