import { Box, Chip, Option, Select } from "@mui/joy";
import { Controller, useFormContext } from "react-hook-form";
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
        control,
    } = useFormContext();
    const error = errors[id]?.message ?? "";

    const emptyValue = multiple ? [] : "";

    return (
        <InputFeedbackContainer message={error}>
            <Controller
                name={id}
                control={control}
                rules={{ required: error === undefined }}
                render={({ field }) => {
                    return (
                        <Select
                            size="lg"
                            multiple={multiple}
                            value={field.value || emptyValue}
                            placeholder={placeholder}
                            onChange={(_, value) => {
                                field.onChange(value);
                            }}
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
                        >
                            {Object.entries(options).map(([key, value]) => (
                                <Option key={key} value={value}>
                                    {value}
                                </Option>
                            ))}
                        </Select>
                    );
                }}
            />
        </InputFeedbackContainer>
    );
}
