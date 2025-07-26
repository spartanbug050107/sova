import { React, useState } from 'react';
import useAuthUser from '../hooks/useAuthUser';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { completeSetup } from '../lib/api';
import toast from 'react-hot-toast';
import {
  LoaderIcon,
  MapPinIcon,
  ShipWheelIcon,
  ShuffleIcon,
  CameraIcon,
} from 'lucide-react';
import { motion } from 'framer-motion';

const SetupPage = () => {
  const { authUser } = useAuthUser();
  const queryClient = useQueryClient();

  const [formState, setFormState] = useState({
    fullname: authUser?.fullname || '',
    bio: authUser?.bio || '',
    nativeLanguage: authUser?.nativeLanguage || '',
    learningLanguage: authUser?.learningLanguage || '',
    location: authUser?.location || '',
    profilePic: authUser?.profilePic || '',
  });

  const { mutate: setupMutation, isPending } = useMutation({
    mutationFn: completeSetup,
    onSuccess: () => {
      toast.success('Profile setup is completed');
      queryClient.invalidateQueries({ queryKey: ['authUser'] });
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setupMutation(formState);
  };

  const handleGenAvatar = () => {
    const index = Math.floor(Math.random() * 100) + 1;
    const randomAvatar = `https://avatar.iran.liara.run/public/${index}.png`;

    setFormState({ ...formState, profilePic: randomAvatar });
    toast.success('Random profile picture generated!');
  };

  const languages = [
    'English', 'Spanish', 'French', 'German', 'Mandarin',
    'Japanese', 'Korean', 'Hindi', 'Russian', 'Portuguese', 'Italian'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="border border-cyan-400/20 flex flex-col lg:flex-row w-full max-w-5xl mx-auto backdrop-blur-md rounded-xl shadow-xl overflow-hidden"
      >
        <div className="card-body px-6 sm:px-10 py-8 text-white">
          <h1 className="text-4xl font-bold text-center text-cyan-400 mb-8">🚀 Complete Your Profile</h1>

          <form onSubmit={handleSubmit} className="space-y-8">

            {/* Avatar */}
            <div className="flex flex-col items-center space-y-4">
              <div className="size-32 rounded-full overflow-hidden border-4 border-cyan-400 shadow-md hover:scale-105 transition-transform duration-300">
                {formState.profilePic ? (
                  <img
                    src={formState.profilePic}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-800">
                    <CameraIcon className="size-12 text-cyan-300" />
                  </div>
                )}
              </div>
              <button type="button" className="btn btn-sm bg-cyan-600 hover:bg-cyan-500 text-white font-semibold rounded-md transition-all" onClick={handleGenAvatar}>
                <ShuffleIcon className="size-4 mr-2" />
                Generate Avatar
              </button>
            </div>

            {/* Full Name */}
            <div className="form-control">
              <label className="label font-semibold text-cyan-300">Full Name</label>
              <input
                type="text"
                name="fullname"
                value={formState.fullname}
                onChange={(e) => setFormState({ ...formState, fullname: e.target.value })}
                className="input w-full rounded-xl bg-gray-800 border border-cyan-700 text-white placeholder-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all"
                placeholder="Enter your full name"
              />
            </div>

            {/* Bio */}
            <div className="form-control">
              <label className="label font-semibold text-purple-300">Bio</label>
              <textarea
                name="bio"
                value={formState.bio}
                onChange={(e) => setFormState({ ...formState, bio: e.target.value })}
                className="textarea h-28 rounded-xl bg-gray-800 border border-purple-700 text-white placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                placeholder="Tell us about yourself..."
              />
            </div>

            {/* Languages */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-control">
                <label className="label font-semibold text-blue-300">Native Language</label>
                <select
                  name="nativeLanguage"
                  value={formState.nativeLanguage}
                  onChange={(e) => setFormState({ ...formState, nativeLanguage: e.target.value })}
                  className="select rounded-xl bg-gray-800 border border-blue-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Choose native language</option>
                  {languages.map((lang) => (
                    <option key={`native-${lang}`} value={lang.toLowerCase()}>
                      {lang}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-control">
                <label className="label font-semibold text-pink-300">Learning Language</label>
                <select
                  name="learningLanguage"
                  value={formState.learningLanguage}
                  onChange={(e) => setFormState({ ...formState, learningLanguage: e.target.value })}
                  className="select rounded-xl bg-gray-800 border border-pink-700 text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                >
                  <option value="">Choose language to learn</option>
                  {languages.map((lang) => (
                    <option key={`learning-${lang}`} value={lang.toLowerCase()}>
                      {lang}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Location */}
            <div className="form-control relative">
              <label className="label font-semibold text-green-300">Location</label>
              <MapPinIcon className="absolute left-3 top-11 text-green-400 size-5" />
              <input
                type="text"
                name="location"
                value={formState.location}
                onChange={(e) => setFormState({ ...formState, location: e.target.value })}
                className="input pl-10 rounded-xl bg-gray-800 border border-green-700 text-white placeholder-green-400 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all"
                placeholder="City, Country"
              />
            </div>

            {/* Submit Button */}
            <button
              className="btn bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white w-full text-lg tracking-wide gap-2 shadow-lg rounded-xl transition-transform duration-300 hover:scale-[1.02]"
              disabled={isPending}
              type="submit"
            >
              {!isPending ? (
                <>
                  <ShipWheelIcon className="size-5" />
                  Finish Profile
                </>
              ) : (
                <>
                  <LoaderIcon className="animate-spin size-5" />
                  Completing Setup...
                </>
              )}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default SetupPage;
