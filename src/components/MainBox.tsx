import { ReactNode } from "react";

export default function MainBox(props: { children: ReactNode }) {
  return <div className="main-box">{props.children}</div>;
}
