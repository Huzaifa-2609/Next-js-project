import React from "react";

const Table = (props) => {
  const { coins } = props;
  return (
    <div
      className="d-flex align-items-center flex-column"
      style={{ padding: "0 5%" }}
    >
      <table className="table table-striped">
        <thead>
          <tr>
            <th className="p-3" scope="col">#</th>
            <th className="p-3" scope="col">Name</th>
            <th className="p-3" scope="col">Price</th>
            <th className="p-3" scope="col">Change</th>
          </tr>
        </thead>
        <tbody>
          {coins.map((a) => {
            return (
              <tr key={a.image}>
                <th scope="row" className="p-3">
                  {coins.indexOf(a) + 1}
                </th>
                <td className="p-3">
                  <img src={a.image} height="25px" alt="" />
                  <span className="ms-2">{a.name}</span>
                </td>
                <td className="p-3">${a.current_price}</td>
                <td
                  className={
                    a.price_change_percentage_24h < 1
                      ? "text-danger p-3"
                      : "text-success p-3"
                  }
                >
                  {a.price_change_percentage_24h}%
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
