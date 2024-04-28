import React from "react";
import { CloseSVG } from "../../assets/images";
import { Input, Img } from "./..";

export default function MacBookPro16SevenSearchbar({ ...props }) {
  const [searchBarValue, setSearchBarValue] = React.useState("");

  return (
    <div {...props}>
      <div className="flex flex-col items-center p-[17px] my-[3px]">
        <Img src="images/img_arrow_left_blue_gray_900_01.svg" alt="arrowleft_one" className="h-[42px] w-[42px]" />
      </div>
      <Input
        color="red_200_77"
        size="md"
        name="search"
        placeholder={`Djiroun`}
        value={searchBarValue}
        onChange={(e) => setSearchBarValue(e)}
        prefix={<Img src="images/img_search_gray_500_02.svg" alt="search" className="cursor-pointer" />}
        suffix={
          searchBarValue?.length > 0 ? (
            <CloseSVG onClick={() => setSearchBarValue("")} height={42} width={42} fillColor="#999999ff" />
          ) : null
        }
        className="gap-3.5 sm:px-5 text-gray-500_02 font-sourcesanspro font-semibold border-red-200 border border-solid flex-grow rounded-[35px]"
      />
    </div>
  );
}
