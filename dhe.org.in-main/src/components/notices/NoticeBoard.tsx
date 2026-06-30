"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  List,
  Typography,
  Tabs,
  Alert,
  Modal,
  Button,
  Skeleton,
  Spin,
} from "antd";
import { CalendarOutlined, ReloadOutlined } from "@ant-design/icons";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/app/firebase";
import { useRouter } from "next/navigation";
import { resolveNoticeImageUrl } from "@/services/notices/resolve-image-url";

type Event = {
  id: string;
  title: string;
  date: string;
  imageUrl: string;
};

type NoticeBoardProps = {
  /** Slim layout for homepage sidebar (no duplicate chrome) */
  embedded?: boolean;
};

const FALLBACK_NOTICE_IMAGE = "/logo.png";

function NoticeImage({
  event,
  imageLoading,
  onOpen,
  onLoadStart,
  onLoadEnd,
}: {
  event: Event;
  imageLoading: Record<string, boolean>;
  onOpen: (url: string) => void;
  onLoadStart: (id: string) => void;
  onLoadEnd: (id: string) => void;
}) {
  const resolvedSrc = resolveNoticeImageUrl(event.imageUrl);
  const [imageSrc, setImageSrc] = useState(resolvedSrc);

  useEffect(() => {
    setImageSrc(resolvedSrc);
  }, [resolvedSrc]);

  return (
    <div className="relative w-1/3 shrink-0">
      {imageLoading[event.id] && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/80 z-10">
          <Spin size="small" />
        </div>
      )}
      <Image
        src={imageSrc}
        alt={event.title}
        width={160}
        height={120}
        unoptimized
        className="h-auto w-full object-cover rounded-md cursor-pointer border border-gray-100"
        onClick={() => onOpen(imageSrc)}
        onLoad={() => onLoadEnd(event.id)}
        onError={() => {
          setImageSrc(FALLBACK_NOTICE_IMAGE);
          onLoadEnd(event.id);
        }}
        onLoadStart={() => onLoadStart(event.id)}
      />
    </div>
  );
}

