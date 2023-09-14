import {useRequest} from "@/hooks/useRequest";


const useGetQueryExecute = ({ query = '' }) => {
    const [{ data, loading, error }, trigger] = useRequest({
        url: '/api/query',
        method: 'POST',
    }, { manual: true, autoCancel: false })

    const handleExecute = async () => {
        try {
            await trigger({
                data: {
                    query: query
                }
            });
        } catch (error) {
            console.error("Error fetching schema:", error);
        }
    }

    const handleOnKeyDown = (e) => {
        if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
            e.preventDefault();
            handleExecute();
        }
    };

    return {
        handleExecute,
        loading,
        queryData: data,
        error: error?.response?.data?.error,
        handleOnKeyDown
    }

}

export default useGetQueryExecute;