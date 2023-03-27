/// <reference types="react" />
interface DatePickerProps {
    onSelect: (p: string) => void;
    title: string;
    required?: boolean;
    selectedDate: string;
    placeholder?: string;
}
declare const DatePicker: ({ onSelect, title, required, selectedDate, placeholder, }: DatePickerProps) => JSX.Element;
export default DatePicker;
