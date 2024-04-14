import { ChangeEventHandler, useState } from "react";
import styles from "react-day-picker/dist/style.module.css";
import { format, isAfter, isBefore, isValid, parse } from "date-fns";
import { DateRange, DayPicker, SelectRangeEventHandler } from "react-day-picker";
import { Box, Input } from "@mui/joy";

interface Props {
    disabledDates?: { from: Date; to: Date }[];
    fromValue: string;
    setFromValue: (value: string) => void;
    toValue: string;
    setToValue: (value: string) => void;
}

export default function DatePicker({ disabledDates, fromValue, setFromValue, toValue, setToValue }: Readonly<Props>) {
    const [selectedRange, setSelectedRange] = useState<DateRange>();
    const [viewPicker, setViewPicker] = useState(false);

    console.log(disabledDates);

    const handleFromChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        setFromValue(e.target.value);
        const date = parse(e.target.value, "y-MM-dd", new Date());
        if (!isValid(date)) {
            return setSelectedRange({ from: undefined, to: undefined });
        }
        if (selectedRange?.to && isAfter(date, selectedRange.to)) {
            setSelectedRange({ from: selectedRange.to, to: date });
        } else {
            setSelectedRange({ from: date, to: selectedRange?.to });
        }
    };

    const handleToChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        setToValue(e.target.value);
        const date = parse(e.target.value, "y-MM-dd", new Date());

        if (!isValid(date)) {
            return setSelectedRange({ from: selectedRange?.from, to: undefined });
        }
        if (selectedRange?.from && isBefore(date, selectedRange.from)) {
            setSelectedRange({ from: date, to: selectedRange.from });
        } else {
            setSelectedRange({ from: selectedRange?.from, to: date });
        }
    };

    const handleRangeSelect: SelectRangeEventHandler = (range: DateRange | undefined) => {
        setSelectedRange(range);
        if (range?.from) {
            setFromValue(format(range.from, "y-MM-dd"));
        } else {
            setFromValue("");
        }
        if (range?.to) {
            setToValue(format(range.to, "y-MM-dd"));
        } else {
            setToValue("");
        }
    };

    return (
        <Box color="neutral" sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <DayPicker
                classNames={styles}
                style={{ display: viewPicker ? "block" : "none" }}
                mode="range"
                selected={selectedRange}
                onSelect={handleRangeSelect}
                disabled={disabledDates}
            />
            <form className="ma2">
                <Box sx={{ display: "flex", gap: 2, width: "350px", m: 2 }}>
                    <Box sx={{ width: "48%" }}>
                        From
                        <Input
                            onFocus={() => setViewPicker(true)}
                            placeholder="From Date"
                            value={fromValue}
                            onChange={handleFromChange}
                        />
                    </Box>
                    <Box sx={{ width: "48%" }}>
                        To
                        <Input
                            onFocus={() => setViewPicker(true)}
                            placeholder="To Date"
                            value={toValue}
                            onChange={handleToChange}
                        />
                    </Box>
                </Box>
            </form>
        </Box>
    );
}
