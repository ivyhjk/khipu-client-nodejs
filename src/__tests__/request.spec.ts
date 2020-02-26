import crypto from 'crypto';

import Request from './../request';

describe('khipu-client.request', () => {
  const query = {
    foo: 'bar',
    bar: 'baz',
    'ba/z': 'fo/o' // "/" is intentional, to check URL encoding support
  };

  it('test given configurations', async () => {
    const request = new Request({
      endpoint: '/foo',
      method: 'GET',
      receiverId: 'a-receiver-id',
      secret: 'a-secret'
    });

    expect(request.configuration.endpoint).toBe('/foo');
    expect(request.configuration.method).toBe('GET');
    expect(request.configuration.receiverId).toBe('a-receiver-id');
    expect(request.configuration.secret).toBe('a-secret');
  });

  it('should check a valid endpoint', async () => {
    const first = new Request({
      endpoint: 'foo',
      method: 'GET',
      receiverId: 'a-receiver-id',
      secret: 'a-secret'
    });

    expect(first.getEndpoint()).toBe('/foo');

    const second = new Request({
      endpoint: '/bar',
      method: 'GET',
      receiverId: 'a-receiver-id',
      secret: 'a-secret'
    });

    expect(second.getEndpoint()).toBe('/bar');
  });

  it('should check a valid URL path', async () => {
    const request = new Request({
      endpoint: '/foo',
      method: 'GET',
      receiverId: 'a-receiver-id',
      secret: 'a-secret'
    });

    expect(request.getPath()).toBe(`${Request.API_ENDPOINT}/foo`);
  });

  it('should check a valid URL full path', async () => {
    const request = new Request({
      endpoint: '/foo',
      method: 'GET',
      receiverId: 'a-receiver-id',
      secret: 'a-secret',
      query
    });

    expect(request.getFullPath())
      .toBe(`${Request.API_ENDPOINT}/foo?foo=bar&bar=baz&ba%2Fz=fo%2Fo`);
  });

  it('should check a valid query tuple', async () => {
    const request = new Request({
      endpoint: '/foo',
      method: 'GET',
      receiverId: 'a-receiver-id',
      secret: 'a-secret',
      query
    });

    expect(request.getQueryTuple()).toEqual([
      ['foo', 'bar'],
      ['bar', 'baz'],
      ['ba%2Fz', 'fo%2Fo']
    ]);
  });

  it('should check a valid url', async () => {
    const request = new Request({
      endpoint: '/foo',
      method: 'GET',
      receiverId: 'a-receiver-id',
      secret: 'a-secret'
    });

    const expected = `https://${Request.HOST_NAME}${Request.API_ENDPOINT}/foo`;

    expect(request.getUrl()).toBe(expected);
  });

  it('should check a valid hash', async () => {
    const request = new Request({
      endpoint: '/foo',
      method: 'POST',
      receiverId: 'a-receiver-id',
      secret: 'a-secret',
      body: {
        currency: 'CLP',
        body: 'foo',
        amount: 100
      }
    });

    const encodedURL = encodeURIComponent(request.getUrl());

    const data = `POST&${encodedURL}&amount=100&body=foo&currency=CLP`;

    const expected = crypto
      .createHmac('sha256', 'a-secret')
      .update(data)
      .digest('hex');

    expect(request.getHash()).toBe(expected);
  });

  it('should check a valid post data', async () => {
    const request = new Request({
      endpoint: '/foo',
      method: 'POST',
      receiverId: 'a-receiver-id',
      secret: 'a-secret',
      body: {
        foo: 'bar',
        bar: 'baz',
        baz: 'foo'
      }
    });

    expect(request.getPostData()).toBe('foo=bar&bar=baz&baz=foo');
  });

  it('should validate the request options without a body', async () => {
    const request = new Request({
      endpoint: '/foo',
      method: 'DELETE',
      receiverId: 'a-receiver-id',
      secret: 'a-secret'
    });

    expect(request.getOptions().hostname).toBe(Request.HOST_NAME);
    expect(request.getOptions().port).toBe(443);
    expect(request.getOptions().path).toBe(request.getPath());
    expect(request.getOptions().method).toBe('DELETE');
    expect(request.getOptions().headers!.Authorization).toBe(
      `a-receiver-id:${request.getHash()}`
    );
    expect(request.getOptions().headers!['Content-Type']).toBe(
      'application/x-www-form-urlencoded'
    );
    expect(request.getOptions().headers!['Content-Length']).toBeUndefined();
  });

  it('should validate the request options with a body', async () => {
    const request = new Request({
      endpoint: '/foo',
      method: 'DELETE',
      receiverId: 'a-receiver-id',
      secret: 'a-secret',
      body: {
        foo: 'bar',
        bar: 'baz',
        baz: 'foo'
      }
    });

    expect(request.getOptions().hostname).toBe(Request.HOST_NAME);
    expect(request.getOptions().port).toBe(443);
    expect(request.getOptions().path).toBe(request.getPath());
    expect(request.getOptions().method).toBe('DELETE');
    expect(request.getOptions().headers!.Authorization).toBe(
      `a-receiver-id:${request.getHash()}`
    );
    expect(request.getOptions().headers!['Content-Type']).toBe(
      'application/x-www-form-urlencoded'
    );
    expect(request.getOptions().headers!['Content-Length']).toBe(
      request.getPostData()!.length
    );
  });

  it('should check a valid hash with query parameters', async () => {
    const request = new Request({
      endpoint: '/foo',
      method: 'POST',
      receiverId: 'a-receiver-id',
      secret: 'a-secret',
      query
    });

    const encodedURL = encodeURIComponent(request.getUrl());

    const data = `POST&${encodedURL}&foo=bar&bar=baz&ba%2Fz=fo%2Fo`;

    const expected = crypto
      .createHmac('sha256', 'a-secret')
      .update(data)
      .digest('hex');

    expect(request.getHash()).toBe(expected);
  });
});
