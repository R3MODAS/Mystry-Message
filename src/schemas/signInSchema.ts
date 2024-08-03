import * as yup from "yup";

const signInSchema = yup.object({
    identity: yup
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
});

export type signInSchemaType = yup.InferType<typeof signInSchema>;
