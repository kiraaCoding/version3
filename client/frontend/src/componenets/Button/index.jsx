import PropTypes from "prop-types";

const shapes = {
  square: "rounded-[0px]",
  circle: "rounded-[50%]",
  round: "rounded-sm",
};
const variants = {
  fill: {
    gray_100: "bg-gray-100 text-indigo-900_01",
    gray_900: "bg-gray-900 text-white-A700_01",
    gray_50_01: "bg-gray-50_01 shadow-xl",
    red_200: "bg-red-200 text-white-A700_01",
  },
  gradient: {
    indigo_900_02_indigo_A200_01: "bg-gradient text-white-A700_01",
  },
};
const sizes = {
  "2xl": "h-[49px] px-[35px] text-xl",
  sm: "h-[41px] px-[25px] text-lg",
  "6xl": "h-[80px] px-[35px] text-[33px]",
  lg: "h-[46px] px-3 text-xl",
  "4xl": "h-[66px] px-[33px] text-[23px]",
  "5xl": "h-[69px] px-[35px] text-xl",
  md: "h-[44px] px-px",
  "3xl": "h-[60px] px-3",
  xs: "h-[36px] px-[21px] text-sm",
  xl: "h-[49px] px-[35px] text-base",
};

const Button = ({
  children,
  className = "",
  leftIcon,
  rightIcon,
  shape,
  variant = "fill",
  size = "xs",
  color = "red_200",
  ...restProps
}) => {
  return (
    <button
      className={`${className} flex items-center justify-center text-center cursor-pointer ${(shape && shapes[shape]) || ""} ${(size && sizes[size]) || ""} ${(variant && variants[variant]?.[color]) || ""}`}
      {...restProps}
    >
      {!!leftIcon && leftIcon}
      {children}
      {!!rightIcon && rightIcon}
    </button>
  );
};

Button.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  leftIcon: PropTypes.node,
  rightIcon: PropTypes.node,
  shape: PropTypes.oneOf(["square", "circle", "round"]),
  size: PropTypes.oneOf(["2xl", "sm", "6xl", "lg", "4xl", "5xl", "md", "3xl", "xs", "xl"]),
  variant: PropTypes.oneOf(["fill", "gradient"]),
  color: PropTypes.oneOf(["gray_100", "gray_900", "gray_50_01", "red_200", "indigo_900_02_indigo_A200_01"]),
};

export { Button };
