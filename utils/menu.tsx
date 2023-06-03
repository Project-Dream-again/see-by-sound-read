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
  const sortedData = Object.entries(data).sort(([categoryA], [categoryB]) =>
    categoryA.localeCompare(categoryB)
  );

  return (
    <table>
      <thead>
        <tr>
          <th>Category</th>
          <th>Menu</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        {sortedData.map(([category, menus]) => {
          const sortedMenus = Object.entries(menus).sort(([menuA], [menuB]) =>
            menuA.localeCompare(menuB)
          );

          return (
            <React.Fragment key={category}>
              {sortedMenus.map(([menu, price], index) => (
                <tr key={`${category}-${menu}`}>
                  {index === 0 && (
                    <td rowSpan={sortedMenus.length}>{category}</td>
                  )}
                  <td>{menu}</td>
                  <td>{price}</td>
                </tr>
              ))}
            </React.Fragment>
          );
        })}
      </tbody>
    </table>
  );
}; 

export default TableComponent;
