import axios, { Axios, AxiosResponse } from 'axios';

const axiosClient = axios.create({ baseURL: 'http://localhost:3001/', headers: { Accept: 'application/json' } });

export interface PlayerDto {
  id: string;
  name: string;
}

export interface RoomDto {
  id: string;
  code: string;
  players: PlayerDto[];
}

export async function createRoom() {
  const response = await axiosClient.post<{ room: RoomDto }>('room');
  console.log('Response', response);
  const room = response.data.room;
  return room;
}

interface JoinRoomRequest {
  roomCode: string;
  username: string;
}

interface JoinRoomResponse {
  player: PlayerDto;
}

export async function joinRoom(requestData: JoinRoomRequest) {
  const response = await axiosClient.post<JoinRoomResponse, AxiosResponse<JoinRoomResponse>, JoinRoomRequest>(
    '/room/join',
    requestData
  );
  const player = response.data.player;
  return player;
}

export async function getRoom(code: string) {
  const response = await axiosClient.get<{ room: RoomDto }>(`/room/${code}`);
  const room = response.data.room;
  return room;
}
