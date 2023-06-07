import React from "react";
import {
  Input,
  Stack,
  InputGroup,
  InputLeftElement,
  Button,
} from "@chakra-ui/react";
import { PhoneIcon } from "@chakra-ui/icons";

function InputComponent({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}) {
  return (
    <>
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          {/* <PhoneIcon color="gray.300" /> */}
          {props.icon}
        </InputLeftElement>
        <Input type="text" {...field} {...props} />
      </InputGroup>
    </>
  );
}

// const CustomInputComponent = ({
//   field, // { name, value, onChange, onBlur }
//   form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
//   ...props
// }) => (
//   <div>
//     <input type="text" {...field} {...props} />
//     {touched[field.name] && errors[field.name] && (
//       <div className="error">{errors[field.name]}</div>
//     )}
//   </div>
// );

export default InputComponent;
