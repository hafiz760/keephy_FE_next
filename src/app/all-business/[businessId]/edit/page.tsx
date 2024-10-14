"use client"
import RegisterBusinessForm from "@/components/Forms/RegisterBusinessForm";
import AuthHeadings from "@/shared/AuthHeadings";
import BusinessIcon from "@/assets/icons/BusinessIcon"
import CircularProgressBar from "@/shared/Progress";
import withAuthValidation from "@/hoc/withAuth";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "@/Redux/slices/categorySlice";
import { AppDispatch } from "@/Redux/store/store";
import { useCallback, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import BackIcon from "@/assets/icons/backIcon"
import { editBusiness, getSingleBusiness } from "@/Redux/slices/serviceSlice";
import { toast } from "react-toastify";
import { useDropzone } from "react-dropzone";
import { Form, Formik } from "formik";
import { registerBusinessErrorSchema } from "@/shared/Validations";
import BusinessFranchiseForm from "@/shared/BusinessFranchiseForm";


interface Option {
  readonly label: string;
  readonly value: string;
}

const EditBusiness = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const params = useParams();
  const businessId = params?.businessId;
  const singleBusiness = useSelector((state: any) => state?.service?.singleBusiness?.data);
  const category = useSelector((state: any) => state?.category.category.categories);
  const [emailArray, setEmailArray] = useState<readonly Option[]>([]);
  const [docFiles, setDocFiles] = useState<File[]>([]);
  const [preview, setPreview] = useState<string | null>(null);
  const [categories, setCategories] = useState<{ value: string; option: string }[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(singleBusiness?.subCategoryId);
  const [subCategories, setSubCategories] = useState<{ value: string; option: string }[]>([]);
  const validValues = {
    businessName: singleBusiness?.name,
    industryType: singleBusiness?.categoryId?._id,
    industryCategoryType: singleBusiness?.subCategoryId,
    primaryEmail: singleBusiness?.primaryEmail,
    reportingEmail: singleBusiness?.reportingEmail,
  };
  // console.log(singleBusiness?.reportingEmail)


  useEffect(() => {
    if (singleBusiness) {
      if (singleBusiness?.categoryId?.subcategories) {
        const tempSubCategories = singleBusiness?.categoryId?.subcategories.map((sub: any) => ({
          value: sub._id,
          option: sub.name,
        }));
        setSubCategories(tempSubCategories);
      }
      setEmailArray(singleBusiness.reportingEmail.map((data: any) => ({
        label: data,
        value: data
      })));
    }
  }, [singleBusiness]);


  useEffect(() => {
    if (selectedCategory) {
      const selectedCat = category?.find((data: any) => data._id === selectedCategory);
      if (selectedCat?.subcategories) {
        const tempSubCategories = selectedCat.subcategories.map((sub: any) => ({
          value: sub._id,
          option: sub.name,
        }));
        setSubCategories(tempSubCategories);
      }
      else {
        return
      }
    }
  }, [selectedCategory, category]);

  useEffect(() => {
    dispatch(getSingleBusiness({ businessId }));
  }, [dispatch, businessId]);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch])


  useEffect(() => {
    if (category) {
      const tempCategory = category?.map((data: any) => {
        return { value: data._id, option: data.name };
      });
      setCategories(tempCategory);
    }
  }, [category]);


  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles;
    if (file) {
      setPreview(URL.createObjectURL(file[0]));
      setDocFiles(acceptedFiles);
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const submitHandler = (values: typeof validValues) => {
    const formData = new FormData();
    const { businessName, industryType, industryCategoryType, primaryEmail, reportingEmail } = values;
    formData.append("name", businessName);
    formData.append("categoryId", industryType);
    formData.append("subCategoryId", industryCategoryType);
    formData.append("primaryEmail", primaryEmail);
    reportingEmail.map((email: any) => formData.append('reportingEmail', typeof email === 'string' ? email : email.value));
    if (docFiles.length === 0) {
      formData.append("logo_img", singleBusiness?.logo);
    }

    dispatch(editBusiness({ formData, router, businessId }))
  };
  return (
    <main className="container mt-12">
      <button className='text-[#1191D9] font-semibold text-base cursor-pointer mb-4 flex items-center gap-1' onClick={() => router.back()}><BackIcon /> Go Back</button>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between gap-6 sm:flex-nowrap flex-wrap">
          <div className="flex items-center gap-3">
            <div className="bg-[#26A8F1] h-14 w-14 rounded-full flex items-center justify-center">
              <BusinessIcon />
            </div>
            <div>
              <AuthHeadings heading={"Edit Business"} description={"Edit your business details using the fields below."} business />
            </div>
          </div>
        </div>
        <Formik initialValues={validValues} validationSchema={registerBusinessErrorSchema} onSubmit={submitHandler}>
          {() => (
            <Form className='w-full' id='registerbusiness'>
              <BusinessFranchiseForm
                docFiles={docFiles}
                getRootProps={getRootProps}
                getInputProps={getInputProps}
                industryTypes={categories}
                industryCategoryType={subCategories}
                setSelectedCategory={setSelectedCategory}
                formType='business'
                emailArray={emailArray}
                setEmailArray={setEmailArray}
                preview={preview}
                editImage={singleBusiness?.logo}
              />
              <div className='flex flex-col items-center justify-center gap-4 mt-6'>
                <button
                  type="submit"
                  className=" bg-black text-white h-14 w-full max-w-44 rounded-full">
                  Continue
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </main>
  );
}

export default withAuthValidation(EditBusiness);

