/* eslint-disable @typescript-eslint/no-unused-vars */
namespace Order {
  interface Data {
    id: number;
    order_id: number;
    status: Steps;
    user_id: number;
    createdAt?: Date;
    updatedAt?: Date;
  }

  type Steps = 'IN_PREPARATION' | 'READY' | 'FINISHED';
}
