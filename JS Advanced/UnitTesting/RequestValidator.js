function validateRequest(request) {
    if (request.method === undefined || request.method !== 'GET' && request.method !== 'POST' && request.method !== 'DELETE' && request.method !== 'CONNECT') {
        throw new Error('Invalid request header: Invalid Method')
    }

    if (request.uri === undefined || !request.uri.match(/^[a-zA-Z*.0-9]+$/)) {
        throw new Error('Invalid request header: Invalid URI')
    }

    if (request.version === undefined || request.version !== 'HTTP/0.9' && request.version !== 'HTTP/1.0' && request.version !== 'HTTP/1.1' && request.version !== 'HTTP/2.0') {
        throw new Error('Invalid request header: Invalid Version')
    }

    if (request.message === undefined || (!request.message.match(/^[^<>\\&'"]+$/) && request.message !== '')) {
        throw new Error('Invalid request header: Invalid Message')
    }
    return request
}

console.log(validateRequest({
    method: 'GET',
    uri: '...aaa666',
    version: 'HTTP/1.1',
    message: ''
}))
