import React, { useState, useEffect } from "react";
import { doc, getDoc, updateDoc, setDoc } from "firebase/firestore"; // Added setDoc import
import { auth, db, storage } from "../config/firebase";
import {
  updateEmail,
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";

const Account = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    dateOfBirth: "",
  });

  const [photoPreview, setPhotoPreview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // For password change
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  // Load user data from Firestore on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const currentUser = auth.currentUser;
        if (!currentUser) {
          navigate("/authentication/sign-in");
          return;
        }

        const userDocRef = doc(db, "users", currentUser.uid);
        const userDoc = await getDoc(userDocRef);

        // Create user document if it doesn't exist
        if (!userDoc.exists()) {
          console.log("Creating new user document in Firestore...");
          await setDoc(userDocRef, {
            firstName: "",
            lastName: "",
            username: currentUser.displayName || "",
            email: currentUser.email || "",
            dateOfBirth: "",
            createdAt: new Date(),
            // Add default values for any other fields you need
          });
          
          // Fetch the newly created document
          const newUserDoc = await getDoc(userDocRef);
          const userData = newUserDoc.data();
          
          setProfile({
            firstName: userData.firstName || "",
            lastName: userData.lastName || "",
            username: userData.username || "",
            email: currentUser.email || "",
            dateOfBirth: userData.dateOfBirth || "",
          });

          if (userData.photoURL) {
            setPhotoPreview(userData.photoURL);
          }
        } else {
          // Use existing document
          const userData = userDoc.data();
          setProfile({
            firstName: userData.firstName || "",
            lastName: userData.lastName || "",
            username: userData.username || "",
            email: currentUser.email || "",
            dateOfBirth: userData.dateOfBirth || "",
          });

          if (userData.photoURL) {
            setPhotoPreview(userData.photoURL);
          }
        }
        
        setLoading(false);
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError("Failed to load your profile data. Please try again.");
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  // Rest of your component remains unchanged
  
  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle password changes
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Save profile changes to Firestore
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        throw new Error("You must be logged in to update your profile");
      }

      // Update Firestore document
      await updateDoc(doc(db, "users", currentUser.uid), {
        firstName: profile.firstName,
        lastName: profile.lastName,
        username: profile.username,
        dateOfBirth: profile.dateOfBirth,
      });

      // Update email if changed
      if (profile.email !== currentUser.email) {
        await updateEmail(currentUser, profile.email);
      }

      setSuccess("Profile updated successfully!");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      console.error("Error updating profile:", err);

      if (err.code === "auth/requires-recent-login") {
        setError("Please sign out and sign in again to update your email.");
      } else {
        setError("Failed to update profile: " + err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  // Handle password update
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Validate password inputs
      if (passwordData.newPassword !== passwordData.confirmPassword) {
        throw new Error("New passwords do not match");
      }

      if (passwordData.newPassword.length < 8) {
        throw new Error("New password must be at least 8 characters long");
      }

      const currentUser = auth.currentUser;

      // Re-authenticate user before changing password
      const credential = EmailAuthProvider.credential(
        currentUser.email,
        passwordData.currentPassword
      );

      await reauthenticateWithCredential(currentUser, credential);

      // Change password
      await updatePassword(currentUser, passwordData.newPassword);

      setSuccess("Password updated successfully!");
      setShowPasswordModal(false);
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err) {
      console.error("Error updating password:", err);

      if (err.code === "auth/wrong-password") {
        setError("Current password is incorrect");
      } else {
        setError("Failed to update password: " + (err.message || err));
      }
    } finally {
      setLoading(false);
    }
  };

  // Handle profile photo update
  const handlePhotoChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);
    setError("");

    try {
      const currentUser = auth.currentUser;

      // Create a storage reference
      const storageRef = ref(storage, `profile_photos/${currentUser.uid}`);

      // Upload the file
      await uploadBytes(storageRef, file);

      // Get download URL
      const photoURL = await getDownloadURL(storageRef);

      // Update user profile in Firestore
      await updateDoc(doc(db, "users", currentUser.uid), {
        photoURL: photoURL,
      });

      // Update preview
      setPhotoPreview(photoURL);
      setSuccess("Profile photo updated!");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      console.error("Error uploading photo:", err);
      setError("Failed to upload photo: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle sign out
  const handleSignOut = async () => {
    if (window.confirm("Are you sure you want to sign out?")) {
      try {
        await auth.signOut();
        navigate("/authentication/sign-in");
      } catch (err) {
        console.error("Error signing out:", err);
        setError("Failed to sign out: " + err.message);
      }
    }
  };

  // Get profile initials for avatar
  const getProfileInitials = () => {
    if (!profile.firstName && !profile.lastName) return "?";
    return (
      profile.firstName.charAt(0) + profile.lastName.charAt(0)
    ).toUpperCase();
  };

  if (loading && !profile.email) {
    return (
      <div className="min-h-screen bg-gray-100 font-sans flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500 mx-auto"></div>
          <p className="mt-4">Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {/* Error and Success Messages */}
          {error && (
            <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}
          {success && (
            <div className="mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
              {success}
            </div>
          )}

          {/* Profile Information */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center mb-6">
              <div className="flex-shrink-0 mr-4">
                <div className="relative">
                  <div className="h-16 w-16 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center border-2 border-indigo-500">
                    {!photoPreview ? (
                      <span className="text-3xl text-indigo-600">
                        {getProfileInitials()}
                      </span>
                    ) : (
                      <img
                        src={photoPreview}
                        alt="Profile"
                        className="h-16 w-16 object-cover"
                      />
                    )}
                  </div>
                  <label className="absolute bottom-0 right-0 bg-indigo-500 rounded-full p-1 cursor-pointer">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-white"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                    <input
                      type="file"
                      className="hidden"
                      onChange={handlePhotoChange}
                      accept="image/*"
                    />
                  </label>
                </div>
              </div>
              <h2 className="text-xl font-semibold">My Info</h2>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* First Name */}
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    FIRST NAME
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={profile.firstName}
                    onChange={handleChange}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2 border"
                  />
                </div>

                {/* Last Name */}
                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    LAST NAME
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={profile.lastName}
                    onChange={handleChange}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2 border"
                  />
                </div>

                {/* Username */}
                <div>
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    USERNAME
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={profile.username}
                    onChange={handleChange}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2 border"
                  />
                </div>

                {/* Email Address */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    EMAIL ADDRESS
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={profile.email}
                    onChange={handleChange}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2 border"
                  />
                </div>

                {/* Password - Just a button to open the change dialog */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    PASSWORD
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowPasswordModal(true)}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 p-2 border text-left flex justify-between items-center"
                  >
                    <span>••••••••••••</span>
                    <span className="text-indigo-600 text-sm">Change</span>
                  </button>
                </div>

                {/* Date of Birth */}
                <div>
                  <label
                    htmlFor="dateOfBirth"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    DATE OF BIRTH
                  </label>
                  <input
                    type="date"
                    id="dateOfBirth"
                    name="dateOfBirth"
                    value={profile.dateOfBirth}
                    onChange={handleChange}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2 border"
                  />
                </div>
              </div>

              {/* Save Changes button */}
              <div className="mt-8 flex justify-between">
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  SIGN OUT
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 ml-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 3a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V7.414l-5-5H3zM2 4a2 2 0 012-2h7.586a1 1 0 01.707.293l5 5A1 1 0 0118 8v8a2 2 0 01-2 2H4a2 2 0 01-2-2V4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  {loading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>

      {/* Password Change Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-medium mb-4">Change Password</h3>
            <form onSubmit={handlePasswordSubmit}>
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="currentPassword"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Current Password
                  </label>
                  <input
                    type="password"
                    id="currentPassword"
                    name="currentPassword"
                    value={passwordData.currentPassword}
                    onChange={handlePasswordChange}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2 border"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="newPassword"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    New Password
                  </label>
                  <input
                    type="password"
                    id="newPassword"
                    name="newPassword"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2 border"
                    required
                    minLength={8}
                  />
                </div>

                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2 border"
                    required
                  />
                </div>

                {error && <div className="text-red-500 text-sm">{error}</div>}
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowPasswordModal(false);
                    setError("");
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  {loading ? "Updating..." : "Update Password"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Account;