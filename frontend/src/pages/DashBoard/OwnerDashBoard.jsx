import { useState, useEffect } from "react";
import api from "../../services/api";
import { Store, Star, Loader2, Users } from "lucide-react";

const OwnerDashboard = () => {
  const [store, setStore] = useState(null);
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [creatingStore, setCreatingStore] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
  });

  // Fetch the owner's store and its ratings.
  useEffect(() => {
    const fetchOwnerData = async () => {
      try {
        const storeRes = await api.get("/owner/my-store");

        if (storeRes.data.success) {
          setStore(storeRes.data.data);
        }

        // Only fetch ratings if the owner already has a store.
        if (storeRes.data.data) {
          const ratingsRes = await api.get("/owner/ratings");

          if (ratingsRes.data.success) {
            setRatings(ratingsRes.data.data);
          }
        }
      } catch (error) {
        console.error("Failed to fetch owner data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOwnerData();
  }, []);

  // Update form fields.
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Create the owner's store.
  const handleCreateStore = async (e) => {
    e.preventDefault();

    setCreatingStore(true);

    try {
      const response = await api.post("/owner/my-store", formData);
      console.log("My store response:", response.data);

      if (response.data.success) {
        setStore(response.data.data);

        // Clear the form after successful creation.
        setFormData({
          name: "",
          email: "",
          address: "",
        });
      }
    } catch (error) {
      console.error("Failed to create store:", error);

      alert(error.response?.data?.message || "Failed to create store");
    } finally {
      setCreatingStore(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="animate-spin text-neutral-400" size={28} />
      </div>
    );
  }

  // Owner does not have a store yet.
  if (!store) {
    return (
      <div className="mx-auto max-w-2xl">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold tracking-tight text-neutral-900">
            Set Up Your Store
          </h2>

          <p className="mt-1.5 text-sm text-neutral-500">
            Create your store to start receiving ratings from customers.
          </p>
        </div>

        <div className="rounded-xl border border-neutral-200 bg-white p-6">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-neutral-900 text-white">
              <Store size={20} />
            </div>

            <div>
              <h3 className="text-sm font-semibold text-neutral-900">
                Store Information
              </h3>

              <p className="text-xs text-neutral-500">
                You can create one store for your account.
              </p>
            </div>
          </div>

          <form onSubmit={handleCreateStore} className="space-y-5">
            {/* Store name */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-neutral-700">
                Store Name
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter store name"
                required
                className="w-full rounded-lg border border-neutral-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-black focus:ring-1 focus:ring-black"
              />
            </div>

            {/* Store email */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-neutral-700">
                Store Email
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter store email"
                className="w-full rounded-lg border border-neutral-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-black focus:ring-1 focus:ring-black"
              />
            </div>

            {/* Store address */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-neutral-700">
                Store Address
              </label>

              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter store address"
                rows={4}
                required
                className="w-full resize-none rounded-lg border border-neutral-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-black focus:ring-1 focus:ring-black"
              />
            </div>

            <button
              type="submit"
              disabled={creatingStore}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-neutral-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {creatingStore ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Creating Store...
                </>
              ) : (
                "Create Store"
              )}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Owner already has a store.
  return (
    <div className="mx-auto max-w-7xl">
      {/* Page header */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold tracking-tight text-neutral-900">
          {store.name}
        </h2>

        <p className="mt-1.5 text-sm text-neutral-500">
          Store performance and recent activity.
        </p>
      </div>

      {/* Store statistics */}
      <div className="mb-5 grid grid-cols-1 gap-5 md:grid-cols-2">
        {/* Average rating */}
        <div className="flex items-center gap-4 rounded-xl border border-neutral-200 bg-white p-5">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-neutral-900 text-white">
            <Star size={20} />
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-neutral-500">
              Average rating
            </p>

            <p className="mt-1 text-2xl font-semibold tracking-tight text-neutral-900 tabular-nums">
              {Number(store.average_rating) > 0
                ? Number(store.average_rating).toFixed(2)
                : "N/A"}
            </p>
          </div>
        </div>

        {/* Total reviews */}
        <div className="flex items-center gap-4 rounded-xl border border-neutral-200 bg-white p-5">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-neutral-900 text-white">
            <Users size={20} />
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-neutral-500">
              Total reviews
            </p>

            <p className="mt-1 text-2xl font-semibold tracking-tight text-neutral-900 tabular-nums">
              {ratings.length}
            </p>
          </div>
        </div>
      </div>

      {/* Recent ratings */}
      <div className="rounded-xl border border-neutral-200 bg-white">
        <div className="flex items-center gap-2 border-b border-neutral-100 px-5 py-4">
          <Star size={16} className="text-neutral-900" />

          <h3 className="text-sm font-semibold tracking-tight text-neutral-900">
            Recent Ratings
          </h3>
        </div>

        {ratings.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <Star size={28} className="mx-auto mb-3 text-neutral-300" />

            <p className="text-sm text-neutral-500">
              No ratings yet. Reviews will appear here once customers start
              rating your store.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-neutral-100">
                  <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-neutral-500">
                    User
                  </th>

                  <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-neutral-500">
                    Rating
                  </th>

                  <th className="px-5 py-3 text-right text-xs font-medium uppercase tracking-wider text-neutral-500">
                    Date
                  </th>
                </tr>
              </thead>

              <tbody>
                {ratings.map((rating) => (
                  <tr
                    key={rating.id}
                    className="border-b border-neutral-100 last:border-b-0"
                  >
                    <td className="px-5 py-3.5 font-medium text-neutral-900">
                      {rating.user_name}
                    </td>

                    <td className="px-5 py-3.5">
                      <span className="inline-flex items-center gap-1 rounded-full bg-neutral-900 px-2.5 py-1 text-xs font-medium text-white">
                        {rating.rating}
                        <Star size={10} className="fill-current" />
                      </span>
                    </td>

                    <td className="px-5 py-3.5 text-right text-neutral-500">
                      {new Date(rating.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default OwnerDashboard;
