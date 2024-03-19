/* eslint-disable @typescript-eslint/no-unused-vars */
namespace Order {
  interface Data {
    id?: number;
    idempotent_key: string;
    payment_id: string;
    status: Steps;
    createdAt?: Date;
    updatedAt?: Date;
  }

  type Steps = 'IN_PREPARATION' | 'READY' | 'FINISHED';
}
