// import { Img, Button, Text, Heading, Input } from "./..";
import { Img } from "../Img";
import { Button } from "../Button";
import { Text } from "../Text";
import { Heading } from "../Heading";
import { Input } from "../Input";
export default function Footer({ ...props }) {
  return (
    <footer {...props}>
      <div className="flex flex-col justify-center mb-1 mx-auto max-w-[1200px]">
        <div className="flex md:flex-col items-start">
          <div className="flex flex-col md:self-stretch flex-1">
            <div className="flex justify-between items-center w-[36%] md:w-full gap-5">
              <div className="h-[75px] w-[75px] bg-gradient1 rounded-[10px]" />
              <Heading size="5xl" as="h1" className="!text-white-A700_01">
                LOGO
              </Heading>
            </div>
            <Text as="p" className="mt-[47px] !text-white-A700_a2 opacity-0.8">
              <>
                A simple paragraph is comprised of three major components. <br />
                The first sentence, which is often a declarative sentence.
              </>
            </Text>
            <div className="flex flex-col items-end w-[87%] md:w-full mt-[81px]">
              <div className="flex self-stretch">
                <Input shape="round" name="email" placeholder={`Your email`} className="w-[63%] sm:px-5" />
              </div>
              <Button
                color="gray_900"
                size="5xl"
                className="mt-[-69px] sm:px-5 font-bold relative min-w-[216px] rounded-[20px]"
              >
                Subscribe
              </Button>
            </div>
          </div>
          <div className="flex flex-col items-start mt-[19px] ml-[90px] gap-[38px] md:ml-0">
            <Heading size="2xl" as="h4" className="!text-white-A700_01">
              Platform
            </Heading>
            <ul className="flex flex-col items-start gap-3.5">
              <li>
                <a href="Home" target="_blank" rel="noreferrer" className="opacity-0.8">
                  <Text as="p" className="!text-white-A700_a2">
                    Home
                  </Text>
                </a>
              </li>
              <li>
                <a href="Events" target="_blank" rel="noreferrer" className="opacity-0.8">
                  <Text as="p" className="!text-white-A700_a2">
                    Events
                  </Text>
                </a>
              </li>
              <li>
                <a href="Posts" target="_blank" rel="noreferrer" className="opacity-0.8">
                  <Text as="p" className="!text-white-A700_a2">
                    Posts
                  </Text>
                </a>
              </li>
              <li>
                <a href="Announcement" target="_blank" rel="noreferrer" className="opacity-0.8">
                  <Text as="p" className="!text-white-A700_a2">
                    Announcement
                  </Text>
                </a>
              </li>
            </ul>
          </div>
          <div className="flex flex-col items-start mt-[21px] ml-[34px] gap-[34px] md:ml-0">
            <Heading size="2xl" as="h4" className="!text-white-A700_01">
              Help
            </Heading>
            <ul className="flex flex-col items-start gap-3.5">
              <li>
                <a href="#" className="opacity-0.8">
                  <Text as="p" className="!text-white-A700_a2">
                    How does it works?
                  </Text>
                </a>
              </li>
              <li>
                <a href="#" className="opacity-0.8">
                  <Text as="p" className="!text-white-A700_a2">
                    Where to ask question?
                  </Text>
                </a>
              </li>
              <li>
                <a href="#" className="opacity-0.8">
                  <Text as="p" className="!text-white-A700_a2">
                    How to share somthing?
                  </Text>
                </a>
              </li>
              <li>
                <a href="#" className="opacity-0.8">
                  <Text as="p" className="!text-white-A700_a2">
                    What is needed for this?
                  </Text>
                </a>
              </li>
            </ul>
          </div>
          <div className="flex flex-col items-start mt-5 ml-[69px] md:ml-0">
            <Heading size="2xl" as="h4" className="!text-white-A700_01">
              Contacts
            </Heading>
            <Text as="p" className="mt-[38px] !text-white-A700_a2 opacity-0.8">
              (012) 1234-567-890
            </Text>
            <ul className="flex flex-col items-start mt-[13px]">
              <li>
                <a href="#" className="opacity-0.8">
                  <Text as="p" className="!text-white-A700_a2">
                    123 xyz xyz
                  </Text>
                </a>
              </li>
              <li>
                <a href="#" className="opacity-0.8">
                  <Text as="p" className="!text-white-A700_a2">
                    qwuerybaihefv, qiwu - hrebcl
                  </Text>
                </a>
              </li>
              <li>
                <a href="095467" target="_blank" rel="noreferrer" className="opacity-0.8">
                  <Text as="p" className="!text-white-A700_a2">
                    095467
                  </Text>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="h-px mt-[75px] opacity-0.9 bg-white-A700_ab" />
        <div className="flex md:flex-col self-start items-center mt-10">
          <Text as="p" className="self-end mb-[3px] !text-white-A700_90 opacity-0.8">
            @ XYZ 20XX --- 20XX. All rights reserved.
          </Text>
          <Img
            src="images/img_ant_design_facebook_outlined.svg"
            alt="antdesign_one"
            className="h-[44px] w-[45px] md:w-full ml-[784px] md:ml-0"
          />
          <Img
            src="images/img_ant_design_instagram_outlined.svg"
            alt="antdesign_three"
            className="h-[44px] w-[44px] md:w-full ml-[50px] md:ml-0"
          />
          <Button size="md" shape="square" className="w-[45px] ml-[50px] md:ml-0">
            <Img src="images/img_ant_design_twit.svg" />
          </Button>
          <Img
            src="images/img_ant_design_linkedin_outlined.svg"
            alt="antdesign_five"
            className="h-[44px] w-[44px] md:w-full ml-[50px] md:ml-0"
          />
        </div>
      </div>
    </footer>
  );
}
