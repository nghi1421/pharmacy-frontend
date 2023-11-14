import { forwardRef } from "react";

const ComponentToPrint = forwardRef((props, ref) => {
    return (
      <div ref={ref} style={{ padding: 4, margin: 4 }}>
        <h2 style={{color: "green"}}>Attendance</h2>
        <table>
          <thead>
            <th>S/N</th>
            <th>Name</th>
            <th>Email</th>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Njoku Samson</td>
              <td>samson@yahoo.com</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Ebere Plenty</td>
              <td>ebere@gmail.com</td>
            </tr>
            <tr>
              <td>3</td>
              <td>Undefined</td>
              <td>No Email</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
})

export default ComponentToPrint