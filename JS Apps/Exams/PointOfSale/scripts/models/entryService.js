let entryService = (() => {
    function getEntriesByReceipt(receiptId) {
        return requester.get('appdata', `entries?query={"receiptId":"${receiptId}"}`, 'kinvey')
    }

    function getEntryById(entryId) {
        return requester.get('appdata', `entries/${entryId}`, 'kinvey')
    }
    function removeEntryFromReceipt(entry) {
        return requester.remove('appdata', `entries/${entry._id}`, 'kinvey', sessionStorage.getItem('authtoken'))
    }

    function createEntry(data) {
        return requester.post('appdata', `entries`, 'kinvey', data)
    }
    return {
        getEntriesByReceipt,
        removeEntryFromReceipt,
        getEntryById,
        createEntry,
    }
})()