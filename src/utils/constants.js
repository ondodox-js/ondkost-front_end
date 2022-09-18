import {
   ActiveRoomSection,
   BookingSection,
   NewSection,
   RoomSection,
   RoomTypeSection,
} from '../components/contents/master';
import { About, Contact, Home } from '../pages/client';
import { Dashboard, Master } from '../pages/owner';

export const navClient = [
   {
      name: 'home',
      path: '/',
      component: <Home />,
   },
   {
      name: 'about',
      path: '/about',
      component: <About />,
   },
   {
      name: 'contact',
      path: '/contact',
      component: <Contact />,
   },
];

export const navOwner = [
   {
      id: 1,
      name: 'dashboard',
      to: '/dashboard',
      path: '/dashboard/*',
      component: <Dashboard>dashboard</Dashboard>,
      childs: [
         {
            name: 'New',
            to: '/dashboard/new',
            path: '/new',
            element: <NewSection>New</NewSection>,
         },
         {
            name: 'Active Room',
            to: '/dashboard/active-room',
            path: '/active-room',
            element: <ActiveRoomSection>Active Room</ActiveRoomSection>,
         },
         {
            name: 'Booking',
            to: '/dashboard/booking',
            path: '/booking',
            element: <BookingSection>Booking</BookingSection>,
         },
      ],
   },
   {
      id: 2,
      name: 'master data',
      to: '/master-data',
      path: '/master-data/*',
      component: <Master>master data</Master>,
      childs: [
         {
            name: 'Room type',
            to: '/master-data/room-type',
            path: '/room-type',
            element: <RoomTypeSection>Room Type</RoomTypeSection>,
         },
         {
            name: 'Room',
            to: '/master-data/room',
            path: '/room',
            element: <RoomSection>Room</RoomSection>,
         },
      ],
   },
];
