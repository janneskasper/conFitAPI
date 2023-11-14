import {
  AuthBindings, Authenticated,
  Refine,
} from "@refinedev/core";
import {
  ThemedLayoutV2,
  ErrorComponent,
} from "@refinedev/mui";
import { useAuth0 } from "@auth0/auth0-react";
import routerBindings, {
  UnsavedChangesNotifier,
  NavigateToResource, CatchAllNavigate, DocumentTitleHandler
} from "@refinedev/react-router-v6";
import dataProvider from "@refinedev/simple-rest";
import axios, {AxiosRequestConfig} from "axios";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { MuiInferencer } from "@refinedev/inferencer/mui";
import {Login} from "./pages/login";

const axiosInstance = axios.create();
axiosInstance.interceptors.request.use((request: AxiosRequestConfig) => {
  // Retrieve the token from local storage
  let apiAuth = localStorage.getItem("api_auth");
  if (!apiAuth){
    return request;
  }
  apiAuth = JSON.parse(apiAuth);

  if (request.headers) {
    // @ts-ignore
    request.headers["Authorization"] = `${apiAuth.token_type} ${apiAuth.access_token}`;
  } else {
    // Create the headers property if it does not exist
    request.headers = {
      // @ts-ignore
      Authorization: `${apiAuth.token_type} ${apiAuth.access_token}`,
    };
  }

  return request;
});

