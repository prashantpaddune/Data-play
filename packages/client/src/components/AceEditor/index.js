import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/ext-searchbox';
import 'ace-builds/src-noconflict/mode-mysql';
import 'ace-builds/src-noconflict/theme-xcode';
import langTools from 'ace-builds/src-noconflict/ext-language_tools';

function AceSqlEditor({ onChange = () => {}, value = '', suggestionData = {}, getSelection = () => {}}) {

    const staticWordCompleter = {
        getCompletions(editor, session, pos, prefix, callback) {
            let completions = [];

            callback(null, (suggestionData?.tables || []).map((word) => ({
                    caption : word,
                    value   : word,
                    meta    : 'table',
                })),
            );

            callback(null, (suggestionData?.columns || []).map((word) => ({
                    caption : word,
                    value   : word,
                    meta    : 'column',
                })),
            );

            callback(null, completions);
        },
    };

    langTools.setCompleters([langTools.keyWordCompleter, staticWordCompleter]);

    return (
        <AceEditor
            className="hide ace-editor"
            placeholder="Write your SQL Query here..."
            mode="mysql"
            theme="twilight"
            name="UNIQUE_ID_OF_DIV"
            onChange={onChange}
            fontSize={16}
            showPrintMargin={false}
            showGutter
            highlightActiveLine
            width="100%"
            height={360}
            resize="vertical"
            setOptions={{
                enableBasicAutocompletion : true,
                enableLiveAutocompletion  : true,
                enableSnippets            : true,
                showLineNumbers           : true,
                tabSize                   : 2,
            }}
            setReadOnly
            editorProps={{ $blockScrolling: true }}
            value={value}
            onSelectionChange={getSelection}
            style={{ borderRadius: 4, marginTop: 5 }}
        />
    );
}

export default AceSqlEditor;