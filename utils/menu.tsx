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
    <table className="rounded-table"> {/* 둥근 표를 위한 CSS 클래스 적용 */}
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
                    <td rowSpan={sortedMenus.length} style={{ verticalAlign: 'top' }}>{category}</td>
                  )}
                  <td>{menu}</td>
                  <td>{price}</td>
                </tr>
              ))}
              <tr style={{ height: '20px' }}></tr> {/* 한 종류가 지나가면 표가 한 줄 띄워질 수 있도록 빈 줄 추가 */}
            </React.Fragment>
          );
        })}
      </tbody>
    </table>
  );
};

export default TableComponent;
