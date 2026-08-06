import { Avatar, Button, Tag } from 'antd';
import { CheckCircleOutlined, UserAddOutlined } from '@ant-design/icons';
import { ITourLeaderJemaah } from '@/store/tourLeaderStore';

const genderLabel = (gender: 'L' | 'P'): string => (gender === 'L' ? 'Laki-laki' : 'Perempuan');

interface ManifestCardProps {
  jemaah: ITourLeaderJemaah;
  onCheckIn: (jemaah: ITourLeaderJemaah) => void;
}

const ManifestCard: React.FC<ManifestCardProps> = ({ jemaah, onCheckIn }) => (
  <div className="p-5 rounded-2xl border border-gray-200 bg-white hover:shadow-lg hover:border-blue-300 transition-all flex flex-col gap-3">
    <div className="flex items-center gap-3">
      <Avatar size={48} className="!bg-[#0c2340] !text-amber-400 font-bold">
        {jemaah.initials}
      </Avatar>
      <div className="min-w-0">
        <h4 className="font-bold text-gray-800 truncate">{jemaah.name}</h4>
        <p className="text-xs text-gray-500">
          {genderLabel(jemaah.gender)} • {jemaah.age} tahun
        </p>
      </div>
    </div>

    <div className="flex items-center justify-between">
      <div className="text-sm">
        <p className="text-gray-400 text-xs font-medium">NOMOR KURSI</p>
        <p className="font-bold text-[#0c2340]">Kursi {jemaah.seat}</p>
      </div>
      <div className="flex items-center gap-1">
        {jemaah.isLansia && (
          <Tag color="orange" className="font-semibold uppercase text-xs">
            Lansia
          </Tag>
        )}
        {jemaah.isWheelchair && (
          <Tag color="purple" className="font-semibold uppercase text-xs">
            Kursi Roda
          </Tag>
        )}
      </div>
    </div>

    <p className="text-xs text-gray-500 font-medium">{jemaah.phone}</p>

    {jemaah.checkedIn ? (
      <Button
        type="primary"
        className="!bg-green-600 !border-green-600 w-full"
        icon={<CheckCircleOutlined />}
        disabled
      >
        Checked In
      </Button>
    ) : (
      <Button
        type="primary"
        className="!bg-[#0c2340] w-full"
        icon={<UserAddOutlined />}
        onClick={() => onCheckIn(jemaah)}
      >
        + Check In
      </Button>
    )}
  </div>
);

export default ManifestCard;
