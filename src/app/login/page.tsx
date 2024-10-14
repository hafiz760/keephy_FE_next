"use client"
import LoginForm from "@/components/Forms/LoginForm";
import withAuthValidation from "@/hoc/withAuth";
import AuthHeadings from "@/shared/AuthHeadings";

const Login = () => {
    return (
        <main className="flex flex-col items-center justify-between">
            <AuthHeadings heading={"Welcome Back!"} description={"Let’s get into your account"} />
            <LoginForm />
        </main>
    );
}

export default withAuthValidation(Login)