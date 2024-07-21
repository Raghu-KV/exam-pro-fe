import React from "react";
import { MdSearch, MdFilterAlt, MdClose } from "react-icons/md";
import { useState, useEffect } from "react";
import { useLazyGetExamTypeForDropDownQuery } from "../redux/requests/examTypeRequest";
import { useLazyGetAllSubjectsForDropDownQuery } from "../redux/requests/subjectsRequest";
import { useLazyGetAllChapterForDropDownQuery } from "../redux/requests/chapterRequest";

function FilterCompo({
  searchItem,
  setSearchItem,
  allFilter,
  setAllFilter,
  isFilter,
  filterExamType,
  filterDate,
  filterSubject,
  filterChapter,
  filterRollNumber,
  filterPhoneNumber,
  setCurrentPage,
}) {
  const [openFilter, setOpenFilter] = useState(false);

  const [search, setSearch] = useState("");
  const [examType, setExamType] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [subject, setSubjet] = useState("");
  const [chapter, setChapter] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [phoneNo, setPhoneNo] = useState("");

  //   const [allFilter, setAllFilter] = useState("");
  //   const [searchItem, setSearchItem] = useState("");

  const handleClearFilter = () => {
    setExamType("");
    setStartDate("");
    setEndDate("");
    setSubjet("");
    setChapter("");
    setRollNo("");
    setPhoneNo("");
  };

  const handleApplyFilter = () => {
    setCurrentPage(1);
    if (
      examType ||
      startDate ||
      endDate ||
      subject ||
      chapter ||
      rollNo ||
      phoneNo
    ) {
      const filterQuery = `&filter=true${examType && `&exam_type=${examType}`}${
        subject && `&subject=${subject}`
      }${chapter && `&chapter=${chapter}`}${rollNo && `&roll_no=${rollNo}`}${
        phoneNo && `&phone_no=${phoneNo}`
      }${startDate && `&start_date=${startDate}`}${
        endDate && `&end_date=${endDate}`
      }`;

      setAllFilter(filterQuery);
    } else {
      setAllFilter("");
    }

    if (search) {
      const searchQuery = `&search=${search}`;
      setSearchItem(searchQuery);
    } else {
      setSearchItem("");
    }
  };

  const handleSearch = () => {
    setCurrentPage(1);
    if (search) {
      const searchQuery = `&search=${search}`;
      setSearchItem(searchQuery);
    } else {
      setSearchItem("");
    }

    if (
      examType ||
      startDate ||
      endDate ||
      subject ||
      chapter ||
      rollNo ||
      phoneNo
    ) {
      const filterQuery = `&filter=true${examType && `&exam_type=${examType}`}${
        subject && `&subject=${subject}`
      }${chapter && `&chapter=${chapter}`}${rollNo && `&roll_no=${rollNo}`}${
        phoneNo && `&phone_no=${phoneNo}`
      }${startDate && `&start_date=${startDate}`}${
        endDate && `&end_date=${endDate}`
      }`;

      setAllFilter(filterQuery);
    } else {
      setAllFilter("");
    }
  };

  const [examTypeTrigger, examTypeResult] =
    useLazyGetExamTypeForDropDownQuery();

  useEffect(() => {
    const fetch = async () => {
      await examTypeTrigger();
    };
    fetch();
  }, []);

  const examTypeData = examTypeResult?.data?.map((examType) => {
    return { type: examType.examType, id: examType.examTypeId };
  });

  // SUBJECT DROPDOWN API
  const [subjectTrigger, subjectResult] =
    useLazyGetAllSubjectsForDropDownQuery();

  useEffect(() => {
    const fetch = async () => {
      await subjectTrigger();
    };
    fetch();
  }, []);

  const prpareSubjectDropDown = subjectResult?.data?.map((item) => {
    return { id: item.subjectId, type: item.subjectName };
  });

  const subjecteData = prpareSubjectDropDown;

  // chapter drop dow api
  const [cahpterTrigger, chapterResult] =
    useLazyGetAllChapterForDropDownQuery();

  useEffect(() => {
    const fetch = async () => {
      await cahpterTrigger();
    };
    fetch();
  }, []);

  const prparechapterDropDown = chapterResult?.data?.map((item) => {
    return { id: item.chapterId, type: item.chapterName };
  });

  const chapterData = prparechapterDropDown;

  if (examTypeResult?.isLoading || subjectResult?.isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="m-2 ">
      <div className="flex flex-col">
        <div className="w-full border border-appGray flex items-center px-4 text-appGray font-semibold rounded-xl gap-2">
          <MdSearch size={25} />
          <input
            type="text"
            className="w-full  px-2 py-3 rounded-xl placeholder-slate-400 focus:outline-none block text-appDarkBlue"
            placeholder="Search..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
          <button
            className="border bg-appDarkBlue text-appLightGray  px-2 py-1 rounded-lg flex items-center gap-1 text-sm hover:scale-105 duration-200"
            onClick={() => handleSearch()}
          >
            <MdSearch size={25} />
            <p>Search</p>
          </button>
          {isFilter && (
            <button
              className="border border-appDarkBlue text-appDarkBlue  px-2 py-1 rounded-lg flex items-center gap-1 text-sm hover:scale-105 
          duration-200"
              onClick={() => setOpenFilter((prev) => !prev)}
            >
              {openFilter ? <MdClose size={25} /> : <MdFilterAlt size={25} />}
            </button>
          )}
        </div>

        {openFilter && isFilter && (
          <div className="border border-appGray mt-2 mb-2 px-4 py-2 rounded-xl">
            <div
              className={`${
                openFilter ? `scale-y-100` : `scale-y-0 hidden`
              } duration-200 flex flex-wrap gap-3 w-full items-center justify-between mt-2 mb-2 px-4 py-2`}
            >
              {/* EXAM TYPE  */}
              {filterExamType && (
                <div className="basis-1/4 text-appDarkBlue">
                  <label
                    htmlFor="exam-type"
                    className="block  font-semibold ml-1"
                  >
                    Exam Type:
                  </label>
                  <select
                    name="exam-type"
                    id="exam-type"
                    className="mt-1 px-1 py-2 border  border-appGray w-full rounded-lg focus:outline-none focus:border-appGreen focus:ring-1 focus:ring-appGreen"
                    value={examType}
                    onChange={(event) => setExamType(event.target.value)}
                  >
                    <option value="">--Select--</option>
                    {examTypeData.map((item) => (
                      <option value={item.id} key={item.id}>
                        {item.type}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* DATE FILTER */}
              {filterDate && (
                <div className="basis-1/4 text-appDarkBlue flex w-full gap-2">
                  <div className="w-full">
                    <label
                      htmlFor="start-date"
                      className="block font-semibold ml-1 justify-between"
                    >
                      Start Date:
                    </label>
                    <input
                      type="date"
                      value={startDate}
                      id="start-date"
                      className="mt-1 py-2 border  border-appGray w-full rounded-lg focus:outline-none focus:border-appGreen focus:ring-1 
                focus:ring-appGreen px-2 placeholder-slate-400"
                      onChange={(event) => setStartDate(event.target.value)}
                    />
                  </div>
                  <div className="w-full">
                    <label
                      htmlFor="end-date"
                      className="block font-semibold ml-1"
                    >
                      End Date:
                    </label>
                    <input
                      type="date"
                      value={endDate}
                      id="end-date"
                      className="mt-1 py-2 border  border-appGray w-full rounded-lg focus:outline-none focus:border-appGreen focus:ring-1 
                focus:ring-appGreen px-2 placeholder-slate-400"
                      onChange={(event) => setEndDate(event.target.value)}
                    />
                  </div>
                </div>
              )}

              {/* SUBJECT */}
              {filterSubject && (
                <div className="basis-1/4 text-appDarkBlue">
                  <label
                    htmlFor="subject"
                    className="block  font-semibold ml-1"
                  >
                    Subject:
                  </label>
                  <select
                    name="subject"
                    id="subject"
                    className="mt-1 px-1 py-2 border  border-appGray w-full rounded-lg focus:outline-none focus:border-appGreen focus:ring-1 
            focus:ring-appGreen placeholder-slate-400"
                    value={subject}
                    onChange={(event) => setSubjet(event.target.value)}
                  >
                    <option value="">--Select--</option>
                    {subjecteData.map((item) => (
                      <option value={item.id} key={item.id}>
                        {item.type}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* CHAPTER  */}
              {filterChapter && (
                <div className="basis-1/4 text-appDarkBlue">
                  <label
                    htmlFor="chapter"
                    className="block  font-semibold ml-1"
                  >
                    Chapter:
                  </label>
                  <select
                    name="chapter"
                    id="chapter"
                    className="mt-1 px-1 py-2 border  border-appGray w-full rounded-lg focus:outline-none focus:border-appGreen focus:ring-1 
            focus:ring-appGreen placeholder-slate-400  "
                    value={chapter}
                    onChange={(event) => setChapter(event.target.value)}
                  >
                    <option value="">--Select--</option>
                    {chapterData?.map((item) => (
                      <option value={item.id} key={item.id}>
                        {item.type}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/*ROLL NUMBER  */}
              {filterRollNumber && (
                <div className="basis-1/4 text-appDarkBlue">
                  <label
                    htmlFor="roll-no"
                    className="block  font-semibold ml-1"
                  >
                    Roll No:
                  </label>
                  <input
                    type="text"
                    id="roll-no"
                    className="border-appGray border mt-1 px-2 py-2 rounded-lg w-full placeholder-slate-400  
                focus:outline-none  focus:border-appGreen focus:ring-1 focus:ring-appGreen "
                    placeholder="Roll number"
                    value={rollNo}
                    onChange={(event) => setRollNo(event.target.value)}
                  />
                </div>
              )}

              {/* PHONE NUMBER */}
              {filterPhoneNumber && (
                <div className="basis-1/4 text-appDarkBlue">
                  <label
                    htmlFor="phone-no"
                    className="block  font-semibold ml-1"
                  >
                    Phone No:
                  </label>
                  <input
                    type="number"
                    id="phone-no"
                    className="border-appGray border mt-1 px-2 py-2 rounded-lg w-full placeholder-slate-400  
              focus:outline-none  focus:border-appGreen focus:ring-1 focus:ring-appGreen "
                    placeholder="Phone number"
                    value={phoneNo}
                    onChange={(event) => setPhoneNo(event.target.value)}
                  />
                </div>
              )}
            </div>

            <div className="flex justify-end gap-3 mr-5 text-sm font-semibold">
              <button
                className="border border-appDarkBlue text-appDarkBlue  px-2 py-1 rounded-lg flex items-center gap-1 text-sm hover:scale-105 
                duration-200"
                onClick={() => handleClearFilter()}
              >
                Clear filter
              </button>
              <button
                className="border bg-appDarkBlue text-appLightGray  px-2 py-1 rounded-lg flex items-center gap-1 text-sm hover:scale-105 
              duration-200"
                onClick={() => handleApplyFilter()}
              >
                <MdSearch size={25} />
                <p>Apply & search</p>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default FilterCompo;
