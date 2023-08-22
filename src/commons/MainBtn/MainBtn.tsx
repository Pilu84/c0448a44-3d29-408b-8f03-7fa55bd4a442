import { Button, IconButton, Tooltip } from "@mui/material";
import React, { SyntheticEvent, useCallback } from "react";
import { ButtonSize, ButtonType, ComponentProps } from "../../components/baseComponentTypes";
import { IconFontSize, NIcon, NIconPropsModel } from "../NIcon/NIcon";
import styles from "../../styles/base/btn.less";

export interface MainBtnProps extends ComponentProps, NIconPropsModel {
    readonly type: ButtonType;
    readonly label?: string | null;
    readonly onClick?: (event: React.SyntheticEvent<HTMLElement>) => void;
    readonly btnSize?: ButtonSize;
    readonly disabled?: boolean;
    readonly tooltip?: string | null;
    readonly tooltipDisabled?: boolean;
}


const iconSize = (size: ButtonSize): IconFontSize => {
    switch (size) {
        case ButtonSize.large:
            return IconFontSize.large;
        case ButtonSize.medium:
            return IconFontSize.medium;
        case ButtonSize.small:
            return IconFontSize.small;
    }
}

export const MainBtn = React.memo(function MainBtn(props: MainBtnProps) {


    const clickHandler = useCallback((event: SyntheticEvent<HTMLElement>) => {
        const onClick = props.onClick;
        if (onClick != null) {
            event.preventDefault();
            onClick(event);
        }
    },
        [props.onClick]
    )


    const icon = (props.icon == null) ? undefined :
        <NIcon
            icon={props.icon}
            size={iconSize(props.btnSize ?? ButtonSize.small)}
            color={props.color ?? undefined}
            rootStyle={props.rootStyle ?? undefined}
        />

    let element;

    if (props.type === ButtonType.icon && props.icon != null) {
        element =
            <div className={styles.wrapper}>
                <IconButton
                    onClick={clickHandler}
                    style={props.rootStyle ? props.rootStyle : undefined}
                    className={props.rootClassName ? props.rootClassName : styles.mainBtn}
                    disabled={props.disabled}
                >
                    {icon}
                </IconButton>
            </div>;
    } else if (props.type === ButtonType.text) {
        element = <div className={styles.wrapper}>
            <Button
                variant={"outlined"}
                disabled={props.disabled}
                size={props.btnSize ?? ButtonSize.small}
                onClick={clickHandler}
                style={props.rootStyle ? props.rootStyle : undefined}
                className={props.rootClassName ? props.rootClassName : styles.mainBtn}
            >
                {props.label}
            </Button>
        </div>;
    } else if (props.type === ButtonType.iconWithUnderText) {
        element = <div className={styles.wrapper}>
            <Button
                disabled={props.disabled}
                size={props.btnSize ?? ButtonSize.small}
                onClick={clickHandler}
                style={props.rootStyle ? props.rootStyle : undefined}
                className={props.rootClassName ? props.rootClassName : styles.mainBtnUnderText}
            >
                {icon}
                {props.label}
            </Button>
        </div>;

    } else if (props.type === ButtonType.iconWithText) {
        element = <div className={styles.wrapper}>
            <Button
                disabled={props.disabled}
                size={props.btnSize ?? ButtonSize.small}
                onClick={clickHandler}
                style={props.rootStyle ? props.rootStyle : undefined}
                className={props.rootClassName ? props.rootClassName : styles.mainTextIcon}
            >
                {icon}
                <span>{props.label}</span>
            </Button>
        </div>;

    } else {
        return null;
    }

    if (!props.tooltipDisabled) {
        element = <Tooltip title={props.tooltip ?? props.label}>{element}</Tooltip>
    }

    return element;

})