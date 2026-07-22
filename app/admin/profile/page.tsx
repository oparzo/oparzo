"use client";

export default function AdminProfilePage() {
  return (
    <main className="max-w-5xl mx-auto p-10">
      <h1 className="text-5xl font-serif mb-10">
        Admin Profile
      </h1>

      <div className="border rounded-xl p-8 space-y-4">
        <div>
          <label className="block text-sm text-gray-500">
            Name
          </label>
          <input
            className="w-full border rounded-lg p-3 mt-1"
            defaultValue="Administrator"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-500">
            Email
          </label>
          <input
            className="w-full border rounded-lg p-3 mt-1"
            defaultValue="admin@oparzo.com"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-500">
            Phone
          </label>
          <input
            className="w-full border rounded-lg p-3 mt-1"
            placeholder="+8801XXXXXXXXX"
          />
        </div>

        <button className="bg-black text-white px-8 py-3 rounded-lg">
          Save Changes
        </button>
      </div>
    </main>
  );
}
