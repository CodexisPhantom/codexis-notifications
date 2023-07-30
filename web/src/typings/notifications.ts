export interface SimpleNotificationProps {
    id: string;
    message: string;
    duration: number;
    type: 'success' | 'error' | 'info' | 'debug';
}

export interface JobNotificationProps {
    id: string;
    job: string;
    name: string;
    color: string;
    number?: number;
    message: string;
    duration: number;
    type: 'opening' | 'closing' | 'information';
}