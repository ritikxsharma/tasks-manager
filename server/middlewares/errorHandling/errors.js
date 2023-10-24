const error_codes = {
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    SERVER_ERROR: 500
}

class BAD_REQUEST_ERROR extends Error{
    constructor(message){
        super(message)
        this.code = error_codes.BAD_REQUEST
    }
}

class UNAUTHORIZED_ERROR extends Error{
    constructor(message){
        super(message)
        this.code = error_codes.UNAUTHORIZED
    }
}

class FORBIDDEN_ERROR extends Error{
    constructor(message){
        super(message)
        this.code = error_codes.FORBIDDEN
    }
}

class NOT_FOUND_ERROR extends Error{
    constructor(message){
        super(message)
        this.code = error_codes.NOT_FOUND
    }
}

class CONFLICT_ERROR extends Error{
    constructor(message){
        super(message)
        this.code = error_codes.CONFLICT
    }
}

class SERVER_ERROR extends Error{
    constructor(message){
        super(message)
        this.code = error_codes.SERVER_ERROR
    }
}

module.exports = {
    BAD_REQUEST_ERROR,
    UNAUTHORIZED_ERROR,
    FORBIDDEN_ERROR,
    NOT_FOUND_ERROR,
    CONFLICT_ERROR,
    SERVER_ERROR
}