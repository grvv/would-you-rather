import React from "react";
import { Typography } from "antd";

const { Title } = Typography;

export default function NotFound({ text }) {
  return (
    <>
      <img
        className="w-100 margin-top-2x"
        src="/images/page_not_found.svg"
        alt="Page Not Found"
      />

      <Title type="secondary" className="text-center margin-top-x">
        {text || "Page Not Found"}
      </Title>
    </>
  );
}
