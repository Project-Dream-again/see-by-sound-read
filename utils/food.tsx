import React from 'react';

interface MenuItem {
  [menu: string]: string | number;
}

interface MenuData {
  [category: string]: MenuItem;
}

interface TableComponentProps {
  data: MenuData;
}

const TableComponent: React.FC<TableComponentProps> = ({ data }) => {
  return (
    <table>
      <tbody>
        {Object.entries(data).map(([category, menus]) => (
          <>
            <tr key={category}>
              <td rowSpan={Object.keys(menus).length}>{category}</td>
              <td>{Object.keys(menus)[0]}</td>
              <td>{Object.values(menus)[0]}</td>
            </tr>
            {Object.entries(menus)
              .slice(1)
              .map(([menu, price]) => (
                <tr key={menu}>
                  <td></td>
                  <td>{menu}</td>
                  <td>{price}</td>
                </tr>
              ))}
          </>
        ))}
      </tbody>
    </table>
  );
};

export default TableComponent;
