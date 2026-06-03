import React from "react";

interface ContactInfo {
  name: string;
  title: string;
  organization: string;
  address: string;
  email: string;
  phone: string;
  website: string;
}

const contactData: ContactInfo = {
  name: "Thakur Ramendra Pratap Singh Rana",
  title: "Project Manager",
  organization: "Department of Holistic Education",
  address: "Vidya Bharti\nPlot No. 1, Sector 71, SAS Nagar (Mohali) – 160071",
  email: "director@dhe.org.in | dhe2021vb@gmail.com",
  phone: "7903431900 | 9417050631",
  website: "dhe.org.in",
};

const ContactUs: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold pb-4 text-primary-color text-center">Contact Us</h2>
      <p className="text-black">
        <strong>{contactData.name}</strong>
        <br />
        {contactData.title}
        <br />
        {contactData.organization}
        <br />
        {contactData.address}
        <br />
        Email: <a href={`mailto:${contactData.email}`} className="text-blue-500">{contactData.email}</a>
        <br />
        Mobile/WhatsApp: <a href={`tel:${contactData.phone}`} className="text-blue-500">{contactData.phone}</a>
        <br />
        Website: <a href={contactData.website} target="_blank" rel="noopener noreferrer" className="text-blue-500">{contactData.website}</a>
      </p>
    </div>
  );
};

export default ContactUs;
