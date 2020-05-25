/* eslint-disable camelcase */
import MainRequest from './mainRequest';

interface CreateReceiverRequest extends MainRequest {
  /**
   * Nombre de pila del administrador de la cuenta de cobro a crear.
   */
  admin_first_name: string;
  /**
   * Apellido del administrador de la cuenta de cobro a crear.
   */
  admin_last_name: string;
  /**
   * Correo electrónico del administrador de la cuenta de cobro a crear.
   */
  admin_email: string;
  /**
   * Código alfanumérico de dos caractéres ISO 3166-1 del país de la cuenta de
   * cobro a crear.
   */
  country_code: string;
  /**
   * Identificador tributario del cobrador asociado a la cuenta de cobro a
   * crear.
   */
  business_identifier: string;
  /**
   * Categoría tributaria o rubro tributario del cobrador asociado a la cuenta
   * de cobro a crear.
   */
  business_category: string;
  /**
   * Nombre tributario del cobrador asociado a la cuenta de cobro a crear.
   */
  business_name: string;
  /**
   * Teléfono del cobrador asociado a la cuenta de cobro a crear.
   */
  business_phone: string;
  /**
   * Dirección del cobrador de la cuenta de cobro a crear.
   */
  business_address_line_1: string;
  /**
   * Segunda línea de la dirección del cobrador de la cuenta de cobro a crear.
   */
  business_address_line_2: string;
  /**
   * Tercera línea de la dirección del cobrador de la cuenta de cobro a crear.
   */
  business_address_line_3: string;
  /**
   * Nombre del contacto del cobrador.
   */
  contact_full_name: string;
  /**
   * Cargo del contacto del cobrador.
   */
  contact_job_title: string;
  /**
   * Correo electrónico del contacto del cobrador.
   */
  contact_email: string;
  /**
   * Teléfono del contacto del cobrador.
   */
  contact_phone: string;
  /**
   * Identificador del banco.
   */
  bank_account_bank_id?: string;
  /**
   * Identificador personal del dueño de la cuenta de banco.
   */
  bank_account_identifier?: string;
  /**
   * Nombre de la cuenta de banco.
   */
  bank_account_name?: string;
  /**
   * Número de la cuenta en el banco.
   */
  bank_account_number?: string;
  /**
   * URL por omisión para el webservice donde se notificará el pago.
   */
  notify_url?: string;
  /**
   * URL para el webservice donde se notificará la rendición.
   */
  rendition_url?: string;
}

export default CreateReceiverRequest;
