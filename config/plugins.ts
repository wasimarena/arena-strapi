export default ({ env }) => ({
  email: {
    config: {
      provider: env('SENDGRID_API_KEY') ? 'sendgrid' : 'nodemailer',
      providerOptions: env('SENDGRID_API_KEY') ? {
        apiKey: env('SENDGRID_API_KEY'),
      } : {
        host: 'localhost',
        port: 1025,
        secure: false,
        auth: {
          user: 'test',
          pass: 'test',
        },
      },
      settings: {
        defaultFrom: 'no-reply@arenatwo.com',
        defaultReplyTo: 'no-reply@arenatwo.com',
        testAddress: 'cto@arenatwo.com',
      },
    },
  },
});
