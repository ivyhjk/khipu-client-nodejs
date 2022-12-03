import {
  BanksResponse,
  ConfirmPaymentRequest,
  ConfirmPaymentResponse,
  CreatePaymentRequest,
  CreatePaymentResponse,
  CreateReceiverRequest,
  CreateReceiverResponse,
  DeletePaymentRequest,
  DeletePaymentResponse,
  GetPaymentsRequest,
  GetPaymentsResponse,
  RefundPaymentRequest,
  RefundPaymentResponse,
  RequestBody
} from './api';
import Request, { Method, RequestConfigurationQuery } from './api/request';
import { Configuration } from './types';

class Client {
  public readonly configuration: Configuration;

  public constructor (configuration: Configuration) {
    this.configuration = configuration;
  }

  public buildRequest<TResponse, TRequestBody extends RequestBody = RequestBody> (
    endpoint: string,
    method: Method,
    body?: TRequestBody,
    query?: RequestConfigurationQuery
  ): Request<TResponse, TRequestBody> {
    return new Request<TResponse, TRequestBody>({
      body,
      endpoint,
      method,
      query,
      receiverId: this.configuration.receiverId,
      secret: this.configuration.secret
    });
  }

  public async getBanks (): Promise<BanksResponse> {
    return this.buildRequest<BanksResponse>('/banks', 'GET').execute();
  }

  public async createPayment (
    body: CreatePaymentRequest
  ): Promise<CreatePaymentResponse> {
    return this.buildRequest<CreatePaymentResponse, CreatePaymentRequest>(
      '/payments',
      'POST',
      body
    ).execute();
  }

  public async getPayments (
    body: GetPaymentsRequest
  ): Promise<GetPaymentsResponse> {
    return this.buildRequest<GetPaymentsResponse, GetPaymentsRequest>(
      '/payments',
      'GET',
      undefined,
      body
    ).execute();
  }

  public async getPayment (body: GetPaymentsRequest): Promise<GetPaymentsResponse> {
    return this.buildRequest<GetPaymentsResponse>(
      `/payments/${body.id}`,
      'GET'
    ).execute();
  }

  public async deletePayment (body: DeletePaymentRequest): Promise<DeletePaymentResponse> {
    return this.buildRequest<DeletePaymentResponse>(
      `/payments/${body.id}`,
      'DELETE'
    ).execute();
  }

  public async confirmPayment (body: ConfirmPaymentRequest): Promise<ConfirmPaymentResponse> {
    return this.buildRequest<DeletePaymentResponse>(
      `/payments/${body.id}/confirm`,
      'GET'
    ).execute();
  }

  public async refundPayment (body: RefundPaymentRequest): Promise<RefundPaymentResponse> {
    return this.buildRequest<DeletePaymentResponse>(
      `/payments/${body.id}/refunds`,
      'GET'
    ).execute();
  }

  public async createReceiver (
    request: CreateReceiverRequest
  ): Promise<CreateReceiverResponse> {
    return this.buildRequest<CreateReceiverResponse, CreateReceiverRequest>(
      '/receivers',
      'POST',
      request
    ).execute();
  }
}

export default Client;
