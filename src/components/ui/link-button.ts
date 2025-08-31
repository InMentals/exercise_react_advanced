import { Link } from "react-router-dom";
import styled from "styled-components";

const accentColor = "var(--main-brand-color)";

const LinkButton = styled(Link)<{ $variant: "primary" | "secondary" }>`
  cursor: pointer;
  border-radius: 9999px;
  background-color: ${(props) =>
    props.$variant === "primary" ? accentColor : "white"};
  border-style: solid;
  color: ${(props) => (props.$variant === "primary" ? "white" : accentColor)};
  border-width: 1px;
  border-color: ${accentColor};
  display: inline-flex;
  text-align: center;
  text-wrap: nowrap;
  align-items: center;
  font: inherit;
  font-weight: bold;
  min-height: 36px;
  justify-content: center;
  min-width: 72px;
  outline-style: none;
  padding: 0 30px;
  text-decoration: none;
  transition: background-color 0.3s;
  box-shadow: 0 4px 8px var(--shadows-color);

  &:hover {
    background-color: ${(props) =>
      props.$variant === "primary"
        ? "var(--main-brand-color-light)"
        : "var(--main-brand-color-light)"};
  }
`;
LinkButton.displayName = "LinkButton";

export default LinkButton;
