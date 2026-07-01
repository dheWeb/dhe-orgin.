"use client";

import Image from "next/image";

type AssetCardProps = {
  title: string;
  description?: string;
  imageSrc: string;
  previewLink: string;
  downloadLink: string;
  children?: React.ReactNode;
};

export function AssetCard({
  title,
  description,
  imageSrc,
  previewLink,
  downloadLink,
  children,
}: AssetCardProps) {
  const openPreview = () => window.open(previewLink, "_blank", "noopener,noreferrer");

  const download = () => {
    const link = document.createElement("a");
    link.href = downloadLink;
    link.download = downloadLink.split("/").pop() ?? "download";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <article className="w-full max-w-[310px] rounded-lg border border-gray-200 bg-white shadow-sm overflow-hidden motion-safe:transition-transform hover:shadow-md">
      <div className="relative aspect-[10/13] w-full bg-gray-50">
        <Image
          src={imageSrc}
          alt={title}
          fill
          sizes="(max-width: 640px) 100vw, 310px"
          className="object-contain p-2"
        />
      </div>
      <div className="p-4 border-t border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        {description && (
          <p className="mt-1 text-sm text-gray-600">{description}</p>
        )}
        {children}
      </div>
      <div className="flex border-t border-gray-100 divide-x divide-gray-100">
        <button
          type="button"
          onClick={openPreview}
          className="flex-1 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 min-h-11"
          aria-label={`Preview ${title}`}
        >
          Preview
        </button>
        <button
          type="button"
          onClick={download}
          className="flex-1 py-3 text-sm font-medium text-orange-700 hover:bg-orange-50 min-h-11"
          aria-label={`Download ${title}`}
        >
          Download
        </button>
      </div>
    </article>
  );
}
