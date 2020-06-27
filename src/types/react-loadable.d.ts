/* eslint-disable @typescript-eslint/ban-types */
declare module 'react-loadable' {
    const Loadable: (arg: {
        loader: Function;
        loading: (obj: { error: Error; pastDelay: number }) => JSX.Element | null;
        delay: number;
    }) => React.FC;

    export default Loadable;
}
