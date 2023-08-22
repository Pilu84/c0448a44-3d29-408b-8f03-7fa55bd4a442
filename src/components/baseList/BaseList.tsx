import { AddOutlined, PlaceOutlined } from "@mui/icons-material";
import { Avatar, Card, CardActions, CardContent, CardHeader, CardMedia, Skeleton, Typography } from "@mui/material";
import { yellow } from "@mui/material/colors";
import React, { useCallback } from "react";
import { NIcon } from "../../commons/NIcon/NIcon";
import { BaseListData, BaseListGroupData } from "./BaseListContainer";
import styles from '../../styles/components/list/list.less';
import { MainBtn } from "../../commons/MainBtn/MainBtn";
import { ButtonSize, ButtonType } from "../baseComponentTypes";
import dayjs from 'dayjs'
import { Flageng } from "../../commons/img/Flageng";
import { useDispatch } from "react-redux";
import { increment } from "../../redux/ListElementSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Dispatch } from "redux";

export interface BaseListProps {
    readonly data: BaseListGroupData | null;
    readonly selectedLocation: string;
}

export const BaseList = React.memo(function BaseList(props: BaseListProps) {

    const { data, selectedLocation } = props;

    const groupArray = data ? Object.keys(data) : [];

    const dispatch: Dispatch = useDispatch();

    const listElement = useSelector((state: RootState) => state.listElement.value);


    const handleClick = useCallback((id: string, data: BaseListData) => {
        dispatch(increment({ value: [{ id, data }] }));
    },
        [dispatch]
    )

    return (

        <div className={styles.baseListWrapper}>

            <div className={styles.locationWrapper}>
                <MainBtn
                    type={ButtonType.iconWithText}
                    icon={Flageng}
                    label={selectedLocation}
                    btnSize={ButtonSize.large}
                    tooltipDisabled={true}
                    rootStyle={{ color: 'black' }}
                />
            </div>

            {!data &&
                <Typography color="error">Keine Daten verfügbar</Typography>
            }

            {data &&
                groupArray.map((group: string, idx: number) => {
                    const dateAsName = dayjs(group).format('ddd DD MMM YYYY').toUpperCase();

                    return (
                        <div key={'group_' + idx}>
                            <div className={styles.cardGroup}>
                                <Typography color={'#1298dd'} variant={"h3"}>
                                    {dateAsName}
                                </Typography>
                            </div>


                            <div className={styles.cardWrapper}>
                                {data[group].data?.map((d: BaseListData, idx: number) => {
                                    const remove = listElement.findIndex((v) => v.id === d._id);
                                    if (remove !== -1) {
                                        return null;
                                    }
                                    return (
                                        <Card
                                            key={'list_' + idx}
                                            sx={{ width: 380, margin: '8px' }}
                                        >
                                            <CardHeader

                                                avatar={
                                                    <Avatar
                                                        sx={{ bgcolor: yellow[500] }}
                                                        aria-label="recipe"
                                                    >
                                                        R
                                                    </Avatar>
                                                }
                                                titleTypographyProps={
                                                    { fontWeight: 'bold' }
                                                }
                                                title={d.title}
                                            />
                                            {d.flyerFront ?
                                                <CardMedia
                                                    component={"img"}
                                                    height={"450"}
                                                    image={d.flyerFront ?? undefined}
                                                    alt={d.title ?? ''}
                                                    sx={{ objectFit: 'fill' }}
                                                /> :
                                                <Skeleton variant={"rounded"} height={450} />
                                            }


                                            <CardContent>
                                                <a
                                                    target={'_blank'}
                                                    href={d.venue?.direction ?? undefined}
                                                    className={styles.link}
                                                    rel="noreferrer"
                                                >
                                                    <div className={styles.cardContentWrapper}>
                                                        <NIcon
                                                            icon={PlaceOutlined}
                                                        />
                                                        <Typography>
                                                            {d.venue?.name}
                                                        </Typography>
                                                    </div>
                                                </a>
                                                <Typography>
                                                    | Starts: {d.startTime}
                                                </Typography>
                                                <Typography>
                                                    | Ends: {d.endTime}
                                                </Typography>

                                            </CardContent>

                                            <CardActions
                                                sx={{ display: 'flex', justifyContent: 'flex-end' }}
                                            >
                                                <MainBtn
                                                    type={ButtonType.icon}
                                                    icon={AddOutlined}
                                                    rootStyle={{ backgroundColor: '#4f97dd', color: 'white' }}
                                                    onClick={() => handleClick(d._id, d)}
                                                />
                                            </CardActions>


                                        </Card>
                                    )

                                })
                                }
                            </div>
                        </div>

                    )
                })
            }
        </div>
    )
})