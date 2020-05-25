import crypto from 'crypto';
import https from 'https';
import querystring from 'querystring';

import AuthorizationError from './errors/authorizationError';
import ValidationError from './errors/validationError';
import MainRequest from './mainRequest';

export type Method = 'GET' | 'POST' | 'DELETE';

type RequestRecordType = string | number | boolean;

type StringAnyTuple = Array<[string, RequestRecordType]>;

export interface RequestConfigurationQuery {
  [key: string]: string;
}

interface RequestConfiguration<T> {
  endpoint: string;
  method: Method;
  secret: string;
  receiverId: string;
  body?: T;
  query?: RequestConfigurationQuery;
}

class Request<TResponse, TRequest extends MainRequest = MainRequest> {
  public static readonly HOST_NAME: string = 'khipu.com';
  public static readonly API_ENDPOINT: string = '/api/2.0';
  private url?: string;
  private endpoint?: string;
  private path?: string;
  private fullPath?: string;
  private hash?: string;
  private options?: https.RequestOptions;
  private postData?: null | string;
  private bodyTuple?: StringAnyTuple;
  private queryTuple?: StringAnyTuple;
  public readonly configuration: RequestConfiguration<TRequest>

  public constructor (configuration: RequestConfiguration<TRequest>) {
    this.configuration = configuration;
  }

  public getEndpoint (): string {
    if (!this.endpoint) {
      this.endpoint = '/' + this.configuration.endpoint.replace(/^\//, '');
    }

    return this.endpoint;
  }

  public getPath (): string {
    if (!this.path) {
      this.path = Request.API_ENDPOINT + this.getEndpoint();
    }

    return this.path;
  }

  public getFullPath (): string {
    if (!this.fullPath) {
      let path = this.getPath();

      if (this.configuration.query) {
        const query = this
          .getQueryTuple()
          .map(([key, value]) => `${key}=${value}`)
          .join('&');

        path = `${path}?${query}`;
      }

      this.fullPath = path;
    }

    return this.fullPath;
  }

  public getUrl (): string {
    if (!this.url) {
      this.url = `https://${Request.HOST_NAME}`;
      this.url += this.getPath();
    }

    return this.url;
  }

  public getQueryTuple (): StringAnyTuple {
    if (!this.queryTuple) {
      const query: StringAnyTuple = [];

      if (this.configuration.query) {
        const fields = Object.keys(this.configuration.query);

        for (const field of fields) {
          const value = this.configuration.query[field];

          query.push([encodeURIComponent(field), encodeURIComponent(value)]);
        }
      }

      this.queryTuple = query;
    }

    return this.queryTuple;
  }

  public getBodyTuple (): StringAnyTuple {
    if (!this.bodyTuple) {
      // field's order matters...
      const fields = [
        'amount',
        'bank_id',
        'body',
        'cancel_url',
        'collect_account_uuid',
        'confirm_timeout_date',
        'contract_url',
        'currency',
        'custom',
        'expires_date',
        'fixed_payer_personal_identifier',
        'integrator_fee',
        'mandatory_payment_method',
        'notify_api_version',
        'notify_url',
        'payer_email',
        'payer_name',
        'picture_url',
        'responsible_user_email',
        'return_url',
        'send_email',
        'send_reminders',
        'subject',
        'transaction_id'
      ];

      const body: StringAnyTuple = [];

      if (this.configuration.body) {
        for (const field of fields) {
          const value = this.configuration.body[field];

          if (typeof value !== 'undefined') {
            body.push([field, value]);
          }
        }
      }

      this.bodyTuple = body;
    }

    return this.bodyTuple;
  }

  public getHash (): string {
    if (!this.hash) {
      const chunks = [];

      chunks.push(this.configuration.method);
      chunks.push(encodeURIComponent(this.getUrl()));

      if (this.configuration.query) {
        for (const [key, value] of this.getQueryTuple()) {
          chunks.push(`${key}=${value}`);
        }
      }

      if (this.configuration.body) {
        for (const [key, value] of this.getBodyTuple()) {
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

  public getPostData (): null | string {
    if (typeof this.postData === 'undefined') {
      if (!this.configuration.body) {
        this.postData = null;
      } else {
        this.postData = querystring.stringify(this.configuration.body);
      }
    }

    return this.postData;
  }

  public getOptions (): https.RequestOptions {
    if (!this.options) {
      const headers: Record<string, string|number> = {
        Authorization: `${this.configuration.receiverId}:${this.getHash()}`,
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json'
      };

      const postData = this.getPostData();

      if (postData) {
        headers['Content-Length'] = postData.length;
      }

      this.options = {
        hostname: Request.HOST_NAME,
        port: 443,
        path: this.getFullPath(),
        method: this.configuration.method,
        headers
      };
    }

    return this.options;
  }

  public async execute (): Promise<TResponse> {
    return new Promise((resolve, reject) => {
      const req = https.request(this.getOptions(), (res) => {
        let chunks = '';

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
