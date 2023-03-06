export interface TdFooterProps {
    copyright?: {
        type: StringConstructor;
        value?: string;
    };
    style?: {
        type: StringConstructor;
        value?: string;
    };
    logo?: {
        type: ObjectConstructor;
        value?: FooterLogo;
    };
    textLinkList?: {
        type: ArrayConstructor;
        value?: Array<LinkObj>;
    };
    theme?: {
        type: StringConstructor;
        value?: 'text' | 'logo';
    };
}
export interface FooterLogo {
    icon: string;
    title?: string;
    titleUrl?: string;
}
export interface LinkObj {
    name: string;
    url?: string;
    openType?: 'navigate' | 'redirect' | 'relaunch' | 'switchTab' | 'navigateBack';
}
