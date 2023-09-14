import styled from 'styled-components';

export const TableContainer = styled.div`
  width: 100%;
  overflow-x: auto;
  font-family: 'Poppins', sans-serif;
`;

export const StyledTable = styled.table`
  width: 100%; 
  border-collapse: collapse;
  border-spacing: 0;

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
  }

  tbody {
    tr {
      &:hover {
        background-color: #f5f5f5; 
      }
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
  padding-right: 10px;
` ;
