/* eslint-disable camelcase */

interface PaymentsResponse {
  payment_id: string;
  payment_url: string;
  app_url: string;
  ready_for_terminal: boolean;
  transfer_url: string;
  simplified_transfer_url: string;
  webpay_url: string;
  receiver_id: number;
  notification_token: string;
  subject: string;
  amount: string;
  discount: string;
  currency: string;
  status: string;
  status_detail: string;
  body: string;
  picture_url: string;
  receipt_url: string;
  return_url: string;
  cancel_url: string;
  notify_url: string;
  notify_api_version: string;
  expires_date: string;
  attachment_urls: Array<string>;
  bank: string;
  bank_id: string;
  payer_name: string;
  payer_email: string;
  personal_identifier: string;
  bank_account_number: string;
  out_of_date_conciliation: boolean;
  transaction_id: string;
  custom: string;
  responsible_user_email: string;
  send_reminders: boolean;
  send_email: boolean;
  payment_method: string;
  funds_source: string;
  conciliation_date: string;
}

export default PaymentsResponse;
