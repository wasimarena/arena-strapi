export default ({ env }) => ({
  email: {
    config: {
      provider: 'sendgrid',
      providerOptions: {
        apiKey: env('SENDGRID_API_KEY'),
      },
      settings: {
        defaultFrom: 'no-reply@arenatwo.com',
        defaultReplyTo: 'no-reply@arenatwo.com',
        testAddress: 'cto@arenatwo.com',
      },
    },
  },
});
