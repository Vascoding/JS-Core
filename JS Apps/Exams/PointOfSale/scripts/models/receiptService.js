let receiptService = (() => {
    function getActiveReceipt() {
        let userId = sessionStorage.getItem('userId')
        return requester.get('appdata', `receipts?query={"_acl.creator":"${userId}","active":"true"}`, 'kinvey')
    }

    function getInactiveReceipts() {
        let userId = sessionStorage.getItem('userId')
        return requester.get('appdata', `receipts?query={"_acl.creator":"${userId}","active":"false"}`, 'kinvey')
    }
    function createReceipt() {
        let data = {
            active: true
        }
        return requester.post('appdata', `receipts`, 'kinvey', data)
    }

    function updateReceipt(receiptId, data) {
        return requester.update('appdata', `receipts/${receiptId}`, 'kinvey', data)
    }
    return {
        getActiveReceipt,
        createReceipt,
        updateReceipt,
        getInactiveReceipts,
    }
})()