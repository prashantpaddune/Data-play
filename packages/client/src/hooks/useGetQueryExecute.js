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

    return {
        handleExecute,
        loading,
        data,
    }

}

export default useGetQueryExecute;