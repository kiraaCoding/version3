import NavBar from "../../shared/Navbar";
import Student from "/src/assets/Student.png"
import {useState } from 'react';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import announcement  from "/src/assets/announcement.png"
import { FaArrowRight } from "react-icons/fa6";
import conference from "/src/assets/icons/conference.png"
import cours1 from "/src/assets/cours1.png"
import Publications from "../../shared/Publications";
import Footer from "../../shared/Footer";
// import { Switch } from "../Switch";
export default function TeacherForS() {
  const [searchQuery, setSearchQuery] = useState('');
  // eslint-disable-next-line no-unused-vars
  const { search } = useLocation();
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    // You can add search functionality here
}
  return (
    <div className="flex mt-auto flex-col  items-center  w-full max-md:pl-5 max-md:max-w-full">
    <NavBar/>
    <div className="Banner gradientBg rounded-xl rounded-br-[90px] w-full max-w-[1710px] md:w-[1710px] h-[360px] mt-32 relative ">
  <div className="mr-8 md:mr-96">
    <h1 className="text-[30px] md:text-[87px] mt-20 md:mt-12 md:text-7xl font-extrabold text-white">
      Find here your teachers <br /> courses, conferences <br /> & more
    </h1>
  </div>
  <div className="flex flex-row-reverse justify-between items-center">
    <img className="absolute top-[-65px] md:top-[-30px] lg:top-[-47px] w-[590px]" src={Student} alt="" />
    {/* banner content */}
    <div className="w-full md:w-3/5 text-center mb-12">
    </div>
  </div>
    </div>
    <div className='flex justify-center mt-16 relative'>
        <input
          type='text'
          className='rounded-full md:w-[750px] bg-beige bg-opacity-45 px-4 py-4 pl-16 border border-beigehover focus:outline-none focus:border-primary '
          placeholder='Search by teacher name...'
          value={searchQuery}
          onChange={handleSearch}
        />
        <span className='absolute left-5 top-1/2 transform -translate-y-1/2 text-primary'><FontAwesomeIcon icon={faSearch} /></span>
      </div>
      <div className="flex gap-5 justify-between items-start px-16 pt-20 pb-6 mt-36 ml-8 max-w-full text-3xl font-medium tracking-wide leading-8 bg-white rounded-3xl text-indigo-950 w-[1492px] max-md:flex-wrap max-md:px-5 max-md:mt-10">
        <div className="flex flex-col self-start max-md:max-w-full">
          <div className="text-7xl  text-primary text-left font-bold tracking-tighter leading-[82.14px] max-md:max-w-full max-md:text-4xl">
            Important Links
          </div>
          <div className="flex gap-2.5 self-start mt-12 max-md:mt-10 flex-wrap">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/6abba108d080553586e0f63c793984aaf73e98801ec5c825bfb6f3379badb8bf?"
              className="shrink-0 aspect-square w-[46px]"
            />
            <div className="my-auto">time management</div>
          </div>
          <div className="flex gap-2.5 mt-4 max-md:flex-wrap">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/b68a4bc9abc9a464812227ef418ddc93501e184f3026563e77251cbcfbf34d29?"
              className="shrink-0 aspect-[1.02] w-[46px]"
            />
            <div className="my-auto max-md:max-w-full">
              Previous topics for final year projects
            </div>
          </div>
          <div className="flex gap-2.5 mt-5 max-md:flex-wrap">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/e6229784c603ddf2583c5983175ec0ebde83d4351e1944a111c16d12a86c5647?"
              className="shrink-0 aspect-[1.02] w-[46px]"
            />
            <div className="my-auto max-md:max-w-full">
              Actual topics for final year projects
            </div>
          </div>
          <div className="flex gap-2.5 self-start mt-4 whitespace-nowrap">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/6494b3858619e407e8b9d56dcd78956556e672b34a46df9325a3b3815e53257d?"
              className="shrink-0 aspect-square w-[46px]"
            />
            <div className="my-auto">Contacts</div>
          </div>
        </div>
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/7d0836848f3a3eed5243234c3b8b03405ab12e2bef4e00117451086233b6ffca?"
          className="shrink-0 self-end mt-14 max-w-full aspect-[1.09] w-[285px] max-md:mt-10 mr-12"
        />
      </div>
      <div className="flex gap-5 mt-24 w-full max-w-[1346px] max-md:flex-wrap max-md:mt-10 max-md:max-w-full">
          <div className="flex-auto  text-left text-7xl font-bold text-primary max-md:max-w-full max-md:text-4xl">
            Announcement
          </div>
          {/* <div className="flex gap-5 mt-4  items-start self-start max-md:flex-wrap max-md:max-w-full">
            <div className="grow text-4xl font-bold  text-primary">
              Administration
            </div>
            <Switch className=" ml-14 self-end" />
            <div className="flex flex-col justify-center items-start self-stretch px-11 py-1.5 bg-stone-400 rounded-[48.17px] max-md:pl-5">
              <div className="shrink-0 bg-zinc-300 h-[38px] rounded-[48.17px]" />
            </div>
            <div className="flex-auto  text-4xl font-bold text-primary">
              Other
            </div>
          </div> */}
        </div>
      <div className="mt-28 w-full max-w-[1395px] max-md:mt-10 max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col max-md:gap-0">
          <div className="flex flex-col w-[62%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col grow text-indigo-950 max-md:mt-10 max-md:max-w-full">
              <div className="flex gap-2.5 pr-16 max-md:flex-wrap max-md:pr-5">
                <img
                  loading="lazy"
                  src={announcement}
                  className="shrink-0 aspect-[1.04] w-[83px]"
                />
                <div className="flex flex-col grow shrink-0 basis-0 w-fit max-md:max-w-full">
                  <div className=" text-left text-3xl font-medium leading-10 max-md:max-w-full">
                    Account name
                  </div>
                  <div className="text-3xl text-left leading-8 max-md:max-w-full">
                    @Handle
                  </div>
                </div>
              </div>
              <div className="mt-10 text-left text-2xl leading-10 text-violet-950 max-md:mt-10 max-md:max-w-full">
                <span className=" text-lefttext-neutral-900">
                  Lorem ipsum dolor sit amet illiet es ail consectetur
                  adipiscing elit. Ultrices et pulvinar id convallis quis luctus
                  forza
                </span>
                <br />
                <span className="  text-bleu">
                  http://ow.ly/95IZ50z3bQP
                </span>
              </div>
              <div className="mt-14 text-3xl text-primary text-left font-medium leading-10 max-md:mt-10 max-md:max-w-full flex items-center">
                    <span style={{ marginRight: '1rem' }}>Check announcement</span> <FaArrowRight style={{ verticalAlign: 'middle' }} />
                </div>
            </div>
          </div>
          <div className="flex flex-col ml-5 w-[38%] max-md:ml-0 max-md:w-full">
            <img
              loading="lazy"
              src={announcement}
              className=" mt-8 w-full aspect-[1.47] max-md:mt-10 max-md:max-w-full"
            />
          </div>
        </div>
      </div>
      <div className="flex gap-5 justify-between mt-28 w-full text-lg font-medium leading-8 text-gray-500 max-w-[1395px] max-md:flex-wrap max-md:mt-10 max-md:max-w-full">
        <div className="flex flex-col max-md:max-w-full">
          <div className="justify-center self-start px-6 py-2.5 tracking-wide whitespace-nowrap rounded-xl bg-GrayClaire text-indigo-950 max-md:px-5">
            Benefits
          </div>
          <div className="mt-6 text-left text-7xl font-bold text-primary max-md:max-w-full max-md:text-4xl">
            Courses & Conferences
          </div>
          <div className="flex gap-5  mt-11 mr-5 tracking-wide max-md:flex-wrap max-md:mt-10 max-md:mr-2.5">
            <img
              loading="lazy"
              src={conference}
              className="shrink-0 aspect-square w-[60px]"
            />
            <div className="my-auto max-md:max-w-full mt-6">
              Conference about artificial intelligence{" "}
            </div>
          </div>
          <div className="flex gap-5 mt-10 mr-5 tracking-wide max-md:flex-wrap max-md:mr-2.5">
            <img
              loading="lazy"
              src={conference}
              className="shrink-0 aspect-square w-[60px]"
            />
            <div className="my-auto max-md:max-w-full mt-6">
              Course BDD second Chapter ACAD B L2{" "}
            </div>
          </div>
          <div className="flex gap-5 mt-10 tracking-wide max-md:flex-wrap">
            <img
              loading="lazy"
              src={conference}
              className="shrink-0 my-auto aspect-square w-[60px]"
            />
            <div className="max-md:max-w-full mt-6">
              Conference Online about graduation Project redaction
            </div>
          </div>
        </div>
        <img
          loading="lazy"
          src={cours1}
          className="shrink-0 my-auto max-w-full aspect-[1.08] w-[300px]"
        />
      </div>
      <div className="self-start text-left mt-11 lg:ml-12  text-3xl font-medium leading-10  text-primary  max-md:mt-10 max-md:max-w-full flex items-center">
      <span style={{ marginRight: '1rem' }}>Check announcement</span> <FaArrowRight style={{ verticalAlign: 'middle' }} />
      </div>
      <div className="mt-48 text-7xl text-primary font-bold tracking-wider text-center text-stone-400 max-md:mt-10 max-md:max-w-full max-md:text-4xl">
          Discover similar <br />
          interests &{" "}
          <span className="text-stone-400 text-beige ">new utile Informations</span>
        </div>
        <div className="mt-12 text-2xl font-semibold text-center text-neutral-500 w-[778px] max-md:mt-10 max-md:max-w-full">
          A simple paragraph is comprised of three major components. The which
          is often a declarative sentence.
        </div>
          <Publications/>
          <div className="relative z-10 justify-center items-center px-16 py-2.5 mt-20 mb-6 max-w-full text-xl font-bold text-white rounded-sm bg-beige w-[376px] max-md:px-5 max-md:mt-10 max-md:mb-2.5">
      More publications
    </div>
    <Footer/>
    </div>
  );
}


