const { constants } = require("../constant");

const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode || 500; // Use err.statusCode or default to 500
    switch (statusCode) {
        case constants.VALIDATION_ERROR:
            res.status(statusCode).json({
                title: "Validation Request",
                message: err.message,
                stackTrace: err.stack
            });
            break;
        case constants.NOT_FOUND:
            res.status(statusCode).json({
                title: "Not Found",
                message: err.message,
                stackTrace: err.stack
            });
            break;
        case constants.UNAUTHORIZED:
            res.status(statusCode).json({
                title: "Unauthorized",
                message: err.message,
                stackTrace: err.stack
            });
            break;
        case constants.FORBIDDEN:
            res.status(statusCode).json({
                title: "Forbidden",
                message: err.message,
                stackTrace: err.stack
            });
            break;
        case constants.SERVER_ERROR:
            res.status(statusCode).json({
                title: "Server Error",
                message: err.message,
                stackTrace: err.stack
            });
            break;

        default:
            // console.log("No error! All good! ", statusCode);
            res.status(statusCode).json({ // Default response for unhandled errors
                title: "Unknown Error",
                message: "An unknown error occurred.",
                stackTrace: err.stack
            });
            break;
    }
};

module.exports = errorHandler;
