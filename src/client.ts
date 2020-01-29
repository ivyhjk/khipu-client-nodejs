import BanksResponse from './banksResponse';
import Configuration from './configuration';
import ConfirmPaymentResponse from './confirmPaymentResponse';
import CreatePaymentRequest from './createPaymentRequest';
import CreatePaymentResponse from './createPaymentResponse';
import CreateReceiverRequest from './createReceiverRequest';
import DeletePaymentResponse from './deletePaymentResponse';
import PaymentResponse from './paymentResponse';
import PaymentsResponse from './paymentsResponse';
import RefundPaymentResponse from './refundPaymentResponse';
import Request, { Method } from './request';

class Client {
  public constructor(public readonly configuration: Configuration) {

  }

  public buildRequest<TResponse, TRequest = any>(
    endpoint: string,
    method: Method,
    body?: TRequest
  ): Request<TResponse, TRequest> {
    return new Request<TResponse, TRequest>({
      endpoint,
      method,
      body,
      receiverId: this.configuration.receiverId,
      secret: this.configuration.secret
    });
  }

  public async getBanks(): Promise<BanksResponse> {
    return this.buildRequest<BanksResponse>('/banks', 'GET').execute();
  }

  public async getPayments(
    _notificationToken: string
  ): Promise<PaymentsResponse> {
    throw new Error('not implemented');
  }

  public async createPayment(
    body: CreatePaymentRequest
  ): Promise<CreatePaymentResponse> {
    return this.buildRequest<CreatePaymentResponse, CreatePaymentRequest>(
      '/payments',
      'POST',
      body
    ).execute();
  }

  public async getPayment(id: string): Promise<PaymentResponse> {
    return this.buildRequest<PaymentResponse>(
      `/payments/${id}`,
      'GET'
    ).execute();
  }

  public async deletePayment(id: string): Promise<DeletePaymentResponse> {
    return this.buildRequest<DeletePaymentResponse>(
      `/payments/${id}`,
      'DELETE'
    ).execute();
  }

  public async confirmPayment(id: string): Promise<ConfirmPaymentResponse> {
    return this.buildRequest<DeletePaymentResponse>(
      `/payments/${id}/confirm`,
      'GET'
    ).execute();
  }

  public async refundPayment(id: string): Promise<RefundPaymentResponse> {
    return this.buildRequest<DeletePaymentResponse>(
      `/payments/${id}/refunds`,
      'GET'
    ).execute();
  }

  public async createReceiver(
    request: CreateReceiverRequest
  ): Promise<CreatePaymentResponse> {
    return this.buildRequest<CreatePaymentResponse, CreateReceiverRequest>(
      `/receivers`,
      'POST',
      request
    ).execute();
  }
}

export default Client;
