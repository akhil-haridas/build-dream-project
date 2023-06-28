import React from 'react'
import Select from "react-select";
import './SelectInput.css'
const SelectInput = ({ options, onChange,placeholder }) => {
  return (
    <Select
      options={options}
      onChange={onChange}
      isSearchable={true}
      placeholder={placeholder}
    />
  );
};

export default SelectInput