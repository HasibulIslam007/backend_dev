export const sendResponse = (res, data) => {
    res.status(data.statusCode || 200).json({
        statusCode: data.statusCode || 200,
        meta: data.meta,
        success: data.success,
        message: data.message,
        data: data.data
    });
};
//# sourceMappingURL=sendResponse.js.map