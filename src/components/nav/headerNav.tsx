import React, { useCallback, useState } from "react";
import styles from "../../styles/components/nav/nav.less";
import { ChevronRightOutlined, PlaceOutlined, RemoveOutlined, Search, SearchOffOutlined, ShoppingCartOutlined } from "@mui/icons-material";
import { Badge, Card, CardActions, CardContent, CardHeader, Divider, Drawer, Stack, Typography } from "@mui/material";
import { MainBtn } from "../../commons/MainBtn/MainBtn";
import { ButtonType, InputTextFieldType } from "../baseComponentTypes";
import { InputTextField } from "../../commons/InputTextField/InputTextField";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { NIcon } from "../../commons/NIcon/NIcon";
import { Dispatch } from "redux";
import { useDispatch } from "react-redux";
import { BaseListData } from "../baseList/BaseListContainer";
import { decrement } from "../../redux/ListElementSlice";
import { useForm } from "../../commons/baseForm/form/useForm";
import { useFormField } from "../../commons/baseForm/form/useFormFields";
import { setSearchText } from "../../redux/searchSlice";

export const HeaderNav = React.memo(() => {


    const listElement = useSelector((state: RootState) => state.listElement.value);

    const [open, setOpen] = useState<boolean>(false);

    const dispatch: Dispatch = useDispatch();

    const handleClick = useCallback((id: string, data: BaseListData) => {
        dispatch(decrement({ value: [{ id, data }] }));
    },
        [dispatch]
    )

    const form = useForm({
        searchText: useFormField(InputTextFieldType.text, { searchText: '' })
    })

    const handlerSearch = useCallback(() => {
        const data = {
            ...form.field.searchText.getValue()
        }

        dispatch(setSearchText(data.searchText))
    },
        [form.field, dispatch]
    )



    return (
        <>
            <div className={styles.headerWrapper}>
                <div className={styles.headerSearch}>
                    <InputTextField
                        inputTextFieldType={InputTextFieldType.icon}
                        icon={Search}
                        label={"Search..."}
                        formField={form.field.searchText}
                    />
                    <MainBtn
                        type={ButtonType.text}
                        label={"Search"}
                        onClick={handlerSearch}
                        icon={SearchOffOutlined}
                        rootStyle={{ paddingRight: '8px' }}
                    />
                </div>

                <div className={styles.headerIcon}>
                    <Badge badgeContent={listElement.length} color="error">
                        <MainBtn
                            type={ButtonType.icon}
                            icon={ShoppingCartOutlined}
                            color={"primary"}
                            onClick={() => setOpen(!open)}
                            disabled={listElement.length === 0}
                        />
                    </Badge>


                </div>

            </div>

            <div>
                <Drawer
                    sx={{
                        width: 350,
                        flexShrink: 0,
                        '& .MuiDrawer-paper': {
                            width: 350,
                        },
                    }}
                    anchor="right"
                    open={open}
                    onClose={() => setOpen(!open)}
                >
                    <Stack
                        direction={"row"}
                        spacing={2}
                        alignItems={"center"}
                    >
                        <MainBtn
                            type={ButtonType.icon}
                            icon={ChevronRightOutlined}
                            onClick={() => setOpen(!open)}
                            rootStyle={{ color: 'black' }}
                        />
                        <Typography variant={"h3"}>
                            Selected Events
                        </Typography>
                    </Stack>
                    <Divider />
                    <div>
                        {listElement.map((d, idx: number) => {
                            return (
                                <Card
                                    key={'headerlist_' + idx}
                                    sx={{ width: 350, margin: '8px' }}
                                >
                                    <CardHeader
                                        titleTypographyProps={
                                            { fontWeight: 'bold' }
                                        }
                                        title={d.data.title}
                                    />

                                    <CardContent>
                                        <Stack
                                            direction={"row"}
                                            spacing={2}
                                        >
                                            <NIcon
                                                icon={PlaceOutlined}
                                            />
                                            <Typography>
                                                {d.data.venue?.name}
                                            </Typography>
                                        </Stack>
                                        <Typography>
                                            Starts: {d.data.startTime}
                                        </Typography>
                                        <Typography>
                                            Ends: {d.data.endTime}
                                        </Typography>

                                    </CardContent>

                                    <CardActions>
                                        <MainBtn
                                            type={ButtonType.icon}
                                            icon={RemoveOutlined}
                                            rootStyle={{ backgroundColor: '#4f97dd', color: 'white' }}
                                            onClick={() => handleClick(d.data._id, d.data)}
                                        />
                                    </CardActions>


                                </Card>
                            );
                        })}
                    </div>
                </Drawer>

            </div>
        </>
    )

})