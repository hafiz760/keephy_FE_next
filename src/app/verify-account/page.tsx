"use client"
import VerifyAccountForm from "@/components/Forms/VerifyAccount";
import withAuthValidation from "@/hoc/withAuth";
import AuthHeadings from "@/shared/AuthHeadings";

const VerifyOtp = () => {
    return (
        <main className="flex flex-col items-center justify-between">
            <AuthHeadings heading={"Verify Otp"} description={"A 4-digit code sent to your email."} />
            <VerifyAccountForm />
        </main>
    );
}
export default withAuthValidation(VerifyOtp)
