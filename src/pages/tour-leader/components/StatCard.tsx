import { Card, Tag } from 'antd';

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  color: string;
  badge?: string;
  badgeColor?: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, color, badge, badgeColor }) => (
  <Card className="hover:shadow-lg transition-shadow">
    <div className="flex items-start justify-between mb-3">
      <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center text-2xl`}>
        {icon}
      </div>
      {badge && (
        <Tag color={badgeColor} className="text-xs font-semibold">
          {badge}
        </Tag>
      )}
    </div>
    <h3 className="text-gray-500 text-sm font-medium mb-1">{title}</h3>
    <p className="text-3xl font-bold text-gray-800 truncate">{value}</p>
  </Card>
);

export default StatCard;
