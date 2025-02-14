import React, { SelectHTMLAttributes } from 'react';
import './styles.css';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement>{
    label: string;
    name: string;
    options: Array<{
        value: string;
        label: string;
    }>;
}

const Select: React.FC<SelectProps> = ({
  label, name, options, ...rest
}) => (
  <div className="select-block">
    <label htmlFor={name}>{label}</label>
    <select id={name} {...rest}>
      <option value=""> </option>
      {options.map((option) => (
        <option
          key={option.value}
          value={option.value}
        >
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

export default Select;
