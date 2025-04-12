import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";

const MyProfile = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(false);
  const { token, backendUrl, userData, setUserData, loadUserProfileData } =
    useContext(AppContext);

  const updateUserProfileData = async () => {
    try {
      const formData = new FormData();
      formData.append("name", userData.name);
      formData.append("phone", userData.phone);
      formData.append("address", JSON.stringify(userData.address));
      formData.append("gender", userData.gender);
      formData.append("dob", userData.dob);
      image && formData.append("image", image);

      const { data } = await axios.post(
        backendUrl + "/api/user/update-profile",
        formData,
        { headers: { token } },
      );

      if (data.success) {
        toast.success(data.message);
        await loadUserProfileData();
        setIsEdit(false);
        setImage(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return userData ? (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow-md">
      <div className="flex flex-col items-center gap-4">
        {/* Profile Image Section */}
        <label htmlFor="image" className="cursor-pointer relative">
          <div className="relative w-28 h-28">
            <img
              className="w-28 h-28 object-cover rounded-full shadow-md border-4 border-gray-300 hover:shadow-lg transition-all"
              src={image ? URL.createObjectURL(image) : userData.image}
              alt=""
            />
            {isEdit && (
              <img
                className="w-8 absolute bottom-0 right-0 transform translate-x-1/2 translate-y-1/2"
                src={assets.upload_icon}
                alt=""
              />
            )}
          </div>
          {isEdit && (
            <input
              onChange={(e) => setImage(e.target.files[0])}
              type="file"
              id="image"
              hidden
            />
          )}
        </label>

        {/* Name Section */}
        {isEdit ? (
          <input
            className="text-center text-2xl font-semibold bg-gray-100 border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-400"
            type="text"
            onChange={(e) =>
              setUserData((prev) => ({ ...prev, name: e.target.value }))
            }
            value={userData.name}
          />
        ) : (
          <p className="text-2xl font-semibold text-gray-800">
            {userData.name}
          </p>
        )}

        <hr className="w-full border-t border-gray-200" />

        {/* Contact Information */}
        <div className="w-full">
          <p className="text-lg font-semibold text-gray-700">
            Contact Information
          </p>
          <div className="mt-3 text-gray-700">
            <p>
              <span className="font-medium">Email:</span>{" "}
              <span className="text-blue-600">{userData.email}</span>
            </p>
            <p className="mt-2 font-medium">Phone:</p>
            {isEdit ? (
              <input
                className="w-full bg-gray-100 border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-400"
                type="text"
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, phone: e.target.value }))
                }
                value={userData.phone}
              />
            ) : (
              <p className="text-gray-700">{userData.phone}</p>
            )}
          </div>
        </div>

        {/* Address */}
        <div className="w-full">
          <p className="text-lg font-semibold text-gray-700">Address</p>
          {isEdit ? (
            <>
              <input
                className="w-full mb-2 bg-gray-100 border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-400"
                type="text"
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    address: { ...prev.address, line1: e.target.value },
                  }))
                }
                value={userData.address.line1}
              />
              <input
                className="w-full bg-gray-100 border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-400"
                type="text"
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    address: { ...prev.address, line2: e.target.value },
                  }))
                }
                value={userData.address.line2}
              />
            </>
          ) : (
            <p className="text-gray-700">
              {userData.address.line1}
              <br />
              {userData.address.line2}
            </p>
          )}
        </div>

        {/* Basic Information */}
        <div className="w-full">
          <p className="text-lg font-semibold text-gray-700">
            Basic Information
          </p>
          <div className="mt-3 text-gray-700">
            <p className="font-medium">Gender:</p>
            {isEdit ? (
              <select
                className="w-full bg-gray-100 border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-400"
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, gender: e.target.value }))
                }
                value={userData.gender}
              >
                <option value="Not Selected">Not Selected</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            ) : (
              <p className="text-gray-700">{userData.gender}</p>
            )}
            <p className="mt-2 font-medium">Birthday:</p>
            {isEdit ? (
              <input
                className="w-full bg-gray-100 border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-400"
                type="date"
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, dob: e.target.value }))
                }
                value={userData.dob}
              />
            ) : (
              <p className="text-gray-700">{userData.dob}</p>
            )}
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-6">
          {isEdit ? (
            <button
              onClick={updateUserProfileData}
              className="bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600 transition-all"
            >
              Save Changes
            </button>
          ) : (
            <button
              onClick={() => setIsEdit(true)}
              className="bg-gray-200 text-gray-800 px-5 py-2 rounded-lg hover:bg-gray-300 transition-all"
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  ) : null;
};

export default MyProfile;
