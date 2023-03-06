export interface TdDateTimePickerProps {
    cancelBtn?: {
        type: StringConstructor;
        value?: string;
    };
    confirmBtn?: {
        type: StringConstructor;
        value?: string;
    };
    style?: {
        type: StringConstructor;
        value?: string;
    };
    end?: {
        type: StringConstructor;
        value?: string | number;
    };
    externalClasses?: {
        type: ArrayConstructor;
        value?: ['t-class', 't-class-confirm', 't-class-cancel', 't-class-title'];
    };
    footer?: {
        type: BooleanConstructor;
        value?: boolean;
    };
    format?: {
        type: StringConstructor;
        value?: string;
    };
    header?: {
        type: BooleanConstructor;
        value?: boolean;
    };
    mode?: {
        type: StringConstructor;
        value?: DateTimePickerMode;
    };
    showWeek?: {
        type: BooleanConstructor;
        value?: boolean;
    };
    start?: {
        type: StringConstructor;
        value?: string | number;
    };
    title?: {
        type: StringConstructor;
        value?: string;
    };
    value?: {
        type: StringConstructor;
        value?: DateValue;
    };
    defaultValue?: {
        type: StringConstructor;
        value?: DateValue;
    };
    visible?: {
        type: BooleanConstructor;
        value?: boolean;
    };
}
export declare type DateTimePickerMode = TimeModeValues | Array<TimeModeValues>;
export declare type TimeModeValues = 'year' | 'month' | 'date' | 'hour' | 'minute' | 'second';
export declare type DateValue = string | number;
