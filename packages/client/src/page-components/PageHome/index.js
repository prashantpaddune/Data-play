import React from "react";
import HeaderSection from "@/components/Header";
import useGetQueryExecute from "@/hooks/useGetQueryExecute";
import AceSqlEditor from "@/components/AceEditor";
import useGetSuggestionsEditor from "@/hooks/useGetSuggestionsEditor";
import useGetResultColumns from "@/hooks/useGetResultColumns";
import Table from "@/components/Table";
import Loader from "@/components/Loader";
import { Wrapper, TableLoader } from "@/page-components/PageHome/styles";
import Error from "@/components/Error";

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
        handleOnKeyDown = () => {},
        loading = false,
        queryData = {},
        error = {},
    } = useGetQueryExecute({ query: executedQuery });

    const { columns = [], query_results = [] } = queryData || {};

    const columnsData = useGetResultColumns({ columns : columns });

    if (suggestionloading) {
        return (
            <Wrapper>
                <Loader margin={10}/>
            </Wrapper>
        );
    }

    const renderTable = () => {
        if (loading) {
            return (
                <TableLoader>
                    <Loader />
                </TableLoader>
            );
        }

        if (error.length > 0) {
            return (
                <TableLoader>
                    <Error error={error}/>
                </TableLoader>
            );
        }

        return (
            <Table
                columns={columnsData}
                data={query_results}
                loading={true}
                loadingRowsCount={10}
            />
        );
    }

    return (
        <section onKeyDown={(e) => handleOnKeyDown(e)}>
            <HeaderSection onClick={handleExecute} loading={loading}/>
            <AceSqlEditor
                onChange={handleChangeSqlEditorQuery}
                value={query}
                suggestionData={suggestionData}
                getSelection={getSelection}
            />
            {renderTable()}
        </section>
    )
};
