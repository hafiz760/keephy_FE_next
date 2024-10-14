import * as Yup from 'yup';

const signupErrorSchema = Yup.object().shape({
    email: Yup.string()
        .email("Please enter a valid email address")
        .required("Email is required"),
    name: Yup.string()
        .required("Name is required"),
    password: Yup.string()
        .min(8, "Password must be at least 8 characters long")
        .required("Password is required"),
    cPassword: Yup.string()
        .oneOf([Yup.ref('password')], "Passwords must match")
        .required("Please confirm your password")
});

const loginErrorSchema = Yup.object().shape({
    nameOrEmail: Yup.string()
        .required("Email or name is required"),
    password: Yup.string()
        .required("Password is required"),
});
const resetPasswordErrorSchema = Yup.object().shape({
    email: Yup.string()
        .email("Please enter a valid email address")
        .required("Email is required"),
});
const verifyOtpErrorSchema = Yup.object().shape({
    otp: Yup.string()
        .required("Otp is required")
        .length(4, "Otp must be exactly 4 digits")
        .matches(/^\d{4}$/, "Otp must be a number"),
});
const createPasswordErrorSchema = Yup.object().shape({
    password: Yup.string()
        .min(8, "Password must be at least 8 characters long")
        .required("Password is required"),
    cPassword: Yup.string()
        .oneOf([Yup.ref('password')], "Passwords must match")
        .required("Please confirm your password")
});

const registerBusinessErrorSchema = Yup.object().shape({
    businessName: Yup.string()
        .required('Business name is required'),
    industryType: Yup.string()
        .required('Industry type is required'),
    industryCategoryType: Yup.string()
        .required('Industry Category type is required'),
    primaryEmail: Yup.string()
        .email('Please enter a valid email address')
        .required('Business email is required'),
    reportingEmail: Yup.array()
        .min(1, 'At least one email is required'),
});

function parseTime(timeString: any) {
    if (timeString.includes('T')) {
        return new Date(timeString);
    }
    const [hours, minutes] = timeString.split(':');
    const date = new Date();
    date.setHours(hours, minutes, 0, 0);
    return date;
}

const registerFranchiseErrorSchema = Yup.object().shape({
    primaryEmail: Yup.string()
        .email('Please enter a valid email address')
        .required('Primary email is required'),
    businessLocation: Yup.string()
        .required('Business location is required'),
    reportingEmail: Yup.array()
        .min(1, 'At least one email is required'),
    openingHour: Yup.string()
        .required('Opening Time is required'),
    closingHour: Yup.string()
        .required('Closing Time is required')
        .test(
            'is-greater',
            'Closing Time must be after Opening Time',
            function (value) {
                const { openingHour } = this.parent;

                if (openingHour && value) {
                    const openingTime = parseTime(openingHour);
                    const closingTime = parseTime(value);
                    return closingTime > openingTime;
                }
                return true;
            }
        ),
});

const phoneRegExp = /^\+?(\d{1,4})?[-.\s]?(\(?\d{1,4}\)?)[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/
const submitReviewErrorSchema = Yup.object().shape({
    email: Yup.string()
        .email("Please enter a valid email address")
        .required("Email is required"),
    phone: Yup.string()
        .matches(phoneRegExp, 'Phone number must be a valid number')
        .required('Phone number is required'),
});
export { signupErrorSchema, loginErrorSchema, resetPasswordErrorSchema, verifyOtpErrorSchema, createPasswordErrorSchema, registerBusinessErrorSchema, registerFranchiseErrorSchema, submitReviewErrorSchema };
