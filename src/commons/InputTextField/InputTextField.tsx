import { Box, InputBase, MenuItem, SvgIcon, TextField } from "@mui/material";
import { ComponentProps, InputTextFieldType } from "../../components/baseComponentTypes";
import { IconFontSize, NIcon } from '../NIcon/NIcon';
import dayjs from "dayjs";
import React, { useCallback, useState } from "react";
import { FormField } from "../baseForm/form/useFormFields";
import styles from '../../styles/base/inputText.less';
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export type FormData = {
    [key: string]: string | null;
}

export interface SelectData {
    id: string,
    value: string
}

export interface InputTextFieldProps extends ComponentProps {
    readonly label: string;
    readonly inputTextFieldType?: InputTextFieldType | null;
    readonly iconSize?: IconFontSize | null;
    readonly icon?: typeof SvgIcon;
    readonly fullWidth?: boolean;
    readonly selectItem?: ReadonlyArray<SelectData>;
    readonly formField?: FormField;
}

export const InputTextField = (function InputTextField(props: InputTextFieldProps) {

    const labelId = props.label?.toLocaleLowerCase() ?? '';

    const formValue = props.formField?.getValue();

    const formName = formValue ? Object.keys(formValue)[0] : props.label.toLocaleLowerCase();

    const [formData, setFormData] = useState<FormData>(formValue ?? { [formName]: '' });

    const handlerChange = useCallback((data: string, _type: InputTextFieldType) => {

        const formData: FormData = { [formName]: data }
        setFormData(formData);
        props.formField?.onChange(formData);
    },
        [props.formField, formName]
    );



    if (props.inputTextFieldType != null && props.inputTextFieldType === InputTextFieldType.icon && props.icon != null) {
        return (

            <Box sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '100%', background: '#ffffff78', borderRadius: '5px' }}>
                <NIcon
                    icon={props.icon}
                    size={props.iconSize ?? IconFontSize.small}
                    color={'primary'}
                />
                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder={props.label ?? undefined}
                    inputProps={{ 'aria-label': props.label ?? undefined }}
                    fullWidth
                    className={styles.baseInput}
                    value={formData[formName]}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        handlerChange(event.currentTarget.value, InputTextFieldType.icon)
                    }}
                    id={labelId}
                    color={"primary"}
                />
            </Box>
        )
    }

    if (props.inputTextFieldType !== null && props.inputTextFieldType === InputTextFieldType.date) {
        return (
            <div className={styles.main}>
                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="de">
                    <DatePicker
                        label={props.label}
                        className={styles.baseInput}
                        value={formData[formName] ? dayjs(+(formData[formName] ?? 0) * 1000) : null}
                        onChange={(dateChanged) => {
                            if (dateChanged) {
                                const newDate = Math.floor(+dateChanged.toDate().getTime() / 1000.0);
                                handlerChange(newDate?.toString() ?? '', InputTextFieldType.date)
                            }

                        }}

                    />
                </LocalizationProvider>
            </div>
        )
    }

    if (props.inputTextFieldType !== null && props.inputTextFieldType === InputTextFieldType.select) {

        return (
            <div className={styles.main}>
                <TextField
                    fullWidth={props.fullWidth ?? false}
                    label={props.label} size={'small'}
                    className={props.rootClassName ? props.rootClassName : styles.baseInput}
                    defaultValue={formData[formName] ?? ''}
                    sx={props.rootStyle}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        handlerChange(event.currentTarget.value, InputTextFieldType.select)
                    }}
                    select
                    id={labelId}
                >
                    {props.selectItem && props.selectItem.map((item) => {
                        return (
                            <MenuItem
                                key={item.id}
                                value={item.value}
                            >
                                {item.value}
                            </MenuItem>
                        )
                    })}
                </TextField>
            </div>
        )
    }

    return (
        <div className={styles.main}>
            <TextField
                fullWidth={props.fullWidth ?? false}
                label={props.label} size={'small'}
                className={props.rootClassName ? props.rootClassName : styles.baseInput}
                value={formData[formName]}
                sx={props.rootStyle}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    handlerChange(event.currentTarget.value, InputTextFieldType.icon)
                }}
                id={labelId}
            />
        </div>
    )


})