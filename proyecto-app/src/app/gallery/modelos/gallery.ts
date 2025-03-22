import { Timestamp } from "@angular/fire/firestore";

export interface GalleryDto {
    active: boolean;
    createdAt: Timestamp;
    createBy: string;
    description: string;
    photo: string;
    placeName: string;
    uid: string;
    
}
