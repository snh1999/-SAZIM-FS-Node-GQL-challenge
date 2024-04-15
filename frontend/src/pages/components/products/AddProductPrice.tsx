import { Box, Sheet, Typography } from "@mui/joy";

import SelectEnum from "../resuable/form_input/SelectEnum";
import FormInput from "../resuable/form_input/InputFeedback";
import { RentDuration } from "../../../constants/types/Product";

/**
 * Renders the final page of multi-page form to add product
 *
 * @return {JSX.Element} The rendered PricesField component according to wireframe
 */
export default function PricesField() {
    return (
        <Sheet sx={{ display: "flex", flexDirection: "column", gap: 4, alignItems: "center" }}>
            <FormInput id="price" type="number" placeholder="Purchase Price" />
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 3,
                    width: "50%",
                    mx: 15,
                }}
            >
                <AddRent />
            </Box>
        </Sheet>
    );
}

export function AddRent() {
    return (
        <>
            <Box sx={{ width: "50%" }}>
                <Typography>Rent</Typography>
                <FormInput id="rentPrice" type="number" placeholder="$" inputStyles={{ width: "100%" }} />
            </Box>
            <Box sx={{ mt: 4 }}>
                <SelectEnum placeholder="Select Option" id="rentDuration" multiple={false} options={RentDuration} />
            </Box>
        </>
    );
}
