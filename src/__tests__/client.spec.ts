import Client from '../client';
import CreatePaymentRequest from '../createPaymentRequest';
import CreateReceiverRequest from '../createReceiverRequest';

/*
  eslint-disable
    @typescript-eslint/no-explicit-any,
    @typescript-eslint/ban-ts-comment
*/

describe('khipu.client.Client', () => {
  const assertRequest = async (
    method: string,
    requestArguments: Array<any>,
    body?: any
  ) => {
    const client = new Client({
      receiverId: 'test-receiver-id',
      secret: 'test-secret'
    });

    const executeResponse = { foo: 'bar' };

    const request = {
      execute: jest.fn(() => executeResponse)
    };

    const buildRequest = jest.fn(() => request);

    // @ts-ignore
    client.buildRequest = buildRequest;

    // @ts-ignore
    const response = await client[method](body);

    expect(buildRequest.mock.calls.length).toBe(1); // called once
    expect(buildRequest.mock.calls[0]).toEqual(requestArguments);
    expect(response).toBe(executeResponse);
  };

  it('should build a new request successfully', async () => {
    const client = new Client({
      receiverId: 'test-receiver-id',
      secret: 'test-secret'
    });

    const request = client.buildRequest(
      '/the-endpoint',
      'POST',
      { foo: 'bar' }
    );

    expect(request.configuration.endpoint).toBe('/the-endpoint');
    expect(request.configuration.method).toBe('POST');
    expect(request.configuration.body).toStrictEqual({ foo: 'bar' });
  });

  it('should call the banks with a GET request successfully', async () => {
    await assertRequest('getBanks', ['/banks', 'GET']);
  });

  it('should call the payments with a GET request successfully', async () => {
    await assertRequest(
      'getPaymentByNotificationToken',
      [
        '/payments',
        'GET',
        undefined,
        {
          notification_token: 'token'
        }
      ],
      'token'
    );
  });

  it('should call the payments with a POST request successfully', async () => {
    const body: CreatePaymentRequest = {
      amount: 13.37,
      currency: 'CLP',
      subject: 'test payment'
    };

    await assertRequest('createPayment', ['/payments', 'POST', body], body);
  });

  it('should call the payments with a GET request successfully', async () => {
    await assertRequest('getPayment', ['/payments/foo', 'GET'], 'foo');
  });

  it('should call the payments with a DELETE request successfully', async () => {
    await assertRequest('deletePayment', ['/payments/foo', 'DELETE'], 'foo');
  });

  it('should call the payments confirm with a GET request successfully', async () => {
    await assertRequest(
      'confirmPayment',
      ['/payments/foo/confirm', 'GET'],
      'foo'
    );
  });

  it('should call the payments refunds with a GET request successfully', async () => {
    await assertRequest(
      'refundPayment',
      ['/payments/foo/refunds', 'GET'],
      'foo'
    );
  });

  it('should call the receivers with a POST request successfully', async () => {
    const request: CreateReceiverRequest = {
      admin_email: 'admin@example.com',
      admin_first_name: 'Foo',
      admin_last_name: 'Bar',
      business_address_line_1: 'Fake Address 1',
      business_address_line_2: 'Fake Address 2',
      business_address_line_3: 'Fake Address 3',
      business_category: 'things',
      business_identifier: 'business-id',
      business_name: 'Custom business',
      business_phone: '123456789',
      contact_email: 'contact@example.com',
      contact_full_name: 'Bar',
      contact_job_title: 'Fubar',
      contact_phone: '987654321',
      country_code: 'CL'
    };

    await assertRequest(
      'createReceiver',
      ['/receivers', 'POST', request],
      request
    );
  });
});
