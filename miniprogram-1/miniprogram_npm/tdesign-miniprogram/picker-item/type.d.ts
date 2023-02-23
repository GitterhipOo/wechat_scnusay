export interface TdPickerItemProps {
    style?: {
        type: StringConstructor;
        value?: string;
    };
    format?: {
        type: undefined;
        value?: (option: PickerItemOption) => string;
    };
    options?: {
        type: ArrayConstructor;
        value?: PickerItemOption[];
    };
}
export interface PickerItemOption {
    label: string;
    value: string | number;
}
