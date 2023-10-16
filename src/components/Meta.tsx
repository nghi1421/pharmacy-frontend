import { APP_TITLE, APP_DESCRIPTION } from '../utils/constants';

const Meta = () => {
    return <>
    <title>{APP_TITLE}</title>
        <meta name='description' content={APP_DESCRIPTION} />
        <link rel="icon" href="../public/favicon.ico"/>
        <meta name='viewport' content='initial-scale=1, width=device-width' />
    </>
}

export default Meta