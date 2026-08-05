import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input, Select, Button, Card, Row, Col, message } from 'antd';
import {
  EnvironmentOutlined,
  PhoneOutlined,
  MailOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { contactFormSchema, ContactFormData } from '@/utils/validation';

const { TextArea } = Input;
const { Option } = Select;

const ContactPage = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      fullName: '',
      phone: '',
      email: '',
      service: '',
      message: '',
    },
  });

  const onSubmit = async (_data: ContactFormData) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    message.success('Pesan berhasil terkirim!');
    reset();
  };

  const infoCards = [
    {
      icon: <EnvironmentOutlined className="text-3xl text-green-600" />,
      title: 'Kunjungi Kantor Kami',
      description: 'Jl. Pelajar Pejuang 45 No.65 Kota Bandung, Jawa Barat',
      action: {
        text: 'Lihat di Google Maps ↗',
        link: 'https://maps.google.com/?q=Jl.+Pelajar+Pejuang+45+No.65+Bandung',
      },
    },
    {
      icon: <PhoneOutlined className="text-3xl text-green-600" />,
      title: 'Layanan Pelanggan',
      description: 'Tersedia Senin - Sabtu',
      schedule: 'Pukul 08:00 - 17:00 WIB',
      contact: '0813-2212-348',
    },
    {
      icon: <MailOutlined className="text-3xl text-green-600" />,
      title: 'Email Kami',
      description: 'Kirimkan pertanyaan atau proposal kerja sama perusahaan Anda.',
      contact: 'intantravelinternasional@gmail.com',
    },
  ];

  const serviceOptions = [
    'Paket Umrah',
    'Paket Haji',
    'Halal Tour',
    'Umrah Plus',
    'Konsultasi',
    'Lainnya',
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <section className="py-16 bg-gradient-to-br from-blue-900 to-blue-800">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold text-white mb-4">Hubungi Kami</h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            Kami siap membantu menjawab pertanyaan dan memfasilitasi kebutuhan perjalanan ibadah
            Anda.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-6">
          <Row gutter={[24, 24]} className="mb-12">
            {infoCards.map((card, index) => (
              <Col xs={24} md={8} key={index}>
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                      {card.icon}
                    </div>
                    <h3 className="text-xl font-bold text-gray-800">{card.title}</h3>
                    <p className="text-gray-600">{card.description}</p>
                    {card.schedule && (
                      <div className="flex items-center justify-center gap-2 text-gray-600">
                        <ClockCircleOutlined />
                        <span>{card.schedule}</span>
                      </div>
                    )}
                    {card.contact && (
                      <p className="text-lg font-bold text-green-600">{card.contact}</p>
                    )}
                    {card.action && (
                      <a
                        href={card.action.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block text-green-600 hover:text-green-700 font-semibold"
                      >
                        {card.action.text}
                      </a>
                    )}
                  </div>
                </Card>
              </Col>
            ))}
          </Row>

          <Row gutter={[48, 48]}>
            <Col xs={24} lg={12}>
              <Card className="shadow-lg">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Kirim Pesan</h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <Row gutter={16}>
                    <Col span={12}>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Nama Lengkap <span className="text-red-500">*</span>
                        </label>
                        <Controller
                          name="fullName"
                          control={control}
                          render={({ field }) => (
                            <Input
                              {...field}
                              placeholder="Nama lengkap Anda"
                              size="large"
                              status={errors.fullName ? 'error' : ''}
                            />
                          )}
                        />
                        {errors.fullName && (
                          <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>
                        )}
                      </div>
                    </Col>

                    <Col span={12}>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          No. Telepon / WA <span className="text-red-500">*</span>
                        </label>
                        <Controller
                          name="phone"
                          control={control}
                          render={({ field }) => (
                            <Input
                              {...field}
                              placeholder="08123456789"
                              size="large"
                              status={errors.phone ? 'error' : ''}
                            />
                          )}
                        />
                        {errors.phone && (
                          <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                        )}
                      </div>
                    </Col>
                  </Row>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <Controller
                      name="email"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          type="email"
                          placeholder="email@example.com"
                          size="large"
                          status={errors.email ? 'error' : ''}
                        />
                      )}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Layanan yang Diminati <span className="text-red-500">*</span>
                    </label>
                    <Controller
                      name="service"
                      control={control}
                      render={({ field }) => (
                        <Select
                          {...field}
                          placeholder="Pilih layanan"
                          size="large"
                          className="w-full"
                          status={errors.service ? 'error' : ''}
                        >
                          {serviceOptions.map((service) => (
                            <Option key={service} value={service}>
                              {service}
                            </Option>
                          ))}
                        </Select>
                      )}
                    />
                    {errors.service && (
                      <p className="text-red-500 text-sm mt-1">{errors.service.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Pesan Anda <span className="text-red-500">*</span>
                    </label>
                    <Controller
                      name="message"
                      control={control}
                      render={({ field }) => (
                        <TextArea
                          {...field}
                          rows={5}
                          placeholder="Tulis pesan atau pertanyaan Anda di sini..."
                          size="large"
                          status={errors.message ? 'error' : ''}
                        />
                      )}
                    />
                    {errors.message && (
                      <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
                    )}
                  </div>

                  <Button
                    type="primary"
                    htmlType="submit"
                    size="large"
                    loading={isSubmitting}
                    className="w-full !bg-green-700 hover:!bg-green-800 !rounded-lg"
                  >
                    Kirim Pesan Sekarang
                  </Button>
                </form>
              </Card>
            </Col>

            <Col xs={24} lg={12}>
              <div className="w-full h-full min-h-[400px] lg:min-h-[600px] rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.6783854125883!2d107.62533357587123!3d-6.929007693070805!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e87f27973b5d%3A0x2f6531a773203273!2sJl.%20Pelajar%20Pejuang%2045%20No.65%2C%20Lkr.%20Sel.%2C%20Kec.%20Lengkong%2C%20Kota%20Bandung%2C%20Jawa%20Barat%2040264!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              </div>
            </Col>
          </Row>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ContactPage;
