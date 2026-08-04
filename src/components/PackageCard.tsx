import { Card, Badge, Button } from 'antd';
import {
  CalendarOutlined,
  HomeOutlined,
  RocketOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import { IPackageCard } from '@/types/package.type';

interface IPackageCardProps {
  package: IPackageCard;
  onDetail: (id: string) => void;
}

const PackageCard = ({ package: pkg, onDetail }: IPackageCardProps) => {
  const getStatusColor = (status: string): string => {
    const colors: Record<string, string> = {
      Open: 'success',
      'Almost Full': 'warning',
      Closed: 'error',
    };
    return colors[status] || 'default';
  };

  return (
    <Card
      hoverable
      className="rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
      cover={
        <div className="relative h-56 overflow-hidden">
          <img
            alt={pkg.title}
            src={pkg.imageUrl}
            className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute top-3 right-3">
            <Badge.Ribbon
              text={pkg.status}
              color={getStatusColor(pkg.status)}
              className="font-semibold"
            />
          </div>
        </div>
      }
    >
      <div className="space-y-4">
        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">{pkg.title}</h3>
          <p className="text-sm text-gray-600 line-clamp-2">{pkg.description}</p>
        </div>

        <div className="grid grid-cols-2 gap-3 py-3 border-y border-gray-200">
          <div className="flex items-center gap-2">
            <CalendarOutlined className="text-green-600 text-base" />
            <div>
              <div className="text-xs text-gray-500">Keberangkatan</div>
              <div className="text-sm font-medium text-gray-800">{pkg.date}</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <HomeOutlined className="text-green-600 text-base" />
            <div>
              <div className="text-xs text-gray-500">Hotel</div>
              <div className="text-sm font-medium text-gray-800">{pkg.hotel}</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <RocketOutlined className="text-green-600 text-base" />
            <div>
              <div className="text-xs text-gray-500">Maskapai</div>
              <div className="text-sm font-medium text-gray-800">{pkg.airline}</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <TeamOutlined className="text-green-600 text-base" />
            <div>
              <div className="text-xs text-gray-500">Sisa Seat</div>
              <div className="text-sm font-medium text-gray-800">
                {pkg.remainingSeats} seat
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <span className="text-sm font-semibold text-gray-500">{pkg.code}</span>
          <Button
            type="primary"
            className="!bg-green-700 hover:!bg-green-800 !rounded-lg"
            onClick={() => onDetail(pkg.id)}
          >
            Detail Paket
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default PackageCard;
