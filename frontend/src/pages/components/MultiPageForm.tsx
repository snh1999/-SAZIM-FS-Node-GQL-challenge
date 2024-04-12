import { Box, Button, LinearProgress, Typography } from "@mui/joy";
import FormContainer from "./resuable/containers/FormContainer";
import { useState } from "react";

interface Props {
    steps: { title: string; content: React.ReactNode; inputField: string[] }[];
    onSubmit: () => void;
    // eslint-disable-next-line @typescript-eslint/ban-types
    trigger: Function;
}

export default function MultiPageForm({ steps, onSubmit, trigger }: Readonly<Props>) {
    const [index, setIndex] = useState(0);
    const length = steps.length - 1;
    const currentStep = steps[index];

    async function nextButtonClick() {
        if (index < length) {
            const fields = steps[index].inputField;
            const output = await trigger(fields);
            if (!output) return;

            setIndex(index + 1);
        }
        if (index === length) onSubmit();
    }

    function previousStep() {
        if (index > 0) setIndex(index - 1);
    }

    return (
        <div>
            <FormContainer border="plain" titleText="" paddingx={5}>
                <Typography level="h3" sx={{ textAlign: "center" }}>
                    {currentStep.title}
                </Typography>
                {currentStep.content}
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    {index > 0 ? <Button onClick={previousStep}>Back</Button> : <div></div>}
                    <Button onClick={nextButtonClick}>{index == length ? "Submit" : "Next"}</Button>
                </Box>
            </FormContainer>
            <LinearProgress determinate color="success" value={(index / length) * 100} />
        </div>
    );
}
