import React from 'react'
import InputField from './InputField'
import BusinessIconField from '@/assets/icons/BusinessIconField'
import SelectField from './SelectField'
import AddressInput from './Address'
import FileIcon from '@/assets/icons/FileIcon'
import EmailIcon from '@/assets/icons/EmailIcon'
import Image from 'next/image'
import MultiSelect from '@/components/multipleSelect/MultiSelect'
import { ErrorMessage, Field } from 'formik'
import DatePicker from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import ImageDisplay from './Image'

interface Option {
    label: string;
    value: string;
}
interface BusinessFranchiseFormProps {
    docFiles?: File[];
    getRootProps?: () => any;
    getInputProps?: () => any;
    industryTypes?: any;
    industryCategoryType?: any;
    setSelectedCategory?: any;
    formType: string;
    emailArray: readonly Option[];
    setEmailArray: React.Dispatch<React.SetStateAction<readonly Option[]>>;
    address?: { area: string | null };
    setAddress?: (address: { area: string | null }) => void;
    preview?: string | null;
    setOpeningHour?: any;
    setClosingHour?: any;
    openingHour?: any;
    closingHour?: any;
    editImage?: any;
}

const BusinessFranchiseForm: React.FC<BusinessFranchiseFormProps> = ({ docFiles, getRootProps, getInputProps, industryTypes, industryCategoryType, setSelectedCategory, formType, emailArray, setEmailArray, address, setAddress, preview, editImage, openingHour, closingHour, setOpeningHour, setClosingHour }) => {
    return (
        <>
            <div className="border border-[#D7D7D7] rounded-xl px-4 py-6">
                <div className="gradient-bg">
                    <h3 className='text-lg font-medium mb-2'> {formType === "business" ? "Business Information:" : "Location Information:"}</h3>
                    <div className='grid grid-cols-12 gap-4'>
                        <div className={`${formType === "business" ? "xl:col-span-6 lg:col-span-7 col-span-12" : ' col-span-12'} `}>
                            <div className='grid md:grid-cols-2 grid-cols-1 gap-4 fields'>
                                {formType === "business" &&
                                    <>
                                        <div className='flex flex-col gap-1 md:col-span-1 col-span-2'>
                                            <InputField
                                                business
                                                righticon={<BusinessIconField />}
                                                placeholder={'Business Name'}
                                                name="businessName"
                                                type={'text'}
                                            />
                                        </div>
                                        <div className='flex flex-col gap-1 md:col-span-1 col-span-2'>
                                            <SelectField
                                                name="industryType"
                                                defaultText='Industry Type'
                                                choices={industryTypes}
                                                onChange={setSelectedCategory}
                                            />
                                        </div>

                                        <div className='flex flex-col gap-1 md:col-span-1 col-span-2'>
                                            <SelectField
                                                name="industryCategoryType"
                                                defaultText='Industry Category Type'
                                                choices={industryCategoryType}
                                            />
                                        </div>
                                    </>
                                }

                                {formType === "franchise" &&
                                    <>
                                        <div className='flex flex-col gap-1 md:col-span-1 col-span-2'>
                                            <Field
                                                name="openingHour"
                                                component={({ form }: { form: any }) => (
                                                    <DatePicker
                                                        disableDayPicker
                                                        format="HH:mm"
                                                        plugins={[<TimePicker hideSeconds mStep={30} key={'slotFrom'} />]}
                                                        inputClass="h-14 rounded-xl p-4 w-full border border-[#EDEDED] time-input outline-none"
                                                        placeholder={'Opening Time'}
                                                        onChange={(option) => {
                                                            console.log(option)
                                                            setOpeningHour(option);
                                                            form.setFieldValue('openingHour', option);
                                                        }}
                                                        value={openingHour}
                                                        onClose={() => form.setFieldTouched('openingHour', true)}
                                                    />
                                                )}
                                            />
                                            <ErrorMessage
                                                component="small"
                                                name="openingHour"
                                                className="text-[#FB2525] font-medium"
                                            />
                                        </div>
                                        <div className='flex flex-col gap-1 md:col-span-1 col-span-2'>
                                            <Field
                                                name="closingHour"
                                                component={({ form }: { form: any }) => (
                                                    <DatePicker
                                                        disableDayPicker
                                                        format="HH:mm"
                                                        plugins={[<TimePicker hideSeconds mStep={30} key={'slotFrom'} />]}
                                                        inputClass="h-14 rounded-xl p-4 w-full border border-[#EDEDED] time-input outline-none"
                                                        placeholder={'Closing Time'}
                                                        onChange={(option) => {
                                                            setClosingHour(option);
                                                            form.setFieldValue('closingHour', option);
                                                        }}
                                                        value={closingHour}
                                                        onClose={() => form.setFieldTouched('closingHour', true)}
                                                    />
                                                )}
                                            />
                                            <ErrorMessage
                                                component="small"
                                                name="closingHour"
                                                className="text-[#FB2525] font-medium"
                                            />
                                        </div>
                                    </>
                                }
                                <div className={`flex flex-col gap-1 ${formType === "business" ? 'md:col-span-1' : 'lg:col-span-1'} col-span-2`}>
                                    <InputField
                                        business
                                        righticon={<EmailIcon />}
                                        placeholder={'Primary Email'}
                                        name="primaryEmail"
                                        type={'email'}
                                    />
                                </div>
                                <div className={`flex flex-col gap-1 ${formType === "business" ? '' : 'lg:col-span-1'} col-span-2`}>
                                    <Field
                                        name="reportingEmail"
                                        component={({ form }: { form: any }) => (
                                            <MultiSelect
                                                setEmailArray={setEmailArray}
                                                emailArray={emailArray}
                                                name="reportingEmail"
                                                form={form} />
                                        )}
                                    />
                                    <ErrorMessage component="small" name={"reportingEmail"} className="text-[#FB2525] font-medium" />
                                </div>
                                {formType === "franchise" && address && setAddress && <div className='flex flex-col gap-1 md:col-span-1 col-span-2' id="address">
                                    <AddressInput
                                        setAddressProp={(area) => setAddress({ area })}
                                        addressValue={address.area}
                                        name="businessLocation"
                                    />
                                </div>}

                            </div>
                        </div>
                        {formType === "business" && getInputProps && getRootProps &&
                            <div className='xl:col-span-6 lg:col-span-5 col-span-12'>
                                <div className='cursor-pointer h-full w-full border border-dashed rounded-xl border-[#EDEDED] bg-white md:min-auto min-h-40' {...getRootProps()}>
                                    <input {...getInputProps()} />
                                    <div className="flex items-center justify-center h-full w-full">
                                        {editImage ?
                                            docFiles?.length === 0 ? <>
                                                <ImageDisplay
                                                    src={
                                                        process.env.NEXT_PUBLIC_API_URL_LOCAL +
                                                        editImage
                                                    }
                                                    alt="user-image"
                                                    width={56}
                                                    height={56}
                                                    className="object-cover object-center h-14 w-14 rounded-full"
                                                />
                                                <p className="text-black text-base font-medium truncate ms-2">
                                                    Upload Logo
                                                </p>
                                            </> :
                                                preview && docFiles ? (
                                                    <>
                                                        <Image src={preview} width={70} height={70} alt="Preview" className="object-contain" />
                                                        <p className="text-black text-base font-medium truncate ms-2">
                                                            {docFiles[0]?.name}
                                                        </p>
                                                    </>
                                                ) : (
                                                    docFiles && <>
                                                        <p className="text-black text-base font-medium truncate">
                                                            {docFiles.length > 0 ? docFiles[0]?.name : 'Upload Logo'}
                                                        </p>
                                                        <FileIcon />
                                                    </>
                                                ) : preview && docFiles ? (
                                                    <>
                                                        <Image src={preview} width={70} height={70} alt="Preview" className="object-contain" />
                                                        <p className="text-black text-base font-medium truncate ms-2">
                                                            {docFiles[0]?.name}
                                                        </p>
                                                    </>
                                                ) : (
                                                docFiles && <>
                                                    <p className="text-black text-base font-medium truncate">
                                                        {docFiles.length > 0 ? docFiles[0]?.name : 'Upload Logo'}
                                                    </p>
                                                    <FileIcon />
                                                </>
                                            )
                                        }

                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default BusinessFranchiseForm