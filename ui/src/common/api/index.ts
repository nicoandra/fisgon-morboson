import type { AxiosInstance, AxiosRequestConfig } from "axios";
import { useQuery, useMutation, useQueryClient, type QueryClient, type UseMutationOptions, type UseQueryOptions, type MutationFunction, type UseMutationResult } from "react-query";
export type CameraConfigDto = {
    alias: string;
    ip: string;
    delayBetweenBurstOnTimeout: number;
    delayBetweenBursts: number;
    delayBetweenShots: number;
    shotsPerBurst: number;
    lastTimeSeen: string;
    failureCount: number;
};
export type FilesystemFolderContentsDto = {
    parentPath: string;
    subfolders: string[];
    files: string[];
};
export type AxiosConfig = {
    paramsSerializer?: AxiosRequestConfig["paramsSerializer"];
};
export type Config = {
    mutations?: MutationConfigs;
    axios?: AxiosConfig;
};
export function initialize(axios: AxiosInstance, config?: Config) {
    const requests = makeRequests(axios, config?.axios);
    const queryIds = makeQueryIds();
    return {
        requests,
        queryIds,
        queries: makeQueries(requests, queryIds),
        mutations: makeMutations(requests, config?.mutations)
    };
}
function useRapiniMutation<TData = unknown, TError = unknown, TVariables = void, TContext = unknown>(mutationFn: MutationFunction<TData, TVariables>, config?: (queryClient: QueryClient) => Pick<UseMutationOptions<TData, TError, TVariables, TContext>, "onSuccess" | "onSettled" | "onError">, options?: Omit<UseMutationOptions<TData, TError, TVariables, TContext>, "mutationFn">): UseMutationResult<TData, TError, TVariables, TContext> {
    const { onSuccess, onError, onSettled, ...rest } = options ?? {};
    const queryClient = useQueryClient();
    const conf = config?.(queryClient);
    const mutationOptions: typeof options = {
        onSuccess: (data: TData, variables: TVariables, context: TContext) => {
            conf?.onSuccess?.(data, variables, context);
            onSuccess?.(data, variables, context);
        },
        onError: (error: TError, variables: TVariables, context?: TContext) => {
            conf?.onError?.(error, variables, context);
            onError?.(error, variables, context);
        },
        onSettled: (data: TData | undefined, error: TError | null, variables: TVariables, context?: TContext) => {
            conf?.onSettled?.(data, error, variables, context);
            onSettled?.(data, error, variables, context);
        },
        ...rest
    };
    return useMutation(mutationFn, mutationOptions);
}
function nullIfUndefined<T>(value: T): T | null {
    return typeof value === "undefined" ? null : value;
}
function makeQueryIds() {
    return {
        healthCheckerControllerCheck: () => ["healthCheckerControllerCheck"] as const,
        getCameras: () => ["getCameras"] as const,
        getFiles: (location: string) => ["getFiles", location] as const
    } as const;
}
function makeRequests(axios: AxiosInstance, config?: AxiosConfig) {
    return {
        healthCheckerControllerCheck: () => axios.request<{
            status?: string;
            info?: {} | null;
            error?: {} | null;
            details?: {};
        }>({
            method: "get",
            url: `/health`
        }).then(res => res.data),
        getCameras: () => axios.request<CameraConfigDto[]>({
            method: "get",
            url: `/cameras`
        }).then(res => res.data),
        getFiles: (location: string) => axios.request<FilesystemFolderContentsDto>({
            method: "get",
            url: `/filesystem`,
            params: {
                location
            },
            paramsSerializer: config?.paramsSerializer
        }).then(res => res.data)
    } as const;
}
function makeQueries(requests: ReturnType<typeof makeRequests>, queryIds: ReturnType<typeof makeQueryIds>) {
    return {
        useHealthCheckerControllerCheck: (options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof requests.healthCheckerControllerCheck>>, unknown, Awaited<ReturnType<typeof requests.healthCheckerControllerCheck>>, ReturnType<(typeof queryIds)["healthCheckerControllerCheck"]>>, "queryKey" | "queryFn">) => useQuery(queryIds.healthCheckerControllerCheck(), () => requests.healthCheckerControllerCheck(), options),
        useGetCameras: (options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof requests.getCameras>>, unknown, Awaited<ReturnType<typeof requests.getCameras>>, ReturnType<(typeof queryIds)["getCameras"]>>, "queryKey" | "queryFn">) => useQuery(queryIds.getCameras(), () => requests.getCameras(), options),
        useGetFiles: (location: string, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof requests.getFiles>>, unknown, Awaited<ReturnType<typeof requests.getFiles>>, ReturnType<(typeof queryIds)["getFiles"]>>, "queryKey" | "queryFn">) => useQuery(queryIds.getFiles(location), () => requests.getFiles(location), options)
    } as const;
}
type MutationConfigs = {};
function makeMutations(requests: ReturnType<typeof makeRequests>, config?: Config["mutations"]) {
    return {} as const;
}
