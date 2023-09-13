import HeaderSection from "@/components/Header";
import useGetQueryExecute from "@/hooks/useGetQueryExecute";
import AceSqlEditor from "@/components/AceEditor";
import React from "react";
import useGetSuggestionsEditor from "@/hooks/useGetSuggestionsEditor";

export default function PageHome() {
    const { handleChangeSqlEditorQuery, getSelection, sqlEditorData, suggestionData, suggestionloading } = useGetSuggestionsEditor();

    const { query = '', executedQuery = '' } = sqlEditorData || {};

    const { handleExecute, loading} = useGetQueryExecute({ query: executedQuery });

    const renderEditor = () => {
        if (suggestionloading) {
            return <p>Loading editor...</p>
        }

        return (
            <AceSqlEditor
                onChange={handleChangeSqlEditorQuery}
                value={query}
                suggestionData={suggestionData}
                getSelection={getSelection}
            />
        )
    }

    return (
        <section>
            <HeaderSection onClick={handleExecute} loading={loading}/>
            {renderEditor()}
        </section>
    )
};
