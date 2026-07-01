"use client";

import React, { useState, ChangeEvent, FormEvent, useId } from 'react';
import toast from 'react-hot-toast';
import RecaptchaField from '@/components/forms/RecaptchaField';
import RazorpayDonateButton from '@/components/payments/RazorpayDonateButton';

interface NgoData {
    name: string;
    Address: string;
    email: string;
    PhoneNumber: string;
    Services: string;
    membershipCategory: string;
    membershipType: string;
}

const MemberShipForm = () => {
    const fieldId = useId();
    const initialFormData: NgoData = {
        name: '',
        Address: '',
        email: '',
        PhoneNumber: '',
        Services: '',
        membershipCategory: '',
        membershipType: '',
    };

    const [formData, setFormData] = useState<NgoData>(initialFormData);
    const [loading, setLoading] = useState(false);
    const [recaptchaToken, setRecaptchaToken] = useState('');
    const [applicationId, setApplicationId] = useState<string | null>(null);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        if (!recaptchaToken) {
            toast.error('Please complete the reCAPTCHA.');
            return;
        }
        setLoading(true);

        try {
            const res = await fetch('/api/forms/membership', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    phone: formData.PhoneNumber,
                    address: formData.Address,
                    recaptchaToken,
                }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Failed');
            setApplicationId(data.applicationId ?? null);
            toast.success('Application saved. Complete payment below.');
        } catch {
            toast.error('Something broke while registration!');
        } finally {
            setLoading(false);
        }
    };

    const fees: Record<string, { lifetime: number; annual: number }> = {
        student: { lifetime: 2500, annual: 1000 },
        other: { lifetime: 5000, annual: 2000 },
    };

    const feeInr =
        formData.membershipCategory && formData.membershipType
            ? formData.membershipType === 'lifetime'
                ? fees[formData.membershipCategory as 'student' | 'other']?.lifetime
                : fees[formData.membershipCategory as 'student' | 'other']?.annual
            : undefined;

    return (
        <div className='bg-white mb-5'>
            <div className='shadow-md rounded-md md:w-1/3 mx-auto pt-8 bg-white text-black'>
                <h1 className='text-primary text-center text-xl'>Membership Form</h1>
                <form onSubmit={handleSubmit} className='bg-white p-4'>
                    <div className="mb-4">
                        <label htmlFor={`${fieldId}-name`} className="block text-sm font-medium text-gray-600">Name</label>
                        <input id={`${fieldId}-name`} type="text" name="name" value={formData.name} onChange={handleInputChange} required className="mt-4 p-2 block w-full rounded-md border border-gray-300 text-black" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor={`${fieldId}-email`} className="block text-sm font-medium text-gray-600">Email</label>
                        <input id={`${fieldId}-email`} type="email" name="email" value={formData.email} onChange={handleInputChange} required className="mt-4 p-2 block w-full rounded-md border border-gray-300 text-black" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor={`${fieldId}-phone`} className="block text-sm font-medium text-gray-600">Phone Number</label>
                        <input id={`${fieldId}-phone`} type="tel" name="PhoneNumber" value={formData.PhoneNumber} onChange={handleInputChange} required className="mt-4 p-2 block w-full rounded-md border border-gray-300 text-black" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor={`${fieldId}-address`} className="block text-sm font-medium text-gray-600">Address</label>
                        <input id={`${fieldId}-address`} name="Address" type='text' value={formData.Address} onChange={handleInputChange} required className="mt-4 p-2 block w-full rounded-md border border-gray-300 text-black" />
                    </div>
                    <div className='mb-4'>
                        <label htmlFor={`${fieldId}-category`} className='block text-sm font-medium text-gray-600'>
                            Membership Category
                        </label>
                            <select id={`${fieldId}-category`} name='membershipCategory' value={formData.membershipCategory} onChange={handleInputChange} required className='mt-4 p-2 block w-full rounded-md border border-gray-300 text-black'>
                                <option value=''>Select Category</option>
                                <option value='student'>Student</option>
                                <option value='other'>Other</option>
                            </select>
                    </div>
                    {formData.membershipCategory && (
                        <div className='mb-4'>
                            <label htmlFor={`${fieldId}-type`} className='block text-sm font-medium text-gray-600'>
                                Membership Type
                            </label>
                                <select id={`${fieldId}-type`} name='membershipType' value={formData.membershipType} onChange={handleInputChange} required className='mt-4 p-2 block w-full rounded-md border border-gray-300 text-black'>
                                    <option value=''>Select Type</option>
                                    <option value='lifetime'>Lifetime Member</option>
                                    <option value='annual'>Annual Member</option>
                                </select>
                        </div>
                    )}
                    {feeInr && (
                        <>
                            <p className='mb-4 text-sm font-medium'>Fee: ₹{feeInr}</p>
                            <RazorpayDonateButton
                                name={formData.name}
                                email={formData.email}
                                phone={formData.PhoneNumber}
                                amount={feeInr}
                                purpose="membership"
                                thankYouPath="/contribute/thank-you"
                                disabled={!formData.name || !formData.email || !applicationId}
                                metadata={applicationId ? { application_id: applicationId } : undefined}
                            />
                        </>
                    )}
                    <RecaptchaField onToken={setRecaptchaToken} />
                    <button type='submit' className='bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-color transition duration-300 mt-4 w-full' disabled={loading}>
                        {loading ? 'Saving…' : 'Save application'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default MemberShipForm;
