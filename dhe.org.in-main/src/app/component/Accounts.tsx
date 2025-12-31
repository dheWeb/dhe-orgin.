"use client";
import React, { useState, useEffect } from "react";
import { Card } from "antd";
import { EyeOutlined, DownloadOutlined } from "@ant-design/icons";
import Image from "next/image";
import vbitr from "../../../public/accounts/vbitr.png";
import dhe from "../../../public/accounts/dhe.png";
import sk from "../../../public/accounts/sk.png";
import sm from "../../../public/accounts/sm.png";

const { Meta } = Card;

const Accounts: React.FC = () => {
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const handleWindowResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    setIsMobile(window.innerWidth < 640);
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  const cardData = [
    {
      title: "VBITR Chandigarh",
      accountname: "Institute of Training & Research",
      accountnumber: "42536226777",
      bank: "State Bank of India",
      branch: "Chandigarh Main Branch",
      ifsc: "SBIN0000628",
      upiid: "7627888222@sbi",
      image: vbitr,
      previewLink: "/accounts/vbitr.pdf",
      downloadLink: "/accounts/vbitr.pdf",
    },
    {
      title: "Department of Holistic Education",
      accountname: "Department of Holistic Education",
      accountnumber: "42529022841",
      bank: "State Bank of India",
      branch: "Chandigarh Main Branch",
      ifsc: "SBIN0000628",
      upiid: "holisticeducation@sbi",
      image: dhe,
      previewLink: "/accounts/dhe.pdf",
      downloadLink: "/accounts/dhe.pdf",
    },
    {
      title: "Shiksha Kumbh",
      accountname: "Shiksha Kumbh",
      accountnumber: "42563561350",
      bank: "State Bank of India",
      branch: "Chandigarh Main Branch",
      ifsc: "SBIN0000628",
      upiid: "shikshakhumb@sbi",
      image: sk,
      previewLink: "/accounts/sk.pdf",
      downloadLink: "/accounts/sk.pdf",
    },

    {
      title: "Shiksha Mahakumbh",
      accountname: "Shiksha Mahakumbh",
      accountnumber: "42563560855",
      bank: "State Bank of India",
      branch: "Chandigarh Main Branch",
      ifsc: "SBIN0000628",
      upiid: "shikshamahakumbhkhumb@sbi",
      image: sm,
      previewLink: "/accounts/sm.pdf",
      downloadLink: "/accounts/sm.pdf",
    },
  ];

  const openPreview = (previewLink: string) => {
    window.open(previewLink, "_blank");
  };

  const downloadLogos = (downloadLink: string) => {
    const link = document.createElement("a");
    link.href = downloadLink;
    link.download = downloadLink.substring(downloadLink.lastIndexOf("/") + 1);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold text-primary text-center mb-6">
        Accounts Details with Qr Code
      </h1>
      <div className="flex flex-wrap justify-center gap-4 p-4">
        {cardData.map((data, index) => (
          <Card
            key={index}
            style={{ width: isMobile ? "100%" : 310, marginBottom: 10 }}
            bodyStyle={{ height: 265 }}
            cover={
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  paddingTop: "130%",
                  overflow: "hidden",
                  borderRadius: "8px",
                  transformStyle: "preserve-3d",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                  }}
                >
                  <Image
                    alt="book"
                    src={data.image}
                    layout="fill"
                    objectFit="contain"
                    className="rounded-lg"
                  />
                </div>
              </div>
            }
            actions={[
              <EyeOutlined
                key="preview"
                onClick={() => openPreview(data.previewLink)}
              />,
              <DownloadOutlined
                key="download"
                onClick={() => downloadLogos(data.downloadLink)}
              />,
            ]}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "rotateY(5deg)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "rotateY(0deg)";
            }}
          >
            <div className="text-red-950 font-bold text-xl -mt-10">
              <p className="">{data.title}</p>
            </div>
            <div className="text-primary text-lg">
              <p>
                <span className="font-semibold text-black">Account Name&#58;&nbsp;</span>
                {data.accountname}
              </p>
              <p>
                <span className="font-semibold text-black">
                  Account Number&#58;&nbsp; 
                </span>
                {data.accountnumber}
              </p>
              <p>
                <span className="font-semibold text-black">Bank&#58;&nbsp; </span>
                {data.bank}
              </p>
              <p>
                <span className="font-semibold text-black">Branch&#58;&nbsp; </span>
                {data.branch}
              </p>
              <p>
                <span className="font-semibold text-black">IFSC Code&#58;&nbsp; </span>
                {data.ifsc}
              </p>
              <p>
                <span className="font-semibold text-black">UPI ID&#58;&nbsp; </span>
                {data.upiid}
              </p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Accounts;
