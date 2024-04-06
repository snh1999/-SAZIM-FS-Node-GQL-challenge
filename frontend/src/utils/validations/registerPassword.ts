export default function getRegisterPasswordFeedback(value: string): string {
    if (value.length <= 0) {
        return "";
    } else if (value.length < 3) {
        return "Very weak";
    } else if (value.length < 6) {
        return "Weak";
    } else if (value.length < 9) {
        return "Okay";
    } else {
        return "Strong";
    }
}
