import { request } from './axios';

export const roomAPI = {
  createRoom: (roomName: string) =>
    request({
      url: 'rooms',
      method: 'POST',
      data: { roomName },
    }),
};
