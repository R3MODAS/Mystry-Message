import * as yup from "yup";

export const usernameValidation = yup
    .string()
    .trim()
    .required("Please provide an username")
    .lowercase("Username must be lowercase")
    .min(1, "Username must be atleast 1 characters")
    .max(10, "Username must not exceed 10 characters")
    .matches(/^[a-zA-Z0-9_]+$/, "Username must not contain special characters");

const signUpSchema = yup.object({
    username: usernameValidation,
    email: yup
        .string()
        .email("Please provide a valid email")
        .trim()
        .required("Please provide an email"),
    password: yup
        .string()
        .trim()
        .required("Please provide a password")
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/gm,
            "Password must be exceed 8 characters, includes atleast one uppercase letter, one lowercase letter, one number, and one special character."
        ),
    confirmPassword: yup
        .string()
        .trim()
        .required("Please provide a confirm password")
        .oneOf(
            [yup.ref("password")],
            "Password and confirm password does not match"
        ),
});

export type signUpSchemaType = yup.InferType<typeof signUpSchema>;
