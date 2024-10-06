import { request } from './axios';

import type { AddRoom } from '@/types/room';

export const roomAPI = {
  createRoom: (roomData: AddRoom) =>
    request({
      url: 'rooms',
      method: 'POST',
      data: roomData,
    }),
};
