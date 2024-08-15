import PageHeaderComp from "../components/PageHeaderComp";
import FilterCompo from "../components/FilterCompo";
import { useState, useEffect } from "react";
import TableCompo from "../components/TableCompo";
import toast, { Toaster } from "react-hot-toast";
import {
  useLazyGetAllGroupsQuery,
  useDeleteGroupMutation,
} from "../redux/requests/groupRequest";

function Group() {
  const [groupName, setGrouprName] = useState("");
  const [allFilter, setAllFilter] = useState("");
  const [queryParams, setQueryParams] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [paginationParams, setPaginationParams] = useState("");

  useEffect(() => {
    if (groupName || allFilter) {
      setQueryParams(
        `&query-params=true${groupName && groupName}${allFilter && allFilter}`
      );
    } else {
      setQueryParams("");
    }
  }, [groupName, allFilter]);

  useEffect(() => {
    setPaginationParams(`?page=${currentPage}`);
  }, [currentPage]);

  // API CALL
  const [trigger, { isLoading, isError, data, error, isFetching }] =
    useLazyGetAllGroupsQuery();

  useEffect(() => {
    const fetch = async () => {
      await trigger(`${paginationParams}${queryParams}`).unwrap();
    };
    fetch();
  }, [queryParams, paginationParams]);

  const prepareData = data?.docs.map((item) => {
    return {
      _id: item._id,
      groupName: item.groupName,
      examType: item.examType.examType,
      createdAt: item.createdAt,
    };
  });

  const tableTitle = [
    { title: "Group Name", keyName: "groupName" },
    { title: "Exam exam", keyName: "examType" },
    { title: "Created at", keyName: "createdAt", isDate: true },
  ];
  const mockStudentData = prepareData;

  const paginateOptions = data?.paginateOptions;

  const [deleteGroup] = useDeleteGroupMutation();

  const handleDeleteItem = async (id) => {
    const permission = prompt(`are you sure want to delete ?  if yes type "Y"`);
    if (permission && permission.toLowerCase() == "y") {
      await deleteGroup(id).then((res) => {
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
        heading={"Groups"}
        buttonContent={"Add group"}
        route={"/auth/groups/add-group"}
      />
      <FilterCompo
        setSearchItem={setGrouprName}
        setAllFilter={setAllFilter}
        isFilter={true}
        filterExamType={true}
        filterDate={true}
        // filterGroup={true}
        // filterSubject={true}
        setCurrentPage={setCurrentPage}
        // // filterChapter={true}
        // filterPhoneNumber={true}
        // filterRollNumber={true}
      />
      <TableCompo
        tableTitle={tableTitle}
        tableData={mockStudentData}
        paginateOptions={paginateOptions}
        setCurrentPage={setCurrentPage}
        handleDeleteItem={handleDeleteItem}
      />
    </div>
  );
}

export default Group;
