import { ZodError } from "zod";

async function middleErrors(err, req, res, next) {
    let statusCode = err.status || 500;
    let message = err.message || "Internal server error";
    if (err instanceof ZodError) {
        statusCode = 400;
        const firstIssue = err.issues[0];
        let fieldName = firstIssue?.path.join(".");
        if (!fieldName && firstIssue?.keys) {
            fieldName = firstIssue.keys.join(".");
        }
        if (!fieldName) fieldName = "input";
        message = `Validation Error: [${fieldName}] - ${firstIssue?.message}`;
    }
    if (err.errno) {
        switch (err.errno) {
            case 1062:
                statusCode = 400;
                message = "Database error: This record already exists.";
                break;
            case 1452:
                statusCode = 400;
                message =
                    "Database error: The referenced ID (Operator or Incident) does not exist.";
                break;
            case 1054:
                statusCode = 500;
                message =
                    "Database configuration error: Unknown column in query.";
                break;
            case 1366:
            case 1265:
                statusCode = 400;
                message =
                    "Database error: Invalid data type or value provided.";
                break;
            case 1049:
            case 1156:
            case 2002:
                statusCode = 500;
                message = "Database connection failed. Please try again later.";
                break;
        }
    }
    console.error(`Error caught in middleware: ${err}`);
    res.status(statusCode).json({
        success: false,
        message: message,
    });
}

export default middleErrors;
