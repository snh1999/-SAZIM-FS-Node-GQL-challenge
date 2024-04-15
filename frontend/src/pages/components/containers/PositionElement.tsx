interface Props {
    children: React.ReactNode;
    position?: "start" | "end" | "center";
}

/**
 * To fix Positioning of children element. (tested with width, height behavior is not predictable)
 * Mainly built for mui joy elements, restricting them to take the default full width of parent
 * and positioning them according to the position prop
 *
 * @param {children}
 * @param {position} defaults to center, allowed values are start, center, end
 * @return {ReactElement} a div element with children positioned accordingly
 */
export default function PositionElement({ children, position = "center" }: Readonly<Props>) {
    return <div style={{ display: "flex", justifyContent: `${position}` }}>{children}</div>;
}
