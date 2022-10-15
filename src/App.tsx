import React from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const dataSource = [
    {
      p_key: "P001",
      m_key: "M001",
      w_key: "W001",
      pa_key: "P001",
    },
    {
      p_key: "P001",
      m_key: "M001",
      w_key: "W001",
      pa_key: "P002",
    },

    {
      p_key: "P001",
      m_key: "M001",
      w_key: "W002",
      pa_key: "P003",
    },
    {
      p_key: "P001",
      m_key: "M001",
      w_key: "W002",
      pa_key: "P004",
    },
    
  ];
  const refTable = React.useRef<HTMLTableElement>(null);
  const [renderHTML, setRenderHTML] = React.useState<any>("");

  const mergeCellTable = (column: string | Array<string>): any => {
    var columnList = [];
    const paramIsArray = (obj : any) => {
      const b = Object.prototype.toString.call(obj) === "[object Array]";
      return b;
    };
    if (!paramIsArray(column)) {
      columnList.push(column);
    } else {
      columnList = column as Array<string>;
    }
    if (!refTable.current) return null;
    columnList.forEach((col: any) => { 
      const cells = refTable.current!.querySelectorAll(
        `td[column-name='${col}']`
      );
      let currentValue = cells[0].getAttribute("cell-key"); 
      cells &&
        Array.from(cells).map((cell: any, idx) => {
          if (idx !== 0) {
            const cellValue = cell.getAttribute("cell-key");
            if (cellValue !== currentValue) {
              currentValue = cellValue;
            } else {
              const preCell = Array.from(cells).find(
                (cell) => cell.getAttribute("cell-key") === cellValue
              );
              const newColSpan = (
                Number(preCell!.getAttribute("rowspan")) + 1
              ).toString();
              preCell && preCell.setAttribute("rowspan", newColSpan);
              //cell.style.display = "none";
              cell.remove();
            }
          }
        });
    });
  };

  React.useEffect(() => {
    setRenderHTML(
      dataSource.map((item: any) => {
        return (
          <tr key={Math.random().toString()}>
            <td rowSpan={1} column-name={"p"} cell-key={item.p_key}>
              {item.p_key}
            </td>
            <td rowSpan={1} column-name={"m"} cell-key={item.m_key}>
              {item.m_key}
            </td>
            <td
              rowSpan={1}
              column-name={"w"}
              cell-key={item.w_key}
            >
              {item.w_key}
            </td>
            <td rowSpan={1} column-name={"pa"} cell-key={item.pa_key}>
              {item.pa_key}
            </td>
          </tr>
        );
      })
    );
  }, []);

  React.useEffect(() => {
    if (renderHTML) {
      mergeCellTable(["p", "m", "w"]);
    }
  }, [renderHTML]);

  return (
    <div className="App">
      <table ref={refTable}>
        <thead>
          <tr>
            <th>p</th>
            <th>m</th>
            <th>w</th>
            <th>pa</th>
          </tr>
        </thead>
        <tbody>{renderHTML}</tbody>
      </table>
    </div>
  );
}

export default App;
