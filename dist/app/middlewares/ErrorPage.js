import httpStatus from "http-status-codes";
const ErrorPage = (req, res) => {
    (req, res) => {
        res.status(httpStatus.NOT_FOUND).json({ success: false, message: "Route not found" });
    };
};
export default ErrorPage;
//# sourceMappingURL=ErrorPage.js.map