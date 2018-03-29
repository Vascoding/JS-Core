function attachEvents() {
    $('#getVenues').on('click', function () {
        let date = $('#venueDate').val()
        $.ajax({
            method: 'POST',
            url: `https://baas.kinvey.com/rpc/kid_BJ_Ke8hZg/custom/calendar?query=${date}`,
            success: function (res) {
                $('#venue-info').empty()
                for (let id of res) {
                    getVenue(id)
                }
            },
            error: function (err) {
                console.log(err)
            },
            beforeSend: authorize
        })
    })

    function authorize(xhr) {
        xhr.setRequestHeader ("Authorization", "Basic " + btoa('guest' + ":" + 'pass'))
    }

    function getVenue(id) {
        return $.ajax({
            method: 'GET',
            url: `https://baas.kinvey.com/appdata/kid_BJ_Ke8hZg/venues/${id}`,
            success: function (res) {
                let venue = new Venue(res._id, res.name, res.description, res.startingHour, res.price)
                venue.appendToInfo('#venue-info')
            },
            error: function (err) {

            },
            beforeSend: authorize
        })
    }

    class Venue {
        constructor(id, name, description, startingHour, price) {
            this.id = id
            this.name = name
            this.description = description
            this.startingHour = startingHour
            this.price = price
            this.element = this.createElement()
        }

        createElement() {
            let venueInfo = $(`<div class="venue" id="${this.id}">`)
            let moreDetailsButton = $(`<span class="venue-name"><input class="info" type="button" value="More info">${this.name}</span>`)
            moreDetailsButton.find('input').on('click', function (event) {
                let venueDetails = $(event.target.parentNode.parentNode).find('.venue-details:first')
                if ($(venueDetails).attr('style') === 'display: block;') {
                    $(venueDetails).attr('style', 'display: none;')
                } else {
                    $(venueDetails).attr('style', 'display: block;')
                }
            })
            venueInfo.append(moreDetailsButton)
            let venueDetails = $(`<div class="venue-details" style="display: none;">`)

            let table = $(`<table>`)
            let firstTr = $('<tr>')
            firstTr.append(`<th>Ticket Price</th>`)
            firstTr.append(`<th>Quantity</th>`)
            firstTr.append(`<th>`)

            let infoTr = $(`<tr>`)
            infoTr.append(`<td class="venue-price">${this.price} lv</td>`)
            infoTr.append(`<td><select class="quantity">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select></td>
`)
            let purchiseButton = $(`<td><input class="purchase" type="button" value="Purchase"></td>`)
            let that = this
            let qty = 0
            purchiseButton.find('input').on('click', function (event) {
                qty = $(event.target.parentNode.parentNode).find('.quantity option:selected').val()

                let htmlLayout = $(`<span class="head">Confirm purchase</span>
<div class="purchase-info">
  <span>${that.name}</span>
  <span>${qty} x ${that.price}</span>
  <span>Total: ${qty * that.price} lv</span>
  <input type="button" value="Confirm">
</div>
`)

                htmlLayout.find('input').on('click', function () {
                    $.ajax({
                        method: 'POST',
                        url: `https://baas.kinvey.com/rpc/kid_BJ_Ke8hZg/custom/purchase?venue=${that.id}&qty=${qty}`,
                        success: function (res) {
                            $('#venue-info').empty()
                            $('#venue-info').append(`<span>You may print this page as your ticket</span>`)
                            $('#venue-info').append(res.html)
                        },
                        error: function (err) {

                        },
                        beforeSend: authorize
                    })
                })

                $('#venue-info').empty()
                $('#venue-info').append(htmlLayout)
            })

            infoTr.append(purchiseButton)

            table.append(firstTr)
            table.append(infoTr)
            venueDetails.append(table)
            venueInfo.append(venueDetails)

            return venueInfo
        }

        appendToInfo(elementId){
            $(elementId).append(this.element)
        }
    }
}