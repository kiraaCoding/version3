/* eslint-disable react/prop-types */

const sizes = {
  "3xl": "text-[25px] font-semibold md:text-[23px] sm:text-[21px]",
  "2xl": "text-2xl font-semibold md:text-[22px]",
  "5xl": "text-4xl font-bold md:text-[34px] sm:text-[32px]",
  "4xl": "text-[33px] font-semibold md:text-[31px] sm:text-[29px]",
  "7xl": "text-[52px] font-bold md:text-[44px] sm:text-[38px]",
  "6xl": "text-[38px] font-bold md:text-4xl sm:text-[34px]",
  "9xl": "text-6xl font-bold md:text-[52px] sm:text-[46px]",
  "8xl": "text-[56px] font-bold md:text-5xl sm:text-[42px]",
  "15xl": "text-8xl font-bold md:text-5xl",
  "14xl": "text-[92px] font-bold md:text-5xl",
  "13xl": "text-[77px] font-bold md:text-5xl",
  xl: "text-[23px] font-semibold md:text-[21px]",
  s: "text-lg font-bold",
  md: "text-xl font-semibold",
  "12xl": "text-[74px] font-bold md:text-5xl",
  xs: "text-[10px] font-bold",
  lg: "text-[21px] font-bold",
  "11xl": "text-7xl font-bold md:text-5xl",
  "10xl": "text-[63px] font-bold md:text-5xl",
};

const Heading = ({ children, className = "", size = "md", as, ...restProps }) => {
  const Component = as || "h6";

  return (
    <Component className={`text-indigo-900_01 font-jost ${className} ${sizes[size]}`} {...restProps}>
      {children}
    </Component>
  );
};

export { Heading };
