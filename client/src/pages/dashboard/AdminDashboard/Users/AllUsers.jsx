import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers } from "../../../../features/users/userSlice";
import UserTable from "../../../../components/tables/UserTable";
import Pagination from "../../../../components/Pagination";
const AllUsers = () => {
  const dispatch = useDispatch();
  const { users, error, totalPages,currentPage } = useSelector((state) => state.users);

  const [role, setRole] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    // Passing search as empty string, since it's removed from this folder only
    dispatch(fetchAllUsers({ page, search: "", role }));
  }, [dispatch, page, role]);

  
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };
  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">All Users</h1>

      <div className="flex flex-wrap items-center gap-4 mb-4">
        <select
          className="border px-3 py-2 rounded"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="">All Roles</option>
          <option value="user">User</option>
          <option value="carOwner">Car Owner</option>
        </select>
      </div>

      {error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <>
        <UserTable users={users} />
        <Pagination
         currentPage={page}
  totalPages={totalPages}
  onPageChange={handlePageChange} 
  />
        </>
      )}
    </div>
  );
};

export default AllUsers;
