import { Navigate, RouteObject, createBrowserRouter } from "react-router-dom";

import VoidLayout from "@/layouts/Void";
import DefaultLayout from "@/layouts/Default";

import Auth from "@/components/common/Auth";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import { LiveStream } from "@/pages/LSHomepage";
import { ErrorPage } from "pages/error-page";
import Homepage from "@/pages/Homepage";
import VideoCall from "@/pages/VideoCall";
import RegisterSuccess from "@/pages/RegisterSuccess";
import Help from "@/pages/Help";
import WaitingRoomPage from "@/pages/WaitingRoom";
import RoomLayout from "@/layouts/Room";
import { MyProfile } from "@/pages/my-profile";
import { Paths } from "@/constants/path";
import MainLayout from "@/layouts/MainLayout";
import { SchedulePage } from "@/pages/schedule-page";
import LSWaitingRoom from "@/pages/LSWaitingRoom";
import LSStreamer from "@/pages/LSStreamer";
import LSViewer from "@/pages/LSViewer";
import CreateLiveStream from "@/pages/CreateLivestream";
import { EndLiveStream } from "@/pages/EndLivestream";
import LiveStreamDetail from "@/pages/LivestreamDetail";
import { LiveStreamLayout } from "@/layouts/LiveStreamLayout";
import { RemoveMeeting } from "@/pages/RemoveMeeting";
import LiveStreamFilter from "@/pages/LivestreamFilter";
import { RemovedPeer } from "@/pages/RemovedPeer";
import LSSchedule from "@/pages/LSSchedule";
import LSRemovedSchedule from "@/pages/LSRemovedSchedule";

export const routes: RouteObject[] = [
  {
    element: <VoidLayout />,
    children: [
      {
        element: <RoomLayout />,
        children: [
          {
            element: <DefaultLayout />,
            children: [
              {
                path: Paths.RegisterSuccess,
                element: <RegisterSuccess />,
              },
              {
                path: Paths.Help,
                element: <Help />,
              },
              {
                element: <MainLayout />,
                children: [
                  {
                    path: Paths.Login,
                    element: <Login />,
                  },
                  {
                    path: Paths.Register,
                    element: <Register />,
                  },
                ],
              },
              {
                path: Paths.Home,
                element: <MainLayout />,
                errorElement: <Navigate to={Paths.Error} />,
                children: [
                  {
                    index: true,
                    element: <Homepage />,
                  },
                ],
              },
              {
                path: Paths.MyProfile,
                element: <Auth unAuthElement={<MainLayout />} />,
                errorElement: <Navigate to={Paths.Error} />,
                children: [
                  {
                    index: true,
                    element: <MyProfile />,
                  },
                ],
              },
              {
                path: Paths.SchedulePageWithoutId,
                element: <Auth unAuthElement={<MainLayout />} />,
                errorElement: <Navigate to={Paths.Error} />,
                children: [
                  {
                    index: true,
                    element: <SchedulePage />,
                  },
                  {
                    path: Paths.SchedulePage,
                    element: <SchedulePage />,
                  },
                ],
              },
              {
                path: Paths.WaitingRoom,
                element: <WaitingRoomPage />,
              },

              {
                element: <LiveStreamLayout />,
                path: Paths.LiveStream,
                children: [
                  {
                    path: Paths.LiveStream,
                    element: <LiveStream />,
                  },
                  {
                    path: Paths.LiveStreamDetail,
                    element: <LiveStreamDetail />,
                  },
                ],
              },
              {
                element: <LiveStreamLayout />,
                path: Paths.LiveStreamFilter,
                children: [{ path: Paths.LiveStreamFilter, element: <LiveStreamFilter /> }],
              },

              {
                path: Paths.RemoveMeeting,
                element: <RemoveMeeting />,
              },

              {
                path: Paths.RemovedPeer,
                element: <RemovedPeer />,
              },

              {
                path: Paths.EndLiveStream,
                element: <EndLiveStream />,
              },
              {
                path: Paths.CreateLiveStream,
                element: <CreateLiveStream />,
              },
              { path: Paths.LSWaitingRoom, element: <LSWaitingRoom /> },
              {
                path: Paths.LSSchedule,
                element: <LSSchedule />,
              },
              {
                path: Paths.LSRemove,
                element: <LSRemovedSchedule />,
              },
              {
                path: Paths.LSScheduleDetail,
                element: <LSSchedule />,
              },
              {
                path: Paths.Error,
                element: <ErrorPage />,
              },
            ],
          },
          {
            path: Paths.VideoCallWithoutId,
            element: <Navigate to={Paths.Home} />,
          },
          {
            path: Paths.VideoCall,
            element: <VideoCall />,
          },
          {
            path: Paths.LSStreamer,
            element: <LSStreamer />,
          },
          {
            path: Paths.LSViewer,
            element: <LSViewer />,
          },
          {
            path: Paths.WaitingRoomWithoutId,
            element: <Navigate to={Paths.Home} />,
          },
        ],
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
