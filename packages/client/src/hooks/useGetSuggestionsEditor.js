import {useCallback, useEffect, useState} from "react";
import {useRequest} from "@/hooks/useRequest";


const useGetSuggestionsEditor = () => {
    const [sqlEditorData, setSqlEditorData] = useState({ query: '', executedQuery: '' });
    const [queryString, setQueryString] = useState(sqlEditorData?.query);

    const [{ data, loading, error }, trigger] = useRequest({
        url: '/api/auto-complete',
        method: 'get',
    }, { manual: true, autoCancel: false })

    const suggestionData = () => {
        try {
            trigger();
        } catch (error) {
            console.error("Error fetching schema:", error);
        }
    }

    const handleChangeSqlEditorQuery = (values) => {
        setQueryString(values);
        setSqlEditorData({
            ...sqlEditorData,
            query         : values,
            executedQuery : values,
        });
    };

    const getSelection = useCallback((selected) => {
        const selectedQueryRange = selected.getAllRanges()[0];

        if (!selected.isEmpty()) {
            const queryArray = sqlEditorData?.query.split('\n');

            let selectedQueryString = '';

            for (let i = 0; i < queryArray.length; i += 1) {
                if (i === selectedQueryRange.start.row && i === selectedQueryRange.end.row) {
                    selectedQueryString += `${queryArray[i].substr(
                        selectedQueryRange.start.column,
                        selectedQueryRange.end.column - selectedQueryRange.start.column,
                    )}`;
                } else if (i === selectedQueryRange.start.row) {
                    selectedQueryString += `${queryArray[i].substr(
                        selectedQueryRange.start.column,
                    )}`;
                } else if (i > selectedQueryRange.start.row && i < selectedQueryRange.end.row) {
                    selectedQueryString += `\n${queryArray[i]}`;
                } else if (i === selectedQueryRange.end.row) {
                    selectedQueryString += `\n${queryArray[i].substr(
                        0,
                        selectedQueryRange.end.column,
                    )}`;
                }
            }
            setQueryString(selectedQueryString);
        } else {
            setQueryString(sqlEditorData?.query);
        }
    }, [JSON.stringify(sqlEditorData.query)]);

    useEffect(() => {
        suggestionData();
    },[]);

    useEffect(() => {
        setSqlEditorData({
            ...sqlEditorData,
            executedQuery: queryString,
        });
    }, [queryString]);


    return {
        handleChangeSqlEditorQuery,
        getSelection,
        sqlEditorData,
        suggestionData: data,
        suggestionloading: loading
    }
}
export default useGetSuggestionsEditor;