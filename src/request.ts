import crypto from 'crypto';
import https from 'https';
import querystring from 'querystring';

import AuthorizationError from './errors/authorizationError';
import ValidationError from './errors/validationError';

export type Method = 'GET' | 'POST' | 'DELETE';

interface RequestConfiguration<T> {
  endpoint: string;
  method: Method;
  secret: string;
  receiverId: string;
  body?: T;
}

class Request<TResponse, TRequest = any> {
  public static readonly HOST_NAME: string = 'khipu.com';
  public static readonly API_ENDPOINT: string = '/api/2.0';
  private url?: string;
  private endpoint?: string;
  private path?: string;
  private hash?: string;
  private options?: https.RequestOptions;
  private postData?: null | string;

  public constructor(
    public readonly configuration: RequestConfiguration<TRequest>
  ) {

  }

  public getEndpoint(): string {
    if (!this.endpoint) {
      this.endpoint = '/' + this.configuration.endpoint.replace(/^\//, '');
    }

    return this.endpoint;
  }

  public getPath(): string {
    if (!this.path) {
      this.path = Request.API_ENDPOINT + this.getEndpoint();
    }

    return this.path;
  }

  public getUrl(): string {
    if (!this.url) {
      this.url = `https://${Request.HOST_NAME}`;
      this.url += this.getPath();
    }

    return this.url;
  }

  public getHash(): string {
    if (!this.hash) {
      const chunks = [];

      chunks.push(this.configuration.method);
      chunks.push(encodeURIComponent(this.getUrl()));

      if (this.configuration.body) {
        const body: { [key: string]: any } = this.configuration.body;
        const keys = Object.keys(body);

        for (const key of keys) {
          const value = body[key];
          const encodedKey = encodeURIComponent(key);
          const encodedValue = encodeURIComponent(value);

          chunks.push(`${encodedKey}=${encodedValue}`);
        }
      }

      // @see https://khipu.com/page/api-firma-requerimientos
      this.hash = crypto
        .createHmac('sha256', this.configuration.secret)
        .update(chunks.join('&'))
        .digest('hex');
    }

    return this.hash;
  }

  public getPostData(): null | string {
    if (typeof this.postData === 'undefined') {
      if (!this.configuration.body) {
        this.postData = null;
      } else {
        // @ts-ignore
        this.postData = querystring.stringify(this.configuration.body);
      }
    }

    return this.postData;
  }

  public getOptions(): https.RequestOptions {
    if (!this.options) {
      let headers: { [key: string]: any } = {
        Authorization: `${this.configuration.receiverId}:${this.getHash()}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      };

      const postData = this.getPostData();

      if (postData) {
        headers['Content-Length'] = postData.length;
      }

      this.options = {
        hostname: Request.HOST_NAME,
        port: 443,
        path: this.getPath(),
        method: this.configuration.method,
        headers
      };
    }

    return this.options;
  }

  public async execute(): Promise<TResponse> {
    return new Promise((resolve, reject) => {
      const req = https.request(this.getOptions(), (res) => {
        let chunks: string = '';

        res.on('data', (chunk) => {
          chunks += chunk;
        });

        res.on('end', () => {
          try {
            const response = JSON.parse(chunks);

            if (res.statusCode === 403) {
              reject(new AuthorizationError());
            } else if (res.statusCode === 400) {
              reject(new ValidationError(response?.errors[0]?.message));
            } else {
              resolve(response);
            }
          } catch (e) {
            reject(e);
          }
        });
      });

      req.on('error', (e) => {
        reject(e);
      });

      const postData = this.getPostData();

      if (postData) {
        req.write(postData);
      }

      req.end();
    });
  }
}

export default Request;
