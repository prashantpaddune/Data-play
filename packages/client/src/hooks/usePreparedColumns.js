import { useMemo } from 'react';

const usePreparedColumns = ({ columns, loading }) => {
    const newColums = useMemo(() => {
        if (loading) {
            return columns.map((col) => ({
                ...col,
                accessor: () => <h1 width="80" >LOADING...</h1>,
            }));
        }
        return columns;
    }, [loading, columns]);

    return { columns: newColums };
};

export default usePreparedColumns;