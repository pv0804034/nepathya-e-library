export class DocumentRequest {
    title?: string;
    discription?: string;
    type?: string;
    year?: number;
    authors?: Array<string>;
    facultyId?: number;
    semester?: number;
    tags?: Array<number>;
    fileUrl?: string;
    visible?: boolean;
    docUploadNoticeId?: number;
};