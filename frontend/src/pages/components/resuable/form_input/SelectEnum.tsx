import { Box, Chip, Option, Select } from "@mui/joy";
import { useFormContext } from "react-hook-form";
import { InputFeedbackContainer } from "../../containers/InputFeedbackContainer";

interface Props {
    id: string;
    placeholder: string;
    multiple?: boolean;
    options: object;
}

export default function SelectEnum({ id, placeholder, options, multiple = true }: Readonly<Props>) {
    const {
        formState: { errors },
        setValue,
        getValues,
    } = useFormContext();
    const error = errors[id]?.message ?? "";

    return (
        <InputFeedbackContainer message={error}>
            <Select
                multiple={multiple}
                defaultValue={getValues(id)}
                size="lg"
                placeholder={placeholder}
                renderValue={(selected) => (
                    <Box sx={{ display: "flex", gap: "0.5rem" }}>
                        {selected instanceof Array
                            ? selected.map((selectedOption) => (
                                  <Chip key={selectedOption.value} variant="soft" color="primary">
                                      {selectedOption.label}
                                  </Chip>
                              ))
                            : selected?.label}
                    </Box>
                )}
                onChange={(_, value) => {
                    setValue(id, value);
                }}
            >
                {Object.entries(options).map(([key, value]) => (
                    <Option key={key} value={value}>
                        {value}
                    </Option>
                ))}
            </Select>
        </InputFeedbackContainer>
    );
}
