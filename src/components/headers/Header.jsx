import { NavigationClient } from '../navigations';

export default function Header({ user, changeUser }) {
   return (
      <header className="flex justify-center bg-app-600 text-app-400 mb-4 sticky top-0 z-10">
         <div className="max-w-6xl w-full flex justify-between p-2">
            <h3 className="text-lg text-app-400 font-bold">
               <span className="text-white mr-1">OND</span>
               <span>KOST</span>
            </h3>
            {!user.isOwner && <NavigationClient />}
            <span
               className="cursor-pointer select-none"
               onClick={() => changeUser({ ...user, isOwner: !user.isOwner })}
            >
               {user.isOwner ? 'Owner' : 'Client'}
            </span>
         </div>
      </header>
   );
}
