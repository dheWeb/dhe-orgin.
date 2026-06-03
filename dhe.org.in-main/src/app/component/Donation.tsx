"use client";
import { useState, ChangeEvent, FormEvent } from "react";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/app/firebase";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/app/firebase";
import toast from "react-hot-toast";

interface DonationData {
  name: string;
  email: string;
  PhoneNumber: string;
  Amount: string;
}

const Donation = () => {
  const initialFormData: DonationData = {
    name: "",
    email: "",
    PhoneNumber: "",
    Amount: "",
  };

  const [formData, setFormData] = useState<DonationData>(initialFormData);
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedImage = e.target.files?.[0];
    if (selectedImage) {
      setImage(selectedImage);
    }
  };

  const handleAddDocument = async (downloadURL: string | null) => {
    try {
      const docRef = await addDoc(collection(db, "Donation"), {
        ...formData,
        Attachments: downloadURL || "", 
      });
      console.log("Document added with ID:", docRef.id);
      setLoading(false);
      setFormData(initialFormData);
      toast.success(
        "Thank you for your generous donation! Your support means a lot to us."
      );
    } catch (error) {
      setLoading(false);
      toast.error("Something broke while processing your donation");
      console.error("Error adding document:", error);
    }
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);

    try {
      // Validate form data
      if (
        !formData.name ||
        !formData.email ||
        !formData.PhoneNumber ||
        !formData.Amount
      ) {
        throw new Error("Please fill in all required fields.");
      }

      // Check if an image is uploaded
      if (!image) {
        throw new Error("Please upload a donation receipt.");
      }

      // Upload image to storage
      const imageRef = ref(storage, `images/${image.name}`);
      await uploadBytes(imageRef, image);
      const downloadURL = await getDownloadURL(imageRef);

      // Add document to Firestore
      await addDoc(collection(db, "Donation"), {
        ...formData,
        Attachments: downloadURL || "", // Include attachment URL in the string column
      });

      // Reset form data and show success message
      setLoading(false);
      setFormData(initialFormData);
      toast.success(
        "Thank you for your generous donation! Your support means a lot to us."
      );
    } catch (error) {
      setLoading(false);
      toast.error(
        "Please fill all feilds"
      );
      console.error("Error adding document:", error);
    }
  };
  return (
    <div className="bg-white mb-5">
      <div className=" shadow-md rounded-md md:w-1/3 mx-auto pt-8 bg-white text-black">
        <h1 className="text-primary text-center text-xl ">
          Support a Cause That Matters
        </h1>
        <form onSubmit={handleSubmit} className="bg-white p-4">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="*Your full name*"
              value={formData.name}
              onChange={handleInputChange}
              className="mt-4 p-2 block w-full rounded-md border border-gray-300 text-black"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              placeholder="*your@example.com*"
              onChange={handleInputChange}
              className="mt-4 p-2 block w-full rounded-md border border-gray-300 text-black"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Phone Number
            </label>
            <input
              type="tel"
              name="PhoneNumber"
              placeholder="*1234567890*"
              value={formData.PhoneNumber}
              onChange={handleInputChange}
              className="mt-4 p-2 block w-full rounded-md border border-gray-300 text-black"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Amount
            </label>
            <input
              type="number"
              name="Amount"
              value={formData.Amount}
              placeholder="*Amount*"
              onChange={handleInputChange}
              className="mt-4 p-2 block w-full rounded-md border border-gray-300 text-black"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Donate Now
            </label>
            <a
              href="https://pay.jodo.in/pages/KFEUFQRASGBHzBk2"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-color transition duration-300 mt-2 block text-center"
            >
              Donate Now
            </a>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Upload Donation Receipt
            </label>
            <input
              type="file"
              name="Attachments"
              accept=".pdf, .png, .jpg"
              onChange={handleImageChange}
              className="mt-4 p-2 block w-full rounded-md border-gray-300 text-black bg-white"
            />
          </div>

          <button
            type="submit"
            className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-color transition duration-300 mt-4 w-full"
            disabled={loading}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Donation;
