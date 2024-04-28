/* eslint-disable react/prop-types */

const sizes = {
  "5xl": "text-[27px] font-normal md:text-[25px] sm:text-[23px]",
  "6xl": "text-[29px] font-normal md:text-[27px] sm:text-[25px]",
  "7xl": "text-3xl font-medium md:text-[28px] sm:text-[26px]",
  "8xl": "text-[31px] font-medium md:text-[29px] sm:text-[27px]",
  "2xl": "text-2xl font-normal md:text-[22px]",
  "3xl": "text-[25px] font-normal md:text-[23px] sm:text-[21px]",
  "4xl": "text-[26px] font-normal md:text-2xl sm:text-[22px]",
  xs: "text-[13px] font-normal",
  lg: "text-xl font-normal",
  s: "text-[15px] font-normal",
  xl: "text-[23px] font-medium md:text-[21px]",
  "9xl": "text-[32px] font-normal md:text-3xl sm:text-[28px]",
  "10xl": "text-[37px] font-normal md:text-[35px] sm:text-[33px]",
  md: "text-lg font-medium",
};

const Text = ({ children, className = "", as, size = "2xl", ...restProps }) => {
  const Component = as || "p";

  return (
    <Component className={`text-indigo-900_01 font-jost ${className} ${sizes[size]}`} {...restProps}>
      {children}
    </Component>
  );
};

export { Text };
