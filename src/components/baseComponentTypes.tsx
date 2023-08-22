

export interface ComponentProps {
    readonly rootClassName?: string | null;
    readonly rootStyle?: React.CSSProperties | null;
}

export enum ButtonSize {
    small = "small",
    medium = "medium",
    large = "large"
}

export enum ButtonType {
    icon,
    text,
    iconWithUnderText,
    iconWithText
}

export enum InputTextFieldType {
    icon,
    text,
    date,
    select
}

export enum GenderType {
    man = "männlich",
    women = "weiblich",
    diverse = "diverse"
}

export enum FamilyType {
    married = "verheiratet",
    unmarried = "ledig",
    unknown = "nicht bekannt"
}

export enum YesOrNo {
    yes = "ja",
    no = "nein"
}