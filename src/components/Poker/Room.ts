export interface Room{
    id: number;
    room_id: string;
    name: string | null;
    password: boolean
    is_open: boolean;
    date: string;
}