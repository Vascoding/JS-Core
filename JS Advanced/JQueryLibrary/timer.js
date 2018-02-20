function timer() {
    $('#start-timer').on('click', start)
    $('#stop-timer').on('click', stop)
    let timer = null
    function start() {
        if (timer === null) {
            $('.timer').text('00')
            let sec = 0
            timer = setInterval(() => {
                sec++
                let seconds = '0' + Math.floor(sec % 60)
                let minutes = '0' + (Math.floor(sec / 60) % 60)
                let hours = '0' + (Math.floor(sec / 60 / 60) % 24)
                $('#seconds').text(seconds.slice(-2))
                $('#minutes').text(minutes.slice(-2))
                $('#hours').text(hours.slice(-2))
            }, 1000)
        }
    }

    function stop() {
        clearInterval(timer)
        timer = null
    }
}
