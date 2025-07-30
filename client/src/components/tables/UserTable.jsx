// // const UserTable = ({ users}) => {
// //   const formatDate = (dateString) => {
// //     const date = new Date(dateString);
// //     const day = String(date.getDate()).padStart(2, '0');
// //     const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
// //     const year = date.getFullYear();
// //     return `${day}-${month}-${year}`;
// //   };

// //   return (
// //     <div className="overflow-x-auto shadow rounded">
// //       <table className="min-w-full bg-white">
// //         <thead>
// //           <tr className="bg-gray-100 text-left">
// //             <th className="py-2 px-4">Name</th>
// //             <th className="py-2 px-4">Email</th>
// //             <th className="py-2 px-4">Role</th>
// //             <th className="py-2 px-4">Joined</th>

// //           </tr>
// //         </thead>
// //         <tbody>
// //           {users.length === 0 ? (
// //             <tr>
// //               <td colSpan="4" className="text-center py-4">
// //                 No users found.
// //               </td>
// //             </tr>
// //           ) : (
// //             users.map((user) => (
// //               <tr key={user._id} className="border-b hover:bg-gray-50">
// //                 <td className="py-2 px-4">{user.name}</td>
// //                 <td className="py-2 px-4">{user.email}</td>
// //                 <td className="py-2 px-4 capitalize">{user.role}</td>
// //                 <td className="py-2 px-4">{formatDate(user.createdAt)}</td>
// //               </tr>
// //             ))
// //           )}
// //         </tbody>
// //       </table>


     
// //     </div>
// //   );
// // };

// // export default UserTable;


// import { useDispatch, useSelector } from "react-redux";
// import { updateUserStatus } from "../../features/users/userSlice";
// import { toast } from "react-toastify";

// const UserTable = ({ users }) => {
//   const dispatch = useDispatch();
//   const { user } = useSelector((state) => state.auth); // Assuming auth state contains admin info
  
//   const handleStatusChange = async (userId, isActive) => {
//     let reason = "";
//     if (!isActive) {
//       reason = prompt("Enter reason for deactivation:");
//       if (!reason) return toast.error("Deactivation reason required");
//     }

//     dispatch(updateUserStatus({ userId, isActive, reason }))
//       .unwrap()
//       .then(() => {
//         toast.success(`User ${isActive ? "activated" : "deactivated"} successfully`);
//       })
//       .catch((err) => toast.error(err));
//   };

//   return (
//     <div className="overflow-x-auto">
//       <table className="min-w-full bg-white shadow-md rounded">
//         <thead>
//           <tr className="bg-gray-100">
//             <th className="p-3 text-left">Name</th>
//             <th className="p-3 text-left">Email</th>
//             <th className="p-3 text-left">Role</th>
//             <th className="p-3 text-left">Status</th>
//             {user?.role === "admin" && <th className="p-3 text-left">Actions</th>}
//           </tr>
//         </thead>
//         <tbody>
//           {users?.map((u) => (
//             <tr key={u._id} className="border-b">
//               <td className="p-3">{u.name}</td>
//               <td className="p-3">{u.email}</td>
//               <td className="p-3 capitalize">{u.role}</td>
//               <td className="p-3">
//                 {u.isActive ? (
//                   <span className="text-green-600 font-semibold">Active</span>
//                 ) : (
//                   <div>
//                     <span className="text-red-600 font-semibold">Deactivated</span>
//                     <p className="text-xs text-gray-500">{u.deactivationReason}</p>
//                   </div>
//                 )}
//               </td>
//               {user?.role === "admin" && (
//                 <td className="p-3">
//                   {u.isActive ? (
//                     <button
//                       onClick={() => handleStatusChange(u._id, false)}
//                       className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
//                     >
//                       Deactivate
//                     </button>
//                   ) : (
//                     <button
//                       onClick={() => handleStatusChange(u._id, true)}
//                       className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
//                     >
//                       Activate
//                     </button>
//                   )}
//                 </td>
//               )}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

import { useDispatch } from "react-redux";
import { useState } from "react";
import { updateUserStatus } from "../../features/users/userSlice";
import { toast } from "react-toastify";
import Modal from "../Modal";

const UserTable = ({ users }) => {
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedReason, setSelectedReason] = useState("");

  const handleStatusChange = async (userId, status) => {
    let reason = "";
    if (status === "deactivated") {
      reason = prompt("Enter reason for deactivation:");
      if (!reason) return toast.error("Deactivation reason required");
    }

    dispatch(updateUserStatus({ userId, status, reason }))
      .unwrap()
      .then(() => {
        toast.success(`User ${status === "active" ? "activated" : "deactivated"} successfully`);
      })
      .catch((err) => toast.error(err));
  };

  const openReasonModal = (reason) => {
    setSelectedReason(reason || "No reason provided");
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedReason("");
  };

  return (
    <div className="overflow-x-auto relative">
      <table className="min-w-full bg-white shadow-md rounded">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Email</th>
            <th className="p-3 text-left">Role</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users?.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center py-4">No users found.</td>
            </tr>
          ) : (
            users.map((user) => (
              <tr key={user._id} className="border-b">
                <td className="p-3">{user.name}</td>
                <td className="p-3">{user.email}</td>
                <td className="p-3 capitalize">{user.role}</td>
                <td className="p-3">
                  {user.status === "active" ? (
                    <span className="text-green-600 font-semibold">Activated</span>
                  ) : (
                    <button
                      onClick={() => openReasonModal(user.deactivationReason)}
                      className="text-red-600 font-semibold hover:underline focus:outline-none"
                    >
                      Deactivated
                    </button>
                  )}
                </td>
                <td className="p-3">
                  {user.status === "active" ? (
                    <button
                      onClick={() => handleStatusChange(user._id, "deactivated")}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Deactivate
                    </button>
                  ) : (
                    <button
                      onClick={() => handleStatusChange(user._id, "active")}
                      className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                    >
                      Activate
                    </button>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <Modal isOpen={modalOpen} onClose={closeModal} title="Deactivation Reason">
        <p className="text-gray-700">{selectedReason}</p>
      </Modal>
    </div>
  );
};

export default UserTable;


