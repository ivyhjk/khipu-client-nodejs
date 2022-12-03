/* eslint-disable camelcase */

interface Bank {
  /**
   * Identificador del banco.
   */
  bank_id: string;
  /**
   * Nombre del banco.
   */
  name: string;
  /**
   * Mensaje con particularidades del banco.
   */
  message: string;
  /**
   * Monto mínimo que acepta el banco en un pago.
   */
  min_amount: number;
  /**
   * Tipo de banco.
   */
  type: string;
  /**
   * Identificador del banco padre (si un banco tiene banca personas y
   * empresas, el primero será el padre del segundo).
   */
  parent: string;
}

interface BanksResponse {
  banks: ReadonlyArray<Bank>
}

export default BanksResponse;
