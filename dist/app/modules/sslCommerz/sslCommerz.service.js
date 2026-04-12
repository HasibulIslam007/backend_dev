import { envVars } from "../../config/env.js";
import AppError from "../../errorHelper/AppError.js";
import { Payment } from "../payment/payment.model.js";
import axios from "axios";
import httpStatus from "http-status-codes";
const sslPaymentInit = async (payload) => {
    try {
        const data = {
            store_id: envVars.SSL_STORE_ID,
            store_passwd: envVars.SSL_STORE_PASSWORD,
            total_amount: payload.amount,
            currency: "EUR",
            tran_id: payload.transactionId,
            success_url: `${envVars.SSL_SUCCESS_BACKEND_URL}?transactionId=${payload.transactionId}`,
            fail_url: `${envVars.SSL_FAIL_BACKEND_URL}?transactionId=${payload.transactionId}`,
            cancel_url: `${envVars.SSL_CANCEL_BACKEND_URL}?transactionId=${payload.transactionId}`,
            cus_name: payload.name,
            cus_email: payload.email,
            cus_add1: payload.address,
            cus_add2: payload.address,
            cus_city: "",
            cus_state: "",
            cus_postcode: "1000",
            cus_country: "Bangladesh",
            cus_phone: payload.phoneNumber,
            cus_fax: "01711111111",
            ship_name: "Customer Name",
            ship_add1: "Dhaka",
            ship_add2: "Dhaka",
            ship_city: "Dhaka",
            ship_state: "Dhaka",
            ship_postcode: "1000",
            ship_country: "Bangladesh",
            multi_card_name: "mastercard,visacard,amexcard",
            value_a: "ref001_A",
            value_b: "ref002_B",
            value_c: "ref003_C",
            value_d: "ref004_D"
        };
        const response = await axios({
            method: "POST",
            url: envVars.SSL_PAYMENT_API,
            data,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        });
        return response.data;
    }
    catch (error) {
        console.error("Error occurred while initializing SSL payment:", error);
        const message = error instanceof Error ? error.message : "Unknown error";
        throw new AppError(httpStatus.BAD_REQUEST, message);
    }
};
const validatePayment = async (payload) => {
    try {
        const response = await axios({
            method: "GET",
            url: `${envVars.SSL_VALIDATION_API}?val_id=${payload.val_id}&store_id=${envVars.SSL_STORE_ID}&store_passwd=${envVars.SSL_STORE_PASSWORD}`
        });
        console.log("sslcomeerz validate api response", response.data);
        await Payment.updateOne({ transactionId: payload.tran_id }, { paymentGatewayData: response.data }, { runValidators: true });
    }
    catch (error) {
        console.log(error);
        throw new AppError(401, `Payment Validation Error, ${error.message}`);
    }
};
export const SSLService = {
    sslPaymentInit,
    validatePayment
};
//# sourceMappingURL=sslCommerz.service.js.map