/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { type Post } from "@/app/tests/posts/page";
import { createPost } from "@/actions/actions";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function PostForm() {
  const router = useRouter();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Post>>({
    title: "",
    content: "",
    image: null as File | null | undefined,
    published: false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFormData((prev) => ({ ...prev, image: e.target.files![0] }));
      setImagePreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const actionForm = async (form: FormData) => {
    const auth_email = form.get("email") as string;
    const { post } = await createPost(formData, auth_email);
    if (!post) {
      toast.error("Post create failed!");
      return;
    }
    setImagePreview(null);
    setFormData({} as Post);
    toast.success(`Post created successfully! -- ${post.title}`);
    router.push("/tests/posts");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 py-10">
      <form
        //
        action={actionForm}
        className="w-full max-w-lg bg-white shadow-lg rounded-2xl p-6 space-y-4"
      >
        <h2 className="text-2xl font-bold text-gray-800">Create New Post</h2>

        {/* auth email */}

        {/* default email added  */}
        <input type="hidden" name="email" value={"chan@123"} />

        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter post title"
            className="w-full !text-green-400 rounded-xl border border-gray-300 p-2 focus:ring-2 focus:ring-indigo-500 outline-none"
            required
          />
        </div>

        {/* Content */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Content
          </label>
          <textarea
            name="content"
            value={formData.content || ""}
            onChange={handleChange}
            placeholder="Write your post content..."
            rows={4}
            className="w-full !text-green-400 rounded-xl border border-gray-300 p-2 focus:ring-2 focus:ring-indigo-500 outline-none"
          ></textarea>
        </div>

        {/* Image */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Upload Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full text-sm text-gray-500 file:mr-4 file:rounded-lg file:border-0 file:bg-indigo-50 file:px-4 file:py-2 file:text-indigo-600 hover:file:bg-indigo-100"
          />
        </div>

        {imagePreview && (
          <>
            <img
              src={imagePreview}
              alt="preview-img"
              className=" w-full object-center rounded-3xl"
            />
          </>
        )}

        {/* Published */}
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="published"
            checked={formData.published as boolean}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, published: e.target.checked }))
            }
            className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
          />
          <label className="text-sm text-gray-700">Published</label>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-xl shadow"
        >
          Create Post
        </button>
      </form>
    </div>
  );
}
