// components/AddressInput.tsx
import React, { useState, useRef } from "react";
import { Autocomplete, LoadScript, LoadScriptProps } from "@react-google-maps/api";
import { ErrorMessage, useField } from 'formik';
import LocationIcon from "@/assets/icons/LocationIcon"
const libraries: LoadScriptProps['libraries'] = ["places"];

interface AddressInputProps {
  addressValue?: string | null;
  setAddressProp: (address: string | null) => void;
  name: string;
}

const AddressInput: React.FC<AddressInputProps> = ({
  addressValue,
  setAddressProp,
  name,
  ...props
}) => {
  const [field, meta, helpers] = useField(name);
  const [address, setAddress] = useState(addressValue || "");
  const inputRef = useRef<any>(null);

  const handlePlaceChanged = () => {
    const autocomplete = inputRef.current;
    if (autocomplete) {
      const place = autocomplete.getPlace();

      if (place) {
        const formattedAddress = place.formatted_address || null;
        setAddressProp(formattedAddress);
        setAddress(formattedAddress || "");
        helpers.setValue(formattedAddress); // Update Formik value
      }
    }
  };
  return (
    <LoadScript
      googleMapsApiKey={process.env.NEXT_PUBLIC_API_URL_GOOGLE as string || ""}
      libraries={libraries}
    >
      <Autocomplete
        onLoad={(ref) => (inputRef.current = ref)}
        onPlaceChanged={handlePlaceChanged}
        className="flex flex-col gap-1"
      >
        <>
          <div className="flex bg-white justify-between gap-2 border border-[#EDEDED] h-14 p-4 rounded-xl">
            <input
              {...field}
              {...props}
              type="text"
              className={`border-none outline-none w-full text-base bg-transparent text-[#828282] focus:text-black`}
              placeholder={addressValue || "Business Location"}
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
                helpers.setValue(e.target.value); // Update Formik value
              }}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                }
              }}
            />
            <LocationIcon />
          </div>
          <ErrorMessage component="small" name={field.name} className="text-[#FB2525] font-medium" /></>
      </Autocomplete>
    </LoadScript>
  );
};

export default AddressInput;
