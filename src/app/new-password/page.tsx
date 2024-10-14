import NewPasswordForm from "@/components/Forms/NewPasswordForm";
import AuthHeadings from "@/shared/AuthHeadings";

const NewPassword = () => {
    return (
        <main className="flex flex-col items-center justify-between">
            <AuthHeadings heading={"Create New Password"} description={"We have sent you a new link to your email, please click on that and create your new password"} red />
            <NewPasswordForm />
        </main>
    );
}
export default NewPassword
