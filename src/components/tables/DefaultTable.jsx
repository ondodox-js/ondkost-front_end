import React from 'react';
export default function DefaultTable({ data }) {
   return (
      <table className="w-full table-fixed">
         <thead>
            <tr className="capitalize">
               {Object.keys(data[0])
                  .filter(e => e !== 'id')
                  .map(e => (
                     <th key={e}>{e}</th>
                  ))}
            </tr>
         </thead>
         <tbody>
            {data.map((item, index) => (
               <tr key={index}>
                  {Object.values(item)
                     .filter((e, i) => i !== 0)
                     .map((val, index) => (
                        <td key={index}>{val}</td>
                     ))}
               </tr>
            ))}
         </tbody>
      </table>
   );
}
