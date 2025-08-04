import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers } from "../../../../features/users/userSlice";
import UserTable from "../../../../components/tables/UserTable";
import Pagination from "../../../../components/Pagination";

const AllUsers = () => {
  const dispatch = useDispatch();
  const { users, error, totalPages } = useSelector((state) => state.users);

  const [filters, setFilters] = useState({
    role: "",
    status: "",
    page: 1,
  });

  // Fetch users with filters
  useEffect(() => {
    const delay = setTimeout(() => {
      dispatch(fetchAllUsers({
        page: filters.page,
        search: "",
        role: filters.role,
        status: filters.status,
      }));
    }, 100); // Debounce

    return () => clearTimeout(delay);
  }, [dispatch, filters]);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value, page: 1 });
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setFilters((prev) => ({ ...prev, page: newPage }));
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">All Users</h1>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4 mb-4">
        <select
          name="role"
          className="border px-3 py-2 rounded"
          value={filters.role}
          onChange={handleChange}
        >
          <option value="">All Roles</option>
          <option value="user">User</option>
          <option value="carOwner">Car Owner</option>
        </select>

        <select
          name="status"
          className="border px-3 py-2 rounded"
          value={filters.status}
          onChange={handleChange}
        >
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="inactivate">inactivate</option>
        </select>
      </div>

      {/* User Table & Pagination */}
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <>
          <UserTable users={users} />
          <Pagination
            currentPage={filters.page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
};

export default AllUsers;
