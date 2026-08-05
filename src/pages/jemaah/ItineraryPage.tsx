import { useState } from 'react';
import { Card, Button, Tag, Segmented } from 'antd';
import {
  EnvironmentOutlined,
  ClockCircleOutlined,
  ArrowLeftOutlined,
  ArrowRightOutlined,
} from '@ant-design/icons';

type ActivityStatus = 'DONE' | 'CURRENT' | 'UPCOMING';

interface ItineraryActivity {
  time: string;
  activity: string;
  location: string;
  status: ActivityStatus;
}

const days: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const itineraryData: Record<number, ItineraryActivity[]> = {
  1: [
    { time: '04:30', activity: 'Shalat Shubuh Berjamaah', location: 'Makkah Al-Mukarramah', status: 'DONE' },
    { time: '07:00', activity: 'Sarapan Pagi', location: 'Hotel - Makkah', status: 'DONE' },
    { time: '10:00', activity: 'Ziyarah Jabal Nur & Goa Hira', location: 'Makkah Al-Mukarramah', status: 'CURRENT' },
    { time: '16:30', activity: 'Shalat Ashar & Istirahat', location: 'Hotel - Makkah', status: 'UPCOMING' },
  ],
  2: [
    { time: '04:30', activity: 'Shalat Shubuh Berjamaah', location: 'Makkah Al-Mukarramah', status: 'UPCOMING' },
    { time: '08:00', activity: 'Thawaf Ifadah & Sa\'i', location: 'Masjidil Haram', status: 'UPCOMING' },
    { time: '13:00', activity: 'Ziyarah Masjid Aisyah (Miqat)', location: 'Makkah Al-Mukarramah', status: 'UPCOMING' },
  ],
};

const defaultDayData: ItineraryActivity[] = [
  { time: '04:30', activity: 'Shalat Shubuh Berjamaah', location: 'Madinah Al-Munawwarah', status: 'UPCOMING' },
  { time: '07:30', activity: 'Sarapan Pagi', location: 'Hotel - Madinah', status: 'UPCOMING' },
  { time: '10:00', activity: 'Ziyarah Masjid Quba & Qiblatain', location: 'Madinah Al-Munawwarah', status: 'UPCOMING' },
  { time: '16:00', activity: 'Ziyarah Museum Al-Madinah', location: 'Madinah Al-Munawwarah', status: 'UPCOMING' },
];

const statusConfig: Record<ActivityStatus, { color: string; bgClass: string }> = {
  DONE: { color: 'success', bgClass: 'bg-green-50 border-green-200' },
  CURRENT: { color: 'processing', bgClass: 'bg-blue-50 border-blue-200' },
  UPCOMING: { color: 'default', bgClass: 'bg-gray-50 border-gray-200' },
};

const ItineraryPage = () => {
  const [selectedDay, setSelectedDay] = useState<number>(1);

  const activities = itineraryData[selectedDay] || defaultDayData;

  const handlePrevDay = () => {
    setSelectedDay((prev) => Math.max(1, prev - 1));
  };

  const handleNextDay = () => {
    setSelectedDay((prev) => Math.min(days.length, prev + 1));
  };

  const dayOptions = days.map((day) => ({ label: `Hari ${day}`, value: day }));

  return (
    <div className="p-8">
      {/* Header Banner */}
      <div className="mb-6 bg-gradient-to-r from-[#0c2340] to-[#1a3a5c] rounded-xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">Jadwal Perjalanan</h1>
        <p className="text-blue-200">Rangkaian kegiatan ibadah umrah - Paket Sakinah 9 Hari</p>
      </div>

      {/* Day Tab Selector */}
      <div className="mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <Segmented
          value={selectedDay}
          onChange={(value) => setSelectedDay(value as number)}
          options={dayOptions}
        />
        <div className="flex gap-2">
          <Button
            icon={<ArrowLeftOutlined />}
            disabled={selectedDay === 1}
            onClick={handlePrevDay}
          >
            Sebelumnya
          </Button>
          <Button
            icon={<ArrowRightOutlined />}
            disabled={selectedDay === days.length}
            onClick={handleNextDay}
          >
            Berikutnya
          </Button>
        </div>
      </div>

      {/* Timeline Activity List */}
      <Card>
        <h3 className="text-lg font-bold text-gray-800 mb-1">Hari ke-{selectedDay}</h3>
        <p className="text-gray-500 text-sm mb-6">
          {selectedDay <= 4 ? 'Makkah Al-Mukarramah' : 'Madinah Al-Munawwarah'}
        </p>

        <div className="space-y-4">
          {activities.map((item, index) => {
            const config = statusConfig[item.status];
            return (
              <div
                key={index}
                className={`flex items-start gap-4 p-4 rounded-xl border-2 transition-all ${config.bgClass}`}
              >
                <div className="flex flex-col items-center flex-shrink-0">
                  <span className="w-12 h-12 rounded-full bg-white border-2 border-blue-200 flex items-center justify-center font-bold text-sm text-[#0c2340]">
                    {item.time}
                  </span>
                  {index < activities.length - 1 && (
                    <div className="w-0.5 flex-1 bg-blue-200 my-1" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h4 className="font-bold text-gray-800">{item.activity}</h4>
                    <Tag color={config.color} className="font-semibold flex-shrink-0">
                      {item.status}
                    </Tag>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <EnvironmentOutlined className="text-green-600" />
                    <span>{item.location}</span>
                  </div>
                </div>

                <ClockCircleOutlined className="text-gray-300 mt-1 flex-shrink-0" />
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
};

export default ItineraryPage;