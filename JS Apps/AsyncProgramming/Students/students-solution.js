function loadStudents() {
    let table = $('#results')
    $.ajax({
        method: 'GET',
        url: 'https://baas.kinvey.com/appdata/kid_BJXTsSi-e/students',
        success: function (res) {
            let ordered = res.map(a => a.ID).sort((a,b) => {
                return a - b
            })
            for (let id of ordered) {
                let tr = $('<tr>')
                tr.append(`<td>${id}</td>`)
                tr.append(`<td>${res[id].FirstName}</td>`)
                tr.append(`<td>${res[id].LastName}</td>`)
                tr.append(`<td>${res[id].FacultyNumber}</td>`)
                tr.append(`<td>${res[id].Grade}</td>`)
                tr.appendTo(table)
            }
        },
        error: function (err) {

        },
        beforeSend: authorize
    })

    function authorize(xhr) {
        xhr.setRequestHeader ("Authorization", "Basic " + btoa('guest' + ":" + 'guest'))
    }

    let div = $(`<div id="animate"></div>`)
    let lableId = $('<label>ID</label>')
    let inputId = $(`<input id="id" type="number"/>`)
    let lableFirstName = $('<label>First Name</label>')
    let inputFirstName = $(`<input id="firstName" type="text"/>`)
    let lableLastName = $('<label>Last Name</label>')
    let inputLastName = $(`<input id="lastName" type="text"/>`)
    let lableFacultyNumber = $('<label>Faculty Number</label>')
    let inputFacultyNumber = $(`<input id="facultyNumber" type="text"/>`)
    let lableGrade = $('<label>Grade</label>')
    let inputGrade = $(`<input id="grade" type="number"/>`)

    div.append(lableId)
    div.append(inputId)
    div.append(lableFirstName)
    div.append(inputFirstName)
    div.append(lableLastName)
    div.append(inputLastName)
    div.append(lableFacultyNumber)
    div.append(inputFacultyNumber)
    div.append(lableGrade)
    div.append(inputGrade)
    div.insertBefore(table)
    $(`<span>Create Student</span></br>`).insertBefore(lableId)
    let addButton = $(`<button>Create</button>`).on('click', function () {

        let student = {
            "ID": 28,
            "FirstName": "Pesho",
            "LastName": 'Gosho',
            "FacultyNumber": '32',
            "Grade": 6
        }
            $.post({
                url: 'https://baas.kinvey.com/appdata/kid_BJXTsSi-e/students',
                data: JSON.stringify(student),
                success: function (res) {
                    console.log(res)
                },
                error: function (err) {
                    console.log(err)
                },
                dataType: "json",
                contentType: "application/json",
                beforeSend: authorize
            })
    })
    addButton.insertAfter(inputGrade)
}