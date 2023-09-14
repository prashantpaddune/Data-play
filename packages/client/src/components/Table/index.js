import React, { useState } from 'react';
import {
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table';
import { useVirtual } from 'react-virtual';

import { TableContainer, StyledTable, RowCount } from './styles';
import usePreparedColumns from '../../hooks/usePreparedColumns';
import usePreparedData from '../../hooks/usePreparedData';

function Table({
       data : propData = [],
       columns : propColumns = [],
       loading = false,
       loadingRowsCount = 3,
}) {
    const { columns } = usePreparedColumns({ loading, columns: propColumns });

    const { data } = usePreparedData({
        loading,
        data: propData,
        loadingRowsCount,
    });

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel   : getCoreRowModel(),
        getSortedRowModel : getSortedRowModel(),
    });

    const tableContainerRef = React.useRef(null);

    const { rows } = table.getRowModel();

    const rowVirtualizer = useVirtual({
        parentRef : tableContainerRef,
        size      : rows.length,
        overscan  : 10,
    });

    const { virtualItems: virtualRows, totalSize } = rowVirtualizer;

    const paddingTop = virtualRows.length > 0 ? virtualRows?.[0]?.start || 0 : 0;

    const paddingBottom = virtualRows.length > 0
        ? totalSize - (virtualRows?.[virtualRows.length - 1]?.end || 0)
        : 0;

    return (
        <TableContainer ref={tableContainerRef} className={`ui-table-root`}>
            <StyledTable className="ui-table">
                <thead className="ui-table-head">
                {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id} className="ui-table-head-row">
                        {headerGroup.headers.map((header) => (
                            <th
                                key={header.id}
                                colSpan={header.colSpan}
                                style={{ width: header.getSize() }}
                                className="ui-table-head-cell"
                            >
                                {header.isPlaceholder ? null : (
                                    <div
                                        {...{
                                            className: header.column.getCanSort()
                                                ? 'cursor-pointer select-none'
                                                : '',
                                            onClick: header.column.getToggleSortingHandler(),
                                        }}
                                    >
                                        {flexRender(
                                            header.column.columnDef.header,
                                            header.getContext(),
                                        )}
                                    </div>
                                )}
                            </th>
                        ))}
                    </tr>
                ))}
                </thead>

                <tbody className="ui-table-body">
                {paddingTop > 0 && (
                    <tr>
                        <td style={{ height: `${paddingTop}px` }} />
                    </tr>
                )}

                {virtualRows.map((virtualRow) => {
                    const row = rows[virtualRow.index];
                    return (
                        <tr
                            key={row.id}
                            className="ui-table-body-row"
                        >
                            {row.getVisibleCells().map((cell) => (
                                <td
                                    key={cell.id}
                                    className="ui-table-body-cell"
                                >
                                    {flexRender(
                                        cell.column.columnDef.cell,
                                        cell.getContext(),
                                    )}
                                </td>
                            ))}
                        </tr>
                    );
                })}

                {paddingBottom > 0 && (
                    <tr>
                        <td style={{ height: `${paddingBottom}px` }} />
                    </tr>
                )}

                </tbody>
            </StyledTable>
            {virtualRows.length > 0 && (
                <RowCount>
                    Showing {virtualRows.length} rows
                </RowCount>
            )}
        </TableContainer>
    );
}

export default Table;