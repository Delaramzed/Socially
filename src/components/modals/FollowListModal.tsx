import { useNavigate } from "react-router-dom";

type FollowUser = {
  id: string;
  name: string;
  email: string;
  image?: string | null;
};

type FollowListModalProps = {
  title: string;
  users: FollowUser[];
  isLoading: boolean;
  onClose: () => void;
};

function FollowListModal({
  title,
  users,
  isLoading,
  onClose,
}: FollowListModalProps) {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-4">
      <div className="bg-base-100 w-full max-w-md rounded-2xl p-5 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">{title}</h2>

          <button
            type="button"
            onClick={onClose}
            className="text-base-content-secondary cursor-pointer text-xl"
          >
            ×
          </button>
        </div>

        {isLoading ? (
          <p className="text-base-content-secondary py-6 text-center">
            Loading...
          </p>
        ) : users.length === 0 ? (
          <p className="text-base-content-secondary py-6 text-center">
            No users found.
          </p>
        ) : (
          <div className="flex max-h-80 flex-col overflow-y-auto">
            {users.map((user) => (
              <button
                key={user.id}
                type="button"
                onClick={() => {
                  onClose();
                  navigate(`/profile/${user.id}`);
                }}
                className="hover:bg-base-200 flex cursor-pointer items-center gap-3 rounded-lg p-3 text-left"
              >
                {user.image ? (
                  <img
                    src={user.image}
                    alt={user.name}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="bg-primary text-primary-content flex h-10 w-10 items-center justify-center rounded-full font-semibold">
                    {user.name?.charAt(0).toUpperCase() || "U"}
                  </div>
                )}

                <div>
                  <p className="font-medium">{user.name}</p>
                  <p className="text-base-content-secondary text-sm">
                    {user.email}
                  </p>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default FollowListModal;