import React from "react";
import HeaderSection from "@/components/Header";
import useGetQueryExecute from "@/hooks/useGetQueryExecute";
import AceSqlEditor from "@/components/AceEditor";
import useGetSuggestionsEditor from "@/hooks/useGetSuggestionsEditor";
import useGetResultColumns from "@/hooks/useGetResultColumns";
import Table from "@/components/Table";
import Loader from "@/components/Loader";
import { Wrapper } from "@/page-components/PageHome/styles";

export default function PageHome() {
    const {
        handleChangeSqlEditorQuery = () => {},
        getSelection = () => {},
        sqlEditorData = {},
        suggestionData = {},
        suggestionloading = false
    } = useGetSuggestionsEditor();

    const { query = '', executedQuery = '' } = sqlEditorData || {};

    const {
        handleExecute = () => {},
        loading = false,
        queryData = {}
    } = useGetQueryExecute({ query: executedQuery });

    const { columns = [], query_results = [] } = queryData || {};

    const columnsData = useGetResultColumns({ columns : columns });

    if (suggestionloading) {
        return <Wrapper><Loader /></Wrapper>
    }

    return (
        <section>
            <HeaderSection onClick={handleExecute} loading={loading}/>
            <AceSqlEditor
                onChange={handleChangeSqlEditorQuery}
                value={query}
                suggestionData={suggestionData}
                getSelection={getSelection}
            />
            <Table
                columns={columnsData}
                data={query_results}
                loading={true}
                loadingRowsCount={10}
            />
        </section>
    )
};
