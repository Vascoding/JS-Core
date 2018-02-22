function calendar(date) {
    let [day, month, year] = date
    let mon = [' ', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    let content = $('#content')
    let table = $('<table>')
    let caption = $('<caption>')
    caption.text(`${mon[month]} ${year}`)
    caption.appendTo(table)
    table.appendTo(content)

    let tBody = $('<tbody>')
    let tr = $('<tr>')
        .append('<th>Mon</th>')
        .append('<th>Tue</th>')
        .append('<th>Wed</th>')
        .append('<th>Thu</th>')
        .append('<th>Fri</th>')
        .append('<th>Sat</th>')
        .append('<th>Sun</th>')

    tr.appendTo(tBody)

    tBody.appendTo(table)

    let myDate = new Date(`${month}/${day}/${year}`)
    let currentDay = myDate.getDate()
    let days = new Date(year, month, 0)
    let firstDay = new Date(`${month}/1/${year}`).getDay()
    let weeks = days.getDate()/7

    for (let i = 0; i < Math.ceil(weeks + 1); i++) {
        let tr = $('<tr></tr>')
        for (let j = 0; j < 7; j++) {
            tr.append('<td class="day"></td>')
        }
        tr.appendTo(tBody)
    }

    let ths = $('.day')
    let start = false
    let isSunday = false
    let counter = 0
    for (let i = 0; i < ths.length; i++) {
        if (firstDay === 0 && isSunday === false) {
            isSunday = true
            i = 6
            start = true
            counter = 1
        }

        if (firstDay === i + 1) {
            counter = 1
            $(ths[i]).text(counter)
            start = true
        }
        if (start) {
            if (currentDay === counter) {
                $(ths[i]).attr('class', 'today').text(counter)
            } else {
                $(ths[i]).text(counter)
            }
        }

        if (counter >= days.getDate()) {
            break
        }
        counter++
    }
    let rows = $('tr:last td:first').text()
    if (rows === '') {
        $('tr:last').remove()
    }
}
