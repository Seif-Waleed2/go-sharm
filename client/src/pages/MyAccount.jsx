import { useState } from 'react';
import toast from 'react-hot-toast';
import { User } from 'lucide-react';
import ProfileLayout from '../components/ProfileLayout';
import { useAuth } from '../context/AuthContext';
import { updateProfile as updateProfileApi } from '../api/auth';

export default function MyAccount() {
  const { user, updateLocalUser } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState(false);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await updateProfileApi({ name });
      updateLocalUser(res.data.user);
      toast.success('Profile updated');
      setEditing(false);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Unable to update profile');
    } finally {
      setSaving(false);
    }
  };

  return (
    <ProfileLayout>
      <h1 className="mb-6 text-3xl font-extrabold text-slate-900 dark:text-white">My Account</h1>

      <div className="max-w-lg rounded-2xl border border-slate-200 p-6 dark:border-slate-800">
        <div className="mb-6 flex items-center gap-4">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-600 text-white">
            <User size={28} />
          </span>
          <div>
            <p className="text-lg font-semibold text-slate-900 dark:text-white">{user?.name}</p>
            <p className="text-sm text-slate-500">{user?.email}</p>
          </div>
        </div>

        {editing ? (
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-600 dark:text-slate-300">
                Full Name
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input-field"
              />
            </div>
            <div className="flex gap-3">
              <button type="submit" disabled={saving} className="btn-primary">
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
              <button
                type="button"
                onClick={() => setEditing(false)}
                className="rounded-full border border-slate-200 px-6 py-3 text-sm font-semibold dark:border-slate-700"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <button type="button" onClick={() => setEditing(true)} className="btn-primary">
            Edit Profile
          </button>
        )}
      </div>
    </ProfileLayout>
  );
}
