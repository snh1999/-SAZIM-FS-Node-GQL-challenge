interface Props {
    children: React.ReactNode;
    position?: "start" | "end" | "center";
}

export default function PositionElement({ children, position = "center" }: Readonly<Props>) {
    return <div style={{ display: "flex", justifyContent: `${position}` }}>{children}</div>;
}
