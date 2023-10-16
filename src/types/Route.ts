export type IRoute = {
	key: string,
    title: string,
    path: string,
    enabled: boolean,
    element: React.FC
    // component: ComponentClass | FC
    children?: IRoute | undefined;
};