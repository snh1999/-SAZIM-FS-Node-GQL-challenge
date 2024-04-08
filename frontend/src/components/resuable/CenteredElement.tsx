export default function CenteredElement({ children }: { children: React.ReactNode }) {
    return <div style={{ display: "flex", justifyContent: "center" }}>{children}</div>;
}
