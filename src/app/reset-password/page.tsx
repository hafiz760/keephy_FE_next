import ResetPasswordForm from "@/components/Forms/ResetPasswordForm";
import AuthHeadings from "@/shared/AuthHeadings";

const ResetPassword = () => {
    return (
        <main className="flex flex-col items-center justify-between">
            <AuthHeadings heading={"Reset your password"} description={"Forgot password? Please enter the email to reset your password."} />
            <ResetPasswordForm />
        </main>
    );
}

export default ResetPassword
