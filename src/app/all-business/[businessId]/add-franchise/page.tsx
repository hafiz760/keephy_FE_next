"use client"
import RegisterFranchiseForm from "@/components/Forms/RegisterFranchiseForm";
import AuthHeadings from "@/shared/AuthHeadings";
import BusinessIcon from "@/assets/icons/BusinessIcon"
import CircularProgressBar from "@/shared/Progress";
import withAuthValidation from "@/hoc/withAuth";
import BackIcon from "@/assets/icons/backIcon";
import { useRouter } from "next/navigation";

function RegisterFranchise() {
    const router = useRouter();
    return (
        <main className="container mt-12">
            <button className='text-[#1191D9] font-semibold text-base cursor-pointer mb-4 flex items-center gap-1' onClick={() => router.back()}><BackIcon /> Go Back</button>
            <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between gap-6 sm:flex-nowrap flex-wrap">
                    <div className="flex items-center gap-3">
                        <div className="bg-[#FFC020] h-14 w-14 rounded-full flex items-center justify-center shrink-0">
                            <BusinessIcon />
                        </div>
                        <div>
                            <AuthHeadings heading={"Add Locations"} description={"Please add your business locations by adding the below fields"} business />
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <p className="text-sm font-medium">Completed</p>
                        <CircularProgressBar progress={30} color="text-[#1B8914]" />
                    </div>
                </div>
                <RegisterFranchiseForm />
            </div>
        </main>
    );
}
export default withAuthValidation(RegisterFranchise);