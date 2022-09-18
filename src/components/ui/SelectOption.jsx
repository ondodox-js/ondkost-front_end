import React from 'react';

function SelectOption(props) {
   return (
      <select
         className="px-2 py-1.5 w-full rounded focus:outline-none text-app-600 border-2 border-transparent focus:border-app-300"
         onChange={props.handleOnChange}
         defaultValue="0"
      >
         <option value="0" disabled>
            Please select option!
         </option>
         {props.items.map(item => (
            <option value={item.id} key={item.id}>
               {item.typeName || item.roomNumber.toString().padStart(3, '0')}
            </option>
         ))}
      </select>
   );
}

export default SelectOption;