function App() {
  const { isLoading, user, logout, getIdTokenClaims } = useAuth0();

  if (isLoading) {
    return <span>loading...</span>;
  }

  const authProvider: AuthBindings = {
    login: async () => {
      return {
        success: true,
      };
    },
    logout: async () => {
      logout({ returnTo: window.location.origin });
      return {
        success: true,
      };
    },
    onError: async (error) => {
      console.error(error);
      return { error };
    },
    check: async () => {
      try {
        const token = await getIdTokenClaims();
        const res = await axiosInstance.post("https://dev-s0p23cb4bzh4nb01.us.auth0.com/oauth/token", {
          client_id:"1q5gpnEaAXf4LzW7Kik1YufJZXVvnTRI",
          client_secret:"uCy3zW2OuxaaUJJQ66mbjQ8ZuqvnpGwzDhz4C33-gjLjqZwGFJVW-9ZvcvzcvJsR",
          audience:"http://localhost:3000/api",
          grant_type:"client_credentials"
        }, {
          headers: {'content-type': 'application/json'},
        })
        if (token && res.data.access_token){
          localStorage.setItem("api_auth", JSON.stringify(res.data))
          localStorage.setItem("app_auth", JSON.stringify(token.__raw));
          axios.defaults.headers.common = {
            Authorization: `Bearer ${token.__raw}`,
          };
          return {
            authenticated: true,
          };
        } else {
          return {
            authenticated: false,
            error: {
              message: "Check failed",
              name: "Token not found",
            },
            redirectTo: "/login",
            logout: true,
          };
        }
      } catch (error: any) {
        return {
          authenticated: false,
          error: new Error(error),
          redirectTo: "/login",
          logout: true,
        };
      }
    },
    getPermissions: async () => null,
    getIdentity: async () => {
      if (user) {
        return {
          ...user,
          avatar: user.picture,
        };
      }
      return null;
    },
  };

  return (
      <BrowserRouter>
            <Refine
                authProvider={authProvider}
                dataProvider={dataProvider("http://localhost:3000/api", axiosInstance)}
                routerProvider={routerBindings}
                resources={[
                  {
                    name: "users",
                    list: "/users",
                    show: "/users/show/:id",
                    create: "/users/create",
                    edit: "/users/edit/:id",
                  },
                ]}
                options={{
                  syncWithLocation: true,
                  warnWhenUnsavedChanges: true,
                }}
            >
              <Routes>
                <Route
                    element={
                      <Authenticated
                          fallback={
                            <CatchAllNavigate to="/login" />
                          }
                      >
                        <ThemedLayoutV2>
                          <Outlet />
                        </ThemedLayoutV2>
                      </Authenticated>
                    }
                >
                  <Route
                      index
                      element={
                        <NavigateToResource resource="users" />
                      }
                  />

                  <Route path="users">
                    <Route index element={<MuiInferencer />} />
                    <Route
                        path="show/:id"
                        element={<MuiInferencer />}
                    />
                    <Route
                        path="edit/:id"
                        element={<MuiInferencer />}
                    />
                    <Route
                        path="create"
                        element={<MuiInferencer />}
                    />
                  </Route>
                </Route>

                <Route
                    element={
                      <Authenticated fallback={<Outlet />}>
                        <NavigateToResource resource="users" />
                      </Authenticated>
                    }
                >
                  <Route path="/login" element={<Login />} />
                </Route>

                <Route
                    element={
                      <Authenticated>
                        <ThemedLayoutV2>
                          <Outlet />
                        </ThemedLayoutV2>
                      </Authenticated>
                    }
                >
                  <Route path="*" element={<ErrorComponent />} />
                </Route>
              </Routes>
              <UnsavedChangesNotifier />
              <DocumentTitleHandler />
            </Refine>
      </BrowserRouter>
  );
  // return (
  //     <ThemeProvider theme={RefineThemes.Blue}>
  //       <CssBaseline />
  //       <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
  //       <RefineSnackbarProvider>
  //         <BrowserRouter>
  //           <Refine
  //               routerProvider={routerBindings}
  //               dataProvider={dataProvider(
  //                   "http://localhost:3000/api"
  //               )}
  //               notificationProvider={notificationProvider}
  //               authProvider={authProvider}
  //               resources={[
  //                 {
  //                   name: "users",
  //                   list: "/users",
  //                   show: "/users/:id",
  //                   create: "/users",
  //                   edit: "/users/:id",
  //                 },
  //               ]}
  //               options={{
  //                 syncWithLocation: true,
  //                 warnWhenUnsavedChanges: true,
  //               }}
  //           >
  //             <Routes>
  //               <Route element={<Authenticated
  //                 fallback={<CatchAllNavigate to={"/login"}/>}>
  //                   <ThemedLayoutV2>
  //                     <Outlet />
  //                   </ThemedLayoutV2>
  //                 </Authenticated>}>
  //               </Route>
  //                 <Route index element={<NavigateToResource resource="users" />} />
  //                 <Route path="users">
  //                   <Route index element={<MuiInferencer />} />
  //                   <Route
  //                       path=":id"
  //                       element={<MuiInferencer />}
  //                   />
  //                   <Route
  //                       path=":id"
  //                       element={<MuiInferencer />}
  //                   />
  //                   <Route
  //                       path="create"
  //                       element={<MuiInferencer />}
  //                   />
  //                 </Route>
  //                 <Route path="*" element={<ErrorComponent />} />
  //             </Routes>
  //             <UnsavedChangesNotifier />
  //           </Refine>
  //         </BrowserRouter>
  //       </RefineSnackbarProvider>
  //     </ThemeProvider>
  // );

  // return (
  //   <BrowserRouter>
  //     <GitHubBanner />
  //     <RefineKbarProvider>
  //       <ColorModeContextProvider>
  //         <CssBaseline />
  //         <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
  //         <RefineSnackbarProvider>
  //           <DevtoolsProvider>
  //             <Refine
  //               dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
  //               notificationProvider={notificationProvider}
  //               routerProvider={routerBindings}
  //               authProvider={authProvider}
  //               options={{
  //                 syncWithLocation: true,
  //                 warnWhenUnsavedChanges: true,
  //                 useNewQueryKeys: true,
  //                 projectId: "riBFot-S1oq3B-DiNWRh",
  //               }}
  //             >
  //               <Routes>
  //                 <Route index element={<WelcomePage />} />
  //               </Routes>
  //               <RefineKbar />
  //               <UnsavedChangesNotifier />
  //               <DocumentTitleHandler />
  //             </Refine>
  //             <DevtoolsPanel />
  //           </DevtoolsProvider>
  //         </RefineSnackbarProvider>
  //       </ColorModeContextProvider>
  //     </RefineKbarProvider>
  //   </BrowserRouter>
  // );
}

export default App;
