
export default function AnnouncementHome() {
  return (
    <div className="flex flex-col">
      <div className="flex gap-5 px-5 w-full max-md:flex-wrap max-md:max-w-full">
        <div className="flex-auto mt-8 text-7xl font-bold text-indigo-950 max-md:max-w-full max-md:text-4xl">
          Announcement
        </div>
        <div className="flex gap-5 items-start self-start max-md:flex-wrap max-md:max-w-full">
          <div className="grow mt-14 ml-px text-4xl font-bold text-indigo-950">
            Administration
          </div>
          <div className="flex flex-col justify-center items-start self-stretch px-11 py-1.5 mt-12 bg-stone-400 rounded-[48.17px] max-md:pl-5">
            <div className="shrink-0 bg-zinc-300 h-[38px] rounded-[48.17px]" />
          </div>
          <div className="flex-auto mt-14 text-4xl font-bold text-indigo-950">
            Other
          </div>
        </div>
      </div>
      <div className="mt-28 w-full max-md:mt-10 max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col max-md:gap-0">
          <div className="flex flex-col w-[62%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col grow px-5 text-indigo-950 max-md:mt-10 max-md:max-w-full">
              <div className="flex gap-2.5 pr-16 max-md:flex-wrap max-md:pr-5">
                <img
                  loading="lazy"
                  srcSet="..."
                  className="shrink-0 aspect-[1.04] w-[83px]"
                />
                <div className="flex flex-col grow shrink-0 basis-0 w-fit max-md:max-w-full">
                  <div className="text-3xl font-medium leading-10 max-md:max-w-full">
                    Account name
                  </div>
                  <div className="text-3xl leading-8 max-md:max-w-full">
                    @Handle
                  </div>
                </div>
              </div>
              <div className="mt-10 text-2xl leading-10 text-violet-950 max-md:mt-10 max-md:max-w-full">
                <span className="text-neutral-900">
                  Lorem ipsum dolor sit amet illiet es ail consectetur
                  adipiscing elit. Ultrices et pulvinar id convallis quis luctus
                  forza
                </span>
                <br />
                <span className="text-violet-950">
                  http://ow.ly/95IZ50z3bQP
                </span>
              </div>
              <div className="mt-14 text-3xl font-medium leading-10 max-md:mt-10 max-md:max-w-full">
                Check announcement{" "}
              </div>
            </div>
          </div>
          <div className="flex flex-col ml-5 w-[38%] max-md:ml-0 max-md:w-full">
            <img
              loading="lazy"
              srcSet="..."
              className="mt-12 w-full aspect-[1.47] max-md:mt-10 max-md:max-w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
