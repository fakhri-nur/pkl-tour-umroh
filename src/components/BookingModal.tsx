import { Modal, Form, Select, InputNumber, Input } from 'antd';
import { useCreateBooking, useUpdateBooking } from '@/hooks/useBookings';
import { IBooking, ICreateBookingDto, IUpdateBookingDto } from '@/types/booking.type';
import { useCustomers } from '@/hooks/useCustomers';
import { usePackages } from '@/hooks/usePackages';
import { useEffect } from 'react';

const { Option } = Select;
const { TextArea } = Input;

interface IBookingModalProps {
  open: boolean;
  onCancel: () => void;
  bookingData?: IBooking;
}

const BookingModal = ({ open, onCancel, bookingData }: IBookingModalProps) => {
  const [form] = Form.useForm();
  const { mutate: createBooking, isPending: isCreating } = useCreateBooking();
  const { mutate: updateBooking, isPending: isUpdating } = useUpdateBooking();
  const { data: customersData } = useCustomers({ limit: 100 });
  const { data: packagesData } = usePackages({ limit: 100 });

  useEffect(() => {
    if (bookingData) {
      form.setFieldsValue(bookingData);
    } else {
      form.resetFields();
    }
  }, [bookingData, form]);

  const onFinish = (values: ICreateBookingDto) => {
    if (bookingData) {
      updateBooking(
        { id: bookingData.id, data: values as IUpdateBookingDto },
        {
          onSuccess: () => {
            form.resetFields();
            onCancel();
          },
        }
      );
    } else {
      createBooking(values, {
        onSuccess: () => {
          form.resetFields();
          onCancel();
        },
      });
    }
  };

  return (
    <Modal
      title={bookingData ? 'Edit Booking' : 'Tambah Booking'}
      open={open}
      onCancel={onCancel}
      onOk={() => form.submit()}
      confirmLoading={isCreating || isUpdating}
      width={600}
    >
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="customerId"
          label="Pelanggan"
          rules={[{ required: true, message: 'Pelanggan wajib dipilih' }]}
        >
          <Select
            placeholder="Pilih pelanggan"
            showSearch
            filterOption={(input, option) =>
              (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
            }
            options={customersData?.data?.map((customer) => ({
              label: customer.name,
              value: customer.id,
            }))}
          />
        </Form.Item>

        <Form.Item
          name="packageId"
          label="Paket"
          rules={[{ required: true, message: 'Paket wajib dipilih' }]}
        >
          <Select
            placeholder="Pilih paket"
            showSearch
            filterOption={(input, option) =>
              (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
            }
            options={packagesData?.data?.map((pkg) => ({
              label: `${pkg.name} - ${pkg.type.toUpperCase()}`,
              value: pkg.id,
            }))}
          />
        </Form.Item>

        <Form.Item
          name="totalPrice"
          label="Total Harga"
          rules={[{ required: true, message: 'Total harga wajib diisi' }]}
        >
          <InputNumber
            placeholder="Total harga"
            className="w-full"
            formatter={(value) => `Rp ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            parser={(value) => value?.replace(/Rp\s?|(,*)/g, '') as unknown as number}
          />
        </Form.Item>

        {bookingData && (
          <>
            <Form.Item name="status" label="Status Booking">
              <Select placeholder="Pilih status">
                <Option value="pending">Pending</Option>
                <Option value="confirmed">Confirmed</Option>
                <Option value="paid">Paid</Option>
                <Option value="cancelled">Cancelled</Option>
              </Select>
            </Form.Item>

            <Form.Item name="paymentStatus" label="Status Pembayaran">
              <Select placeholder="Pilih status pembayaran">
                <Option value="unpaid">Unpaid</Option>
                <Option value="partial">Partial</Option>
                <Option value="paid">Paid</Option>
              </Select>
            </Form.Item>

            <Form.Item name="paidAmount" label="Jumlah Dibayar">
              <InputNumber
                placeholder="Jumlah dibayar"
                className="w-full"
                formatter={(value) => `Rp ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={(value) => value?.replace(/Rp\s?|(,*)/g, '') as unknown as number}
              />
            </Form.Item>
          </>
        )}

        <Form.Item name="notes" label="Catatan">
          <TextArea rows={3} placeholder="Catatan tambahan" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default BookingModal;
