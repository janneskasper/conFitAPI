const responseCodes = {
    INFORMATION: {
        CONTINUE: 100,
        SWITCHING_PROTOCOLS: 101,
        PROCESSING: 102,
        EARLY_HINTS: 103,
    },
    SUCCESS: {
        SUCCESS: 200,
        CREATED: 201,
        ACCEPTED: 202,
        NO_CONTENT: 204,
        PARTIAL_CONTENT: 206,
    },
    REDIRECT: {
        MULTIPLE_CHOICES: 300,
        MOVED_PERMANENTLY: 301,
        NOT_MODIFIED: 304,
        TEMPORARY_REDIRECT: 307,
        PERMANENT_REDIRECT: 308,
    },
    CLIENT_ERROR: {
        BAD_REQUEST: 400,
        UNAUTHORIZED: 401,
        FORBIDDEN: 403,
        NOT_FOUND: 404,
        CONFLICT: 409,
    },
    SERVER_ERROR: {
        INTERNAL_SERVER_ERROR: 500,
        NOT_IMPLEMENTED: 501,
        BAD_GATEWAY: 502,
        SERVICE_UNAVAILABLE: 503,
        GATEWAY_TIMEOUT: 504,
    }
}

module.exports = responseCodes