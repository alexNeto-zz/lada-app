export interface Vote {
    location: string;
    source_name: String;
    up_vote: number;
    down_vote: number;
    score: number;
    update_at?: Date;
    created_at?: Date;
}
