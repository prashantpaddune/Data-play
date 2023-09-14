import styled from 'styled-components';

export const TableContainer = styled.div`
  width: 100%;
  overflow: auto;
  height: calc(100vh - 500px);
  font-family: 'Poppins', sans-serif;
  background-color: #f0f0f0;
`;

export const StyledTable = styled.table`
  width: 100%;
  height: 100vh;
  border-collapse: collapse;
  border-spacing: 0;
  
  .ui-table-body {
    height: 100px;
    overflow-y: scroll;
  }
  
  .ui-table-head {
    position: sticky;
    top: 0;
  }
  
  .ui-table-head-cell {
    background-color: #2f3640;
    div {
      color: #ecf0f1;
    }
  }

  th, td {
    text-align: center;
    padding: 8px 16px;
    border-bottom: 1px solid #e0e0e0;
    word-wrap: break-word;
  }

  thead {
    th {
      background-color: #f7f7f7;
      font-weight: bold;
      white-space: nowrap;
    }
    
    tr {
      background-color: #2f3640;
    }
  }
  }

  tbody {
    tr {
      transition: background-color 0.2s ease-in-out;
      
      td {
        border-bottom: 0.5px solid #4f4f4f;
      }
      
      &:hover {
        background-color: #f5f5f5;
    }
  }

  @media (max-width: 768px) {
    th, td {
      padding: 5px 8px;
    }
  }
`;

export const RowCount = styled.p`
  margin: 12px 0;
  font-size: 16px;
  font-weight: bold;
  text-align: right; 
  padding-right: 20px;
  font-family: 'Poppins', sans-serif;
` ;
