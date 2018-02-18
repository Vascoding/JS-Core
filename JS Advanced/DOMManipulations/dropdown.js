function addItem() {
    let itemText = document.getElementById('newItemText')
    let itemValue = document.getElementById('newItemValue')

    let selectMenu = document.getElementById('menu')
    let option = document.createElement('option')
    option.value = itemValue.value
    option.text = itemText.value
    itemText.value = ''
    itemValue.value = ''
    selectMenu.appendChild(option)
}