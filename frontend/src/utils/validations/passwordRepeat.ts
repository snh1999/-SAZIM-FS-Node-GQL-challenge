export default function getPasswordRepeatFeedback(value: string, password: string): string {
    return value === password ? "" : "Passwords don't match";
}
