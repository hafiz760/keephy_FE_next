import VerifyOtpForm from "@/components/Forms/VerifyOtp";
import AuthHeadings from "@/shared/AuthHeadings";

const VerifyOtp = () => {
    return (
        <main className="flex flex-col items-center justify-between">
            <AuthHeadings heading={"Verify Otp"} description={"A 4-digit code sent to your email."} />
            <VerifyOtpForm />
        </main>
    );
}
export default VerifyOtp
