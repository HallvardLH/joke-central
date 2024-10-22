export interface Joke {
    id: number;
    title: string;
    text: string;
    created_at: string;
    author: string;
    hasRead: boolean;
    likes: number;
    comments: number
    profiles: {
        username: string;
        avatar_url: string | null;
        id: string;
    },
}