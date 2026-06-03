'use client'
import React, { useEffect, useState } from 'react';
import { db } from '@/app/firebase';
import { collection, getDocs } from 'firebase/firestore';

/*
  PaperTitle: '',
        Abstract: '',
        CorrespondingAuthor: '',
        CoAuthor: '',
        FileInWord: '',
        FileInPdf: '',
        Keywords: '',*/
        interface NgoData {
            name: string;
            Address: string;
            email: string;
            PhoneNumber: string;
            Services: string;
            type:string;
            Attachments: string;
          }
const MemberShipEntry: React.FC = () => {
  const [formDataList, setFormDataList] = useState<NgoData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const colRef = collection(db, 'RegestrationVol');
        const querySnapshot = await getDocs(colRef);

        const dataList: NgoData[] = [];

        querySnapshot.forEach((doc) => {
          // Access your document data using doc.data()
          const data = doc.data() as NgoData;
          dataList.push(data);
        });

        setFormDataList(dataList);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array means this effect runs once on component mount

  return (
    <div className="flex flex-col items-center bg-white p-4">
  <h2 className="text-2xl font-semibold mb-4 mt-4 text-primary-color">Members</h2>
      <table className="table-fixed max-width my-5">
        <thead>
          <tr className="bg-primary-color">
            <th className="w-1/3 p-2 border text-left text-white">Name</th>
            <th className="w-1/3 p-2 border text-left text-white">Email</th>
            <th className="w-1/3 p-2 border text-left text-white">Contact</th>
          </tr>
        </thead>
        <tbody>
          {formDataList.map((member, index) => (
            <tr key={index}>
              <td className="p-2 border text-left text-black">{member.name}</td>
              <td className="p-2 border text-left text-black">{member.email}</td>
              <td className="p-2 border text-left text-black">{member.PhoneNumber}</td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>

  );
};

export default MemberShipEntry;
