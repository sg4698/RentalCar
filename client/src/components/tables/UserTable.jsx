const UserTable = ({ users}) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <div className="overflow-x-auto shadow rounded">
      <table className="min-w-full bg-white">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="py-2 px-4">Name</th>
            <th className="py-2 px-4">Email</th>
            <th className="py-2 px-4">Role</th>
            <th className="py-2 px-4">Joined</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center py-4">
                No users found.
              </td>
            </tr>
          ) : (
            users.map((user) => (
              <tr key={user._id} className="border-b hover:bg-gray-50">
                <td className="py-2 px-4">{user.name}</td>
                <td className="py-2 px-4">{user.email}</td>
                <td className="py-2 px-4 capitalize">{user.role}</td>
                <td className="py-2 px-4">{formatDate(user.createdAt)}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>


     
    </div>
  );
};

export default UserTable;
