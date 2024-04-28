export default function Footer() {
  return (
    <div className="flex flex-col items-center px-20 py-11 mt-56  bg-primary max-md:px-5 max-md:mt-10 max-md:max-w-full">
      <div className="w-full  max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col max-md:gap-0">
          <div className="flex flex-col w-[46%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col text-white max-md:mt-10 max-md:max-w-full">
              <div className="flex gap-5 self-start text-4xl font-bold whitespace-nowrap">
                <div className="shrink-0 rounded-xl h-[75px] w-[75px]" />
                <div className="flex-auto my-auto">LOGO</div>
              </div>
              <div className="mt-14 text-left text-2xl max-md:mt-10 max-md:max-w-full">
                A simple paragraph is comprised of three major components.{" "}
                <br />
                The first sentence, which is often a declarative sentence.
              </div>
            </div>
          </div>
          <div className="flex flex-col ml-5 w-[32%] max-md:ml-0 max-md:w-full">
            <div className="grow mt-7 max-md:mt-10 max-md:max-w-full">
              <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                <div className="flex flex-col w-[38%] max-md:ml-0 max-md:w-full">
                  <div className="flex flex-col grow text-2xl text-white whitespace-nowrap max-md:mt-9">
                    <div className="font-semibold">Platform</div>
                    <div className="mt-14 max-md:mt-10">Home</div>
                    <div className="mt-8">Events</div>
                    <div className="mt-8">Posts</div>
                    <div className="mt-8">Announcement</div>
                  </div>
                </div>
                <div className="flex flex-col ml-5 w-[62%] max-md:ml-0 max-md:w-full">
                  <div className="flex flex-col grow text-2xl whitespace-nowrap text-white max-md:mt-9">
                    <div className="font-semibold">Help</div>
                    <div className="mt-12 max-md:mt-10">How does it works?</div>
                    <div className="mt-8">Where to ask question?</div>
                    <div className="mt-7">How to share somthing?</div>
                    <div className="mt-6">What is needed for this?</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col ml-5 w-[21%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col self-stretch my-auto text-2xl whitespace-nowrap text-white max-md:mt-9">
              <div className="font-semibold">Contacts</div>
              <div className="mt-14 max-md:mt-10">(012) 1234-567-890</div>
              <div className="mt-7">
                123 xyz xyz
                <br />
                qwuerybaihefv, qiwu - hrebcl
                <br />
                095467
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-0 self-start mt-1 ml-5 max-w-full text-xl w-[550px] max-md:flex-wrap">
      <div className="relative">
  <div className="grow justify-center items-start px-6 md:px-24 p-4 md:p-7 bg-[#E4CBA3] rounded-3xl text-white w-fit md:max-md:px-5" style={{ marginLeft: '-32px' }}>
    Your email
  </div>
  <div className="absolute top-0 left-0 md:left-44 z-10 justify-center px-6 md:px-16 py-4 md:py-7 font-bold text-white whitespace-nowrap rounded-3xl bg-[#2F2921] max-md:pr-6 max-md:pl-15">
    Subscribe
  </div>
</div>
      </div>
      <div className="shrink-0 mt-20 max-w-full h-px bg-white border border-white border-solid w-[1532px] max-md:mt-10" />
      <div className="flex gap-5 mt-10 w-full max-w-[1532px] max-md:flex-wrap max-md:mt-10 max-md:max-w-full">
        <div className="flex-auto my-auto text-2xl text-white text-opacity-80">
        </div>
          <a href="" className=" text-white mt-2 text-left ">@ Linkcup All rights reserved.</a>
        <div className="flex gap-5 justify-between">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/d1f98a67423e15960fd64d420c8b725d3bdaec908be2f82f0171cb2639072f9d?"
            className="shrink-0 aspect-[1.02] w-[45px]"
          />
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/d4cc8fac48524514c663fb25f7de3301a2b0c3b90b9f47ea3d17600f47f764de?"
            className="shrink-0 w-11 aspect-square"
          />
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/f1e0ec468040b6665973a801b012922f0df8b75adf8dc1f6010209e8f614a999?"
            className="shrink-0 aspect-[1.02] w-[45px]"
          />
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/f2ba3d1c4d4ff8e0017a6bc9d6fb02202431714ae43311a63a77542c4fa027a3?"
            className="shrink-0 w-11 aspect-square"
          />
        </div>
      </div>
    </div>
  );
}


