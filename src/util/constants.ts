let BLOGGY_READER_BASE_URL = 'https://bloggy2020.herokuapp.com/reader/#/publisher';
if (process.env.NODE_ENV === 'development') {
    BLOGGY_READER_BASE_URL = 'http://localhost:2000/#/publisher';
}
export default { BLOGGY_READER_BASE_URL };
