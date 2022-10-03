import footerStyle from "./footer-style";
import { FC } from "react";
import { CustomPropsTypes } from "@/interfaces/react.interface";

const Footer: FC<CustomPropsTypes> = (props: CustomPropsTypes) => {
  const { classes, cx } = footerStyle({});
  return (
    <div>Footer</div>
  )
}

export default Footer;