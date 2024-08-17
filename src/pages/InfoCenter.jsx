import PageHeaderComp from "../components/PageHeaderComp";
import FilterCompo from "../components/FilterCompo";
import { useState, useEffect } from "react";
import TableCompo from "../components/TableCompo";
import toast, { Toaster } from "react-hot-toast";

import {
  useLazyGetAllInfosQuery,
  useDeleteInfoMutation,
} from "../redux/requests/infoCenterRequest";

function InfoCenter() {
  const [infoTitle, setInfoTitle] = useState("");
  const [allFilter, setAllFilter] = useState("");
  const [queryParams, setQueryParams] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [paginationParams, setPaginationParams] = useState("");

  useEffect(() => {
    if (infoTitle || allFilter) {
      setQueryParams(
        `&query-params=true${infoTitle && infoTitle}${allFilter && allFilter}`
      );
    } else {
      setQueryParams("");
    }
  }, [infoTitle, allFilter]);

  useEffect(() => {
    setPaginationParams(`?page=${currentPage}`);
  }, [currentPage]);

  //  API CALL
  const [trigger, { isLoading, isError, data, error }] =
    useLazyGetAllInfosQuery();

  useEffect(() => {
    const fetch = async () => {
      await trigger(`${paginationParams}${queryParams}`).unwrap();
    };
    fetch();
  }, [queryParams, paginationParams]);

  const prepareData = data?.docs.map((item) => {
    return {
      _id: item._id,
      infoTitle: item.infoTitle,
      examType: item.examType.examType,
      createdAt: item.createdAt,
    };
  });

  const tableTitle = [
    { title: "Info Title", keyName: "infoTitle" },
    { title: "Exam Type", keyName: "examType" },
    { title: "Created at", keyName: "createdAt", isDate: true },
  ];

  const infoCenterData = prepareData;

  const paginateOptions = data?.paginateOptions;

  const [deleteInfo] = useDeleteInfoMutation();

  const handleDeleteItem = async (id) => {
    const permission = prompt(`are you sure want to delete ?  if yes type "Y"`);
    if (permission && permission.toLowerCase() == "y") {
      await deleteInfo(id).then((res) => {
        if (res.error) {
          toast.error(`Error`);
        } else {
          toast.success("Successfully deleted student");
        }
      });
      return;
    }

    toast.error("Faild to delete.");
  };

  return (
    <div className="w-full">
      <Toaster />
      <PageHeaderComp
        heading={"Info Center"}
        buttonContent={"Add info"}
        route={"/auth/info-center/add-info"}
      />

      <FilterCompo
        setSearchItem={setInfoTitle}
        setAllFilter={setAllFilter}
        isFilter={true}
        filterExamType={true}
        filterDate={true}
        setCurrentPage={setCurrentPage}
        // // filterSubject={true}
        // // filterChapter={true}
        // filterPhoneNumber={true}
        // filterRollNumber={true}
      />
      <TableCompo
        tableTitle={tableTitle}
        tableData={infoCenterData}
        paginateOptions={paginateOptions}
        setCurrentPage={setCurrentPage}
        handleDeleteItem={handleDeleteItem}
        isLoading={isLoading}
        isError={isError}
      />
    </div>
  );
}

export default InfoCenter;