const NoticeBoard: React.FC<NoticeBoardProps> = ({ embedded = false }) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [currentNotices, setCurrentNotices] = useState<Event[]>([]);
  const [pastNotices, setPastNotices] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [modalImageSrc, setModalImageSrc] = useState<string>(FALLBACK_NOTICE_IMAGE);
  const [imageLoading, setImageLoading] = useState<Record<string, boolean>>({});

  const router = useRouter();

  const fetchEvents = async () => {
    setLoading(true);
    setError(null);
    try {
      const querySnapshot = await getDocs(collection(db, "events"));
      const eventsData: Event[] = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Event, "id">),
      }));
      setEvents(eventsData);
    } catch {
      setError("Error fetching events. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    const sortedEvents = [...events].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    setCurrentNotices(sortedEvents.slice(0, 5));
    setPastNotices(sortedEvents.slice(5));
  }, [events]);

  const handleImageClick = (imageUrl: string) => {
    setModalImageSrc(imageUrl);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setModalImageSrc(FALLBACK_NOTICE_IMAGE);
  };

  const handleImageLoadStart = (id: string) => {
    setImageLoading((prev) => ({ ...prev, [id]: true }));
  };

  const handleImageLoadEnd = (id: string) => {
    setImageLoading((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  };

  const renderNoticeRow = (event: Event) => (
    <List.Item
      className={
        embedded
          ? "!py-3 !px-0 border-b border-gray-100 last:border-0"
          : "border-b-2 border-gray-500 py-4 flex items-start"
      }
    >
      <div className="flex-grow flex flex-col justify-center w-2/3 pr-3 min-w-0">
        {embedded ? (
          <p className="text-sm font-medium text-gray-900 leading-snug line-clamp-3">
            {event.title}
          </p>
        ) : (
          <Typography.Title level={4} style={{ fontSize: "0.88rem" }}>
            {event.title}
          </Typography.Title>
        )}
      </div>
      <NoticeImage
        event={event}
        imageLoading={imageLoading}
        onOpen={handleImageClick}
        onLoadStart={handleImageLoadStart}
        onLoadEnd={handleImageLoadEnd}
      />
    </List.Item>
  );

  const tabItems = [
    {
      key: "1",
      label: embedded ? "Current" : "Current Notices",
      children: loading ? (
        <div className="max-h-52 overflow-y-auto">
          <Skeleton active paragraph={{ rows: 3 }} />
        </div>
      ) : currentNotices.length === 0 ? (
        <Typography.Text type="secondary" className="text-xs">
          No current notices available.
        </Typography.Text>
      ) : (
        <div className="max-h-52 overflow-y-auto">
          <List
            dataSource={currentNotices}
            renderItem={renderNoticeRow}
            split={false}
          />
          {!embedded && currentNotices.length > 0 && (
            <div className="text-center mt-4">
              <Button type="link" onClick={() => router.push("/noticeboard")}>
                View full notice board
              </Button>
            </div>
          )}
        </div>
      ),
    },
    {
      key: "2",
      label: embedded ? "Past" : "Past Notices",
      children: loading ? (
        <div className="max-h-52 overflow-y-auto">
          <Skeleton active paragraph={{ rows: 3 }} />
        </div>
      ) : pastNotices.length === 0 ? (
        <Typography.Text type="secondary" className="text-xs">
          No past notices available.
        </Typography.Text>
      ) : (
        <div className="max-h-52 overflow-y-auto">
          <List
            dataSource={pastNotices.slice(0, 5)}
            renderItem={renderNoticeRow}
            split={false}
          />
          {!embedded && pastNotices.length > 5 && (
            <div className="text-center mt-4">
              <Button type="link" onClick={() => router.push("/noticeboard")}>
                View all past notices
              </Button>
            </div>
          )}
        </div>
      ),
    },
  ];

  const tabs = (
    <Tabs
      defaultActiveKey="1"
      size={embedded ? "small" : "middle"}
      className={embedded ? "" : "p-4"}
      items={tabItems}
    />
  );

  const previewModal = (
    <Modal
      open={isModalVisible}
      onCancel={handleCancel}
      footer={null}
      centered
      width={embedded ? "90%" : "80%"}
    >
      <Image
        src={modalImageSrc || FALLBACK_NOTICE_IMAGE}
        alt="Notice preview"
        width={960}
        height={720}
        unoptimized
        className="w-full h-auto object-contain"
        onError={() => setModalImageSrc(FALLBACK_NOTICE_IMAGE)}
      />
    </Modal>
  );

  if (embedded) {
    return (
      <div className="min-w-0">
        <div className="flex items-center justify-end mb-1">
          <Button
            icon={<ReloadOutlined />}
            onClick={fetchEvents}
            size="small"
            type="text"
            aria-label="Refresh notices"
          />
        </div>
        {error && (
          <Alert
            message={error}
            type="error"
            showIcon
            className="mb-2 text-xs"
          />
        )}
        {tabs}
        {previewModal}
      </div>
    );
  }

  return (
    <div className="p-6 text-primary w-full ml-auto mr-auto">
      <div
        className="bg-white shadow-lg rounded-lg max-w-lg mx-auto"
        role="region"
        aria-label="Notice listings"
      >
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <p className="text-lg font-semibold flex items-center m-0">
            Current and past notices
            <CalendarOutlined className="ml-2 text-primary" aria-hidden />
          </p>
          <Button
            icon={<ReloadOutlined />}
            onClick={fetchEvents}
            className="ml-2"
            size="small"
            type="text"
            aria-label="Refresh notices"
          />
        </div>

        {error && (
          <Alert
            message="Error"
            description={error}
            type="error"
            showIcon
            className="m-4"
          />
        )}
        {tabs}
      </div>
      {previewModal}
    </div>
  );
};

export default NoticeBoard;
