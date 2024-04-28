export default function Events2() {
  return (
    <div className="md:px-12 max-w-screen-2xl w-full mx-auto p-4">
         <div className="flex flex-col  items-center px-5">
      <div className="text-6xl font-bold text-center text-stone-400 max-md:max-w-full max-md:text-4xl">
        <span className="text-indigo-950">Events may </span>
        <span className="text-stone-400">interest you.</span>
      </div>
      <div className="self-stretch  mt-24 w-full max-md:mt-10 max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col max-md:gap-0">
          <div className="flex flex-col w-[33%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col grow items-start px-6 pb-20 w-full bg-white rounded-3xl shadow-sm text-neutral-900 max-md:px-5 max-md:mt-10">
              <img
                loading="lazy"
                srcSet="..."
                className="self-stretch w-full aspect-[1.45]"
              />
              <div className="mt-7 ml-2.5 text-2xl font-bold tracking-tight leading-8">
                GDG Algiers CTF
              </div>
              <div className="mt-2 ml-2.5 text-base tracking-tight leading-5">
                ESI
              </div>
            </div>
          </div>
          <div className="flex flex-col ml-5 w-[33%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col grow pt-8 pb-20 w-full bg-white rounded-3xl shadow-sm text-neutral-900 max-md:mt-10">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/85bc91d4f47dcce5dcdbd72d665006939ad1a64a33952db2180135b37bf36432?"
                className="self-end mr-10 aspect-[1.05] w-[38px] max-md:mr-2.5"
              />
              <div className="flex flex-col px-8 mt-48 max-md:px-5 max-md:mt-10">
                <div className="text-2xl font-bold tracking-tight leading-8">
                  Flutter Forward
                </div>
                <div className="mt-3.5 text-base tracking-tight leading-5">
                  USTHB
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col ml-5 w-[33%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col grow items-start pb-20 pl-6 w-full whitespace-nowrap bg-white rounded-3xl shadow-sm text-neutral-900 max-md:mt-10">
              <img
                loading="lazy"
                srcSet="..."
                className="self-stretch w-full aspect-[1.64]"
              />
              <div className="mt-9 ml-2.5 text-2xl font-bold tracking-tight leading-8">
                Devfest
              </div>
              <div className="mt-3.5 ml-2.5 text-base tracking-tight leading-5">
                ESI
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="justify-center px-6 py-3.5 mt-20 text-base font-medium tracking-tight leading-6 text-center text-gray-50 bg-stone-400 rounded-[75.498px] max-md:px-5 max-md:mt-10">
        More Data
      </div>
    </div>
    </div>
  )
}
