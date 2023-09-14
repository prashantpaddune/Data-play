import React, { useMemo } from 'react';
import styled from 'styled-components';
import getNumberFormat from "@/utils/get-number-formatted";

function useGetResultColumns({ columns = [], loading }) {
    return useMemo(() => columns.map((column, index) => {
        const header = (
            <Head key={`${column.key}_${index + 1}`} bold>
                {column.key}
            </Head>
        );

        const accessorFn = (item) => {
            const itemValue = item?.[column.key];

            if (typeof itemValue === 'boolean') {
                return <Data>{itemValue.toString() || <Dash>-</Dash>}</Data>;
            }

            if (typeof itemValue === 'number') {
                return <Data>{getNumberFormat(itemValue)}</Data>;
            }

            if (typeof itemValue === 'string') {
                return <Data>{itemValue || <Dash>-</Dash>}</Data>;
            }

            if (itemValue === null) {
                return <Data><Dash>-</Dash></Data>;
            }
            if (Array.isArray(itemValue)) {
                return <Data>{JSON.stringify(itemValue) || <Dash>-</Dash>}</Data>;
            }
            if (typeof itemValue === 'object') {
                return <Data>{JSON.stringify(itemValue) || <Dash>-</Dash>}</Data>;
            }
            return <Data>{itemValue}</Data>;
        };

        return {
            header,
            accessorFn,
            key         : `${column.key}_${index + 1}`,
            accessorKey : `${column.key}_${index + 1}`,
            id          : `${column.key}_${index + 1}`,
            cell        : (info) => info.getValue(),
        };
    }),
        [columns, getNumberFormat, loading],
    );
}


const Head = styled.div`
	display: flex;
	align-items: center;
	font-weight: ${({ bold }) => (bold ? 'bold' : 'normal')};
	color: #4f4f4f;
	margin: 0 12px;
	justify-content: center;
	text-align: center;
	width: 100%;
	white-space: nowrap;
`;

const Data = styled(Head)`
	width: 100%;
	max-width: 200px;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	display: inline-block;
`;

const Dash = styled(Head)`
	justify-content: center;
`;

export default useGetResultColumns;