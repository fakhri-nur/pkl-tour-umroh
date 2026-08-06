import { Card, Tag, Button } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  color: string;
  badge?: string;
  badgeColor?: string;
  footer?: string;
  action?: {
    text: string;
    onClick: () => void;
  };
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  color,
  badge,
  badgeColor,
  footer,
  action,
}) => (
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
    <p className="text-2xl font-bold text-gray-800 mb-1 truncate">{value}</p>
    {footer && <p className="text-xs text-gray-500 mb-2">{footer}</p>}
    {action && (
      <Button type="link" className="!p-0 !h-auto text-blue-600 font-medium" onClick={action.onClick}>
        {action.text} <ArrowRightOutlined className="text-xs ml-1" />
      </Button>
    )}
  </Card>
);

export default StatCard;
