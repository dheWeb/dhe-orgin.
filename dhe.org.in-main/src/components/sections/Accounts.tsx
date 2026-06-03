"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Card } from "antd";
import { EyeOutlined, DownloadOutlined } from "@ant-design/icons";
import Image from "next/image";
// import vbitr from "../../../public/accounts/vbitr.png";
import dhe from "../../../public/accounts/dhe.png";
// import sk from "../../../public/accounts/sk.png";
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
    // {
    //   title: "VBITR Chandigarh",
    //   accountname: "Institute of Training & Research",
    //   accountnumber: "42536226777",
    //   bank: "State Bank of India",
    //   branch: "Chandigarh Main Branch",
    //   ifsc: "SBIN0000628",
    //   upiid: "7627888222@sbi",
    //   image: vbitr,
    //   previewLink: "/accounts/vbitr.pdf",
    //   downloadLink: "/accounts/vbitr.pdf",
    // },
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
    // {
    //   title: "Shiksha Kumbh",
    //   accountname: "Shiksha Kumbh",
    //   accountnumber: "42563561350",
    //   bank: "State Bank of India",
    //   branch: "Chandigarh Main Branch",
    //   ifsc: "SBIN0000628",
    //   upiid: "shikshakhumb@sbi",
    //   image: sk,
    //   previewLink: "/accounts/sk.pdf",
    //   downloadLink: "/accounts/sk.pdf",
    // },

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

  const assistanceCtas = [
    { href: "/contact", label: "Contact DHE" },
    { href: "/donation", label: "Donation Page" },
    { href: "/contribute", label: "Membership Page" },
  ] as const;

  const beforeContributionChecklist = [
    "Verify account name, number, IFSC, and UPI details against the official cards below before transferring funds.",
    "Include reference or purpose information in your transaction where applicable, as directed by DHE.",
    "Keep your bank or UPI payment confirmation for your records.",
    "Contact DHE through the official contact page if you need clarification before paying.",
  ] as const;

  return (
    <div className="min-w-0 bg-white">
      <div className="dhe-container py-6 sm:py-10 space-y-8 sm:space-y-10">
        <header className="text-center max-w-3xl mx-auto">
          <h1 className="text-2xl sm:text-3xl font-bold text-primary-color">
            Official Account Details
          </h1>
          <p className="mt-3 text-sm sm:text-base text-gray-600 leading-relaxed">
            Verified banking and UPI information for contributions to the
            Department of Holistic Education and related official accounts.
          </p>
        </header>

        <section
          aria-labelledby="official-contribution-heading"
          className="max-w-3xl mx-auto"
        >
          <h2
            id="official-contribution-heading"
            className="text-xl font-semibold text-primary-color"
          >
            Official Contribution Information
          </h2>
          <p className="mt-3 text-sm sm:text-base text-gray-700 leading-relaxed">
            The account cards below display official DHE contribution channels.
            Please verify all details on this page before making a payment. Only
            use the accounts and UPI identifiers shown here or other channels
            explicitly communicated by DHE through official correspondence.
          </p>
          <p className="mt-3 text-sm sm:text-base text-gray-700 leading-relaxed">
            After completing a transfer, preserve your transaction record. For
            donation reporting, you may also use the{" "}
            <Link
              href="/donation"
              className="text-orange-700 font-medium hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 rounded"
            >
              donation page
            </Link>{" "}
            to share details with the Department.
          </p>
        </section>

        <section
          aria-labelledby="before-contribution-heading"
          className="max-w-3xl mx-auto rounded-lg border border-orange-100 bg-orange-50/40 p-4 sm:p-6"
        >
          <h2
            id="before-contribution-heading"
            className="text-xl font-semibold text-primary-color"
          >
            Before Making a Contribution
          </h2>
          <ul className="mt-4 list-disc pl-5 space-y-2 text-sm sm:text-base text-gray-700" role="list">
            {beforeContributionChecklist.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="account-cards-heading">
          <h2
            id="account-cards-heading"
            className="text-xl font-semibold text-primary-color text-center mb-4"
          >
            Accounts Details with QR Code
          </h2>
          <div className="flex flex-wrap justify-center gap-4 p-2 sm:p-4">
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
        </section>

        <section
          aria-labelledby="assistance-accounts-heading"
          className="max-w-3xl mx-auto text-center"
        >
          <h2
            id="assistance-accounts-heading"
            className="text-xl font-semibold text-primary-color"
          >
            Need Assistance?
          </h2>
          <p className="mt-3 text-sm text-gray-600">
            Visit these official pages for support with contributions or
            membership.
          </p>
          <div className="mt-5 flex flex-col sm:flex-row flex-wrap justify-center gap-3">
            {assistanceCtas.map((cta) => (
              <Link
                key={cta.href}
                href={cta.href}
                className="dhe-btn-primary text-sm px-5 py-2.5 min-h-11 inline-flex items-center justify-center"
              >
                {cta.label}
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Accounts;
