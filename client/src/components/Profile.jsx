import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfile, updateProfile } from "../features/users/userSlice";
import { toast } from "react-toastify";
import Button from "./Button";
import { RenderInput } from "./FormElement";

const Profile = () => {
  const dispatch = useDispatch();
  const { user, loading, error, updateSuccess } = useSelector(
    (state) => state.users
  );

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    country: "",
  });

  const [originalData, setOriginalData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      const updatedData = {
        name: user.name || "",
        email: user.email || "",
        phoneNumber: user.phoneNumber || "",
        country: user.country || "",
      };
      setFormData(updatedData);
      setOriginalData(updatedData);
    }
  }, [user]);

  useEffect(() => {
    if (updateSuccess && hasSubmitted) {
      toast.success("Profile updated successfully!");
      setIsEditing(false);
      setHasSubmitted(false);
    }
  }, [updateSuccess, hasSubmitted]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const isFormChanged = () => {
    return (
      formData.name !== originalData.name ||
      formData.phoneNumber !== originalData.phoneNumber ||
      formData.country !== originalData.country
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormChanged()) {
      setHasSubmitted(false);
      return;
    }

    setHasSubmitted(true);
    dispatch(updateProfile(formData));
  };

  if (error) {
    return (
      <div className="text-red-600 font-medium p-4 bg-red-100 rounded">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto bg-white shadow-md p-6 rounded-lg mt-10">
      <h2 className="text-2xl font-semibold text-center mb-6">My Profile</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <RenderInput
          name="name"
          label="Name"
          value={formData.name}
          onChange={handleChange}
          type="text"
          readOnly={!isEditing}
          className={`${
            isEditing ? "bg-white border-gray-400" : "bg-gray-100 border-gray-300"
          }`}
        />

        {/* Email (always readonly) */}
        <RenderInput
          name="email"
          label="Email"
          value={formData.email}
          onChange={handleChange}
          type="email"
          readOnly={true}
          className="bg-gray-100 border-gray-300"
        />

        {/* Phone Number */}
        <RenderInput
          name="phoneNumber"
          label="Phone Number"
          value={formData.phoneNumber}
          onChange={handleChange}
          type="text"
          readOnly={!isEditing}
          className={`${
            isEditing ? "bg-white border-gray-400" : "bg-gray-100 border-gray-300"
          }`}
        />

        {/* Country */}
        <RenderInput
          name="country"
          label="Country"
          value={formData.country}
          onChange={handleChange}
          type="text"
          readOnly={!isEditing}
          className={`${
            isEditing ? "bg-white border-gray-400" : "bg-gray-100 border-gray-300"
          }`}
        />

        {/* Buttons */}
        <div className="flex items-center justify-between mt-6">
          {!isEditing ? (
            <Button
              type="button"
              onClick={() => setIsEditing(true)}
              colorClass="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Edit Profile
            </Button>
          ) : (
            <>
              <Button
                type="submit"
                loading={loading}
                colorClass="bg-green-600 hover:bg-green-700 text-white"
              >
                Save Changes
              </Button>
              <Button
                type="button"
                onClick={() => {
                  setIsEditing(false);
                  setFormData(originalData);
                }}
                className="ml-2"
                colorClass="bg-gray-500 hover:bg-gray-600 text-white"
              >
                Cancel
              </Button>
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default Profile;
