import {useRequest} from "@/hooks/useRequest";


const useGetQueryExecute = () => {
    const [{ data, loading, error }, trigger] = useRequest({
        url: '/query',
        method: 'POST',
    }, { manual: true, autoCancel: false })

    const handleExecute = async () => {
        try {
            await trigger({
                data: {
                    query: "select * from clients"
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