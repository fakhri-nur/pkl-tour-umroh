import { Modal, Form, Input, Select, DatePicker, InputNumber } from 'antd';
import { useCreatePackage, useUpdatePackage } from '@/hooks/usePackages';
import { IPackage, ICreatePackageDto, IUpdatePackageDto } from '@/types/package.type';
import { useEffect } from 'react';
import dayjs from 'dayjs';

const { TextArea } = Input;
const { Option } = Select;

interface IPackageModalProps {
  open: boolean;
  onCancel: () => void;
  packageData?: IPackage;
}

const PackageModal = ({ open, onCancel, packageData }: IPackageModalProps) => {
  const [form] = Form.useForm();
  const { mutate: createPackage, isPending: isCreating } = useCreatePackage();
  const { mutate: updatePackage, isPending: isUpdating } = useUpdatePackage();

  useEffect(() => {
    if (packageData) {
      form.setFieldsValue({
        ...packageData,
        departureDate: dayjs(packageData.departureDate),
        returnDate: dayjs(packageData.returnDate),
      });
    } else {
      form.resetFields();
    }
  }, [packageData, form]);

  const onFinish = (values: ICreatePackageDto & { departureDate: dayjs.Dayjs; returnDate: dayjs.Dayjs }) => {
    const payload = {
      ...values,
      departureDate: values.departureDate.toISOString(),
      returnDate: values.returnDate.toISOString(),
      facilities: [],
    };

    if (packageData) {
      updatePackage(
        { id: packageData.id, data: payload as IUpdatePackageDto },
        {
          onSuccess: () => {
            form.resetFields();
            onCancel();
          },
        }
      );
    } else {
      createPackage(payload, {
        onSuccess: () => {
          form.resetFields();
          onCancel();
        },
      });
    }
  };

  return (
    <Modal
      title={packageData ? 'Edit Paket' : 'Tambah Paket'}
      open={open}
      onCancel={onCancel}
      onOk={() => form.submit()}
      confirmLoading={isCreating || isUpdating}
      width={700}
    >
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="name"
          label="Nama Paket"
          rules={[{ required: true, message: 'Nama paket wajib diisi' }]}
        >
          <Input placeholder="Nama paket" />
        </Form.Item>

        <Form.Item
          name="type"
          label="Tipe"
          rules={[{ required: true, message: 'Tipe wajib dipilih' }]}
        >
          <Select placeholder="Pilih tipe">
            <Option value="umroh">Umroh</Option>
            <Option value="haji">Haji</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="price"
          label="Harga"
          rules={[{ required: true, message: 'Harga wajib diisi' }]}
        >
          <InputNumber
            placeholder="Harga"
            className="w-full"
            formatter={(value) => `Rp ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            parser={(value) => value?.replace(/Rp\s?|(,*)/g, '') as unknown as number}
          />
        </Form.Item>

        <Form.Item
          name="duration"
          label="Durasi (hari)"
          rules={[{ required: true, message: 'Durasi wajib diisi' }]}
        >
          <InputNumber placeholder="Durasi" className="w-full" min={1} />
        </Form.Item>

        <Form.Item
          name="quota"
          label="Kuota"
          rules={[{ required: true, message: 'Kuota wajib diisi' }]}
        >
          <InputNumber placeholder="Kuota" className="w-full" min={1} />
        </Form.Item>

        <Form.Item
          name="departureDate"
          label="Tanggal Keberangkatan"
          rules={[{ required: true, message: 'Tanggal keberangkatan wajib diisi' }]}
        >
          <DatePicker className="w-full" format="DD-MM-YYYY" />
        </Form.Item>

        <Form.Item
          name="returnDate"
          label="Tanggal Kepulangan"
          rules={[{ required: true, message: 'Tanggal kepulangan wajib diisi' }]}
        >
          <DatePicker className="w-full" format="DD-MM-YYYY" />
        </Form.Item>

        <Form.Item
          name="description"
          label="Deskripsi"
          rules={[{ required: true, message: 'Deskripsi wajib diisi' }]}
        >
          <TextArea rows={4} placeholder="Deskripsi paket" />
        </Form.Item>

        <Form.Item name="imageUrl" label="URL Gambar">
          <Input placeholder="URL gambar" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default PackageModal;
