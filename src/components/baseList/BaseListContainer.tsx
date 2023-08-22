import React, { useCallback, useEffect, useState } from "react";
import { BaseList } from "./BaseList";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

export interface BaseListData {
    readonly _id: string;
    readonly title?: string | null;
    readonly flyerFront?: string | null;
    readonly attendin?: number | null;
    readonly date: string;
    readonly startTime?: string | null;
    readonly endTime?: string | null;
    readonly contentUrl?: string | null;
    readonly venue?: {
        readonly id: string;
        readonly name?: string | null;
        readonly contentUrl?: string | null;
        readonly live?: boolean | null;
        readonly direction?: string | null;
    }
    readonly pick?: {
        readonly id: string;
        readonly blurb?: string | null;
    }
    readonly artist?: ReadonlyArray<
        {
            id: string;
            name?: string | null;
            _id: {
                $oid: string;
            }
        }
    >
    readonly city?: string | null;
    readonly country?: string | null;
    readonly private?: boolean | null;
    readonly __v?: number | null;

}


export type BaseListGroupData = {
    [key: string]: { data: BaseListData[] };
}

export interface BaseListContainerInterface {

}


export const BaseListContainer = React.memo(function BaseListContainer(_props: BaseListContainerInterface) {


    const [baseData, setBaseData] = useState<BaseListGroupData | null>(null);

    const searchText = useSelector((state: RootState) => state.searchElement.value);

    console.log('A searchText: ', searchText);


    const getBaseData = useCallback(() => {
        axios.get('https://teclead-ventures.github.io/data/london-events.json').then(
            (res) => {
                const data = res.data.sort((a: BaseListData, b: BaseListData) => {
                    const aDate = new Date(a.date);
                    const bDate = new Date(b.date);

                    if (aDate < bDate) {
                        return -1;
                    }
                    if (aDate > bDate) {
                        return 1;
                    }

                    return 0;
                });


                let groupedData: BaseListGroupData = {};


                data.forEach((data: BaseListData) => {
                    if (!groupedData[data.date]) {
                        groupedData[data.date] = {
                            data: [data]
                        }
                    } else {
                        groupedData[data.date].data.push(data);
                    }
                })



                setBaseData(groupedData)
            }
        )
    },
        []
    );

    useEffect(() => {
        getBaseData();
    },
        [getBaseData]
    )

    useEffect(() => {
        if (searchText && searchText !== '' && baseData) {
            const searchedGroupData: BaseListGroupData = {};
            const groupArray = Object.keys(baseData);
            groupArray.forEach((group: string) => {
                const searchedData = baseData[group].data.filter((data) => {
                    if (data.title?.toUpperCase().search(searchText.toUpperCase()) !== -1) {
                        return true;
                    } else {
                        return false;
                    }
                })

                if (searchedData.length !== 0) {
                    if (!searchedGroupData[group]) {
                        searchedGroupData[group] = {
                            data: searchedData
                        }
                    } else {
                        searchedGroupData[group].data.push(searchedData[0]);
                    }
                }
            })

            setBaseData(searchedGroupData);
        } else if (searchText === '') {
            getBaseData();
        }
    },
        [searchText, getBaseData]
    )

    return (
        <BaseList
            data={baseData}
            selectedLocation={'London'}
        />
    )
})