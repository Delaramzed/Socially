import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import type { user } from "../../types/user.types";
import Button from "../ui/Button";

const editProfileSchema = z.object({
  name: z.string().min(1, "Name is required"),
  bio: z.string().max(160, "Bio must be under 160 characters").optional(),
  location: z.string().optional(),
  website: z.string().optional(),
  image: z.any().optional(),
});

type EditProfileFormData = z.infer<typeof editProfileSchema>;

type EditProfileModalProps = {
  user: user;
  isSaving?: boolean;
  onClose: () => void;
  onSave: (data: EditProfileFormData) => void;
};

function EditProfileModal({
  user,
  isSaving = false,
  onClose,
  onSave,
}: EditProfileModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditProfileFormData>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      name: user.name,
      bio: user.bio ?? "",
      location: user.location ?? "",
      website: user.website ?? "",
    },
  });

  const onSubmit = (data: EditProfileFormData) => {
    onSave(data);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="bg-base-100 w-full max-w-md rounded-2xl p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-base-content text-lg font-semibold">
            Edit Profile
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="text-base-content-secondary hover:text-base-content text-xl"
          >
            ×
          </button>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-4 flex flex-col gap-4"
        >
          <div>
            <label className="text-base-content text-sm">Name</label>
            <input
              {...register("name")}
              className="border-base-300 text-base-content focus:border-primary mt-1 w-full rounded-[var(--radius-field)] border bg-transparent p-2 text-sm outline-none"
            />
            {errors.name && (
              <p className="text-error mt-1 text-xs">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="text-base-content text-sm">Bio</label>
            <textarea
              {...register("bio")}
              placeholder="Enter your Bio"
              className="border-base-300 text-base-content placeholder:text-base-content-secondary focus:border-primary mt-1 h-24 w-full resize-none rounded-[var(--radius-field)] border bg-transparent p-2 text-sm outline-none"
            />
            {errors.bio && (
              <p className="text-error mt-1 text-xs">{errors.bio.message}</p>
            )}
          </div>

          <div>
            <label className="text-base-content text-sm">Location</label>
            <input
              {...register("location")}
              placeholder="Where you are at"
              className="border-base-300 text-base-content placeholder:text-base-content-secondary focus:border-primary mt-1 w-full rounded-[var(--radius-field)] border bg-transparent p-2 text-sm outline-none"
            />
          </div>
          <div>
            <label className="text-base-content-secondary text-sm">
              Profile Picture
            </label>
            <input
              type="file"
              {...register("image")}
              className="border-base-300 text-base-content mt-1 w-full rounded-[var(--radius-field)] border p-2 text-sm"
            />
          </div>

          <div>
            <label className="text-base-content text-sm">Website</label>
            <input
              {...register("website")}
              placeholder="Your personal website"
              className="border-base-300 text-base-content placeholder:text-base-content-secondary focus:border-primary mt-1 w-full rounded-[var(--radius-field)] border bg-transparent p-2 text-sm outline-none"
            />
          </div>

          <div className="mt-2 flex justify-end gap-3">
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="sm"
              disabled={isSaving}
              loading={isSaving}
            >
              {isSaving ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProfileModal;
