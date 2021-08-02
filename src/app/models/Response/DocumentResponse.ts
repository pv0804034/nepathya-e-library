import { Users } from "../User";
import { Tag } from "./TagResponse";

export class DocumentResponse {
    id?: number;
    authors?:Array<Users>;
    faculty?: string;
    year?: number;
    tags?: Array<Tag>;
    fileUrl?: string;
    semester?: number;
    title?: string;
    discription?: string;
    type?: string;
    isVisible?: boolean;
}