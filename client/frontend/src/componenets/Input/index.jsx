/* eslint-disable no-unused-vars */
/* eslint-disable react/display-name */

import React from "react";
import PropTypes from "prop-types";

const shapes = {
  square: "rounded-[0px]",
  round: "rounded-tl-[20px] rounded-bl-[20px]",
};
const variants = {
  fill: {
    red_200_77: "bg-red-200_77",
    lime_200: "bg-lime-200 text-indigo-900_01",
  },
  underline: {
    gray_500_01: "text-gray-500_01 border-b border-gray-500_01 border-solid",
  },
};
const sizes = {
  md: "h-[71px] pl-[21px] pr-[35px] text-[28px]",
  xs: "h-[45px] pl-2.5 pr-[35px] text-[29px]",
  sm: "h-[69px] pl-[27px] pr-[35px] text-xl",
};

const Input = React.forwardRef(
  (
    {
      className = "",
      name = "",
      placeholder = "",
      type = "text",
      children,
      label = "",
      prefix,
      suffix,
      onChange,
      shape,
      variant = "fill",
      size = "sm",
      color = "lime_200",
      ...restProps
    },
    ref,
  ) => {
    const handleChange = (e) => {
      if (onChange) onChange(e?.target?.value);
    };

    return (
      <>
        <div
          className={`${className} flex items-center justify-center  ${(shape && shapes[shape]) || ""} ${variants[variant]?.[color] || variants[variant] || ""} ${sizes[size] || ""}`}
        >
          {!!label && label}
          {!!prefix && prefix}
          <input ref={ref} type={type} name={name} onChange={handleChange} placeholder={placeholder} {...restProps} />
          {!!suffix && suffix}
        </div>
      </>
    );
  },
);

Input.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  label: PropTypes.string,
  prefix: PropTypes.node,
  suffix: PropTypes.node,
  shape: PropTypes.oneOf(["square", "round"]),
  size: PropTypes.oneOf(["md", "xs", "sm"]),
  variant: PropTypes.oneOf(["fill", "underline"]),
  color: PropTypes.oneOf(["red_200_77", "lime_200", "gray_500_01"]),
};

export { Input };
