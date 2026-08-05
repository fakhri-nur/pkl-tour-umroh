import { Modal, Select, InputNumber, Input } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCreateBooking, useUpdateBooking } from '@/hooks/useBookings';
import { IBooking, IUpdateBookingDto } from '@/types/booking.type';
import { useCustomers } from '@/hooks/useCustomers';
import { usePackages } from '@/hooks/usePackages';
import { useEffect } from 'react';
import { bookingFormSchema, BookingFormData } from '@/utils/validation';

const { TextArea } = Input;

interface IBookingModalProps {
  open: boolean;
  onCancel: () => void;
  bookingData?: IBooking;
}

const formatRupiahInput = (value: number | string | undefined): string => {
  const number = Number(value || 0);
  return `Rp ${number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;
};

const parseRupiahInput = (value: string | undefined): number => {
  return Number(value?.replace(/[^\d]/g, '') || 0);
};

const BookingModal = ({ open, onCancel, bookingData }: IBookingModalProps) => {
  const { mutate: createBooking, isPending: isCreating } = useCreateBooking();
  const { mutate: updateBooking, isPending: isUpdating } = useUpdateBooking();
  const { data: customersData } = useCustomers({ limit: 100 });
  const { data: packagesData } = usePackages({ limit: 100 });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      customerId: '',
      packageId: '',
      totalPrice: 0,
      status: 'pending',
      paymentStatus: 'unpaid',
      paidAmount: 0,
      notes: '',
    },
  });

  useEffect(() => {
    if (bookingData) {
      reset({
        customerId: bookingData.customerId,
        packageId: bookingData.packageId,
        totalPrice: bookingData.totalPrice,
        status: bookingData.status,
        paymentStatus: bookingData.paymentStatus,
        paidAmount: bookingData.paidAmount,
        notes: bookingData.notes,
      });
    } else {
      reset();
    }
  }, [bookingData, reset]);

  const onFinish = (values: BookingFormData) => {
    if (bookingData) {
      updateBooking(
        { id: bookingData.id, data: values as IUpdateBookingDto },
        {
          onSuccess: () => {
            reset();
            onCancel();
          },
        }
      );
    } else {
      createBooking(values, {
        onSuccess: () => {
          reset();
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
      onOk={() => handleSubmit(onFinish)()}
      confirmLoading={isCreating || isUpdating}
      width={600}
    >
      <form onSubmit={handleSubmit(onFinish)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Pelanggan</label>
          <Controller
            name="customerId"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                placeholder="Pilih pelanggan"
                showSearch
                status={errors.customerId ? 'error' : ''}
                filterOption={(input, option) =>
                  (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                }
                options={customersData?.data?.map((customer) => ({
                  label: customer.name,
                  value: customer.id,
                }))}
                className="w-full"
              />
            )}
          />
          {errors.customerId && (
            <p className="text-red-500 text-sm mt-1">{errors.customerId.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Paket</label>
          <Controller
            name="packageId"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                placeholder="Pilih paket"
                showSearch
                status={errors.packageId ? 'error' : ''}
                filterOption={(input, option) =>
                  (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                }
                options={packagesData?.data?.map((pkg) => ({
                  label: `${pkg.name} - ${pkg.type.toUpperCase()}`,
                  value: pkg.id,
                }))}
                className="w-full"
              />
            )}
          />
          {errors.packageId && (
            <p className="text-red-500 text-sm mt-1">{errors.packageId.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Total Harga</label>
          <Controller
            name="totalPrice"
            control={control}
            render={({ field }) => (
              <InputNumber
                {...field}
                placeholder="Total harga"
                className="w-full"
                status={errors.totalPrice ? 'error' : ''}
                formatter={formatRupiahInput}
                parser={parseRupiahInput}
              />
            )}
          />
          {errors.totalPrice && (
            <p className="text-red-500 text-sm mt-1">{errors.totalPrice.message}</p>
          )}
        </div>

        {bookingData && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status Booking</label>
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <Select {...field} className="w-full" placeholder="Pilih status">
                    <Select.Option value="pending">Menunggu</Select.Option>
                    <Select.Option value="confirmed">Dikonfirmasi</Select.Option>
                    <Select.Option value="paid">Lunas</Select.Option>
                    <Select.Option value="cancelled">Dibatalkan</Select.Option>
                  </Select>
                )}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status Pembayaran</label>
              <Controller
                name="paymentStatus"
                control={control}
                render={({ field }) => (
                  <Select {...field} className="w-full" placeholder="Pilih status pembayaran">
                    <Select.Option value="unpaid">Belum Bayar</Select.Option>
                    <Select.Option value="partial">Sebagian</Select.Option>
                    <Select.Option value="paid">Lunas</Select.Option>
                  </Select>
                )}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Jumlah Dibayar</label>
              <Controller
                name="paidAmount"
                control={control}
                render={({ field }) => (
                  <InputNumber
                    {...field}
                    placeholder="Jumlah dibayar"
                    className="w-full"
                    formatter={formatRupiahInput}
                    parser={parseRupiahInput}
                  />
                )}
              />
            </div>
          </>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Catatan</label>
          <Controller
            name="notes"
            control={control}
            render={({ field }) => (
              <TextArea rows={3} placeholder="Catatan tambahan" {...field} />
            )}
          />
        </div>
      </form>
    </Modal>
  );
};

export default BookingModal;