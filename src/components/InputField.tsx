import { Input, InputGroup, InputLeftElement, Text, Box } from "@chakra-ui/react";
import {InputFieldProps} from "@/types";

const InputField = ({ title, Icon, value, setValue, error, setError, placeholder, autoFocus }: InputFieldProps) => (
    <Box position="relative">
        <Text color="blue.300">{title}</Text>
        <InputGroup>
            <InputLeftElement pointerEvents="none">
                <Icon color="#63b3ed" />
            </InputLeftElement>
            <Input
                placeholder={placeholder} // Placeholder text for Input Field
                autoFocus={autoFocus} // Autofocus this Input Field when page loads
                variant="outline"
                type="text"
                value={value} // Current value of Input Field
                onChange={(e) => {
                    setValue(e.target.value);
                    setError(false); // Reset error status when user starts typing
                }}
                isInvalid={error} // If error is true, makes InputField show an invalid state
            />
        </InputGroup>
        {error && ( // If error is true, show error message
            <Box position="absolute" bottom="-24px" color="red.300">
                <Text as="sup">This field is required</Text>
            </Box>
        )}
    </Box>
);

export default InputField;
