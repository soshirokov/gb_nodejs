import worker_threads from 'worker_threads';
const TEST_FILE = './access_tmp.log';
// боевой файл 
//const TRUE_FILE = './access.log';
let IPs = process.argv.slice(2);

if(IPs.length == 0) {
    IPs = ['89.123.1.41', '34.48.240.111'];
}

(async () => {
    const worker = new worker_threads.Worker('./in_file_search_worker.js', {
        workerData: {
            path: TEST_FILE,
            IPs: IPs
        }
    });
})();