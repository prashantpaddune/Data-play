import { useMemo } from 'react';

const usePreparedData = ({ loading, data, loadingRowsCount }) => {
    const newData = useMemo(() => {
        return data;
    }, [data, loading]);

    return { data: newData };
};

export default usePreparedData;