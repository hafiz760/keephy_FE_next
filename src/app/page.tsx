"use client"
import SignupForm from "@/components/Forms/SignupForm";
import withAuthValidation from "@/hoc/withAuth";
import AuthHeadings from "@/shared/AuthHeadings";

const SignUp = () => {
  return (
    <main className="flex flex-col items-center justify-between">
      <AuthHeadings heading={"Lets get started"} description={"Welcome to Keephy, Lets create your account."} />
      <SignupForm />
    </main>
  );
}
export default withAuthValidation(SignUp)

