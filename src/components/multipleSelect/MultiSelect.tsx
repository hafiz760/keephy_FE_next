import { ErrorMessage } from 'formik';
import React, { KeyboardEventHandler } from 'react';
import CreatableSelect from 'react-select/creatable';

interface Option {
  label: string;
  value: string;
}

const createOption = (label: string) => ({
  label,
  value: label,
});


interface MultiSelectProps {
  emailArray: readonly Option[];
  setEmailArray: React.Dispatch<React.SetStateAction<readonly Option[]>>;
  name: string;
  form: any;
}


const MultiSelect: React.FC<MultiSelectProps> = ({ emailArray, setEmailArray, name, form }) => {
  const [inputValue, setInputValue] = React.useState('');

  const components = {
    DropdownIndicator: null,
  };

  const handleKeyDown: KeyboardEventHandler = (event) => {
    if (!inputValue) return;

    switch (event.key) {
      case 'Enter':
      case 'Tab':
        const newOption = createOption(inputValue);
        setEmailArray((prev) => [...prev, newOption]);
        form.setFieldValue(name, [...emailArray, newOption]);
        setInputValue('');
        event.preventDefault();
        break;
    }
  };

  return (
    <>
      <CreatableSelect
        components={components}
        inputValue={inputValue}
        isClearable={false}
        isMulti
        menuIsOpen={false}
        onChange={(newValue) => {
          if (newValue) {
            const options = newValue as Option[];
            setEmailArray(options);
            form.setFieldValue(name, options);
            console.log(options)
          }
        }}
        onInputChange={(newValue) => setInputValue(newValue)}
        onKeyDown={handleKeyDown}
        placeholder="Type Reporting Email and Press Enter"
        value={emailArray}
        className="react-select-container"
        classNamePrefix="react-select"
        onBlur={() => form.setFieldTouched(name, true)}
      />
    </>
  );
}

export default MultiSelect;
