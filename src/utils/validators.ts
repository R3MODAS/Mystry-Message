import {
    isValidPhoneNumber,
    parsePhoneNumberWithError,
    PhoneNumber
} from "libphonenumber-js";

const emailValidator = (value: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(value.trim());
};

const phoneParser = (phone: string): PhoneNumber | null => {
    try {
        return parsePhoneNumberWithError(phone, { defaultCountry: "IN" });
    } catch {
        return null;
    }
};

const phoneValidator = (phone: string): boolean => {
    try {
        const parsedPhoneNumber: PhoneNumber = parsePhoneNumberWithError(
            phone,
            { defaultCountry: "IN" }
        );
        return isValidPhoneNumber(parsedPhoneNumber.number, {
            defaultCountry: "IN"
        });
    } catch {
        return false;
    }
};

export { emailValidator, phoneParser, phoneValidator };
