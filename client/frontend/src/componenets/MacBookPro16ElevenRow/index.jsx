/* eslint-disable react/prop-types */
import { Heading, Img } from "./..";

export default function MacBookPro16ElevenRow({
  // eslint-disable-next-line react/prop-types
  gdgAlgiersCtf = "images/img_credits_to_unsplash_com.png",
  avatarfour = "58+",
  ...props
}) {
  return (
    <div {...props}>
      <div className="flex justify-center w-full">
        <Img src={gdgAlgiersCtf} alt="gdg_algiers_ctf" className="w-[29px] object-cover rounded-[14px]" />
        <div className="flex justify-center w-[51%] ml-[-9px] relative border-gray-50 border-[3px] border-solid rounded-[14px]">
          <Img
            src="images/img_credits_to_unsplash_com_29x29.png"
            alt="gdg_algiers_ctf"
            className="h-[29px] w-[29px] rounded-[50%]"
          />
        </div>
      </div>
      <div className="flex justify-center w-full ml-[-9px] relative">
        <div className="w-full border-gray-50 border-[3px] border-solid rounded-[14px]">
          <Img src="images/img_elipse_5.png" alt="gdg_algiers_ctf" className="h-[29px] w-[29px] rounded-[50%]" />
        </div>
        <Heading
          size="xs"
          as="h1"
          className="flex justify-center items-center h-[29px] w-[29px] ml-[-9px] pl-2 pr-px py-[7px] !text-gray-500 tracking-[-0.22px] !font-dmsans !text-[10.79px] relative border-gray-50 border-[3px] border-solid bg-gray-50 rounded-[14px]"
        >
          {avatarfour}
        </Heading>
      </div>
    </div>
  );
}
