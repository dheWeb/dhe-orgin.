'use client'
import { useState, ChangeEvent, FormEvent } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '@/app/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '@/app/firebase';
import toast from 'react-hot-toast';

interface NgoData {
    name: string;
    Address: string;
    email: string;
    PhoneNumber: string;
    Services: string;
    membershipCategory: string;
    membershipType: string;
    Attachments: string;
}

const MemberShipForm = () => {
    const initialFormData: NgoData = {
        name: '',
        Address: '',
        email: '',
        PhoneNumber: '',
        Services: '',
        membershipCategory: '',
        membershipType: '',
        Attachments: '',
    };

    const [formData, setFormData] = useState<NgoData>(initialFormData);
    const [image, setImage] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
            const docRef = await addDoc(collection(db, 'RegestrationVol'), { ...formData, feeReceipt: downloadURL });
            console.log('Document added with ID:', docRef.id);
            setLoading(false);
            setFormData(initialFormData);
            toast.success('Congratulations on becoming a DHE member!');
        } catch (error) {
            setLoading(false);
            toast.error('Something broke while registration!');
            console.error('Error adding document:', error);
        }
    };

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        setLoading(true);

        const fees: Record<string, { lifetime: number; annual: number }> = {
            student: { lifetime: 2500, annual: 1000 },
            other: { lifetime: 5000, annual: 2000 },
        };

        const membershipCategory = formData.membershipCategory as keyof typeof fees;
        const membershipFee = formData.membershipType === 'lifetime' ? fees[membershipCategory].lifetime : fees[membershipCategory].annual;

        if (image) {
            try {
                const imageRef = ref(storage, `images/${image.name}`);
                await uploadBytes(imageRef, image);

                const downloadURL = await getDownloadURL(imageRef);

                setFormData((prevData) => ({
                    ...prevData,
                    feeReceipt: downloadURL || '',
                    fee: membershipFee,
                }));

                handleAddDocument(downloadURL);
            } catch (error) {
                console.error('Error uploading image:', error);
                setLoading(false);
            }
        } else {
            handleAddDocument(null);
        }

        console.log(formData);
    };

    return (
        <div className='bg-white mb-5'>
            <div className='shadow-md rounded-md md:w-1/3 mx-auto pt-8 bg-white text-black'>
                <h1 className='text-primary text-center text-xl'>Membership Form</h1>
                <form onSubmit={handleSubmit} className='bg-white p-4'>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-600">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            className="mt-4 p-2 block w-full rounded-md border border-gray-300 text-black"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-600">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            className="mt-4 p-2 block w-full rounded-md border border-gray-300 text-black"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-600">Phone Number</label>
                        <input
                            type="tel"
                            name="PhoneNumber"
                            value={formData.PhoneNumber}
                            onChange={handleInputChange}
                            required
                            className="mt-4 p-2 block w-full rounded-md border border-gray-300 text-black"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-600"> Address</label>
                        <input
                            name="Address"
                            type='text'
                            value={formData.Address}
                            onChange={handleInputChange}
                            required
                            className="mt-4 p-2 block w-full rounded-md border border-gray-300 text-black"
                        />
                    </div>
                    <div className='mb-4'>
                        <label className='block text-sm font-medium text-gray-600'>
                            Membership Category
                            <select
                                name='membershipCategory'
                                value={formData.membershipCategory}
                                onChange={handleInputChange}
                                required
                                className='mt-4 p-2 block w-full rounded-md border border-gray-300 text-black'
                            >
                                <option value=''>Select Category</option>
                                <option value='student'>Student</option>
                                <option value='other'>Other</option>
                            </select>
                        </label>
                    </div>
                    {formData.membershipCategory && (
                        <div className='mb-4'>
                            <label className='block text-sm font-medium text-gray-600'>
                                Membership Type
                                <select
                                    name='membershipType'
                                    value={formData.membershipType}
                                    onChange={handleInputChange}
                                    required
                                    className='mt-4 p-2 block w-full rounded-md border border-gray-300 text-black'
                                >
                                    <option value=''>Select Type</option>
                                    <option value='lifetime'>Lifetime Member</option>
                                    <option value='annual'>Annual Member</option>
                                </select>
                            </label>
                        </div>
                    )}
                    {formData.membershipType && (
                        <>
                            <div className='mb-4'>
                                <label className='block text-sm font-medium text-gray-600'>
                                    <b>₹: {formData.membershipCategory === 'student' 
                                        ? (formData.membershipType === 'lifetime' ? 2500 : 1000)
                                        : (formData.membershipType === 'lifetime' ? 5000 : 2000)
                                    }</b>
                                </label>
                            </div>
                            
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-600">
                                    Pay Now
                                </label>
                                <a
                                    href="https://pay.jodo.in/pages/KFEUFQRASGBHzBk2"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-color transition duration-300 mt-2 block text-center"
                                >
                                    Pay Now
                                </a>
                            </div>
                            <div className='mb-4'>
                                <label className='block text-sm font-medium text-gray-600'>Upload Payment Receipt</label>
                                <input
                                    type='file'
                                    name='Attachments'
                                    accept='.pdf, .png, .jpg'
                                    onChange={handleImageChange}
                                    required
                                    className='mt-4 p-2 block w-full rounded-md border-gray-300 text-black bg-white'
                                />
                            </div>
                        </>
                    )}
                    <button
                        type='submit'
                        className='bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-color transition duration-300 mt-4 w-full'
                        disabled={loading}
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default MemberShipForm;
