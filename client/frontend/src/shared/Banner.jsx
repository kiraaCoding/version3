export default function Banner() {
    return (
      <div className="gradientBg rounded-xl rounded-br-[90px] w-full md:w-[1710px] h-[500px] mt-14">
        <div className="flex flex-col items-center">
          {/* banner content */}
          <div className="w-full md:w-3/5 text-center py-8">
            <h1 className="text-3xl mt-12 md:text-7xl font-extrabold text-white">
              Linkcup for <br /> Students new chapter
            </h1>
            <p className="mt-12 text-white">
              HERE where you can discover people PASSED your PRESENT or still
              <br />
              living it, let them make your UNIVERSITY life EASIER...
            </p>
  
            <div className="mt-8">
              <button className="bg-beige md:w-64 hover:bg-beigehover text-white font-bold py-2 px-4 rounded">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  