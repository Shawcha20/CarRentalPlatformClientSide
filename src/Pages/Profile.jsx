import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';
import { showSuccess, showError } from '../utils/notifications';
import { Edit2, Save, X, Eye, EyeOff, Camera } from 'lucide-react';
import { getAuth, updateProfile, updateEmail, updatePassword } from 'firebase/auth';

export default function Profile() {
  const { user } = useAuth();
  const auth = getAuth();
  const [isEditMode, setIsEditMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    displayName: user?.displayName || '',
    email: user?.email || '',
    phone: localStorage.getItem('userPhone') || '',
    address: localStorage.getItem('userAddress') || '',
    city: localStorage.getItem('userCity') || '',
    zipCode: localStorage.getItem('userZipCode') || '',
    bio: localStorage.getItem('userBio') || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleUpdateProfile = async () => {
    setIsLoading(true);
    try {
      if (!auth.currentUser) {
        showError('User not authenticated');
        return;
      }

      // Update display name and photo URL
      if (formData.displayName !== user?.displayName) {
        await updateProfile(auth.currentUser, {
          displayName: formData.displayName
        });
      }

      // Update email if changed
      if (formData.email !== user?.email) {
        await updateEmail(auth.currentUser, formData.email);
      }

      // Update password if provided
      if (formData.newPassword) {
        if (formData.newPassword !== formData.confirmPassword) {
          showError('Passwords do not match');
          setIsLoading(false);
          return;
        }
        await updatePassword(auth.currentUser, formData.newPassword);
        setFormData({
          ...formData,
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
      }

      // Save additional info to localStorage
      localStorage.setItem('userPhone', formData.phone);
      localStorage.setItem('userAddress', formData.address);
      localStorage.setItem('userCity', formData.city);
      localStorage.setItem('userZipCode', formData.zipCode);
      localStorage.setItem('userBio', formData.bio);

      showSuccess('Profile updated successfully!');
      setIsEditMode(false);
    } catch (error) {
      console.error('Update error:', error);
      showError(error.message || 'Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      displayName: user?.displayName || '',
      email: user?.email || '',
      phone: localStorage.getItem('userPhone') || '',
      address: localStorage.getItem('userAddress') || '',
      city: localStorage.getItem('userCity') || '',
      zipCode: localStorage.getItem('userZipCode') || '',
      bio: localStorage.getItem('userBio') || '',
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
    setIsEditMode(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10 flex items-center justify-between"
        >
          <div>
            <h1 className="text-4xl font-bold text-gray-800">
              My <span className="text-primary">Profile</span>
            </h1>
            <p className="text-gray-600 mt-2">
              Manage your account information and preferences
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => (isEditMode ? handleCancel() : setIsEditMode(true))}
            className={`px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-all ${
              isEditMode
                ? 'bg-gray-300 text-gray-700 hover:bg-gray-400'
                : 'bg-primary text-white hover:bg-primary/90'
            }`}
          >
            {isEditMode ? (
              <>
                <X size={20} /> Cancel
              </>
            ) : (
              <>
                <Edit2 size={20} /> Edit Profile
              </>
            )}
          </motion.button>
        </motion.div>

        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden"
        >
          {/* Profile Header with Avatar */}
          <div className="h-32 bg-gradient-to-r from-primary/10 to-primary/5"></div>

          <div className="px-6 md:px-10 pb-10">
            {/* Avatar Section */}
            <div className="flex flex-col md:flex-row md:items-end gap-6 -mt-16 mb-10 relative z-10">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="relative"
              >
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center border-4 border-white shadow-lg overflow-hidden"
                >
                  {user?.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt={user.displayName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-5xl font-bold text-white">
                      {user?.displayName?.charAt(0).toUpperCase() ||
                        user?.email?.charAt(0).toUpperCase() ||
                        'U'}
                    </span>
                  )}
                </div>
                {isEditMode && (
                  <button className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full hover:bg-primary/90 transition">
                    <Camera size={20} />
                  </button>
                )}
              </motion.div>

              <div className="flex-1">
                <h2 className="text-3xl font-bold text-gray-800">
                  {formData.displayName || 'User'}
                </h2>
                <p className="text-gray-600">{formData.email}</p>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200 my-8"></div>

            {/* Form Sections */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Personal Information */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
              >
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <span className="w-1 h-6 bg-primary rounded"></span>
                  Personal Information
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="displayName"
                      value={formData.displayName}
                      onChange={handleInputChange}
                      disabled={!isEditMode}
                      className={`w-full px-4 py-2 rounded-lg border transition-all ${
                        isEditMode
                          ? 'border-primary bg-white focus:ring-2 focus:ring-primary focus:outline-none'
                          : 'border-gray-300 bg-gray-50 cursor-not-allowed'
                      }`}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      disabled={!isEditMode}
                      className={`w-full px-4 py-2 rounded-lg border transition-all ${
                        isEditMode
                          ? 'border-primary bg-white focus:ring-2 focus:ring-primary focus:outline-none'
                          : 'border-gray-300 bg-gray-50 cursor-not-allowed'
                      }`}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      disabled={!isEditMode}
                      placeholder="+1 (555) 123-4567"
                      className={`w-full px-4 py-2 rounded-lg border transition-all ${
                        isEditMode
                          ? 'border-primary bg-white focus:ring-2 focus:ring-primary focus:outline-none'
                          : 'border-gray-300 bg-gray-50 cursor-not-allowed'
                      }`}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Bio
                    </label>
                    <textarea
                      name="bio"
                      value={formData.bio}
                      onChange={handleInputChange}
                      disabled={!isEditMode}
                      placeholder="Tell us about yourself..."
                      rows="3"
                      className={`w-full px-4 py-2 rounded-lg border transition-all resize-none ${
                        isEditMode
                          ? 'border-primary bg-white focus:ring-2 focus:ring-primary focus:outline-none'
                          : 'border-gray-300 bg-gray-50 cursor-not-allowed'
                      }`}
                    ></textarea>
                  </div>
                </div>
              </motion.div>

              {/* Address Information */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.4 }}
              >
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <span className="w-1 h-6 bg-primary rounded"></span>
                  Address Information
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Street Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      disabled={!isEditMode}
                      placeholder="123 Main St"
                      className={`w-full px-4 py-2 rounded-lg border transition-all ${
                        isEditMode
                          ? 'border-primary bg-white focus:ring-2 focus:ring-primary focus:outline-none'
                          : 'border-gray-300 bg-gray-50 cursor-not-allowed'
                      }`}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      disabled={!isEditMode}
                      placeholder="New York"
                      className={`w-full px-4 py-2 rounded-lg border transition-all ${
                        isEditMode
                          ? 'border-primary bg-white focus:ring-2 focus:ring-primary focus:outline-none'
                          : 'border-gray-300 bg-gray-50 cursor-not-allowed'
                      }`}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Zip Code
                    </label>
                    <input
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      disabled={!isEditMode}
                      placeholder="10001"
                      className={`w-full px-4 py-2 rounded-lg border transition-all ${
                        isEditMode
                          ? 'border-primary bg-white focus:ring-2 focus:ring-primary focus:outline-none'
                          : 'border-gray-300 bg-gray-50 cursor-not-allowed'
                      }`}
                    />
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Password Change Section */}
            {isEditMode && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.5 }}
                className="border-t border-gray-200 mt-8 pt-8"
              >
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <span className="w-1 h-6 bg-primary rounded"></span>
                  Change Password
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Current Password
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          name="currentPassword"
                          value={formData.currentPassword}
                          onChange={handleInputChange}
                          placeholder="••••••••"
                          className="w-full px-4 py-2 rounded-lg border border-primary bg-white focus:ring-2 focus:ring-primary focus:outline-none pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-primary transition"
                        >
                          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        New Password
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          name="newPassword"
                          value={formData.newPassword}
                          onChange={handleInputChange}
                          placeholder="••••••••"
                          className="w-full px-4 py-2 rounded-lg border border-primary bg-white focus:ring-2 focus:ring-primary focus:outline-none pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-primary transition"
                        >
                          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Confirm Password
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          placeholder="••••••••"
                          className="w-full px-4 py-2 rounded-lg border border-primary bg-white focus:ring-2 focus:ring-primary focus:outline-none pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-primary transition"
                        >
                          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Action Buttons */}
            {isEditMode && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.6 }}
                className="flex gap-4 mt-10 pt-8 border-t border-gray-200"
              >
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleUpdateProfile}
                  disabled={isLoading}
                  className="flex-1 px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <Save size={20} />
                  {isLoading ? 'Saving...' : 'Save Changes'}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleCancel}
                  className="flex-1 px-6 py-3 bg-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-400 transition"
                >
                  Cancel
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Info Message */}
        {!isEditMode && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.5 }}
            className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg"
          >
            <p className="text-blue-700 text-sm">
              💡 Click the "Edit Profile" button to update your information
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
