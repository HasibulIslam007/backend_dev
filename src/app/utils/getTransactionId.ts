
export const getTransactionId = () => {
    return "txn_" + Math.random().toString(36).substr(2, 9);
}